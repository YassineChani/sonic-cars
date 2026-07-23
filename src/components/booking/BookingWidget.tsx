"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Calendar, MapPin, Check, AlertCircle, ArrowRight, Shield } from "lucide-react";
import { calculateDays, formatPrice, buildWhatsAppUrl } from "@/lib/utils";
import { toast } from "@/components/ui/Toaster";
import { CarWithDetails } from "@/types";

interface BookingWidgetProps {
  car: CarWithDetails;
}

export function BookingWidget({ car }: BookingWidgetProps) {
  const router = useRouter();
  const today = new Date().toISOString().split("T")[0];

  const [pickupDate, setPickupDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [pickupCity, setPickupCity] = useState(car.location.name);
  const [returnCity, setReturnCity] = useState(car.location.name);
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");

  const [loading, setLoading] = useState(false);
  const [successBooking, setSuccessBooking] = useState<any>(null);

  const pricePerDay = Number(car.dailyPrice);

  const days = useMemo(() => {
    if (!pickupDate || !returnDate) return 0;
    return calculateDays(pickupDate, returnDate);
  }, [pickupDate, returnDate]);

  const totalPrice = days * pricePerDay;

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
    const waMsg = `Bonjour SONIC CARS, je confirme ma réservation #${successBooking.bookingReference} pour la ${car.brand} ${car.model} du ${pickupDate} au ${returnDate}. Nom: ${customerName}.`;
    const waUrl = buildWhatsAppUrl("+212600000000", waMsg);

    return (
      <div className="glass border border-emerald-500/30 rounded-2xl p-6 text-center space-y-4">
        <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
          <Check size={28} />
        </div>
        <h3 className="text-white font-bold text-xl" style={{ fontFamily: "var(--font-outfit)" }}>
          Demande Enregistrée !
        </h3>
        <p className="text-white/70 text-sm">
          Référence : <span className="text-red-400 font-mono font-bold">{successBooking.bookingRef}</span>
        </p>
        <p className="text-white/50 text-xs">
          Notre équipe va vérifier la disponibilité et vous contacter très rapidement.
        </p>

        <div className="pt-2 space-y-2">
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary w-full bg-emerald-600 hover:bg-emerald-500 justify-center text-sm"
          >
            Confirmer via WhatsApp
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
    <div className="glass border border-white/10 rounded-2xl p-6 shadow-2xl">
      <h3
        className="text-xl font-bold text-white mb-6 border-b border-white/10 pb-4"
        style={{ fontFamily: "var(--font-outfit)" }}
      >
        Réserver cette Voiture
      </h3>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Pickup & Return Dates */}
        <div>
          <label className="block text-white/50 text-xs uppercase tracking-wider mb-2">
            Date de Prise en Charge
          </label>
          <div className="relative">
            <Calendar size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-red-500 pointer-events-none" />
            <input
              type="date"
              min={today}
              value={pickupDate}
              onChange={(e) => setPickupDate(e.target.value)}
              className="input-dark pl-10 cursor-pointer text-sm"
              style={{ colorScheme: "dark" }}
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-white/50 text-xs uppercase tracking-wider mb-2">
            Date de Restitution
          </label>
          <div className="relative">
            <Calendar size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-red-500 pointer-events-none" />
            <input
              type="date"
              min={pickupDate || today}
              value={returnDate}
              onChange={(e) => setReturnDate(e.target.value)}
              className="input-dark pl-10 cursor-pointer text-sm"
              style={{ colorScheme: "dark" }}
              required
            />
          </div>
        </div>

        {/* Cities */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-white/50 text-xs uppercase tracking-wider mb-2">
              Prise en charge
            </label>
            <select
              value={pickupCity}
              onChange={(e) => setPickupCity(e.target.value)}
              className="input-dark text-xs py-2.5"
            >
              <option value="Oujda">Oujda</option>
              <option value="Tanger">Tanger</option>
            </select>
          </div>
          <div>
            <label className="block text-white/50 text-xs uppercase tracking-wider mb-2">
              Restitution
            </label>
            <select
              value={returnCity}
              onChange={(e) => setReturnCity(e.target.value)}
              className="input-dark text-xs py-2.5"
            >
              <option value="Oujda">Oujda</option>
              <option value="Tanger">Tanger</option>
            </select>
          </div>
        </div>

        {/* Customer Information */}
        <div className="border-t border-white/10 pt-4 space-y-3">
          <div>
            <label className="block text-white/50 text-xs uppercase tracking-wider mb-1">
              Nom complet *
            </label>
            <input
              type="text"
              placeholder="ex: Youssef El Amrani"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              className="input-dark text-sm py-2"
              required
            />
          </div>

          <div>
            <label className="block text-white/50 text-xs uppercase tracking-wider mb-1">
              Téléphone (WhatsApp) *
            </label>
            <input
              type="tel"
              placeholder="ex: +212 6 12 34 56 78"
              value={customerPhone}
              onChange={(e) => setCustomerPhone(e.target.value)}
              className="input-dark text-sm py-2"
              required
            />
          </div>

          <div>
            <label className="block text-white/50 text-xs uppercase tracking-wider mb-1">
              Email (optionnel)
            </label>
            <input
              type="email"
              placeholder="votre@email.com"
              value={customerEmail}
              onChange={(e) => setCustomerEmail(e.target.value)}
              className="input-dark text-sm py-2"
            />
          </div>
        </div>

        {/* Price Breakdown */}
        {days > 0 && (
          <div className="border-t border-b border-white/10 py-4 my-4 space-y-2">
            <div className="flex justify-between text-xs text-white/60">
              <span>{pricePerDay} MAD × {days} jour(s)</span>
              <span>{totalPrice} MAD</span>
            </div>
            <div className="flex justify-between text-xs text-white/60">
              <span>Assurance de base</span>
              <span className="text-emerald-400 font-medium">Inclus</span>
            </div>
            <div className="flex justify-between text-sm font-bold text-white pt-2 border-t border-white/5">
              <span>Total Estimé</span>
              <span className="text-red-500 font-black text-lg">{totalPrice.toLocaleString("fr-MA")} MAD</span>
            </div>
          </div>
        )}

        {/* Action Button */}
        <button
          type="submit"
          disabled={loading || !car.availability}
          className="btn-primary w-full justify-center text-sm py-3 mt-2"
        >
          {loading ? (
            <span className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
          ) : (
            <>
              Envoyer la Demande
              <ArrowRight size={16} />
            </>
          )}
        </button>

        <p className="text-white/30 text-xs text-center flex items-center justify-center gap-1 mt-2">
          <Shield size={12} className="text-red-500" />
          Aucun paiement en ligne requis
        </p>
      </form>
    </div>
  );
}
