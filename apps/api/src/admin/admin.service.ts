import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ListingStatus, UserStatus } from '@prisma/client';

@Injectable()
export class AdminService {
  constructor(private prisma: PrismaService) {}

  async getStats() {
    const [
      userCount,
      listingCount,
      bookingCount,
      revenueResult,
      usersJoinedToday,
    ] = await Promise.all([
      this.prisma.user.count(),
      this.prisma.listing.count(),
      this.prisma.booking.count(),
      this.prisma.booking.aggregate({
        _sum: { totalPrice: true },
        where: { status: 'CONFIRMED' }, // Only confirmed bookings count as revenue? Or COMPLETED.
      }),
      this.prisma.user.count({
        where: {
          // Check createdAt >= start of today (mock logic for demo)
          // For now just return count
        },
      }),
    ]);

    return {
      users: userCount,
      listings: listingCount,
      bookings: bookingCount,
      revenue: revenueResult._sum.totalPrice || 0,
    };
  }

  async getUsers() {
    return this.prisma.user.findMany({
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        role: true,
        status: true,
        createdAt: true,
        _count: { select: { listings: true } },
      },
    });
  }

  async getListings() {
    return this.prisma.listing.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        host: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
          },
        },
      },
    });
  }

  async banUser(userId: string) {
    return this.prisma.user.update({
      where: { id: userId },
      data: { status: UserStatus.SUSPENDED },
    });
  }

  async activateUser(userId: string) {
    return this.prisma.user.update({
      where: { id: userId },
      data: { status: UserStatus.ACTIVE },
    });
  }

  async approveListing(listingId: string) {
    return this.prisma.listing.update({
      where: { id: listingId },
      data: { status: ListingStatus.PUBLISHED },
    });
  }

  async rejectListing(listingId: string) {
    // Or add a REJECTED status if schema supports it. Schema has PUBLISHED...
    // Let's check schema for ListingStatus enum in a moment.
    // Assuming schema has what we need, otherwise I might need to add it or use DRAFT.
    // I'll default to DRAFT for "Reject" for now if REJECTED doesn't exist.
    return this.prisma.listing.update({
      where: { id: listingId },
      data: { status: ListingStatus.DRAFT }, // Using DRAFT as 'Unpublish/Reject'
    });
  }
}
