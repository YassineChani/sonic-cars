import { Shield, Clock, MapPin, Star, Headphones, CreditCard } from "lucide-react";

const reasons = [
  {
    icon: Shield,
    title: "Assurance Incluse",
    description: "Roulez l'esprit tranquille. Assurance de base incluse dans tous nos tarifs.",
    color: "text-red-500",
    bg: "bg-red-500/10",
    border: "border-red-500/20",
  },
  {
    icon: Clock,
    title: "Kilométrage Illimité",
    description: "Explorez le Maroc sans compter les kilomètres. Liberté totale sur la route.",
    color: "text-orange-400",
    bg: "bg-orange-400/10",
    border: "border-orange-400/20",
  },
  {
    icon: Headphones,
    title: "Service 7j/7",
    description: "Notre équipe est disponible 7 jours sur 7 pour vous accompagner à chaque étape.",
    color: "text-blue-400",
    bg: "bg-blue-400/10",
    border: "border-blue-400/20",
  },
  {
    icon: Star,
    title: "Flotte Premium",
    description: "Des véhicules récents, parfaitement entretenus et régulièrement renouvelés.",
    color: "text-yellow-400",
    bg: "bg-yellow-400/10",
    border: "border-yellow-400/20",
  },
  {
    icon: MapPin,
    title: "Présence à Oujda & Tanger",
    description: "Deux agences stratégiquement situées pour vous servir dans l'est et le nord du Maroc.",
    color: "text-green-400",
    bg: "bg-green-400/10",
    border: "border-green-400/20",
  },
  {
    icon: CreditCard,
    title: "Prix Transparents",
    description: "Aucun frais caché. Les prix affichés incluent tout ce dont vous avez besoin.",
    color: "text-purple-400",
    bg: "bg-purple-400/10",
    border: "border-purple-400/20",
  },
];

export function WhyUs() {
  return (
    <section className="section-padding bg-zinc-950">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="divider-red" />
            <span className="text-red-500 text-sm font-semibold uppercase tracking-widest">
              Pourquoi Nous
            </span>
            <div className="divider-red" />
          </div>
          <h2
            className="text-4xl md:text-5xl font-black text-white mb-4"
            style={{ fontFamily: "var(--font-outfit)" }}
          >
            Pourquoi Choisir{" "}
            <span className="text-red-500">SONIC CARS</span>
          </h2>
          <p className="text-white/50 text-lg">
            Des avantages pensés pour vous offrir la meilleure expérience de location possible.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reasons.map((reason, i) => {
            const Icon = reason.icon;
            return (
              <div
                key={i}
                className={`relative group p-6 rounded-2xl border ${reason.border} ${reason.bg} hover:border-opacity-50 transition-all duration-300 hover:-translate-y-1 cursor-default`}
              >
                {/* Icon */}
                <div
                  className={`w-12 h-12 rounded-xl ${reason.bg} border ${reason.border} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}
                >
                  <Icon size={22} className={reason.color} />
                </div>

                <h3
                  className="text-white font-bold text-lg mb-2"
                  style={{ fontFamily: "var(--font-outfit)" }}
                >
                  {reason.title}
                </h3>
                <p className="text-white/50 text-sm leading-relaxed">
                  {reason.description}
                </p>

                {/* Decorative number */}
                <div className="absolute top-4 right-5 text-white/5 text-5xl font-black" style={{ fontFamily: "var(--font-outfit)" }}>
                  {String(i + 1).padStart(2, "0")}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
