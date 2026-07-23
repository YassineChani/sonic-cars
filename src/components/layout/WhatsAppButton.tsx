"use client";

import { buildWhatsAppUrl } from "@/lib/utils";
import { MessageCircle } from "lucide-react";

export function WhatsAppButton() {
  const phone = process.env.NEXT_PUBLIC_WHATSAPP || "+212600000000";
  const message = "Bonjour SONIC CARS, j'ai besoin d'informations sur la location de voitures.";
  const url = buildWhatsAppUrl(phone, message);

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="whatsapp-float"
      aria-label="Contactez-nous sur WhatsApp"
      title="WhatsApp"
    >
      <MessageCircle size={26} fill="white" color="white" />
    </a>
  );
}
