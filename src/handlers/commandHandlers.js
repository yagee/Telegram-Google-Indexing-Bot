import { submitUrl } from '../services/googleIndexing.js';

export async function handleStart(bot, msg) {
  const chatId = msg.chat.id;
  await bot.sendMessage(
    chatId,
    'Welcome to the Google Indexing Bot! 🚀\n\n' +
      'Commands:\n' +
      '/index [url] - Submit a URL for indexing\n' +
      '/remove [url] - Remove a URL from index\n\n' +
      'Example: /index https://example.com/page\n\n' +
      'Note: Limited to 10 requests per minute per user.',
  );
}

export async function handleIndex(bot, msg, match) {
  const chatId = msg.chat.id;
  const userId = msg.from.id;
  const url = match[1]?.trim();

  if (!url) {
    await bot.sendMessage(
      chatId,
      '❌ Please provide a URL. Example: /index https://example.com/page',
    );
    return;
  }

  try {
    await bot.sendMessage(chatId, `📝 Processing: ${url}`);
    const result = await submitUrl(url, userId, 'URL_UPDATED');

    if (result.urlNotificationMetadata?.latestUpdate?.notifyTime) {
      await bot.sendMessage(
        chatId,
        `✅ URL successfully submitted for indexing!\n\nNotification ID: ${result.urlNotificationMetadata.latestUpdate.notifyTime}`,
      );
    } else {
      await bot.sendMessage(
        chatId,
        '✅ URL submitted for indexing, but no notification ID received.',
      );
    }
  } catch (error) {
    await bot.sendMessage(
      chatId,
      `❌ Error submitting URL:\n${error.message}\n\nPlease ensure the URL is valid and you have proper permissions.`,
    );
  }
}

export async function handleRemove(bot, msg, match) {
  const chatId = msg.chat.id;
  const userId = msg.from.id;
  const url = match[1]?.trim();

  if (!url) {
    await bot.sendMessage(
      chatId,
      '❌ Please provide a URL. Example: /remove https://example.com/page',
    );
    return;
  }

  try {
    await bot.sendMessage(chatId, `🗑️ Processing removal: ${url}`);
    const result = await submitUrl(url, userId, 'URL_DELETED');

    if (result.urlNotificationMetadata?.latestUpdate?.notifyTime) {
      await bot.sendMessage(
        chatId,
        `✅ URL successfully marked for removal!\n\nNotification ID: ${result.urlNotificationMetadata.latestUpdate.notifyTime}`,
      );
    } else {
      await bot.sendMessage(
        chatId,
        '✅ URL marked for removal, but no notification ID received.',
      );
    }
  } catch (error) {
    await bot.sendMessage(
      chatId,
      `❌ Error removing URL:\n${error.message}\n\nPlease ensure the URL is valid and you have proper permissions.`,
    );
  }
}

export async function handleInvalidCommand(bot, msg) {
  if (!msg.text?.startsWith('/')) return;

  const command = msg.text.split(' ')[0];
  if (!['/start', '/index', '/remove'].includes(command)) {
    await bot.sendMessage(
      msg.chat.id,
      '❌ Invalid command. Use /start to see available commands.',
    );
  }
}
