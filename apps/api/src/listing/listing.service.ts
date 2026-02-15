import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import {
  CreateListingDto,
  UpdateListingDto,
  SearchListingsDto,
} from './dto/listing.dto';

@Injectable()
export class ListingService {
  constructor(private prisma: PrismaService) { }

  /**
   * Create a new listing
   */
  async createListing(hostId: string, dto: CreateListingDto) {
    const { amenityIds, ...listingData } = dto;

    const listing = await this.prisma.listing.create({
      data: {
        ...listingData,
        hostId,
        status: 'DRAFT',
        amenities: amenityIds
          ? {
            create: amenityIds.map((amenityId) => ({
              amenity: { connect: { id: amenityId } },
            })),
          }
          : undefined,
      },
      include: {
        amenities: {
          include: {
            amenity: true,
          },
        },
        host: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            avatar: true,
          },
        },
      },
    });

    return listing;
  }

  /**
   * Get listing by ID
   */
  async getListingById(id: string) {
    const listing = await this.prisma.listing.findUnique({
      where: { id },
      include: {
        amenities: {
          include: {
            amenity: true,
          },
        },
        host: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            avatar: true,
            createdAt: true,
          },
        },
        reviews: {
          take: 10,
          orderBy: { createdAt: 'desc' },
          include: {
            author: {
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

    if (!listing) {
      throw new NotFoundException('Listing not found');
    }

    // Increment view count
    await this.prisma.listing.update({
      where: { id },
      data: { viewCount: { increment: 1 } },
    });

    return listing;
  }

  /**
   * Search listings
   */
  async searchListings(dto: SearchListingsDto) {
    const {
      city,
      country,
      guests,
      minPrice,
      maxPrice,
      amenities,
      propertyType,
      bedrooms,
      bathrooms,
      instantBook,
      limit = 20,
      offset = 0,
      checkIn,
      checkOut,
    } = dto;

    const where: any = {
      status: 'PUBLISHED',
    };

    if (city) where.city = { contains: city, mode: 'insensitive' };
    if (country) where.country = { contains: country, mode: 'insensitive' };
    if (guests) where.maxGuests = { gte: guests };
    if (minPrice) where.pricePerNight = { ...where.pricePerNight, gte: minPrice };
    if (maxPrice) where.pricePerNight = { ...where.pricePerNight, lte: maxPrice };
    if (propertyType) where.propertyType = propertyType;
    if (bedrooms) where.bedrooms = { gte: bedrooms };
    if (bathrooms) where.bathrooms = { gte: bathrooms };
    if (instantBook !== undefined) where.instantBook = instantBook;

    // Filter by amenities (must have all selected)
    if (amenities && amenities.length > 0) {
      where.amenities = {
        some: {
          amenity: {
            name: { in: Array.isArray(amenities) ? amenities : [amenities] },
          },
        },
      };
      // Note: The above only checks if it has AT LEAST ONE.
      // To check logic for "ALL selected amenities", Prisma requires an 'every' or multple 'some' clauses.
      // A simpler approach for "AND" logic with Prisma relations:
      const amenityList = Array.isArray(amenities) ? amenities : [amenities];
      where.AND = amenityList.map((amenity) => ({
        amenities: {
          some: {
            amenity: {
              name: { equals: amenity, mode: 'insensitive' },
            },
          },
        },
      }));
    }

    // Filter by availability if dates are provided
    if (checkIn && checkOut) {
      const checkInDate = new Date(checkIn);
      const checkOutDate = new Date(checkOut);

      // Find listings that are booked during the requested period
      // A booking overlaps if: (RequestStart < BookingEnd) AND (RequestEnd > BookingStart)
      const bookedListings = await this.prisma.booking.findMany({
        where: {
          status: { in: ['CONFIRMED', 'COMPLETED'] },
          AND: [
            { checkIn: { lt: checkOutDate } },
            { checkOut: { gt: checkInDate } },
          ],
        },
        select: { listingId: true },
      });

      const bookedListingIds = bookedListings.map((b) => b.listingId);

      if (bookedListingIds.length > 0) {
        where.id = { notIn: bookedListingIds };
      }
    }

    const [listings, total] = await Promise.all([
      this.prisma.listing.findMany({
        where,
        take: limit,
        skip: offset,
        orderBy: { createdAt: 'desc' },
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
      }),
      this.prisma.listing.count({ where }),
    ]);

    return {
      listings,
      total,
      limit,
      offset,
      hasMore: offset + limit < total,
    };
  }

  /**
   * Get host's listings
   */
  async getHostListings(hostId: string) {
    const listings = await this.prisma.listing.findMany({
      where: { hostId },
      orderBy: { createdAt: 'desc' },
      include: {
        amenities: {
          include: {
            amenity: true,
          },
        },
      },
    });

    return listings;
  }

  /**
   * Update listing
   */
  async updateListing(listingId: string, hostId: string, dto: UpdateListingDto) {
    // Check if listing exists and belongs to host
    const listing = await this.prisma.listing.findUnique({
      where: { id: listingId },
    });

    if (!listing) {
      throw new NotFoundException('Listing not found');
    }

    if (listing.hostId !== hostId) {
      throw new ForbiddenException('You can only update your own listings');
    }

    const updated = await this.prisma.listing.update({
      where: { id: listingId },
      data: dto,
      include: {
        amenities: {
          include: {
            amenity: true,
          },
        },
      },
    });

    return updated;
  }

  /**
   * Delete listing
   */
  async deleteListing(listingId: string, hostId: string) {
    // Check if listing exists and belongs to host
    const listing = await this.prisma.listing.findUnique({
      where: { id: listingId },
    });

    if (!listing) {
      throw new NotFoundException('Listing not found');
    }

    if (listing.hostId !== hostId) {
      throw new ForbiddenException('You can only delete your own listings');
    }

    await this.prisma.listing.delete({
      where: { id: listingId },
    });

    return { message: 'Listing deleted successfully' };
  }

  /**
   * Publish listing
   */
  async publishListing(listingId: string, hostId: string) {
    const listing = await this.prisma.listing.findUnique({
      where: { id: listingId },
    });

    if (!listing) {
      throw new NotFoundException('Listing not found');
    }

    if (listing.hostId !== hostId) {
      throw new ForbiddenException('You can only publish your own listings');
    }

    const published = await this.prisma.listing.update({
      where: { id: listingId },
      data: {
        status: 'PUBLISHED',
        publishedAt: new Date(),
      },
    });

    return published;
  }
}
