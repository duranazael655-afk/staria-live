// api/lead.js
// Simple serverless handler for Vercel / Netlify that forwards lead to HubSpot (requires HUBSPOT_API_KEY and HUBSPOT_PORTAL_ID, HUBSPOT_FORM_ID)
import fetch from 'node-fetch';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).send({ error: 'Method not allowed' });
  const { name, email, message, source } = req.body || {};
  if (!email) return res.status(400).send({ error: 'Email required' });

  const HUBSPOT_API_KEY = process.env.HUBSPOT_API_KEY; // not the same as Private App tokens but placeholder
  const PORTAL_ID = process.env.HUBSPOT_PORTAL_ID;
  const FORM_ID = process.env.HUBSPOT_FORM_ID;

  // If HubSpot keys are not set, fallback to logging and returning ok (so the site is functional)
  if (!HUBSPOT_API_KEY || !PORTAL_ID || !FORM_ID) {
    console.log('Lead received (no HubSpot keys configured):', { name, email, message, source });
    return res.status(200).json({ ok: true, note: 'HubSpot not configured yet; lead logged.' });
  }

  try {
    const body = {
      fields: [
        { name: 'email', value: email },
        { name: 'firstname', value: name || '' },
        { name: 'message', value: message || '' },
      ],
      context: { pageUri: process.env.PUBLIC_URL || 'https://miagencia.vercel.app', pageName: 'Landing STARTIA' }
    };
    const hsRes = await fetch(`https://api.hsforms.com/submissions/v3/integration/submit/${PORTAL_ID}/${FORM_ID}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });
    if (!hsRes.ok) {
      const txt = await hsRes.text();
      console.error('HubSpot error', txt);
      return res.status(500).json({ error: 'HubSpot API error', details: txt });
    }
    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Server error', details: err.message });
  }
}
