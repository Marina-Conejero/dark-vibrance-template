
import fs from 'fs';
import path from 'path';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

  const { apiKey } = req.body;

  if (!apiKey) {
    return res.status(400).json({ success: false, error: 'API key is required' });
  }

  try {
    // Update the environment variable in memory
    process.env.RESEND_API_KEY = apiKey;
    
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
    
    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Error updating API key:', error);
    return res.status(500).json({ success: false, error: 'Failed to update API key' });
  }
}
