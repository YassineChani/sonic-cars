import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { generateBookingRef } from "@/lib/utils";
import { bookingSchema } from "@/lib/validations";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");
    const city = searchParams.get("city");
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "20");

    const where: any = {};
    if (status && status !== "all") where.status = status;
    if (city && city !== "all") where.pickupCity = { contains: city, mode: "insensitive" };

    const [bookings, total] = await Promise.all([
      prisma.booking.findMany({
        where,
        include: { car: { include: { location: true } } },
        orderBy: { createdAt: "desc" },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.booking.count({ where }),
    ]);

    return NextResponse.json({ bookings, total, page, pages: Math.ceil(total / limit) });
  } catch (error) {
    console.error("Bookings GET error:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate input
    const validation = bookingSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { error: "Données invalides", details: validation.error.issues },
        { status: 400 }
      );
    }

    const data = validation.data;

    // Check car exists and is available
    const car = await prisma.car.findUnique({
      where: { id: data.carId },
      include: { location: true },
    });

    if (!car) {
      return NextResponse.json({ error: "Véhicule non trouvé" }, { status: 404 });
    }

    if (!car.availability) {
      return NextResponse.json(
        { error: "Ce véhicule n'est pas disponible" },
        { status: 409 }
      );
    }

    // Check date conflicts with existing confirmed bookings
    const pickupDate = new Date(data.pickupDate);
    const returnDate = new Date(data.returnDate);

    if (returnDate <= pickupDate) {
      return NextResponse.json(
        { error: "La date de retour doit être après la date de départ" },
        { status: 400 }
      );
    }

    const conflictingBooking = await prisma.booking.findFirst({
      where: {
        carId: data.carId,
        status: { in: ["CONFIRMED", "PENDING"] },
        OR: [
          { pickupDate: { lte: returnDate }, returnDate: { gte: pickupDate } },
        ],
      },
    });

    if (conflictingBooking) {
      return NextResponse.json(
        { error: "Ce véhicule n'est pas disponible pour ces dates" },
        { status: 409 }
      );
    }

    // Check availability blocks
    const block = await prisma.availabilityBlock.findFirst({
      where: {
        carId: data.carId,
        OR: [
          { startDate: { lte: returnDate }, endDate: { gte: pickupDate } },
        ],
      },
    });

    if (block) {
      return NextResponse.json(
        { error: "Ce véhicule est bloqué pour maintenance sur ces dates" },
        { status: 409 }
      );
    }

    // Calculate total days and price
    const totalDays = Math.max(
      1,
      Math.ceil((returnDate.getTime() - pickupDate.getTime()) / (1000 * 60 * 60 * 24))
    );

    const totalPrice = totalDays * Number(car.dailyPrice);

    // Create booking
    const booking = await prisma.booking.create({
      data: {
        bookingRef: generateBookingRef(),
        carId: data.carId,
        fullName: data.fullName,
        phone: data.phone,
        whatsapp: data.whatsapp,
        email: data.email,
        pickupCity: data.pickupCity,
        returnCity: data.returnCity,
        pickupDate,
        pickupTime: data.pickupTime,
        returnDate,
        returnTime: data.returnTime,
        totalDays,
        totalPrice,
        message: data.message,
        status: "PENDING",
      },
      include: { car: { include: { location: true } } },
    });

    // Send emails (non-blocking)
    try {
      const { sendBookingConfirmationEmail, sendAdminNotificationEmail } = await import("@/lib/email");
      await Promise.all([
        sendBookingConfirmationEmail({
          bookingRef: booking.bookingRef,
          fullName: booking.fullName,
          email: booking.email,
          carTitle: car.title,
          pickupDate: pickupDate.toLocaleDateString("fr-FR"),
          returnDate: returnDate.toLocaleDateString("fr-FR"),
          pickupCity: booking.pickupCity,
          returnCity: booking.returnCity,
          totalDays,
          totalPrice,
        }),
        sendAdminNotificationEmail({
          bookingRef: booking.bookingRef,
          fullName: booking.fullName,
          email: booking.email,
          phone: booking.phone,
          carTitle: car.title,
          pickupDate: pickupDate.toLocaleDateString("fr-FR"),
          returnDate: returnDate.toLocaleDateString("fr-FR"),
          pickupCity: booking.pickupCity,
        }),
      ]);
    } catch (emailError) {
      console.error("Email send error (non-critical):", emailError);
    }

    return NextResponse.json(booking, { status: 201 });
  } catch (error) {
    console.error("Booking POST error:", error);
    return NextResponse.json({ error: "Erreur lors de la création de la réservation" }, { status: 500 });
  }
}
