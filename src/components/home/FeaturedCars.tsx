import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { CarCard } from "@/components/cars/CarCard";
import { CarWithDetails } from "@/types";

interface FeaturedCarsProps {
  cars: CarWithDetails[];
}

export function FeaturedCars({ cars }: FeaturedCarsProps) {
  return (
    <section className="section-padding">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20 md:mb-24">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="divider-red" />
            <span className="text-red-500 text-sm font-semibold uppercase tracking-widest">
              Notre Flotte
            </span>
            <div className="divider-red" />
          </div>
          <h2
            className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 leading-tight"
            style={{ fontFamily: "var(--font-outfit)" }}
          >
            Véhicules <span className="text-red-500">Sélectionnés</span>
          </h2>
          <p className="text-white/60 text-lg md:text-xl leading-relaxed mb-10 max-w-2xl mx-auto font-light">
            Découvrez nos meilleurs véhicules disponibles à Oujda et Tanger.
          </p>
          <div className="flex justify-center">
            <Link
              href="/voitures"
              className="btn-outline-red"
            >
              Voir toute la flotte
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>

        {/* Grid */}
        {cars.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {cars.map((car) => (
              <CarCard key={car.id} car={car as any} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 text-white/30">
            <p>Aucun véhicule disponible pour le moment.</p>
          </div>
        )}
      </div>
    </section>
  );
}
