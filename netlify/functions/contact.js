
export async function handler(event, context) {
  const webhookUrl = process.env.WEBHOOK_URL || 'https://hook.eu2.make.com/ecdy4yhqu7twvvv49ph5cplxgiykrtft';

  const data = JSON.parse(event.body);

  const payload = {
    name: data.name,
    email: data.email,
    company: data.company,
    message: data.message,
    timestamp: new Date().toISOString()
  };

  try {
    const res = await fetch(webhookUrl, {
      method: "POST",
      body: JSON.stringify(payload),
      headers: { "Content-Type": "application/json" }
    });

    if (!res.ok) {
      return {
        statusCode: res.status,
        body: "Failed to send message to webhook"
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
