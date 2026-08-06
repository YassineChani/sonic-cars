import Link from "next/link";
export const dynamic = 'force-dynamic';
import { Car, CalendarCheck, Clock, CheckCircle, ArrowRight, Eye, AlertTriangle } from "lucide-react";

export const metadata = {
  title: "Tableau de Bord — SONIC CARS Admin",
};

async function getStats() {
  try {
    const { prisma } = await import("@/lib/prisma");
    const { formatDate } = await import("@/lib/utils");

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
      ok: true,
      totalCars,
      availableCars,
      pendingBookings,
      confirmedBookings,
      totalBookings,
      recentBookings,
      formatDate,
    };
  } catch (error) {
    console.error("Dashboard stats error:", error);
    return {
      ok: false,
      totalCars: 0,
      availableCars: 0,
      pendingBookings: 0,
      confirmedBookings: 0,
      totalBookings: 0,
      recentBookings: [],
      formatDate: (d: any) => new Date(d).toLocaleDateString("fr-FR"),
    };
  }
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
      href: "/admin/cars",
    },
    {
      title: "Réservations en Attente",
      value: stats.pendingBookings,
      subtext: "Nécessitent une validation",
      icon: Clock,
      color: "text-amber-400",
      bg: "bg-amber-400/10",
      border: "border-amber-400/20",
      href: "/admin/bookings",
    },
    {
      title: "Réservations Confirmées",
      value: stats.confirmedBookings,
      subtext: "Contrats actifs / à venir",
      icon: CheckCircle,
      color: "text-emerald-400",
      bg: "bg-emerald-400/10",
      border: "border-emerald-400/20",
      href: "/admin/bookings",
    },
    {
      title: "Total Réservations",
      value: stats.totalBookings,
      subtext: "Historique global",
      icon: CalendarCheck,
      color: "text-red-400",
      bg: "bg-red-400/10",
      border: "border-red-400/20",
      href: "/admin/bookings",
    },
  ];

  return (
    <div className="space-y-10">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-black text-white" style={{ fontFamily: "var(--font-outfit)" }}>
          Tableau de <span className="text-red-500">Bord</span>
        </h1>
        <p className="text-white/40 text-sm mt-2">Vue d'ensemble de l'activité SONIC CARS</p>
      </div>

      {/* DB Warning */}
      {!stats.ok && (
        <div className="flex items-center gap-3 p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 text-sm">
          <AlertTriangle size={20} className="flex-shrink-0" />
          <div>
            <strong>Connexion à la base de données non disponible.</strong>{" "}
            Les statistiques affichées sont à zéro. Vérifiez la variable <code className="bg-white/10 px-1.5 py-0.5 rounded text-xs">DATABASE_URL</code> dans les paramètres Netlify.
          </div>
        </div>
      )}

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <Link
              key={card.title}
              href={card.href}
              className={`block p-6 rounded-2xl border ${card.border} ${card.bg} space-y-4 hover:scale-[1.02] transition-transform`}
            >
              <div className="flex justify-between items-center">
                <span className="text-white/50 text-xs font-semibold uppercase tracking-wider">{card.title}</span>
                <div className={`p-2.5 rounded-xl ${card.bg} border ${card.border}`}>
                  <Icon size={20} className={card.color} />
                </div>
              </div>
              <div className="text-5xl font-black text-white" style={{ fontFamily: "var(--font-outfit)" }}>
                {card.value}
              </div>
              <p className="text-white/40 text-xs">{card.subtext}</p>
            </Link>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Gérer les Véhicules", href: "/admin/cars", emoji: "🚗" },
          { label: "Voir les Réservations", href: "/admin/bookings", emoji: "📋" },
          { label: "Gérer les Agences", href: "/admin/locations", emoji: "📍" },
          { label: "Paramètres du Site", href: "/admin/settings", emoji: "⚙️" },
        ].map((action) => (
          <Link
            key={action.href}
            href={action.href}
            className="flex items-center gap-3 p-4 rounded-xl bg-white/5 border border-white/10 hover:border-red-500/40 hover:bg-red-500/5 transition-all group"
          >
            <span className="text-2xl">{action.emoji}</span>
            <span className="text-white/80 text-sm font-semibold group-hover:text-white transition-colors">{action.label}</span>
            <ArrowRight size={14} className="ml-auto text-white/30 group-hover:text-red-400 transition-colors" />
          </Link>
        ))}
      </div>

      {/* Recent Bookings */}
      <div className="glass border border-white/10 rounded-2xl p-6 md:p-8 space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-xl font-bold text-white" style={{ fontFamily: "var(--font-outfit)" }}>
              Dernières Réservations
            </h2>
            <p className="text-white/40 text-xs mt-1">Les 5 demandes les plus récentes</p>
          </div>
          <Link
            href="/admin/bookings"
            className="text-xs text-red-400 hover:text-red-300 flex items-center gap-1.5 font-semibold px-4 py-2 rounded-lg border border-red-500/20 bg-red-500/5 hover:bg-red-500/10 transition-all"
          >
            Voir tout
            <ArrowRight size={14} />
          </Link>
        </div>

        {stats.recentBookings.length > 0 ? (
          <div className="overflow-x-auto -mx-2">
            <table className="w-full text-left text-sm text-white/80">
              <thead className="bg-white/5 text-white/40 text-xs uppercase border-b border-white/10">
                <tr>
                  <th className="p-4">Réf</th>
                  <th className="p-4">Client</th>
                  <th className="p-4">Véhicule</th>
                  <th className="p-4">Période</th>
                  <th className="p-4">Statut</th>
                  <th className="p-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {stats.recentBookings.map((b: any) => (
                  <tr key={b.id} className="hover:bg-white/5 transition-colors">
                    <td className="p-4 font-mono font-bold text-red-400">{b.bookingRef}</td>
                    <td className="p-4">
                      <div className="font-semibold text-white">{b.fullName}</div>
                      <div className="text-white/40 text-xs mt-0.5">{b.phone}</div>
                    </td>
                    <td className="p-4">
                      {b.car.brand} {b.car.model}
                    </td>
                    <td className="p-4 text-xs">
                      {stats.formatDate(b.pickupDate)} → {stats.formatDate(b.returnDate)}
                    </td>
                    <td className="p-4">
                      <span
                        className={`px-3 py-1.5 rounded-full text-xs font-semibold ${
                          b.status === "PENDING"
                            ? "bg-amber-500/10 border border-amber-500/20 text-amber-400"
                            : b.status === "CONFIRMED"
                            ? "bg-emerald-500/10 border border-emerald-500/20 text-emerald-400"
                            : "bg-red-500/10 border border-red-500/20 text-red-400"
                        }`}
                      >
                        {b.status === "PENDING" ? "En attente" : b.status === "CONFIRMED" ? "Confirmé" : b.status}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <Link
                        href="/admin/bookings"
                        className="p-2 inline-block text-white/50 hover:text-white rounded-lg hover:bg-white/10 transition-all"
                      >
                        <Eye size={16} />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-12 text-white/30">
            <CalendarCheck size={48} className="mx-auto mb-4 text-white/15" />
            <p className="text-sm font-medium">Aucune réservation pour le moment</p>
            <p className="text-xs mt-1">Les nouvelles réservations clients apparaîtront ici automatiquement.</p>
          </div>
        )}
      </div>
    </div>
  );
}
