
import { Resend } from 'resend';

// Initialize Resend with API key
const resendApiKey = process.env.RESEND_API_KEY || '';
if (!resendApiKey || resendApiKey === 'your_resend_api_key_here') {
  console.warn('⚠️ WARNING: RESEND_API_KEY is not set or using default value. Email functionality will not work.');
}
const resend = new Resend(resendApiKey);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

  const { name, email, company, message, recipient } = req.body;

  if (!name || !email || !company || !message || !recipient) {
    return res.status(400).json({ success: false, error: 'Missing required fields' });
  }

  // Check if API key is set
  if (!resendApiKey || resendApiKey === 'your_resend_api_key_here') {
    return res.status(500).json({ 
      success: false, 
      error: 'Resend API key not configured. Please set the RESEND_API_KEY environment variable.'
    });
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
