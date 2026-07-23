import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET: Check availability for a car on given dates
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const carId = searchParams.get("carId");
    const startDate = searchParams.get("startDate");
    const endDate = searchParams.get("endDate");

    if (!carId || !startDate || !endDate) {
      return NextResponse.json(
        { error: "carId, startDate et endDate sont requis" },
        { status: 400 }
      );
    }

    const start = new Date(startDate);
    const end = new Date(endDate);

    const [car, conflictingBooking, block] = await Promise.all([
      prisma.car.findUnique({ where: { id: carId }, select: { availability: true } }),
      prisma.booking.findFirst({
        where: {
          carId,
          status: { in: ["CONFIRMED", "PENDING"] },
          pickupDate: { lte: end },
          returnDate: { gte: start },
        },
      }),
      prisma.availabilityBlock.findFirst({
        where: {
          carId,
          startDate: { lte: end },
          endDate: { gte: start },
        },
      }),
    ]);

    if (!car) {
      return NextResponse.json({ error: "Véhicule non trouvé" }, { status: 404 });
    }

    const isAvailable = car.availability && !conflictingBooking && !block;

    return NextResponse.json({
      available: isAvailable,
      reason: !car.availability
        ? "Véhicule non disponible"
        : conflictingBooking
        ? "Dates déjà réservées"
        : block
        ? `Bloqué pour ${block.reason || "maintenance"}`
        : null,
    });
  } catch (error) {
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

// POST: Create availability block (admin)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const block = await prisma.availabilityBlock.create({
      data: {
        carId: body.carId,
        startDate: new Date(body.startDate),
        endDate: new Date(body.endDate),
        reason: body.reason || "maintenance",
      },
    });

    return NextResponse.json(block, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Erreur lors du blocage" }, { status: 500 });
  }
}

// DELETE: Remove availability block
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) return NextResponse.json({ error: "ID requis" }, { status: 400 });

    await prisma.availabilityBlock.delete({ where: { id } });
    return NextResponse.json({ message: "Blocage supprimé" });
  } catch (error) {
    return NextResponse.json({ error: "Erreur lors de la suppression" }, { status: 500 });
  }
}
