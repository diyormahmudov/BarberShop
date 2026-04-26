import { IsString, IsDateString } from 'class-validator';

export class CreateBotFormDto {
  @IsString()
  barberName: string;

  @IsString()
  clientName: string;

  @IsString()
  phoneNumber: string;

  @IsString()
  service: string;

  @IsDateString()
  time: string;
}
