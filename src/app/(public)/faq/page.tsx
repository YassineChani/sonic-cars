export const dynamic = 'force-dynamic';
import { prisma } from "@/lib/prisma";

export const metadata = {
  title: "Foire Aux Questions (FAQ) — SONIC CARS",
  description: "Toutes les réponses à vos questions concernant la location de voiture à Oujda et Tanger.",
};

const FALLBACK_FAQS = [
  { id: "1", question: "Quels documents sont nécessaires pour louer une voiture ?", answer: "Une pièce d'identité nationale ou passeport valide, un permis de conduire valide (minimum 1 an), et un acompte par carte bancaire ou espèces.", category: "Documents", order: 1, published: true },
  { id: "2", question: "Quel est l'âge minimum pour louer une voiture ?", answer: "L'âge minimum est de 21 ans avec au moins 1 an de permis de conduire.", category: "Conditions", order: 2, published: true },
  { id: "3", question: "Le kilométrage est-il limité ?", answer: "Non, tous nos véhicules sont proposés avec un kilométrage illimité.", category: "Tarifs", order: 3, published: true },
  { id: "4", question: "Puis-je annuler ma réservation ?", answer: "Oui, vous pouvez annuler jusqu'à 24h avant la date de prise en charge sans frais.", category: "Réservation", order: 4, published: true },
  { id: "5", question: "La livraison à domicile est-elle disponible ?", answer: "Oui, nous proposons la livraison et la reprise du véhicule à votre adresse pour un supplément.", category: "Services", order: 5, published: true },
  { id: "6", question: "Comment effectuer une réservation ?", answer: "Remplissez notre formulaire en ligne ou contactez-nous via WhatsApp. Notre équipe vous confirmera la disponibilité sous 1h.", category: "Réservation", order: 6, published: true },
];

async function getFaqs() {
  try {
    const faqs = await prisma.fAQ.findMany({
      where: { published: true },
      orderBy: { order: "asc" },
    });
    return faqs.length > 0 ? faqs : FALLBACK_FAQS;
  } catch {
    return FALLBACK_FAQS;
  }
}

export default async function FAQPage() {
  const faqs = await getFaqs();

  return (
    <div className="pt-28 md:pt-36 pb-20">
      <div className="container-custom max-w-4xl">
        {/* Header */}
        <div className="text-center mt-6 md:mt-10 mb-16">
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
