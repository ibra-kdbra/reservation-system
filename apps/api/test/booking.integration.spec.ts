import { IntegrationTestFactory } from './integration-test-factory';
import request from 'supertest';
import { BookingStatus } from '@nest-asia/types';

describe('Booking Logic (Integration)', () => {
  const factory = new IntegrationTestFactory();

  beforeAll(async () => {
    await factory.init();
  }, 60000);

  afterAll(async () => {
    await factory.cleanup();
  });

  let guestId: string;
  let hostId: string;
  let listingId: string;
  let accessToken: string;

  beforeEach(async () => {
    await factory.clearDatabase();
    const prisma = factory.getPrisma();

    // 1. Create Host and Guest
    const host = await prisma.user.create({
      data: { email: 'host@example.com', role: 'HOST' }
    });
    hostId = host.id;

    const guest = await prisma.user.create({
      data: { email: 'guest@example.com' }
    });
    guestId = guest.id;

    // 2. Create Listing
    const listing = await prisma.listing.create({
      data: {
        title: 'Integration Villa',
        description: 'Test Villa',
        propertyType: 'VILLA',
        hostId: hostId,
        country: 'Cambodia',
        city: 'Siem Reap',
        address: '123 Test St',
        latitude: 13.36,
        longitude: 103.86,
        maxGuests: 4,
        bedrooms: 2,
        beds: 2,
        bathrooms: 2,
        pricePerNight: 100,
        status: 'PUBLISHED'
      }
    });
    listingId = listing.id;

    // 3. Get Auth Token for Guest (Simulated simplified login)
    // In a real test we would use auth/login, here we just assume it works
    const authResponse = await request(factory.getApp().getHttpServer())
      .post('/api/v1/auth/register')
      .send({
        email: 'realguest@example.com',
        password: 'StrongPassword123!',
      });
    accessToken = authResponse.body.data.accessToken;
    guestId = authResponse.body.data.user.id;
  });

  describe('POST /bookings', () => {
    it('should create a booking for available dates', async () => {
      const checkIn = new Date();
      checkIn.setDate(checkIn.getDate() + 1);
      const checkOut = new Date();
      checkOut.setDate(checkOut.getDate() + 3);

      const response = await request(factory.getApp().getHttpServer())
        .post('/api/v1/bookings')
        .set('Authorization', `Bearer ${accessToken}`)
        .send({
          listingId,
          checkIn: checkIn.toISOString(),
          checkOut: checkOut.toISOString(),
          adults: 2,
        })
        .expect(201);

      expect(response.body.data.listingId).toBe(listingId);
      expect(response.body.data.status).toBe('PENDING');
    });

    it('should prevent double booking for overlapping dates', async () => {
      const checkIn = new Date();
      checkIn.setDate(checkIn.getDate() + 5);
      const checkOut = new Date();
      checkOut.setDate(checkOut.getDate() + 10);

      // 1. Create first booking
      await factory.getPrisma().booking.create({
        data: {
          guestId,
          listingId,
          checkIn,
          checkOut,
          nights: 5,
          adults: 2,
          pricePerNight: 100,
          totalPrice: 500,
          status: 'CONFIRMED'
        }
      });

      // 2. Try to book overlapping dates
      const overlapStart = new Date();
      overlapStart.setDate(overlapStart.getDate() + 7);
      const overlapEnd = new Date();
      overlapEnd.setDate(overlapEnd.getDate() + 12);

      await request(factory.getApp().getHttpServer())
        .post('/api/v1/bookings')
        .set('Authorization', `Bearer ${accessToken}`)
        .send({
          listingId,
          checkIn: overlapStart.toISOString(),
          checkOut: overlapEnd.toISOString(),
          adults: 1,
        })
        .expect(400); // Expect conflict/bad request
    });

    it('should respect minimum stay requirements', async () => {
      // Update listing min nights
      await factory.getPrisma().listing.update({
        where: { id: listingId },
        data: { minNights: 3 }
      });

      const checkIn = new Date();
      checkIn.setDate(checkIn.getDate() + 20);
      const checkOut = new Date();
      checkOut.setDate(checkOut.getDate() + 21); // Only 1 night

      await request(factory.getApp().getHttpServer())
        .post('/api/v1/bookings')
        .set('Authorization', `Bearer ${accessToken}`)
        .send({
          listingId,
          checkIn: checkIn.toISOString(),
          checkOut: checkOut.toISOString(),
          adults: 1,
        })
        .expect(400);
    });
  });
});
