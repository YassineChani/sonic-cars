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
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      {/* Header */}
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">
            Gestion des <span className="text-red-500">Réservations</span>
          </h1>
          <p className="admin-page-subtitle">{bookings.length} demande(s) au total</p>
        </div>
      </div>

      {/* Filter bar */}
      <div className="admin-table-wrapper">
        <div className="admin-action-bar">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/35 pointer-events-none" />
            <input
              type="text"
              placeholder="Rechercher par référence, nom, téléphone..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="input-admin"
              style={{ paddingLeft: '42px' }}
            />
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="input-admin"
            style={{ width: '220px', flexShrink: 0 }}
          >
            <option value="">Tous les statuts</option>
            <option value="PENDING">En attente</option>
            <option value="CONFIRMED">Confirmé</option>
            <option value="CANCELLED">Annulé</option>
            <option value="COMPLETED">Terminé</option>
          </select>
        </div>

        {/* Bookings Table */}
        <div className="overflow-x-auto">
          <table className="table-dark">
            <thead>
              <tr>
                <th>Réf</th>
                <th>Client</th>
                <th>Véhicule</th>
                <th>Trajet / Dates</th>
                <th>Prix Est.</th>
                <th>Statut</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={7} style={{ textAlign: 'center', padding: '48px', color: 'rgba(255,255,255,0.3)' }}>
                    Aucune réservation trouvée
                  </td>
                </tr>
              )}
              {filtered.map((b) => {
                const days = calculateDays(b.startDate, b.endDate);
                const totalPrice = days * Number(b.car.dailyPrice);

                return (
                  <tr key={b.id}>
                    <td style={{ fontFamily: 'monospace', fontWeight: 700, color: '#f87171' }}>{b.bookingRef}</td>
                    <td>
                      <div style={{ fontWeight: 600, color: 'white' }}>{b.fullName}</div>
                      <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.4)', marginTop: '3px' }}>{b.phone}</div>
                    </td>
                    <td style={{ fontWeight: 500, color: 'white' }}>{b.car.brand} {b.car.model}</td>
                    <td>
                      <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: '13px' }}>{b.pickupCity} → {b.returnCity}</div>
                      <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: '12px', marginTop: '3px' }}>
                        {formatDate(b.pickupDate)} → {formatDate(b.returnDate)} ({days}j)
                      </div>
                    </td>
                    <td style={{ fontFamily: 'monospace', fontWeight: 700, color: 'white' }}>{totalPrice.toLocaleString("fr-MA")} MAD</td>
                    <td>
                      <span className={
                        b.status === "PENDING" ? "badge-yellow" :
                        b.status === "CONFIRMED" ? "badge-green" :
                        b.status === "COMPLETED" ? "badge-blue" : "badge-red"
                      }>
                        {b.status === "PENDING" ? "En attente" :
                         b.status === "CONFIRMED" ? "Confirmé" :
                         b.status === "COMPLETED" ? "Terminé" : "Annulé"}
                      </span>
                    </td>
                    <td style={{ textAlign: 'right' }}>
                      <div style={{ display: 'flex', gap: '6px', justifyContent: 'flex-end' }}>
                        <button
                          onClick={() => setSelectedBooking(b)}
                          style={{ padding: '8px', color: 'rgba(255,255,255,0.55)', borderRadius: '8px', background: 'transparent', border: 'none', cursor: 'pointer', transition: 'all 0.2s' }}
                          title="Détails"
                          onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.08)')}
                          onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                        >
                          <Eye size={16} />
                        </button>
                        {b.status === "PENDING" && (
                          <button
                            onClick={() => handleStatusChange(b.id, "CONFIRMED")}
                            style={{ padding: '8px', color: '#4ade80', borderRadius: '8px', background: 'transparent', border: 'none', cursor: 'pointer', transition: 'all 0.2s' }}
                            title="Valider"
                            onMouseEnter={e => (e.currentTarget.style.background = 'rgba(34,197,94,0.1)')}
                            onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                          >
                            <CheckCircle size={16} />
                          </button>
                        )}
                        <button
                          onClick={() => handleDelete(b.id)}
                          style={{ padding: '8px', color: '#f87171', borderRadius: '8px', background: 'transparent', border: 'none', cursor: 'pointer', transition: 'all 0.2s' }}
                          title="Supprimer"
                          onMouseEnter={e => (e.currentTarget.style.background = 'rgba(239,68,68,0.1)')}
                          onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
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
        <div className="admin-modal-overlay">
          <div className="admin-modal">
            <div className="admin-modal-header">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <h3 style={{ fontSize: '20px', fontWeight: 800, color: 'white', fontFamily: 'var(--font-outfit)' }}>
                    Réservation <span style={{ color: '#ef4444' }}>#{selectedBooking.bookingRef}</span>
                  </h3>
                  <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.4)', marginTop: '4px' }}>
                    Créée le {formatDate(selectedBooking.createdAt)}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedBooking(null)}
                  style={{ color: 'rgba(255,255,255,0.4)', background: 'none', border: 'none', cursor: 'pointer', fontSize: '20px', lineHeight: 1, padding: '4px' }}
                >
                  ✕
                </button>
              </div>
            </div>

            <div className="admin-modal-body">
              {/* Client info */}
              <div style={{ background: 'rgba(255,255,255,0.04)', borderRadius: '14px', padding: '20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1.2px', color: 'rgba(255,255,255,0.4)' }}>Client</div>
                <div style={{ fontSize: '17px', fontWeight: 700, color: 'white' }}>{selectedBooking.fullName}</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'rgba(255,255,255,0.65)', fontSize: '14px' }}>
                  <Phone size={14} color="#ef4444" />
                  {selectedBooking.phone}
                </div>
                {selectedBooking.email && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'rgba(255,255,255,0.65)', fontSize: '14px' }}>
                    <Mail size={14} color="#ef4444" />
                    {selectedBooking.email}
                  </div>
                )}
              </div>

              {/* Véhicule & Trajet */}
              <div style={{ background: 'rgba(255,255,255,0.04)', borderRadius: '14px', padding: '20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1.2px', color: 'rgba(255,255,255,0.4)' }}>Véhicule & Trajet</div>
                <div style={{ fontSize: '16px', fontWeight: 700, color: 'white' }}>{selectedBooking.car.brand} {selectedBooking.car.model}</div>
                <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.6)' }}>
                  📍 Départ: <span style={{ color: 'white' }}>{selectedBooking.pickupCity}</span> — {formatDate(selectedBooking.pickupDate)}
                </div>
                <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.6)' }}>
                  📍 Retour: <span style={{ color: 'white' }}>{selectedBooking.returnCity}</span> — {formatDate(selectedBooking.returnDate)}
                </div>
              </div>

              {selectedBooking.message && (
                <div style={{ background: 'rgba(255,255,255,0.04)', borderRadius: '14px', padding: '20px' }}>
                  <div style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1.2px', color: 'rgba(255,255,255,0.4)', marginBottom: '10px' }}>Message Client</div>
                  <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.7)', fontStyle: 'italic', lineHeight: 1.6 }}>{selectedBooking.message}</p>
                </div>
              )}
            </div>

            <div className="admin-modal-footer">
              <button
                onClick={() => handleStatusChange(selectedBooking.id, "CANCELLED")}
                className="btn-secondary"
              >
                Annuler réservation
              </button>
              <button
                onClick={() => handleStatusChange(selectedBooking.id, "CONFIRMED")}
                className="btn-primary"
                style={{ background: 'linear-gradient(135deg, #16a34a, #15803d)' }}
              >
                ✓ Confirmer
              </button>
              <a
                href={buildWhatsAppUrl(selectedBooking.phone, `Bonjour ${selectedBooking.fullName}, concernant votre réservation #${selectedBooking.bookingRef}...`)}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
                style={{ background: 'linear-gradient(135deg, #16a34a, #15803d)', paddingLeft: '18px', paddingRight: '18px' }}
                title="WhatsApp"
              >
                <Phone size={16} />
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
