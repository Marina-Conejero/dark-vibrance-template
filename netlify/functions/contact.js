export async function handler(event, context) {
  const webhookUrl = process.env.SLACK_WEBHOOK_URL;

  const data = JSON.parse(event.body);

  const message = {
    text: `📩 New contact form submission:\n\n` +
          `👤 Name: ${data.name}\n` +
          `🏢 Company: ${data.company}\n` +
          `📧 Email: ${data.email}\n` +
          `📝 Message: ${data.message}`
  };

  try {
    const res = await fetch(webhookUrl, {
      method: "POST",
      body: JSON.stringify(message),
      headers: { "Content-Type": "application/json" }
    });

    if (!res.ok) {
      return {
        statusCode: res.status,
        body: "Failed to send message to Slack"
      };
    }

    return {
      statusCode: 200,
      body: "Message sent successfully"
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: "Server error: " + error.message
    };
  }
}
