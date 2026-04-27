import { Module } from '@nestjs/common';
import { BotFormModule } from './bot-form/bot-form.module';

@Module({
  imports: [BotFormModule],
})
export class AppModule {}
