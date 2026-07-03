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
      timeZone: process.env.BOOKING_TIMEZONE || 'Asia/Bishkek',
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

    // Save notification to database since external APIs are blocked
    await this.prisma.notification.create({
      data: {
        type: 'booking',
        message: `🎉 НОВАЯ ЗАПИСЬ

👤 Клиент: ${dto.clientName}
📞 Телефон: ${normalizedPhone ?? 'Не указан'}
💈 Мастер: ${dto.barberName}

✂️ Услуги:
${dto.service}

🕐 Время: ${this.formatTime(parsedDate)}

━━━━━━━━━━━━━━━━━━━━
BURAN Barbershop`,
      },
    });

    // Try to send Telegram notification (will likely fail due to blocking)
    this.telegram.sendMessage(
      `🎉 НОВАЯ ЗАПИСЬ

👤 Клиент: ${dto.clientName}
📞 Телефон: ${normalizedPhone ?? 'Не указан'}
💈 Мастер: ${dto.barberName}

✂️ Услуги:
${dto.service}

🕐 Время: ${this.formatTime(parsedDate)}

━━━━━━━━━━━━━━━━━━━━
BURAN Barbershop`,
    ).catch(error => {
      console.error('Failed to send Telegram notification:', error);
    });

    return booking;
  }

  async findAll() {
    return this.prisma.form.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }
}
