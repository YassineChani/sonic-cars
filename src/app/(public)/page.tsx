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
    return await prisma.car.findMany({
      where: { featured: true, availability: true },
      include: { location: true, images: { orderBy: { order: "asc" } } },
      take: 6,
      orderBy: { createdAt: "desc" },
    });
  } catch (error) {
    return [
      {
        id: "1",
        title: "Renault Clio 5",
        brand: "Renault",
        model: "Clio 5",
        year: 2023,
        slug: "renault-clio-5-oujda",
        dailyPrice: 300,
        transmission: "Manuelle",
        fuelType: "Diesel",
        seats: 5,
        doors: 5,
        luggageCapacity: 2,
        airConditioning: true,
        availability: true,
        featured: true,
        mainImage: "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=800&auto=format&fit=crop&q=80",
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
        dailyPrice: 320,
        transmission: "Manuelle",
        fuelType: "Diesel",
        seats: 5,
        doors: 5,
        luggageCapacity: 2,
        airConditioning: true,
        availability: true,
        featured: true,
        mainImage: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=800&auto=format&fit=crop&q=80",
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
        dailyPrice: 300,
        transmission: "Manuelle",
        fuelType: "Diesel",
        seats: 5,
        doors: 5,
        luggageCapacity: 3,
        airConditioning: true,
        availability: true,
        featured: true,
        mainImage: "https://images.unsplash.com/photo-1568844293986-ca9c5c58e943?w=800&auto=format&fit=crop&q=80",
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
        dailyPrice: 600,
        transmission: "Automatique",
        fuelType: "Diesel",
        seats: 5,
        doors: 5,
        luggageCapacity: 4,
        airConditioning: true,
        availability: true,
        featured: true,
        mainImage: "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?w=800&auto=format&fit=crop&q=80",
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
        dailyPrice: 500,
        transmission: "Automatique",
        fuelType: "Diesel",
        seats: 5,
        doors: 5,
        luggageCapacity: 3,
        airConditioning: true,
        availability: true,
        featured: true,
        mainImage: "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?w=800&auto=format&fit=crop&q=80",
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
        dailyPrice: 450,
        transmission: "Automatique",
        fuelType: "Diesel",
        seats: 5,
        doors: 5,
        luggageCapacity: 3,
        airConditioning: true,
        availability: true,
        featured: true,
        mainImage: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&auto=format&fit=crop&q=80",
        location: { id: "2", name: "Tanger", slug: "tanger" },
        images: []
      }
    ] as any;
  }
  }
}

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
