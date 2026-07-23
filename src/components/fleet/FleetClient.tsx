"use client";

import { useState, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { CarCard } from "@/components/cars/CarCard";
import { Filter, SlidersHorizontal, RotateCcw } from "lucide-react";
import { CarWithDetails } from "@/types";
import { Location } from "@prisma/client";

interface FleetClientProps {
  initialCars: CarWithDetails[];
  locations: Location[];
}

export function FleetClient({ initialCars, locations }: FleetClientProps) {
  const searchParams = useSearchParams();

  const [cityFilter, setCityFilter] = useState(searchParams.get("city") || "");
  const [categoryFilter, setCategoryFilter] = useState(searchParams.get("category") || "");
  const [transmissionFilter, setTransmissionFilter] = useState(searchParams.get("transmission") || "");
  const [fuelFilter, setFuelFilter] = useState(searchParams.get("fuel") || "");
  const [brandFilter, setBrandFilter] = useState(searchParams.get("brand") || "");
  const [sortBy, setSortBy] = useState("recommended");

  // Extract unique brands and categories
  const categories = useMemo(
    () => Array.from(new Set(initialCars.map((c) => c.brand))),
    [initialCars]
  );
  const brands = useMemo(
    () => Array.from(new Set(initialCars.map((c) => c.brand))),
    [initialCars]
  );

  // Filter logic
  const filteredCars = useMemo(() => {
    return initialCars.filter((car) => {
      if (cityFilter && car.location.slug !== cityFilter.toLowerCase() && car.location.name.toLowerCase() !== cityFilter.toLowerCase()) {
        return false;
      }
      if (transmissionFilter && car.transmission !== transmissionFilter) return false;
      if (fuelFilter && car.fuelType !== fuelFilter) return false;
      if (brandFilter && car.brand !== brandFilter) return false;
      return true;
    }).sort((a, b) => {
      if (sortBy === "price-asc") return Number(a.dailyPrice) - Number(b.dailyPrice);
      if (sortBy === "price-desc") return Number(b.dailyPrice) - Number(a.dailyPrice);
      return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
    });
  }, [initialCars, cityFilter, categoryFilter, transmissionFilter, fuelFilter, brandFilter, sortBy]);

  function resetFilters() {
    setCityFilter("");
    setCategoryFilter("");
    setTransmissionFilter("");
    setFuelFilter("");
    setBrandFilter("");
    setSortBy("recommended");
  }

  return (
    <div>
      {/* Filter Bar */}
      <div className="glass border border-white/10 rounded-2xl p-6 mb-8">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2 text-white font-bold">
            <SlidersHorizontal size={18} className="text-red-500" />
            Filtres de recherche
          </div>
          <button
            onClick={resetFilters}
            className="flex items-center gap-1 text-xs text-white/50 hover:text-red-400 transition-colors"
          >
            <RotateCcw size={14} />
            Réinitialiser
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {/* City */}
          <select
            value={cityFilter}
            onChange={(e) => setCityFilter(e.target.value)}
            className="input-dark text-sm py-2"
          >
            <option value="">Toutes les Villes</option>
            {locations.map((loc) => (
              <option key={loc.id} value={loc.slug}>
                {loc.name}
              </option>
            ))}
          </select>

          {/* Category */}
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="input-dark text-sm py-2"
          >
            <option value="">Toutes Catégories</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>

          {/* Brand */}
          <select
            value={brandFilter}
            onChange={(e) => setBrandFilter(e.target.value)}
            className="input-dark text-sm py-2"
          >
            <option value="">Toutes les Marques</option>
            {brands.map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          </select>

          {/* Transmission */}
          <select
            value={transmissionFilter}
            onChange={(e) => setTransmissionFilter(e.target.value)}
            className="input-dark text-sm py-2"
          >
            <option value="">Boîte de Vitesse</option>
            <option value="Manuelle">Manuelle</option>
            <option value="Automatique">Automatique</option>
          </select>

          {/* Fuel */}
          <select
            value={fuelFilter}
            onChange={(e) => setFuelFilter(e.target.value)}
            className="input-dark text-sm py-2"
          >
            <option value="">Carburant</option>
            <option value="Diesel">Diesel</option>
            <option value="Essence">Essence</option>
            <option value="Hybride">Hybride</option>
            <option value="Électrique">Électrique</option>
          </select>

          {/* Sort */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="input-dark text-sm py-2 border-red-500/30"
          >
            <option value="recommended">Recommandé</option>
            <option value="price-asc">Prix : Croissant</option>
            <option value="price-desc">Prix : Décroissant</option>
          </select>
        </div>
      </div>

      {/* Results Header */}
      <div className="flex items-center justify-between mb-6">
        <p className="text-white/50 text-sm">
          <span className="text-white font-bold">{filteredCars.length}</span> véhicule(s) trouvé(s)
        </p>
      </div>

      {/* Cars Grid */}
      {filteredCars.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCars.map((car) => (
            <CarCard key={car.id} car={car} />
          ))}
        </div>
      ) : (
        <div className="glass border border-white/10 rounded-2xl p-16 text-center">
          <Filter size={48} className="text-white/20 mx-auto mb-4" />
          <h3 className="text-white font-bold text-lg mb-2">Aucun véhicule correspondant</h3>
          <p className="text-white/40 text-sm mb-6 max-w-md mx-auto">
            Essayez de modifier vos critères de recherche ou réinitialisez les filtres.
          </p>
          <button onClick={resetFilters} className="btn-primary text-sm px-6 py-2.5">
            Réinitialiser les filtres
          </button>
        </div>
      )}
    </div>
  );
}
