import { prisma } from "@/lib/prisma";
import { AdminFaqsClient } from "@/components/admin/AdminFaqsClient";

export const metadata = {
  title: "Gestion des FAQ — SONIC CARS Admin",
};

export default async function AdminFaqsPage() {
  const faqs = await prisma.fAQ.findMany({ orderBy: { order: "asc" } });

  return (
    <div className="space-y-6">
      <AdminFaqsClient initialFaqs={faqs} />
    </div>
  );
}
