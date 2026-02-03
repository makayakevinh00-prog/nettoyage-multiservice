import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { CheckCircle2, ArrowLeft, Building2, Droplets, Sparkles, Shield } from "lucide-react";
import { Link, useLocation } from "wouter";

export default function ServiceBalcon() {
  const { user } = useAuth();
  const [, navigate] = useLocation();

  const services = [
    {
      name: "Nettoyage Complet",
      description: "Nettoyage en profondeur de tous les éléments du balcon",
    },
    {
      name: "Nettoyage des Joints",
      description: "Élimination des dépôts et moisissures dans les joints",
    },
    {
      name: "Nettoyage Garde-Corps",
      description: "Nettoyage professionnel des garde-corps en verre ou métal",
    },
    {
      name: "Traitement Anti-Mousse",
      description: "Protection durable contre la mousse et les algues",
    },
  ];

  const avantages = [
    "Équipements professionnels haute performance",
    "Produits écologiques et sécurisés",
    "Intervention rapide et efficace",
    "Résultats garantis",
    "Devis gratuit et sans engagement",
    "Satisfaction garantie",
  ];

  const scrollToBooking = () => {
    navigate("/#booking");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <section className="py-12 bg-gradient-to-br from-blue-50 to-blue-100">
        <div className="container max-w-5xl">
          <Link href="/" className="flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-6 transition-colors">
            <ArrowLeft size={20} />
            <span>Retour à l'accueil</span>
          </Link>
          <div className="flex items-center gap-4 mb-6">
            <Building2 className="w-12 h-12 text-blue-600" />
            <h1 className="text-4xl font-bold text-gray-900">Nettoyage Balcon</h1>
          </div>
          <p className="text-xl text-gray-700 max-w-2xl">
            Nettoyez votre balcon en profondeur avec nos services professionnels haute pression.
          </p>
        </div>
      </section>

      {/* Description */}
      <section className="py-16">
        <div className="container max-w-4xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6 text-gray-900">Pourquoi nous choisir ?</h2>
              <p className="text-gray-700 mb-4">
                Nos équipes utilisent les technologies les plus avancées pour nettoyer votre balcon en profondeur. 
                Nous éliminons la saleté, la mousse, les algues et les dépôts tenaces.
              </p>
              <p className="text-gray-700 mb-6">
                Chaque intervention est personnalisée selon le type de revêtement et le niveau de saleté.
              </p>
              <Button 
                onClick={scrollToBooking}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg"
              >
                Réserver maintenant
              </Button>
            </div>
            <div className="bg-blue-50 p-8 rounded-lg">
              <div className="flex items-center gap-3 mb-4">
                <Droplets className="w-6 h-6 text-blue-600" />
                <h3 className="text-lg font-semibold">Haute Pression</h3>
              </div>
              <p className="text-gray-700 mb-6">
                Nettoyage haute pression pour éliminer tous les dépôts.
              </p>
              <div className="flex items-center gap-3">
                <Sparkles className="w-6 h-6 text-blue-600" />
                <h3 className="text-lg font-semibold">Produits Écologiques</h3>
              </div>
              <p className="text-gray-700">
                Nous utilisons uniquement des produits respectueux de l'environnement.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-16">
        <div className="container max-w-4xl">
          <h3 className="text-3xl font-bold mb-12 text-center text-gray-900">Nos Prestations</h3>
          <div className="grid md:grid-cols-2 gap-8">
            {services.map((service, idx) => (
              <div key={idx} className="flex gap-4 p-6 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
                <CheckCircle2 className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">{service.name}</h4>
                  <p className="text-gray-700">{service.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Avantages */}
      <section className="py-16 bg-blue-50">
        <div className="container max-w-4xl">
          <h3 className="text-3xl font-bold mb-12 text-center text-gray-900">Nos Avantages</h3>
          <div className="grid md:grid-cols-2 gap-6">
            {avantages.map((avantage, idx) => (
              <div key={idx} className="flex items-start gap-3">
                <Shield className="w-5 h-5 text-blue-600 flex-shrink-0 mt-1" />
                <p className="text-gray-700">{avantage}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16">
        <div className="container max-w-4xl text-center">
          <h2 className="text-3xl font-bold mb-6 text-gray-900">Prêt à nettoyer votre balcon ?</h2>
          <p className="text-xl text-gray-700 mb-8">
            Contactez-nous pour un devis gratuit et sans engagement.
          </p>
          <Button 
            onClick={scrollToBooking}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg text-lg"
          >
            Demander un devis
          </Button>
        </div>
      </section>
    </div>
  );
}
