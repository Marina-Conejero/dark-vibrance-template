
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
    
    const response = await fetch(slackWebhookUrl, {
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
