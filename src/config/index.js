import dotenv from 'dotenv';
import { GoogleAuth } from 'google-auth-library';

dotenv.config();

if (!process.env.TELEGRAM_BOT_TOKEN) {
  throw new Error('TELEGRAM_BOT_TOKEN is not set in environment variables');
}

if (!process.env.GOOGLE_CLIENT_EMAIL || !process.env.GOOGLE_PRIVATE_KEY) {
  throw new Error(
    'Google credentials are not properly set in environment variables',
  );
}

export const telegramConfig = {
  token: process.env.TELEGRAM_BOT_TOKEN,
  options: { polling: true },
};

// Create credentials object with proper formatting
const credentials = {
  type: 'service_account',
  private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
  client_email: process.env.GOOGLE_CLIENT_EMAIL,
  token_url: 'https://oauth2.googleapis.com/token',
};

export const googleAuth = new GoogleAuth({
  credentials,
  scopes: ['https://www.googleapis.com/auth/indexing'],
});
