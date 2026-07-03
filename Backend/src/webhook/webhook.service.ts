import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import axios from 'axios';

@Injectable()
export class WebhookService {
  constructor(private prisma: PrismaService) {}

  async getPendingNotifications() {
    return this.prisma.notification.findMany({
      where: { sent: false },
      orderBy: { createdAt: 'asc' },
    });
  }

  async sendPendingNotifications() {
    const notifications = await this.getPendingNotifications();
    const results: any[] = [];

    for (const notification of notifications) {
      try {
        const token = process.env.BOT_TOKEN;
        const chatId = process.env.CHAT_ID;

        // Try to send to Telegram
        const url = `https://api.telegram.org/bot${token}/sendMessage`;
        await axios.post(url, {
          chat_id: chatId,
          text: notification.message,
        }, { timeout: 10000 });

        // Mark as sent
        await this.prisma.notification.update({
          where: { id: notification.id },
          data: { sent: true },
        });

        results.push({
          id: notification.id,
          status: 'sent',
          message: 'Successfully sent to Telegram',
        });
      } catch (error: any) {
        console.error(`Failed to send notification ${notification.id}:`, error);
        results.push({
          id: notification.id,
          status: 'failed',
          message: error.message,
        });
      }
    }

    return {
      total: notifications.length,
      results,
    };
  }
}
