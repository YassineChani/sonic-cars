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
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="divider-red" />
              <span className="text-red-500 text-sm font-semibold uppercase tracking-widest">
                Notre Flotte
              </span>
            </div>
            <h2
              className="text-4xl md:text-5xl font-black text-white"
              style={{ fontFamily: "var(--font-outfit)" }}
            >
              Véhicules <span className="text-red-500">Sélectionnés</span>
            </h2>
            <p className="text-white/50 mt-3 text-lg">
              Découvrez nos meilleurs véhicules disponibles à Oujda et Tanger
            </p>
          </div>
          <Link
            href="/voitures"
            className="btn-outline-red flex-shrink-0 self-start md:self-auto"
          >
            Voir toute la flotte
            <ArrowRight size={16} />
          </Link>
        </div>

        {/* Grid */}
        {cars.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
