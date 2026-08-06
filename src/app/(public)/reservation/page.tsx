export const dynamic = 'force-dynamic';
import { prisma } from "@/lib/prisma";
import { PublicBookingForm } from "@/components/booking/PublicBookingForm";

export const metadata = {
  title: "Réserver une Voiture — SONIC CARS",
  description: "Réservez votre voiture de location à Oujda ou Tanger en quelques clics.",
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
    <div className="pt-28 md:pt-36 pb-28">
      <div className="container-custom max-w-4xl">
        <div className="text-center mt-6 md:mt-10 mb-16 space-y-4">
          <div className="flex items-center justify-center gap-3 mb-2">
            <div className="divider-red" />
            <span className="text-red-500 text-sm font-semibold uppercase tracking-widest">
              Réservation Rapide
            </span>
            <div className="divider-red" />
          </div>
          <h1
            className="text-4xl md:text-5xl font-black text-white"
            style={{ fontFamily: "var(--font-outfit)" }}
          >
            Réservez Votre <span className="text-red-500">Voiture</span>
          </h1>
          <p className="text-white/50 text-base max-w-lg mx-auto leading-relaxed">
            Remplissez le formulaire ci-dessous. Notre équipe vous contactera pour valider votre demande sans aucun paiement en ligne.
          </p>
        </div>

        <PublicBookingForm cars={cars as any} locations={locations} />
      </div>
    </div>
  );
}
