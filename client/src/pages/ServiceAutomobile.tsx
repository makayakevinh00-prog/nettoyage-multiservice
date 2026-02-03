import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";

export default function ServiceAutomobile() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-16 md:py-24">
        <div className="container mx-auto px-4">
          <Link href="/" className="text-blue-100 hover:text-white mb-4 inline-flex items-center gap-2">
            ← Retour à l'accueil
          </Link>
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Nettoyage Automobile Premium</h1>
          <p className="text-xl text-blue-100 max-w-2xl">
            Redonnez à votre véhicule son éclat d'origine avec nos services de nettoyage professionnel
          </p>
        </div>
      </section>

      {/* Description Section */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-4xl font-bold mb-8 text-gray-900">Notre Service de Nettoyage Automobile</h2>
          <p className="text-lg text-gray-700 mb-6 leading-relaxed">
            ProClean Empire offre un service de nettoyage automobile complet et professionnel. Que ce soit pour un entretien régulier ou une restauration complète, notre équipe utilise les meilleures techniques et produits pour garantir un résultat impeccable.
          </p>
          <p className="text-lg text-gray-700 mb-6 leading-relaxed">
            Nous nettoyons l'intérieur et l'extérieur de votre véhicule avec soin, en utilisant des produits écologiques et des équipements professionnels de dernière génération.
          </p>
        </div>
      </section>

      {/* Services Offered */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl font-bold mb-12 text-gray-900">Nos Prestations</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              { title: "Lavage Extérieur Simple", desc: "Nettoyage haute pression et rinçage complet de votre véhicule" },
              { title: "Lavage Complet", desc: "Intérieur et extérieur avec produits professionnels de qualité" },
              { title: "Lustrage & Protection", desc: "Traitement protecteur pour préserver la peinture" },
              { title: "Nettoyage Intérieur", desc: "Aspiration, nettoyage des sièges et tapis" },
              { title: "Detailing Premium", desc: "Service complet avec finitions haut de gamme" },
              { title: "Traitement Céramique", desc: "Protection longue durée de la carrosserie" },
            ].map((service, i) => (
              <div key={i} className="flex gap-4 p-6 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
                <CheckCircle2 className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">{service.title}</h3>
                  <p className="text-gray-700">{service.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl font-bold mb-12 text-gray-900">Pourquoi Nous Choisir ?</h2>
          <div className="space-y-6">
            {[
              "Équipe professionnelle formée et expérimentée",
              "Équipements de dernière génération",
              "Produits écologiques et respectueux de l'environnement",
              "Résultats garantis ou argent remboursé",
              "Intervention rapide en Île-de-France",
              "Devis gratuit et sans engagement",
            ].map((item, i) => (
              <div key={i} className="flex gap-4 items-start">
                <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                <p className="text-lg text-gray-700">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-blue-600 to-blue-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Prêt à Nettoyer Votre Véhicule ?</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Demandez un devis gratuit ou réservez votre service dès maintenant
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-white text-blue-600 hover:bg-gray-100 text-lg px-8 py-6" asChild>
              <Link href="/#booking">Réserver Maintenant</Link>
            </Button>
            <Button variant="outline" className="border-white text-white hover:bg-white/10 text-lg px-8 py-6" asChild>
              <a href="tel:0617212230">Appeler: 06 17 21 22 30</a>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
