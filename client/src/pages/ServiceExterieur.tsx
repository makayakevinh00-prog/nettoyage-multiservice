import { CheckCircle2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";

export default function ServiceExterieur() {
  const [, navigate] = useLocation();

  const handleReserve = () => {
    navigate("/#booking");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl font-bold mb-4">Nettoyage Extérieur Professionnel</h1>
          <p className="text-xl text-blue-100 mb-6">
            Terrasses, façades, toitures, piscines : redonnez éclat à vos espaces extérieurs
          </p>
          <div className="flex gap-4">
            <Button onClick={handleReserve} className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-8 py-3">
              Réserver maintenant
            </Button>
            <a href="https://wa.me/33617212230" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center px-8 py-3 bg-green-500 hover:bg-green-600 text-white font-bold rounded-lg">
              💬 WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Nos Services Extérieurs</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Terrasse */}
            <div className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all">
              <div className="bg-gradient-to-r from-orange-400 to-orange-500 p-6 text-white">
                <h3 className="text-2xl font-bold">Nettoyage Terrasse</h3>
              </div>
              <div className="p-6">
                <p className="text-gray-600 mb-4">Élimination de la mousse, algues et dépôts avec haute pression</p>
                <ul className="space-y-2 mb-6">
                  <li className="flex gap-2">
                    <CheckCircle2 size={18} className="text-green-500 flex-shrink-0" />
                    <span className="text-sm">Démoussage complet</span>
                  </li>
                  <li className="flex gap-2">
                    <CheckCircle2 size={18} className="text-green-500 flex-shrink-0" />
                    <span className="text-sm">Nettoyage haute pression</span>
                  </li>
                  <li className="flex gap-2">
                    <CheckCircle2 size={18} className="text-green-500 flex-shrink-0" />
                    <span className="text-sm">Traitement anti-mousse</span>
                  </li>
                </ul>
                <div className="text-2xl font-bold text-orange-600 mb-4">À partir de 80€</div>
                <Button onClick={handleReserve} className="w-full bg-orange-500 hover:bg-orange-600">
                  Réserver
                </Button>
              </div>
            </div>

            {/* Façade */}
            <div className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all">
              <div className="bg-gradient-to-r from-blue-400 to-blue-500 p-6 text-white">
                <h3 className="text-2xl font-bold">Nettoyage Façade</h3>
              </div>
              <div className="p-6">
                <p className="text-gray-600 mb-4">Nettoyage en profondeur des murs et revêtements</p>
                <ul className="space-y-2 mb-6">
                  <li className="flex gap-2">
                    <CheckCircle2 size={18} className="text-green-500 flex-shrink-0" />
                    <span className="text-sm">Élimination des salissures</span>
                  </li>
                  <li className="flex gap-2">
                    <CheckCircle2 size={18} className="text-green-500 flex-shrink-0" />
                    <span className="text-sm">Traitement anti-pollution</span>
                  </li>
                  <li className="flex gap-2">
                    <CheckCircle2 size={18} className="text-green-500 flex-shrink-0" />
                    <span className="text-sm">Sécurité équipée</span>
                  </li>
                </ul>
                <div className="text-2xl font-bold text-blue-600 mb-4">Devis gratuit</div>
                <Button onClick={handleReserve} className="w-full bg-blue-500 hover:bg-blue-600">
                  Demander devis
                </Button>
              </div>
            </div>

            {/* Piscine */}
            <div className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all">
              <div className="bg-gradient-to-r from-cyan-400 to-cyan-500 p-6 text-white">
                <h3 className="text-2xl font-bold">Nettoyage Piscine</h3>
              </div>
              <div className="p-6">
                <p className="text-gray-600 mb-4">Entretien complet de votre bassin et équipements</p>
                <ul className="space-y-2 mb-6">
                  <li className="flex gap-2">
                    <CheckCircle2 size={18} className="text-green-500 flex-shrink-0" />
                    <span className="text-sm">Nettoyage du bassin</span>
                  </li>
                  <li className="flex gap-2">
                    <CheckCircle2 size={18} className="text-green-500 flex-shrink-0" />
                    <span className="text-sm">Traitement de l'eau</span>
                  </li>
                  <li className="flex gap-2">
                    <CheckCircle2 size={18} className="text-green-500 flex-shrink-0" />
                    <span className="text-sm">Nettoyage filtration</span>
                  </li>
                </ul>
                <div className="text-2xl font-bold text-cyan-600 mb-4">À partir de 120€</div>
                <Button onClick={handleReserve} className="w-full bg-cyan-500 hover:bg-cyan-600">
                  Réserver
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technique Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Notre Technique Professionnelle</h2>
          <div className="bg-blue-50 rounded-lg p-8">
            <h3 className="text-2xl font-bold text-blue-900 mb-6">Nettoyage Haute Pression</h3>
            <p className="text-gray-700 mb-6">
              Nous utilisons des équipements professionnels haute pression (jusqu'à 250 bars) pour un nettoyage en profondeur sans endommager vos surfaces.
            </p>
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="bg-blue-600 text-white rounded-full w-10 h-10 flex items-center justify-center flex-shrink-0 font-bold">1</div>
                <div>
                  <h4 className="font-bold text-gray-900 mb-1">Inspection</h4>
                  <p className="text-gray-600">Évaluation de l'état et choix de la pression appropriée</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="bg-blue-600 text-white rounded-full w-10 h-10 flex items-center justify-center flex-shrink-0 font-bold">2</div>
                <div>
                  <h4 className="font-bold text-gray-900 mb-1">Pré-traitement</h4>
                  <p className="text-gray-600">Application de produits spécialisés pour détacher</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="bg-blue-600 text-white rounded-full w-10 h-10 flex items-center justify-center flex-shrink-0 font-bold">3</div>
                <div>
                  <h4 className="font-bold text-gray-900 mb-1">Nettoyage Haute Pression</h4>
                  <p className="text-gray-600">Nettoyage en profondeur avec eau chaude si nécessaire</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="bg-blue-600 text-white rounded-full w-10 h-10 flex items-center justify-center flex-shrink-0 font-bold">4</div>
                <div>
                  <h4 className="font-bold text-gray-900 mb-1">Traitement Protecteur</h4>
                  <p className="text-gray-600">Application de traitement anti-mousse ou anti-pollution</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Avantages Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Pourquoi Nous Choisir ?</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="flex gap-4">
              <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-bold text-gray-900 mb-1">Équipement Professionnel</h4>
                <p className="text-gray-600">Haute pression, eau chaude, équipement de sécurité</p>
              </div>
            </div>
            <div className="flex gap-4">
              <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-bold text-gray-900 mb-1">Résultats Durables</h4>
                <p className="text-gray-600">Traitement anti-mousse et anti-pollution pour longévité</p>
              </div>
            </div>
            <div className="flex gap-4">
              <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-bold text-gray-900 mb-1">Sécurité Garantie</h4>
                <p className="text-gray-600">Équipe formée avec assurance responsabilité civile</p>
              </div>
            </div>
            <div className="flex gap-4">
              <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-bold text-gray-900 mb-1">Écologique</h4>
                <p className="text-gray-600">Produits respectueux de l'environnement</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-orange-500 to-orange-600 text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Redonnez Éclat à Vos Espaces Extérieurs</h2>
          <p className="text-lg text-orange-100 mb-8">
            Contactez-nous pour un devis gratuit. Intervention rapide en Île-de-France
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button onClick={handleReserve} className="bg-white text-orange-600 hover:bg-gray-100 font-bold px-8 py-3">
              Réserver un créneau
            </Button>
            <a href="https://wa.me/33617212230" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center px-8 py-3 bg-green-500 hover:bg-green-600 text-white font-bold rounded-lg">
              💬 WhatsApp
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
