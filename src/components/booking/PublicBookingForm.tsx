"use client";

import { useState, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import { Calendar, Clock, MapPin, Check, ArrowRight, Shield, Car as CarIcon, User, Mail, Phone, MessageSquare, Sparkles } from "lucide-react";
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

  const validInitialCar = cars.some(c => c.id === searchParams.get("carId")) 
    ? searchParams.get("carId") 
    : (cars[0]?.id || "");
    
  const initialCity = searchParams.get("city") || "";

  const [selectedCarId, setSelectedCarId] = useState(validInitialCar || "");
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
          whatsapp: customerPhone,
          email: customerEmail || `${customerPhone.replace(/\s+/g, "")}@client.soniccars.ma`,
          pickupCity,
          returnCity: returnCity || pickupCity,
          pickupDate,
          pickupTime,
          returnDate,
          returnTime,
          message: fullNotes,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Erreur lors de la réservation");
      }

      setSuccessBooking(data);
      window.scrollTo({ top: 0, behavior: "smooth" });
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
      <div className="glass border border-emerald-500/30 rounded-3xl p-8 md:p-12 text-center space-y-8 max-w-xl mx-auto shadow-2xl animate-fade-in-up">
        {/* Success Icon */}
        <div className="w-20 h-20 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto ring-8 ring-emerald-500/10">
          <Check size={40} />
        </div>

        <div className="space-y-3">
          <h2 className="text-3xl font-black text-white" style={{ fontFamily: "var(--font-outfit)" }}>
            Réservation Réussie !
          </h2>
          <p className="text-emerald-400 text-sm font-semibold tracking-wider uppercase">
            Référence : #{successBooking.bookingRef}
          </p>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 text-left space-y-4">
          {selectedCar && (
            <div className="flex items-center gap-4 pb-4 border-b border-white/10">
              <div className="relative w-20 h-14 rounded-xl overflow-hidden bg-zinc-800 flex-shrink-0 border border-white/10">
                <Image src={selectedCar.mainImage || "/placeholder-car.jpg"} alt={selectedCar.title} fill className="object-cover" />
              </div>
              <div>
                <h4 className="text-white font-bold text-base">{selectedCar.brand} {selectedCar.model}</h4>
                <p className="text-white/40 text-xs mt-0.5">{selectedCar.year} · {selectedCar.transmission}</p>
              </div>
            </div>
          )}
          <div className="space-y-2.5 text-sm">
            <div className="flex justify-between text-white/60">
              <span>Lieu de Départ :</span>
              <span className="text-white font-semibold">{pickupCity} — {pickupDate} ({pickupTime})</span>
            </div>
            <div className="flex justify-between text-white/60">
              <span>Lieu de Retour :</span>
              <span className="text-white font-semibold">{returnCity || pickupCity} — {returnDate} ({returnTime})</span>
            </div>
            <div className="flex justify-between text-white/60">
              <span>Client :</span>
              <span className="text-white font-semibold">{customerName} ({customerPhone})</span>
            </div>
          </div>
        </div>

        <p className="text-white/60 text-sm leading-relaxed max-w-md mx-auto">
          Votre demande a été enregistrée avec succès. Notre équipe vous recontactera sous <strong className="text-white">30 minutes</strong> pour valider les derniers détails.
        </p>

        <div className="space-y-3 pt-2">
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary w-full bg-emerald-600 hover:bg-emerald-500 justify-center text-base py-4 font-bold rounded-2xl shadow-lg"
          >
            💬 Envoyer sur WhatsApp
          </a>
          <button
            onClick={() => setSuccessBooking(null)}
            className="btn-secondary w-full justify-center text-xs py-3 rounded-xl"
          >
            Faire une autre réservation
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="booking-form-container">
      
      {/* ─── ÉTAPE 01: Sélection du Véhicule ─────────────────────────────── */}
      <div className="booking-step-card">
        <div className="booking-step-header">
          <div className="flex items-center gap-4">
            <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-red-500/20 text-red-400 font-black text-sm border border-red-500/30">
              01
            </span>
            <div>
              <h3 className="text-white font-black text-xl tracking-tight" style={{ fontFamily: "var(--font-outfit)" }}>
                Sélection du Véhicule
              </h3>
              <p className="text-white/40 text-xs mt-0.5">Choisissez le modèle qui vous convient</p>
            </div>
          </div>
          <CarIcon size={22} className="text-white/30 hidden sm:block" />
        </div>

        {/* Cars Grid */}
        {cars.length === 0 ? (
          <div className="p-10 text-center bg-white/5 rounded-2xl border border-white/10">
            <CarIcon size={40} className="mx-auto text-white/20 mb-4" />
            <p className="text-white/60 text-sm">Aucun véhicule n'est disponible pour le moment.</p>
            <p className="text-white/40 text-xs mt-2">Veuillez ajouter des véhicules depuis l'espace administration.</p>
          </div>
        ) : (
          <div className="booking-field-grid grid-cols-1 grid-cols-sm-2 grid-cols-lg-3">
            {cars.map((car) => {
              const isSelected = car.id === selectedCarId;
              return (
                <div
                  key={car.id}
                  onClick={() => setSelectedCarId(car.id)}
                  className={`booking-car-card ${isSelected ? 'selected' : ''}`}
                >
                  <div className="relative w-22 h-16 rounded-xl overflow-hidden bg-zinc-800 flex-shrink-0 border border-white/10">
                    <Image
                      src={car.mainImage || "/placeholder-car.jpg"}
                      alt={car.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0 space-y-1">
                    <h4 className="text-white font-bold text-sm truncate">{car.brand} {car.model}</h4>
                    <p className="text-white/40 text-xs truncate">{car.year} · {car.transmission}</p>
                    <span className="inline-block text-[10px] text-emerald-400 font-semibold px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                      Disponible
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Selected Car Display Banner */}
        {selectedCar && (
          <div className="p-6 rounded-2xl bg-gradient-to-r from-red-500/15 via-zinc-900 to-zinc-900 border border-red-500/30 flex items-center justify-between shadow-xl">
            <div className="flex items-center gap-5">
              <div className="relative w-28 h-18 rounded-xl overflow-hidden bg-zinc-800 border border-white/10 flex-shrink-0">
                <Image src={selectedCar.mainImage || "/placeholder-car.jpg"} alt={selectedCar.title} fill className="object-cover" />
              </div>
              <div className="space-y-1">
                <div className="text-xs text-red-400 font-semibold uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles size={13} />
                  Véhicule Sélectionné
                </div>
                <div className="text-white font-black text-xl">{selectedCar.brand} {selectedCar.model} ({selectedCar.year})</div>
                <div className="text-white/50 text-xs">{selectedCar.transmission} · {selectedCar.fuelType} · {selectedCar.seats} Places · Kilométrage Illimité</div>
              </div>
            </div>
            <div className="w-10 h-10 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 flex items-center justify-center hidden sm:flex shrink-0">
              <Check size={20} />
            </div>
          </div>
        )}
      </div>

      {/* ─── ÉTAPE 02: Lieux et Dates ───────────────────────────────────── */}
      <div className="booking-step-card">
        <div className="booking-step-header">
          <div className="flex items-center gap-4">
            <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-red-500/20 text-red-400 font-black text-sm border border-red-500/30">
              02
            </span>
            <div>
              <h3 className="text-white font-black text-xl tracking-tight" style={{ fontFamily: "var(--font-outfit)" }}>
                Lieux & Dates de Location
              </h3>
              <p className="text-white/40 text-xs mt-0.5">Spécifiez les lieux de prise en charge et restitution</p>
            </div>
          </div>
          <Calendar size={22} className="text-white/30 hidden sm:block" />
        </div>

        {/* Cities Selector */}
        <div className="booking-field-grid grid-cols-1 grid-cols-sm-2">
          <div className="booking-field-group">
            <label>
              <MapPin size={15} className="text-red-500" />
              Lieu de Prise en Charge *
            </label>
            <select
              value={pickupCity}
              onChange={(e) => setPickupCity(e.target.value)}
              className="booking-input-premium"
              style={{ colorScheme: "dark" }}
              required
            >
              {MOROCCAN_CITIES.map((city) => (
                <option key={city} value={city} className="bg-zinc-900 text-white py-2">
                  {city} (Agence / Aéroport)
                </option>
              ))}
            </select>
          </div>

          <div className="booking-field-group">
            <label>
              <MapPin size={15} className="text-white/40" />
              Lieu de Restitution (Optionnel)
            </label>
            <select
              value={returnCity}
              onChange={(e) => setReturnCity(e.target.value)}
              className="booking-input-premium"
              style={{ colorScheme: "dark" }}
            >
              <option value="" className="bg-zinc-900 text-white">Même lieu que le départ</option>
              {MOROCCAN_CITIES.map((city) => (
                <option key={city} value={city} className="bg-zinc-900 text-white py-2">
                  {city} (Agence / Aéroport)
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Departure & Return Dates & Times */}
        <div className="booking-field-grid grid-cols-1 grid-cols-sm-2">
          {/* Departure */}
          <div className="grid grid-cols-3 gap-4">
            <div className="col-span-2 booking-field-group">
              <label>
                <Calendar size={15} className="text-red-500" />
                Date de Départ *
              </label>
              <input
                type="date"
                min={today}
                value={pickupDate}
                onChange={(e) => setPickupDate(e.target.value)}
                className="booking-input-premium cursor-pointer"
                style={{ colorScheme: "dark" }}
                required
              />
            </div>
            <div className="booking-field-group">
              <label>
                <Clock size={15} className="text-red-500" />
                Heure *
              </label>
              <input
                type="time"
                value={pickupTime}
                onChange={(e) => setPickupTime(e.target.value)}
                className="booking-input-premium cursor-pointer"
                style={{ colorScheme: "dark" }}
                required
              />
            </div>
          </div>

          {/* Return */}
          <div className="grid grid-cols-3 gap-4">
            <div className="col-span-2 booking-field-group">
              <label>
                <Calendar size={15} className="text-red-500" />
                Date de Retour *
              </label>
              <input
                type="date"
                min={pickupDate || today}
                value={returnDate}
                onChange={(e) => setReturnDate(e.target.value)}
                className="booking-input-premium cursor-pointer"
                style={{ colorScheme: "dark" }}
                required
              />
            </div>
            <div className="booking-field-group">
              <label>
                <Clock size={15} className="text-red-500" />
                Heure *
              </label>
              <input
                type="time"
                value={returnTime}
                onChange={(e) => setReturnTime(e.target.value)}
                className="booking-input-premium cursor-pointer"
                style={{ colorScheme: "dark" }}
                required
              />
            </div>
          </div>
        </div>
      </div>

      {/* ─── ÉTAPE 03: Coordonnées du Conducteur ────────────────────────── */}
      <div className="booking-step-card">
        <div className="booking-step-header">
          <div className="flex items-center gap-4">
            <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-red-500/20 text-red-400 font-black text-sm border border-red-500/30">
              03
            </span>
            <div>
              <h3 className="text-white font-black text-xl tracking-tight" style={{ fontFamily: "var(--font-outfit)" }}>
                Coordonnées du Conducteur
              </h3>
              <p className="text-white/40 text-xs mt-0.5">Informations de contact pour la confirmation</p>
            </div>
          </div>
          <User size={22} className="text-white/30 hidden sm:block" />
        </div>

        {/* Contact Information Fields */}
        <div className="booking-field-grid grid-cols-1 grid-cols-sm-3">
          <div className="booking-field-group">
            <label>
              <User size={15} className="text-red-500" />
              Nom Complet *
            </label>
            <input
              type="text"
              placeholder="ex: Youssef Benjelloun"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              className="booking-input-premium"
              required
            />
          </div>

          <div className="booking-field-group">
            <label>
              <Phone size={15} className="text-red-500" />
              Téléphone (WhatsApp) *
            </label>
            <input
              type="tel"
              placeholder="ex: +212 6 12 34 56 78"
              value={customerPhone}
              onChange={(e) => setCustomerPhone(e.target.value)}
              className="booking-input-premium"
              required
            />
          </div>

          <div className="booking-field-group">
            <label>
              <Mail size={15} className="text-white/40" />
              Email (Optionnel)
            </label>
            <input
              type="email"
              placeholder="votre@email.com"
              value={customerEmail}
              onChange={(e) => setCustomerEmail(e.target.value)}
              className="booking-input-premium"
            />
          </div>
        </div>

        {/* Additional Optional Fields */}
        <div className="booking-field-grid grid-cols-1 grid-cols-sm-3">
          <div className="booking-field-group">
            <label>
              <CarIcon size={15} className="text-white/40" />
              Âge du Conducteur (Optionnel)
            </label>
            <input
              type="number"
              min="18"
              max="90"
              placeholder="ex: 28"
              value={driverAge}
              onChange={(e) => setDriverAge(e.target.value)}
              className="booking-input-premium"
            />
          </div>

          <div className="col-span-2 booking-field-group">
            <label>
              <MessageSquare size={15} className="text-white/40" />
              Message / Demandes Spéciales (Optionnel)
            </label>
            <input
              type="text"
              placeholder="ex: Siège bébé, livraison à l'aéroport ou hôtel..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="booking-input-premium"
            />
          </div>
        </div>
      </div>

      {/* ─── Résumé de la Réservation ──────────────────────────────────── */}
      {days > 0 && (
        <div className="glass border border-emerald-500/30 rounded-3xl p-6 md:p-8 flex flex-col sm:flex-row justify-between items-center gap-6 shadow-2xl bg-gradient-to-r from-emerald-500/10 via-zinc-900 to-zinc-900">
          <div className="flex items-center gap-5">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-500/30">
              <Calendar size={24} />
            </div>
            <div className="space-y-1">
              <div className="text-white font-black text-lg">Durée totale : {days} Jour(s)</div>
              <div className="text-white/60 text-xs">Du {pickupDate} ({pickupTime}) au {returnDate} ({returnTime})</div>
            </div>
          </div>
          <span className="px-5 py-2.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 font-bold text-xs flex items-center gap-2 shrink-0">
            <Shield size={16} />
            Assurance & Kilométrage Illimité Inclus
          </span>
        </div>
      )}

      {/* ─── Bouton de Soumission & Informations ────────────────────────── */}
      <div className="pt-6 pb-12 space-y-6 text-center">
        <button
          type="submit"
          disabled={loading}
          className="btn-primary w-full justify-center text-lg py-5 font-black tracking-wide shadow-2xl hover:shadow-red-500/30 rounded-2xl transition-all duration-300 hover:scale-[1.01]"
        >
          {loading ? (
            <span className="animate-spin rounded-full h-6 w-6 border-3 border-white border-t-transparent" />
          ) : (
            <>
              Confirmer la Réservation
              <ArrowRight size={20} />
            </>
          )}
        </button>

        <p className="text-white/40 text-xs flex items-center justify-center gap-2 pt-2">
          <Shield size={16} className="text-red-500" />
          Réservation rapide sans paiement par carte bancaire en ligne — Confirmation immédiate sous 30 min.
        </p>
      </div>
    </form>
  );
}
