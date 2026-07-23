import { Car, Location, CarImage } from "@prisma/client";

export type CarWithDetails = Omit<Car, "dailyPrice"> & {
  dailyPrice: number | string | any;
  location: Location;
  images?: CarImage[];
};

export interface CarImageData {
  id: string;
  url: string;
  alt?: string | null;
  order: number;
}

export interface LocationData {
  id: string;
  name: string;
  slug: string;
  description?: string | null;
  address?: string | null;
  phone?: string | null;
  whatsapp?: string | null;
  email?: string | null;
  mapEmbedUrl?: string | null;
  image?: string | null;
}

export interface BookingData {
  id: string;
  bookingRef: string;
  carId: string;
  car?: CarWithDetails;
  fullName: string;
  phone: string;
  whatsapp?: string | null;
  email: string;
  pickupCity: string;
  returnCity: string;
  pickupDate: Date;
  pickupTime: string;
  returnDate: Date;
  returnTime: string;
  totalDays: number;
  totalPrice?: string | number | null;
  status: string;
  message?: string | null;
  documentUrl?: string | null;
  adminNotes?: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface TestimonialData {
  id: string;
  name: string;
  city?: string | null;
  rating: number;
  comment: string;
  avatar?: string | null;
  published: boolean;
}

export interface FAQData {
  id: string;
  question: string;
  answer: string;
  category?: string | null;
  order: number;
  published: boolean;
}

export interface SiteSettings {
  company_name: string;
  company_tagline: string;
  company_description: string;
  phone_oujda: string;
  phone_tanger: string;
  whatsapp: string;
  email: string;
  address_oujda: string;
  address_tanger: string;
  hours_weekday: string;
  hours_weekend: string;
  seo_title: string;
  seo_description: string;
  facebook_url?: string;
  instagram_url?: string;
  [key: string]: string | undefined;
}

export interface SearchFilters {
  city?: string;
  pickupDate?: string;
  returnDate?: string;
  brand?: string;
  transmission?: string;
  fuelType?: string;
  minPrice?: number;
  maxPrice?: number;
}

export interface DashboardStats {
  totalCars: number;
  availableCars: number;
  pendingBookings: number;
  confirmedBookings: number;
  totalBookings: number;
  recentBookings: BookingData[];
}

export interface AvailabilityBlockData {
  id: string;
  carId: string;
  startDate: Date;
  endDate: Date;
  reason?: string | null;
}
