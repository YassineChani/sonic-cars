const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log("Updating cars with uploaded local images...");

  const cars = await prisma.car.findMany();

  for (const car of cars) {
    let mainImage = car.mainImage;
    const brandLower = car.brand.toLowerCase();
    const modelLower = car.model.toLowerCase();

    if (brandLower.includes("renault") || modelLower.includes("clio")) {
      mainImage = "/images/clio.jpg";
    } else if (brandLower.includes("peugeot") || modelLower.includes("208")) {
      mainImage = "/images/208.jpg";
    } else if (brandLower.includes("dacia") || modelLower.includes("stepway") || modelLower.includes("duster")) {
      mainImage = "/images/Dacia.jpg";
    } else if (brandLower.includes("volkswagen") || modelLower.includes("t-roc")) {
      mainImage = "/images/T-ROC.jpg";
    } else if (brandLower.includes("seat") || modelLower.includes("leon")) {
      mainImage = "/images/SEAT.jpg";
    }

    await prisma.car.update({
      where: { id: car.id },
      data: { mainImage },
    });
  }

  console.log("✅ All cars updated with local images!");
}

main().catch(console.error).finally(() => prisma.$disconnect());
