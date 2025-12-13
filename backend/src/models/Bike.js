const mongoose = require('mongoose');

const bikeSchema = new mongoose.Schema({
  model: {
    type: String,
    required: true
  },
  vendorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  pricePerHour: {
    type: Number,
    required: true
  },
  availabilityStatus: {
    type: String,
    enum: ['available', 'rented', 'under_maintenance'],
    default: 'available',
    required: true
  },
  location: {
    type: String,
    required: true
  },
  photos: [{
    type: String
  }],
  description: {
    type: String
  }
}, {
  timestamps: true
});

module.exports = mongoose.models.Bike || mongoose.model('Bike', bikeSchema);