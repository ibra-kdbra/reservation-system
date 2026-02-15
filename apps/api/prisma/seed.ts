import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';
import * as bcrypt from 'bcrypt';
import { listingsData } from './data/listings';
import { hostsData, guestsData } from './data/users';
import { amenityData } from './data/amenities';
import { reviewTexts } from './data/reviews';

const connectionString =
  process.env.DATABASE_URL ||
  'postgresql://reservation_user:reservation_pass@localhost:5432/reservation_db';

const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('🌱 Seeding database with Asian destinations...');

  // Clean existing data
  await prisma.message.deleteMany();
  await prisma.notification.deleteMany();
  await prisma.favorite.deleteMany();
  await prisma.review.deleteMany();
  await prisma.payment.deleteMany();
  await prisma.booking.deleteMany();
  await prisma.unavailableDate.deleteMany();
  await prisma.listingAmenity.deleteMany();
  await prisma.amenity.deleteMany();
  await prisma.listing.deleteMany();
  await prisma.user.deleteMany();

  console.log('✅ Cleaned existing data');

  // ─── Users ───────────────────────────────────────
  const hashedPassword = await bcrypt.hash('password123', 10);

  const hosts = [];
  for (const hostData of hostsData) {
    const host = await prisma.user.create({
      data: {
        ...hostData,
        password: hashedPassword,
        role: 'HOST',
        status: 'ACTIVE', // Added UserStatus
      },
    });
    hosts.push(host);
  }

  const guests = [];
  for (const guestData of guestsData) {
    const guest = await prisma.user.create({
      data: {
        ...guestData,
        password: hashedPassword,
        role: 'USER', // Changed from GUEST to USER as per schema
        status: 'ACTIVE',
      },
    });
    guests.push(guest);
  }

  console.log(`✅ Created ${hosts.length} hosts and ${guests.length} guests`);

  // ─── Amenities ───────────────────────────────────
  const amenities: Record<string, any> = {};
  for (const a of amenityData) {
    const category = (a as any).category || 'Basic';
    amenities[a.name] = await prisma.amenity.create({
      data: {
        name: a.name,
        icon: a.icon,
        category: category
      }
    });
  }

  console.log('✅ Created amenities');

  // ─── Listings ────────────────────────────────────
  const listings = [];
  for (const data of listingsData) {
    const { amenityNames, hostIndex, ...listingFields } = data;

    // Ensure hostIndex is valid, default to host (0) if not
    const safeHostIndex = (hostIndex !== undefined && hostIndex >= 0 && hostIndex < hosts.length) ? hostIndex : 0;

    const listing = await prisma.listing.create({
      data: {
        ...listingFields,
        hostId: hosts[safeHostIndex].id,
        publishedAt: new Date(),
        bookingCount: Math.floor(Math.random() * 80) + 10,
        averageRating: parseFloat((4.2 + Math.random() * 0.75).toFixed(2)),
        reviewCount: Math.floor(Math.random() * 180) + 12,
      },
    });

    // Link amenities
    for (const name of amenityNames) {
      if (amenities[name]) {
        await prisma.listingAmenity.create({
          data: { listingId: listing.id, amenityId: amenities[name].id },
        });
      }
    }

    listings.push(listing);
  }

  console.log(`✅ Created ${listings.length} listings`);

  // ─── Bookings ────────────────────────────────────
  const bookingStatuses = ['COMPLETED', 'CONFIRMED', 'CONFIRMED', 'COMPLETED', 'COMPLETED'] as const;

  const bookings = [];
  for (let i = 0; i < Math.min(listings.length, 10); i++) {
    const g = guests[i % guests.length];
    const status = bookingStatuses[i % bookingStatuses.length];
    const checkIn = new Date();
    checkIn.setDate(checkIn.getDate() - 60 + i * 7);
    const nights = 2 + (i % 5);
    const checkOut = new Date(checkIn);
    checkOut.setDate(checkOut.getDate() + nights);

    const booking = await prisma.booking.create({
      data: {
        guestId: g.id,
        listingId: listings[i].id,
        checkIn,
        checkOut,
        nights,
        adults: Math.min(2 + (i % 3), listings[i].maxGuests),
        children: 0,
        infants: 0,
        pricePerNight: listings[i].pricePerNight,
        cleaningFee: listings[i].cleaningFee || 0,
        serviceFee: listings[i].serviceFee || 0,
        totalPrice: Number(listings[i].pricePerNight) * nights + (Number(listings[i].cleaningFee) || 0) + (Number(listings[i].serviceFee) || 0),
        status,
        specialRequests: i % 3 === 0 ? 'Early check-in if possible, please.' : undefined,
      },
    });
    bookings.push(booking);
  }

  console.log(`✅ Created ${bookings.length} bookings`);

  // ─── Reviews ─────────────────────────────────────
  // Generate reviews for ALL listings
  for (const listing of listings) {
    // Generate 3-8 reviews per listing
    const reviewCount = Math.floor(Math.random() * 6) + 3;

    for (let i = 0; i < reviewCount; i++) {
      const guest = guests[Math.floor(Math.random() * guests.length)];

      // Create a completed booking first (phantom booking for review validity)
      const pastBooking = await prisma.booking.create({
        data: {
          guestId: guest.id,
          listingId: listing.id,
          checkIn: new Date(Date.now() - 100000000),
          checkOut: new Date(Date.now() - 90000000),
          nights: 3,
          totalPrice: 100,
          pricePerNight: 33,
          status: 'COMPLETED',
          adults: 2
        }
      });

      await prisma.review.create({
        data: {
          bookingId: pastBooking.id,
          listingId: listing.id,
          authorId: guest.id,
          recipientId: listing.hostId,
          overallRating: Math.floor(4 + Math.random() * 2), // Int 1-5
          cleanlinessRating: parseFloat((4.0 + Math.random()).toFixed(1)),
          accuracyRating: parseFloat((4.0 + Math.random()).toFixed(1)),
          communicationRating: parseFloat((4.0 + Math.random()).toFixed(1)),
          locationRating: parseFloat((4.0 + Math.random()).toFixed(1)),
          valueRating: parseFloat((4.0 + Math.random()).toFixed(1)),
          comment: reviewTexts[Math.floor(Math.random() * reviewTexts.length)],
          createdAt: new Date(Date.now() - Math.random() * 10000000000)
        },
      });
    }
  }

  console.log('✅ Created reviews');

  // ─── Notifications ───────────────────────────────
  // Use first guest and first host for sample notifications
  if (guests.length > 0) {
    await prisma.notification.create({
      data: {
        userId: guests[0].id,
        type: 'BOOKING_CONFIRMED',
        title: 'Booking Confirmed',
        message: 'Your stay at the Shibuya Modern Apartment has been confirmed!',
      },
    });
  }

  if (hosts.length > 0) {
    await prisma.notification.create({
      data: {
        userId: hosts[0].id,
        type: 'BOOKING_REQUEST',
        title: 'New Booking Request',
        message: 'Priya Sharma has requested to book your Kyoto Machiya Townhouse.',
      },
    });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
