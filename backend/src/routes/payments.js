const express = require('express');
const router = express.Router();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY || '');

// POST /api/payments/create-checkout-session
// Expects: { bookingId, amount, currency, name, email }
router.post('/create-checkout-session', async (req, res) => {
  try {
    const { bookingId, amount, currency = 'inr', name } = req.body;

    if (!process.env.STRIPE_SECRET_KEY) {
      return res.status(500).json({ message: 'Stripe not configured on server' });
    }

    if (!amount || !bookingId) return res.status(400).json({ message: 'bookingId and amount are required' });

    const frontendUrl = process.env.FRONTEND_URL || process.env.NEXTAUTH_URL || 'http://localhost:3000';

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency,
            product_data: {
              name: `Booking ${bookingId}`,
            },
            unit_amount: Math.round(Number(amount) * 100), // amount in cents/paise
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${frontendUrl}/tripplanner/booking/success?session_id={CHECKOUT_SESSION_ID}&bookingId=${bookingId}`,
      cancel_url: `${frontendUrl}/tripplanner/booking/cancel?bookingId=${bookingId}`,
      metadata: {
        bookingId: bookingId,
        name: name || ''
      }
    });

    res.json({ url: session.url, id: session.id });
  } catch (err) {
    console.error('Create checkout session error:', err);
    res.status(500).json({ message: 'Internal server error', error: err.message });
  }
});

module.exports = router;
