import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import { join } from "path";
import { v4 as uuidv4 } from "uuid";
import { prisma } from "@/lib/prisma";

const ALLOWED_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
const MAX_SIZE = 10 * 1024 * 1024; // 10MB

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;
    const carId = formData.get("carId") as string | null;
    const type = formData.get("type") as string | null; // "main" | "gallery"

    if (!file) {
      return NextResponse.json({ error: "Aucun fichier fourni" }, { status: 400 });
    }

    if (!ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json(
        { error: "Type de fichier non autorisé. Utilisez JPG, PNG ou WebP." },
        { status: 400 }
      );
    }

    if (file.size > MAX_SIZE) {
      return NextResponse.json(
        { error: "Fichier trop volumineux. Maximum 10MB." },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const ext = file.type.split("/")[1].replace("jpeg", "jpg");
    const filename = `${uuidv4()}.${ext}`;

    const uploadDir = join(process.cwd(), "public", "uploads");
    await mkdir(uploadDir, { recursive: true });

    const filepath = join(uploadDir, filename);
    await writeFile(filepath, buffer);

    const url = `/uploads/${filename}`;

    // If carId provided, save to CarImage table
    if (carId && type === "gallery") {
      const carImage = await prisma.carImage.create({
        data: { carId, url, alt: file.name },
      });
      return NextResponse.json({ url, imageId: carImage.id });
    }

    // If main image, update car
    if (carId && type === "main") {
      await prisma.car.update({
        where: { id: carId },
        data: { mainImage: url },
      });
    }

    return NextResponse.json({ url });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json({ error: "Erreur lors du téléchargement" }, { status: 500 });
  }
}

// DELETE a car image
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const imageId = searchParams.get("imageId");

    if (!imageId) {
      return NextResponse.json({ error: "imageId requis" }, { status: 400 });
    }

    await prisma.carImage.delete({ where: { id: imageId } });
    return NextResponse.json({ message: "Image supprimée" });
  } catch (error) {
    return NextResponse.json({ error: "Erreur lors de la suppression" }, { status: 500 });
  }
}
