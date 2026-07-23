import { prisma } from "@/lib/prisma";
import { AdminCarsClient } from "@/components/admin/AdminCarsClient";

export const metadata = {
  title: "Gestion de la Flotte — SONIC CARS Admin",
};

export default async function AdminCarsPage() {
  const [cars, locations] = await Promise.all([
    prisma.car.findMany({
      include: { location: true },
      orderBy: { createdAt: "desc" },
    }),
    prisma.location.findMany(),
  ]);

  return (
    <div className="space-y-6">
      <AdminCarsClient initialCars={cars as any} locations={locations} />
    </div>
  );
}
