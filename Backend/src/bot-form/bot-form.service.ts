import {
  Injectable,
  BadRequestException,
  ConflictException,
} from '@nestjs/common';
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
    const formatter = new Intl.DateTimeFormat('ru-RU', {
      timeZone: process.env.BOOKING_TIMEZONE || 'Europe/Moscow',
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    });

    return formatter.format(date).replace(',', '');
  }

  async createForm(dto: CreateBotFormDto) {
    const parsedDate = new Date(dto.time);
    const normalizedPhone = dto.phoneNumber?.trim() || null;

    if (isNaN(parsedDate.getTime())) {
      throw new BadRequestException('Invalid date format');
    }

    const existingBooking = await this.prisma.form.findFirst({
      where: {
        barberName: dto.barberName,
        time: parsedDate,
      },
      select: { id: true },
    });

    if (existingBooking) {
      throw new ConflictException(
        'This time slot is already booked. Please choose another time.',
      );
    }

    const booking = await this.prisma.form.create({
      data: {
        barberName: dto.barberName,
        clientName: dto.clientName,
        service: dto.service,
        phoneNumber: normalizedPhone,

        time: parsedDate,
      },
    });

    await this.telegram.sendMessage(
      `📝 New booking
💈 Barber: ${dto.barberName}
👤 Client: ${dto.clientName}
📞 Phone: ${normalizedPhone ?? 'Not provided'}
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
