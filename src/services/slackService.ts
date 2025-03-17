
/**
 * Service for sending messages to Slack using webhooks
 */

// This should be replaced with an environment variable in a production environment
// For demo purposes, we'll use a placeholder that users need to replace
let slackWebhookUrl = '';

/**
 * Sets the Slack webhook URL
 */
export const setSlackWebhookUrl = (url: string) => {
  slackWebhookUrl = url;
  // Store in localStorage for persistence
  localStorage.setItem('slackWebhookUrl', url);
};

/**
 * Retrieves the stored Slack webhook URL
 */
export const getSlackWebhookUrl = (): string => {
  // Try to get from state first, then localStorage
  if (!slackWebhookUrl) {
    const storedUrl = localStorage.getItem('slackWebhookUrl');
    if (storedUrl) {
      slackWebhookUrl = storedUrl;
    }
  }
  return slackWebhookUrl;
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
  const webhookUrl = getSlackWebhookUrl();
  
  if (!webhookUrl) {
    console.warn('Slack webhook URL not configured');
    return null;
  }
  
  try {
    const { name, email, company, message } = formData;
    
    // Format the message for Slack
    const slackMessage = {
      blocks: [
        {
          type: "header",
          text: {
            type: "plain_text",
            text: "📬 New Contact Form Submission",
            emoji: true
          }
        },
        {
          type: "divider"
        },
        {
          type: "section",
          fields: [
            {
              type: "mrkdwn",
              text: `*From:*\n${name}`
            },
            {
              type: "mrkdwn",
              text: `*Email:*\n${email}`
            }
          ]
        },
        {
          type: "section",
          fields: [
            {
              type: "mrkdwn",
              text: `*Company:*\n${company}`
            }
          ]
        },
        {
          type: "section",
          text: {
            type: "mrkdwn",
            text: `*Message:*\n${message}`
          }
        }
      ]
    };
    
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(slackMessage)
    });
    
    if (!response.ok) {
      throw new Error(`Slack API error: ${response.statusText}`);
    }
    
    return response;
  } catch (error) {
    console.error('Error sending to Slack:', error);
    throw error;
  }
};
