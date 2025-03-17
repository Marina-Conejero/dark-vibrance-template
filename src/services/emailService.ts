
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
  const { name, email, company, message } = formData;
  let slackSuccess = false;
  let emailSuccess = false;
  
  // First, try sending to Slack as it's non-critical
  if (isSlackConfigured()) {
    try {
      console.log('Attempting to send to Slack...');
      await sendToSlack(formData);
      slackSuccess = true;
      console.log('Successfully sent to Slack');
    } catch (slackError) {
      console.error('Error sending to Slack, continuing with email:', slackError);
      // Don't block email sending if Slack fails
    }
  }
  
  // Then send email via Resend
  try {
    console.log('Sending email via Resend...');
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
    
    emailSuccess = true;
    console.log('Email sent successfully:', emailResponse);
    return { emailSuccess, slackSuccess, emailResponse };
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
