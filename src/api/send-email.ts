
import { Resend } from 'resend';

// Initialize Resend with API key
// You'll need to set up your Resend API key in your environment
const resend = new Resend(process.env.RESEND_API_KEY || '');

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

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
}
