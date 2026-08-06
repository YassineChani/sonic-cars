export const dynamic = 'force-dynamic';
import { prisma } from "@/lib/prisma";
import { PublicBookingForm } from "@/components/booking/PublicBookingForm";

export const metadata = {
  title: "Réserver une Voiture — SONIC CARS Premium",
  description: "Réservez votre voiture de location de luxe à Oujda ou Tanger sans aucun paiement en ligne.",
};

export default async function BookingPage() {
  let cars: any[] = [];
  let locations: any[] = [];

  try {
    [cars, locations] = await Promise.all([
      prisma.car.findMany({
        where: { availability: true },
        include: { location: true },
        orderBy: { brand: "asc" },
      }),
      prisma.location.findMany(),
    ]);
  } catch {
    cars = [];
    locations = [];
  }

  return (
    <div className="pt-32 md:pt-44 pb-32">
      <div className="container-custom max-w-5xl">
        {/* Header Title Section */}
        <div className="text-center mt-8 md:mt-14 mb-16 md:mb-24 space-y-6">
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-red-500/10 border border-red-500/20">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            <span className="text-red-400 text-xs font-bold uppercase tracking-widest">
              Réservation Rapide & Sans Acompte
            </span>
          </div>

          <h1
            className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight"
            style={{ fontFamily: "var(--font-outfit)" }}
          >
            Réservez Votre <span className="text-red-500">Véhicule</span>
          </h1>

          <p className="text-white/60 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            Profitez de nos tarifs exclusifs et d'un service de livraison sur-mesure à Oujda, Tanger et dans tout le Maroc.
          </p>
        </div>

        {/* Public Booking Form */}
        <PublicBookingForm cars={cars as any} locations={locations} />
      </div>
    </div>
  );
}
