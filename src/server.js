
const express = require('express');
const bodyParser = require('body-parser');
const { Resend } = require('resend');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Initialize Resend with API key
const resend = new Resend(process.env.RESEND_API_KEY);

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../dist')));

// API endpoint for sending emails
app.post('/api/send-email', async (req, res) => {
  const { name, email, company, message, recipient } = req.body;

  if (!name || !email || !company || !message || !recipient) {
    return res.status(400).json({ success: false, error: 'Missing required fields' });
  }

  try {
    // Send email using Resend
    const data = await resend.emails.send({
      from: 'Website Contact <onboarding@resend.dev>',
      to: recipient,
      subject: 'New Contact Form Submission',
      text: `
Name: ${name}
Email: ${email}
Company: ${company}
Message: ${message}
      `,
      html: `
<div>
  <h2>New Contact Form Submission</h2>
  <p><strong>Name:</strong> ${name}</p>
  <p><strong>Email:</strong> ${email}</p>
  <p><strong>Company:</strong> ${company}</p>
  <p><strong>Message:</strong> ${message}</p>
</div>
      `,
    });

    return res.status(200).json({ success: true, data });
  } catch (error) {
    console.error('Error sending email:', error);
    return res.status(500).json({ success: false, error: 'Failed to send email' });
  }
});

// Fallback route for SPA
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
