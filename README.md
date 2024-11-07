# Telegram Google Indexing Bot

This bot allows you to submit URLs to Google's Indexing API directly through Telegram.

## Setup

1. Create a Telegram bot using [@BotFather](https://t.me/botfather)
2. Set up a Google Cloud Project and enable the Indexing API
3. Create a Service Account and download the credentials
4. Copy `.env.example` to `.env` and fill in your credentials:
   - TELEGRAM_BOT_TOKEN: Your Telegram bot token
   - GOOGLE_CLIENT_EMAIL: Service account email
   - GOOGLE_PRIVATE_KEY: Service account private key

## Usage

- `/start` - Show available commands
- `/index [url]` - Submit a URL for indexing
- `/remove [url]` - Remove a URL from index

## Running the Bot

```bash
pnpm install
pnpm start
```
