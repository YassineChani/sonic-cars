import Link from "next/link";
import { ArrowRight, Phone, MessageCircle } from "lucide-react";

export function CTASection() {
  return (
    <section className="py-20 relative overflow-hidden bg-gradient-to-r from-red-950/80 via-black to-zinc-950 border-t border-red-500/20">
      {/* Background glow */}
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-96 h-96 bg-red-600/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="container-custom relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <span className="text-red-500 font-semibold text-xs uppercase tracking-widest mb-3 block">
            Prêt à partir ?
          </span>
          <h2
            className="text-4xl md:text-6xl font-black text-white mb-6"
            style={{ fontFamily: "var(--font-outfit)" }}
          >
            Reservez Votre Véhicule Dès <span className="text-red-500">Aujourd'hui</span>
          </h2>
          <p className="text-white/60 text-lg md:text-xl mb-10 max-w-2xl mx-auto font-light">
            Profitez de tarifs avantageux et d'une expérience de conduite premium à Oujda et Tanger.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/reservation" className="btn-primary text-base px-8 py-4 w-full sm:w-auto">
              Réserver Maintenant
              <ArrowRight size={18} />
            </Link>

            <a
              href="https://wa.me/212600000000"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary text-base px-8 py-4 w-full sm:w-auto flex items-center justify-center gap-2"
            >
              <MessageCircle size={18} className="text-green-500" />
              Réserver sur WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
