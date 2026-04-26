import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { TelegramService } from './telegram.service';
import { CreateBotFormDto } from './dto/create-bot-form.dto';

@Injectable()
export class BotFormService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly telegram: TelegramService,
  ) {}

  private formatTime(date: Date): string {
    // UTC saatini olish - DB da UTC saqlanadi
    const day = date.getUTCDate().toString().padStart(2, '0');
    const month = (date.getUTCMonth() + 1).toString().padStart(2, '0');
    const year = date.getUTCFullYear();
    const hours = date.getUTCHours().toString().padStart(2, '0');
    const minutes = date.getUTCMinutes().toString().padStart(2, '0');
    return `${day}.${month}.${year} ${hours}:${minutes}`;
  }

  async createForm(dto: CreateBotFormDto) {
    const parsedDate = new Date(dto.time);

    if (isNaN(parsedDate.getTime())) {
      throw new BadRequestException('Invalid date format');
    }

    const booking = await this.prisma.form.create({
      data: {
        barberName: dto.barberName,
        clientName: dto.clientName,
        service: dto.service,
        time: parsedDate,
      },
    });

    await this.telegram.sendMessage(
      `📝 New booking
💈 Barber: ${dto.barberName}
👤 Client: ${dto.clientName}
📞 Phone: ${dto.phoneNumber}
✂️ Service: ${dto.service}
⏱️ Time: ${this.formatTime(parsedDate)}`,
    );

    return booking;
  }

  async findAll() {
    return this.prisma.form.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }
}
