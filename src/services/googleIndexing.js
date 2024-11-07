import { googleAuth } from '../config/index.js';
import { checkRateLimit } from './rateLimit.js';
import { validateUrl } from './urlValidator.js';

export async function submitUrl(url, userId, type = 'URL_UPDATED') {
  // Check rate limit
  checkRateLimit(userId);

  // Validate URL
  validateUrl(url);

  try {
    const client = await googleAuth.getClient();

    const response = await client.request({
      url: 'https://indexing.googleapis.com/v3/urlNotifications:publish',
      method: 'POST',
      data: {
        url: url,
        type: type,
      },
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.data) {
      throw new Error('No response received from Google Indexing API');
    }

    return response.data;
  } catch (error) {
    console.error('Google Indexing API Error:', error);

    if (error.response?.data?.error) {
      throw new Error(`API Error: ${error.response.data.error.message}`);
    } else if (error.code === 'ENOTFOUND') {
      throw new Error('Network error: Unable to reach Google API');
    } else {
      throw new Error(`Failed to submit URL: ${error.message}`);
    }
  }
}
