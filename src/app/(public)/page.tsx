import { HeroSection } from "@/components/home/HeroSection";
import { SearchForm } from "@/components/home/SearchForm";
import { FeaturedCars } from "@/components/home/FeaturedCars";
import { WhyUs } from "@/components/home/WhyUs";
import { HowItWorks } from "@/components/home/HowItWorks";
import { LocationsSection } from "@/components/home/LocationsSection";
import { CTASection } from "@/components/home/CTASection";
import { prisma } from "@/lib/prisma";

export const dynamic = 'force-dynamic';

async function getFeaturedCars() {
  try {
    const cars = await prisma.car.findMany({
      where: { featured: true, availability: true },
      include: { location: true, images: { orderBy: { order: "asc" } } },
      take: 6,
      orderBy: { createdAt: "desc" },
    });
    return cars.length > 0 ? cars : FALLBACK_FEATURED_CARS;
  } catch (error) {
    return FALLBACK_FEATURED_CARS;
  }
}

const FALLBACK_FEATURED_CARS = [
  {
    id: "1",
    title: "Renault Clio 5",
    brand: "Renault",
    model: "Clio 5",
    year: 2023,
    slug: "renault-clio-5-oujda",
    dailyPrice: 0,
    transmission: "Manuelle",
    fuelType: "Diesel",
    seats: 5,
    doors: 5,
    luggageCapacity: 2,
    airConditioning: true,
    availability: true,
    featured: true,
    mainImage: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Renault_Clio_V_-_front.jpg/1280px-Renault_Clio_V_-_front.jpg",
    location: { id: "1", name: "Oujda", slug: "oujda" },
    images: []
  },
  {
    id: "2",
    title: "Peugeot 208",
    brand: "Peugeot",
    model: "208",
    year: 2023,
    slug: "peugeot-208-tanger",
    dailyPrice: 0,
    transmission: "Manuelle",
    fuelType: "Diesel",
    seats: 5,
    doors: 5,
    luggageCapacity: 2,
    airConditioning: true,
    availability: true,
    featured: true,
    mainImage: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/2019_Peugeot_208_1.2_PureTech_Active_in_Bianca_White%2C_front_8.24.19.jpg/1280px-2019_Peugeot_208_1.2_PureTech_Active_in_Bianca_White%2C_front_8.24.19.jpg",
    location: { id: "2", name: "Tanger", slug: "tanger" },
    images: []
  },
  {
    id: "3",
    title: "Dacia Sandero Stepway",
    brand: "Dacia",
    model: "Sandero Stepway",
    year: 2023,
    slug: "dacia-sandero-stepway-oujda",
    dailyPrice: 0,
    transmission: "Manuelle",
    fuelType: "Diesel",
    seats: 5,
    doors: 5,
    luggageCapacity: 3,
    airConditioning: true,
    availability: true,
    featured: true,
    mainImage: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/2021_Dacia_Sandero_Stepway_Comfort_TCe_90_in_Cedar_Green%2C_front_8.1.21.jpg/1280px-2021_Dacia_Sandero_Stepway_Comfort_TCe_90_in_Cedar_Green%2C_front_8.1.21.jpg",
    location: { id: "1", name: "Oujda", slug: "oujda" },
    images: []
  },
  {
    id: "4",
    title: "Volkswagen T-Roc Sport",
    brand: "Volkswagen",
    model: "T-Roc Sport",
    year: 2024,
    slug: "volkswagen-t-roc-sport-tanger",
    dailyPrice: 0,
    transmission: "Automatique",
    fuelType: "Diesel",
    seats: 5,
    doors: 5,
    luggageCapacity: 4,
    airConditioning: true,
    availability: true,
    featured: true,
    mainImage: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/VW_T-Roc_R-Line_facelift.jpg/1280px-VW_T-Roc_R-Line_facelift.jpg",
    location: { id: "2", name: "Tanger", slug: "tanger" },
    images: []
  },
  {
    id: "5",
    title: "Seat Leon FR",
    brand: "Seat",
    model: "Leon FR",
    year: 2023,
    slug: "seat-leon-fr-oujda",
    dailyPrice: 0,
    transmission: "Automatique",
    fuelType: "Diesel",
    seats: 5,
    doors: 5,
    luggageCapacity: 3,
    airConditioning: true,
    availability: true,
    featured: true,
    mainImage: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/SEAT_Le%C3%B3n_FR_%28IV%2C_Typ_KL%29_%E2%80%93_f_18062021.jpg/1280px-SEAT_Le%C3%B3n_FR_%28IV%2C_Typ_KL%29_%E2%80%93_f_18062021.jpg",
    location: { id: "1", name: "Oujda", slug: "oujda" },
    images: []
  },
  {
    id: "6",
    title: "Peugeot 308",
    brand: "Peugeot",
    model: "308",
    year: 2023,
    slug: "peugeot-308-tanger",
    dailyPrice: 0,
    transmission: "Automatique",
    fuelType: "Diesel",
    seats: 5,
    doors: 5,
    luggageCapacity: 3,
    airConditioning: true,
    availability: true,
    featured: true,
    mainImage: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Peugeot_308_GT_Pack_-_2021_%28cropped%29.jpg/1280px-Peugeot_308_GT_Pack_-_2021_%28cropped%29.jpg",
    location: { id: "2", name: "Tanger", slug: "tanger" },
    images: []
  }
] as any;

export default async function HomePage() {
  const featuredCars = await getFeaturedCars();

  return (
    <>
      <HeroSection />
      <SearchForm />
      <FeaturedCars cars={featuredCars} />
      <WhyUs />
      <HowItWorks />
      <LocationsSection />
      <CTASection />
    </>
  );
}
