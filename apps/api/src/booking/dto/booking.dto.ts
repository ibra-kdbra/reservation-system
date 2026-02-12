import {
  IsString,
  IsDateString,
  IsNumber,
  IsOptional,
  Min,
} from 'class-validator';

export class CreateBookingDto {
  @IsString()
  listingId: string;

  @IsDateString()
  checkIn: string;

  @IsDateString()
  checkOut: string;

  @IsNumber()
  @Min(1)
  adults: number;

  @IsNumber()
  @IsOptional()
  @Min(0)
  children?: number;

  @IsNumber()
  @IsOptional()
  @Min(0)
  infants?: number;

  @IsString()
  @IsOptional()
  specialRequests?: string;
}

export class CancelBookingDto {
  @IsString()
  cancellationReason: string;
}
