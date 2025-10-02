/* STARTIA - Web viva con IA (React single-file, simplified)
   This file is ready for deployment on Vercel (with serverless functions under /api).
   Keep keys in .env (see .env.example). */
import React, { useState, useEffect, useRef } from 'react';

export default function StartiaLiveWeb() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [sending, setSending] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    { from: 'bot', text: 'Hola 👋 — Soy el asistente IA de STARTIA. ¿En qué puedo ayudarte hoy?' }
  ]);
  const inputRef = useRef(null);

  async function submitLead(e) {
    e && e.preventDefault();
    if (!email) return alert('Ingresa un email válido');
    setSending(true);
    try {
      const payload = { name, email, message, source: 'landing_startia' };
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const json = await res.json();
      if (res.ok) {
        alert('Gracias! Tu información fue recibida. Revisa tu HubSpot.');
        setName(''); setEmail(''); setMessage('');
      } else {
        console.error(json);
        alert('Ocurrió un error al enviar. Revisa la consola.');
      }
    } catch (err) {
      console.error(err);
      alert('Error de red. Intenta de nuevo.');
    } finally {
      setSending(false);
    }
  }

  async function sendChat(userText) {
    if (!userText) return;
    setChatMessages(m => [...m, { from: 'user', text: userText }]);
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userText })
      });
      const data = await res.json();
      const reply = data?.reply || 'Lo siento, no obtuve respuesta. Intenta de nuevo.';
      setChatMessages(m => [...m, { from: 'bot', text: reply }]);
    } catch (err) {
      console.error(err);
      setChatMessages(m => [...m, { from: 'bot', text: 'Error en el servidor del chatbot.' }]);
    }
  }

  useEffect(() => {
    if (chatOpen && inputRef.current) inputRef.current.focus();
  }, [chatOpen]);

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-800">
      <header className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-pink-500 rounded-full flex items-center justify-center text-white font-bold">S</div>
            <div>
              <h1 className="text-lg font-semibold">STARTIA</h1>
              <p className="text-xs text-gray-500">Web viva + IA — Convertir, Escalar, Automatizar</p>
            </div>
          </div>
          <nav className="flex gap-4 items-center text-sm">
            <a href="#features" className="hover:underline">Características</a>
            <a href="#plans" className="hover:underline">Planes</a>
            <a href="#contact" className="hover:underline">Contacto</a>
            <button onClick={() => setChatOpen(true)} className="px-3 py-1 bg-indigo-600 text-white rounded-md">Habla con IA</button>
          </nav>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-12">
        <section className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-4xl font-extrabold leading-tight">Tu sitio web vivo con IA integrado a CRM, chatbots y funnels de venta</h2>
            <p className="mt-4 text-lg text-gray-600">Convierte visitantes en clientes con embudos automáticos, respuestas instantáneas por IA, y sincronización directa con tu CRM y WhatsApp.</p>

            <ul className="mt-6 grid gap-2">
              <li className="flex items-start gap-3"><span className="text-indigo-600 font-bold">•</span> Captura de leads automatizada (HubSpot / CRM)</li>
              <li className="flex items-start gap-3"><span className="text-indigo-600 font-bold">•</span> Chatbot IA 24/7 (Wit.ai demo, migrable a OpenAI)</li>
              <li className="flex items-start gap-3"><span className="text-indigo-600 font-bold">•</span> Integración WhatsApp/Twilio opcional para seguimientos</li>
            </ul>

            <div className="mt-6 flex gap-3">
              <button onClick={() => document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' })} className="px-5 py-3 bg-indigo-600 text-white rounded-md">Empieza ahora</button>
              <a href="#plans" className="px-5 py-3 border border-indigo-600 rounded-md">Ver planes</a>
            </div>

            <div className="mt-6 text-sm text-gray-500">¿Listo para generar ingresos hoy? Implementación mínima viable incluida en el README dentro del repo.</div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-md">
            <h3 className="text-lg font-semibold">Demo rápida: Reserva una asesoría</h3>
            <p className="text-sm text-gray-500 mt-2">Completa tus datos y recibe una confirmación por email/WhatsApp.</p>
            <form id="contact-form" onSubmit={submitLead} className="mt-4 space-y-3">
              <input className="w-full border px-3 py-2 rounded-md" placeholder="Nombre" value={name} onChange={e => setName(e.target.value)} />
              <input className="w-full border px-3 py-2 rounded-md" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
              <textarea className="w-full border px-3 py-2 rounded-md" placeholder="Mensaje (opcional)" value={message} onChange={e => setMessage(e.target.value)} />
              <div className="flex gap-2">
                <button type="submit" disabled={sending} className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-md">{sending ? 'Enviando...' : 'Solicitar asesoría'}</button>
                <button type="button" onClick={() => window.location.href = '/checkout'} className="px-4 py-2 border rounded-md">Pagar ahora</button>
              </div>
              <div className="text-xs text-gray-400">Al enviar aceptas recibir comunicaciones por email y WhatsApp.</div>
            </form>
          </div>
        </section>

        <section id="features" className="mt-16 grid md:grid-cols-3 gap-6">
          <FeatureCard title="Embudo inteligente" desc="Segmentación automática por comportamiento + secuencias multicanal."/>
          <FeatureCard title="Chatbot IA" desc="Respuestas instantáneas y derivación a humano cuando sea necesario."/>
          <FeatureCard title="CRM Sync" desc="HubSpot / Zapier / API personalizada — contactos siempre actualizados."/>
        </section>

        <section id="plans" className="mt-16">
          <h3 className="text-2xl font-bold">Planes listos para lanzar</h3>
          <div className="mt-6 grid md:grid-cols-3 gap-6">
            <PlanCard title="MVP" price="$49" bullets={["Landing + chat IA","Form to HubSpot","Webhook a WhatsApp"]} />
            <PlanCard title="Escala" price="$249" bullets={["Funnel avanzado","Automatizaciones","Integraciones multilenguaje"]} highlight />
            <PlanCard title="Enterprise" price="Consult" bullets={["Onboarding dedicado","SLA","Integraciones a medida"]} />
          </div>
        </section>

        <section className="mt-16 bg-white p-6 rounded-2xl shadow-sm">
          <h4 className="text-xl font-semibold">Preguntas frecuentes</h4>
          <FAQ question="¿Cuánto tarda la implementación?" answer="MVP 24-72 horas si tienes cuentas en HubSpot, Twilio y Stripe listas." />
          <FAQ question="¿Aceptan pagos internacionales?" answer="Sí. Integración con Stripe para tarjetas internacionales." />
        </section>

      </main>

      <footer className="bg-white border-t mt-12">
        <div className="max-w-6xl mx-auto px-6 py-6 flex justify-between items-center">
          <div className="text-sm">© {new Date().getFullYear()} STARTIA — Hecho para empresarios.</div>
          <div className="text-sm">Contacto: +57 314 410 3766</div>
        </div>
      </footer>

      {/* Chat widget */}
      <div className={`fixed right-6 bottom-6 ${chatOpen ? 'z-50' : 'z-40'}`}>
        {chatOpen ? (
          <div className="w-80 md:w-96 bg-white rounded-2xl shadow-2xl overflow-hidden">
            <div className="px-4 py-3 bg-indigo-600 text-white flex items-center justify-between">
              <div className="font-semibold">Asistente STARTIA</div>
              <div className="flex gap-2">
                <button onClick={() => { setChatMessages([{ from: 'bot', text: 'Hola 👋 — Soy el asistente IA de STARTIA. ¿En qué puedo ayudarte hoy?' }]); }} className="text-sm">Reset</button>
                <button onClick={() => setChatOpen(false)} className="text-sm">Cerrar</button>
              </div>
            </div>
            <div className="h-64 overflow-y-auto p-4 space-y-3" id="chat-window">
              {chatMessages.map((m, i) => (
                <div key={i} className={`flex ${m.from === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] p-3 rounded-xl ${m.from === 'user' ? 'bg-indigo-600 text-white' : 'bg-gray-100'}`}>
                    {m.text}
                  </div>
                </div>
              ))}
            </div>
            <div className="p-3 border-t">
              <ChatInput onSend={sendChat} inputRef={inputRef} />
            </div>
          </div>
        ) : (
          <button onClick={() => setChatOpen(true)} className="w-14 h-14 rounded-full bg-indigo-600 flex items-center justify-center text-white shadow-lg">IA</button>
        )}
      </div>
    </div>
  );
}

