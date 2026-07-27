"use client";

import { useState, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { CarCard } from "@/components/cars/CarCard";
import { Filter, SlidersHorizontal, RotateCcw, Car } from "lucide-react";
import { CarWithDetails } from "@/types";
import { Location } from "@prisma/client";

interface FleetClientProps {
  initialCars: CarWithDetails[];
  locations: Location[];
}

const FEATURED_MODELS = [
  { label: "Toute la Flotte", value: "" },
  { label: "Clio 5", value: "Clio 5" },
  { label: "Peugeot 208", value: "208" },
  { label: "Dacia", value: "Dacia" },
  { label: "T-Roc Sport", value: "T-Roc" },
  { label: "Seat Leon FR", value: "Leon" },
  { label: "Peugeot 308", value: "308" },
];

export function FleetClient({ initialCars, locations }: FleetClientProps) {
  const searchParams = useSearchParams();

  const [modelTab, setModelTab] = useState("");
  const [cityFilter, setCityFilter] = useState(searchParams.get("city") || "");
  const [transmissionFilter, setTransmissionFilter] = useState(searchParams.get("transmission") || "");
  const [fuelFilter, setFuelFilter] = useState(searchParams.get("fuel") || "");

  // Filter logic
  const filteredCars = useMemo(() => {
    return initialCars.filter((car) => {
      // Model tab filter
      if (modelTab) {
        const query = modelTab.toLowerCase();
        const matchesModel = car.model.toLowerCase().includes(query) || car.brand.toLowerCase().includes(query) || car.title.toLowerCase().includes(query);
        if (!matchesModel) return false;
      }

      // City filter
      if (cityFilter && car.location.slug !== cityFilter.toLowerCase() && car.location.name.toLowerCase() !== cityFilter.toLowerCase()) {
        return false;
      }

      // Transmission
      if (transmissionFilter && car.transmission !== transmissionFilter) return false;

      // Fuel
      if (fuelFilter && car.fuelType !== fuelFilter) return false;

      return true;
    });
  }, [initialCars, modelTab, cityFilter, transmissionFilter, fuelFilter]);

  function resetFilters() {
    setModelTab("");
    setCityFilter("");
    setTransmissionFilter("");
    setFuelFilter("");
  }

  return (
    <div className="space-y-8">

      {/* Model Quick Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {FEATURED_MODELS.map((tab) => {
          const isActive = modelTab === tab.value;
          return (
            <button
              key={tab.label}
              onClick={() => setModelTab(tab.value)}
              className={`px-5 py-2.5 rounded-xl font-bold text-sm whitespace-nowrap transition-all flex items-center gap-2 ${
                isActive
                  ? "bg-red-500 text-white shadow-lg shadow-red-500/30 border border-red-400"
                  : "glass border border-white/10 text-white/70 hover:text-white hover:border-white/30"
              }`}
            >
              <Car size={16} className={isActive ? "text-white" : "text-red-500"} />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Secondary Filter Bar */}
      <div className="glass border border-white/10 rounded-2xl p-5">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2 text-white font-bold text-sm">
            <SlidersHorizontal size={16} className="text-red-500" />
            Filtres additionnels
          </div>
          <button
            onClick={resetFilters}
            className="flex items-center gap-1 text-xs text-white/50 hover:text-red-400 transition-colors"
          >
            <RotateCcw size={14} />
            Réinitialiser
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {/* City */}
          <select
            value={cityFilter}
            onChange={(e) => setCityFilter(e.target.value)}
            className="input-dark text-sm py-2.5"
          >
            <option value="">Toutes les Villes (Oujda & Tanger)</option>
            {locations.map((loc) => (
              <option key={loc.id} value={loc.slug}>
                {loc.name}
              </option>
            ))}
          </select>

          {/* Transmission */}
          <select
            value={transmissionFilter}
            onChange={(e) => setTransmissionFilter(e.target.value)}
            className="input-dark text-sm py-2.5"
          >
            <option value="">Toutes les Boîtes de Vitesse</option>
            <option value="Manuelle">Manuelle</option>
            <option value="Automatique">Automatique</option>
          </select>

          {/* Fuel */}
          <select
            value={fuelFilter}
            onChange={(e) => setFuelFilter(e.target.value)}
            className="input-dark text-sm py-2.5"
          >
            <option value="">Tous les Carburants</option>
            <option value="Diesel">Diesel</option>
            <option value="Essence">Essence</option>
          </select>
        </div>
      </div>

      {/* Results Header */}
      <div className="flex items-center justify-between">
        <p className="text-white/60 text-sm">
          Affichage de <span className="text-white font-bold">{filteredCars.length}</span> véhicule(s) dans le catalogue
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
        <div className="glass border border-white/10 rounded-2xl p-12 text-center space-y-4">
          <Filter size={44} className="text-white/20 mx-auto" />
          <h3 className="text-white font-bold text-lg">Aucun véhicule trouvé</h3>
          <p className="text-white/40 text-sm max-w-md mx-auto">
            Aucun modèle ne correspond à vos critères actuels.
          </p>
          <button onClick={resetFilters} className="btn-primary text-sm px-6 py-2.5 mx-auto">
            Réinitialiser les filtres
          </button>
        </div>
      )}
    </div>
  );
}
