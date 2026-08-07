const fs = require('fs');
const path = require('path');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const dir = 'public/images';
  const files = fs.readdirSync(dir);

  for (const f of files) {
    if (f.endsWith('.jpg.jpg')) {
      const oldPath = path.join(dir, f);
      const newPath = path.join(dir, f.slice(0, -4));
      fs.renameSync(oldPath, newPath);
      console.log(`Renamed ${f} -> ${f.slice(0, -4)}`);
    }
  }

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

  console.log("✅ Fixed image file names and DB records!");
}

main().catch(console.error).finally(() => prisma.$disconnect());
