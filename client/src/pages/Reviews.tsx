import { useEffect } from "react";
import { Star, ExternalLink, Shield, Zap, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Reviews() {
  useEffect(() => {
    // Charger le widget Trustpilot
    if (window.Trustpilot) {
      window.Trustpilot.loadDynamicScript();
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <Star className="w-12 h-12 fill-yellow-300 text-yellow-300" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Avis de nos clients</h1>
            <p className="text-xl text-blue-100">
              Découvrez ce que nos clients pensent de nos services de nettoyage
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16 md:py-24">
        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white p-8 rounded-lg shadow-lg text-center">
            <div className="flex justify-center mb-4">
              <Star className="w-8 h-8 text-yellow-400 fill-yellow-400" />
            </div>
            <h3 className="text-3xl font-bold text-gray-900 mb-2">3.7/5</h3>
            <p className="text-gray-600">Note moyenne sur Trustpilot</p>
          </div>
          <div className="bg-white p-8 rounded-lg shadow-lg text-center">
            <div className="flex justify-center mb-4">
              <Shield className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-3xl font-bold text-gray-900 mb-2">100%</h3>
            <p className="text-gray-600">Avis vérifiés</p>
          </div>
          <div className="bg-white p-8 rounded-lg shadow-lg text-center">
            <div className="flex justify-center mb-4">
              <Heart className="w-8 h-8 text-red-600" />
            </div>
            <h3 className="text-3xl font-bold text-gray-900 mb-2">Satisfaction</h3>
            <p className="text-gray-600">Garantie 100%</p>
          </div>
        </div>

        {/* Trustpilot Widget */}
        <div className="bg-white p-12 rounded-lg shadow-lg mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Avis vérifiés Trustpilot
          </h2>
          <div
            className="trustpilot-widget"
            data-locale="fr-FR"
            data-template-id="56278e9abfbbf7a3246f47f1"
            data-businessunit-id="6789abc123def456"
            data-style-height="auto"
            data-style-width="100%"
            data-theme="light"
          >
            <a href="https://www.trustpilot.com/review/procleanempire.com" target="_blank" rel="noopener noreferrer">
              Lisez les avis marchands de procleanempire.com sur Trustpilot
            </a>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-12 rounded-lg text-center">
          <h2 className="text-3xl font-bold mb-4">Partager votre expérience</h2>
          <p className="text-xl mb-8 text-blue-100">
            Vos avis nous aident à améliorer nos services
          </p>
          <Button
            asChild
            size="lg"
            className="bg-white text-blue-600 hover:bg-blue-50"
          >
            <a
              href="https://www.trustpilot.com/review/procleanempire.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2"
            >
              Laisser un avis
              <ExternalLink className="w-4 h-4" />
            </a>
          </Button>
        </div>

        {/* Why Trustpilot */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Pourquoi Trustpilot ?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <Shield className="w-8 h-8 text-blue-600 mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">Avis vérifiés</h3>
              <p className="text-gray-600">
                Tous les avis sont vérifiés pour garantir leur authenticité
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <Zap className="w-8 h-8 text-blue-600 mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">Transparence</h3>
              <p className="text-gray-600">
                Nous affichons tous les avis, positifs et négatifs
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <Heart className="w-8 h-8 text-blue-600 mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">Confiance</h3>
              <p className="text-gray-600">
                Trustpilot est la plateforme d'avis la plus fiable au monde
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
