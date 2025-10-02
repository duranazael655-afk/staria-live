// api/pay-paypal.js
// Placeholder for PayPal Checkout integration. For demo, returns a fake approval URL if PAYPAL_CLIENT_ID not set.
export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).send({ error: 'Method not allowed' });
  const CLIENT_ID = process.env.PAYPAL_CLIENT_ID;
  if (!CLIENT_ID) {
    return res.status(200).json({ ok: true, url: 'https://www.paypal.com/checkoutnow?demo=true' });
  }
  // Real PayPal integration would create an order via PayPal API and return approve link
  return res.status(200).json({ ok: true, url: 'https://www.paypal.com/checkoutnow?token=demo' });
}
