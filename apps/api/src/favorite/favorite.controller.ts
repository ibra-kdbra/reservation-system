import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Body,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { FavoriteService } from './favorite.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { GetUser } from '../auth/decorators/get-user.decorator';

@ApiTags('favorites')
@Controller('favorites')
@UseGuards(JwtAuthGuard)
export class FavoriteController {
  constructor(private readonly favoriteService: FavoriteService) {}

  @Get()
  @ApiOperation({ summary: 'Get all favorites for the current user' })
  async getFavorites(@GetUser('id') userId: string) {
    return this.favoriteService.getFavorites(userId);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Add a listing to favorites' })
  async addFavorite(
    @GetUser('id') userId: string,
    @Body('listingId') listingId: string,
  ) {
    return this.favoriteService.addFavorite(userId, listingId);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remove a listing from favorites' })
  async removeFavorite(
    @GetUser('id') userId: string,
    @Param('id') favoriteId: string,
  ) {
    return this.favoriteService.removeFavorite(userId, favoriteId);
  }

  @Get('check/:listingId')
  @ApiOperation({
    summary: 'Check if a listing is favorited by the current user',
  })
  async isFavorite(
    @GetUser('id') userId: string,
    @Param('listingId') listingId: string,
  ) {
    return this.favoriteService.isFavorite(userId, listingId);
  }
}
