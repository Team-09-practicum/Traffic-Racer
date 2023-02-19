/* eslint-disable @typescript-eslint/no-non-null-assertion */
import TelegramBot from 'node-telegram-bot-api';
import type { IGithubUser } from '../typings/IGithubUser';

const TOKEN = process.env.TELEGRAM_GITHUB_BOT_TOKEN!;
const chatId = process.env.TELEGRAM_CHAT_ID!;

const bot = new TelegramBot(TOKEN, { polling: true });

enum Users {
  'Al-nvrsk' = '@Alexey_telegram',
  'LarryBezrukov' = '@larry9498',
  'rufflet' = '@rufflet',
  'StepanovaValeriya' = '@StepanovaV',
  'swash1' = '@tkhayretdinov',
}

export class TelegramNotificationService {
  static async sendMessage(prUrl: string, prReviewers: IGithubUser[]) {
    const telegramUsers = prReviewers.reduce((result: string[], user: IGithubUser) => {
      if (Users[user.login as keyof typeof Users]) {
        result.push(Users[user.login as keyof typeof Users]);
      }
      return result;
    }, []);
    const usersString = telegramUsers.join(', ');

    const message = `Был открыт новый PR:\n${prUrl}\nНа ревью назначены:\n${usersString}`;

    bot.sendMessage(chatId, message);
  }
}
