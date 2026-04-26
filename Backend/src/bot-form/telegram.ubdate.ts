import { Update, Start, Ctx, Command } from 'nestjs-telegraf';
import { Context } from 'telegraf';
import { BotFormService } from './bot-form.service';

@Update()
export class TelegramUpdate {
  constructor(private readonly botService: BotFormService) {}

  @Start()
  async start(@Ctx() ctx: Context) {
    await ctx.reply('Bot ishga tushdi!');
  }

  @Command('users')
  async getUsers(@Ctx() ctx: Context) {
    await ctx.reply("Foydalanuvchilar ro'yxati:");
  }
}
