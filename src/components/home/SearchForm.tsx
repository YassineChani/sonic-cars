"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { MapPin, Calendar, Search } from "lucide-react";

export function SearchForm() {
  const router = useRouter();
  const [form, setForm] = useState({
    city: "",
    pickupDate: "",
    returnDate: "",
  });

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    const params = new URLSearchParams();
    if (form.city) params.set("city", form.city);
    if (form.pickupDate) params.set("pickup", form.pickupDate);
    if (form.returnDate) params.set("return", form.returnDate);
    router.push(`/voitures?${params.toString()}`);
  }

  // Min date = today
  const today = new Date().toISOString().split("T")[0];

  return (
    <section className="relative z-20 -mt-12">
      <div className="container-custom">
        <div className="glass border border-white/10 rounded-2xl p-6 md:p-8 shadow-2xl">
          <div className="mb-5">
            <h2 className="text-white font-bold text-xl" style={{ fontFamily: "var(--font-outfit)" }}>
              Trouvez votre voiture
            </h2>
            <p className="text-white/40 text-sm mt-1">Recherchez parmi notre flotte disponible</p>
          </div>

          <form onSubmit={handleSearch}>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {/* City */}
              <div className="relative">
                <label className="block text-white/50 text-xs uppercase tracking-wider mb-2">
                  Ville
                </label>
                <div className="relative">
                  <MapPin size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-red-500 pointer-events-none" />
                  <select
                    value={form.city}
                    onChange={(e) => setForm({ ...form, city: e.target.value })}
                    className="input-dark pl-10 appearance-none cursor-pointer"
                  >
                    <option value="">Toutes les villes</option>
                    <option value="oujda">Oujda</option>
                    <option value="tanger">Tanger</option>
                  </select>
                </div>
              </div>

              {/* Pickup Date */}
              <div>
                <label className="block text-white/50 text-xs uppercase tracking-wider mb-2">
                  Date de départ
                </label>
                <div className="relative">
                  <Calendar size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-red-500 pointer-events-none" />
                  <input
                    type="date"
                    min={today}
                    value={form.pickupDate}
                    onChange={(e) => setForm({ ...form, pickupDate: e.target.value })}
                    className="input-dark pl-10 cursor-pointer"
                    style={{ colorScheme: "dark" }}
                  />
                </div>
              </div>

              {/* Return Date */}
              <div>
                <label className="block text-white/50 text-xs uppercase tracking-wider mb-2">
                  Date de retour
                </label>
                <div className="relative">
                  <Calendar size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-red-500 pointer-events-none" />
                  <input
                    type="date"
                    min={form.pickupDate || today}
                    value={form.returnDate}
                    onChange={(e) => setForm({ ...form, returnDate: e.target.value })}
                    className="input-dark pl-10 cursor-pointer"
                    style={{ colorScheme: "dark" }}
                  />
                </div>
              </div>

              {/* Search Button */}
              <div className="flex items-end">
                <button type="submit" className="btn-primary w-full h-12 text-base">
                  <Search size={18} />
                  Rechercher
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
