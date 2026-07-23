import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const city = searchParams.get("city");
    const brand = searchParams.get("brand");
    const transmission = searchParams.get("transmission");
    const fuelType = searchParams.get("fuelType");
    const minPrice = searchParams.get("minPrice");
    const maxPrice = searchParams.get("maxPrice");
    const featured = searchParams.get("featured");
    const available = searchParams.get("available");

    const where: any = {};

    if (city && city !== "all") {
      where.location = { slug: city };
    }
    if (brand && brand !== "all") {
      where.brand = { contains: brand, mode: "insensitive" };
    }
    if (transmission && transmission !== "all") {
      where.transmission = transmission;
    }
    if (fuelType && fuelType !== "all") {
      where.fuelType = fuelType;
    }
    if (minPrice) {
      where.dailyPrice = { ...where.dailyPrice, gte: parseFloat(minPrice) };
    }
    if (maxPrice) {
      where.dailyPrice = { ...where.dailyPrice, lte: parseFloat(maxPrice) };
    }
    if (featured === "true") {
      where.featured = true;
    }
    if (available === "true") {
      where.availability = true;
    }

    const cars = await prisma.car.findMany({
      where,
      include: {
        location: true,
        images: { orderBy: { order: "asc" } },
      },
      orderBy: [{ featured: "desc" }, { createdAt: "desc" }],
    });

    return NextResponse.json(cars);
  } catch (error) {
    console.error("Cars GET error:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const car = await prisma.car.create({
      data: {
        title: body.title,
        brand: body.brand,
        model: body.model,
        year: parseInt(body.year),
        slug: body.slug,
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
        mileage: body.mileage || "Illimité",
        availability: body.availability ?? true,
        featured: body.featured ?? false,
        mainImage: body.mainImage,
        description: body.description,
        features: JSON.stringify(body.features || []),
        pickupLocation: body.pickupLocation,
        returnLocation: body.returnLocation,
        insuranceNotes: body.insuranceNotes,
        rentalNotes: body.rentalNotes,
      },
      include: {
        location: true,
        images: true,
      },
    });

    return NextResponse.json(car, { status: 201 });
  } catch (error: any) {
    console.error("Car POST error:", error);
    if (error.code === "P2002") {
      return NextResponse.json({ error: "Un véhicule avec ce slug existe déjà" }, { status: 400 });
    }
    return NextResponse.json({ error: "Erreur lors de la création" }, { status: 500 });
  }
}
