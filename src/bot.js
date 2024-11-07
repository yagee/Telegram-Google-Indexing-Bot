import TelegramBot from 'node-telegram-bot-api';
import { telegramConfig } from './config/index.js';
import {
  handleStart,
  handleIndex,
  handleRemove,
  handleInvalidCommand,
} from './handlers/commandHandlers.js';

try {
  const bot = new TelegramBot(telegramConfig.token, telegramConfig.options);

  // Register command handlers
  bot.onText(/\/start/, (msg) => handleStart(bot, msg));
  bot.onText(/\/index (.+)/, (msg, match) => handleIndex(bot, msg, match));
  bot.onText(/\/remove (.+)/, (msg, match) => handleRemove(bot, msg, match));
  bot.on('message', (msg) => handleInvalidCommand(bot, msg));

  console.log('🤖 Bot is running...');
} catch (error) {
  console.error('❌ Failed to start bot:', error.message);
  process.exit(1);
}
