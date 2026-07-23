import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const [
      totalCars,
      availableCars,
      pendingBookings,
      confirmedBookings,
      totalBookings,
      recentBookings,
    ] = await Promise.all([
      prisma.car.count(),
      prisma.car.count({ where: { availability: true } }),
      prisma.booking.count({ where: { status: "PENDING" } }),
      prisma.booking.count({ where: { status: "CONFIRMED" } }),
      prisma.booking.count(),
      prisma.booking.findMany({
        take: 5,
        orderBy: { createdAt: "desc" },
        include: { car: { select: { title: true, mainImage: true } } },
      }),
    ]);

    return NextResponse.json({
      totalCars,
      availableCars,
      pendingBookings,
      confirmedBookings,
      totalBookings,
      recentBookings,
    });
  } catch (error) {
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
