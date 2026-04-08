import { Module } from '@nestjs/common';
import { TelegrafModule } from 'nestjs-telegraf';
import { BotFormModule } from './bot-form/bot-form.module';

@Module({
  imports: [
    TelegrafModule.forRoot({
      token: process.env.BOT_TOKEN || '',
    }),
    BotFormModule,
  ],
})
export class AppModule {}