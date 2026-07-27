import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting seed...");

  // ─── Admin User ─────────────────────────────────────────────
  const hashedPassword = await bcrypt.hash("SonicCars2024!", 12);
  await prisma.adminUser.upsert({
    where: { email: "admin@soniccars.ma" },
    update: {},
    create: {
      email: "admin@soniccars.ma",
      password: hashedPassword,
      name: "Admin SONIC CARS",
      role: "admin",
    },
  });
  console.log("✅ Admin user created");

  // ─── Locations ───────────────────────────────────────────────
  const oujda = await prisma.location.upsert({
    where: { slug: "oujda" },
    update: {},
    create: {
      name: "Oujda",
      slug: "oujda",
      description: "SONIC CARS est présent à Oujda, capitale de l'Oriental marocain.",
      address: "123 Avenue Mohammed V, Oujda, Maroc",
      phone: "+212600000001",
      whatsapp: "+212600000001",
      email: "oujda@soniccars.ma",
    },
  });

  const tanger = await prisma.location.upsert({
    where: { slug: "tanger" },
    update: {},
    create: {
      name: "Tanger",
      slug: "tanger",
      description: "SONIC CARS à Tanger, la porte de l'Afrique.",
      address: "456 Boulevard Mohammed VI, Tanger, Maroc",
      phone: "+212600000002",
      whatsapp: "+212600000002",
      email: "tanger@soniccars.ma",
    },
  });
  console.log("✅ Locations created");

  // ─── Cars ────────────────────────────────────────────────────
  const carsData = [
    {
      title: "Renault Clio 5 — Oujda",
      brand: "Renault", model: "Clio 5", year: 2023,
      slug: "renault-clio-5-oujda-1",
      locationId: oujda.id,
      dailyPrice: 300, weeklyPrice: 1800, monthlyPrice: 6000,
      transmission: "Manuelle", fuelType: "Essence",
      seats: 5, doors: 5, luggageCapacity: 2,
      airConditioning: true, mileage: "Illimité", featured: true,
      mainImage: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Renault_Clio_V_-_front.jpg/1280px-Renault_Clio_V_-_front.jpg",
      description: "La Renault Clio 5 est la voiture citadine parfaite pour vos déplacements à Oujda. Économique, confortable et facile à conduire.",
      features: ["Climatisation", "Bluetooth", "USB", "Régulateur de vitesse", "Aide au stationnement"],
    },
    {
      title: "Renault Clio 5 — Tanger",
      brand: "Renault", model: "Clio 5", year: 2023,
      slug: "renault-clio-5-tanger-1",
      locationId: tanger.id,
      dailyPrice: 320, weeklyPrice: 1920, monthlyPrice: 6400,
      transmission: "Manuelle", fuelType: "Essence",
      seats: 5, doors: 5, luggageCapacity: 2,
      airConditioning: true, mileage: "Illimité", featured: true,
      mainImage: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Renault_Clio_V_-_front.jpg/1280px-Renault_Clio_V_-_front.jpg",
      description: "Profitez de la Renault Clio 5 pour explorer Tanger et ses environs.",
      features: ["Climatisation", "Bluetooth", "USB", "Régulateur de vitesse"],
    },
    {
      title: "Peugeot 208 — Oujda",
      brand: "Peugeot", model: "208", year: 2023,
      slug: "peugeot-208-oujda",
      locationId: oujda.id,
      dailyPrice: 350, weeklyPrice: 2100, monthlyPrice: 7000,
      transmission: "Manuelle", fuelType: "Essence",
      seats: 5, doors: 5, luggageCapacity: 2,
      airConditioning: true, mileage: "Illimité", featured: true,
      mainImage: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/2019_Peugeot_208_1.2_PureTech_Active_in_Bianca_White%2C_front_8.24.19.jpg/1280px-2019_Peugeot_208_1.2_PureTech_Active_in_Bianca_White%2C_front_8.24.19.jpg",
      description: "La Peugeot 208 allie style et performance. Son cockpit i-Cockpit® en fait une voiture hors du commun.",
      features: ["Climatisation", "i-Cockpit", "Bluetooth", "USB", "Camera de recul"],
    },
    {
      title: "Peugeot 208 — Tanger",
      brand: "Peugeot", model: "208", year: 2023,
      slug: "peugeot-208-tanger",
      locationId: tanger.id,
      dailyPrice: 370, weeklyPrice: 2220, monthlyPrice: 7400,
      transmission: "Manuelle", fuelType: "Essence",
      seats: 5, doors: 5, luggageCapacity: 2,
      airConditioning: true, mileage: "Illimité", featured: false,
      mainImage: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/2019_Peugeot_208_1.2_PureTech_Active_in_Bianca_White%2C_front_8.24.19.jpg/1280px-2019_Peugeot_208_1.2_PureTech_Active_in_Bianca_White%2C_front_8.24.19.jpg",
      description: "La Peugeot 208 à Tanger — stylée et maniable pour la conduite en ville comme sur autoroute.",
      features: ["Climatisation", "i-Cockpit", "Bluetooth", "USB"],
    },
    {
      title: "Dacia Sandero Stepway — Oujda",
      brand: "Dacia", model: "Sandero Stepway", year: 2023,
      slug: "dacia-sandero-stepway-oujda",
      locationId: oujda.id,
      dailyPrice: 280, weeklyPrice: 1680, monthlyPrice: 5600,
      transmission: "Manuelle", fuelType: "Essence",
      seats: 5, doors: 5, luggageCapacity: 2,
      airConditioning: true, mileage: "Illimité", featured: true,
      mainImage: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/2021_Dacia_Sandero_Stepway_Comfort_TCe_90_in_Cedar_Green%2C_front_8.1.21.jpg/1280px-2021_Dacia_Sandero_Stepway_Comfort_TCe_90_in_Cedar_Green%2C_front_8.1.21.jpg",
      description: "La Dacia Sandero Stepway est le choix économique par excellence. Spacieuse, robuste et économique en carburant.",
      features: ["Climatisation", "Bluetooth", "USB", "Look Baroudeur"],
    },
    {
      title: "Dacia Duster — Oujda",
      brand: "Dacia", model: "Duster", year: 2023,
      slug: "dacia-duster-oujda",
      locationId: oujda.id,
      dailyPrice: 400, weeklyPrice: 2400, monthlyPrice: 8000,
      transmission: "Manuelle", fuelType: "Diesel",
      seats: 5, doors: 5, luggageCapacity: 3,
      airConditioning: true, mileage: "Illimité", featured: false,
      mainImage: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/2021_Dacia_Duster_Expression_dCi_115_4x4_in_Slate_Grey%2C_front_8.1.21.jpg/1280px-2021_Dacia_Duster_Expression_dCi_115_4x4_in_Slate_Grey%2C_front_8.1.21.jpg",
      description: "Le Dacia Duster SUV — robustesse et polyvalence pour explorer les régions autour d'Oujda.",
      features: ["Climatisation", "4x4 disponible", "Bluetooth", "USB"],
    },
    {
      title: "Volkswagen T-Roc Sport — Tanger",
      brand: "Volkswagen", model: "T-Roc Sport", year: 2024,
      slug: "volkswagen-t-roc-sport-tanger",
      locationId: tanger.id,
      dailyPrice: 650, weeklyPrice: 3900, monthlyPrice: 13000,
      transmission: "Automatique", fuelType: "Essence",
      seats: 5, doors: 5, luggageCapacity: 3,
      airConditioning: true, mileage: "Illimité", featured: true,
      mainImage: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/VW_T-Roc_R-Line_facelift.jpg/1280px-VW_T-Roc_R-Line_facelift.jpg",
      description: "Le VW T-Roc Sport — un SUV premium alliant sportivité et confort. Idéal pour une expérience de conduite premium à Tanger.",
      features: ["Climatisation bi-zone", "Toit ouvrant", "GPS", "Bluetooth", "Sièges chauffants", "Camera 360°"],
    },
    {
      title: "Volkswagen T-Roc Sport — Oujda",
      brand: "Volkswagen", model: "T-Roc Sport", year: 2023,
      slug: "volkswagen-t-roc-sport-oujda",
      locationId: oujda.id,
      dailyPrice: 630, weeklyPrice: 3780, monthlyPrice: 12600,
      transmission: "Automatique", fuelType: "Essence",
      seats: 5, doors: 5, luggageCapacity: 3,
      airConditioning: true, mileage: "Illimité", featured: false,
      mainImage: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/VW_T-Roc_R-Line_facelift.jpg/1280px-VW_T-Roc_R-Line_facelift.jpg",
      description: "Le VW T-Roc Sport à Oujda — performance, style et technologie embarquée.",
      features: ["Climatisation bi-zone", "Toit ouvrant", "GPS", "Bluetooth", "Sièges chauffants"],
    },
    {
      title: "Seat Leon FR — Tanger",
      brand: "Seat", model: "Leon FR", year: 2023,
      slug: "seat-leon-fr-tanger",
      locationId: tanger.id,
      dailyPrice: 500, weeklyPrice: 3000, monthlyPrice: 10000,
      transmission: "Automatique", fuelType: "Essence",
      seats: 5, doors: 5, luggageCapacity: 2,
      airConditioning: true, mileage: "Illimité", featured: true,
      mainImage: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/SEAT_Le%C3%B3n_FR_%28IV%2C_Typ_KL%29_%E2%80%93_f_18062021.jpg/1280px-SEAT_Le%C3%B3n_FR_%28IV%2C_Typ_KL%29_%E2%80%93_f_18062021.jpg",
      description: "La Seat Leon FR — une berline sportive et élégante. Des sensations de conduite incomparables à Tanger.",
      features: ["Climatisation", "GPS", "Bluetooth", "Full LED", "Sport Mode", "USB-C"],
    },
    {
      title: "Seat Leon FR — Oujda",
      brand: "Seat", model: "Leon FR", year: 2023,
      slug: "seat-leon-fr-oujda",
      locationId: oujda.id,
      dailyPrice: 480, weeklyPrice: 2880, monthlyPrice: 9600,
      transmission: "Manuelle", fuelType: "Essence",
      seats: 5, doors: 5, luggageCapacity: 2,
      airConditioning: true, mileage: "Illimité", featured: false,
      mainImage: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/SEAT_Le%C3%B3n_FR_%28IV%2C_Typ_KL%29_%E2%80%93_f_18062021.jpg/1280px-SEAT_Le%C3%B3n_FR_%28IV%2C_Typ_KL%29_%E2%80%93_f_18062021.jpg",
      description: "La Seat Leon FR à Oujda — sportivité et style pour vos déplacements dans la région de l'Oriental.",
      features: ["Climatisation", "GPS", "Bluetooth", "Full LED", "USB-C"],
    },
    {
      title: "Peugeot 308 — Tanger",
      brand: "Peugeot", model: "308", year: 2023,
      slug: "peugeot-308-tanger",
      locationId: tanger.id,
      dailyPrice: 420, weeklyPrice: 2520, monthlyPrice: 8400,
      transmission: "Automatique", fuelType: "Diesel",
      seats: 5, doors: 5, luggageCapacity: 3,
      airConditioning: true, mileage: "Illimité", featured: true,
      mainImage: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Peugeot_308_GT_Pack_-_2021_%28cropped%29.jpg/1280px-Peugeot_308_GT_Pack_-_2021_%28cropped%29.jpg",
      description: "La Peugeot 308 — une berline familiale premium avec un intérieur raffiné.",
      features: ["Climatisation bi-zone", "i-Cockpit", "GPS", "Bluetooth", "Camera de recul", "Toit panoramique"],
    },
    {
      title: "Peugeot 308 — Oujda",
      brand: "Peugeot", model: "308", year: 2022,
      slug: "peugeot-308-oujda",
      locationId: oujda.id,
      dailyPrice: 400, weeklyPrice: 2400, monthlyPrice: 8000,
      transmission: "Manuelle", fuelType: "Diesel",
      seats: 5, doors: 5, luggageCapacity: 3,
      airConditioning: true, mileage: "Illimité", featured: false,
      mainImage: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Peugeot_308_GT_Pack_-_2021_%28cropped%29.jpg/1280px-Peugeot_308_GT_Pack_-_2021_%28cropped%29.jpg",
      description: "La Peugeot 308 à Oujda — espace, confort et économie de carburant.",
      features: ["Climatisation", "i-Cockpit", "GPS", "Bluetooth", "Camera de recul"],
    },
  ];

  for (const carData of carsData) {
    const { features, mainImage, ...rest } = carData as any;
    await prisma.car.upsert({
      where: { slug: carData.slug },
      update: { mainImage: mainImage ?? null, features: JSON.stringify(features) },
      create: {
        ...rest,
        mainImage: mainImage ?? null,
        features: JSON.stringify(features),
        pickupLocation: carData.locationId === oujda.id ? "Agence Oujda — 123 Avenue Mohammed V" : "Agence Tanger — 456 Boulevard Mohammed VI",
        returnLocation: carData.locationId === oujda.id ? "Agence Oujda — 123 Avenue Mohammed V" : "Agence Tanger — 456 Boulevard Mohammed VI",
        insuranceNotes: "Assurance tous risques incluse. Franchise de 3000 MAD en cas de sinistre.",
        rentalNotes: "Permis de conduire valide requis. Caution de 2000 MAD à la prise en charge.",
      },
    });
  }
  console.log("✅ 12 cars upserted with real images");

  // ─── FAQs ─────────────────────────────────────────────────────
  const faqs = [
    { question: "Quel est l'âge minimum pour louer une voiture ?", answer: "L'âge minimum requis est de 21 ans, avec un permis de conduire valide depuis au moins 1 an.", category: "Conditions", order: 1 },
    { question: "Quels documents sont nécessaires pour louer ?", answer: "Un permis de conduire valide, une pièce d'identité nationale ou passeport, et une caution.", category: "Documents", order: 2 },
    { question: "Quelle est la politique de caution ?", answer: "2000 MAD pour les citadines, 3000 MAD pour les berlines, 5000 MAD pour les SUV premium. Remboursable au retour.", category: "Paiement", order: 3 },
    { question: "L'assurance est-elle incluse ?", answer: "Oui, une assurance de base est incluse dans tous nos tarifs (avec franchise). Une assurance tous risques est disponible en option.", category: "Assurance", order: 4 },
    { question: "Le kilométrage est-il limité ?", answer: "Tous nos véhicules sont proposés avec un kilométrage illimité.", category: "Service", order: 5 },
    { question: "Puis-je prendre la voiture à Oujda et la rendre à Tanger ?", answer: "Oui, nous proposons des locations inter-villes. Des frais de transfert peuvent s'appliquer.", category: "Service", order: 6 },
    { question: "Comment fonctionne la réservation ?", answer: "1. Choisissez votre véhicule. 2. Remplissez le formulaire. 3. Nous vous contactons sous 30 minutes. 4. Présentez-vous à l'agence avec vos documents.", category: "Réservation", order: 7 },
    { question: "Puis-je annuler ma réservation ?", answer: "Annulation gratuite jusqu'à 48h avant la prise en charge. Des frais peuvent s'appliquer en deçà.", category: "Réservation", order: 8 },
  ];

  for (const faq of faqs) {
    await prisma.fAQ.upsert({
      where: { id: faq.order.toString() },
      update: {},
      create: faq,
    }).catch(async () => {
      await prisma.fAQ.create({ data: faq });
    });
  }
  console.log("✅ FAQs created");

  // ─── Site Settings ────────────────────────────────────────────
  const settings = [
    { key: "company_name", value: "SONIC CARS", type: "text", group: "company", label: "Nom de l'entreprise" },
    { key: "company_tagline", value: "Location de voiture premium à Oujda et Tanger", type: "text", group: "company", label: "Slogan" },
    { key: "phone_oujda", value: "+212600000001", type: "text", group: "contact", label: "Téléphone Oujda" },
    { key: "phone_tanger", value: "+212600000002", type: "text", group: "contact", label: "Téléphone Tanger" },
    { key: "whatsapp", value: "+212600000000", type: "text", group: "contact", label: "WhatsApp" },
    { key: "email", value: "contact@soniccars.ma", type: "text", group: "contact", label: "Email" },
    { key: "address_oujda", value: "123 Avenue Mohammed V, Oujda 60000", type: "text", group: "contact", label: "Adresse Oujda" },
    { key: "address_tanger", value: "456 Boulevard Mohammed VI, Tanger 90000", type: "text", group: "contact", label: "Adresse Tanger" },
    { key: "hours_weekday", value: "08:00 - 20:00", type: "text", group: "contact", label: "Heures d'ouverture (Lun-Sam)" },
  ];

  for (const setting of settings) {
    await prisma.siteSetting.upsert({
      where: { key: setting.key },
      update: { value: setting.value },
      create: setting,
    });
  }
  console.log("✅ Site settings created");

  console.log("🎉 Seed completed successfully!");
}

main()
  .catch((e) => {
    console.error("❌ Seed error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
