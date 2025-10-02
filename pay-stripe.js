// api/pay-stripe.js
// Creates a Stripe Checkout Session. Requires STRIPE_SECRET_KEY in env.
import Stripe from 'stripe';
export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).send({ error: 'Method not allowed' });
  try {
    const stripeKey = process.env.STRIPE_SECRET_KEY;
    if (!stripeKey) return res.status(200).json({ ok: false, note: 'Stripe not configured' });
    const stripe = new Stripe(stripeKey);
    const { price = 4900 } = req.body || {}; // price in cents
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{ price_data: { currency: 'usd', product_data: { name: 'Asesoría STARTIA' }, unit_amount: price }, quantity: 1 }],
      mode: 'payment',
      success_url: (process.env.PUBLIC_URL || 'https://miagencia.vercel.app') + '/success',
      cancel_url: (process.env.PUBLIC_URL || 'https://miagencia.vercel.app') + '/cancel'
    });
    return res.status(200).json({ url: session.url });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err.message });
  }
}
