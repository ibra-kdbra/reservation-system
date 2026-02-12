import {
  Controller,
  Get,
  Post,
  Put,
  Body,
  Param,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { BookingService } from './booking.service';
import { CreateBookingDto, CancelBookingDto } from './dto/booking.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { GetUser } from '../auth/decorators/get-user.decorator';

@Controller('bookings')
@UseGuards(JwtAuthGuard)
export class BookingController {
  constructor(private bookingService: BookingService) {}

  @Post()
  async createBooking(
    @GetUser('id') guestId: string,
    @Body() dto: CreateBookingDto,
  ) {
    return this.bookingService.createBooking(guestId, dto);
  }

  @Get('my-bookings')
  async getMyBookings(@GetUser('id') guestId: string) {
    return this.bookingService.getGuestBookings(guestId);
  }

  @Get('host-bookings')
  async getHostBookings(@GetUser('id') hostId: string) {
    return this.bookingService.getHostBookings(hostId);
  }

  @Get(':id')
  async getBookingById(
    @Param('id') id: string,
    @GetUser('id') userId: string,
  ) {
    return this.bookingService.getBookingById(id, userId);
  }

  @Put(':id/cancel')
  @HttpCode(HttpStatus.OK)
  async cancelBooking(
    @Param('id') id: string,
    @GetUser('id') userId: string,
    @Body() dto: CancelBookingDto,
  ) {
    return this.bookingService.cancelBooking(id, userId, dto.cancellationReason);
  }

  @Put(':id/confirm')
  @HttpCode(HttpStatus.OK)
  async confirmBooking(
    @Param('id') id: string,
    @GetUser('id') hostId: string,
  ) {
    return this.bookingService.confirmBooking(id, hostId);
  }
}
