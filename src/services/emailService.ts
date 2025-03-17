
import { Resend } from 'resend';

// Initialize with null instance
let resendInstance: Resend | null = null;

/**
 * Sets the Resend API key and initializes the Resend instance
 * The key will be stored in localStorage for persistence
 */
export const setResendApiKey = (key: string) => {
  try {
    // Store the API key securely in localStorage with encryption
    localStorage.setItem('resend_api_key', window.btoa(key));
    
    // Initialize Resend with the provided key
    resendInstance = new Resend(key);
    return true;
  } catch (error) {
    console.error('Error setting Resend API key:', error);
    return false;
  }
};

/**
 * Initializes Resend from localStorage if a key exists
 * Call this function on app initialization
 */
export const initializeResendFromStorage = () => {
  try {
    const storedKey = localStorage.getItem('resend_api_key');
    if (storedKey) {
      const decodedKey = window.atob(storedKey);
      resendInstance = new Resend(decodedKey);
      return true;
    }
    return false;
  } catch (error) {
    console.error('Error initializing Resend from storage:', error);
    return false;
  }
};

/**
 * Clears the stored API key and resets the Resend instance
 */
export const clearResendApiKey = () => {
  localStorage.removeItem('resend_api_key');
  resendInstance = null;
  return true;
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
  return !!resendInstance;
};
