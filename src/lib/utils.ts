import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { differenceInDays, format, parseISO } from "date-fns";
import { fr } from "date-fns/locale";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(price: number | string): string {
  const num = typeof price === "string" ? parseFloat(price) : price;
  return `${num.toLocaleString("fr-MA")} MAD`;
}

export function formatDate(date: Date | string): string {
  const d = typeof date === "string" ? parseISO(date) : date;
  return format(d, "dd MMMM yyyy", { locale: fr });
}

export function formatDateShort(date: Date | string): string {
  const d = typeof date === "string" ? parseISO(date) : date;
  return format(d, "dd/MM/yyyy");
}

export function calculateDays(startDate: Date | string, endDate: Date | string): number {
  const start = typeof startDate === "string" ? parseISO(startDate) : startDate;
  const end = typeof endDate === "string" ? parseISO(endDate) : endDate;
  const days = differenceInDays(end, start);
  return Math.max(1, days);
}

export function calculateTotalPrice(
  dailyPrice: number,
  weeklyPrice: number | null | undefined,
  monthlyPrice: number | null | undefined,
  days: number
): number {
  if (monthlyPrice && days >= 28) {
    const months = Math.floor(days / 28);
    const remainingDays = days % 28;
    return months * monthlyPrice + remainingDays * dailyPrice;
  }
  if (weeklyPrice && days >= 7) {
    const weeks = Math.floor(days / 7);
    const remainingDays = days % 7;
    return weeks * weeklyPrice + remainingDays * dailyPrice;
  }
  return days * dailyPrice;
}

export function generateBookingRef(): string {
  const date = new Date();
  const year = date.getFullYear();
  const random = Math.floor(Math.random() * 9000) + 1000;
  return `SC-${year}-${random}`;
}

export function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

export function buildWhatsAppUrl(phone: string, message: string): string {
  const cleanPhone = phone.replace(/\s+/g, "").replace(/^\+/, "");
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${cleanPhone}?text=${encodedMessage}`;
}

export function getWhatsAppMessage(
  carName: string,
  pickupDate: string,
  returnDate: string,
  city: string
): string {
  return `Bonjour, je souhaite réserver la ${carName} du ${pickupDate} au ${returnDate} à ${city}. Merci de me confirmer la disponibilité.`;
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + "...";
}

export function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}
