import { prisma } from "@/lib/prisma";
import { PublicBookingForm } from "@/components/booking/PublicBookingForm";

export const metadata = {
  title: "Réserver une Voiture — SONIC CARS",
  description: "Réservez votre voiture de location à Oujda ou Tanger en quelques clics.",
};

export default async function BookingPage() {
  const [cars, locations] = await Promise.all([
    prisma.car.findMany({
      where: { availability: true },
      include: { location: true },
      orderBy: { brand: "asc" },
    }),
    prisma.location.findMany(),
  ]);

  return (
    <div className="pt-28 pb-20">
      <div className="container-custom max-w-4xl">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-3">
            <div className="divider-red" />
            <span className="text-red-500 text-sm font-semibold uppercase tracking-widest">
              Réservation Rapide
            </span>
            <div className="divider-red" />
          </div>
          <h1
            className="text-4xl md:text-5xl font-black text-white mb-4"
            style={{ fontFamily: "var(--font-outfit)" }}
          >
            Réservez Votre <span className="text-red-500">Voiture</span>
          </h1>
          <p className="text-white/50 text-base max-w-lg mx-auto">
            Remplissez le formulaire ci-dessous. Notre équipe vous contactera pour valider votre demande sans aucun paiement en ligne.
          </p>
        </div>

        <PublicBookingForm cars={cars as any} locations={locations} />
      </div>
    </div>
  );
}
