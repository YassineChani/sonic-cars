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
      description:
        "SONIC CARS est présent à Oujda, capitale de l'Oriental marocain. Nous proposons une large gamme de véhicules pour vos déplacements professionnels et touristiques dans la région.",
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
      description:
        "SONIC CARS à Tanger, la porte de l'Afrique. Découvrez notre flotte moderne pour explorer la ville et ses environs en toute liberté.",
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
      brand: "Renault",
      model: "Clio 5",
      year: 2023,
      slug: "renault-clio-5-oujda-1",
      locationId: oujda.id,
      dailyPrice: 300,
      weeklyPrice: 1800,
      monthlyPrice: 6000,
      transmission: "Manuelle",
      fuelType: "Essence",
      seats: 5,
      doors: 5,
      luggageCapacity: 2,
      airConditioning: true,
      mileage: "Illimité",
      featured: true,
      description:
        "La Renault Clio 5 est la voiture citadine parfaite pour vos déplacements à Oujda. Économique, confortable et facile à conduire.",
      features: ["Climatisation", "Bluetooth", "USB", "Régulateur de vitesse", "Aide au stationnement"],
    },
    {
      title: "Renault Clio 5 — Tanger 1",
      brand: "Renault",
      model: "Clio 5",
      year: 2023,
      slug: "renault-clio-5-tanger-1",
      locationId: tanger.id,
      dailyPrice: 320,
      weeklyPrice: 1920,
      monthlyPrice: 6400,
      transmission: "Manuelle",
      fuelType: "Essence",
      seats: 5,
      doors: 5,
      luggageCapacity: 2,
      airConditioning: true,
      mileage: "Illimité",
      featured: true,
      description:
        "Profitez de la Renault Clio 5 pour explorer Tanger et ses environs. Parfaite pour la ville et les escapades côtières.",
      features: ["Climatisation", "Bluetooth", "USB", "Régulateur de vitesse"],
    },
    {
      title: "Renault Clio 5 — Tanger 2",
      brand: "Renault",
      model: "Clio 5",
      year: 2022,
      slug: "renault-clio-5-tanger-2",
      locationId: tanger.id,
      dailyPrice: 310,
      weeklyPrice: 1860,
      monthlyPrice: 6200,
      transmission: "Manuelle",
      fuelType: "Essence",
      seats: 5,
      doors: 5,
      luggageCapacity: 2,
      airConditioning: true,
      mileage: "Illimité",
      featured: false,
      description:
        "La Renault Clio 5 est idéale pour vos déplacements quotidiens à Tanger. Confort et économie garantis.",
      features: ["Climatisation", "Bluetooth", "USB"],
    },
    {
      title: "Peugeot 208 — Oujda",
      brand: "Peugeot",
      model: "208",
      year: 2023,
      slug: "peugeot-208-oujda",
      locationId: oujda.id,
      dailyPrice: 350,
      weeklyPrice: 2100,
      monthlyPrice: 7000,
      transmission: "Manuelle",
      fuelType: "Essence",
      seats: 5,
      doors: 5,
      luggageCapacity: 2,
      airConditioning: true,
      mileage: "Illimité",
      featured: true,
      description:
        "La Peugeot 208 allie style et performance. Son cockpit i-Cockpit® et son design sportif en font une voiture hors du commun.",
      features: ["Climatisation", "i-Cockpit", "Bluetooth", "USB", "Camera de recul"],
    },
    {
      title: "Peugeot 208 — Tanger",
      brand: "Peugeot",
      model: "208",
      year: 2023,
      slug: "peugeot-208-tanger",
      locationId: tanger.id,
      dailyPrice: 370,
      weeklyPrice: 2220,
      monthlyPrice: 7400,
      transmission: "Manuelle",
      fuelType: "Essence",
      seats: 5,
      doors: 5,
      luggageCapacity: 2,
      airConditioning: true,
      mileage: "Illimité",
      featured: false,
      description:
        "La Peugeot 208 à Tanger — stylée et maniable pour la conduite en ville comme sur autoroute.",
      features: ["Climatisation", "i-Cockpit", "Bluetooth", "USB"],
    },
    {
      title: "Dacia Sandero — Oujda",
      brand: "Dacia",
      model: "Sandero",
      year: 2022,
      slug: "dacia-sandero-oujda",
      locationId: oujda.id,
      dailyPrice: 280,
      weeklyPrice: 1680,
      monthlyPrice: 5600,
      transmission: "Manuelle",
      fuelType: "Essence",
      seats: 5,
      doors: 5,
      luggageCapacity: 2,
      airConditioning: true,
      mileage: "Illimité",
      featured: false,
      description:
        "La Dacia Sandero est le choix économique par excellence. Spacieuse, robuste et économique en carburant.",
      features: ["Climatisation", "Bluetooth", "USB"],
    },
    {
      title: "Dacia Logan — Tanger",
      brand: "Dacia",
      model: "Logan",
      year: 2022,
      slug: "dacia-logan-tanger",
      locationId: tanger.id,
      dailyPrice: 260,
      weeklyPrice: 1560,
      monthlyPrice: 5200,
      transmission: "Manuelle",
      fuelType: "Essence",
      seats: 5,
      doors: 4,
      luggageCapacity: 3,
      airConditioning: true,
      mileage: "Illimité",
      featured: false,
      description:
        "La Dacia Logan est parfaite pour les longs trajets. Grande capacité de coffre et confort pour toute la famille.",
      features: ["Climatisation", "Bluetooth", "Grand coffre"],
    },
    {
      title: "Dacia Duster — Oujda",
      brand: "Dacia",
      model: "Duster",
      year: 2023,
      slug: "dacia-duster-oujda",
      locationId: oujda.id,
      dailyPrice: 400,
      weeklyPrice: 2400,
      monthlyPrice: 8000,
      transmission: "Manuelle",
      fuelType: "Diesel",
      seats: 5,
      doors: 5,
      luggageCapacity: 3,
      airConditioning: true,
      mileage: "Illimité",
      featured: true,
      description:
        "Le Dacia Duster SUV — robustesse et polyvalence pour explorer les régions autour d'Oujda, routes de montagne incluses.",
      features: ["Climatisation", "4x4 disponible", "Bluetooth", "USB", "Toit panoramique"],
    },
    {
      title: "Volkswagen T-Roc Sport — Tanger",
      brand: "Volkswagen",
      model: "T-Roc Sport",
      year: 2023,
      slug: "volkswagen-t-roc-sport-tanger",
      locationId: tanger.id,
      dailyPrice: 650,
      weeklyPrice: 3900,
      monthlyPrice: 13000,
      transmission: "Automatique",
      fuelType: "Essence",
      seats: 5,
      doors: 5,
      luggageCapacity: 3,
      airConditioning: true,
      mileage: "Illimité",
      featured: true,
      description:
        "Le VW T-Roc Sport — un SUV premium alliant sportivité et confort. Idéal pour une expérience de conduite premium à Tanger.",
      features: ["Climatisation bi-zone", "Toit ouvrant", "GPS", "Bluetooth", "Sièges chauffants", "Camera 360°"],
    },
    {
      title: "Volkswagen T-Roc Sport — Oujda",
      brand: "Volkswagen",
      model: "T-Roc Sport",
      year: 2023,
      slug: "volkswagen-t-roc-sport-oujda",
      locationId: oujda.id,
      dailyPrice: 630,
      weeklyPrice: 3780,
      monthlyPrice: 12600,
      transmission: "Automatique",
      fuelType: "Essence",
      seats: 5,
      doors: 5,
      luggageCapacity: 3,
      airConditioning: true,
      mileage: "Illimité",
      featured: false,
      description:
        "Le VW T-Roc Sport à Oujda — performance, style et technologie embarquée pour vos voyages en Orient marocain.",
      features: ["Climatisation bi-zone", "Toit ouvrant", "GPS", "Bluetooth", "Sièges chauffants"],
    },
    {
      title: "Seat Leon FR — Tanger",
      brand: "Seat",
      model: "Leon FR",
      year: 2023,
      slug: "seat-leon-fr-tanger",
      locationId: tanger.id,
      dailyPrice: 500,
      weeklyPrice: 3000,
      monthlyPrice: 10000,
      transmission: "Automatique",
      fuelType: "Essence",
      seats: 5,
      doors: 5,
      luggageCapacity: 2,
      airConditioning: true,
      mileage: "Illimité",
      featured: true,
      description:
        "La Seat Leon FR — une berline sportive et élégante. Son design FR et ses performances vous offriront des sensations de conduite incomparables à Tanger.",
      features: ["Climatisation", "GPS", "Bluetooth", "Full LED", "Sport Mode", "USB-C"],
    },
    {
      title: "Seat Leon FR — Oujda",
      brand: "Seat",
      model: "Leon FR",
      year: 2022,
      slug: "seat-leon-fr-oujda",
      locationId: oujda.id,
      dailyPrice: 480,
      weeklyPrice: 2880,
      monthlyPrice: 9600,
      transmission: "Manuelle",
      fuelType: "Essence",
      seats: 5,
      doors: 5,
      luggageCapacity: 2,
      airConditioning: true,
      mileage: "Illimité",
      featured: false,
      description:
        "La Seat Leon FR à Oujda — sportivité et style pour vos déplacements dans la région de l'Oriental.",
      features: ["Climatisation", "GPS", "Bluetooth", "Full LED", "USB-C"],
    },
    {
      title: "Peugeot 308 — Tanger",
      brand: "Peugeot",
      model: "308",
      year: 2023,
      slug: "peugeot-308-tanger",
      locationId: tanger.id,
      dailyPrice: 420,
      weeklyPrice: 2520,
      monthlyPrice: 8400,
      transmission: "Automatique",
      fuelType: "Diesel",
      seats: 5,
      doors: 5,
      luggageCapacity: 3,
      airConditioning: true,
      mileage: "Illimité",
      featured: false,
      description:
        "La Peugeot 308 — une berline familiale premium avec un intérieur raffiné. Parfaite pour les voyages confortables entre Tanger et d'autres villes.",
      features: ["Climatisation bi-zone", "i-Cockpit", "GPS", "Bluetooth", "Camera de recul", "Toit panoramique"],
    },
    {
      title: "Peugeot 308 — Oujda",
      brand: "Peugeot",
      model: "308",
      year: 2022,
      slug: "peugeot-308-oujda",
      locationId: oujda.id,
      dailyPrice: 400,
      weeklyPrice: 2400,
      monthlyPrice: 8000,
      transmission: "Manuelle",
      fuelType: "Diesel",
      seats: 5,
      doors: 5,
      luggageCapacity: 3,
      airConditioning: true,
      mileage: "Illimité",
      featured: false,
      description:
        "La Peugeot 308 à Oujda — espace, confort et économie de carburant pour vos longs trajets dans la région.",
      features: ["Climatisation", "i-Cockpit", "GPS", "Bluetooth", "Camera de recul"],
    },
  ];

  for (const carData of carsData) {
    await prisma.car.upsert({
      where: { slug: carData.slug },
      update: {},
      create: {
        ...carData,
        features: JSON.stringify(carData.features),
        dailyPrice: carData.dailyPrice,
        weeklyPrice: carData.weeklyPrice,
        monthlyPrice: carData.monthlyPrice,
        pickupLocation: carData.locationId === oujda.id ? "Agence Oujda — 123 Avenue Mohammed V" : "Agence Tanger — 456 Boulevard Mohammed VI",
        returnLocation: carData.locationId === oujda.id ? "Agence Oujda — 123 Avenue Mohammed V" : "Agence Tanger — 456 Boulevard Mohammed VI",
        insuranceNotes: "Assurance tous risques incluse. Franchise de 3000 MAD en cas de sinistre.",
        rentalNotes: "Permis de conduire valide requis. Caution de 2000 MAD à la prise en charge.",
      },
    });
  }
  console.log("✅ 14 cars created");

  // ─── Testimonials ─────────────────────────────────────────────
  const testimonials = [
    {
      name: "Karim Benali",
      city: "Oujda",
      rating: 5,
      comment: "Service exceptionnel ! J'ai loué une Clio 5 pour une semaine à Oujda et tout s'est parfaitement passé. Voiture propre, personnel accueillant. Je recommande vivement SONIC CARS !",
    },
    {
      name: "Fatima Zahra Alami",
      city: "Tanger",
      rating: 5,
      comment: "Très satisfaite de ma location du T-Roc Sport à Tanger. Voiture impeccable, prix compétitifs et processus de réservation très simple. Merci SONIC CARS !",
    },
    {
      name: "Mohammed Rachidi",
      city: "Oujda",
      rating: 5,
      comment: "J'ai loué le Duster pour explorer la région de l'Oriental. Excellente voiture, parfaite pour les routes de montagne. Service client au top !",
    },
    {
      name: "Sarah Mansouri",
      city: "Tanger",
      rating: 4,
      comment: "Bonne expérience globale avec SONIC CARS à Tanger. La Peugeot 308 était très confortable pour notre séjour familial. Je reviendrai !",
    },
    {
      name: "Youssef El Fassi",
      city: "Casablanca",
      rating: 5,
      comment: "En visite à Oujda, j'ai loué la Seat Leon FR. Quelle belle voiture ! Livraison rapide et personnel très professionnel. SONIC CARS, c'est du sérieux.",
    },
    {
      name: "Nadia Boucetta",
      city: "Tanger",
      rating: 5,
      comment: "La meilleure agence de location à Tanger ! Prix transparents, aucune mauvaise surprise. Je loue chez SONIC CARS à chaque voyage. Très professionnel.",
    },
  ];

  for (const t of testimonials) {
    await prisma.testimonial.create({ data: t });
  }
  console.log("✅ Testimonials created");

  // ─── FAQs ─────────────────────────────────────────────────────
  const faqs = [
    {
      question: "Quel est l'âge minimum pour louer une voiture ?",
      answer: "L'âge minimum requis est de 21 ans, avec un permis de conduire valide depuis au moins 1 an. Pour certains véhicules premium, l'âge minimum peut être de 25 ans.",
      category: "Conditions",
      order: 1,
    },
    {
      question: "Quels documents sont nécessaires pour louer ?",
      answer: "Vous devez présenter : un permis de conduire valide (marocain ou international), une pièce d'identité nationale ou passeport, et une carte bancaire ou caution en espèces.",
      category: "Documents",
      order: 2,
    },
    {
      question: "Quelle est la politique de caution ?",
      answer: "Une caution remboursable est requise à la prise en charge du véhicule. Le montant varie selon la catégorie : 2000 MAD pour les citadines, 3000 MAD pour les berlines, et 5000 MAD pour les SUV premium.",
      category: "Paiement",
      order: 3,
    },
    {
      question: "Quelle est la politique carburant ?",
      answer: "Les véhicules sont remis avec un plein de carburant et doivent être rendus dans le même état. En cas de retour avec moins de carburant, les frais de remplissage seront facturés au tarif en vigueur.",
      category: "Carburant",
      order: 4,
    },
    {
      question: "Que se passe-t-il en cas de retard ?",
      answer: "Un retard jusqu'à 1 heure est toléré sans frais supplémentaires. Au-delà, une journée supplémentaire sera facturée. Contactez-nous si vous prévoyez un retard.",
      category: "Retour",
      order: 5,
    },
    {
      question: "L'assurance est-elle incluse ?",
      answer: "Oui, une assurance de base est incluse dans tous nos tarifs. Elle couvre les dommages matériels (avec franchise) et la responsabilité civile. Une assurance tous risques est disponible en option.",
      category: "Assurance",
      order: 6,
    },
    {
      question: "Puis-je prendre la voiture dans une ville et la rendre dans une autre ?",
      answer: "Oui, nous proposons des locations avec prise en charge à Oujda et retour à Tanger, et vice-versa. Des frais de transfert inter-villes peuvent s'appliquer. Contactez-nous pour un devis.",
      category: "Service",
      order: 7,
    },
    {
      question: "Comment fonctionne la réservation ?",
      answer: "1. Choisissez votre véhicule et vos dates. 2. Remplissez le formulaire de réservation. 3. Nous confirmons votre réservation par téléphone ou email sous 24h. 4. Présentez-vous à notre agence avec vos documents.",
      category: "Réservation",
      order: 8,
    },
    {
      question: "Puis-je modifier ou annuler ma réservation ?",
      answer: "Les modifications et annulations sont acceptées jusqu'à 48 heures avant la date de prise en charge, sans frais. En deçà de 48 heures, des frais d'annulation peuvent s'appliquer.",
      category: "Réservation",
      order: 9,
    },
    {
      question: "Le kilométrage est-il limité ?",
      answer: "Tous nos véhicules sont proposés avec un kilométrage illimité. Conduisez librement sans vous soucier des kilomètres parcourus !",
      category: "Service",
      order: 10,
    },
  ];

  for (const faq of faqs) {
    await prisma.fAQ.create({ data: faq });
  }
  console.log("✅ FAQs created");

  // ─── Site Settings ────────────────────────────────────────────
  const settings = [
    { key: "company_name", value: "SONIC CARS", type: "text", group: "company", label: "Nom de l'entreprise" },
    { key: "company_tagline", value: "Location de voiture premium à Oujda et Tanger", type: "text", group: "company", label: "Slogan" },
    { key: "company_description", value: "SONIC CARS est votre partenaire de confiance pour la location de voitures au Maroc. Avec notre flotte moderne et notre service personnalisé, nous vous garantissons une expérience de conduite exceptionnelle à Oujda et Tanger.", type: "text", group: "company", label: "Description" },
    { key: "phone_oujda", value: "+212600000001", type: "text", group: "contact", label: "Téléphone Oujda" },
    { key: "phone_tanger", value: "+212600000002", type: "text", group: "contact", label: "Téléphone Tanger" },
    { key: "whatsapp", value: "+212600000000", type: "text", group: "contact", label: "WhatsApp" },
    { key: "email", value: "contact@soniccars.ma", type: "text", group: "contact", label: "Email" },
    { key: "address_oujda", value: "123 Avenue Mohammed V, Oujda 60000, Maroc", type: "text", group: "contact", label: "Adresse Oujda" },
    { key: "address_tanger", value: "456 Boulevard Mohammed VI, Tanger 90000, Maroc", type: "text", group: "contact", label: "Adresse Tanger" },
    { key: "hours_weekday", value: "08:00 - 20:00", type: "text", group: "contact", label: "Heures d'ouverture (Lun-Sam)" },
    { key: "hours_weekend", value: "09:00 - 18:00", type: "text", group: "contact", label: "Heures d'ouverture (Dimanche)" },
    { key: "seo_title", value: "SONIC CARS — Location de Voiture à Oujda et Tanger | Maroc", type: "text", group: "seo", label: "SEO Title" },
    { key: "seo_description", value: "Louez votre voiture à Oujda ou Tanger avec SONIC CARS. Flotte moderne, prix compétitifs, service premium. Réservez en ligne dès maintenant !", type: "text", group: "seo", label: "SEO Description" },
    { key: "facebook_url", value: "", type: "text", group: "social", label: "Facebook URL" },
    { key: "instagram_url", value: "", type: "text", group: "social", label: "Instagram URL" },
  ];

  for (const setting of settings) {
    await prisma.siteSetting.upsert({
      where: { key: setting.key },
      update: {},
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
