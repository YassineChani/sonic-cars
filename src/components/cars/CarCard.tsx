import Link from "next/link";
import Image from "next/image";
import { MapPin, Fuel, Users, Settings, ArrowRight, Star } from "lucide-react";
import { CarWithDetails } from "@/types";

interface CarCardProps {
  car: CarWithDetails;
}

export function CarCard({ car }: CarCardProps) {
  const price = Number(car.dailyPrice);
  const imageUrl = car.mainImage || "/placeholder-car.jpg";

  return (
    <div className="card-dark group overflow-hidden">
      {/* Image */}
      <div className="relative h-52 overflow-hidden">
        <Image
          src={imageUrl}
          alt={car.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex gap-2">
          {car.featured && (
            <span className="badge-red text-xs">
              <Star size={10} className="mr-1" />
              Featured
            </span>
          )}
          {!car.availability && (
            <span className="badge-gray text-xs">Indisponible</span>
          )}
        </div>

        {/* City badge */}
        <div className="absolute bottom-3 left-3 flex items-center gap-1.5">
          <MapPin size={12} className="text-red-400" />
          <span className="text-white/80 text-xs font-medium">{car.location.name}</span>
        </div>

        {/* Price overlay */}
        <div className="absolute bottom-3 right-3">
          <div className="text-right">
            <span className="text-red-400 font-black text-lg" style={{ fontFamily: "var(--font-outfit)" }}>
              {price.toLocaleString("fr-MA")}
            </span>
            <span className="text-white/50 text-xs ml-1">MAD/j</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Title */}
        <h3
          className="text-white font-bold text-lg mb-1 group-hover:text-red-400 transition-colors line-clamp-1"
          style={{ fontFamily: "var(--font-outfit)" }}
        >
          {car.brand} {car.model}
        </h3>
        <p className="text-white/40 text-xs mb-4">{car.year} · {car.transmission}</p>

        {/* Specs */}
        <div className="grid grid-cols-3 gap-3 mb-5">
          <div className="flex flex-col items-center gap-1 p-2.5 rounded-lg bg-white/4 border border-white/6">
            <Users size={14} className="text-red-500" />
            <span className="text-white text-xs font-medium">{car.seats}</span>
            <span className="text-white/30 text-xs">Places</span>
          </div>
          <div className="flex flex-col items-center gap-1 p-2.5 rounded-lg bg-white/4 border border-white/6">
            <Fuel size={14} className="text-red-500" />
            <span className="text-white text-xs font-medium truncate w-full text-center">{car.fuelType.slice(0,4)}</span>
            <span className="text-white/30 text-xs">Carburant</span>
          </div>
          <div className="flex flex-col items-center gap-1 p-2.5 rounded-lg bg-white/4 border border-white/6">
            <Settings size={14} className="text-red-500" />
            <span className="text-white text-xs font-medium">{car.transmission === "Automatique" ? "Auto" : "Man."}</span>
            <span className="text-white/30 text-xs">Boîte</span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <Link
            href={`/voitures/${car.slug}`}
            className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg border border-white/15 text-white/70 hover:text-white hover:border-white/30 text-sm font-medium transition-all"
          >
            Détails
          </Link>
          <Link
            href={`/reservation?carId=${car.id}`}
            className={`flex-1 btn-primary text-sm py-2.5 justify-center ${!car.availability ? "opacity-50 pointer-events-none" : ""}`}
          >
            Réserver
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </div>
  );
}
