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
import { PropertyType, ListingStatus } from '@prisma/client';

export class CreateListingDto {
  @IsString()
  @MinLength(10)
  @MaxLength(100)
  title: string;

  @IsString()
  @MinLength(50)
  @MaxLength(5000)
  description: string;

  @IsEnum(PropertyType)
  propertyType: PropertyType;

  @IsString()
  country: string;

  @IsString()
  city: string;

  @IsString()
  @IsOptional()
  state?: string;

  @IsString()
  address: string;

  @IsString()
  @IsOptional()
  zipCode?: string;

  @IsNumber()
  @Min(-90)
  @Max(90)
  latitude: number;

  @IsNumber()
  @Min(-180)
  @Max(180)
  longitude: number;

  @IsNumber()
  @Min(1)
  maxGuests: number;

  @IsNumber()
  @Min(0)
  bedrooms: number;

  @IsNumber()
  @Min(0)
  beds: number;

  @IsNumber()
  @Min(0)
  bathrooms: number;

  @IsNumber()
  @Min(0)
  pricePerNight: number;

  @IsNumber()
  @IsOptional()
  @Min(0)
  cleaningFee?: number;

  @IsNumber()
  @IsOptional()
  @Min(0)
  serviceFee?: number;

  @IsBoolean()
  @IsOptional()
  instantBook?: boolean;

  @IsNumber()
  @IsOptional()
  @Min(1)
  minNights?: number;

  @IsNumber()
  @IsOptional()
  @Min(1)
  maxNights?: number;

  @IsArray()
  @IsString({ each: true })
  images: string[];

  @IsString()
  @IsOptional()
  coverImage?: string;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  amenityIds?: string[];
}

export class UpdateListingDto {
  @IsString()
  @IsOptional()
  @MinLength(10)
  @MaxLength(100)
  title?: string;

  @IsString()
  @IsOptional()
  @MinLength(50)
  @MaxLength(5000)
  description?: string;

  @IsEnum(PropertyType)
  @IsOptional()
  propertyType?: PropertyType;

  @IsEnum(ListingStatus)
  @IsOptional()
  status?: ListingStatus;

  @IsNumber()
  @IsOptional()
  @Min(1)
  maxGuests?: number;

  @IsNumber()
  @IsOptional()
  @Min(0)
  bedrooms?: number;

  @IsNumber()
  @IsOptional()
  @Min(0)
  beds?: number;

  @IsNumber()
  @IsOptional()
  @Min(0)
  bathrooms?: number;

  @IsNumber()
  @IsOptional()
  @Min(0)
  pricePerNight?: number;

  @IsNumber()
  @IsOptional()
  @Min(0)
  cleaningFee?: number;

  @IsBoolean()
  @IsOptional()
  instantBook?: boolean;

  @IsNumber()
  @IsOptional()
  @Min(1)
  minNights?: number;

  @IsNumber()
  @IsOptional()
  @Min(1)
  maxNights?: number;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  images?: string[];

  @IsString()
  @IsOptional()
  coverImage?: string;
}

export class SearchListingsDto {
  @IsString()
  @IsOptional()
  city?: string;

  @IsString()
  @IsOptional()
  country?: string;

  @IsNumber()
  @IsOptional()
  @Min(1)
  guests?: number;

  @IsNumber()
  @IsOptional()
  @Min(0)
  minPrice?: number;

  @IsNumber()
  @IsOptional()
  @Min(0)
  maxPrice?: number;

  @IsEnum(PropertyType)
  @IsOptional()
  propertyType?: PropertyType;

  @IsNumber()
  @IsOptional()
  @Min(0)
  bedrooms?: number;

  @IsNumber()
  @IsOptional()
  @Min(0)
  bathrooms?: number;

  @IsBoolean()
  @IsOptional()
  instantBook?: boolean;

  @IsNumber()
  @IsOptional()
  @Min(1)
  @Max(100)
  limit?: number;

  @IsNumber()
  @IsOptional()
  @Min(0)
  offset?: number;
}
