import { Test, TestingModule } from '@nestjs/testing';
import { ListingService } from './listing.service';
import { PrismaService } from '../prisma/prisma.service';

const mockPrismaService = {
    listing: {
        findMany: jest.fn(),
        count: jest.fn(),
        findUnique: jest.fn(),
        update: jest.fn(),
    },
};

describe('ListingService', () => {
    let service: ListingService;
    let prisma: typeof mockPrismaService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                ListingService,
                {
                    provide: PrismaService,
                    useValue: mockPrismaService,
                },
            ],
        }).compile();

        service = module.get<ListingService>(ListingService);
        prisma = module.get(PrismaService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    describe('searchListings', () => {
        it('should return listings with simple filters', async () => {
            const mockListings = [{ id: '1', title: 'Test Listing' }];
            prisma.listing.findMany.mockResolvedValue(mockListings);
            prisma.listing.count.mockResolvedValue(1);

            const result = await service.searchListings({ city: 'Test City' });

            expect(result.listings).toEqual(mockListings);
            expect(result.total).toEqual(1);
            expect(prisma.listing.findMany).toHaveBeenCalledWith(
                expect.objectContaining({
                    where: expect.objectContaining({
                        city: { contains: 'Test City', mode: 'insensitive' },
                    }),
                }),
            );
        });

        it('should filter by amenities (ALL must match)', async () => {
            const mockListings = [{ id: '1', title: 'Luxury Villa' }];
            prisma.listing.findMany.mockResolvedValue(mockListings);
            prisma.listing.count.mockResolvedValue(1);

            await service.searchListings({ amenities: ['Pool', 'WiFi'] });

            expect(prisma.listing.findMany).toHaveBeenCalledWith(
                expect.objectContaining({
                    where: expect.objectContaining({
                        AND: [
                            { amenities: { some: { amenity: { name: { equals: 'Pool', mode: 'insensitive' } } } } },
                            { amenities: { some: { amenity: { name: { equals: 'WiFi', mode: 'insensitive' } } } } },
                        ],
                    }),
                }),
            );
        });
    });
});
