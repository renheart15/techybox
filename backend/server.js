/* =====================================================
   TECHY BOX — Quote Form Backend
   Express + Nodemailer (Gmail SMTP)
   ===================================================== */

require('dotenv').config();
const express    = require('express');
const nodemailer = require('nodemailer');
const cors       = require('cors');
const rateLimit  = require('express-rate-limit');

const app  = express();
const PORT = process.env.PORT || 3001;

/* ---- Middleware ---- */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS — allow the frontend origin
app.use(cors({
  origin: process.env.ALLOWED_ORIGIN || '*',
  methods: ['POST', 'GET', 'OPTIONS'],
}));

// Rate limiting — max 10 quote requests per IP per 15 minutes
const quoteLimiter = rateLimit({
  windowMs : 15 * 60 * 1000,
  max      : 10,
  message  : { success: false, message: 'Too many requests. Please try again later.' },
});

/* ---- Nodemailer Transporter (Gmail SMTP) ---- */
const transporter = nodemailer.createTransport({
  host   : process.env.SMTP_HOST || 'smtp.gmail.com',
  port   : Number(process.env.SMTP_PORT) || 587,
  secure : false,   // true for port 465, false for 587 (STARTTLS)
  auth   : {
    user : process.env.SMTP_USER,
    pass : process.env.SMTP_PASS,
  },
});

// Verify SMTP connection on startup
transporter.verify((err) => {
  if (err) {
    console.error('❌  SMTP connection failed:', err.message);
    console.error('    → Check your SMTP_USER and SMTP_PASS in .env');
  } else {
    console.log('✅  SMTP connected — ready to send emails');
  }
});

/* ---- Helper: sanitize string input ---- */
const clean = (val) => String(val || '').replace(/[<>]/g, '').trim().slice(0, 2000);

/* ============================================================
   POST /api/quote  —  Receive & forward quote request
   ============================================================ */
