import Link from "next/link";
import { Phone, Mail, MapPin, Clock, MessageCircle, ChevronRight } from "lucide-react";

const PHONE_NUMBERS = [
  { label: "06 61 38 26 53", value: "+212661382653" },
  { label: "06 90 63 15 24", value: "+212690631524" },
  { label: "06 64 63 71 71", value: "+212664637171" },
];

const footerLinks = {
  pages: [
    { href: "/voitures", label: "Notre Flotte" },
    { href: "/reservation", label: "Réservation" },
    { href: "/agences", label: "Nos Agences" },
    { href: "/a-propos", label: "À Propos" },
    { href: "/contact", label: "Contact" },
  ],
  info: [
    { href: "/faq", label: "FAQ" },
    { href: "/conditions", label: "Conditions Générales" },
    { href: "/confidentialite", label: "Politique de Confidentialité" },
  ],
  fleet: [
    { href: "/voitures?brand=Renault", label: "Renault Clio 5" },
    { href: "/voitures?brand=Peugeot", label: "Peugeot 208 & 308" },
    { href: "/voitures?brand=Dacia", label: "Dacia Stepway & Duster" },
    { href: "/voitures?brand=Volkswagen", label: "VW T-Roc Sport" },
    { href: "/voitures?brand=Seat", label: "Seat Leon FR" },
  ],
};

export function Footer() {
  return (
    <footer className="bg-zinc-950 border-t border-white/8">
      {/* Main Footer */}
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand & Socials */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-block mb-6">
              <span
                className="text-2xl font-black tracking-wider"
                style={{ fontFamily: "var(--font-outfit)" }}
              >
                <span className="text-white">SONIC</span>
                <span className="text-red-500"> CARS</span>
              </span>
            </Link>
            <p className="text-white/50 text-sm leading-relaxed mb-6">
              Location de voiture premium à Oujda et Tanger. Flotte moderne, service irréprochable, réservation rapide.
            </p>
            
            {/* Social Media Links */}
            <div className="space-y-3">
              <span className="text-xs text-white/40 font-semibold uppercase tracking-wider block">Suivez-nous</span>
              <div className="flex items-center gap-3">
                {/* Instagram SVG */}
                <a
                  href="https://www.instagram.com/soniccars2025"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram Sonic Cars"
                  className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-pink-500 hover:border-pink-500/50 hover:bg-pink-500/10 transition-all"
                >
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>

                {/* Snapchat SVG */}
                <a
                  href="https://www.snapchat.com/add/soniccars2025"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Snapchat Sonic Cars"
                  className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-yellow-400 hover:border-yellow-400/50 hover:bg-yellow-400/10 transition-all"
                >
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M12.003 2c-3.766 0-6.14 2.855-6.14 6.275 0 2.222 1.053 3.993 2.106 5.158-.263.856-1.579 1.134-2.808 1.346-.421.073-.684.22-.684.438 0 .438.995.876 2.052 1.053 1.053.175 1.702.584 1.702 1.256 0 1.579-2.053 2.053-2.053 3.1 0 .613.684.876 1.404.876 1.345 0 2.807-.731 4.422-.731 1.614 0 3.076.731 4.421.731.72 0 1.404-.263 1.404-.876 0-1.047-2.053-1.521-2.053-3.1 0-.672.649-1.081 1.702-1.256 1.057-.177 2.052-.615 2.052-1.053 0-.218-.263-.365-.684-.438-1.229-.212-2.545-.49-2.808-1.346 1.053-1.165 2.106-2.936 2.106-5.158 0-3.42-2.374-6.275-6.14-6.275z"/>
                  </svg>
                </a>

                {/* Facebook SVG */}
                <a
                  href="https://www.facebook.com/Soniccars"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook Sonic Cars"
                  className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-blue-500 hover:border-blue-500/50 hover:bg-blue-500/10 transition-all"
                >
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>

                {/* WhatsApp */}
                <a
                  href="https://wa.me/212661382653"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="WhatsApp Sonic Cars"
                  className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-emerald-400 hover:border-emerald-400/50 hover:bg-emerald-400/10 transition-all"
                >
                  <MessageCircle size={18} />
                </a>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-white font-semibold mb-5 text-sm uppercase tracking-wider">
              Navigation
            </h3>
            <ul className="space-y-3">
              {footerLinks.pages.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/50 hover:text-white text-sm transition-colors flex items-center gap-2 group"
                  >
                    <ChevronRight size={14} className="text-red-500 opacity-0 group-hover:opacity-100 transition-opacity -ml-2" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Flotte */}
          <div>
            <h3 className="text-white font-semibold mb-5 text-sm uppercase tracking-wider">
              Notre Flotte
            </h3>
            <ul className="space-y-3">
              {footerLinks.fleet.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/50 hover:text-white text-sm transition-colors flex items-center gap-2 group"
                  >
                    <ChevronRight size={14} className="text-red-500 opacity-0 group-hover:opacity-100 transition-opacity -ml-2" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Phones */}
          <div>
            <h3 className="text-white font-semibold mb-5 text-sm uppercase tracking-wider">
              Contact & Téléphones
            </h3>
            <ul className="space-y-4">
              <li>
                <div className="flex items-start gap-3">
                  <MapPin size={16} className="text-red-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-white/40 text-xs uppercase tracking-wider mb-0.5">Oujda & Tanger</p>
                    <p className="text-white/60 text-sm">Disponibles en agences & aéroports</p>
                  </div>
                </div>
              </li>
              
              {/* 3 Phone Numbers */}
              {PHONE_NUMBERS.map((p) => (
                <li key={p.value}>
                  <a
                    href={`tel:${p.value}`}
                    className="flex items-center gap-3 text-white/70 hover:text-white text-sm transition-colors font-medium"
                  >
                    <Phone size={15} className="text-red-500 flex-shrink-0" />
                    <span>{p.label}</span>
                  </a>
                </li>
              ))}

              <li>
                <a href="mailto:contact@soniccars.ma" className="flex items-center gap-3 text-white/60 hover:text-white text-sm transition-colors">
                  <Mail size={15} className="text-red-500 flex-shrink-0" />
                  contact@soniccars.ma
                </a>
              </li>
              <li>
                <div className="flex items-center gap-3 text-white/50 text-xs">
                  <Clock size={15} className="text-red-500 flex-shrink-0" />
                  7j / 7 · Service Client Continu
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/8">
        <div className="container-custom py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/30 text-sm">
            © {new Date().getFullYear()} SONIC CARS. Tous droits réservés.
          </p>
          <div className="flex gap-6">
            {footerLinks.info.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-white/30 hover:text-white/60 text-xs transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
