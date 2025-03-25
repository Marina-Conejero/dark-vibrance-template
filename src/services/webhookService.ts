
/**
 * Service for sending messages to Make.com using webhooks
 */

/**
 * Gets the webhook URL from environment variables
 */
const getWebhookUrl = (): string => {
  return import.meta.env.VITE_WEBHOOK_URL || 'https://hook.eu2.make.com/ecdy4yhqu7twvvv49ph5cplxgiykrtft';
};

/**
 * Checks if webhook is configured
 */
export const isWebhookConfigured = (): boolean => {
  return !!getWebhookUrl();
};

/**
 * Sends a message to Make.com with contact form data
 */
export const sendToWebhook = async (formData: {
  name: string;
  email: string;
  company: string;
  message: string;
}): Promise<Response | null> => {
  try {
    const webhookUrl = getWebhookUrl();
    
    if (!webhookUrl) {
      console.error('Webhook URL is not configured');
      return null;
    }
    
    const { name, email, company, message } = formData;
    
    // Get current date and time
    const now = new Date();
    const timestamp = now.toISOString();
    
    // Format the message for Make.com
    const payload = {
      name,
      email,
      company,
      message,
      timestamp
    };
    
    console.log('Sending to webhook:', payload);
    
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      mode: 'no-cors', // Use no-cors mode to bypass CORS restrictions
      body: JSON.stringify(payload)
    });
    
    console.log('Webhook response received');
    return response;
  } catch (error) {
    console.error('Error sending to webhook:', error);
    // Don't throw the error - we'll handle failures gracefully
    return null;
  }
};