app.post('/api/quote', quoteLimiter, async (req, res) => {
  const { name, phone, email, service, budget, message } = req.body;

  // Basic validation
  if (!name || !phone || !email || !service || !message) {
    return res.status(400).json({ success: false, message: 'All required fields must be filled.' });
  }

  // Simple email format check
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ success: false, message: 'Invalid email address.' });
  }

  // Build email content
  const mailToOwner = {
    from    : `"${process.env.FROM_NAME || 'Techy Box Website'}" <${process.env.SMTP_USER}>`,
    to      : process.env.RECIPIENT_EMAIL || process.env.SMTP_USER,
    replyTo : `"${clean(name)}" <${clean(email)}>`,
    subject : `📋 Quote Request — ${clean(service)} | ${clean(name)}`,
    html    : `
      <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;background:#0A1628;color:#E2E8F0;border-radius:12px;overflow:hidden">
        <div style="background:linear-gradient(135deg,#3B82F6,#1D4ED8);padding:28px 32px">
          <h1 style="margin:0;color:#fff;font-size:22px">📋 New Quote Request</h1>
          <p style="margin:6px 0 0;color:rgba(255,255,255,0.75);font-size:14px">Received from the Techy Box website</p>
        </div>
        <div style="padding:32px">
          <table style="width:100%;border-collapse:collapse">
            <tr>
              <td style="padding:10px 0;border-bottom:1px solid #1E2D4A;color:#8892B0;font-size:13px;width:130px">Name</td>
              <td style="padding:10px 0;border-bottom:1px solid #1E2D4A;font-weight:600;font-size:15px">${clean(name)}</td>
            </tr>
            <tr>
              <td style="padding:10px 0;border-bottom:1px solid #1E2D4A;color:#8892B0;font-size:13px">Phone</td>
              <td style="padding:10px 0;border-bottom:1px solid #1E2D4A;font-size:15px">${clean(phone)}</td>
            </tr>
            <tr>
              <td style="padding:10px 0;border-bottom:1px solid #1E2D4A;color:#8892B0;font-size:13px">Email</td>
              <td style="padding:10px 0;border-bottom:1px solid #1E2D4A;font-size:15px"><a href="mailto:${clean(email)}" style="color:#60A5FA">${clean(email)}</a></td>
            </tr>
            <tr>
              <td style="padding:10px 0;border-bottom:1px solid #1E2D4A;color:#8892B0;font-size:13px">Service</td>
              <td style="padding:10px 0;border-bottom:1px solid #1E2D4A;font-size:15px"><strong style="color:#60A5FA">${clean(service)}</strong></td>
            </tr>
            <tr>
              <td style="padding:10px 0;border-bottom:1px solid #1E2D4A;color:#8892B0;font-size:13px">Budget</td>
              <td style="padding:10px 0;border-bottom:1px solid #1E2D4A;font-size:15px">${clean(budget) || 'Not specified'}</td>
            </tr>
          </table>
          <div style="margin-top:24px">
            <p style="color:#8892B0;font-size:13px;margin-bottom:8px">Project Description</p>
            <div style="background:#0D1F38;border:1px solid #1E2D4A;border-radius:8px;padding:16px;font-size:14px;line-height:1.7;white-space:pre-wrap">${clean(message)}</div>
          </div>
          <div style="margin-top:28px;padding-top:20px;border-top:1px solid #1E2D4A">
            <a href="mailto:${clean(email)}" style="display:inline-block;background:linear-gradient(135deg,#3B82F6,#1D4ED8);color:#fff;padding:12px 24px;border-radius:8px;text-decoration:none;font-weight:600;font-size:14px">
              Reply to ${clean(name)} →
            </a>
          </div>
        </div>
        <div style="padding:16px 32px;background:#060E1C;text-align:center;font-size:12px;color:#4A5568">
          Techy Box — Quote Request System
        </div>
      </div>
    `,
  };

  // Auto-reply to the customer
  const mailToCustomer = {
    from    : `"Techy Box" <${process.env.SMTP_USER}>`,
    to      : `"${clean(name)}" <${clean(email)}>`,
    subject : `✅ We received your quote request — Techy Box`,
    html    : `
      <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;background:#0A1628;color:#E2E8F0;border-radius:12px;overflow:hidden">
        <div style="background:linear-gradient(135deg,#3B82F6,#1D4ED8);padding:28px 32px">
          <h1 style="margin:0;color:#fff;font-size:22px">✅ Quote Request Received!</h1>
        </div>
        <div style="padding:32px">
          <p style="font-size:16px;line-height:1.7">Hi <strong>${clean(name)}</strong>,</p>
          <p style="color:#8892B0;line-height:1.75">Thank you for reaching out! We've received your quote request for <strong style="color:#60A5FA">${clean(service)}</strong> and will get back to you within <strong style="color:#fff">24 hours</strong>.</p>
          <div style="background:#0D1F38;border:1px solid #1E2D4A;border-radius:8px;padding:16px;margin:20px 0">
            <p style="margin:0 0 6px;color:#8892B0;font-size:13px">Your message summary</p>
            <p style="margin:0;font-size:14px;white-space:pre-wrap">${clean(message).slice(0, 300)}${message.length > 300 ? '…' : ''}</p>
          </div>
          <p style="color:#8892B0;font-size:14px;line-height:1.7">If you need to follow up, you can reply to this email or message us on <a href="https://facebook.com/techybox" style="color:#60A5FA">Facebook</a>.</p>
          <p style="margin-top:24px;font-size:14px">— The Techy Box Team 🚀</p>
        </div>
        <div style="padding:16px 32px;background:#060E1C;text-align:center;font-size:12px;color:#4A5568">
          © 2025 Techy Box · techybox26@gmail.com
        </div>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailToOwner);
    await transporter.sendMail(mailToCustomer);

    console.log(`📧  Quote sent from ${clean(email)} — ${clean(service)}`);
    return res.status(200).json({ success: true, message: 'Quote request sent successfully!' });
  } catch (err) {
    console.error('❌  Failed to send email:', err.message);
    return res.status(500).json({ success: false, message: 'Failed to send email. Please try again.' });
  }
});

/* ---- Health check ---- */
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', service: 'Techy Box Backend', timestamp: new Date().toISOString() });
});

/* ---- Start server ---- */
app.listen(PORT, () => {
  console.log(`\n🚀  Techy Box backend running at http://localhost:${PORT}`);
  console.log(`📋  Quote endpoint: POST http://localhost:${PORT}/api/quote`);
  console.log(`💚  Health check:   GET  http://localhost:${PORT}/api/health\n`);
});
