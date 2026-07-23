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
  return prisma.car.findMany({
    where: { featured: true, availability: true },
    include: { location: true, images: { orderBy: { order: "asc" } } },
    take: 6,
    orderBy: { createdAt: "desc" },
  });
}

async function getTestimonials() {
  return prisma.testimonial.findMany({
    where: { published: true },
    orderBy: { createdAt: "desc" },
    take: 6,
  });
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
