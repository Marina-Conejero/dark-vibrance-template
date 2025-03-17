
import { Resend } from 'resend';

// Initialize with a placeholder API key - we'll set this at runtime
let resendInstance: Resend | null = null;
let apiKey = '';

/**
 * Sets the Resend API key and initializes the Resend instance
 */
export const setResendApiKey = (key: string) => {
  apiKey = key;
  resendInstance = new Resend(key);
  return !!resendInstance;
};

/**
 * Sends an email with the contact form data
 */
export const sendContactEmail = async (formData: {
  name: string;
  email: string;
  company: string;
  message: string;
}) => {
  if (!resendInstance) {
    throw new Error('Resend API key not set');
  }

  try {
    const { name, email, company, message } = formData;
    
    const response = await resendInstance.emails.send({
      from: 'onboarding@resend.dev', // Use verified sender or domain in Resend
      to: 'marina@hivemechanics.io',
      subject: `New Contact Form Submission from ${name}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Company:</strong> ${company}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `,
    });

    return response;
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
};

/**
 * Returns whether the Resend API key is set
 */
export const isResendConfigured = () => {
  return !!apiKey;
};
