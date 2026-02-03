import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { CheckCircle2, ArrowLeft, Leaf, Droplets, Sparkles, Shield } from "lucide-react";
import { Link, useLocation } from "wouter";

export default function ServiceJardinage() {
  const { user } = useAuth();
  const [, navigate] = useLocation();

  const services = [
    {
      name: "Taille de Haies",
      description: "Taille professionnelle et mise en forme de vos haies",
    },
    {
      name: "Débroussaillage",
      description: "Élimination complète des mauvaises herbes et broussailles",
    },
    {
      name: "Entretien Paysager",
      description: "Entretien régulier de vos espaces verts",
    },
    {
      name: "Nettoyage Jardin",
      description: "Nettoyage en profondeur de votre jardin",
    },
  ];

  const avantages = [
    "Équipes expérimentées et professionnelles",
    "Équipements modernes et performants",
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
      <section className="py-12 bg-gradient-to-br from-green-50 to-green-100">
        <div className="container max-w-5xl">
          <Link href="/" className="flex items-center gap-2 text-green-600 hover:text-green-700 mb-6 transition-colors">
            <ArrowLeft size={20} />
            <span>Retour à l'accueil</span>
          </Link>
          <div className="flex items-center gap-4 mb-6">
            <Leaf className="w-12 h-12 text-green-600" />
            <h1 className="text-4xl font-bold text-gray-900">Jardinage & Entretien Paysager</h1>
          </div>
          <p className="text-xl text-gray-700 max-w-2xl">
            Entretenez votre jardin avec nos services professionnels de jardinage et paysagisme.
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
                Nos équipes de paysagistes expérimentées prennent soin de votre jardin avec professionnalisme. 
                Nous effectuons la taille, le débroussaillage et l'entretien régulier.
              </p>
              <p className="text-gray-700 mb-6">
                Chaque intervention est adaptée à votre jardin et à vos besoins spécifiques.
              </p>
              <Button 
                onClick={scrollToBooking}
                className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg"
              >
                Réserver maintenant
              </Button>
            </div>
            <div className="bg-green-50 p-8 rounded-lg">
              <div className="flex items-center gap-3 mb-4">
                <Leaf className="w-6 h-6 text-green-600" />
                <h3 className="text-lg font-semibold">Expertise Paysagère</h3>
              </div>
              <p className="text-gray-700 mb-6">
                Nos équipes connaissent tous les types de plantes et d'espaces verts.
              </p>
              <div className="flex items-center gap-3">
                <Sparkles className="w-6 h-6 text-green-600" />
                <h3 className="text-lg font-semibold">Équipements Modernes</h3>
              </div>
              <p className="text-gray-700">
                Nous utilisons les meilleurs équipements pour un travail de qualité.
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
              <div key={idx} className="flex gap-4 p-6 bg-green-50 rounded-lg hover:bg-green-100 transition-colors">
                <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
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
      <section className="py-16 bg-green-50">
        <div className="container max-w-4xl">
          <h3 className="text-3xl font-bold mb-12 text-center text-gray-900">Nos Avantages</h3>
          <div className="grid md:grid-cols-2 gap-6">
            {avantages.map((avantage, idx) => (
              <div key={idx} className="flex items-start gap-3">
                <Shield className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" />
                <p className="text-gray-700">{avantage}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16">
        <div className="container max-w-4xl text-center">
          <h2 className="text-3xl font-bold mb-6 text-gray-900">Prêt à entretenir votre jardin ?</h2>
          <p className="text-xl text-gray-700 mb-8">
            Contactez-nous pour un devis gratuit et sans engagement.
          </p>
          <Button 
            onClick={scrollToBooking}
            className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg text-lg"
          >
            Demander un devis
          </Button>
        </div>
      </section>
    </div>
  );
}
