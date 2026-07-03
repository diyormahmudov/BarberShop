import { Module } from '@nestjs/common';
import { BotFormModule } from './bot-form/bot-form.module';
import { ReviewsModule } from './reviews/reviews.module';
import { WebhookModule } from './webhook/webhook.module';

@Module({
  imports: [BotFormModule, ReviewsModule, WebhookModule],
})
export class AppModule {}
