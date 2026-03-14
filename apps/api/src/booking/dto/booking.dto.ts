import {
  IsString,
  IsDateString,
  IsNumber,
  IsOptional,
  Min,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateBookingDto {
  @ApiProperty({
    description: 'ID of the listing to book',
    example: 'listing-uuid',
  })
  @IsString()
  listingId: string;

  @ApiProperty({ description: 'Check-in date', example: '2024-06-01' })
  @IsDateString()
  checkIn: string;

  @ApiProperty({ description: 'Check-out date', example: '2024-06-07' })
  @IsDateString()
  checkOut: string;

  @ApiProperty({ description: 'Number of adults', example: 2, minimum: 1 })
  @IsNumber()
  @Min(1)
  adults: number;

  @ApiPropertyOptional({
    description: 'Number of children',
    example: 1,
    minimum: 0,
    default: 0,
  })
  @IsNumber()
  @IsOptional()
  @Min(0)
  children?: number;

  @ApiPropertyOptional({
    description: 'Number of infants',
    example: 0,
    minimum: 0,
    default: 0,
  })
  @IsNumber()
  @IsOptional()
  @Min(0)
  infants?: number;

  @ApiPropertyOptional({
    description: 'Additional requests or notes',
    example: 'Need a crib for the baby',
  })
  @IsString()
  @IsOptional()
  specialRequests?: string;
}

export class CancelBookingDto {
  @ApiProperty({
    description: 'Reason for cancellation',
    example: 'Travel plans changed',
  })
  @IsString()
  cancellationReason: string;
}
