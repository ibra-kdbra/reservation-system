import {
  Injectable,
  NotFoundException,
  BadRequestException,
  ForbiddenException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateBookingDto } from './dto/booking.dto';

@Injectable()
export class BookingService {
  constructor(private prisma: PrismaService) {}

  /**
   * Create a new booking
   */
  async createBooking(guestId: string, dto: CreateBookingDto) {
    const {
      listingId,
      checkIn,
      checkOut,
      adults,
      children,
      infants,
      specialRequests,
    } = dto;

    // Validate dates
    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);
    const now = new Date();

    if (checkInDate < now) {
      throw new BadRequestException('Check-in date must be in the future');
    }

    if (checkOutDate <= checkInDate) {
      throw new BadRequestException(
        'Check-out date must be after check-in date',
      );
    }

    // Get listing
    const listing = await this.prisma.listing.findUnique({
      where: { id: listingId },
    });

    if (!listing) {
      throw new NotFoundException('Listing not found');
    }

    if (listing.status !== 'PUBLISHED') {
      throw new BadRequestException('Listing is not available for booking');
    }

    // Check if guest count exceeds max
    const totalGuests = adults + (children || 0) + (infants || 0);
    if (totalGuests > listing.maxGuests) {
      throw new BadRequestException(
        `Maximum ${listing.maxGuests} guests allowed`,
      );
    }

    // Check for booking conflicts
    const conflictingBooking = await this.prisma.booking.findFirst({
      where: {
        listingId,
        status: { in: ['PENDING', 'CONFIRMED'] },
        OR: [
          {
            AND: [
              { checkIn: { lte: checkInDate } },
              { checkOut: { gt: checkInDate } },
            ],
          },
          {
            AND: [
              { checkIn: { lt: checkOutDate } },
              { checkOut: { gte: checkOutDate } },
            ],
          },
          {
            AND: [
              { checkIn: { gte: checkInDate } },
              { checkOut: { lte: checkOutDate } },
            ],
          },
        ],
      },
    });

    if (conflictingBooking) {
      throw new BadRequestException(
        'Listing is not available for selected dates',
      );
    }

    // Calculate nights and pricing
    const nights = Math.ceil(
      (checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 60 * 60 * 24),
    );

    if (listing.minNights && nights < listing.minNights) {
      throw new BadRequestException(
        `Minimum ${listing.minNights} nights required`,
      );
    }

    if (listing.maxNights && nights > listing.maxNights) {
      throw new BadRequestException(
        `Maximum ${listing.maxNights} nights allowed`,
      );
    }

    const pricePerNight = Number(listing.pricePerNight);
    const cleaningFee = listing.cleaningFee ? Number(listing.cleaningFee) : 0;
    const serviceFee = listing.serviceFee ? Number(listing.serviceFee) : 0;
    const totalPrice = pricePerNight * nights + cleaningFee + serviceFee;

    // Create booking
    const booking = await this.prisma.booking.create({
      data: {
        guestId,
        listingId,
        checkIn: checkInDate,
        checkOut: checkOutDate,
        nights,
        adults,
        children: children || 0,
        infants: infants || 0,
        pricePerNight,
        totalPrice,
        cleaningFee,
        serviceFee,
        specialRequests,
        status: listing.instantBook ? 'CONFIRMED' : 'PENDING',
      },
      include: {
        listing: {
          select: {
            id: true,
            title: true,
            coverImage: true,
            city: true,
            country: true,
          },
        },
        guest: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
            avatar: true,
          },
        },
      },
    });

    // Update listing booking count
    await this.prisma.listing.update({
      where: { id: listingId },
      data: { bookingCount: { increment: 1 } },
    });

    return booking;
  }

  /**
   * Get booking by ID
   */
  async getBookingById(bookingId: string, userId: string) {
    const booking = await this.prisma.booking.findUnique({
      where: { id: bookingId },
      include: {
        listing: {
          include: {
            host: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
                avatar: true,
              },
            },
          },
        },
        guest: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            avatar: true,
            email: true,
          },
        },
        payment: true,
      },
    });

    if (!booking) {
      throw new NotFoundException('Booking not found');
    }

    // Check authorization
    if (booking.guestId !== userId && booking.listing.hostId !== userId) {
      throw new ForbiddenException('You can only view your own bookings');
    }

    return booking;
  }

  /**
   * Get user's bookings (as guest)
   */
  async getGuestBookings(guestId: string) {
    const bookings = await this.prisma.booking.findMany({
      where: { guestId },
      orderBy: { createdAt: 'desc' },
      include: {
        listing: {
          select: {
            id: true,
            title: true,
            coverImage: true,
            city: true,
            country: true,
            host: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
                avatar: true,
              },
            },
          },
        },
      },
    });

    return bookings;
  }

  /**
   * Get host's bookings (for their listings)
   */
  async getHostBookings(hostId: string) {
    const bookings = await this.prisma.booking.findMany({
      where: {
        listing: {
          hostId,
        },
      },
      orderBy: { createdAt: 'desc' },
      include: {
        listing: {
          select: {
            id: true,
            title: true,
            coverImage: true,
          },
        },
        guest: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            avatar: true,
            email: true,
          },
        },
      },
    });

    return bookings;
  }

  /**
   * Cancel booking
   */
  async cancelBooking(bookingId: string, userId: string, reason: string) {
    const booking = await this.prisma.booking.findUnique({
      where: { id: bookingId },
      include: { listing: true },
    });

    if (!booking) {
      throw new NotFoundException('Booking not found');
    }

    // Check authorization
    if (booking.guestId !== userId && booking.listing.hostId !== userId) {
      throw new ForbiddenException('You can only cancel your own bookings');
    }

    // Check if booking can be cancelled
    if (booking.status === 'CANCELLED') {
      throw new BadRequestException('Booking is already cancelled');
    }

    if (booking.status === 'COMPLETED') {
      throw new BadRequestException('Cannot cancel completed booking');
    }

    // Update booking
    const cancelled = await this.prisma.booking.update({
      where: { id: bookingId },
      data: {
        status: 'CANCELLED',
        cancelledAt: new Date(),
        cancellationReason: reason,
      },
    });

    return cancelled;
  }

  /**
   * Confirm booking (host only)
   */
  async confirmBooking(bookingId: string, hostId: string) {
    const booking = await this.prisma.booking.findUnique({
      where: { id: bookingId },
      include: { listing: true },
    });

    if (!booking) {
      throw new NotFoundException('Booking not found');
    }

    if (booking.listing.hostId !== hostId) {
      throw new ForbiddenException('Only the host can confirm bookings');
    }

    if (booking.status !== 'PENDING') {
      throw new BadRequestException('Only pending bookings can be confirmed');
    }

    const confirmed = await this.prisma.booking.update({
      where: { id: bookingId },
      data: { status: 'CONFIRMED' },
    });

    return confirmed;
  }
}
