"use client";

import { useState } from "react";
import Image from "next/image";
import { Plus, Edit, Trash2, MapPin, Search, Check, X } from "lucide-react";
import { toast } from "@/components/ui/Toaster";
import { CarWithDetails } from "@/types";
import { Location } from "@prisma/client";

interface AdminCarsClientProps {
  initialCars: CarWithDetails[];
  locations: Location[];
}

export function AdminCarsClient({ initialCars, locations }: AdminCarsClientProps) {
  const [cars, setCars] = useState<CarWithDetails[]>(initialCars);
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCar, setEditingCar] = useState<CarWithDetails | null>(null);

  // Form states
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState(new Date().getFullYear());
  const [category, setCategory] = useState("Citadine");
  const [transmission, setTransmission] = useState("Manuelle");
  const [fuelType, setFuelType] = useState("Diesel");
  const [seats, setSeats] = useState(5);
  const [doors, setDoors] = useState(5);
  const [dailyPrice, setDailyPrice] = useState(300);
  const [locationId, setLocationId] = useState(locations[0]?.id || "");
  const [mainImage, setMainImage] = useState("");
  const [featured, setFeatured] = useState(false);
  const [availability, setAvailability] = useState(true);
  const [description, setDescription] = useState("");

  const [loading, setLoading] = useState(false);

  function openCreateModal() {
    setEditingCar(null);
    setBrand("");
    setModel("");
    setYear(new Date().getFullYear());
    setCategory("Citadine");
    setTransmission("Manuelle");
    setFuelType("Diesel");
    setSeats(5);
    setDoors(5);
    setDailyPrice(300);
    setLocationId(locations[0]?.id || "");
    setMainImage("");
    setFeatured(false);
    setAvailability(true);
    setDescription("");
    setIsModalOpen(true);
  }

  function openEditModal(car: CarWithDetails) {
    setEditingCar(car);
    setBrand(car.brand);
    setModel(car.model);
    setYear(car.year);
    setTransmission(car.transmission);
    setFuelType(car.fuelType);
    setSeats(car.seats);
    setDoors(car.doors);
    setDailyPrice(Number(car.dailyPrice));
    setLocationId(car.locationId);
    setMainImage(car.mainImage || "");
    setFeatured(car.featured);
    setAvailability(car.availability);
    setDescription(car.description || "");
    setIsModalOpen(true);
  }

  async function handleDelete(id: string) {
    if (!confirm("Voulez-vous vraiment supprimer ce véhicule ?")) return;

    try {
      const res = await fetch(`/api/cars/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Erreur de suppression");

      setCars((prev) => prev.filter((c) => c.id !== id));
      toast("Véhicule supprimé avec succès", "success");
    } catch (err) {
      toast("Impossible de supprimer le véhicule", "error");
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    const payload = {
      brand,
      model,
      year: Number(year),
      category,
      transmission,
      fuelType,
      seats: Number(seats),
      doors: Number(doors),
      dailyPrice: Number(dailyPrice),
      locationId,
      mainImage: mainImage || undefined,
      featured,
      availability,
      description: description || undefined,
    };

    try {
      const url = editingCar ? `/api/cars/${editingCar.id}` : "/api/cars";
      const method = editingCar ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Erreur enregistrement");

      if (editingCar) {
        setCars((prev) => prev.map((c) => (c.id === data.id ? data : c)));
        toast("Véhicule mis à jour !", "success");
      } else {
        setCars((prev) => [data, ...prev]);
        toast("Nouveau véhicule ajouté !", "success");
      }

      setIsModalOpen(false);
    } catch (err: any) {
      toast(err.message || "Erreur lors de la sauvegarde", "error");
    } finally {
      setLoading(false);
    }
  }

  const filteredCars = cars.filter(
    (c) =>
      c.brand.toLowerCase().includes(search.toLowerCase()) ||
      c.model.toLowerCase().includes(search.toLowerCase()) ||
      c.location.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Top Header & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-white" style={{ fontFamily: "var(--font-outfit)" }}>
            Gestion de la <span className="text-red-500">Flotte</span>
          </h1>
          <p className="text-white/40 text-sm mt-1">{cars.length} véhicules enregistrés</p>
        </div>

        <button onClick={openCreateModal} className="btn-primary text-sm px-5 py-3">
          <Plus size={18} />
          Ajouter un Véhicule
        </button>
      </div>

      {/* Search Bar */}
      <div className="glass border border-white/10 rounded-2xl p-4">
        <div className="relative">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40 pointer-events-none" />
          <input
            type="text"
            placeholder="Rechercher par marque, modèle ou ville..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="input-dark pl-10 text-sm py-2.5"
          />
        </div>
      </div>

      {/* Cars Table */}
      <div className="glass border border-white/10 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-white/80">
            <thead className="bg-white/5 text-white/40 text-xs uppercase border-b border-white/10">
              <tr>
                <th className="p-4">Véhicule</th>
                <th className="p-4">Ville</th>
                <th className="p-4">Prix/j</th>
                <th className="p-4">Caractéristiques</th>
                <th className="p-4">Statut</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredCars.map((car) => (
                <tr key={car.id} className="hover:bg-white/5 transition-colors">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="relative w-14 h-10 rounded-lg overflow-hidden bg-white/5 shrink-0">
                        <Image
                          src={car.mainImage || "/placeholder-car.jpg"}
                          alt={car.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <div className="font-bold text-white">
                          {car.brand} {car.model}
                        </div>
                        <div className="text-white/40 text-xs">{car.year} · {car.transmission}</div>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-1.5 text-xs text-white/70">
                      <MapPin size={14} className="text-red-500" />
                      {car.location.name}
                    </div>
                  </td>
                  <td className="p-4 font-mono font-bold text-red-400">
                    {Number(car.dailyPrice)} MAD
                  </td>
                  <td className="p-4 text-xs text-white/60">
                    {car.transmission} · {car.fuelType} · {car.seats}p
                  </td>
                  <td className="p-4">
                    <span
                      className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                        car.availability
                          ? "bg-emerald-500/10 border border-emerald-500/20 text-emerald-400"
                          : "bg-red-500/10 border border-red-500/20 text-red-400"
                      }`}
                    >
                      {car.availability ? "Disponible" : "Indisponible"}
                    </span>
                  </td>
                  <td className="p-4 text-right space-x-2">
                    <button
                      onClick={() => openEditModal(car)}
                      className="p-2 inline-block text-white/60 hover:text-white rounded-lg hover:bg-white/10"
                    >
                      <Edit size={16} />
                    </button>
                    <button
                      onClick={() => handleDelete(car.id)}
                      className="p-2 inline-block text-red-400 hover:text-red-300 rounded-lg hover:bg-red-500/10"
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create/Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="glass border border-white/10 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 md:p-8 space-y-6">
            <div className="flex justify-between items-center border-b border-white/10 pb-4">
              <h2 className="text-xl font-bold text-white" style={{ fontFamily: "var(--font-outfit)" }}>
                {editingCar ? "Modifier le Véhicule" : "Ajouter un Véhicule"}
              </h2>
              <button onClick={() => setIsModalOpen(false)} className="text-white/50 hover:text-white">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-white/50 text-xs uppercase tracking-wider mb-1">Marque *</label>
                  <input
                    type="text"
                    placeholder="Renault"
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)}
                    className="input-dark text-sm py-2"
                    required
                  />
                </div>
                <div>
                  <label className="block text-white/50 text-xs uppercase tracking-wider mb-1">Modèle *</label>
                  <input
                    type="text"
                    placeholder="Clio 5"
                    value={model}
                    onChange={(e) => setModel(e.target.value)}
                    className="input-dark text-sm py-2"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-white/50 text-xs uppercase tracking-wider mb-1">Année *</label>
                  <input
                    type="number"
                    value={year}
                    onChange={(e) => setYear(Number(e.target.value))}
                    className="input-dark text-sm py-2"
                    required
                  />
                </div>
                <div>
                  <label className="block text-white/50 text-xs uppercase tracking-wider mb-1">Prix par jour (MAD) *</label>
                  <input
                    type="number"
                    value={dailyPrice}
                    onChange={(e) => setDailyPrice(Number(e.target.value))}
                    className="input-dark text-sm py-2"
                    required
                  />
                </div>
                <div>
                  <label className="block text-white/50 text-xs uppercase tracking-wider mb-1">Agence Ville *</label>
                  <select
                    value={locationId}
                    onChange={(e) => setLocationId(e.target.value)}
                    className="input-dark text-sm py-2"
                  >
                    {locations.map((loc) => (
                      <option key={loc.id} value={loc.id}>
                        {loc.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-white/50 text-xs uppercase tracking-wider mb-1">Catégorie</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="input-dark text-sm py-2"
                  >
                    <option value="Citadine">Citadine</option>
                    <option value="Berline">Berline</option>
                    <option value="SUV">SUV</option>
                    <option value="Utilitaire">Utilitaire</option>
                  </select>
                </div>
                <div>
                  <label className="block text-white/50 text-xs uppercase tracking-wider mb-1">Transmission</label>
                  <select
                    value={transmission}
                    onChange={(e) => setTransmission(e.target.value)}
                    className="input-dark text-sm py-2"
                  >
                    <option value="Manuelle">Manuelle</option>
                    <option value="Automatique">Automatique</option>
                  </select>
                </div>
                <div>
                  <label className="block text-white/50 text-xs uppercase tracking-wider mb-1">Carburant</label>
                  <select
                    value={fuelType}
                    onChange={(e) => setFuelType(e.target.value)}
                    className="input-dark text-sm py-2"
                  >
                    <option value="Diesel">Diesel</option>
                    <option value="Essence">Essence</option>
                    <option value="Hybride">Hybride</option>
                    <option value="Électrique">Électrique</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-white/50 text-xs uppercase tracking-wider mb-1">URL de l'image principale</label>
                <input
                  type="text"
                  placeholder="https://images.unsplash.com/..."
                  value={mainImage}
                  onChange={(e) => setMainImage(e.target.value)}
                  className="input-dark text-sm py-2"
                />
              </div>

              <div>
                <label className="block text-white/50 text-xs uppercase tracking-wider mb-1">Description</label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="input-dark text-sm py-2"
                />
              </div>

              <div className="flex gap-6 pt-2">
                <label className="flex items-center gap-2 text-sm text-white/80 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={availability}
                    onChange={(e) => setAvailability(e.target.checked)}
                    className="rounded bg-zinc-800 border-white/20 text-red-500"
                  />
                  Disponible à la location
                </label>

                <label className="flex items-center gap-2 text-sm text-white/80 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={featured}
                    onChange={(e) => setFeatured(e.target.checked)}
                    className="rounded bg-zinc-800 border-white/20 text-red-500"
                  />
                  Mettre en avant (Hero / Featured)
                </label>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="btn-secondary text-sm px-5 py-2.5"
                >
                  Annuler
                </button>
                <button type="submit" disabled={loading} className="btn-primary text-sm px-6 py-2.5">
                  {loading ? "Sauvegarde..." : "Enregistrer"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
