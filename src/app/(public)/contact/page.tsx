"use client";

import { useState } from "react";
import { MapPin, Phone, Mail, Clock, Send, MessageCircle, Check } from "lucide-react";
import { toast } from "@/components/ui/Toaster";
import { buildWhatsAppUrl } from "@/lib/utils";

const PHONE_NUMBERS = [
  { label: "06 61 38 26 53", value: "+212661382653" },
  { label: "06 90 63 15 24", value: "+212690631524" },
  { label: "06 64 63 71 71", value: "+212664637171" },
];

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("Oujda");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name || !phone || !message) {
      toast("Veuillez remplir les champs obligatoires", "error");
      return;
    }
    setSent(true);
    toast("Votre message a bien été envoyé !", "success");
  }

  return (
    <div className="pt-28 md:pt-36 pb-20">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mt-6 md:mt-10 mb-16">
          <div className="flex items-center justify-center gap-3 mb-3">
            <div className="divider-red" />
            <span className="text-red-500 text-sm font-semibold uppercase tracking-widest">
              Support & Information
            </span>
            <div className="divider-red" />
          </div>
          <h1
            className="text-4xl md:text-6xl font-black text-white mb-4"
            style={{ fontFamily: "var(--font-outfit)" }}
          >
            Contactez <span className="text-red-500">SONIC CARS</span>
          </h1>
          <p className="text-white/50 text-lg">
            Une question ? Besoin d’un devis sur-mesure ? Notre équipe est à votre écoute 7j/7.
          </p>
        </div>

        {/* Contact Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Info Side */}
          <div className="lg:col-span-1 space-y-6">
            <div className="card-dark p-6 space-y-4">
              <h3 className="text-white font-bold text-lg border-b border-white/10 pb-3" style={{ fontFamily: "var(--font-outfit)" }}>
                Coordonnées Directes
              </h3>

              <div className="space-y-4 text-sm">
                <div className="space-y-2">
                  <div className="text-white/40 text-xs font-semibold uppercase tracking-wider">Téléphones Directs</div>
                  {PHONE_NUMBERS.map((p) => (
                    <a
                      key={p.value}
                      href={`tel:${p.value}`}
                      className="flex items-center gap-2.5 text-white font-medium hover:text-red-400 transition-colors"
                    >
                      <Phone size={15} className="text-red-500 shrink-0" />
                      <span>{p.label}</span>
                    </a>
                  ))}
                </div>

                <div className="flex items-start gap-3 border-t border-white/10 pt-3">
                  <Mail size={18} className="text-red-500 mt-1 shrink-0" />
                  <div>
                    <div className="text-white/40 text-xs">Email</div>
                    <div className="text-white font-medium">contact@soniccars.ma</div>
                  </div>
                </div>

                <div className="flex items-start gap-3 border-t border-white/10 pt-3">
                  <Clock size={18} className="text-red-500 mt-1 shrink-0" />
                  <div>
                    <div className="text-white/40 text-xs">Horaires d'ouverture</div>
                    <div className="text-white font-medium">Lundi – Dimanche : 08:00 – 20:00</div>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <a
                  href={buildWhatsAppUrl("+212661382653", "Bonjour SONIC CARS, je souhaite vous contacter.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary w-full bg-emerald-600 hover:bg-emerald-500 text-xs py-3 justify-center"
                >
                  <MessageCircle size={16} />
                  Discuter sur WhatsApp
                </a>
              </div>
            </div>

            {/* Agence addresses summary */}
            <div className="glass border border-white/10 rounded-2xl p-6 space-y-4">
              <div className="flex items-start gap-3">
                <MapPin size={18} className="text-red-500 mt-0.5 shrink-0" />
                <div>
                  <h4 className="text-white font-bold text-sm">Agence Oujda</h4>
                  <p className="text-white/50 text-xs mt-0.5">123 Avenue Mohammed V, Centre Ville</p>
                </div>
              </div>
              <div className="flex items-start gap-3 pt-3 border-t border-white/5">
                <MapPin size={18} className="text-red-500 mt-0.5 shrink-0" />
                <div>
                  <h4 className="text-white font-bold text-sm">Agence Tanger</h4>
                  <p className="text-white/50 text-xs mt-0.5">456 Blvd Mohammed VI, Malabata</p>
                </div>
              </div>
            </div>
          </div>

          {/* Form Side */}
          <div className="lg:col-span-2">
            {sent ? (
              <div className="glass border border-emerald-500/30 rounded-2xl p-12 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                  <Check size={32} />
                </div>
                <h3 className="text-2xl font-bold text-white" style={{ fontFamily: "var(--font-outfit)" }}>
                  Message Envoyé avec Succès !
                </h3>
                <p className="text-white/60 text-sm max-w-md mx-auto">
                  Merci de nous avoir contactés. Notre équipe commerciale vous répondra dans les plus brefs délais.
                </p>
                <button
                  onClick={() => setSent(false)}
                  className="btn-secondary text-xs px-6 py-2.5 mx-auto"
                >
                  Envoyer un autre message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="glass border border-white/10 rounded-2xl p-6 md:p-8 space-y-6">
                <h3 className="text-white font-bold text-xl mb-4 border-b border-white/10 pb-3" style={{ fontFamily: "var(--font-outfit)" }}>
                  Envoyez-nous un Message
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-white/50 text-xs uppercase tracking-wider mb-2">
                      Nom complet *
                    </label>
                    <input
                      type="text"
                      placeholder="ex: Youssef El Amrani"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="input-dark text-sm"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-white/50 text-xs uppercase tracking-wider mb-2">
                      Téléphone *
                    </label>
                    <input
                      type="tel"
                      placeholder="ex: 06 61 38 26 53"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="input-dark text-sm"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-white/50 text-xs uppercase tracking-wider mb-2">
                      Email (optionnel)
                    </label>
                    <input
                      type="email"
                      placeholder="votre@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="input-dark text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-white/50 text-xs uppercase tracking-wider mb-2">
                      Agence Concerne
                    </label>
                    <select
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="input-dark text-sm"
                    >
                      <option value="Oujda">Agence Oujda</option>
                      <option value="Tanger">Agence Tanger</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-white/50 text-xs uppercase tracking-wider mb-2">
                    Message *
                  </label>
                  <textarea
                    rows={5}
                    placeholder="Posez votre question ou détaillez votre demande de location..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="input-dark text-sm"
                    required
                  />
                </div>

                <button type="submit" className="btn-primary w-full justify-center text-sm py-3.5">
                  <Send size={16} />
                  Envoyer le Message
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
