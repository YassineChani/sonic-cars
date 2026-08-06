export const dynamic = 'force-dynamic';
import { prisma } from "@/lib/prisma";
import { FleetClient } from "@/components/fleet/FleetClient";

export const metadata = {
  title: "Notre Flotte — Location de Voiture à Oujda et Tanger",
  description: "Découvrez notre flotte complète de véhicules disponibles à la location à Oujda et Tanger.",
};

const FALLBACK_CARS = [
  { id: "1", title: "Renault Clio 5", brand: "Renault", model: "Clio 5", year: 2023, slug: "renault-clio-5-oujda", dailyPrice: 0, weeklyPrice: null, monthlyPrice: null, transmission: "Manuelle", fuelType: "Diesel", seats: 5, doors: 5, luggageCapacity: 2, airConditioning: true, mileage: "Illimité", availability: true, featured: true, mainImage: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Renault_Clio_V_-_front.jpg/1280px-Renault_Clio_V_-_front.jpg", description: "Citadine économique et confortable", features: "[]", locationId: "1", location: { id: "1", name: "Oujda", slug: "oujda" }, images: [], createdAt: new Date(), updatedAt: new Date() },
  { id: "2", title: "Peugeot 208", brand: "Peugeot", model: "208", year: 2023, slug: "peugeot-208-tanger", dailyPrice: 0, weeklyPrice: null, monthlyPrice: null, transmission: "Manuelle", fuelType: "Diesel", seats: 5, doors: 5, luggageCapacity: 2, airConditioning: true, mileage: "Illimité", availability: true, featured: true, mainImage: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/2019_Peugeot_208_1.2_PureTech_Active_in_Bianca_White%2C_front_8.24.19.jpg/1280px-2019_Peugeot_208_1.2_PureTech_Active_in_Bianca_White%2C_front_8.24.19.jpg", description: "Compacte élégante et performante", features: "[]", locationId: "2", location: { id: "2", name: "Tanger", slug: "tanger" }, images: [], createdAt: new Date(), updatedAt: new Date() },
  { id: "3", title: "Dacia Sandero Stepway", brand: "Dacia", model: "Sandero Stepway", year: 2023, slug: "dacia-sandero-stepway-oujda", dailyPrice: 0, weeklyPrice: null, monthlyPrice: null, transmission: "Manuelle", fuelType: "Diesel", seats: 5, doors: 5, luggageCapacity: 3, airConditioning: true, mileage: "Illimité", availability: true, featured: true, mainImage: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/2021_Dacia_Sandero_Stepway_Comfort_TCe_90_in_Cedar_Green%2C_front_8.1.21.jpg/1280px-2021_Dacia_Sandero_Stepway_Comfort_TCe_90_in_Cedar_Green%2C_front_8.1.21.jpg", description: "SUV robuste pour tous les terrains", features: "[]", locationId: "1", location: { id: "1", name: "Oujda", slug: "oujda" }, images: [], createdAt: new Date(), updatedAt: new Date() },
  { id: "4", title: "Volkswagen T-Roc Sport", brand: "Volkswagen", model: "T-Roc Sport", year: 2024, slug: "volkswagen-t-roc-sport-tanger", dailyPrice: 0, weeklyPrice: null, monthlyPrice: null, transmission: "Automatique", fuelType: "Diesel", seats: 5, doors: 5, luggageCapacity: 4, airConditioning: true, mileage: "Illimité", availability: true, featured: true, mainImage: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/VW_T-Roc_R-Line_facelift.jpg/1280px-VW_T-Roc_R-Line_facelift.jpg", description: "SUV premium avec toutes les options", features: "[]", locationId: "2", location: { id: "2", name: "Tanger", slug: "tanger" }, images: [], createdAt: new Date(), updatedAt: new Date() },
  { id: "5", title: "Seat Leon FR", brand: "Seat", model: "Leon FR", year: 2023, slug: "seat-leon-fr-oujda", dailyPrice: 0, weeklyPrice: null, monthlyPrice: null, transmission: "Automatique", fuelType: "Essence", seats: 5, doors: 5, luggageCapacity: 2, airConditioning: true, mileage: "Illimité", availability: true, featured: true, mainImage: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/SEAT_Le%C3%B3n_FR_%28IV%2C_Typ_KL%29_%E2%80%93_f_18062021.jpg/1280px-SEAT_Le%C3%B3n_FR_%28IV%2C_Typ_KL%29_%E2%80%93_f_18062021.jpg", description: "Berline sportive et élégante", features: "[]", locationId: "1", location: { id: "1", name: "Oujda", slug: "oujda" }, images: [], createdAt: new Date(), updatedAt: new Date() },
  { id: "6", title: "Peugeot 308", brand: "Peugeot", model: "308", year: 2023, slug: "peugeot-308-tanger", dailyPrice: 0, weeklyPrice: null, monthlyPrice: null, transmission: "Automatique", fuelType: "Diesel", seats: 5, doors: 5, luggageCapacity: 3, airConditioning: true, mileage: "Illimité", availability: true, featured: true, mainImage: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Peugeot_308_GT_Pack_-_2021_%28cropped%29.jpg/1280px-Peugeot_308_GT_Pack_-_2021_%28cropped%29.jpg", description: "Berline de luxe et confortable", features: "[]", locationId: "2", location: { id: "2", name: "Tanger", slug: "tanger" }, images: [], createdAt: new Date(), updatedAt: new Date() },
];

const FALLBACK_LOCATIONS = [
  { id: "1", name: "Oujda", slug: "oujda", description: null, address: null, phone: null, whatsapp: null, email: null, mapEmbedUrl: null, image: null, createdAt: new Date(), updatedAt: new Date() },
  { id: "2", name: "Tanger", slug: "tanger", description: null, address: null, phone: null, whatsapp: null, email: null, mapEmbedUrl: null, image: null, createdAt: new Date(), updatedAt: new Date() },
];

async function getCars() {
  try {
    const cars = await prisma.car.findMany({
      include: { location: true, images: { orderBy: { order: "asc" } } },
      orderBy: { createdAt: "desc" },
    });
    return cars.length > 0 ? cars : FALLBACK_CARS;
  } catch {
    return FALLBACK_CARS;
  }
}

async function getLocations() {
  try {
    const locs = await prisma.location.findMany();
    return locs.length > 0 ? locs : FALLBACK_LOCATIONS;
  } catch {
    return FALLBACK_LOCATIONS;
  }
}

export default async function FleetPage() {
  const [cars, locations] = await Promise.all([getCars(), getLocations()]);

  return (
    <div className="pt-28 md:pt-36 pb-20">
      <div className="container-custom">
        {/* Header */}
        <div className="mt-6 md:mt-10 mb-12">
          <div className="flex items-center gap-3 mb-3">
            <div className="divider-red" />
            <span className="text-red-500 text-sm font-semibold uppercase tracking-widest">
              Catalogue Complet
            </span>
          </div>
          <h1
            className="text-4xl md:text-6xl font-black text-white"
            style={{ fontFamily: "var(--font-outfit)" }}
          >
            Notre <span className="text-red-500">Flotte</span>
          </h1>
          <p className="text-white/50 text-lg mt-3">
            Découvrez nos modèles disponibles à la location à Oujda et Tanger.
          </p>
        </div>

        {/* Fleet Client View */}
        <FleetClient initialCars={cars as any} locations={locations} />
      </div>
    </div>
  );
}
