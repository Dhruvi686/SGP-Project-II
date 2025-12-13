const nodemailer = require('nodemailer');

// Create a transporter object using SMTP
// For development: Use ethereal.email test account if no SMTP config is provided
let transporter;

if (process.env.NODE_ENV === 'test' || !process.env.SMTP_USER) {
  // Create a test account using ethereal.email
  transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    secure: false,
    auth: {
      user: 'cassidy.windler@ethereal.email', // Test account
      pass: 'pQk2ZkY5uKxJw5PJxr'
    }
  });
} else {
  // Use production SMTP settings
  transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: process.env.SMTP_PORT || 587,
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD
    }
  });
}

// Generate a 6-digit OTP
const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// Send OTP email
const sendOTP = async (email, otp) => {
  try {
    const mailOptions = {
      from: `"Ladakh Tourism" <${process.env.SMTP_USER}>`,
      to: email,
      subject: 'Email Verification OTP',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2>Email Verification</h2>
          <p>Your OTP for email verification is:</p>
          <h1 style="color: #2563eb; font-size: 2.5rem; letter-spacing: 0.2em; text-align: center; margin: 20px 0;">
            ${otp}
          </h1>
          <p>This OTP is valid for 10 minutes.</p>
          <p>If you didn't request this, please ignore this email.</p>
          <hr>
          <p style="color: #6b7280; font-size: 0.875rem;">
            This is an automated message, please do not reply.
          </p>
        </div>
      `
    };

    const info = await transporter.sendMail(mailOptions);
    
    // Log the preview URL if using ethereal
    if (process.env.NODE_ENV !== 'production') {
      console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    }
    
    return true;
  } catch (error) {
    console.error('Error sending OTP email:', error);
    throw new Error('Failed to send OTP email');
  }
};

module.exports = {
  generateOTP,
  sendOTP,
  transporter
};
