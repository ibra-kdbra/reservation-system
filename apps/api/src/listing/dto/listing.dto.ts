import {
  IsString,
  IsEnum,
  IsNumber,
  IsBoolean,
  IsArray,
  IsOptional,
  Min,
  Max,
  MinLength,
  MaxLength,
} from 'class-validator';
import { Transform } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  PropertyType,
  ListingStatus,
  CreateListingPayload,
  UpdateListingPayload,
} from '@nest-asia/types';

export class CreateListingDto implements CreateListingPayload {
  @ApiProperty({
    description: 'Title of the listing',
    example: 'Luxury Villa with Private Pool',
    minLength: 10,
    maxLength: 100,
  })
  @IsString()
  @MinLength(10)
  @MaxLength(100)
  title: string;

  @ApiProperty({
    description: 'Detailed description of the property',
    example: 'A beautiful villa located in the heart of Bali...',
    minLength: 50,
    maxLength: 5000,
  })
  @IsString()
  @MinLength(50)
  @MaxLength(5000)
  description: string;

  @ApiProperty({
    description: 'Type of property',
    enum: PropertyType,
    example: PropertyType.VILLA,
  })
  @IsEnum(PropertyType)
  propertyType: PropertyType;

  @ApiProperty({
    description: 'Country where property is located',
    example: 'Indonesia',
  })
  @IsString()
  country: string;

  @ApiProperty({
    description: 'City where property is located',
    example: 'Ubud',
  })
  @IsString()
  city: string;

  @ApiPropertyOptional({ description: 'State or province', example: 'Bali' })
  @IsString()
  @IsOptional()
  state?: string;

  @ApiProperty({
    description: 'Full address of the property',
    example: 'Jl. Raya Ubud No. 123',
  })
  @IsString()
  address: string;

  @ApiPropertyOptional({ description: 'ZIP or Postal code', example: '80571' })
  @IsString()
  @IsOptional()
  zipCode?: string;

  @ApiProperty({
    description: 'Latitude coordinate',
    example: -8.5069,
    minimum: -90,
    maximum: 90,
  })
  @IsNumber()
  @Min(-90)
  @Max(90)
  latitude: number;

  @ApiProperty({
    description: 'Longitude coordinate',
    example: 115.2625,
    minimum: -180,
    maximum: 180,
  })
  @IsNumber()
  @Min(-180)
  @Max(180)
  longitude: number;

  @ApiProperty({
    description: 'Maximum number of guests',
    example: 4,
    minimum: 1,
  })
  @IsNumber()
  @Min(1)
  maxGuests: number;

  @ApiProperty({ description: 'Number of bedrooms', example: 2, minimum: 0 })
  @IsNumber()
  @Min(0)
  bedrooms: number;

  @ApiProperty({ description: 'Number of beds', example: 2, minimum: 0 })
  @IsNumber()
  @Min(0)
  beds: number;

  @ApiProperty({ description: 'Number of bathrooms', example: 2, minimum: 0 })
  @IsNumber()
  @Min(0)
  bathrooms: number;

  @ApiProperty({
    description: 'Price per night in USD',
    example: 150,
    minimum: 0,
  })
  @IsNumber()
  @Min(0)
  pricePerNight: number;

  @ApiPropertyOptional({
    description: 'One-time cleaning fee',
    example: 50,
    minimum: 0,
  })
  @IsNumber()
  @IsOptional()
  @Min(0)
  cleaningFee?: number;

  @ApiPropertyOptional({
    description: 'Service fee percentage or fixed amount',
    example: 25,
    minimum: 0,
  })
  @IsNumber()
  @IsOptional()
  @Min(0)
  serviceFee?: number;

  @ApiPropertyOptional({
    description: 'Whether instant booking is enabled',
    example: true,
    default: false,
  })
  @IsBoolean()
  @IsOptional()
  instantBook?: boolean;

  @ApiPropertyOptional({
    description: 'Minimum number of nights for a stay',
    example: 2,
    minimum: 1,
    default: 1,
  })
  @IsNumber()
  @IsOptional()
  @Min(1)
  minNights?: number;

  @ApiPropertyOptional({
    description: 'Maximum number of nights for a stay',
    example: 30,
    minimum: 1,
  })
  @IsNumber()
  @IsOptional()
  @Min(1)
  maxNights?: number;

  @ApiProperty({
    description: 'Array of image URLs',
    example: [
      'https://example.com/image1.jpg',
      'https://example.com/image2.jpg',
    ],
    type: [String],
  })
  @IsArray()
  @IsString({ each: true })
  images: string[];

  @ApiPropertyOptional({
    description: 'Primary cover image URL',
    example: 'https://example.com/cover.jpg',
  })
  @IsString()
  @IsOptional()
  coverImage?: string;

  @ApiPropertyOptional({
    description: 'Array of amenity IDs',
    example: ['wifi-id', 'pool-id'],
    type: [String],
  })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  amenityIds?: string[];
}

export class UpdateListingDto implements UpdateListingPayload {
  @ApiPropertyOptional({
    description: 'Updated title',
    example: 'Modern Villa in Ubud',
  })
  @IsString()
  @IsOptional()
  @MinLength(10)
  @MaxLength(100)
  title?: string;

