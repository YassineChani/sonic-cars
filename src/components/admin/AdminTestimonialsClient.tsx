"use client";

import { useState } from "react";
import { Plus, Edit, Trash2, Star } from "lucide-react";
import { toast } from "@/components/ui/Toaster";

export function AdminTestimonialsClient({ initialTestimonials }: { initialTestimonials: any[] }) {
  const [items, setItems] = useState(initialTestimonials);
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(5);
  const [published, setPublished] = useState(true);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  function openCreateModal() {
    setEditingId(null);
    setName("");
    setCity("");
    setComment("");
    setRating(5);
    setPublished(true);
    setIsModalOpen(true);
  }

  function openEditModal(t: any) {
    setEditingId(t.id);
    setName(t.name);
    setCity(t.city || "");
    setComment(t.comment);
    setRating(t.rating);
    setPublished(t.published);
    setIsModalOpen(true);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      const url = editingId ? `/api/testimonials/${editingId}` : "/api/testimonials";
      const method = editingId ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, city: city || undefined, comment, rating: Number(rating), published }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      if (editingId) {
        setItems((prev) => prev.map((item) => (item.id === editingId ? data : item)));
        toast("Avis mis à jour", "success");
      } else {
        setItems((prev) => [data, ...prev]);
        toast("Avis ajouté", "success");
      }
      setIsModalOpen(false);
    } catch (err: any) {
      toast(err.message || "Erreur de sauvegarde", "error");
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Voulez-vous supprimer cet avis ?")) return;
    try {
      const res = await fetch(`/api/testimonials/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Erreur");
      setItems((prev) => prev.filter((t) => t.id !== id));
      toast("Avis supprimé", "success");
    } catch (err) {
      toast("Erreur lors de la suppression", "error");
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-black text-white" style={{ fontFamily: "var(--font-outfit)" }}>
            Gestion des <span className="text-red-500">Avis Clients</span>
          </h1>
          <p className="text-white/40 text-sm mt-1">Témoignages affichés sur la page d'accueil</p>
        </div>
        <button onClick={openCreateModal} className="btn-primary text-sm px-5 py-3">
          <Plus size={18} />
          Ajouter un Avis
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {items.map((t) => (
          <div key={t.id} className="glass border border-white/10 rounded-2xl p-6 space-y-4">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-white font-bold">{t.name}</h3>
                <span className="text-white/40 text-xs">{t.city || "Client"}</span>
              </div>
              <div className="space-x-2">
                <button onClick={() => openEditModal(t)} className="text-white/60 hover:text-white p-1">
                  <Edit size={16} />
                </button>
                <button onClick={() => handleDelete(t.id)} className="text-red-400 hover:text-red-300 p-1">
                  <Trash2 size={16} />
                </button>
              </div>
            </div>

            <p className="text-white/80 text-sm italic">"{t.comment}"</p>

            <div className="flex justify-between items-center pt-2 border-t border-white/5">
              <div className="flex text-yellow-400 gap-1">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} size={14} fill="currentColor" />
                ))}
              </div>
              <span
                className={`text-xs px-2 py-0.5 rounded-full ${
                  t.published ? "bg-emerald-500/10 text-emerald-400" : "bg-red-500/10 text-red-400"
                }`}
              >
                {t.published ? "Publié" : "Masqué"}
              </span>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="glass border border-white/10 rounded-2xl w-full max-w-lg p-6 space-y-4">
            <h3 className="text-lg font-bold text-white">
              {editingId ? "Modifier l'Avis" : "Ajouter un Avis"}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-3">
              <input
                type="text"
                placeholder="Nom du client (ex: Youssef B.)"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="input-dark text-sm"
                required
              />
              <input
                type="text"
                placeholder="Ville / Titre (ex: Oujda)"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="input-dark text-sm"
              />
              <textarea
                rows={4}
                placeholder="Commentaire du client"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="input-dark text-sm"
                required
              />
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-white/50 text-xs mb-1">Note (1-5)</label>
                  <select
                    value={rating}
                    onChange={(e) => setRating(Number(e.target.value))}
                    className="input-dark text-sm"
                  >
                    <option value={5}>5 Étoiles</option>
                    <option value={4}>4 Étoiles</option>
                    <option value={3}>3 Étoiles</option>
                  </select>
                </div>
                <div className="flex items-end">
                  <label className="flex items-center gap-2 text-sm text-white cursor-pointer pb-2">
                    <input
                      type="checkbox"
                      checked={published}
                      onChange={(e) => setPublished(e.target.checked)}
                      className="rounded text-red-500"
                    />
                    Publié sur le site
                  </label>
                </div>
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="btn-secondary text-xs px-4 py-2"
                >
                  Annuler
                </button>
                <button type="submit" className="btn-primary text-xs px-5 py-2">
                  Enregistrer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
