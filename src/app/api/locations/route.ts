import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const locations = await prisma.location.findMany({
      include: {
        cars: {
          where: { availability: true },
          include: { images: true },
          orderBy: { createdAt: "desc" },
        },
      },
    });
    return NextResponse.json(locations);
  } catch (error) {
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, ...data } = body;

    const location = await prisma.location.update({
      where: { id },
      data,
    });

    return NextResponse.json(location);
  } catch (error) {
    return NextResponse.json({ error: "Erreur lors de la mise à jour" }, { status: 500 });
  }
}
