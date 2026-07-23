import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

type Params = { params: Promise<{ id: string }> };

export async function GET(_req: NextRequest, { params }: Params) {
  try {
    const { id } = await params;
    // Support both ID and slug lookups
    const car = await prisma.car.findFirst({
      where: { OR: [{ id }, { slug: id }] },
      include: {
        location: true,
        images: { orderBy: { order: "asc" } },
      },
    });

    if (!car) {
      return NextResponse.json({ error: "Véhicule non trouvé" }, { status: 404 });
    }

    return NextResponse.json(car);
  } catch (error) {
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

export async function PUT(request: NextRequest, { params }: Params) {
  try {
    const { id } = await params;
    const body = await request.json();

    const car = await prisma.car.update({
      where: { id },
      data: {
        title: body.title,
        brand: body.brand,
        model: body.model,
        year: parseInt(body.year),
        locationId: body.locationId,
        dailyPrice: parseFloat(body.dailyPrice),
        weeklyPrice: body.weeklyPrice ? parseFloat(body.weeklyPrice) : null,
        monthlyPrice: body.monthlyPrice ? parseFloat(body.monthlyPrice) : null,
        transmission: body.transmission,
        fuelType: body.fuelType,
        seats: parseInt(body.seats),
        doors: parseInt(body.doors),
        luggageCapacity: parseInt(body.luggageCapacity),
        airConditioning: body.airConditioning ?? true,
        mileage: body.mileage,
        availability: body.availability,
        featured: body.featured,
        mainImage: body.mainImage,
        description: body.description,
        features: JSON.stringify(body.features || []),
        pickupLocation: body.pickupLocation,
        returnLocation: body.returnLocation,
        insuranceNotes: body.insuranceNotes,
        rentalNotes: body.rentalNotes,
      },
      include: { location: true, images: true },
    });

    return NextResponse.json(car);
  } catch (error: any) {
    console.error("Car PUT error:", error);
    return NextResponse.json({ error: "Erreur lors de la mise à jour" }, { status: 500 });
  }
}

export async function DELETE(_req: NextRequest, { params }: Params) {
  try {
    const { id } = await params;
    await prisma.car.delete({ where: { id } });
    return NextResponse.json({ message: "Véhicule supprimé" });
  } catch (error) {
    return NextResponse.json({ error: "Erreur lors de la suppression" }, { status: 500 });
  }
}
