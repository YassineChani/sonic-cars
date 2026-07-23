import { z } from "zod";

// ─── Booking validation ─────────────────────────────────────────
export const bookingSchema = z.object({
  carId: z.string().min(1, "Veuillez sélectionner un véhicule"),
  fullName: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
  phone: z.string().min(8, "Numéro de téléphone invalide"),
  whatsapp: z.string().optional(),
  email: z.string().email("Adresse email invalide"),
  pickupCity: z.string().min(1, "Veuillez sélectionner une ville de départ"),
  returnCity: z.string().min(1, "Veuillez sélectionner une ville de retour"),
  pickupDate: z.string().min(1, "Veuillez sélectionner une date de départ"),
  pickupTime: z.string().min(1, "Veuillez sélectionner une heure de départ"),
  returnDate: z.string().min(1, "Veuillez sélectionner une date de retour"),
  returnTime: z.string().min(1, "Veuillez sélectionner une heure de retour"),
  message: z.string().optional(),
});

export type BookingFormData = z.infer<typeof bookingSchema>;

// ─── Car validation ──────────────────────────────────────────────
export const carSchema = z.object({
  title: z.string().min(2, "Le titre doit contenir au moins 2 caractères"),
  brand: z.string().min(1, "La marque est requise"),
  model: z.string().min(1, "Le modèle est requis"),
  year: z.number().int().min(2000).max(new Date().getFullYear() + 1),
  locationId: z.string().min(1, "La ville est requise"),
  dailyPrice: z.number().positive("Le prix journalier doit être positif"),
  weeklyPrice: z.number().positive().optional().nullable(),
  monthlyPrice: z.number().positive().optional().nullable(),
  transmission: z.enum(["Manuelle", "Automatique"]),
  fuelType: z.enum(["Essence", "Diesel", "Électrique", "Hybride"]),
  seats: z.number().int().min(1).max(9),
  doors: z.number().int().min(2).max(5),
  luggageCapacity: z.number().int().min(0).max(10),
  airConditioning: z.boolean(),
  mileage: z.string().min(1),
  availability: z.boolean(),
  featured: z.boolean(),
  description: z.string().optional(),
  features: z.array(z.string()).default([]),
  pickupLocation: z.string().optional(),
  returnLocation: z.string().optional(),
  insuranceNotes: z.string().optional(),
  rentalNotes: z.string().optional(),
});

export type CarFormData = z.infer<typeof carSchema>;

// ─── Contact form validation ──────────────────────────────────────
export const contactSchema = z.object({
  name: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
  email: z.string().email("Adresse email invalide"),
  phone: z.string().optional(),
  subject: z.string().min(3, "Le sujet doit contenir au moins 3 caractères"),
  message: z.string().min(10, "Le message doit contenir au moins 10 caractères"),
});

export type ContactFormData = z.infer<typeof contactSchema>;

// ─── FAQ validation ───────────────────────────────────────────────
export const faqSchema = z.object({
  question: z.string().min(5, "La question doit contenir au moins 5 caractères"),
  answer: z.string().min(10, "La réponse doit contenir au moins 10 caractères"),
  category: z.string().optional(),
  order: z.number().int().min(0),
  published: z.boolean(),
});

// ─── Testimonial validation ───────────────────────────────────────
export const testimonialSchema = z.object({
  name: z.string().min(2, "Le nom est requis"),
  city: z.string().optional(),
  rating: z.number().int().min(1).max(5),
  comment: z.string().min(10, "Le commentaire doit contenir au moins 10 caractères"),
  published: z.boolean(),
});

// ─── Settings validation ──────────────────────────────────────────
export const settingsSchema = z.object({
  company_name: z.string().min(1),
  company_tagline: z.string().min(1),
  company_description: z.string().min(10),
  phone_oujda: z.string().min(8),
  phone_tanger: z.string().min(8),
  whatsapp: z.string().min(8),
  email: z.string().email(),
  address_oujda: z.string().min(5),
  address_tanger: z.string().min(5),
  hours_weekday: z.string(),
  hours_weekend: z.string(),
  seo_title: z.string().min(10),
  seo_description: z.string().min(20),
});

// ─── Availability block validation ────────────────────────────────
export const availabilityBlockSchema = z.object({
  carId: z.string().min(1, "Véhicule requis"),
  startDate: z.string().min(1, "Date de début requise"),
  endDate: z.string().min(1, "Date de fin requise"),
  reason: z.string().optional(),
});

// ─── Admin login validation ───────────────────────────────────────
export const loginSchema = z.object({
  email: z.string().email("Email invalide"),
  password: z.string().min(6, "Mot de passe invalide"),
});

export type LoginFormData = z.infer<typeof loginSchema>;
