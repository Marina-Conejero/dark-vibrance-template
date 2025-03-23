
/**
 * Service for sending messages to Slack using webhooks
 */

/**
 * Gets the Slack webhook URL from environment variables
 */
const getSlackWebhookUrl = (): string => {
  // Hardcoded webhook URL - this will be replaced with environment variable in production
  // In development, we'll use this directly
  return "https://hooks.slack.com/services/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";
};

/**
 * Checks if Slack webhook is configured
 */
export const isSlackConfigured = (): boolean => {
  return true; // We're using a direct webhook URL
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
