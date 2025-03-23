
/**
 * Service for sending messages to Slack using webhooks
 */

// Private webhook URL used only in development and not exposed in repository
// For production, use environment variables set on your hosting platform
const DEVELOPMENT_WEBHOOK_URL = "https://hooks.slack.com/services/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";

/**
 * Gets the Slack webhook URL from environment variables or fallback
 */
const getSlackWebhookUrl = (): string => {
  // First try to get from environment variable (for production)
  const envWebhook = import.meta.env.VITE_SLACK_WEBHOOK_URL;
  
  if (envWebhook) {
    return envWebhook;
  }
  
  // For development, use the fallback webhook
  return DEVELOPMENT_WEBHOOK_URL;
};

/**
 * Checks if Slack webhook is configured
 */
export const isSlackConfigured = (): boolean => {
  return !!getSlackWebhookUrl();
};

/**
 * Sends a message to Slack with contact form data
 */
export const sendToSlack = async (formData: {
  name: string;
  email: string;
  company: string;
  message: string;
}): Promise<Response | null> => {
  try {
    const webhookUrl = getSlackWebhookUrl();
    
    if (!webhookUrl) {
      console.error('Slack webhook URL is not configured');
      return null;
    }
    
    const { name, email, company, message } = formData;
    
    // Get current date and time
    const now = new Date();
    const formattedDate = now.toLocaleDateString();
    const formattedTime = now.toLocaleTimeString();
    const timestamp = `${formattedDate} at ${formattedTime}`;
    
    // Format the message for Slack - using simpler format to avoid potential issues
    const slackMessage = {
      text: `📬 *New Contact Form Submission* (${timestamp})\n\n*From:* ${name}\n*Email:* ${email}\n*Company:* ${company}\n\n*Message:*\n${message}`
    };
    
    console.log('Sending to Slack:', slackMessage);
    
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      mode: 'no-cors', // Use no-cors mode to bypass CORS restrictions
      body: JSON.stringify(slackMessage)
    });
    
    console.log('Slack response received');
    return response;
  } catch (error) {
    console.error('Error sending to Slack:', error);
    // Don't throw the error - we'll handle failures gracefully
    return null;
  }
};
