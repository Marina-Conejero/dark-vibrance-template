
const express = require('express');
const bodyParser = require('body-parser');
const { Resend } = require('resend');
const path = require('path');
const fs = require('fs');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Initialize Resend with API key from environment
let resend = null;
let resendApiKey = process.env.RESEND_API_KEY;

const initializeResend = () => {
  if (!resendApiKey || resendApiKey === 'your_resend_api_key_here') {
    console.warn('⚠️ WARNING: RESEND_API_KEY is not set or using default value. Email functionality will not work.');
    return null;
  }
  return new Resend(resendApiKey);
};

resend = initializeResend();

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../dist')));

// API endpoint for setting the API key
app.post('/api/set-api-key', async (req, res) => {
  const { apiKey } = req.body;

  if (!apiKey) {
    return res.status(400).json({ success: false, error: 'API key is required' });
  }

  try {
    // Update the environment variable in memory
    resendApiKey = apiKey;
    process.env.RESEND_API_KEY = apiKey;
    
    // Reinitialize Resend with the new API key
    resend = new Resend(apiKey);
    
    // Update the .env file
    const envPath = path.resolve(process.cwd(), '.env');
    let envContent = '';
    
    // Read existing content if the file exists
    if (fs.existsSync(envPath)) {
      envContent = fs.readFileSync(envPath, 'utf8');
      
      // Replace the API key line or add it if it doesn't exist
      if (envContent.includes('RESEND_API_KEY=')) {
        envContent = envContent.replace(
          /RESEND_API_KEY=.*(\r?\n|$)/,
          `RESEND_API_KEY=${apiKey}$1`
        );
      } else {
        envContent += `\nRESEND_API_KEY=${apiKey}\n`;
      }
    } else {
      // Create a new .env file
      envContent = `RESEND_API_KEY=${apiKey}\n`;
    }
    
    // Write the updated content back to the .env file
    fs.writeFileSync(envPath, envContent);
    
    console.log('✅ Resend API key set successfully');
    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Error updating API key:', error);
    return res.status(500).json({ success: false, error: 'Failed to update API key' });
  }
});

// API endpoint for sending emails
app.post('/api/send-email', async (req, res) => {
  const { name, email, company, message, recipient } = req.body;

  if (!name || !email || !company || !message || !recipient) {
    return res.status(400).json({ success: false, error: 'Missing required fields' });
  }

  // Check if Resend is initialized
  if (!resend) {
    // Try to initialize again with current environment
    resend = initializeResend();
    
    // If still not initialized, return error
    if (!resend) {
      return res.status(500).json({ 
        success: false, 
        error: 'Resend API key not configured. Please set the API key first.'
      });
    }
  }

  try {
    // Send email using Resend
    const data = await resend.emails.send({
      from: 'Website Contact <onboarding@resend.dev>',
      to: recipient,
      subject: 'New Contact Form Submission',
      text: `
Name: ${name}
Email: ${email}
Company: ${company}
Message: ${message}
      `,
      html: `
<div>
  <h2>New Contact Form Submission</h2>
  <p><strong>Name:</strong> ${name}</p>
  <p><strong>Email:</strong> ${email}</p>
  <p><strong>Company:</strong> ${company}</p>
  <p><strong>Message:</strong> ${message}</p>
</div>
      `,
    });

    return res.status(200).json({ success: true, data });
  } catch (error) {
    console.error('Error sending email:', error);
    return res.status(500).json({ success: false, error: 'Failed to send email' });
  }
});

// Fallback route for SPA
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  if (!resendApiKey || resendApiKey === 'your_resend_api_key_here') {
    console.log('📧 Email functionality is disabled. Set the API key in the contact form to enable it.');
  } else {
    console.log('📧 Email functionality is enabled.');
  }
});
