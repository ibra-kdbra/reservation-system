import { PrismaClient, UserRole } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Find the first user (usually host from seed)
  const user = await prisma.user.findFirst();

  if (!user) {
    console.error('No users found. Run seed first.');
    return;
  }

  const updatedUser = await prisma.user.update({
    where: { id: user.id },
    data: { role: UserRole.ADMIN },
  });

  console.log(`✅ Promoted user ${updatedUser.email} (ID: ${updatedUser.id}) to ADMIN.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
