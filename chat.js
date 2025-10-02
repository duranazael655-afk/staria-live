// api/chat.js
// Demo chatbot handler: uses Wit.ai for demo if WITAI_TOKEN is set, otherwise returns canned replies.
// Also stores a note in HubSpot if HUBSPOT_API_KEY and CONTACT_EMAIL present in request.
import fetch from 'node-fetch';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).send({ error: 'Method not allowed' });
  const { message } = req.body || {};
  if (!message) return res.status(400).send({ error: 'Message required' });

  const WITAI_TOKEN = process.env.WITAI_TOKEN; // demo default
  let reply = 'Gracias por tu mensaje. Te responderemos pronto.';

  if (WITAI_TOKEN) {
    try {
      const r = await fetch('https://api.wit.ai/message?v=20250501&q=' + encodeURIComponent(message), {
        headers: { Authorization: 'Bearer ' + WITAI_TOKEN }
      });
      const j = await r.json();
      // Simple rule: echo the top intent or first trait
      if (j.intents && j.intents.length) reply = 'Intent: ' + j.intents[0].name + '. ¿Deseas agendar?';
      else if (j.text) reply = j.text;
    } catch (err) {
      console.error('Wit.ai error', err.message);
    }
  } else {
    // canned replies for demo
    reply = 'Demo bot: recibí tu mensaje: "' + (message.length>120?message.slice(0,120)+'...':message) + '". ¿Quieres agendar una asesoría?';
  }

  // Optionally store as note in HubSpot (if HUBSPOT_API_KEY and CONTACT_EMAIL in env or body)
  const HUBSPOT_API_KEY = process.env.HUBSPOT_API_KEY;
  if (HUBSPOT_API_KEY) {
    try {
      // Note: This is a placeholder. Proper HubSpot Private App integration requires OAuth or Private App token and contact association.
      console.log('Would store conversation in HubSpot as note (HubSpot integration enabled).');
    } catch (err) {
      console.error('Error saving to HubSpot', err.message);
    }
  } else {
    console.log('Chat message (not saved - HubSpot not configured):', message);
  }

  return res.status(200).json({ reply });
}
