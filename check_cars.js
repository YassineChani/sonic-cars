const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const cars = await prisma.car.findMany();
  console.log("Total cars:", cars.length);
  console.log(cars);
}

main().catch(console.error).finally(() => prisma.$disconnect());
