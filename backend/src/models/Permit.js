const mongoose = require('mongoose');

const permitSchema = new mongoose.Schema({
  // Applicant Information
  fullName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  
  // Permit Details
  permitType: {
    type: String,
    required: true,
    enum: [
      'Inner Line Permit (ILP)',
      'Protected Area Permit (PAP)',
      'Wildlife Sanctuary Permit',
      'Trekking Permit'
    ]
  },
  applicationId: {
    type: String,
    required: true,
    unique: true
  },
  permitNumber: {
    type: String,
    required: true,
    unique: true
  },
  
  // Travel Information
  travelDate: {
    type: Date,
    required: true
  },
  returnDate: {
    type: Date,
    required: true
  },
  itinerary: {
    type: String
  },
  
  // Documents (URLs to uploaded files)
  idProofUrl: {
    type: String
  },
  passportPhotoUrl: {
    type: String
  },
  
  // Payment Information
  amount: {
    type: Number,
    required: true
  },
  paymentStatus: {
    type: String,
    enum: ['Pending', 'Completed', 'Failed'],
    default: 'Pending'
  },
  paymentSessionId: {
    type: String
  },
  
  // Status
  status: {
    type: String,
    enum: ['Payment Pending', 'Under Review', 'Approved', 'Rejected'],
    default: 'Payment Pending'
  },
  
  // Timestamps
  submittedAt: {
    type: Date,
    default: Date.now
  },
  reviewedAt: {
    type: Date
  },
  approvedAt: {
    type: Date
  },
  
  // Admin/Government notes
  reviewerNotes: {
    type: String
  },
  
  // Optional: Link to user if they're logged in
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, { timestamps: true });

module.exports = mongoose.model('Permit', permitSchema);
