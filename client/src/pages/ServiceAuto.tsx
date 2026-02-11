import { CheckCircle2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";

export default function ServiceAuto() {
  const [, navigate] = useLocation();

  const handleReserve = () => {
    navigate("/#booking?service=auto");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl font-bold mb-4">Lavage Automobile Premium</h1>
          <p className="text-xl text-blue-100 mb-6">
            Votre voiture comme neuve : nettoyage complet intérieur/extérieur avec lustrage et protection
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

      {/* Étapes Section */}
      <section className="py-16 px-4 bg-blue-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Nos Étapes de Nettoyage</h2>
          <div className="space-y-6">
            <div className="bg-white rounded-lg p-6 shadow-md border-l-4 border-blue-600">
              <div className="flex gap-4">
                <div className="bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0 font-bold text-lg">1</div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Pré-rinçage Haute Pression</h3>
                  <p className="text-gray-600">Élimination de la saleté grossière et des débris avec eau haute pression</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-md border-l-4 border-blue-600">
              <div className="flex gap-4">
                <div className="bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0 font-bold text-lg">2</div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Shampoing Carrosserie</h3>
                  <p className="text-gray-600">Application de shampoing professionnel avec brossage doux pour préserver la peinture</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-md border-l-4 border-blue-600">
              <div className="flex gap-4">
                <div className="bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0 font-bold text-lg">3</div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Nettoyage Intérieur</h3>
                  <p className="text-gray-600">Aspiration complète, nettoyage des sièges, tapis et tableau de bord</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-md border-l-4 border-blue-600">
              <div className="flex gap-4">
                <div className="bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0 font-bold text-lg">4</div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Lustrage & Protection</h3>
                  <p className="text-gray-600">Application de cire professionnelle pour brillance et protection UV</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-md border-l-4 border-blue-600">
              <div className="flex gap-4">
                <div className="bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0 font-bold text-lg">5</div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Nettoyage Moteur (Optionnel)</h3>
                  <p className="text-gray-600">Dégraissage professionnel du moteur pour meilleure performance</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tarifs Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Nos Forfaits</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg p-6 shadow-md border-t-4 border-orange-500">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Forfait Essentiel</h3>
              <p className="text-3xl font-bold text-orange-600 mb-4">25€</p>
              <ul className="space-y-2 mb-6">
                <li className="flex gap-2">
                  <CheckCircle2 size={18} className="text-green-500 flex-shrink-0" />
                  <span>Lavage extérieur simple</span>
                </li>
                <li className="flex gap-2">
                  <CheckCircle2 size={18} className="text-green-500 flex-shrink-0" />
                  <span>Séchage</span>
                </li>
              </ul>
              <Button className="w-full bg-orange-500 hover:bg-orange-600">Choisir</Button>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-md border-t-4 border-orange-600">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Forfait Premium</h3>
              <p className="text-3xl font-bold text-orange-600 mb-4">80€</p>
              <ul className="space-y-2 mb-6">
                <li className="flex gap-2">
                  <CheckCircle2 size={18} className="text-green-500 flex-shrink-0" />
                  <span>Lavage complet intérieur/extérieur</span>
                </li>
                <li className="flex gap-2">
                  <CheckCircle2 size={18} className="text-green-500 flex-shrink-0" />
                  <span>Shampoing sièges</span>
                </li>
                <li className="flex gap-2">
                  <CheckCircle2 size={18} className="text-green-500 flex-shrink-0" />
                  <span>Lustrage carrosserie</span>
                </li>
                <li className="flex gap-2">
                  <CheckCircle2 size={18} className="text-green-500 flex-shrink-0" />
                  <span>Protection UV</span>
                </li>
              </ul>
              <Button className="w-full bg-orange-600 hover:bg-orange-700">Choisir</Button>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-md border-t-4 border-orange-700 md:col-span-2">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Forfait Detailing Complet</h3>
              <p className="text-3xl font-bold text-orange-600 mb-4">150€</p>
              <div className="grid md:grid-cols-2 gap-4 mb-6">
                <ul className="space-y-2">
                  <li className="flex gap-2">
                    <CheckCircle2 size={18} className="text-green-500 flex-shrink-0" />
                    <span>Tout du forfait Premium</span>
                  </li>
                  <li className="flex gap-2">
                    <CheckCircle2 size={18} className="text-green-500 flex-shrink-0" />
                    <span>Nettoyage moteur professionnel</span>
                  </li>
                </ul>
                <ul className="space-y-2">
                  <li className="flex gap-2">
                    <CheckCircle2 size={18} className="text-green-500 flex-shrink-0" />
                    <span>Traitement cuir premium</span>
                  </li>
                  <li className="flex gap-2">
                    <CheckCircle2 size={18} className="text-green-500 flex-shrink-0" />
                    <span>Désodorisation intérieur</span>
                  </li>
                </ul>
              </div>
              <Button className="w-full bg-orange-700 hover:bg-orange-800">Choisir</Button>
            </div>
          </div>
        </div>
      </section>

      {/* Avantages Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Pourquoi Nous Choisir ?</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="flex gap-4">
              <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-bold text-gray-900 mb-1">Produits Professionnels</h4>
                <p className="text-gray-600">Produits de qualité automobile utilisés par les concessionnaires</p>
              </div>
            </div>
            <div className="flex gap-4">
              <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-bold text-gray-900 mb-1">Équipement Haute Pression</h4>
                <p className="text-gray-600">Nettoyage en profondeur sans endommager la peinture</p>
              </div>
            </div>
            <div className="flex gap-4">
              <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-bold text-gray-900 mb-1">Voiture Comme Neuve</h4>
                <p className="text-gray-600">Résultat impressionnant qui redonne éclat et valeur à votre véhicule</p>
              </div>
            </div>
            <div className="flex gap-4">
              <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-bold text-gray-900 mb-1">Garantie Satisfaction</h4>
                <p className="text-gray-600">Retouches gratuites si vous n'êtes pas satisfait</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-orange-500 to-orange-600 text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Prêt à Redonner Éclat à Votre Voiture ?</h2>
          <p className="text-lg text-orange-100 mb-8">
            Contactez-nous pour un devis gratuit. Intervention rapide à domicile
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
