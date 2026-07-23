export const dynamic = 'force-dynamic';
import { prisma } from "@/lib/prisma";
import { AdminTestimonialsClient } from "@/components/admin/AdminTestimonialsClient";

export const metadata = {
  title: "Gestion des Avis Clients — SONIC CARS Admin",
};

export default async function AdminTestimonialsPage() {
  const testimonials = await prisma.testimonial.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div className="space-y-6">
      <AdminTestimonialsClient initialTestimonials={testimonials} />
    </div>
  );
}