function FeatureCard({ title, desc }) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm">
      <h4 className="font-semibold">{title}</h4>
      <p className="mt-2 text-sm text-gray-500">{desc}</p>
    </div>
  );
}

function PlanCard({ title, price, bullets, highlight }) {
  return (
    <div className={`p-6 rounded-2xl ${highlight ? 'border-2 border-indigo-600' : 'shadow-sm'} bg-white` }>
      <div className="flex justify-between items-center">
        <div>
          <h5 className="text-lg font-semibold">{title}</h5>
          <div className="text-2xl font-extrabold mt-2">{price}</div>
        </div>
        <div>
          <button className="px-3 py-1 bg-indigo-600 text-white rounded-md">Elegir</button>
        </div>
      </div>
      <ul className="mt-4 text-sm text-gray-600 space-y-2">
        {bullets.map((b,i)=> <li key={i}>• {b}</li>)}
      </ul>
    </div>
  );
}

function FAQ({ question, answer }){
  return (
    <div className="mt-3">
      <div className="font-medium">{question}</div>
      <div className="text-sm text-gray-600 mt-1">{answer}</div>
    </div>
  );
}

function ChatInput({ onSend, inputRef }){
  const [text, setText] = useState('');
  return (
    <div className="flex gap-2">
      <input ref={inputRef} value={text} onChange={e=>setText(e.target.value)} onKeyDown={e=>{ if(e.key==='Enter'){ onSend(text); setText(''); } }} placeholder="Escribe tu pregunta..." className="flex-1 border px-3 py-2 rounded-md" />
      <button onClick={() => { onSend(text); setText(''); }} className="px-3 py-2 bg-indigo-600 text-white rounded-md">Enviar</button>
    </div>
  );
}
