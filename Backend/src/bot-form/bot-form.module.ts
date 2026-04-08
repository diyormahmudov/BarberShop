import { Module } from '@nestjs/common';
import { BotFormService } from './bot-form.service';
import { BotFormController } from './bot-form.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { TelegramService } from './telegram.service';
import { TelegramUpdate } from './telegram.ubdate';

@Module({
  imports: [PrismaModule],
  providers: [BotFormService, TelegramService, TelegramUpdate],
  controllers: [BotFormController],
})
export class BotFormModule {}
