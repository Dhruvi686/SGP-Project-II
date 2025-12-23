const express = require('express');
const router = express.Router();
const crypto = require('crypto');
const { OAuth2Client } = require('google-auth-library');
const User = require('../models/User');

// POST /api/auth/register
router.post('/register', async (req, res) => {
  try {
    console.log('Registering user with data:', JSON.stringify(req.body, null, 2));
    
    const { email, password, name, role, businessName, contactNumber, address } = req.body;
    
    // Validate required fields
    if (!email || !password || !name) {
      console.log('Missing required fields');
      return res.status(400).json({ 
        success: false,
        message: 'Email, password, and name are required' 
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log('User already exists:', email);
      return res.status(400).json({ 
        success: false,
        message: 'User with this email already exists' 
      });
    }

    try {
      // Create new user
      const user = new User({
        email,
        password, // Will be hashed by the pre-save hook
        name,
        role: role || 'Tourist',
        isEmailVerified: true // Skip email verification
      });
      
      // Add vendor-specific fields if role is Vendor
      if (role === 'Vendor') {
        user.businessName = businessName;
        user.contactNumber = contactNumber;
        user.address = address;
      }
      
      // Save the new user
      await user.save();
      console.log('User registered successfully:', user.email);

      // Generate a token (in production, use a proper JWT)
      const token = 'fake-jwt-token';

      res.status(201).json({
        success: true,
        message: 'User registered successfully',
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role
        }
      });
    } catch (err) {
      console.error('Error during user registration:', err);
      res.status(500).json({ 
        success: false,
        message: 'Error during user registration',
        error: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error'
      });
    }
  } catch (err) {
    console.error('Unexpected error in registration:', err);
    res.status(500).json({ 
      success: false,
      message: 'Unexpected error occurred',
      error: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error'
    });
  }
});

// POST /api/auth/google
// Expects: { idToken: string, role?: "Tourist"|"Vendor"|"Government" }
router.post('/google', async (req, res) => {
  try {
    const { idToken, role } = req.body;

    if (!idToken) {
      return res.status(400).json({ success: false, message: 'idToken is required' });
    }

    if (!process.env.GOOGLE_CLIENT_ID) {
      return res.status(500).json({
        success: false,
        message: 'Server misconfigured: GOOGLE_CLIENT_ID is not set'
      });
    }

    // Helpful debug (non-sensitive): read aud/iss from the JWT payload.
    // This makes it obvious when the backend is using the wrong GOOGLE_CLIENT_ID.
    let tokenAud;
    let tokenIss;
    try {
      const parts = String(idToken).split('.');
      if (parts.length === 3) {
        const payloadJson = Buffer.from(parts[1], 'base64').toString('utf8');
        const payload = JSON.parse(payloadJson);
        tokenAud = payload?.aud;
        tokenIss = payload?.iss;
      }
    } catch {}

    const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

    const ticket = await googleClient.verifyIdToken({
      idToken,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const email = payload?.email;
    const name = payload?.name || payload?.given_name || 'Google User';

    if (!email) {
      return res.status(400).json({ success: false, message: 'Google token did not contain an email' });
    }

    let user = await User.findOne({ email });

    if (!user) {
      // Create a random password (hashed by pre-save hook). Users can later add/change password in a profile flow.
      const randomPassword = crypto.randomBytes(32).toString('hex');

      user = new User({
        email,
        name,
        password: randomPassword,
        role: role || 'Tourist',
        isEmailVerified: true,
      });

      await user.save();
    }

    return res.json({
      success: true,
      message: 'Google authentication successful',
      token: 'fake-jwt-token',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      }
    });
  } catch (err) {
    console.error('Google auth error:', err);

    // Try to extract audience from the token even when verification fails.
    let tokenAud;
    let tokenIss;
    try {
      const parts = String(req.body?.idToken || '').split('.');
      if (parts.length === 3) {
        const payloadJson = Buffer.from(parts[1], 'base64').toString('utf8');
        const payload = JSON.parse(payloadJson);
        tokenAud = payload?.aud;
        tokenIss = payload?.iss;
      }
    } catch {}

    return res.status(401).json({
      success: false,
      message: 'Invalid Google token',
      error: process.env.NODE_ENV === 'development' ? (err?.message || String(err)) : 'Unauthorized',
      expectedAudience: process.env.GOOGLE_CLIENT_ID,
      tokenAudience: tokenAud,
      tokenIssuer: tokenIss,
    });
  }
});

// POST /api/auth/login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Check if password is correct
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    res.json({
      message: 'Login successful',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      },
      token: 'fake-jwt-token' // In production, generate real JWT
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ message: 'Internal server error', error: err.message });
  }
});

module.exports = router;