const express = require('express');
const router = express.Router();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY || '');

// POST /api/payments/create-checkout-session
// Expects: { bookingId, amount, currency, name, email, type }
// type can be 'booking' (default) or 'permit'
router.post('/create-checkout-session', async (req, res) => {
  try {
    const { bookingId, amount, currency = 'inr', name, type = 'booking' } = req.body;

    if (!process.env.STRIPE_SECRET_KEY) {
      return res.status(500).json({ message: 'Stripe not configured on server' });
    }

    if (!amount || !bookingId) return res.status(400).json({ message: 'bookingId and amount are required' });

    const frontendUrl = process.env.FRONTEND_URL || process.env.NEXTAUTH_URL || 'http://localhost:3000';

    // Determine success/cancel URLs based on type
    let successUrl, cancelUrl, productName;
    
    if (type === 'permit') {
      successUrl = `${frontendUrl}/permits/payment-success?session_id={CHECKOUT_SESSION_ID}&applicationId=${bookingId}`;
      cancelUrl = `${frontendUrl}/permits?cancelled=true`;
      productName = `Permit Application ${bookingId}`;
    } else {
      successUrl = `${frontendUrl}/tripplanner/booking/success?session_id={CHECKOUT_SESSION_ID}&bookingId=${bookingId}`;
      cancelUrl = `${frontendUrl}/tripplanner/booking/cancel?bookingId=${bookingId}`;
      productName = `Booking ${bookingId}`;
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency,
            product_data: {
              name: productName,
            },
            unit_amount: Math.round(Number(amount) * 100), // amount in cents/paise
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: successUrl,
      cancel_url: cancelUrl,
      metadata: {
        bookingId: bookingId,
        name: name || '',
        type: type
      }
    });

    res.json({ url: session.url, id: session.id });
  } catch (err) {
    console.error('Create checkout session error:', err);
    res.status(500).json({ message: 'Internal server error', error: err.message });
  }
});

module.exports = router;
