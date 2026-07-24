import { HeroSection } from "@/components/home/HeroSection";
import { SearchForm } from "@/components/home/SearchForm";
import { FeaturedCars } from "@/components/home/FeaturedCars";
import { WhyUs } from "@/components/home/WhyUs";
import { HowItWorks } from "@/components/home/HowItWorks";
import { LocationsSection } from "@/components/home/LocationsSection";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
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
        title: "Dacia Duster",
        brand: "Dacia",
        model: "Duster",
        year: 2023,
        slug: "dacia-duster-oujda",
        dailyPrice: 400,
        transmission: "Manuelle",
        fuelType: "Diesel",
        seats: 5,
        doors: 5,
        luggageCapacity: 4,
        airConditioning: true,
        availability: true,
        featured: true,
        mainImage: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800&auto=format&fit=crop&q=80",
        location: { id: "1", name: "Oujda", slug: "oujda" },
        images: []
      }
    ] as any;
  }
}

async function getTestimonials() {
  try {
    return await prisma.testimonial.findMany({
      where: { published: true },
      orderBy: { createdAt: "desc" },
      take: 6,
    });
  } catch (error) {
    return [
      { id: "1", name: "Karim Benali", city: "Oujda", rating: 5, comment: "Service exceptionnel ! Voiture propre et livraison rapide." },
      { id: "2", name: "Nadia Boucetta", city: "Tanger", rating: 5, comment: "La meilleure agence de location à Tanger. Très professionnel." }
    ] as any;
  }
}

export default async function HomePage() {
  const [featuredCars, testimonials] = await Promise.all([
    getFeaturedCars(),
    getTestimonials(),
  ]);

  return (
    <>
      <HeroSection />
      <SearchForm />
      <FeaturedCars cars={featuredCars} />
      <WhyUs />
      <HowItWorks />
      <LocationsSection />
      <TestimonialsSection testimonials={testimonials} />
      <CTASection />
    </>
  );
}
