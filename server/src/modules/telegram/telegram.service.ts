import { Injectable, UnauthorizedException } from '@nestjs/common';
import { createHmac } from 'crypto';

@Injectable()
export class TelegramService {
  /**
   * Verifies the authenticity of data received from the Telegram Mini App.
   * @param initData The raw initData string from Telegram.webapp.initData
   * @param botToken The secret bot token.
   */
  verifyInitData(initData: string, botToken: string): boolean {
    const urlParams = new URLSearchParams(initData);
    const hash = urlParams.get('hash');
    urlParams.delete('hash');

    const dataCheckString = Array.from(urlParams.entries())
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([key, value]) => `${key}=${value}`)
      .join('\n');

    const secretKey = createHmac('sha256', 'WebAppData').update(botToken).digest();
    const calculatedHash = createHmac('sha256', secretKey).update(dataCheckString).digest('hex');

    if (calculatedHash !== hash) {
      throw new UnauthorizedException('Invalid Telegram initData');
    }

    return true;
  }

  /**
   * Sends a notification to a user via the Telegram Bot.
   */
  async sendNotification(chatId: string, message: string, botToken: string) {
    // Implementation using axios or a telegram library to call Telegram Bot API
    // POST https://api.telegram.org/bot<token>/sendMessage
  }

  /**
   * Verifies if a user is a member of a specific channel/group.
   */
  async verifyMembership(chatId: string, userId: string, botToken: string): Promise<boolean> {
    // Implementation to check getChatMember status
    return true;
  }

  /**
   * Fetches the subscriber count for a camp's channel.
   */
  async getSubscriberCount(channelId: string, botToken: string): Promise<number> {
    // Implementation to call getChatMembersCount
    return 1000; // Mock return
  }
}
