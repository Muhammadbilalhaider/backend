const express = require('express');
const router = express.Router();
require('dotenv').config();

const stripe = require('stripe')(process.env.SECRET_STRIPE)



router.post("/checkout", async (req, resp) => {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: 'payment',
      line_items: [
        {
          price_data: {
            currency: 'pkr',
            product_data: {
              name: 'Dummy Product'
            },
            unit_amount: 1000
          },
          quantity: 3000
        }
      ],
      success_url: 'http://localhost:5000/success',
      cancel_url: 'http://localhost:5000/cancel'
    });
    console.log("Session Object:", session);
    if (session.payment_status === 'paid') {
      resp.status(200).json({ message: 'Payment successful' });
    } else {
      resp.json({ url: session.url });
    }
  } catch (error) {
    console.error(error);
    resp.status(500).json({ error: 'An error occurred during checkout', stripeError: error.message });
  }
});

module.exports = router;
