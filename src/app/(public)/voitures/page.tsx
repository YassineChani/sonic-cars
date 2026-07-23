import { prisma } from "@/lib/prisma";
import { FleetClient } from "@/components/fleet/FleetClient";

export const metadata = {
  title: "Notre Flotte — Location de Voiture à Oujda et Tanger",
  description:
    "Découvrez notre flotte complète de véhicules disponibles à la location à Oujda et Tanger. Citadines, berlines, SUV et utilitaires.",
};

async function getCars() {
  return prisma.car.findMany({
    include: {
      location: true,
      images: { orderBy: { order: "asc" } },
    },
    orderBy: { createdAt: "desc" },
  });
}

async function getLocations() {
  return prisma.location.findMany();
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
