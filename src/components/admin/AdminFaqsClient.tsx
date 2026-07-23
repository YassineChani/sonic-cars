"use client";

import { useState } from "react";
import { Plus, Edit, Trash2 } from "lucide-react";
import { toast } from "@/components/ui/Toaster";

export function AdminFaqsClient({ initialFaqs }: { initialFaqs: any[] }) {
  const [faqs, setFaqs] = useState(initialFaqs);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [order, setOrder] = useState(1);
  const [published, setPublished] = useState(true);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  function openCreateModal() {
    setEditingId(null);
    setQuestion("");
    setAnswer("");
    setOrder(faqs.length + 1);
    setPublished(true);
    setIsModalOpen(true);
  }

  function openEditModal(f: any) {
    setEditingId(f.id);
    setQuestion(f.question);
    setAnswer(f.answer);
    setOrder(f.order);
    setPublished(f.published);
    setIsModalOpen(true);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      const url = editingId ? `/api/faqs/${editingId}` : "/api/faqs";
      const method = editingId ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question, answer, order: Number(order), published }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      if (editingId) {
        setFaqs((prev) => prev.map((item) => (item.id === editingId ? data : item)));
        toast("Question modifiée", "success");
      } else {
        setFaqs((prev) => [...prev, data]);
        toast("Question ajoutée", "success");
      }
      setIsModalOpen(false);
    } catch (err: any) {
      toast(err.message || "Erreur de sauvegarde", "error");
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Voulez-vous supprimer cette question ?")) return;
    try {
      const res = await fetch(`/api/faqs/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Erreur");
      setFaqs((prev) => prev.filter((f) => f.id !== id));
      toast("Question supprimée", "success");
    } catch (err) {
      toast("Erreur de suppression", "error");
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-black text-white" style={{ fontFamily: "var(--font-outfit)" }}>
            Gestion de la <span className="text-red-500">FAQ</span>
          </h1>
          <p className="text-white/40 text-sm mt-1">Questions et réponses de l'aide en ligne</p>
        </div>
        <button onClick={openCreateModal} className="btn-primary text-sm px-5 py-3">
          <Plus size={18} />
          Ajouter une Question
        </button>
      </div>

      <div className="space-y-4">
        {faqs.map((f) => (
          <div key={f.id} className="glass border border-white/10 rounded-2xl p-6 flex justify-between items-start">
            <div className="space-y-2 max-w-3xl">
              <h3 className="text-white font-bold text-base flex items-center gap-2">
                <span className="text-red-500 font-mono">#{f.order}</span>
                {f.question}
              </h3>
              <p className="text-white/70 text-sm leading-relaxed">{f.answer}</p>
            </div>
            <div className="space-x-2 flex-shrink-0">
              <button onClick={() => openEditModal(f)} className="text-white/60 hover:text-white p-1">
                <Edit size={16} />
              </button>
              <button onClick={() => handleDelete(f.id)} className="text-red-400 hover:text-red-300 p-1">
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="glass border border-white/10 rounded-2xl w-full max-w-lg p-6 space-y-4">
            <h3 className="text-lg font-bold text-white">
              {editingId ? "Modifier la Question" : "Ajouter une Question"}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-3">
              <input
                type="text"
                placeholder="Question"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                className="input-dark text-sm"
                required
              />
              <textarea
                rows={4}
                placeholder="Réponse"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                className="input-dark text-sm"
                required
              />
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="number"
                  placeholder="Ordre d'affichage"
                  value={order}
                  onChange={(e) => setOrder(Number(e.target.value))}
                  className="input-dark text-sm"
                />
                <label className="flex items-center gap-2 text-sm text-white cursor-pointer">
                  <input
                    type="checkbox"
                    checked={published}
                    onChange={(e) => setPublished(e.target.checked)}
                    className="rounded text-red-500"
                  />
                  Publié sur le site
                </label>
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
