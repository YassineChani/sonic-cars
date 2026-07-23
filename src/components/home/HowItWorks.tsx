import { Search, CalendarCheck, KeyRound, CheckCircle2 } from "lucide-react";

const steps = [
  {
    icon: Search,
    step: "01",
    title: "Choisissez votre Véhicule",
    description: "Parcourez notre catalogue et sélectionnez la voiture qui convient à vos besoins et votre budget.",
  },
  {
    icon: CalendarCheck,
    step: "02",
    title: "Soumettez votre Demande",
    description: "Remplissez le formulaire en ligne avec vos dates, lieu de prise en charge et informations personnelles.",
  },
  {
    icon: CheckCircle2,
    step: "03",
    title: "Confirmation Rapide",
    description: "Notre équipe vous contacte par téléphone ou WhatsApp pour confirmer la disponibilité et valider votre réservation.",
  },
  {
    icon: KeyRound,
    step: "04",
    title: "Prenez le Volant",
    description: "Récupérez les clés à notre agence ou faites-vous livrer le véhicule à l'aéroport ou à votre hôtel.",
  },
];

export function HowItWorks() {
  return (
    <section className="section-padding relative overflow-hidden">
      {/* Glow background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-red-600/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container-custom relative z-10">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="divider-red" />
            <span className="text-red-500 text-sm font-semibold uppercase tracking-widest">
              Processus Simple
            </span>
            <div className="divider-red" />
          </div>
          <h2
            className="text-4xl md:text-5xl font-black text-white mb-4"
            style={{ fontFamily: "var(--font-outfit)" }}
          >
            Comment ça <span className="text-red-500">Marche ?</span>
          </h2>
          <p className="text-white/50 text-lg">
            Reservez votre véhicule en seulement 4 étapes simples et sans stress.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((item, index) => {
            const Icon = item.icon;
            return (
              <div key={item.step} className="relative group">
                {/* Connecting line for desktop */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-10 left-[60%] right-[-40%] h-[2px] bg-gradient-to-r from-red-500/40 to-transparent z-0" />
                )}

                <div className="glass border border-white/10 rounded-2xl p-6 relative z-10 transition-all duration-300 group-hover:-translate-y-2 group-hover:border-red-500/40">
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-14 h-14 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-500 group-hover:scale-110 transition-transform">
                      <Icon size={26} />
                    </div>
                    <span
                      className="text-4xl font-black text-white/10 group-hover:text-red-500/20 transition-colors"
                      style={{ fontFamily: "var(--font-outfit)" }}
                    >
                      {item.step}
                    </span>
                  </div>

                  <h3
                    className="text-white font-bold text-lg mb-2"
                    style={{ fontFamily: "var(--font-outfit)" }}
                  >
                    {item.title}
                  </h3>
                  <p className="text-white/50 text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
