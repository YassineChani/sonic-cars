export const metadata = {
  title: "Politique de Confidentialité — SONIC CARS",
};

export default function PrivacyPage() {
  return (
    <div className="pt-28 pb-20">
      <div className="container-custom max-w-4xl">
        <h1 className="text-4xl font-black text-white mb-8" style={{ fontFamily: "var(--font-outfit)" }}>
          Politique de Confidentialité
        </h1>

        <div className="glass border border-white/10 rounded-2xl p-8 space-y-6 text-white/70 text-sm leading-relaxed">
          <section className="space-y-2">
            <h2 className="text-white font-bold text-lg">Collecte des Données Personnelles</h2>
            <p>SONIC CARS collecte uniquement les informations nécessaires au traitement de votre demande de réservation : nom, numéro de téléphone, adresse email et villes de prise en charge.</p>
          </section>

          <section className="space-y-2 border-t border-white/10 pt-6">
            <h2 className="text-white font-bold text-lg">Utilisation des Données</h2>
            <p>Vos données sont strictement destinées au service client de SONIC CARS pour la gestion de vos contrats de location. Aucune donnée n'est cédée ou vendue à des tiers.</p>
          </section>

          <section className="space-y-2 border-t border-white/10 pt-6">
            <h2 className="text-white font-bold text-lg">Droit d'Accès et de Rectification</h2>
            <p>Vous pouvez à tout moment demander la modification ou la suppression de vos données personnelles en envoyant un message à contact@soniccars.ma.</p>
          </section>
        </div>
      </div>
    </div>
  );
}
