export const dynamic = 'force-dynamic';
import { prisma } from "@/lib/prisma";
import { AdminLocationsClient } from "@/components/admin/AdminLocationsClient";

export const metadata = {
  title: "Gestion des Agences — SONIC CARS Admin",
};

export default async function AdminLocationsPage() {
  const locations = await prisma.location.findMany({
    include: { _count: { select: { cars: true } } },
    orderBy: { name: "asc" },
  });

  return (
    <div className="space-y-6">
      <AdminLocationsClient initialLocations={locations} />
    </div>
  );
}