  @ApiPropertyOptional({ description: 'Updated description' })
  @IsString()
  @IsOptional()
  @MinLength(50)
  @MaxLength(5000)
  description?: string;

  @ApiPropertyOptional({ enum: PropertyType })
  @IsEnum(PropertyType)
  @IsOptional()
  propertyType?: PropertyType;

  @ApiPropertyOptional({ enum: ListingStatus })
  @IsEnum(ListingStatus)
  @IsOptional()
  status?: ListingStatus;

  @ApiPropertyOptional({ description: 'Updated max guests', minimum: 1 })
  @IsNumber()
  @IsOptional()
  @Min(1)
  maxGuests?: number;

  @ApiPropertyOptional({ description: 'Updated bedrooms count', minimum: 0 })
  @IsNumber()
  @IsOptional()
  @Min(0)
  bedrooms?: number;

  @ApiPropertyOptional({ description: 'Updated beds count', minimum: 0 })
  @IsNumber()
  @IsOptional()
  @Min(0)
  beds?: number;

  @ApiPropertyOptional({ description: 'Updated bathrooms count', minimum: 0 })
  @IsNumber()
  @IsOptional()
  @Min(0)
  bathrooms?: number;

  @ApiPropertyOptional({ description: 'Updated price per night', minimum: 0 })
  @IsNumber()
  @IsOptional()
  @Min(0)
  pricePerNight?: number;

  @ApiPropertyOptional({ description: 'Updated cleaning fee', minimum: 0 })
  @IsNumber()
  @IsOptional()
  @Min(0)
  cleaningFee?: number;

  @ApiPropertyOptional({ description: 'Update instant book status' })
  @IsBoolean()
  @IsOptional()
  instantBook?: boolean;

  @ApiPropertyOptional({ description: 'Updated minimum nights', minimum: 1 })
  @IsNumber()
  @IsOptional()
  @Min(1)
  minNights?: number;

  @ApiPropertyOptional({ description: 'Updated maximum nights', minimum: 1 })
  @IsNumber()
  @IsOptional()
  @Min(1)
  maxNights?: number;

  @ApiPropertyOptional({ description: 'Updated image URLs', type: [String] })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  images?: string[];

  @ApiPropertyOptional({
    description: 'Updated array of amenity IDs',
    example: ['wifi-id', 'pool-id'],
    type: [String],
  })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  amenityIds?: string[];
}

export class SearchListingsDto {
  @ApiPropertyOptional({ description: 'Filter by city', example: 'Ubud' })
  @IsString()
  @IsOptional()
  city?: string;

  @ApiPropertyOptional({
    description: 'Filter by country',
    example: 'Indonesia',
  })
  @IsString()
  @IsOptional()
  country?: string;

  @ApiPropertyOptional({
    description: 'Minimum number of guests',
    example: 2,
    minimum: 1,
  })
  @IsNumber()
  @IsOptional()
  @Min(1)
  guests?: number;

  @ApiPropertyOptional({
    description: 'Minimum price per night',
    example: 50,
    minimum: 0,
  })
  @IsNumber()
  @IsOptional()
  @Min(0)
  minPrice?: number;

  @ApiPropertyOptional({
    description: 'Maximum price per night',
    example: 500,
    minimum: 0,
  })
  @IsNumber()
  @IsOptional()
  @Min(0)
  maxPrice?: number;

  @ApiPropertyOptional({ description: 'Filter by amenity IDs', type: [String] })
  @IsArray()
  @IsOptional()
  @IsString({ each: true })
  @Transform(({ value }) => (Array.isArray(value) ? value : [value]))
  amenities?: string[];

  @ApiPropertyOptional({ enum: PropertyType })
  @IsEnum(PropertyType)
  @IsOptional()
  propertyType?: PropertyType;

  @ApiPropertyOptional({ description: 'Minimum bedrooms count', minimum: 0 })
  @IsNumber()
  @IsOptional()
  @Min(0)
  bedrooms?: number;

  @ApiPropertyOptional({ description: 'Minimum bathrooms count', minimum: 0 })
  @IsNumber()
  @IsOptional()
  @Min(0)
  bathrooms?: number;

  @ApiPropertyOptional({ description: 'Filter for instant book' })
  @IsBoolean()
  @IsOptional()
  instantBook?: boolean;

  @ApiPropertyOptional({
    description: 'Limit results per page',
    example: 20,
    default: 20,
    minimum: 1,
    maximum: 100,
  })
  @IsNumber()
  @IsOptional()
  @Min(1)
  @Max(100)
  limit?: number;

  @ApiPropertyOptional({
    description: 'Check-in date (ISO string)',
    example: '2024-06-01',
  })
  @IsString()
  @IsOptional()
  checkIn?: string;

  @ApiPropertyOptional({
    description: 'Check-out date (ISO string)',
    example: '2024-06-07',
  })
  @IsString()
  @IsOptional()
  checkOut?: string;

  @ApiPropertyOptional({
    description: 'Offset for pagination',
    example: 0,
    default: 0,
    minimum: 0,
  })
  @IsNumber()
  @IsOptional()
  @Min(0)
  offset?: number;
}
