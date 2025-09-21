const mongoose = require('mongoose');

const permitSchema = new mongoose.Schema({
  touristId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  destination: {
    type: String,
    required: true,
    enum: [
      'Pangong Tso',
      'Nubra Valley',
      'Tso Moriri',
      'Khardung La',
      'Zanskar Valley',
      'Hemis National Park',
      'Magnetic Hill',
      'Lamayuru',
      'Alchi Monastery',
      'Changthang Wildlife Sanctuary'
    ]
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
    required: true
  },
  reason: {
    type: String,
    required: true
  },
  documentUrl: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['Pending', 'Approved', 'Rejected'],
    default: 'Pending'
  },
  submittedAt: {
    type: Date,
    default: Date.now
  },
  reviewedAt: {
    type: Date
  },
  reviewerNotes: {
    type: String
  }
});

module.exports = mongoose.model('Permit', permitSchema);