"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { Calendar, Clock, MapPin, Check, ArrowRight, Shield, User, Phone, Mail, MessageSquare } from "lucide-react";
import { calculateDays, buildWhatsAppUrl } from "@/lib/utils";
import { toast } from "@/components/ui/Toaster";
import { CarWithDetails } from "@/types";
import { MOROCCAN_CITIES } from "@/lib/constants";

interface BookingWidgetProps {
  car: CarWithDetails;
}

export function BookingWidget({ car }: BookingWidgetProps) {
  const today = new Date().toISOString().split("T")[0];

  const [pickupDate, setPickupDate] = useState("");
  const [pickupTime, setPickupTime] = useState("09:00");
  const [returnDate, setReturnDate] = useState("");
  const [returnTime, setReturnTime] = useState("09:00");
  const [pickupCity, setPickupCity] = useState(car.location.name);
  const [returnCity, setReturnCity] = useState(car.location.name);
  
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [driverAge, setDriverAge] = useState("");
  const [notes, setNotes] = useState("");

  const [loading, setLoading] = useState(false);
  const [successBooking, setSuccessBooking] = useState<any>(null);

  const days = useMemo(() => {
    if (!pickupDate || !returnDate) return 0;
    return calculateDays(pickupDate, returnDate);
  }, [pickupDate, returnDate]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!pickupDate || !returnDate) {
      toast("Veuillez sélectionner les dates de location", "error");
      return;
    }
    if (days <= 0) {
      toast("La date de retour doit être postérieure à la date de départ", "error");
      return;
    }
    if (!customerName || !customerPhone) {
      toast("Veuillez renseigner votre nom et numéro de téléphone", "error");
      return;
    }

    setLoading(true);

    try {
      const fullNotes = `[Heure départ: ${pickupTime}] [Heure retour: ${returnTime}] ${driverAge ? `[Âge: ${driverAge}]` : ''} ${notes ? `[Message: ${notes}]` : ''}`;

      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          carId: car.id,
          fullName: customerName,
          phone: customerPhone,
          email: customerEmail || undefined,
          pickupCity,
          returnCity,
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
      toast("Votre demande de réservation a été enregistrée !", "success");
    } catch (err: any) {
      toast(err.message || "Impossible d'effectuer la réservation", "error");
    } finally {
      setLoading(false);
    }
  }

  if (successBooking) {
    const waMsg = `Bonjour SONIC CARS, je confirme ma réservation pour la ${car.brand} ${car.model} du ${pickupDate} (${pickupTime}) au ${returnDate} (${returnTime}). Nom: ${customerName}.`;
    const waUrl = buildWhatsAppUrl("+212661382653", waMsg);

    return (
      <div className="glass border border-emerald-500/30 rounded-2xl p-6 text-center space-y-4">
        <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto ring-4 ring-emerald-500/20">
          <Check size={32} />
        </div>
        <div>
          <h3 className="text-white font-bold text-xl" style={{ fontFamily: "var(--font-outfit)" }}>
            ✅ Réservation Enregistrée !
          </h3>
          <p className="text-emerald-400 text-xs mt-0.5 font-semibold">Référence : {successBooking.bookingRef}</p>
        </div>
        <p className="text-white/70 text-sm">
          Véhicule : <span className="text-red-400 font-bold">{car.brand} {car.model}</span>
        </p>
        <p className="text-white/50 text-xs">
          Notre équipe va vérifier la disponibilité et vous recontacter rapidement.
        </p>

        <div className="pt-2 space-y-2">
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary w-full bg-emerald-600 hover:bg-emerald-500 justify-center text-sm font-bold"
          >
            Confirmer sur WhatsApp
          </a>
          <a
            href="/admin/bookings"
            className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl border border-red-500/40 bg-red-500/10 text-red-400 hover:bg-red-500/20 text-xs font-semibold transition-all"
          >
            🔐 Voir dans l'Espace Admin
          </a>
          <button
            onClick={() => setSuccessBooking(null)}
            className="btn-secondary w-full justify-center text-xs"
          >
            Faire une autre réservation
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="glass border border-white/10 rounded-2xl p-6 shadow-2xl space-y-5">
      
      {/* Voiture sélectionnée preview */}
      <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10">
        <div className="relative w-16 h-12 rounded-lg overflow-hidden bg-zinc-800 flex-shrink-0">
          <Image src={car.mainImage || "/placeholder-car.jpg"} alt={car.title} fill className="object-cover" />
        </div>
        <div>
          <div className="text-[10px] text-red-400 font-semibold uppercase">Voiture Sélectionnée</div>
          <h4 className="text-white font-bold text-sm">{car.brand} {car.model}</h4>
          <p className="text-white/40 text-xs">{car.transmission} · {car.fuelType}</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Lieux */}
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="block text-white/50 text-[11px] uppercase tracking-wider mb-1">
              📍 Prise en charge
            </label>
            <select
              value={pickupCity}
              onChange={(e) => setPickupCity(e.target.value)}
              className="input-dark text-xs py-2 bg-zinc-900 text-white"
              style={{ colorScheme: "dark" }}
            >
              {MOROCCAN_CITIES.map((city) => (
                <option key={city} value={city} className="bg-zinc-900 text-white">{city}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-white/50 text-[11px] uppercase tracking-wider mb-1">
              📍 Restitution
            </label>
            <select
              value={returnCity}
              onChange={(e) => setReturnCity(e.target.value)}
              className="input-dark text-xs py-2 bg-zinc-900 text-white"
              style={{ colorScheme: "dark" }}
            >
              {MOROCCAN_CITIES.map((city) => (
                <option key={city} value={city} className="bg-zinc-900 text-white">{city}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Date & Heure Départ */}
        <div className="grid grid-cols-3 gap-2">
          <div className="col-span-2">
            <label className="block text-white/50 text-[11px] uppercase tracking-wider mb-1">
              📅 Date départ *
            </label>
            <input
              type="date"
              min={today}
              value={pickupDate}
              onChange={(e) => setPickupDate(e.target.value)}
              className="input-dark text-xs py-2 cursor-pointer"
              style={{ colorScheme: "dark" }}
              required
            />
          </div>
          <div>
            <label className="block text-white/50 text-[11px] uppercase tracking-wider mb-1">
              ⏰ Heure *
            </label>
            <input
              type="time"
              value={pickupTime}
              onChange={(e) => setPickupTime(e.target.value)}
              className="input-dark text-xs py-2 cursor-pointer"
              style={{ colorScheme: "dark" }}
              required
            />
          </div>
        </div>

        {/* Date & Heure Retour */}
        <div className="grid grid-cols-3 gap-2">
          <div className="col-span-2">
            <label className="block text-white/50 text-[11px] uppercase tracking-wider mb-1">
              📅 Date retour *
            </label>
            <input
              type="date"
              min={pickupDate || today}
              value={returnDate}
              onChange={(e) => setReturnDate(e.target.value)}
              className="input-dark text-xs py-2 cursor-pointer"
              style={{ colorScheme: "dark" }}
              required
            />
          </div>
          <div>
            <label className="block text-white/50 text-[11px] uppercase tracking-wider mb-1">
              ⏰ Heure *
            </label>
            <input
              type="time"
              value={returnTime}
              onChange={(e) => setReturnTime(e.target.value)}
              className="input-dark text-xs py-2 cursor-pointer"
              style={{ colorScheme: "dark" }}
              required
            />
          </div>
        </div>

        {/* Customer Info */}
        <div className="border-t border-white/10 pt-3 space-y-2.5">
          <div>
            <label className="block text-white/50 text-[11px] uppercase tracking-wider mb-1">
              👤 Nom complet *
            </label>
            <input
              type="text"
              placeholder="ex: Youssef El Amrani"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              className="input-dark text-xs py-2"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-white/50 text-[11px] uppercase tracking-wider mb-1">
                📱 Téléphone *
              </label>
              <input
                type="tel"
                placeholder="+212 6..."
                value={customerPhone}
                onChange={(e) => setCustomerPhone(e.target.value)}
                className="input-dark text-xs py-2"
                required
              />
            </div>
            <div>
              <label className="block text-white/50 text-[11px] uppercase tracking-wider mb-1">
                📧 Email
              </label>
              <input
                type="email"
                placeholder="votre@email.com"
                value={customerEmail}
                onChange={(e) => setCustomerEmail(e.target.value)}
                className="input-dark text-xs py-2"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2">
            <div>
              <label className="block text-white/50 text-[11px] uppercase tracking-wider mb-1">
                🚘 Âge
              </label>
              <input
                type="number"
                placeholder="ex: 25"
                value={driverAge}
                onChange={(e) => setDriverAge(e.target.value)}
                className="input-dark text-xs py-2"
              />
            </div>
            <div className="col-span-2">
              <label className="block text-white/50 text-[11px] uppercase tracking-wider mb-1">
                📝 Remarques
              </label>
              <input
                type="text"
                placeholder="ex: Siège enfant..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="input-dark text-xs py-2"
              />
            </div>
          </div>
        </div>

        {/* Action Button */}
        <button
          type="submit"
          disabled={loading || !car.availability}
          className="btn-primary w-full justify-center text-sm py-3 mt-2 font-bold"
        >
          {loading ? (
            <span className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
          ) : (
            <>
              Réserver Maintenant
              <ArrowRight size={16} />
            </>
          )}
        </button>

        <p className="text-white/30 text-[11px] text-center flex items-center justify-center gap-1 mt-1">
          <Shield size={12} className="text-red-500" />
          Aucun paiement en ligne requis
        </p>
      </form>
    </div>
  );
}
