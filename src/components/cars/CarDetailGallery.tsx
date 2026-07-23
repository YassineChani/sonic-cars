"use client";

import { useState } from "react";
import Image from "next/image";

interface CarDetailGalleryProps {
  images: string[];
  title: string;
}

export function CarDetailGallery({ images, title }: CarDetailGalleryProps) {
  const [activeImage, setActiveImage] = useState(images[0] || "/placeholder-car.jpg");

  return (
    <div className="space-y-4">
      {/* Main Large Image */}
      <div className="relative h-[350px] md:h-[450px] rounded-2xl overflow-hidden glass border border-white/10">
        <Image
          src={activeImage}
          alt={title}
          fill
          priority
          className="object-cover transition-all duration-300"
          sizes="(max-width: 1024px) 100vw, 66vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-none">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => setActiveImage(img)}
              className={`relative w-24 h-20 rounded-xl overflow-hidden flex-shrink-0 border-2 transition-all ${
                activeImage === img ? "border-red-500 scale-95" : "border-white/10 opacity-70 hover:opacity-100"
              }`}
            >
              <Image src={img} alt={`${title} ${i}`} fill className="object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
