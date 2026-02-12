import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const userCount = await prisma.user.count();
  const listingCount = await prisma.listing.count();
  console.log(`Users: ${userCount}`);
  console.log(`Listings: ${listingCount}`);
  
  if (userCount > 0) {
    const admin = await prisma.user.findFirst({ where: { role: 'ADMIN' } });
    console.log(`Admin found: ${admin?.email}`);
  }
}

main()
  .catch((e) => console.error(e))
  .finally(() => prisma.$disconnect());
