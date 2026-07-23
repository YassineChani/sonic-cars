import Link from "next/link";
import { MapPin, Phone, Mail, Clock, MessageCircle } from "lucide-react";
import { prisma } from "@/lib/prisma";

export const metadata = {
  title: "Nos Agences — Location de Voiture à Oujda et Tanger",
  description: "Retrouvez les adresses, numéros de téléphone et horaires de nos agences SONIC CARS à Oujda et Tanger.",
};

async function getLocations() {
  return prisma.location.findMany();
}

export default async function AgencesPage() {
  const locations = await getLocations();

  return (
    <div className="pt-28 pb-20">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="flex items-center justify-center gap-3 mb-3">
            <div className="divider-red" />
            <span className="text-red-500 text-sm font-semibold uppercase tracking-widest">
              Nos Implantation
            </span>
            <div className="divider-red" />
          </div>
          <h1
            className="text-4xl md:text-6xl font-black text-white mb-4"
            style={{ fontFamily: "var(--font-outfit)" }}
          >
            Nos Agences au <span className="text-red-500">Maroc</span>
          </h1>
          <p className="text-white/50 text-lg">
            Retrouvez-nous à Oujda et Tanger pour récupérer et restituer votre voiture en toute simplicité.
          </p>
        </div>

        {/* Locations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {locations.map((loc) => (
            <div key={loc.id} className="card-dark p-8 space-y-6">
              <div className="flex justify-between items-start">
                <span className="badge-red text-xs">Agence Officielle</span>
                <span className="text-white/40 text-xs flex items-center gap-1">
                  <Clock size={14} className="text-red-500" />
                  08:00 - 20:00 (7j/7)
                </span>
              </div>

              <h2
                className="text-3xl font-black text-white"
                style={{ fontFamily: "var(--font-outfit)" }}
              >
                SONIC CARS — {loc.name}
              </h2>

              <p className="text-white/60 text-sm leading-relaxed">
                {loc.address || `Agence principale située au cœur de la ville de ${loc.name}. Service de livraison à l'aéroport et aux hôtels disponible sur demande.`}
              </p>

              <div className="space-y-3 pt-4 border-t border-white/10">
                <div className="flex items-center gap-3 text-white/80 text-sm">
                  <MapPin size={18} className="text-red-500 shrink-0" />
                  <span>{loc.address || `Avenue Principale, ${loc.name}`}</span>
                </div>
                <div className="flex items-center gap-3 text-white/80 text-sm">
                  <Phone size={18} className="text-red-500 shrink-0" />
                  <span>{loc.phone || "+212 600 000 000"}</span>
                </div>
                <div className="flex items-center gap-3 text-white/80 text-sm">
                  <Mail size={18} className="text-red-500 shrink-0" />
                  <span>{loc.email || `${loc.slug}@soniccars.ma`}</span>
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <Link
                  href={`/voitures?city=${loc.slug}`}
                  className="flex-1 btn-secondary text-sm justify-center py-3"
                >
                  Flotte à {loc.name}
                </Link>
                <Link
                  href={`/reservation?city=${loc.name}`}
                  className="flex-1 btn-primary text-sm justify-center py-3"
                >
                  Réserver ICI
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Airport Delivery Banner */}
        <div className="glass border border-white/10 rounded-2xl p-8 text-center max-w-3xl mx-auto space-y-4">
          <h3 className="text-2xl font-bold text-white" style={{ fontFamily: "var(--font-outfit)" }}>
            Livraison à l'Aéroport Gratuite / Sur Demande
          </h3>
          <p className="text-white/60 text-sm max-w-xl mx-auto">
            Nous livrons gratuitement votre voiture à l'Aéroport Oujda Angads et à l'Aéroport Tanger Ibn Battouta pour tout contrat de location supérieur à 3 jours.
          </p>
          <a
            href="https://wa.me/212600000000"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-red-400 font-semibold hover:text-red-300 text-sm"
          >
            <MessageCircle size={16} />
            Contactez notre service transfert sur WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}
