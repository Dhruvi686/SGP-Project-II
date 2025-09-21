const express = require('express');
const Permit = require('../models/Permit');

const router = express.Router();

// POST /api/permits - Submit a new permit application
router.post('/', async (req, res) => {
  try {
    const { touristId, destination, startDate, endDate, reason, documentUrl } = req.body;

    // Validate required fields
    if (!touristId || !destination || !startDate || !endDate || !reason || !documentUrl) {
      return res.status(400).json({
        success: false,
        error: 'All fields are required'
      });
    }

    // Validate dates
    const start = new Date(startDate);
    const end = new Date(endDate);
    const today = new Date();

    if (start < today) {
      return res.status(400).json({
        success: false,
        error: 'Start date cannot be in the past'
      });
    }

    if (end < start) {
      return res.status(400).json({
        success: false,
        error: 'End date cannot be before start date'
      });
    }

    // Create new permit
    const permit = new Permit({
      touristId,
      destination,
      startDate,
      endDate,
      reason,
      documentUrl
    });

    await permit.save();

    res.status(201).json({
      success: true,
      message: 'Permit application submitted successfully',
      permitId: permit._id
    });

  } catch (error) {
    console.error('Error submitting permit application:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
});

// GET /api/permits/:touristId - Get permits for a specific tourist
router.get('/:touristId', async (req, res) => {
  try {
    const { touristId } = req.params;

    const permits = await Permit.find({ touristId }).sort({ submittedAt: -1 });

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
    const permits = await Permit.find()
      .populate('touristId', 'name email role')
      .sort({ submittedAt: -1 });

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

// PUT /api/permits/:id - Update permit status (for admin/government users)
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { status, reviewerNotes } = req.body;

    if (!['Approved', 'Rejected'].includes(status)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid status. Must be Approved or Rejected'
      });
    }

    const permit = await Permit.findByIdAndUpdate(
      id,
      {
        status,
        reviewerNotes,
        reviewedAt: new Date()
      },
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