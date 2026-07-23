"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Lock, Mail, ArrowRight, ShieldCheck } from "lucide-react";
import { toast } from "@/components/ui/Toaster";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email || !password) {
      toast("Veuillez remplir tous les champs", "error");
      return;
    }

    setLoading(true);

    try {
      const res = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      if (res?.error) {
        toast("Identifiants incorrects", "error");
      } else {
        toast("Connexion réussie !", "success");
        router.push("/admin/dashboard");
        router.refresh();
      }
    } catch (err) {
      toast("Erreur de connexion", "error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4 relative overflow-hidden">
      {/* Glow background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-red-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="w-full max-w-md relative z-10">
        {/* Logo */}
        <div className="text-center mb-8">
          <span
            className="text-3xl font-black tracking-wider"
            style={{ fontFamily: "var(--font-outfit)" }}
          >
            <span className="text-white">SONIC</span>
            <span className="text-red-500"> CARS</span>
          </span>
          <p className="text-white/40 text-xs mt-2 uppercase tracking-widest">
            Administration Panel
          </p>
        </div>

        {/* Card */}
        <div className="glass border border-white/10 rounded-2xl p-8 shadow-2xl space-y-6">
          <div className="text-center">
            <h1 className="text-xl font-bold text-white mb-1" style={{ fontFamily: "var(--font-outfit)" }}>
              Connexion Sécurisée
            </h1>
            <p className="text-white/50 text-xs">Entrez vos accès administrateur</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-white/50 text-xs uppercase tracking-wider mb-2">
                Adresse Email
              </label>
              <div className="relative">
                <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-red-500 pointer-events-none" />
                <input
                  type="email"
                  placeholder="admin@soniccars.ma"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input-dark pl-10 text-sm"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-white/50 text-xs uppercase tracking-wider mb-2">
                Mot de Passe
              </label>
              <div className="relative">
                <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-red-500 pointer-events-none" />
                <input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input-dark pl-10 text-sm"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full justify-center text-sm py-3.5 mt-2"
            >
              {loading ? (
                <span className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
              ) : (
                <>
                  Se Connecter
                  <ArrowRight size={16} />
                </>
              )}
            </button>
          </form>

          <div className="border-t border-white/10 pt-4 text-center">
            <p className="text-white/30 text-xs flex items-center justify-center gap-1">
              <ShieldCheck size={14} className="text-red-500" />
              Accès strictement réservé au personnel autorisé
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
