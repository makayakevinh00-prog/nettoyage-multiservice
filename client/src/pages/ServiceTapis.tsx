import { CheckCircle2, Star, AlertCircle, Zap, ArrowLeft, Sofa, Droplets, Sparkles, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLocation, Link } from "wouter";

export default function ServiceTapis() {
  const [, navigate] = useLocation();

  const handleReserve = () => {
    navigate("/#booking?service=tapis");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const scrollToBooking = () => {
    navigate("/#booking?service=tapis");
    const bookingSection = document.getElementById('booking');
    if (bookingSection) {
      bookingSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-96 overflow-hidden bg-gradient-to-r from-blue-600 to-blue-700 flex items-center justify-center">
        <div className="text-center text-white px-4">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">Nettoyage Tapis & Canapés</h1>
          <p className="text-lg md:text-xl">Redonnez vie à vos tapis et canapés avec notre service de nettoyage professionnel</p>
        </div>
      </section>

      {/* Back Link */}
      <section className="py-6 bg-gray-50">
        <div className="container max-w-5xl">
          <Link href="/" className="flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors">
            <ArrowLeft size={20} />
            <span>Retour à l'accueil</span>
          </Link>
        </div>
      </section>

      {/* Hero Section OLD */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16 px-4 hidden">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl font-bold mb-4">Nettoyage Tapis & Canapé</h1>
          <p className="text-xl text-blue-100 mb-6">
            Éliminez les taches tenaces, les acariens et les odeurs avec nos techniques professionnelles
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

      {/* Problem Section */}
      <section className="py-16 px-4 bg-red-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Problèmes Courants</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg p-6 shadow-md">
              <AlertCircle className="w-12 h-12 text-red-500 mb-4" />
              <h3 className="font-bold text-lg mb-2">Taches Tenaces</h3>
              <p className="text-gray-600">Vin, café, chocolat, encre... Les taches difficiles à enlever</p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-md">
              <AlertCircle className="w-12 h-12 text-red-500 mb-4" />
              <h3 className="font-bold text-lg mb-2">Acariens & Allergies</h3>
              <p className="text-gray-600">Accumulation de poussière, acariens et allergènes</p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-md">
              <AlertCircle className="w-12 h-12 text-red-500 mb-4" />
              <h3 className="font-bold text-lg mb-2">Odeurs Persistantes</h3>
              <p className="text-gray-600">Odeurs d'animaux, d'humidité ou de fumée</p>
            </div>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Notre Solution Professionnelle</h2>
          <div className="bg-blue-50 rounded-lg p-8 mb-8">
            <h3 className="text-2xl font-bold text-blue-900 mb-6">Technique d'Injection-Extraction</h3>
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="bg-blue-600 text-white rounded-full w-10 h-10 flex items-center justify-center flex-shrink-0 font-bold">1</div>
                <div>
                  <h4 className="font-bold text-gray-900 mb-1">Inspection & Pré-traitement</h4>
                  <p className="text-gray-700">Analyse du tissu et application de produits spécialisés pour détacher</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="bg-blue-600 text-white rounded-full w-10 h-10 flex items-center justify-center flex-shrink-0 font-bold">2</div>
                <div>
                  <h4 className="font-bold text-gray-900 mb-1">Injection d'Eau Chaude</h4>
                  <p className="text-gray-700">Injection de solution nettoyante chaude en profondeur dans les fibres</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="bg-blue-600 text-white rounded-full w-10 h-10 flex items-center justify-center flex-shrink-0 font-bold">3</div>
                <div>
                  <h4 className="font-bold text-gray-900 mb-1">Extraction Puissante</h4>
                  <p className="text-gray-700">Extraction de l'eau et des résidus avec équipement professionnel haute pression</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="bg-blue-600 text-white rounded-full w-10 h-10 flex items-center justify-center flex-shrink-0 font-bold">4</div>
                <div>
                  <h4 className="font-bold text-gray-900 mb-1">Séchage Rapide</h4>
                  <p className="text-gray-700">Séchage accéléré avec ventilation professionnelle (2-4 heures)</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tarifs Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Nos Tarifs</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg p-6 shadow-md border-l-4 border-orange-500">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Tapis</h3>
              <ul className="space-y-3">
                <li className="flex justify-between">
                  <span>Petit format (&lt; 3m²)</span>
                  <span className="font-bold text-orange-600">40€</span>
                </li>
                <li className="flex justify-between">
                  <span>Moyen format (3-6m²)</span>
                  <span className="font-bold text-orange-600">70€</span>
                </li>
                <li className="flex justify-between">
                  <span>Grand format (&gt; 6m²)</span>
                  <span className="font-bold text-orange-600">100€</span>
                </li>
                <li className="flex justify-between border-t pt-3">
                  <span className="font-semibold">Détachage spécial</span>
                  <span className="font-bold text-orange-600">+20€</span>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-md border-l-4 border-orange-500">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Canapés & Fauteuils</h3>
              <ul className="space-y-3">
                <li className="flex justify-between">
                  <span>Canapé 2-3 places</span>
                  <span className="font-bold text-orange-600">80€</span>
                </li>
                <li className="flex justify-between">
                  <span>Canapé 4+ places</span>
                  <span className="font-bold text-orange-600">120€</span>
                </li>
                <li className="flex justify-between">
                  <span>Fauteuil unique</span>
                  <span className="font-bold text-orange-600">50€</span>
                </li>
                <li className="flex justify-between border-t pt-3">
                  <span className="font-semibold">Traitement anti-tache</span>
                  <span className="font-bold text-orange-600">+30€</span>
                </li>
              </ul>
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
                <h4 className="font-bold text-gray-900 mb-1">Produits Écologiques</h4>
                <p className="text-gray-600">Produits respectueux de l'environnement et sans danger pour les enfants/animaux</p>
              </div>
            </div>
            <div className="flex gap-4">
              <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-bold text-gray-900 mb-1">Séchage Rapide</h4>
                <p className="text-gray-600">Séchage en 2-4 heures (vs 24h avec nettoyage classique)</p>
              </div>
            </div>
            <div className="flex gap-4">
              <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-bold text-gray-900 mb-1">Élimination des Acariens</h4>
                <p className="text-gray-600">Élimine 99% des acariens et allergènes</p>
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

      {/* FAQ Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Questions Fréquentes</h2>
          <div className="space-y-4">
            <div className="bg-white rounded-lg p-6 shadow-md">
              <h4 className="font-bold text-gray-900 mb-2">Combien de temps pour le séchage ?</h4>
              <p className="text-gray-600">Généralement 2-4 heures. Nous vous recommandons d'attendre 24h avant utilisation intensive.</p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-md">
              <h4 className="font-bold text-gray-900 mb-2">Pouvez-vous enlever toutes les taches ?</h4>
              <p className="text-gray-600">La plupart des taches oui ! Les taches très anciennes ou brûlées peuvent laisser des traces.</p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-md">
              <h4 className="font-bold text-gray-900 mb-2">Vos produits sont-ils sans danger pour les animaux ?</h4>
              <p className="text-gray-600">Oui, tous nos produits sont écologiques et sans danger pour les enfants et animaux domestiques.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-orange-500 to-orange-600 text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Prêt à Redonner Vie à Vos Tapis & Canapés ?</h2>
          <p className="text-lg text-orange-100 mb-8">
            Contactez-nous pour un devis gratuit. Intervention en 24-48h
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
