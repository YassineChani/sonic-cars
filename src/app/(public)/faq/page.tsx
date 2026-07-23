import { prisma } from "@/lib/prisma";

export const metadata = {
  title: "Foire Aux Questions (FAQ) — SONIC CARS",
  description: "Toutes les réponses à vos questions concernant la location de voiture à Oujda et Tanger.",
};

async function getFaqs() {
  return prisma.fAQ.findMany({
    where: { published: true },
    orderBy: { order: "asc" },
  });
}

export default async function FAQPage() {
  const faqs = await getFaqs();

  return (
    <div className="pt-28 pb-20">
      <div className="container-custom max-w-4xl">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-3">
            <div className="divider-red" />
            <span className="text-red-500 text-sm font-semibold uppercase tracking-widest">
              Aide & Questions
            </span>
            <div className="divider-red" />
          </div>
          <h1
            className="text-4xl md:text-5xl font-black text-white mb-4"
            style={{ fontFamily: "var(--font-outfit)" }}
          >
            Foire Aux <span className="text-red-500">Questions</span>
          </h1>
          <p className="text-white/50 text-base max-w-lg mx-auto">
            Trouvez rapidement des réponses aux questions les plus fréquemment posées sur nos contrats, conditions et réservations.
          </p>
        </div>

        {/* FAQs List */}
        <div className="space-y-4">
          {faqs.map((faq) => (
            <div key={faq.id} className="glass border border-white/10 rounded-2xl p-6 space-y-3">
              <h3 className="text-white font-bold text-lg flex items-start gap-3">
                <span className="text-red-500 font-mono text-xl">Q.</span>
                {faq.question}
              </h3>
              <p className="text-white/70 text-sm leading-relaxed pl-7">
                {faq.answer}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
