import { Controller, Post, Get } from '@nestjs/common';
import { WebhookService } from './webhook.service';

@Controller('webhook')
export class WebhookController {
  constructor(private webhookService: WebhookService) {}

  @Post('send-notifications')
  async sendNotifications() {
    return this.webhookService.sendPendingNotifications();
  }

  @Get('notifications')
  async getNotifications() {
    return this.webhookService.getPendingNotifications();
  }
}
