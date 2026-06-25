/* =====================================================
   TECHY BOX — Vercel Serverless Function
   /api/quote  →  POST handler (Nodemailer + Gmail)
   ===================================================== */

const nodemailer = require('nodemailer');

// ---- Input sanitizer ----
const clean = (val) => String(val || '').replace(/[<>]/g, '').trim().slice(0, 2000);

module.exports = async (req, res) => {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST')
    return res.status(405).json({ success: false, message: 'Method not allowed.' });

  const { name, phone, email, service, budget, message } = req.body;

  // Validation
  if (!name || !phone || !email || !service || !message)
    return res.status(400).json({ success: false, message: 'All required fields must be filled.' });

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email))
    return res.status(400).json({ success: false, message: 'Invalid email address.' });

  // SMTP transporter
  const transporter = nodemailer.createTransport({
    host   : process.env.SMTP_HOST || 'smtp.gmail.com',
    port   : Number(process.env.SMTP_PORT) || 587,
    secure : false,
    auth   : {
      user : process.env.SMTP_USER,
      pass : process.env.SMTP_PASS,
    },
  });

  // Email to owner
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
            <tr><td style="padding:10px 0;border-bottom:1px solid #1E2D4A;color:#8892B0;font-size:13px;width:130px">Name</td>
                <td style="padding:10px 0;border-bottom:1px solid #1E2D4A;font-weight:600;font-size:15px">${clean(name)}</td></tr>
            <tr><td style="padding:10px 0;border-bottom:1px solid #1E2D4A;color:#8892B0;font-size:13px">Phone</td>
                <td style="padding:10px 0;border-bottom:1px solid #1E2D4A;font-size:15px">${clean(phone)}</td></tr>
            <tr><td style="padding:10px 0;border-bottom:1px solid #1E2D4A;color:#8892B0;font-size:13px">Email</td>
                <td style="padding:10px 0;border-bottom:1px solid #1E2D4A;font-size:15px"><a href="mailto:${clean(email)}" style="color:#60A5FA">${clean(email)}</a></td></tr>
            <tr><td style="padding:10px 0;border-bottom:1px solid #1E2D4A;color:#8892B0;font-size:13px">Service</td>
                <td style="padding:10px 0;border-bottom:1px solid #1E2D4A;font-size:15px"><strong style="color:#60A5FA">${clean(service)}</strong></td></tr>
            <tr><td style="padding:10px 0;border-bottom:1px solid #1E2D4A;color:#8892B0;font-size:13px">Budget</td>
                <td style="padding:10px 0;border-bottom:1px solid #1E2D4A;font-size:15px">${clean(budget) || 'Not specified'}</td></tr>
          </table>
          <div style="margin-top:24px">
            <p style="color:#8892B0;font-size:13px;margin-bottom:8px">Project Description</p>
            <div style="background:#0D1F38;border:1px solid #1E2D4A;border-radius:8px;padding:16px;font-size:14px;line-height:1.7;white-space:pre-wrap">${clean(message)}</div>
          </div>
          <div style="margin-top:28px;padding-top:20px;border-top:1px solid #1E2D4A">
            <a href="mailto:${clean(email)}" style="display:inline-block;background:linear-gradient(135deg,#3B82F6,#1D4ED8);color:#fff;padding:12px 24px;border-radius:8px;text-decoration:none;font-weight:600;font-size:14px">Reply to ${clean(name)} →</a>
          </div>
        </div>
        <div style="padding:16px 32px;background:#060E1C;text-align:center;font-size:12px;color:#4A5568">Techy Box — Quote Request System</div>
      </div>`,
  };

  // Auto-reply to customer
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
          <p style="color:#8892B0;line-height:1.75">Thank you! We've received your quote request for <strong style="color:#60A5FA">${clean(service)}</strong> and will get back to you within <strong style="color:#fff">24 hours</strong>.</p>
          <div style="background:#0D1F38;border:1px solid #1E2D4A;border-radius:8px;padding:16px;margin:20px 0">
            <p style="margin:0 0 6px;color:#8892B0;font-size:13px">Your message</p>
            <p style="margin:0;font-size:14px;white-space:pre-wrap">${clean(message).slice(0, 300)}${message.length > 300 ? '…' : ''}</p>
          </div>
          <p style="color:#8892B0;font-size:14px;line-height:1.7">You can reply to this email or message us on <a href="https://facebook.com/techybox" style="color:#60A5FA">Facebook</a>.</p>
          <p style="margin-top:24px;font-size:14px">— The Techy Box Team 🚀</p>
        </div>
        <div style="padding:16px 32px;background:#060E1C;text-align:center;font-size:12px;color:#4A5568">© 2025 Techy Box · techybox26@gmail.com</div>
      </div>`,
  };

  try {
    await transporter.sendMail(mailToOwner);
    await transporter.sendMail(mailToCustomer);
    console.log(`📧  Quote sent: ${clean(email)} — ${clean(service)}`);
    return res.status(200).json({ success: true, message: 'Quote request sent successfully!' });
  } catch (err) {
    console.error('❌  Email error:', err.message);
    return res.status(500).json({ success: false, message: 'Failed to send email. Please try again.' });
  }
};
