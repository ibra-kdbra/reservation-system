import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  UseGuards,
  HttpCode,
  HttpStatus,
  UseInterceptors,
} from '@nestjs/common';
import { CacheInterceptor, CacheKey, CacheTTL } from '@nestjs/cache-manager';
import { ListingService } from './listing.service';
import {
  CreateListingDto,
  UpdateListingDto,
  SearchListingsDto,
} from './dto/listing.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { GetUser } from '../auth/decorators/get-user.decorator';

@Controller('listings')
export class ListingController {
  constructor(private listingService: ListingService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async createListing(
    @GetUser('id') hostId: string,
    @Body() dto: CreateListingDto,
  ) {
    return this.listingService.createListing(hostId, dto);
  }

  @Get('search')
  @UseInterceptors(CacheInterceptor)
  @CacheKey('listing_search')
  @CacheTTL(600) // 10 minutes
  async searchListings(@Query() dto: SearchListingsDto) {
    return this.listingService.searchListings(dto);
  }

  @Get('my-listings')
  @UseGuards(JwtAuthGuard)
  async getMyListings(@GetUser('id') hostId: string) {
    return this.listingService.getHostListings(hostId);
  }

  @Get(':id')
  async getListingById(@Param('id') id: string) {
    return this.listingService.getListingById(id);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  async updateListing(
    @Param('id') id: string,
    @GetUser('id') hostId: string,
    @Body() dto: UpdateListingDto,
  ) {
    return this.listingService.updateListing(id, hostId, dto);
  }

  @Post(':id/publish')
  @UseGuards(JwtAuthGuard)
  async publishListing(@Param('id') id: string, @GetUser('id') hostId: string) {
    return this.listingService.publishListing(id, hostId);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  async deleteListing(@Param('id') id: string, @GetUser('id') hostId: string) {
    return this.listingService.deleteListing(id, hostId);
  }
}
