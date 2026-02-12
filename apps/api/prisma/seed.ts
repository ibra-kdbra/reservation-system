import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';
import * as bcrypt from 'bcrypt';
import { listingsData } from './seed-data';

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

  const host = await prisma.user.create({
    data: {
      email: 'host@example.com',
      password: hashedPassword,
      firstName: 'Yuki',
      lastName: 'Tanaka',
      username: 'yukit',
      bio: 'Superhost from Kyoto with 8 years of hospitality experience. I share authentic Japanese culture through my properties.',
      role: 'HOST',
      status: 'ACTIVE',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Yuki',
    },
  });

  const guest = await prisma.user.create({
    data: {
      email: 'guest@example.com',
      password: hashedPassword,
      firstName: 'Priya',
      lastName: 'Sharma',
      username: 'priyas',
      bio: 'Avid traveller exploring hidden gems across Asia.',
      role: 'USER',
      status: 'ACTIVE',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Priya',
    },
  });

  const host2 = await prisma.user.create({
    data: {
      email: 'host2@example.com',
      password: hashedPassword,
      firstName: 'Mei',
      lastName: 'Chen',
      username: 'meic',
      bio: 'Hospitality professional managing luxury stays in Southeast Asia. Passionate about sharing local culture.',
      role: 'HOST',
      status: 'ACTIVE',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mei',
    },
  });

  const host3 = await prisma.user.create({
    data: {
      email: 'host3@example.com',
      password: hashedPassword,
      firstName: 'Soo-Jin',
      lastName: 'Park',
      username: 'soojinp',
      bio: 'Seoul-based interior designer turned Superhost. Every room tells a story.',
      role: 'HOST',
      status: 'ACTIVE',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=SooJin',
    },
  });

  const guest2 = await prisma.user.create({
    data: {
      email: 'guest2@example.com',
      password: hashedPassword,
      firstName: 'Kenji',
      lastName: 'Sato',
      username: 'kenjis',
      bio: 'Photographer exploring Asia one city at a time.',
      role: 'USER',
      status: 'ACTIVE',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Kenji',
    },
  });

  const guest3 = await prisma.user.create({
    data: {
      email: 'guest3@example.com',
      password: hashedPassword,
      firstName: 'Ananya',
      lastName: 'Patel',
      username: 'ananyap',
      bio: 'Food and culture enthusiast discovering authentic stays.',
      role: 'USER',
      status: 'ACTIVE',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ananya',
    },
  });

  // Array to map hostIndex from seed-data to actual host objects
  const hosts = [host, host2, host3];

  console.log('✅ Created users');

  // ─── Amenities ───────────────────────────────────
  const amenityData = [
    { name: 'WiFi', icon: '📶', category: 'Basic' },
    { name: 'Air Conditioning', icon: '❄️', category: 'Basic' },
    { name: 'Kitchen', icon: '🍳', category: 'Basic' },
    { name: 'Washer', icon: '🧺', category: 'Basic' },
    { name: 'TV', icon: '📺', category: 'Entertainment' },
    { name: 'Pool', icon: '🏊', category: 'Leisure' },
    { name: 'Gym', icon: '🏋️', category: 'Leisure' },
    { name: 'Parking', icon: '🅿️', category: 'Basic' },
    { name: 'Hot Tub', icon: '♨️', category: 'Leisure' },
    { name: 'Workspace', icon: '💻', category: 'Basic' },
    { name: 'Security Camera', icon: '📷', category: 'Safety' },
    { name: 'First Aid Kit', icon: '🩹', category: 'Safety' },
    { name: 'Fire Extinguisher', icon: '🧯', category: 'Safety' },
    { name: 'Smoke Detector', icon: '🔔', category: 'Safety' },
    // Asian amenities
    { name: 'Tatami Room', icon: '🎋', category: 'Cultural' },
    { name: 'Onsen / Hot Spring', icon: '♨️', category: 'Cultural' },
    { name: 'Tea Ceremony Set', icon: '🍵', category: 'Cultural' },
    { name: 'Temple View', icon: '⛩️', category: 'Views' },
    { name: 'Rice Field View', icon: '🌾', category: 'Views' },
    { name: 'City Skyline View', icon: '🌇', category: 'Views' },
    { name: 'Yoga Space', icon: '🧘', category: 'Wellness' },
    { name: 'Spa Access', icon: '💆', category: 'Wellness' },
    { name: 'Bicycle Rental', icon: '🚲', category: 'Transport' },
    { name: 'Airport Shuttle', icon: '🚐', category: 'Transport' },
    { name: 'Rooftop Terrace', icon: '🏙️', category: 'Leisure' },
    { name: 'Garden', icon: '🌿', category: 'Leisure' },
    { name: 'Balcony', icon: '🏞️', category: 'Leisure' },
    { name: 'Concierge Service', icon: '🛎️', category: 'Service' },
  ];

  const amenities: Record<string, any> = {};
  for (const a of amenityData) {
    amenities[a.name] = await prisma.amenity.create({ data: a });
  }

  console.log('✅ Created amenities');


  // Listings data is now imported from seed-data.ts

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
  const guests = [guest, guest2, guest3];
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
  const reviewTexts = [
    'Absolutely stunning property. The interior design was impeccable and every detail had been thought through. Would book again in a heartbeat.',
    'Perfect location and beautifully maintained rooms. The host was incredibly responsive and left us a lovely welcome basket. Highly recommended.',
    'We loved every moment of our stay. The bed was supremely comfortable, the kitchen well-equipped, and the views were breathtaking.',
    'Exceptional hospitality. The space was even more beautiful than the photos suggest. Spotlessly clean with luxurious touches throughout.',
    'A gem of a find! Quiet neighborhood, gorgeous interiors, and the host went above and beyond to make us feel at home.',
    'The amenities were top-notch and the attention to cultural detail really made this stay special. The tatami room was an unforgettable experience.',
    'Great value for the quality offered. Modern, clean, and centrally located. The rooftop terrace was a wonderful bonus.',
    'One of the best stays we have had in Asia. The pool overlooking the rice terraces was magical at sunset.',
    'Charming space with real character. Loved the mix of traditional architecture and modern comforts. Will definitely return.',
    'Professional host, immaculate room, and a location that cannot be beaten. Public transport right at the doorstep.',
  ];

  // Generate reviews for ALL listings
  for (const listing of listings) {
    // Generate 3-8 reviews per listing
    const reviewCount = Math.floor(Math.random() * 6) + 3;
    
    for (let i = 0; i < reviewCount; i++) {
        const guest = guests[Math.floor(Math.random() * guests.length)];
        
    for (let i = 0; i < reviewCount; i++) {
        const guest = guests[Math.floor(Math.random() * guests.length)];
        
        // Create a completed booking first
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
  await prisma.notification.create({
    data: {
      userId: guest.id,
      type: 'BOOKING_CONFIRMED',
      title: 'Booking Confirmed',
      message: 'Your stay at the Shibuya Modern Apartment has been confirmed!',
    },
  });

  await prisma.notification.create({
    data: {
      userId: host.id,
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
