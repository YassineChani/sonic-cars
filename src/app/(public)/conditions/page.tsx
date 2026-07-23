export const metadata = {
  title: "Conditions Générales de Location — SONIC CARS",
};

export default function TermsPage() {
  return (
    <div className="pt-28 pb-20">
      <div className="container-custom max-w-4xl">
        <h1 className="text-4xl font-black text-white mb-8" style={{ fontFamily: "var(--font-outfit)" }}>
          Conditions Générales de Location
        </h1>

        <div className="glass border border-white/10 rounded-2xl p-8 space-y-6 text-white/70 text-sm leading-relaxed">
          <section className="space-y-2">
            <h2 className="text-white font-bold text-lg">1. Conditions du Conducteur</h2>
            <p>Le conducteur doit être âgé d'au moins 21 ans et posséder un permis de conduire valide depuis au moins 2 ans. Une pièce d'identité officielle (CIN ou Passeport) est exigée lors de la signature du contrat.</p>
          </section>

          <section className="space-y-2 border-t border-white/10 pt-6">
            <h2 className="text-white font-bold text-lg">2. Modalités de Paiement et Caution</h2>
            <p>Le paiement s'effectue sur place lors de la remise des clés (espèces ou carte bancaire). Une caution (empreinte de carte ou chèque) est demandée à la remise du véhicule et restituée à la fin de la location après état des lieux.</p>
          </section>

          <section className="space-y-2 border-t border-white/10 pt-6">
            <h2 className="text-white font-bold text-lg">3. Assurance et Responsabilités</h2>
            <p>Tous nos véhicules sont couverts par une assurance de base avec franchise. En cas d'accident responsable ou de dommage sans tiers identifié, la franchise reste à la charge du locataire.</p>
          </section>

          <section className="space-y-2 border-t border-white/10 pt-6">
            <h2 className="text-white font-bold text-lg">4. Carburant et Propreté</h2>
            <p>Le véhicule est livré avec le plein ou un niveau déterminé de carburant et doit être restitué avec le même niveau. Des frais peuvent être appliqués en cas de différence constatée.</p>
          </section>
        </div>
      </div>
    </div>
  );
}
