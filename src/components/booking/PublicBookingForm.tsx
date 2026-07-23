"use client";

import { useState, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { Calendar, MapPin, Check, ArrowRight, Shield, Car as CarIcon } from "lucide-react";
import { calculateDays, buildWhatsAppUrl } from "@/lib/utils";
import { toast } from "@/components/ui/Toaster";
import { CarWithDetails } from "@/types";
import { Location } from "@prisma/client";

interface PublicBookingFormProps {
  cars: CarWithDetails[];
  locations: Location[];
}

export function PublicBookingForm({ cars, locations }: PublicBookingFormProps) {
  const searchParams = useSearchParams();
  const today = new Date().toISOString().split("T")[0];

  const initialCarId = searchParams.get("carId") || (cars[0]?.id || "");
  const initialCity = searchParams.get("city") || "";

  const [selectedCarId, setSelectedCarId] = useState(initialCarId);
  const [pickupCity, setPickupCity] = useState(initialCity || locations[0]?.name || "Oujda");
  const [returnCity, setReturnCity] = useState(initialCity || locations[0]?.name || "Oujda");
  const [pickupDate, setPickupDate] = useState(searchParams.get("pickup") || "");
  const [returnDate, setReturnDate] = useState(searchParams.get("return") || "");
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [notes, setNotes] = useState("");

  const [loading, setLoading] = useState(false);
  const [successBooking, setSuccessBooking] = useState<any>(null);

  const selectedCar = useMemo(() => cars.find((c) => c.id === selectedCarId), [cars, selectedCarId]);

  const days = useMemo(() => {
    if (!pickupDate || !returnDate) return 0;
    return calculateDays(pickupDate, returnDate);
  }, [pickupDate, returnDate]);

  const totalPrice = selectedCar && days > 0 ? days * Number(selectedCar.dailyPrice) : 0;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!selectedCarId) {
      toast("Veuillez sélectionner un véhicule", "error");
      return;
    }
    if (!pickupDate || !returnDate) {
      toast("Veuillez sélectionner les dates", "error");
      return;
    }
    if (days <= 0) {
      toast("La date de retour doit être après la date de départ", "error");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          carId: selectedCarId,
          fullName: customerName,
          phone: customerPhone,
          email: customerEmail || undefined,
          pickupCity,
          returnCity,
          pickupDate,
          returnDate,
          message: notes || undefined,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Erreur lors de la réservation");
      }

      setSuccessBooking(data);
      toast("Votre demande a été soumise avec succès !", "success");
    } catch (err: any) {
      toast(err.message || "Erreur lors de la soumission", "error");
    } finally {
      setLoading(false);
    }
  }

  if (successBooking) {
    const waMsg = `Bonjour SONIC CARS, je confirme ma réservation #${successBooking.bookingRef} pour la ${selectedCar?.brand} ${selectedCar?.model} du ${pickupDate} au ${returnDate}. Nom: ${customerName}.`;
    const waUrl = buildWhatsAppUrl("+212600000000", waMsg);

    return (
      <div className="glass border border-emerald-500/30 rounded-2xl p-8 text-center space-y-6 max-w-lg mx-auto">
        <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
          <Check size={32} />
        </div>
        <h2 className="text-2xl font-bold text-white" style={{ fontFamily: "var(--font-outfit)" }}>
          Demande Enregistrée avec Succès !
        </h2>
        <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-left space-y-2">
          <div className="flex justify-between text-xs text-white/50">
            <span>Référence :</span>
            <span className="font-mono text-red-400 font-bold">{successBooking.bookingRef}</span>
          </div>
          <div className="flex justify-between text-xs text-white/50">
            <span>Véhicule :</span>
            <span className="text-white font-medium">{selectedCar?.brand} {selectedCar?.model}</span>
          </div>
          <div className="flex justify-between text-xs text-white/50">
            <span>Période :</span>
            <span className="text-white">{pickupDate} au {returnDate}</span>
          </div>
          <div className="flex justify-between text-xs text-white/50">
            <span>Ville Prise en Charge :</span>
            <span className="text-white">{pickupCity}</span>
          </div>
        </div>

        <p className="text-white/60 text-sm">
          Notre équipe commerciale va vous contacter très rapidement pour confirmer les détails.
        </p>

        <div className="space-y-3 pt-2">
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary w-full bg-emerald-600 hover:bg-emerald-500 justify-center text-sm py-3"
          >
            Confirmer sur WhatsApp
          </a>
          <button
            onClick={() => setSuccessBooking(null)}
            className="btn-secondary w-full justify-center text-xs py-2.5"
          >
            Faire une autre demande
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="glass border border-white/10 rounded-2xl p-6 md:p-8 space-y-8">
      {/* 1. Vehicle Selection */}
      <div>
        <h3 className="text-white font-bold text-lg mb-4 flex items-center gap-2" style={{ fontFamily: "var(--font-outfit)" }}>
          <CarIcon size={20} className="text-red-500" />
          1. Sélectionnez un Véhicule
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {cars.map((car) => {
            const isSelected = car.id === selectedCarId;
            return (
              <div
                key={car.id}
                onClick={() => setSelectedCarId(car.id)}
                className={`p-4 rounded-xl border cursor-pointer transition-all ${
                  isSelected
                    ? "border-red-500 bg-red-500/10 shadow-lg"
                    : "border-white/10 bg-white/4 hover:border-white/30"
                }`}
              >
                <div className="flex justify-between items-start mb-2">
                  <span className="text-white font-bold text-sm">{car.brand} {car.model}</span>
                  <span className="text-red-400 font-bold text-xs">{car.dailyPrice} MAD/j</span>
                </div>
                <div className="text-white/40 text-xs flex justify-between">
                  <span>{car.transmission}</span>
                  <span>{car.location.name}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 2. Dates & Locations */}
      <div className="border-t border-white/10 pt-6">
        <h3 className="text-white font-bold text-lg mb-4 flex items-center gap-2" style={{ fontFamily: "var(--font-outfit)" }}>
          <Calendar size={20} className="text-red-500" />
          2. Dates et Villes
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-white/50 text-xs uppercase tracking-wider mb-2">
              Date de Prise en Charge *
            </label>
            <input
              type="date"
              min={today}
              value={pickupDate}
              onChange={(e) => setPickupDate(e.target.value)}
              className="input-dark cursor-pointer text-sm"
              style={{ colorScheme: "dark" }}
              required
            />
          </div>

          <div>
            <label className="block text-white/50 text-xs uppercase tracking-wider mb-2">
              Date de Restitution *
            </label>
            <input
              type="date"
              min={pickupDate || today}
              value={returnDate}
              onChange={(e) => setReturnDate(e.target.value)}
              className="input-dark cursor-pointer text-sm"
              style={{ colorScheme: "dark" }}
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-white/50 text-xs uppercase tracking-wider mb-2">
              Ville de Départ *
            </label>
            <select
              value={pickupCity}
              onChange={(e) => setPickupCity(e.target.value)}
              className="input-dark text-sm"
            >
              {locations.map((loc) => (
                <option key={loc.id} value={loc.name}>
                  {loc.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-white/50 text-xs uppercase tracking-wider mb-2">
              Ville de Retour *
            </label>
            <select
              value={returnCity}
              onChange={(e) => setReturnCity(e.target.value)}
              className="input-dark text-sm"
            >
              {locations.map((loc) => (
                <option key={loc.id} value={loc.name}>
                  {loc.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* 3. Personal Details */}
      <div className="border-t border-white/10 pt-6">
        <h3 className="text-white font-bold text-lg mb-4 flex items-center gap-2" style={{ fontFamily: "var(--font-outfit)" }}>
          <MapPin size={20} className="text-red-500" />
          3. Vos Coordonnées
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-white/50 text-xs uppercase tracking-wider mb-2">
              Nom complet *
            </label>
            <input
              type="text"
              placeholder="ex: Mohamed Alami"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              className="input-dark text-sm"
              required
            />
          </div>

          <div>
            <label className="block text-white/50 text-xs uppercase tracking-wider mb-2">
              Téléphone (WhatsApp) *
            </label>
            <input
              type="tel"
              placeholder="ex: +212 6 00 00 00 00"
              value={customerPhone}
              onChange={(e) => setCustomerPhone(e.target.value)}
              className="input-dark text-sm"
              required
            />
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-white/50 text-xs uppercase tracking-wider mb-2">
            Email (optionnel)
          </label>
          <input
            type="email"
            placeholder="votre.email@domaine.com"
            value={customerEmail}
            onChange={(e) => setCustomerEmail(e.target.value)}
            className="input-dark text-sm"
          />
        </div>

        <div>
          <label className="block text-white/50 text-xs uppercase tracking-wider mb-2">
            Remarques / Demandes particulières (optionnel)
          </label>
          <textarea
            rows={3}
            placeholder="ex: Livraison souhaitée à l'aéroport d'Oujda..."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="input-dark text-sm"
          />
        </div>
      </div>

      {/* Pricing summary */}
      {selectedCar && days > 0 && (
        <div className="bg-white/5 border border-white/10 rounded-xl p-4 flex justify-between items-center">
          <div>
            <div className="text-white font-bold">{selectedCar.brand} {selectedCar.model}</div>
            <div className="text-white/40 text-xs">{days} jour(s) × {selectedCar.dailyPrice} MAD</div>
          </div>
          <div className="text-right">
            <div className="text-white/40 text-xs uppercase">Estimation</div>
            <div className="text-red-500 font-black text-2xl" style={{ fontFamily: "var(--font-outfit)" }}>
              {totalPrice.toLocaleString("fr-MA")} MAD
            </div>
          </div>
        </div>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        disabled={loading}
        className="btn-primary w-full justify-center text-base py-4"
      >
        {loading ? (
          <span className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
        ) : (
          <>
            Envoyer la Demande de Réservation
            <ArrowRight size={18} />
          </>
        )}
      </button>

      <p className="text-white/30 text-xs text-center flex items-center justify-center gap-1">
        <Shield size={14} className="text-red-500" />
        Service sans frais cachés · Confirmation sous 30 minutes
      </p>
    </form>
  );
}
