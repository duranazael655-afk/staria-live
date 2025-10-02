# STARTIA - Web viva con IA (Ready package)

Contenido:
- `src/` - React app (landing + chat widget)
- `api/` - serverless functions: lead, chat, pay-stripe, pay-paypal
- `.env.example` - variables a completar en Vercel
- `README.md` - este archivo

---

## 1) Cómo desplegar rápido (recomendado: Vercel)
Opciones:
A) **Deploy con GitHub (1-click desde Vercel)** - recomendado para producción.
B) **Subir manualmente el ZIP a Vercel Import (si lo permiten)**.

### Opción A - pasos (rápido)
1. Crea un nuevo repositorio en GitHub (ej: `startia-live-web`).
2. Sube todos los archivos del ZIP al repo (o usa la interfaz de GitHub Desktop).
3. Entra a https://vercel.com/new , selecciona "Importar repositorio" y elige tu repo.
4. Durante la importación, en Vercel -> "Environment Variables" pega los valores que necesitas (usa `.env.example` como guía).
   - `HUBSPOT_API_KEY`, `HUBSPOT_PORTAL_ID`, `HUBSPOT_FORM_ID` (si los tienes).
   - `WITAI_TOKEN` (opcional, para el bot demo).
   - `STRIPE_SECRET_KEY`, `STRIPE_PUBLISHABLE_KEY`.
   - `PAYPAL_CLIENT_ID`, `PAYPAL_SECRET`.
5. Finaliza el deploy. Vercel te dará un dominio temporal: `https://miagencia.vercel.app` (puede variar).
6. Prueba los flujos:
   - En la landing, envía un lead → revisa el log en Vercel o en HubSpot.
   - Abre el chat widget y envía mensajes (demo con Wit.ai si configurado).
   - Prueba el checkout (Stripe demo o PayPal demo).

---

## 2) Subir el ZIP a Google Drive (respaldo)
- Guarda este ZIP en tu Drive STARTIA y mantenlo como respaldo.

---

## 3) Migrar a dominio propio
1. Compra tu dominio en Namecheap/GoDaddy/Google Domains.
2. En Vercel -> Settings del proyecto -> Domains -> Add -> escribe tu dominio.
3. Sigue las instrucciones para añadir registros DNS (A / CNAME) en tu proveedor de dominio.
4. Vercel asignará SSL automáticamente.

---

## 4) Conectar HubSpot
- La función `api/lead.js` usa HubSpot Forms endpoint si configuras `HUBSPOT_PORTAL_ID` y `HUBSPOT_FORM_ID`.
- Alternativa rápida: crea un formulario en HubSpot y pega su embed HTML en la sección del formulario del frontend.

---

## 5) Chatbot
- Demo: sin `WITAI_TOKEN` el bot usa respuestas predefinidas.
- Para mejorar: crea token en Wit.ai o cambia a OpenAI en el futuro (toggle `USE_OPENAI=true` y pega `OPENAI_API_KEY`).

---

Si quieres, yo te entrego:
- Un botón e instrucciones para importar este repositorio en tu cuenta Vercel (te lo preparo en el siguiente mensaje).
- O si prefieres, yo puedo hacer el deploy en mi entorno y transferirte el proyecto (dime qué prefieres).
