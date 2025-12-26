const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');
const nodemailer = require('nodemailer');

// Helper to create transporter if env vars provided
function getTransporter() {
  const host = process.env.SMTP_HOST;
  const port = process.env.SMTP_PORT;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!host || !port || !user || !pass) return null;

  return nodemailer.createTransport({
    host,
    port: Number(port),
    secure: Number(port) === 465, // true for 465, false for other ports
    auth: {
      user,
      pass
    }
  });
}

// POST /api/bookings - create a booking and send confirmation email (if configured)
router.post('/', async (req, res) => {
  try {
    const { name, email, phone, tripDate, seats, amount, notes } = req.body;

    if (!name || !email) {
      return res.status(400).json({ message: 'Name and email are required' });
    }

    const booking = new Booking({ name, email, phone, tripDate, seats, amount, notes });
    await booking.save();

    // Try to send confirmation email
    const transporter = getTransporter();
    if (transporter) {
      const from = process.env.FROM_EMAIL || process.env.SMTP_USER;
      const mailOptions = {
        from,
        to: email,
        subject: '🎉 Your Ladakh Adventure Booking Confirmed!',
        text: `Hello ${name},

Your booking has been confirmed! Here are your booking details:

Booking ID: ${booking._id}
Trip Date: ${tripDate ? new Date(tripDate).toLocaleDateString() : 'TBD'}
Number of Seats: ${seats}
Total Amount: ₹${amount.toLocaleString()}

${notes ? `Special Notes: ${notes}` : ''}

Thank you for choosing Ladakh Tourism! We're excited to help you create unforgettable memories in the breathtaking landscapes of Ladakh.

Next Steps:
1. Complete your payment if not already done
2. Check your email for payment confirmation
3. Contact us if you have any questions

Safe travels!
Ladakh Tourism Team`,
        html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Booking Confirmation - Ladakh Tourism</title>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
    .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
    .booking-details { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #667eea; }
    .detail-row { display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #eee; }
    .detail-label { font-weight: bold; color: #555; }
    .detail-value { color: #333; }
    .total { font-size: 18px; font-weight: bold; color: #667eea; }
    .footer { text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; color: #666; }
    .button { display: inline-block; background: #667eea; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; margin: 10px 0; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>🎉 Booking Confirmed!</h1>
      <p>Your Ladakh adventure awaits</p>
    </div>

    <div class="content">
      <p>Hello <strong>${name}</strong>,</p>

      <p>Thank you for choosing Ladakh Tourism! Your booking has been successfully confirmed. We're thrilled to help you explore the breathtaking beauty of Ladakh.</p>

      <div class="booking-details">
        <h3 style="margin-top: 0; color: #667eea;">📋 Booking Details</h3>

        <div class="detail-row">
          <span class="detail-label">Booking ID:</span>
          <span class="detail-value">${booking._id}</span>
        </div>

        <div class="detail-row">
          <span class="detail-label">Trip Date:</span>
          <span class="detail-value">${tripDate ? new Date(tripDate).toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) : 'To be determined'}</span>
        </div>

        <div class="detail-row">
          <span class="detail-label">Number of Travelers:</span>
          <span class="detail-value">${seats} ${seats === 1 ? 'person' : 'people'}</span>
        </div>

        <div class="detail-row">
          <span class="detail-label">Total Amount:</span>
          <span class="detail-value total">₹${amount.toLocaleString('en-IN')}</span>
        </div>

        ${notes ? `
        <div class="detail-row" style="border-bottom: none;">
          <span class="detail-label">Special Notes:</span>
          <span class="detail-value">${notes}</span>
        </div>
        ` : ''}
      </div>

      <h3>🎯 Next Steps</h3>
      <ol>
        <li><strong>Complete Payment:</strong> If you haven't already, please complete your payment to secure your booking.</li>
        <li><strong>Check Payment Confirmation:</strong> You'll receive a separate email once payment is confirmed.</li>
        <li><strong>Prepare for Your Trip:</strong> Start planning your itinerary and check our travel guides.</li>
        <li><strong>Contact Us:</strong> Reach out if you have any questions or need assistance.</li>
      </ol>

      <p style="text-align: center; margin: 30px 0;">
        <a href="${process.env.FRONTEND_URL || 'http://localhost:3000'}/tripplanner/bookingOpened" class="button">View Your Bookings</a>
      </p>

      <p><strong>Safe travels and unforgettable memories await!</strong></p>

      <p>Best regards,<br>
      <strong>Ladakh Tourism Team</strong></p>
    </div>

    <div class="footer">
      <p>📧 Contact us: info@ladakhtourism.com | 📞 +91 98765 43210</p>
      <p>🏔️ Experience the magic of Ladakh with us</p>
    </div>
  </div>
</body>
</html>`
      };

      transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
          console.error('Error sending booking email:', err);
        } else {
          console.log('Booking confirmation email sent:', info.response || info);
        }
      });
    } else {
      console.warn('SMTP not configured - skipping confirmation email');
    }

    res.status(201).json({ message: 'Booking created', booking });
  } catch (err) {
    console.error('Booking error:', err);
    res.status(500).json({ message: 'Internal server error', error: err.message });
  }
});

// GET /api/bookings - list bookings (optionally filtered by email)
router.get('/', async (req, res) => {
  try {
    const { email } = req.query;
    let query = {};

    if (email) {
      // Case-insensitive email search
      query.email = new RegExp(`^${email}$`, 'i');
      console.log('Filtering bookings by email (case-insensitive):', email);
    } else {
      console.log('No email filter provided, returning all bookings');
    }

    const list = await Booking.find(query).sort({ createdAt: -1 }).limit(200);
    console.log(`Found ${list.length} bookings for query:`, query);
    res.json({ bookings: list });
  } catch (err) {
    console.error('List bookings error:', err);
    res.status(500).json({ message: 'Internal server error', error: err.message });
  }
});

// POST /api/bookings/:id/confirm-payment - mark booking as paid (called after successful payment)
router.post('/:id/confirm-payment', async (req, res) => {
  try {
    const { id } = req.params;
    const booking = await Booking.findById(id);
    if (!booking) return res.status(404).json({ message: 'Booking not found' });

    booking.paymentStatus = 'paid';
    await booking.save();

    // Optionally: send a paid confirmation email
    const transporter = getTransporter();
    if (transporter) {
      const from = process.env.FROM_EMAIL || process.env.SMTP_USER;
      const mailOptions = {
        from,
        to: booking.email,
        subject: '💳 Payment Received - Your Ladakh Booking is Fully Confirmed!',
        text: `Hello ${booking.name},

Great news! We have successfully received your payment for booking ${booking._id}.

Your Ladakh adventure is now fully confirmed. Here are the next steps:

1. You'll receive a detailed itinerary via email within 24 hours
2. Check our travel preparation guide for Ladakh
3. Contact your assigned travel coordinator if needed

Safe travels and enjoy Ladakh!

Ladakh Tourism Team`,
        html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Payment Confirmed - Ladakh Tourism</title>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: linear-gradient(135deg, #28a745 0%, #20c997 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
    .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
    .success-icon { font-size: 48px; margin-bottom: 10px; }
    .booking-details { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #28a745; }
    .footer { text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; color: #666; }
    .button { display: inline-block; background: #28a745; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; margin: 10px 0; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="success-icon">✅</div>
      <h1>Payment Received!</h1>
      <p>Your booking is now fully confirmed</p>
    </div>

    <div class="content">
      <p>Hello <strong>${booking.name}</strong>,</p>

      <p><strong>Great news!</strong> We have successfully received your payment for booking <strong>${booking._id}</strong>. Your Ladakh adventure is now fully confirmed and secured.</p>

      <div class="booking-details">
        <h3 style="margin-top: 0; color: #28a745;">💰 Payment Details</h3>
        <p><strong>Amount Paid:</strong> ₹${booking.amount.toLocaleString('en-IN')}</p>
        <p><strong>Payment Status:</strong> <span style="color: #28a745; font-weight: bold;">Confirmed</span></p>
        <p><strong>Booking ID:</strong> ${booking._id}</p>
      </div>

      <h3>🎯 What's Next?</h3>
      <ol>
        <li><strong>Detailed Itinerary:</strong> You'll receive a comprehensive travel itinerary via email within 24 hours.</li>
        <li><strong>Travel Documents:</strong> Check your email for any required permits or documentation.</li>
        <li><strong>Preparation Guide:</strong> Review our Ladakh travel preparation guide for important information.</li>
        <li><strong>Travel Coordinator:</strong> A dedicated coordinator will be assigned to assist with your trip.</li>
      </ol>

      <p style="text-align: center; margin: 30px 0;">
        <a href="${process.env.FRONTEND_URL || 'http://localhost:3000'}/tripplanner/bookingOpened" class="button">View Booking Details</a>
      </p>

      <p><strong>We're excited to welcome you to Ladakh! Safe travels and unforgettable experiences await.</strong></p>

      <p>Best regards,<br>
      <strong>Ladakh Tourism Team</strong></p>
    </div>

    <div class="footer">
      <p>📧 Contact us: info@ladakhtourism.com | 📞 +91 98765 43210</p>
      <p>🏔️ Experience the magic of Ladakh with us</p>
    </div>
  </div>
</body>
</html>`
      };
      transporter.sendMail(mailOptions, (err, info) => {
        if (err) console.error('Error sending payment email:', err);
        else console.log('Payment confirmation email sent:', info.response || info);
      });
    }

    res.json({ message: 'Booking payment confirmed', booking });
  } catch (err) {
    console.error('Confirm payment error:', err);
    res.status(500).json({ message: 'Internal server error', error: err.message });
  }
});

module.exports = router;
