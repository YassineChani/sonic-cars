import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
export const dynamic = 'force-dynamic';
import { prisma } from "@/lib/prisma";
import { CarDetailGallery } from "@/components/cars/CarDetailGallery";
import { BookingWidget } from "@/components/booking/BookingWidget";
import { Users, Fuel, Settings, DoorClosed, Snowflake, ShieldCheck, MapPin, ArrowLeft, Star, Gauge } from "lucide-react";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const car = await prisma.car.findUnique({
    where: { slug },
    include: { location: true },
  });

  if (!car) return { title: "Voiture non trouvée" };

  return {
    title: `${car.brand} ${car.model} (${car.year}) — Location à ${car.location.name}`,
    description: `Louez la ${car.brand} ${car.model} à ${car.location.name} à partir de ${car.dailyPrice} MAD/jour. Kilométrage illimité, assurance incluse.`,
  };
}

export default async function CarDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const car = await prisma.car.findUnique({
    where: { slug },
    include: {
      location: true,
      images: { orderBy: { order: "asc" } },
    },
  });

  if (!car) notFound();

  const features: string[] = (() => {
    try { return JSON.parse(car.features as string); } catch { return []; }
  })();

  const allImages = [
    car.mainImage || "/placeholder-car.jpg",
    ...car.images.map((img) => img.url),
  ].filter(Boolean);

  const price = Number(car.dailyPrice);

  return (
    <div className="pt-28 pb-20">
      <div className="container-custom">
        {/* Back Link */}
        <Link
          href="/voitures"
          className="inline-flex items-center gap-2 text-white/50 hover:text-white text-sm mb-8 transition-colors"
        >
          <ArrowLeft size={16} />
          Retour à la flotte
        </Link>

        {/* Title Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="badge-red text-xs">{car.brand}</span>
              <div className="flex items-center gap-1 text-white/60 text-xs">
                <MapPin size={14} className="text-red-500" />
                {car.location.name}
              </div>
            </div>
            <h1
              className="text-4xl md:text-5xl font-black text-white"
              style={{ fontFamily: "var(--font-outfit)" }}
            >
              {car.brand} {car.model}
            </h1>
            <p className="text-white/40 text-sm mt-1">Modèle {car.year}</p>
          </div>

          <div className="text-left lg:text-right">
            <div className="text-white/40 text-xs uppercase tracking-wider mb-1">À partir de</div>
            <div className="flex items-baseline gap-1">
              <span
                className="text-4xl font-black text-red-500"
                style={{ fontFamily: "var(--font-outfit)" }}
              >
                {price.toLocaleString("fr-MA")}
              </span>
              <span className="text-white/60 text-sm">MAD / jour</span>
            </div>
          </div>
        </div>

        {/* Gallery & Sidebar Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {/* Main Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Gallery Component */}
            <CarDetailGallery images={allImages} title={`${car.brand} ${car.model}`} />

            {/* Specifications Card */}
            <div className="glass border border-white/10 rounded-2xl p-6 md:p-8">
              <h2
                className="text-xl font-bold text-white mb-6"
                style={{ fontFamily: "var(--font-outfit)" }}
              >
                Caractéristiques Techniques
              </h2>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="p-4 rounded-xl bg-white/4 border border-white/6 flex items-center gap-3">
                  <Users size={22} className="text-red-500 shrink-0" />
                  <div>
                    <div className="text-white/40 text-xs">Capacité</div>
                    <div className="text-white font-semibold text-sm">{car.seats} places</div>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-white/4 border border-white/6 flex items-center gap-3">
                  <Fuel size={22} className="text-red-500 shrink-0" />
                  <div>
                    <div className="text-white/40 text-xs">Carburant</div>
                    <div className="text-white font-semibold text-sm">{car.fuelType}</div>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-white/4 border border-white/6 flex items-center gap-3">
                  <Settings size={22} className="text-red-500 shrink-0" />
                  <div>
                    <div className="text-white/40 text-xs">Transmission</div>
                    <div className="text-white font-semibold text-sm">{car.transmission}</div>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-white/4 border border-white/6 flex items-center gap-3">
                  <DoorClosed size={22} className="text-red-500 shrink-0" />
                  <div>
                    <div className="text-white/40 text-xs">Portes</div>
                    <div className="text-white font-semibold text-sm">{car.doors} portes</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Features & Description */}
            <div className="glass border border-white/10 rounded-2xl p-6 md:p-8 space-y-6">
              <div>
                <h2
                  className="text-xl font-bold text-white mb-4"
                  style={{ fontFamily: "var(--font-outfit)" }}
                >
                  Description
                </h2>
                <p className="text-white/70 text-sm leading-relaxed">
                  {car.description ||
                    `La ${car.brand} ${car.model} est idéale pour vos trajets en ville comme sur autoroute. Confortable, économique et parfaitement entretenue pour vous garantir un voyage en toute sérénité à ${car.location.name}.`}
                </p>
              </div>

              {features && features.length > 0 && (
                <div>
                  <h3 className="text-white font-bold text-base mb-4">Équipements Inclus</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {features.map((feat, i) => (
                      <div key={i} className="flex items-center gap-2 text-white/80 text-sm">
                        <ShieldCheck size={16} className="text-red-500 shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Included Rental Perks */}
            <div className="card-dark p-6">
              <h3 className="text-white font-bold text-sm uppercase tracking-wider mb-4">
                Inclus Gratuitement avec votre Location
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-white/60">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-red-500" />
                  <span>Kilométrage illimité</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-red-500" />
                  <span>Assurance Tous Risques de base</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-red-500" />
                  <span>Assistance 24/7 en cas de panne</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column / Booking Form */}
          <div className="lg:col-span-1">
            <div className="sticky top-28">
              <BookingWidget car={car as any} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
