"use client";

import { useState } from "react";
import { Plus, Edit, Trash2, MapPin, Phone, Mail } from "lucide-react";
import { toast } from "@/components/ui/Toaster";

export function AdminLocationsClient({ initialLocations }: { initialLocations: any[] }) {
  const [locations, setLocations] = useState(initialLocations);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  function openCreateModal() {
    setEditingId(null);
    setName("");
    setAddress("");
    setPhone("");
    setEmail("");
    setIsModalOpen(true);
  }

  function openEditModal(loc: any) {
    setEditingId(loc.id);
    setName(loc.name);
    setAddress(loc.address || "");
    setPhone(loc.phone || "");
    setEmail(loc.email || "");
    setIsModalOpen(true);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      const url = editingId ? `/api/locations/${editingId}` : "/api/locations";
      const method = editingId ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, address, phone, email }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      if (editingId) {
        setLocations((prev) => prev.map((l) => (l.id === editingId ? data : l)));
        toast("Agence mise à jour", "success");
      } else {
        setLocations((prev) => [...prev, data]);
        toast("Nouvelle agence ajoutée", "success");
      }
      setIsModalOpen(false);
    } catch (err: any) {
      toast(err.message || "Erreur de sauvegarde", "error");
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Voulez-vous supprimer cette agence ?")) return;
    try {
      const res = await fetch(`/api/locations/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Erreur de suppression");
      setLocations((prev) => prev.filter((l) => l.id !== id));
      toast("Agence supprimée", "success");
    } catch (err) {
      toast("Impossible de supprimer", "error");
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-black text-white" style={{ fontFamily: "var(--font-outfit)" }}>
            Gestion des <span className="text-red-500">Agences</span>
          </h1>
          <p className="text-white/40 text-sm mt-1">Implantations physiques et villes desservies</p>
        </div>
        <button onClick={openCreateModal} className="btn-primary text-sm px-5 py-3">
          <Plus size={18} />
          Ajouter une Agence
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {locations.map((loc) => (
          <div key={loc.id} className="card-dark p-6 space-y-4">
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-2">
                <MapPin size={20} className="text-red-500" />
                <h3 className="text-xl font-bold text-white">{loc.name}</h3>
              </div>
              <div className="space-x-2">
                <button onClick={() => openEditModal(loc)} className="text-white/60 hover:text-white p-1">
                  <Edit size={16} />
                </button>
                <button onClick={() => handleDelete(loc.id)} className="text-red-400 hover:text-red-300 p-1">
                  <Trash2 size={16} />
                </button>
              </div>
            </div>

            <p className="text-white/60 text-sm">{loc.address || "Adresse non spécifiée"}</p>

            <div className="pt-2 space-y-1 text-xs text-white/50 border-t border-white/5">
              <div>Tél: {loc.phone || "+212 600 000 000"}</div>
              <div>Email: {loc.email || `${loc.slug}@soniccars.ma`}</div>
              <div className="text-red-400 font-semibold pt-1">
                {loc._count?.cars || 0} véhicule(s) rattaché(s)
              </div>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="glass border border-white/10 rounded-2xl w-full max-w-md p-6 space-y-4">
            <h3 className="text-lg font-bold text-white">
              {editingId ? "Modifier Agence" : "Ajouter Agence"}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-3">
              <input
                type="text"
                placeholder="Nom de la Ville (ex: Oujda)"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="input-dark text-sm"
                required
              />
              <input
                type="text"
                placeholder="Adresse complète"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="input-dark text-sm"
              />
              <input
                type="text"
                placeholder="Téléphone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="input-dark text-sm"
              />
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-dark text-sm"
              />
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
