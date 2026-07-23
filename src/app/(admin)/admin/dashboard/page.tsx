import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Car, CalendarCheck, Clock, CheckCircle, ArrowRight, Eye } from "lucide-react";
import { formatDate } from "@/lib/utils";

export const metadata = {
  title: "Tableau de Bord — SONIC CARS Admin",
};

async function getStats() {
  const [totalCars, availableCars, pendingBookings, confirmedBookings, totalBookings, recentBookings] =
    await Promise.all([
      prisma.car.count(),
      prisma.car.count({ where: { availability: true } }),
      prisma.booking.count({ where: { status: "PENDING" } }),
      prisma.booking.count({ where: { status: "CONFIRMED" } }),
      prisma.booking.count(),
      prisma.booking.findMany({
        take: 5,
        orderBy: { createdAt: "desc" },
        include: { car: { select: { title: true, brand: true, model: true, mainImage: true } } },
      }),
    ]);

  return {
    totalCars,
    availableCars,
    pendingBookings,
    confirmedBookings,
    totalBookings,
    recentBookings,
  };
}

export default async function AdminDashboardPage() {
  const stats = await getStats();

  const cards = [
    {
      title: "Total Véhicules",
      value: stats.totalCars,
      subtext: `${stats.availableCars} disponibles actuellement`,
      icon: Car,
      color: "text-blue-400",
      bg: "bg-blue-400/10",
      border: "border-blue-400/20",
    },
    {
      title: "Réservations en Attente",
      value: stats.pendingBookings,
      subtext: "Nécessitent une validation",
      icon: Clock,
      color: "text-amber-400",
      bg: "bg-amber-400/10",
      border: "border-amber-400/20",
    },
    {
      title: "Réservations Confirmées",
      value: stats.confirmedBookings,
      subtext: "Contrats actifs / à venir",
      icon: CheckCircle,
      color: "text-emerald-400",
      bg: "bg-emerald-400/10",
      border: "border-emerald-400/20",
    },
    {
      title: "Total Réservations",
      value: stats.totalBookings,
      subtext: "Historique global",
      icon: CalendarCheck,
      color: "text-red-400",
      bg: "bg-red-400/10",
      border: "border-red-400/20",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-black text-white" style={{ fontFamily: "var(--font-outfit)" }}>
          Tableau de <span className="text-red-500">Bord</span>
        </h1>
        <p className="text-white/40 text-sm mt-1">Vue d'ensemble de l'activité SONIC CARS</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <div
              key={card.title}
              className={`p-6 rounded-2xl border ${card.border} ${card.bg} space-y-3`}
            >
              <div className="flex justify-between items-center">
                <span className="text-white/50 text-xs font-semibold uppercase">{card.title}</span>
                <div className={`p-2 rounded-lg ${card.bg} border ${card.border}`}>
                  <Icon size={18} className={card.color} />
                </div>
              </div>
              <div className="text-4xl font-black text-white" style={{ fontFamily: "var(--font-outfit)" }}>
                {card.value}
              </div>
              <p className="text-white/40 text-xs">{card.subtext}</p>
            </div>
          );
        })}
      </div>

      {/* Recent Bookings */}
      <div className="glass border border-white/10 rounded-2xl p-6 space-y-4">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-lg font-bold text-white" style={{ fontFamily: "var(--font-outfit)" }}>
              Dernières Réservations
            </h2>
            <p className="text-white/40 text-xs">Les 5 demandes les plus récentes</p>
          </div>
          <Link
            href="/admin/bookings"
            className="text-xs text-red-400 hover:text-red-300 flex items-center gap-1 font-semibold"
          >
            Voir tout
            <ArrowRight size={14} />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-white/80">
            <thead className="bg-white/5 text-white/40 text-xs uppercase border-b border-white/10">
              <tr>
                <th className="p-3">Réf</th>
                <th className="p-3">Client</th>
                <th className="p-3">Véhicule</th>
                <th className="p-3">Période</th>
                <th className="p-3">Statut</th>
                <th className="p-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {stats.recentBookings.map((b) => (
                <tr key={b.id} className="hover:bg-white/5 transition-colors">
                  <td className="p-3 font-mono font-bold text-red-400">{b.bookingRef}</td>
                  <td className="p-3">
                    <div className="font-semibold text-white">{b.fullName}</div>
                    <div className="text-white/40 text-xs">{b.phone}</div>
                  </td>
                  <td className="p-3">
                    {b.car.brand} {b.car.model}
                  </td>
                  <td className="p-3 text-xs">
                    {formatDate(b.pickupDate)} → {formatDate(b.returnDate)}
                  </td>
                  <td className="p-3">
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
                  <td className="p-3 text-right">
                    <Link
                      href="/admin/bookings"
                      className="p-1.5 inline-block text-white/50 hover:text-white rounded-lg hover:bg-white/10"
                    >
                      <Eye size={16} />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
