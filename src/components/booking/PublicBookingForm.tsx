"use client";

import { useState, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import { Calendar, Clock, MapPin, Check, ArrowRight, Shield, Car as CarIcon, User, Mail, Phone, MessageSquare, AlertCircle } from "lucide-react";
import { calculateDays, buildWhatsAppUrl } from "@/lib/utils";
import { toast } from "@/components/ui/Toaster";
import { CarWithDetails } from "@/types";
import { Location } from "@prisma/client";
import { MOROCCAN_CITIES } from "@/lib/constants";

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
  const [pickupTime, setPickupTime] = useState("09:00");
  const [returnDate, setReturnDate] = useState(searchParams.get("return") || "");
  const [returnTime, setReturnTime] = useState("09:00");
  
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [driverAge, setDriverAge] = useState("");
  const [notes, setNotes] = useState("");

  const [loading, setLoading] = useState(false);
  const [successBooking, setSuccessBooking] = useState<any>(null);

  const selectedCar = useMemo(() => cars.find((c) => c.id === selectedCarId), [cars, selectedCarId]);

  const days = useMemo(() => {
    if (!pickupDate || !returnDate) return 0;
    return calculateDays(pickupDate, returnDate);
  }, [pickupDate, returnDate]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!selectedCarId) {
      toast("Veuillez sélectionner un véhicule", "error");
      return;
    }
    if (!pickupDate || !returnDate) {
      toast("Veuillez sélectionner les dates de réservation", "error");
      return;
    }
    if (days <= 0) {
      toast("La date de retour doit être postérieure à la date de départ", "error");
      return;
    }
    if (!customerName || !customerPhone) {
      toast("Veuillez saisir votre nom et votre numéro de téléphone", "error");
      return;
    }

    setLoading(true);

    try {
      const fullNotes = `[Heure départ: ${pickupTime}] [Heure retour: ${returnTime}] ${driverAge ? `[Âge conducteur: ${driverAge} ans]` : ''} ${notes ? `[Message: ${notes}]` : ''}`;
      
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          carId: selectedCarId,
          fullName: customerName,
          phone: customerPhone,
          email: customerEmail || undefined,
          pickupCity,
          returnCity: returnCity || pickupCity,
          pickupDate,
          returnDate,
          message: fullNotes,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Erreur lors de la réservation");
      }

      setSuccessBooking(data);
      toast("Votre demande de réservation a été soumise avec succès !", "success");
    } catch (err: any) {
      toast(err.message || "Erreur lors de la soumission", "error");
    } finally {
      setLoading(false);
    }
  }

  if (successBooking) {
    const waMsg = `Bonjour SONIC CARS, je confirme ma réservation pour la ${selectedCar?.brand} ${selectedCar?.model} du ${pickupDate} à ${pickupTime} au ${returnDate} à ${returnTime}. Nom: ${customerName}, Tél: ${customerPhone}.`;
    const waUrl = buildWhatsAppUrl("+212661382653", waMsg);

    return (
      <div className="glass border border-emerald-500/30 rounded-2xl p-8 text-center space-y-6 max-w-lg mx-auto">
        {/* Success Icon */}
        <div className="w-20 h-20 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto ring-4 ring-emerald-500/20">
          <Check size={40} />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-white mb-1" style={{ fontFamily: "var(--font-outfit)" }}>
            ✅ Réservation Enregistrée !
          </h2>
          <p className="text-emerald-400 text-sm font-semibold">Référence : {successBooking.bookingRef}</p>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-xl p-5 text-left space-y-2">
          {selectedCar && (
            <div className="flex items-center gap-3 pb-3 border-b border-white/10 mb-3">
              <div className="relative w-16 h-12 rounded-lg overflow-hidden bg-zinc-800 flex-shrink-0">
                <Image src={selectedCar.mainImage || "/placeholder-car.jpg"} alt={selectedCar.title} fill className="object-cover" />
              </div>
              <div>
                <h4 className="text-white font-bold text-sm">{selectedCar.brand} {selectedCar.model}</h4>
                <p className="text-white/40 text-xs">{selectedCar.year} · {selectedCar.transmission}</p>
              </div>
            </div>
          )}
          <div className="flex justify-between text-xs text-white/60">
            <span>Départ :</span>
            <span className="text-white font-medium">{pickupCity} — {pickupDate} à {pickupTime}</span>
          </div>
          <div className="flex justify-between text-xs text-white/60">
            <span>Retour :</span>
            <span className="text-white font-medium">{returnCity || pickupCity} — {returnDate} à {returnTime}</span>
          </div>
          <div className="flex justify-between text-xs text-white/60">
            <span>Client :</span>
            <span className="text-white font-medium">{customerName} ({customerPhone})</span>
          </div>
        </div>

        <p className="text-white/60 text-sm">
          Notre équipe va vérifier la disponibilité et vous recontacter par téléphone / WhatsApp sous <strong className="text-white">30 minutes</strong>.
        </p>

        <div className="space-y-3 pt-2">
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary w-full bg-emerald-600 hover:bg-emerald-500 justify-center text-sm py-3 font-bold"
          >
            Confirmer sur WhatsApp
          </a>
          <a
            href="/admin/bookings"
            className="flex items-center justify-center gap-2 w-full py-3 rounded-xl border border-red-500/40 bg-red-500/10 text-red-400 hover:bg-red-500/20 text-sm font-semibold transition-all"
          >
            🔐 Voir dans l'Espace Admin
          </a>
          <button
            onClick={() => setSuccessBooking(null)}
            className="btn-secondary w-full justify-center text-xs py-2.5"
          >
            Faire une autre réservation
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="glass border border-white/10 rounded-2xl p-6 md:p-8 space-y-8 max-w-4xl mx-auto shadow-2xl">
      
      {/* 1. Sélection de Voiture (Nom + Image) */}
      <div>
        <h3 className="text-white font-bold text-lg mb-4 flex items-center gap-2" style={{ fontFamily: "var(--font-outfit)" }}>
          <CarIcon size={20} className="text-red-500" />
          1. 🚗 Voiture sélectionnée
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {cars.map((car) => {
            const isSelected = car.id === selectedCarId;
            return (
              <div
                key={car.id}
                onClick={() => setSelectedCarId(car.id)}
                className={`p-3 rounded-xl border cursor-pointer transition-all flex items-center gap-3 ${
                  isSelected
                    ? "border-red-500 bg-red-500/10 shadow-lg ring-1 ring-red-500/50"
                    : "border-white/10 bg-white/4 hover:border-white/30"
                }`}
              >
                <div className="relative w-20 h-16 rounded-lg overflow-hidden bg-zinc-800 flex-shrink-0">
                  <Image
                    src={car.mainImage || "/placeholder-car.jpg"}
                    alt={car.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-white font-bold text-sm truncate">{car.brand} {car.model}</h4>
                  <p className="text-white/40 text-xs truncate">{car.year} · {car.transmission}</p>
                  <span className="inline-block mt-1 text-[10px] text-emerald-400 font-semibold px-1.5 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20">
                    Disponible
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected Car Display Banner */}
        {selectedCar && (
          <div className="mt-4 p-4 rounded-xl bg-gradient-to-r from-red-500/10 via-zinc-900 to-zinc-900 border border-red-500/30 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="relative w-24 h-16 rounded-lg overflow-hidden bg-zinc-800 border border-white/10">
                <Image src={selectedCar.mainImage || "/placeholder-car.jpg"} alt={selectedCar.title} fill className="object-cover" />
              </div>
              <div>
                <div className="text-xs text-red-400 font-semibold uppercase tracking-wider">Véhicule Choisi</div>
                <div className="text-white font-black text-lg">{selectedCar.brand} {selectedCar.model} ({selectedCar.year})</div>
                <div className="text-white/50 text-xs">{selectedCar.transmission} · {selectedCar.fuelType} · {selectedCar.seats} Places</div>
              </div>
            </div>
            <Check size={24} className="text-emerald-400 hidden sm:block" />
          </div>
        )}
      </div>

      {/* 2. Dates et Heures et Lieux */}
      <div className="border-t border-white/10 pt-6 space-y-5">
        <h3 className="text-white font-bold text-lg flex items-center gap-2" style={{ fontFamily: "var(--font-outfit)" }}>
          <Calendar size={20} className="text-red-500" />
          2. 📍 Lieux & Dates de Location
        </h3>

        {/* Lieux */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-white/70 text-xs font-semibold uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <MapPin size={14} className="text-red-500" />
              Lieu de prise en charge *
            </label>
            <select
              value={pickupCity}
              onChange={(e) => setPickupCity(e.target.value)}
              className="input-dark text-sm py-3 bg-zinc-900 text-white"
              style={{ colorScheme: "dark" }}
              required
            >
              {MOROCCAN_CITIES.map((city) => (
                <option key={city} value={city} className="bg-zinc-900 text-white py-1">
                  {city}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-white/70 text-xs font-semibold uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <MapPin size={14} className="text-white/40" />
              Lieu de retour (optionnel)
            </label>
            <select
              value={returnCity}
              onChange={(e) => setReturnCity(e.target.value)}
              className="input-dark text-sm py-3 bg-zinc-900 text-white"
              style={{ colorScheme: "dark" }}
            >
              <option value="" className="bg-zinc-900 text-white">Même lieu que le départ</option>
              {MOROCCAN_CITIES.map((city) => (
                <option key={city} value={city} className="bg-zinc-900 text-white py-1">
                  {city}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Départ: Date & Heure */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="grid grid-cols-3 gap-2">
            <div className="col-span-2">
              <label className="block text-white/70 text-xs font-semibold uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Calendar size={14} className="text-red-500" />
                Date de départ *
              </label>
              <input
                type="date"
                min={today}
                value={pickupDate}
                onChange={(e) => setPickupDate(e.target.value)}
                className="input-dark text-sm py-3 cursor-pointer"
                style={{ colorScheme: "dark" }}
                required
              />
            </div>
            <div>
              <label className="block text-white/70 text-xs font-semibold uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Clock size={14} className="text-red-500" />
                Heure *
              </label>
              <input
                type="time"
                value={pickupTime}
                onChange={(e) => setPickupTime(e.target.value)}
                className="input-dark text-sm py-3 cursor-pointer"
                style={{ colorScheme: "dark" }}
                required
              />
            </div>
          </div>

          {/* Retour: Date & Heure */}
          <div className="grid grid-cols-3 gap-2">
            <div className="col-span-2">
              <label className="block text-white/70 text-xs font-semibold uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Calendar size={14} className="text-red-500" />
                Date de retour *
              </label>
              <input
                type="date"
                min={pickupDate || today}
                value={returnDate}
                onChange={(e) => setReturnDate(e.target.value)}
                className="input-dark text-sm py-3 cursor-pointer"
                style={{ colorScheme: "dark" }}
                required
              />
            </div>
            <div>
              <label className="block text-white/70 text-xs font-semibold uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Clock size={14} className="text-red-500" />
                Heure *
              </label>
              <input
                type="time"
                value={returnTime}
                onChange={(e) => setReturnTime(e.target.value)}
                className="input-dark text-sm py-3 cursor-pointer"
                style={{ colorScheme: "dark" }}
                required
              />
            </div>
          </div>
        </div>
      </div>

      {/* 3. Coordonnées & Informations personnelles */}
      <div className="border-t border-white/10 pt-6 space-y-4">
        <h3 className="text-white font-bold text-lg flex items-center gap-2" style={{ fontFamily: "var(--font-outfit)" }}>
          <User size={20} className="text-red-500" />
          3. 👤 Coordonnées du Conducteur
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-white/70 text-xs font-semibold uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <User size={14} className="text-red-500" />
              Nom complet *
            </label>
            <input
              type="text"
              placeholder="ex: Youssef Benjelloun"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              className="input-dark text-sm py-3"
              required
            />
          </div>

          <div>
            <label className="block text-white/70 text-xs font-semibold uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Phone size={14} className="text-red-500" />
              Téléphone (WhatsApp) *
            </label>
            <input
              type="tel"
              placeholder="ex: +212 6 12 34 56 78"
              value={customerPhone}
              onChange={(e) => setCustomerPhone(e.target.value)}
              className="input-dark text-sm py-3"
              required
            />
          </div>

          <div>
            <label className="block text-white/70 text-xs font-semibold uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Mail size={14} className="text-white/40" />
              Email
            </label>
            <input
              type="email"
              placeholder="votre@email.com"
              value={customerEmail}
              onChange={(e) => setCustomerEmail(e.target.value)}
              className="input-dark text-sm py-3"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-white/70 text-xs font-semibold uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <CarIcon size={14} className="text-white/40" />
              Âge du conducteur (optionnel)
            </label>
            <input
              type="number"
              min="18"
              max="90"
              placeholder="ex: 28"
              value={driverAge}
              onChange={(e) => setDriverAge(e.target.value)}
              className="input-dark text-sm py-3"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-white/70 text-xs font-semibold uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <MessageSquare size={14} className="text-white/40" />
              Message / Demandes spéciales (optionnel)
            </label>
            <input
              type="text"
              placeholder="ex: Siège bébé, livraison à l'hôtel..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="input-dark text-sm py-3"
            />
          </div>
        </div>
      </div>

      {/* Résumé de durée */}
      {days > 0 && (
        <div className="bg-white/5 border border-white/10 rounded-xl p-4 flex flex-col sm:flex-row justify-between items-center gap-3">
          <div className="flex items-center gap-3">
            <Calendar className="text-red-500" size={20} />
            <div>
              <div className="text-white font-bold text-sm">Durée totale : {days} Jour(s)</div>
              <div className="text-white/40 text-xs">Du {pickupDate} ({pickupTime}) au {returnDate} ({returnTime})</div>
            </div>
          </div>
          <span className="px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-semibold text-xs flex items-center gap-1">
            <Shield size={13} />
            Assurance & Kilométrage Illimité Inclus
          </span>
        </div>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        disabled={loading}
        className="btn-primary w-full justify-center text-base py-4 font-bold shadow-xl hover:shadow-red-500/20"
      >
        {loading ? (
          <span className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
        ) : (
          <>
            Confirmer la Réservation
            <ArrowRight size={18} />
          </>
        )}
      </button>

      <p className="text-white/30 text-xs text-center flex items-center justify-center gap-1">
        <Shield size={14} className="text-red-500" />
        Réservation rapide sans paiement par carte en ligne
      </p>
    </form>
  );
}
