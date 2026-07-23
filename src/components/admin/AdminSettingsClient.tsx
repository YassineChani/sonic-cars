"use client";

import { useState } from "react";
import { Save, Phone, Mail, Globe, MessageCircle } from "lucide-react";
import { toast } from "@/components/ui/Toaster";

export function AdminSettingsClient({ initialSettings }: { initialSettings: Record<string, string> }) {
  const [whatsapp, setWhatsapp] = useState(initialSettings.whatsapp || "+212600000000");
  const [contactEmail, setContactEmail] = useState(initialSettings.contactEmail || "contact@soniccars.ma");
  const [contactPhone, setContactPhone] = useState(initialSettings.contactPhone || "+212600000000");

  const [loading, setLoading] = useState(false);

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          whatsapp,
          contactEmail,
          contactPhone,
        }),
      });

      if (!res.ok) throw new Error("Erreur de sauvegarde");

      toast("Paramètres enregistrés !", "success");
    } catch (err) {
      toast("Impossible d'enregistrer les paramètres", "error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h1 className="text-3xl font-black text-white" style={{ fontFamily: "var(--font-outfit)" }}>
          Paramètres du <span className="text-red-500">Site</span>
        </h1>
        <p className="text-white/40 text-sm mt-1">Configuration générale et coordonnées de contact</p>
      </div>

      <form onSubmit={handleSave} className="glass border border-white/10 rounded-2xl p-6 md:p-8 space-y-6">
        <div>
          <label className="block text-white/50 text-xs uppercase tracking-wider mb-2 flex items-center gap-2">
            <MessageCircle size={16} className="text-green-500" />
            Numéro WhatsApp Principal
          </label>
          <input
            type="text"
            value={whatsapp}
            onChange={(e) => setWhatsapp(e.target.value)}
            className="input-dark text-sm"
            required
          />
          <p className="text-white/30 text-xs mt-1">Utilisé pour le bouton flottant et les redirections directes</p>
        </div>

        <div>
          <label className="block text-white/50 text-xs uppercase tracking-wider mb-2 flex items-center gap-2">
            <Phone size={16} className="text-red-500" />
            Téléphone de Contact public
          </label>
          <input
            type="text"
            value={contactPhone}
            onChange={(e) => setContactPhone(e.target.value)}
            className="input-dark text-sm"
            required
          />
        </div>

        <div>
          <label className="block text-white/50 text-xs uppercase tracking-wider mb-2 flex items-center gap-2">
            <Mail size={16} className="text-red-500" />
            Email de Contact public
          </label>
          <input
            type="email"
            value={contactEmail}
            onChange={(e) => setContactEmail(e.target.value)}
            className="input-dark text-sm"
            required
          />
        </div>

        <div className="pt-4 border-t border-white/10">
          <button type="submit" disabled={loading} className="btn-primary text-sm px-6 py-3">
            <Save size={16} />
            {loading ? "Sauvegarde..." : "Enregistrer les modifications"}
          </button>
        </div>
      </form>
    </div>
  );
}
