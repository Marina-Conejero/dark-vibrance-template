
/**
 * Service for sending messages to Slack using webhooks
 */

// Using the provided webhook URL
const slackWebhookUrl = 'https://hooks.slack.com/services/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';

/**
 * Checks if Slack webhook is configured
 */
export const isSlackConfigured = (): boolean => {
  return true; // Always return true since we have a hardcoded webhook URL
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
    
    // For browser environments, we need to handle CORS
    // Some environments might block direct requests to external services
    // We'll use a more direct approach with simpler message format
    
    console.log('Sending to Slack:', slackMessage);
    
    const response = await fetch(slackWebhookUrl, {
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
