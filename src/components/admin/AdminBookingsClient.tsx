"use client";

import { useState } from "react";
import { Search, CheckCircle, XCircle, Clock, Trash2, Phone, Mail, Calendar, MapPin, Eye } from "lucide-react";
import { toast } from "@/components/ui/Toaster";
import { formatDate, calculateDays, buildWhatsAppUrl } from "@/lib/utils";

interface AdminBookingsClientProps {
  initialBookings: any[];
}

export function AdminBookingsClient({ initialBookings }: AdminBookingsClientProps) {
  const [bookings, setBookings] = useState(initialBookings);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [selectedBooking, setSelectedBooking] = useState<any | null>(null);

  async function handleStatusChange(id: string, newStatus: string) {
    try {
      const res = await fetch(`/api/bookings/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Erreur de mise à jour");

      setBookings((prev) => prev.map((b) => (b.id === id ? { ...b, status: newStatus } : b)));
      if (selectedBooking?.id === id) {
        setSelectedBooking((prev: any) => ({ ...prev, status: newStatus }));
      }
      toast(`Réservation passée au statut ${newStatus}`, "success");
    } catch (err) {
      toast("Impossible de changer le statut", "error");
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Voulez-vous vraiment supprimer cette réservation ?")) return;

    try {
      const res = await fetch(`/api/bookings/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Erreur de suppression");

      setBookings((prev) => prev.filter((b) => b.id !== id));
      if (selectedBooking?.id === id) setSelectedBooking(null);
      toast("Réservation supprimée", "success");
    } catch (err) {
      toast("Erreur lors de la suppression", "error");
    }
  }

  const filtered = bookings.filter((b) => {
    const matchesSearch =
      b.bookingRef.toLowerCase().includes(search.toLowerCase()) ||
      b.fullName.toLowerCase().includes(search.toLowerCase()) ||
      b.phone.toLowerCase().includes(search.toLowerCase()) ||
      b.car.brand.toLowerCase().includes(search.toLowerCase());

    const matchesStatus = !statusFilter || b.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-white" style={{ fontFamily: "var(--font-outfit)" }}>
            Gestion des <span className="text-red-500">Réservations</span>
          </h1>
          <p className="text-white/40 text-sm mt-1">{bookings.length} demande(s) au total</p>
        </div>
      </div>

      {/* Filter bar */}
      <div className="glass border border-white/10 rounded-2xl p-4 flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40 pointer-events-none" />
          <input
            type="text"
            placeholder="Rechercher par référence, nom client, téléphone..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="input-dark pl-10 text-sm py-2.5"
          />
        </div>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="input-dark text-sm py-2.5 md:w-56"
        >
          <option value="">Tous les statuts</option>
          <option value="PENDING">PENDING (En attente)</option>
          <option value="CONFIRMED">CONFIRMED (Confirmé)</option>
          <option value="CANCELLED">CANCELLED (Annulé)</option>
          <option value="COMPLETED">COMPLETED (Terminé)</option>
        </select>
      </div>

      {/* Bookings Table */}
      <div className="glass border border-white/10 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-white/80">
            <thead className="bg-white/5 text-white/40 text-xs uppercase border-b border-white/10">
              <tr>
                <th className="p-4">Réf</th>
                <th className="p-4">Client</th>
                <th className="p-4">Véhicule</th>
                <th className="p-4">Trajet / Dates</th>
                <th className="p-4">Prix Est.</th>
                <th className="p-4">Statut</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filtered.map((b) => {
                const days = calculateDays(b.startDate, b.endDate);
                const totalPrice = days * Number(b.car.dailyPrice);

                return (
                  <tr key={b.id} className="hover:bg-white/5 transition-colors">
                    <td className="p-4 font-mono font-bold text-red-400">{b.bookingRef}</td>
                    <td className="p-4">
                      <div className="font-semibold text-white">{b.fullName}</div>
                      <div className="text-white/40 text-xs">{b.phone}</div>
                    </td>
                    <td className="p-4">
                      <div className="font-medium text-white">{b.car.brand} {b.car.model}</div>
                    </td>
                    <td className="p-4 text-xs space-y-1">
                      <div className="text-white/70">
                        {b.pickupCity} → {b.returnCity}
                      </div>
                      <div className="text-white/40">
                        {formatDate(b.pickupDate)} → {formatDate(b.returnDate)} ({days}j)
                      </div>
                    </td>
                    <td className="p-4 font-mono text-white font-bold">{totalPrice.toLocaleString("fr-MA")} MAD</td>
                    <td className="p-4">
                      <span
                        className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                          b.status === "PENDING"
                            ? "bg-amber-500/10 border border-amber-500/20 text-amber-400"
                            : b.status === "CONFIRMED"
                            ? "bg-emerald-500/10 border border-emerald-500/20 text-emerald-400"
                            : "bg-red-500/10 border border-red-500/20 text-red-400"
                        }`}
                      >
                        {b.status}
                      </span>
                    </td>
                    <td className="p-4 text-right space-x-2">
                      <button
                        onClick={() => setSelectedBooking(b)}
                        className="p-2 inline-block text-white/60 hover:text-white rounded-lg hover:bg-white/10"
                        title="Détails"
                      >
                        <Eye size={16} />
                      </button>
                      {b.status === "PENDING" && (
                        <button
                          onClick={() => handleStatusChange(b.id, "CONFIRMED")}
                          className="p-2 inline-block text-emerald-400 hover:text-emerald-300 rounded-lg hover:bg-emerald-500/10"
                          title="Valider"
                        >
                          <CheckCircle size={16} />
                        </button>
                      )}
                      <button
                        onClick={() => handleDelete(b.id)}
                        className="p-2 inline-block text-red-400 hover:text-red-300 rounded-lg hover:bg-red-500/10"
                        title="Supprimer"
                      >
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Details Modal */}
      {selectedBooking && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="glass border border-white/10 rounded-2xl w-full max-w-lg p-6 space-y-6">
            <div className="flex justify-between items-center border-b border-white/10 pb-4">
              <div>
                <h3 className="text-xl font-bold text-white">Réservation #{selectedBooking.bookingRef}</h3>
                <span className="text-white/40 text-xs">Créée le {formatDate(selectedBooking.createdAt)}</span>
              </div>
              <button onClick={() => setSelectedBooking(null)} className="text-white/50 hover:text-white">
                ✕
              </button>
            </div>

            <div className="space-y-4 text-sm">
              <div className="p-4 rounded-xl bg-white/5 space-y-2">
                <div className="text-white/40 text-xs uppercase tracking-wider font-semibold">Client</div>
                <div className="text-white font-bold text-base">{selectedBooking.fullName}</div>
                <div className="flex items-center gap-2 text-white/70">
                  <Phone size={14} className="text-red-500" />
                  {selectedBooking.phone}
                </div>
                {selectedBooking.email && (
                  <div className="flex items-center gap-2 text-white/70">
                    <Mail size={14} className="text-red-500" />
                    {selectedBooking.email}
                  </div>
                )}
              </div>

              <div className="p-4 rounded-xl bg-white/5 space-y-2">
                <div className="text-white/40 text-xs uppercase tracking-wider font-semibold">Véhicule & Trajet</div>
                <div className="text-white font-bold">{selectedBooking.car.brand} {selectedBooking.car.model}</div>
                <div className="text-white/70 text-xs">
                  Prise en charge: <span className="text-white">{selectedBooking.pickupCity}</span> ({formatDate(selectedBooking.pickupDate)})
                </div>
                <div className="text-white/70 text-xs">
                  Restitution: <span className="text-white">{selectedBooking.returnCity}</span> ({formatDate(selectedBooking.returnDate)})
                </div>
              </div>

              {selectedBooking.message && (
                <div className="p-4 rounded-xl bg-white/5 space-y-1">
                  <div className="text-white/40 text-xs uppercase font-semibold">Remarques Client</div>
                  <p className="text-white/80 text-xs italic">{selectedBooking.message}</p>
                </div>
              )}

              {/* Status control buttons */}
              <div className="pt-2 flex gap-2">
                <button
                  onClick={() => handleStatusChange(selectedBooking.id, "CONFIRMED")}
                  className="flex-1 btn-primary bg-emerald-600 hover:bg-emerald-500 text-xs py-2.5 justify-center"
                >
                  Confirmer
                </button>
                <button
                  onClick={() => handleStatusChange(selectedBooking.id, "CANCELLED")}
                  className="flex-1 btn-secondary text-xs py-2.5 justify-center"
                >
                  Annuler
                </button>
                <a
                  href={buildWhatsAppUrl(selectedBooking.phone, `Bonjour ${selectedBooking.fullName}, concernant votre réservation #${selectedBooking.bookingRef}...`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 bg-green-600 rounded-xl text-white hover:bg-green-500 flex items-center justify-center"
                  title="WhatsApp Client"
                >
                  <Phone size={16} />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
