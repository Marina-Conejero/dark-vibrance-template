
import { Resend } from 'resend';
import { sendToSlack, isSlackConfigured } from './slackService';

// Initialize with the provided API key
const resendInstance = new Resend('re_LdbpXztf_6VVw2yFKKyCCj3qAWnNjqQSZ');

/**
 * Sends an email with the contact form data
 * If Slack is configured, also sends to Slack
 */
export const sendContactEmail = async (formData: {
  name: string;
  email: string;
  company: string;
  message: string;
}) => {
  try {
    const { name, email, company, message } = formData;
    
    // Send email via Resend
    const emailResponse = await resendInstance.emails.send({
      from: 'onboarding@resend.dev', // Use verified sender or domain in Resend
      to: 'marina@hivemechanics.io', // Replace with your email
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
    
    // Always send to Slack as well since it's now configured by default
    try {
      await sendToSlack(formData);
    } catch (slackError) {
      console.error('Error sending to Slack:', slackError);
      // Don't throw here, as we still sent the email successfully
    }

    return emailResponse;
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
};

/**
 * Returns whether Resend is configured
 */
export const isResendConfigured = () => {
  return true; // Always return true since we have a hardcoded API key
};
