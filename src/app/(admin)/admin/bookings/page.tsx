export const dynamic = 'force-dynamic';
import { prisma } from "@/lib/prisma";
import { AdminBookingsClient } from "@/components/admin/AdminBookingsClient";

export const metadata = {
  title: "Gestion des Réservations — SONIC CARS Admin",
};

export default async function AdminBookingsPage() {
  const bookings = await prisma.booking.findMany({
    include: {
      car: { select: { title: true, brand: true, model: true, dailyPrice: true } },
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-6">
      <AdminBookingsClient initialBookings={bookings as any} />
    </div>
  );
}
