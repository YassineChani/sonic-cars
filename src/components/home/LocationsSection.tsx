import Link from "next/link";
import { MapPin, Phone, Mail, Clock, ArrowRight } from "lucide-react";

const locations = [
  {
    city: "Oujda",
    address: "123 Avenue Mohammed V, Center Ville, Oujda",
    phone: "+212 600 000 000",
    email: "oujda@soniccars.ma",
    hours: "08:00 - 20:00 (7j/7)",
    description: "Service en centre-ville et livraison disponible à l'Aéroport Oujda Angads.",
    image: "https://images.unsplash.com/photo-1541888946425-d0fbb186a5b7?q=80&w=800&auto=format&fit=crop",
  },
  {
    city: "Tanger",
    address: "456 Boulevard Mohammed VI, Malabata, Tanger",
    phone: "+212 600 000 000",
    email: "tanger@soniccars.ma",
    hours: "08:00 - 20:00 (7j/7)",
    description: "Service côte & centre-ville, livraison disponible à l'Aéroport Tanger Ibn Battouta.",
    image: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?q=80&w=800&auto=format&fit=crop",
  },
];

export function LocationsSection() {
  return (
    <section className="section-padding bg-zinc-950 border-t border-b border-white/5">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="divider-red" />
            <span className="text-red-500 text-sm font-semibold uppercase tracking-widest">
              Présence Nationale
            </span>
            <div className="divider-red" />
          </div>
          <h2
            className="text-4xl md:text-5xl font-black text-white mb-4"
            style={{ fontFamily: "var(--font-outfit)" }}
          >
            Nos Agences au <span className="text-red-500">Maroc</span>
          </h2>
          <p className="text-white/50 text-lg">
            Retrouvez-nous dans nos agences principales à Oujda et Tanger.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {locations.map((loc) => (
            <div
              key={loc.city}
              className="card-dark group overflow-hidden flex flex-col justify-between"
            >
              <div className="p-8">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-red-500 font-semibold text-xs tracking-widest uppercase">
                    Agence Principale
                  </span>
                  <div className="flex items-center gap-1 text-white/40 text-xs">
                    <Clock size={14} className="text-red-500" />
                    {loc.hours}
                  </div>
                </div>

                <h3
                  className="text-3xl font-black text-white mb-3"
                  style={{ fontFamily: "var(--font-outfit)" }}
                >
                  {loc.city}
                </h3>
                <p className="text-white/50 text-sm leading-relaxed mb-6">
                  {loc.description}
                </p>

                <div className="space-y-3 mb-8">
                  <div className="flex items-start gap-3 text-white/70 text-sm">
                    <MapPin size={18} className="text-red-500 mt-0.5 shrink-0" />
                    <span>{loc.address}</span>
                  </div>
                  <div className="flex items-center gap-3 text-white/70 text-sm">
                    <Phone size={18} className="text-red-500 shrink-0" />
                    <span>{loc.phone}</span>
                  </div>
                  <div className="flex items-center gap-3 text-white/70 text-sm">
                    <Mail size={18} className="text-red-500 shrink-0" />
                    <span>{loc.email}</span>
                  </div>
                </div>
              </div>

              <div className="p-6 bg-white/5 border-t border-white/5 flex items-center justify-between">
                <Link
                  href={`/voitures?city=${loc.city.toLowerCase()}`}
                  className="text-white font-medium text-sm hover:text-red-400 flex items-center gap-2 transition-colors"
                >
                  Voir les voitures à {loc.city}
                  <ArrowRight size={16} />
                </Link>
                <Link
                  href={`/reservation?city=${loc.city.toLowerCase()}`}
                  className="btn-primary text-xs px-4 py-2"
                >
                  Réserver ici
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
