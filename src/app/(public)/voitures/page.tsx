export const dynamic = 'force-dynamic';
import { prisma } from "@/lib/prisma";
import { FleetClient } from "@/components/fleet/FleetClient";

export const metadata = {
  title: "Notre Flotte — Location de Voiture à Oujda et Tanger",
  description: "Découvrez notre flotte complète de véhicules disponibles à la location à Oujda et Tanger. Citadines, berlines, SUV et utilitaires.",
};

const FALLBACK_CARS = [
  { id: "1", title: "Renault Clio 5", brand: "Renault", model: "Clio 5", year: 2023, slug: "renault-clio-5-oujda", dailyPrice: 300, weeklyPrice: 1800, monthlyPrice: null, transmission: "Manuelle", fuelType: "Diesel", seats: 5, doors: 5, luggageCapacity: 2, airConditioning: true, mileage: "Illimité", availability: true, featured: true, mainImage: "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=800&auto=format&fit=crop&q=80", description: "Citadine économique et confortable", features: "[]", locationId: "1", location: { id: "1", name: "Oujda", slug: "oujda" }, images: [], createdAt: new Date(), updatedAt: new Date() },
  { id: "2", title: "Peugeot 208", brand: "Peugeot", model: "208", year: 2023, slug: "peugeot-208-tanger", dailyPrice: 320, weeklyPrice: 1950, monthlyPrice: null, transmission: "Manuelle", fuelType: "Diesel", seats: 5, doors: 5, luggageCapacity: 2, airConditioning: true, mileage: "Illimité", availability: true, featured: true, mainImage: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=800&auto=format&fit=crop&q=80", description: "Compacte élégante et performante", features: "[]", locationId: "2", location: { id: "2", name: "Tanger", slug: "tanger" }, images: [], createdAt: new Date(), updatedAt: new Date() },
  { id: "3", title: "Dacia Duster", brand: "Dacia", model: "Duster", year: 2023, slug: "dacia-duster-oujda", dailyPrice: 400, weeklyPrice: 2400, monthlyPrice: null, transmission: "Manuelle", fuelType: "Diesel", seats: 5, doors: 5, luggageCapacity: 4, airConditioning: true, mileage: "Illimité", availability: true, featured: true, mainImage: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800&auto=format&fit=crop&q=80", description: "SUV robuste pour tous les terrains", features: "[]", locationId: "1", location: { id: "1", name: "Oujda", slug: "oujda" }, images: [], createdAt: new Date(), updatedAt: new Date() },
  { id: "4", title: "Hyundai Tucson", brand: "Hyundai", model: "Tucson", year: 2023, slug: "hyundai-tucson-tanger", dailyPrice: 500, weeklyPrice: 3000, monthlyPrice: null, transmission: "Automatique", fuelType: "Diesel", seats: 5, doors: 5, luggageCapacity: 4, airConditioning: true, mileage: "Illimité", availability: true, featured: false, mainImage: "https://images.unsplash.com/photo-1568844293986-ca9c5c58e943?w=800&auto=format&fit=crop&q=80", description: "SUV premium avec toutes les options", features: "[]", locationId: "2", location: { id: "2", name: "Tanger", slug: "tanger" }, images: [], createdAt: new Date(), updatedAt: new Date() },
  { id: "5", title: "Toyota Yaris", brand: "Toyota", model: "Yaris", year: 2023, slug: "toyota-yaris-oujda", dailyPrice: 280, weeklyPrice: 1680, monthlyPrice: null, transmission: "Manuelle", fuelType: "Essence", seats: 5, doors: 5, luggageCapacity: 2, airConditioning: true, mileage: "Illimité", availability: true, featured: false, mainImage: "https://images.unsplash.com/photo-1559416523-140ddc3d238c?w=800&auto=format&fit=crop&q=80", description: "Citadine fiable et économique", features: "[]", locationId: "1", location: { id: "1", name: "Oujda", slug: "oujda" }, images: [], createdAt: new Date(), updatedAt: new Date() },
  { id: "6", title: "Mercedes Classe C", brand: "Mercedes", model: "Classe C", year: 2023, slug: "mercedes-classe-c-tanger", dailyPrice: 800, weeklyPrice: 4800, monthlyPrice: null, transmission: "Automatique", fuelType: "Diesel", seats: 5, doors: 4, luggageCapacity: 3, airConditioning: true, mileage: "Illimité", availability: true, featured: false, mainImage: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800&auto=format&fit=crop&q=80", description: "Berline de luxe pour vos voyages d'affaires", features: "[]", locationId: "2", location: { id: "2", name: "Tanger", slug: "tanger" }, images: [], createdAt: new Date(), updatedAt: new Date() },
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
    <div className="pt-28 pb-20">
      <div className="container-custom">
        {/* Header */}
        <div className="mb-12">
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
            Filtrez et trouvez le véhicule idéal pour vos déplacements à Oujda ou Tanger.
          </p>
        </div>

        {/* Fleet Client View */}
        <FleetClient initialCars={cars as any} locations={locations} />
      </div>
    </div>
  );
}
