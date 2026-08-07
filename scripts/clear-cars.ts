import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Delete in order to respect foreign keys
  const deletedImages = await prisma.carImage.deleteMany({});
  console.log(`Deleted ${deletedImages.count} car images`);

  const deletedCars = await prisma.car.deleteMany({});
  console.log(`Deleted ${deletedCars.count} cars`);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
