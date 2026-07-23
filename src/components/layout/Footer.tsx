import Link from "next/link";
import { Phone, Mail, MapPin, Clock, MessageCircle, ChevronRight } from "lucide-react";

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
    { href: "/voitures?brand=Renault", label: "Renault" },
    { href: "/voitures?brand=Peugeot", label: "Peugeot" },
    { href: "/voitures?brand=Dacia", label: "Dacia" },
    { href: "/voitures?brand=Volkswagen", label: "Volkswagen" },
    { href: "/voitures?brand=Seat", label: "Seat" },
  ],
};

export function Footer() {
  return (
    <footer className="bg-zinc-950 border-t border-white/8">
      {/* Main Footer */}
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
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
              Location de voiture premium à Oujda et Tanger. Flotte moderne, service irréprochable, prix compétitifs.
            </p>
            <div className="flex gap-3">
              <a
                href="https://wa.me/212600000000"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:border-white/30 transition-all"
              >
                <MessageCircle size={18} />
              </a>
            </div>
          </div>

          {/* Pages */}
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

          {/* Fleet */}
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

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-5 text-sm uppercase tracking-wider">
              Contact
            </h3>
            <ul className="space-y-4">
              <li>
                <div className="flex items-start gap-3">
                  <MapPin size={16} className="text-red-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-white/40 text-xs uppercase tracking-wider mb-1">Oujda</p>
                    <p className="text-white/60 text-sm">123 Avenue Mohammed V, Oujda</p>
                  </div>
                </div>
              </li>
              <li>
                <div className="flex items-start gap-3">
                  <MapPin size={16} className="text-red-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-white/40 text-xs uppercase tracking-wider mb-1">Tanger</p>
                    <p className="text-white/60 text-sm">456 Blvd Mohammed VI, Tanger</p>
                  </div>
                </div>
              </li>
              <li>
                <a href="tel:+212600000000" className="flex items-center gap-3 text-white/60 hover:text-white text-sm transition-colors">
                  <Phone size={16} className="text-red-500 flex-shrink-0" />
                  +212 600 000 000
                </a>
              </li>
              <li>
                <a href="mailto:contact@soniccars.ma" className="flex items-center gap-3 text-white/60 hover:text-white text-sm transition-colors">
                  <Mail size={16} className="text-red-500 flex-shrink-0" />
                  contact@soniccars.ma
                </a>
              </li>
              <li>
                <div className="flex items-center gap-3 text-white/60 text-sm">
                  <Clock size={16} className="text-red-500 flex-shrink-0" />
                  Lun – Sam : 08:00 – 20:00
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
