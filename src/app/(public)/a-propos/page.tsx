import Link from "next/link";
import { Shield, Award, Users, MapPin, CheckCircle, ArrowRight } from "lucide-react";

export const metadata = {
  title: "À Propos — SONIC CARS Location de Voiture",
  description: "Découvrez l'histoire, les valeurs et l'engagement de SONIC CARS, votre agence de référence à Oujda et Tanger.",
};

export default function AboutPage() {
  return (
    <div className="pt-28 pb-20">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="flex items-center justify-center gap-3 mb-3">
            <div className="divider-red" />
            <span className="text-red-500 text-sm font-semibold uppercase tracking-widest">
              Qui Sommes-Nous ?
            </span>
            <div className="divider-red" />
          </div>
          <h1
            className="text-4xl md:text-6xl font-black text-white mb-6"
            style={{ fontFamily: "var(--font-outfit)" }}
          >
            L'Excellence Automobile à <span className="text-red-500">Oujda & Tanger</span>
          </h1>
          <p className="text-white/60 text-lg leading-relaxed">
            Fondée avec la passion du service client et de l'automobile, SONIC CARS s'impose aujourd'hui comme un acteur incontournable de la location de voitures au Maroc.
          </p>
        </div>

        {/* Story Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20">
          <div className="space-y-6">
            <h2 className="text-3xl font-black text-white" style={{ fontFamily: "var(--font-outfit)" }}>
              Notre Engagements : Transparence, Qualité & Sérénité
            </h2>
            <p className="text-white/70 leading-relaxed text-sm">
              Que vous veniez en vacances, pour affaires ou pour visiter votre famille, nous mettons tout en œuvre pour vous offrir des véhicules récents, parfaitement révisés et au meilleur rapport qualité-prix.
            </p>
            <div className="space-y-3">
              {[
                "Véhicules sous garantie constructeur régulièrement contrôlés",
                "Tarification transparente sans aucun frais caché",
                "Assistance dépannage 24/7 partout au Maroc",
                "Service de remise des clés aux aéroports d'Oujda et Tanger",
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 text-white/80 text-sm">
                  <CheckCircle size={18} className="text-red-500 shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="glass border border-white/10 rounded-2xl p-8 space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div className="p-6 rounded-xl bg-white/5 border border-white/10 text-center">
                <div className="text-4xl font-black text-red-500 mb-1" style={{ fontFamily: "var(--font-outfit)" }}>14+</div>
                <div className="text-white/40 text-xs uppercase">Véhicules Réderne</div>
              </div>
              <div className="p-6 rounded-xl bg-white/5 border border-white/10 text-center">
                <div className="text-4xl font-black text-red-500 mb-1" style={{ fontFamily: "var(--font-outfit)" }}>2</div>
                <div className="text-white/40 text-xs uppercase">Agences Majeures</div>
              </div>
              <div className="p-6 rounded-xl bg-white/5 border border-white/10 text-center">
                <div className="text-4xl font-black text-red-500 mb-1" style={{ fontFamily: "var(--font-outfit)" }}>98%</div>
                <div className="text-white/40 text-xs uppercase">Clients Satisfaits</div>
              </div>
              <div className="p-6 rounded-xl bg-white/5 border border-white/10 text-center">
                <div className="text-4xl font-black text-red-500 mb-1" style={{ fontFamily: "var(--font-outfit)" }}>24/7</div>
                <div className="text-white/40 text-xs uppercase">Support client</div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center pt-8">
          <Link href="/voitures" className="btn-primary text-base px-8 py-4">
            Découvrir Notre Flotte
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </div>
  );
}
