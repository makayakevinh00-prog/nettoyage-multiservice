import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, CheckCircle2, Euro, Clock, Sparkles } from "lucide-react";
import { useLocation } from "wouter";

export default function ServiceTerrasse() {
  const { user } = useAuth();
  const [, setLocation] = useLocation();

  const packages = [
    {
      name: "Terrasse Petite (< 20m²)",
      price: "80€",
      description: "Nettoyage complet",
      features: ["Nettoyage haute pression", "Démoussage", "Finition"],
    },
    {
      name: "Terrasse Moyenne (20-40m²)",
      price: "140€",
      description: "Nettoyage professionnel",
      features: ["Nettoyage haute pression", "Démoussage", "Traitement anti-mousse"],
    },
    {
      name: "Terrasse Grande (40-60m²)",
      price: "200€",
      description: "Service complet",
      features: ["Nettoyage haute pression", "Démoussage", "Traitement protecteur", "Joints nettoyés"],
    },
    {
      name: "Traitement Anti-Mousse",
      price: "+30€",
      description: "Protection longue durée",
      features: ["Application protectrice", "Prévention de la mousse", "Durée 12 mois"],
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-white border-b border-gray-200">
        <div className="container flex items-center justify-between py-4">
          <button
            onClick={() => setLocation("/")}
            className="flex items-center gap-2 text-blue-600 hover:text-blue-700 transition"
          >
            <ArrowLeft size={20} />
            Retour
          </button>
          <h1 className="text-2xl font-bold text-gray-900">Nettoyage Terrasse</h1>
          <div className="w-20" />
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative h-96 overflow-hidden">
        <img
          src="/service-terrasse.jpg"
          alt="Nettoyage Terrasse"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white">
            <h2 className="text-5xl font-bold mb-4">Nettoyage Terrasse Premium</h2>
            <p className="text-xl">Retrouvez une terrasse impeccable et protégée</p>
          </div>
        </div>
      </section>

      {/* Description */}
      <section className="py-16 bg-gray-50">
        <div className="container max-w-4xl">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">Expertise Terrasse</h3>
              <p className="text-gray-600 mb-6">
                Spécialisés dans le nettoyage de terrasses en Île-de-France, nous utilisons 
                des techniques professionnelles pour éliminer la mousse, les taches et les dépôts. 
                Nos traitements protecteurs prolongent la durée de vie de votre terrasse.
              </p>
              <ul className="space-y-3">
                <li className="flex items-center gap-3">
                  <CheckCircle2 className="text-blue-600" size={20} />
                  <span className="text-gray-700">Nettoyage haute pression</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle2 className="text-blue-600" size={20} />
                  <span className="text-gray-700">Démoussage efficace</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle2 className="text-blue-600" size={20} />
                  <span className="text-gray-700">Traitement anti-mousse</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle2 className="text-blue-600" size={20} />
                  <span className="text-gray-700">Nettoyage des joints</span>
                </li>
              </ul>
            </div>
            <div>
              <img
                src="/service-terrasse.jpg"
                alt="Détail du service"
                className="rounded-lg shadow-lg w-full h-80 object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Packages */}
      <section className="py-16">
        <div className="container max-w-5xl">
          <h3 className="text-3xl font-bold mb-12 text-center text-gray-900">Nos Forfaits</h3>
          <div className="grid md:grid-cols-2 gap-8">
            {packages.map((pkg, idx) => (
              <Card key={idx} className="hover:shadow-lg transition">
                <CardHeader>
                  <CardTitle className="text-xl">{pkg.name}</CardTitle>
                  <CardDescription>{pkg.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="mb-6">
                    <div className="text-3xl font-bold text-blue-600 flex items-center gap-2">
                      {pkg.price}
                      <Euro size={24} />
                    </div>
                  </div>
                  <ul className="space-y-2 mb-6">
                    {pkg.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-2 text-gray-700">
                        <CheckCircle2 size={16} className="text-green-600" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button className="w-full bg-blue-600 hover:bg-blue-700">
                    Réserver ce forfait
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Avantages */}
      <section className="py-16 bg-blue-50">
        <div className="container max-w-4xl">
          <h3 className="text-3xl font-bold mb-12 text-center text-gray-900">Pourquoi Nous Choisir ?</h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <Sparkles className="mx-auto mb-4 text-blue-600" size={40} />
              <h4 className="text-xl font-bold mb-2">Résultats Durables</h4>
              <p className="text-gray-600">
                Nos traitements protecteurs prolongent la propreté de votre terrasse
              </p>
            </div>
            <div className="text-center">
              <Clock className="mx-auto mb-4 text-blue-600" size={40} />
              <h4 className="text-xl font-bold mb-2">Intervention Rapide</h4>
              <p className="text-gray-600">
                Disponibles sous 48h pour votre convenance en Île-de-France
              </p>
            </div>
            <div className="text-center">
              <CheckCircle2 className="mx-auto mb-4 text-blue-600" size={40} />
              <h4 className="text-xl font-bold mb-2">Produits Écologiques</h4>
              <p className="text-gray-600">
                Respectueux de l'environnement et de votre famille
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16">
        <div className="container max-w-4xl text-center">
          <h3 className="text-3xl font-bold mb-6 text-gray-900">Prêt à Nettoyer Votre Terrasse ?</h3>
          <p className="text-xl text-gray-600 mb-8">
            Contactez-nous dès maintenant pour un devis gratuit et une intervention rapide
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
              Réserver Maintenant
            </Button>
            <Button size="lg" variant="outline">
              Demander un Devis
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
