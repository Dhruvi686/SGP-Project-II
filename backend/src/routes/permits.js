const express = require('express');
const Permit = require('../models/Permit');

const router = express.Router();

// POST /api/permits - Create a new permit application (before payment)
router.post('/', async (req, res) => {
  try {
    // Log entire request body for debugging
    console.log('📥 Received POST /api/permits request');
    console.log('📦 Request body:', JSON.stringify(req.body, null, 2));
    
    const { 
      fullName, 
      email, 
      phone, 
      permitType, 
      applicationId, 
      permitNumber,
      travelDate, 
      returnDate, 
      itinerary,
      amount,
      userId
    } = req.body;

    // Log extracted values
    console.log('📋 Extracted values:', {
      fullName,
      email,
      phone,
      permitType,
      applicationId,
      permitNumber,
      travelDate,
      returnDate,
      amount
    });

    // Validate required fields
    if (!fullName || !email || !phone || !permitType || !applicationId || !permitNumber || !travelDate || !returnDate || !amount) {
      const missingFields = {
        fullName: !fullName,
        email: !email,
        phone: !phone,
        permitType: !permitType,
        applicationId: !applicationId,
        permitNumber: !permitNumber,
        travelDate: !travelDate,
        returnDate: !returnDate,
        amount: !amount
      };
      
      console.error('❌ Validation failed - Missing fields:', missingFields);
      
      return res.status(400).json({
        success: false,
        error: 'Required fields are missing',
        missingFields,
        receivedFields: Object.keys(req.body)
      });
    }

    // Validate dates
    const travel = new Date(travelDate);
    const returnD = new Date(returnDate);

    if (returnD < travel) {
      return res.status(400).json({
        success: false,
        error: 'Return date cannot be before travel date'
      });
    }

    // Create new permit application
    const permit = new Permit({
      fullName,
      email,
      phone,
      permitType,
      applicationId,
      permitNumber,
      travelDate,
      returnDate,
      itinerary,
      amount,
      userId: userId || null,
      status: 'Payment Pending',
      paymentStatus: 'Pending'
    });

    await permit.save();

    res.status(201).json({
      success: true,
      message: 'Permit application created successfully',
      permit: {
        _id: permit._id,
        applicationId: permit.applicationId,
        permitNumber: permit.permitNumber,
        status: permit.status
      }
    });

  } catch (error) {
    console.error('Error creating permit application:', error);
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        error: 'Application ID or Permit Number already exists'
      });
    }
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
});

// POST /api/permits/:applicationId/confirm-payment - Confirm payment after Stripe success
router.post('/:applicationId/confirm-payment', async (req, res) => {
  try {
    const { applicationId } = req.params;
    const { paymentSessionId } = req.body;

    const permit = await Permit.findOne({ applicationId });

    if (!permit) {
      return res.status(404).json({
        success: false,
        error: 'Permit application not found'
      });
    }

    // Update payment status
    permit.paymentStatus = 'Completed';
    permit.status = 'Under Review';
    permit.paymentSessionId = paymentSessionId;

    await permit.save();

    res.json({
      success: true,
      message: 'Payment confirmed successfully',
      permit: {
        _id: permit._id,
        applicationId: permit.applicationId,
        permitNumber: permit.permitNumber,
        status: permit.status,
        paymentStatus: permit.paymentStatus
      }
    });

  } catch (error) {
    console.error('Error confirming payment:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
});

// GET /api/permits/application/:applicationId - Get permit by application ID
router.get('/application/:applicationId', async (req, res) => {
  try {
    const { applicationId } = req.params;

    const permit = await Permit.findOne({ applicationId });

    if (!permit) {
      return res.status(404).json({
        success: false,
        error: 'Permit application not found'
      });
    }

    res.json({
      success: true,
      permit
    });

  } catch (error) {
    console.error('Error fetching permit:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
});

// GET /api/permits/user/:userId - Get permits for a specific user
router.get('/user/:userId', async (req, res) => {
  try {
    const { userId } = req.params;

    const permits = await Permit.find({ userId }).sort({ submittedAt: -1 });

    res.json({
      success: true,
      permits
    });

  } catch (error) {
    console.error('Error fetching permits:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
});

// GET /api/permits/email/:email - Get permits by email (for non-logged in users)
router.get('/email/:email', async (req, res) => {
  try {
    const { email } = req.params;

    const permits = await Permit.find({ email }).sort({ submittedAt: -1 });

    res.json({
      success: true,
      permits
    });

  } catch (error) {
    console.error('Error fetching permits:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
});

// GET /api/permits - Get all permits (for admin/government users)
router.get('/', async (req, res) => {
  try {
    const { status, paymentStatus } = req.query;
    
    const filter = {};
    if (status) filter.status = status;
    if (paymentStatus) filter.paymentStatus = paymentStatus;

    const permits = await Permit.find(filter)
      .populate('userId', 'name email role')
      .sort({ submittedAt: -1 });

    res.json({
      success: true,
      count: permits.length,
      permits
    });

  } catch (error) {
    console.error('Error fetching permits:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
});

// PUT /api/permits/:id - Update permit status (for admin/government users)
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { status, reviewerNotes } = req.body;

    if (!['Under Review', 'Approved', 'Rejected'].includes(status)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid status. Must be Under Review, Approved, or Rejected'
      });
    }

    const updateData = {
      status,
      reviewerNotes,
      reviewedAt: new Date()
    };

    if (status === 'Approved') {
      updateData.approvedAt = new Date();
    }

    const permit = await Permit.findByIdAndUpdate(
      id,
      updateData,
      { new: true }
    );

    if (!permit) {
      return res.status(404).json({
        success: false,
        error: 'Permit not found'
      });
    }

    res.json({
      success: true,
      message: `Permit ${status.toLowerCase()} successfully`,
      permit
    });

  } catch (error) {
    console.error('Error updating permit:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
});

module.exports = router;