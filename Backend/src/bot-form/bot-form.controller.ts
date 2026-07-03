import { Controller, Post, Body, Get, Query } from '@nestjs/common';
import { BotFormService } from './bot-form.service';
import { CreateBotFormDto } from './dto/create-bot-form.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Controller('bot-form')
export class BotFormController {
  constructor(
    private readonly botFormService: BotFormService,
    private readonly prisma: PrismaService,
  ) {}

  @Post()
  async createForm(@Body() dto: CreateBotFormDto) {
    const booking = await this.botFormService.createForm(dto);
    return { success: true, booking };
  }

  // GET /bot-form/busy?barber=John&date=2026-02-28
  @Get('busy')
  async getBusySlots(
    @Query('barber') barber: string,
    @Query('date') date: string,
  ) {
    if (!barber || !date) {
      return [];
    }

    const start = new Date(`${date}T00:00:00`);
    const end = new Date(`${date}T23:59:59`);

    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      return [];
    }

    return this.prisma.form.findMany({
      where: {
        barberName: barber,
        time: {
          gte: start,
          lte: end,
        },
      },
      select: { time: true },
    });
  }
}
