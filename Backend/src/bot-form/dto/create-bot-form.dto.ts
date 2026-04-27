import { Transform } from 'class-transformer';
import { IsDateString, IsOptional, IsString } from 'class-validator';

export class CreateBotFormDto {
  @IsString()
  barberName: string;

  @IsOptional()
  @Transform(({ value }) =>
    value === null || value === undefined ? undefined : String(value),
  )
  @IsString()
  phoneNumber?: string;

  @IsString()
  clientName: string;

  @IsString()
  service: string;

  @IsDateString()
  time: string;
}
