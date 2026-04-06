import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, Zap, Crown, AlertCircle } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { trpc } from "@/lib/trpc";

export default function SubscriptionsAuto() {
  const { user, isAuthenticated } = useAuth();
  const [selectedPlan, setSelectedPlan] = useState<"express" | "confort" | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const plans = [
    {
      id: "express",
      name: "Express",
      price: 30,
      description: "L'essentiel pour une voiture propre au quotidien",
      features: [
        "Lavage extérieur complet",
        "Aspiration minutieuse de l'intérieur",
        "Déplacement à domicile inclus",
      ],
      setupFee: 70,
      setupFeatureText: "Frais de mise en propreté le 1er mois uniquement",
      recommended: false,
    },
    {
      id: "confort",
      name: "Confort",
      price: 60,
      description: "Le soin supérieur avec une finition parfaite",
      features: [
        "Lavage extérieur complet",
        "Aspiration minutieuse de l'intérieur",
        "Detailing complet du tableau de bord",
        "Soin des plastiques intérieurs",
        "Déplacement à domicile inclus",
      ],
      setupFee: 90,
      setupFeatureText: "Frais de mise en propreté le 1er mois uniquement",
      recommended: true,
    },
  ];

  const options = [
    { name: "Shampoing et détachage des sièges", price: 40, category: "Intérieur" },
    { name: "Traitement spécial Poils d'animaux", price: 15, category: "Intérieur" },
    { name: "Traitement anti-odeurs professionnel", price: 15, category: "Intérieur" },
    { name: "Detailing Tableau de bord (Express)", price: 30, category: "Intérieur" },
    { name: "Nettoyage en profondeur des jantes", price: 15, category: "Extérieur" },
    { name: "Cire de protection carrosserie", price: 20, category: "Extérieur" },
    { name: "Traitement déperlant anti-pluie", price: 10, category: "Extérieur" },
    { name: "Rénovation des phares (la paire)", price: 40, category: "Extérieur" },
  ];

  const handleSelectPlan = async (plan: "express" | "confort") => {
    if (!isAuthenticated) {
      toast.error("Veuillez vous connecter pour souscrire");
      return;
    }

    setSelectedPlan(plan);
    setIsLoading(true);

    try {
      // Créer une session de paiement Stripe
      const response = await fetch("/api/stripe/create-subscription", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan }),
      });

      if (!response.ok) throw new Error("Erreur lors de la création de la session");

      const { clientSecret } = await response.json();

      // Rediriger vers Stripe Checkout
      window.location.href = clientSecret;
    } catch (error) {
      console.error("Erreur:", error);
      toast.error("Erreur lors de la souscription");
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-20 md:py-32 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
          <div className="container">
            <div className="text-center text-white">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Abonnements d'Entretien Auto
              </h1>
              <p className="text-xl text-gray-300 mb-4">
                Votre véhicule toujours impeccable, sans bouger de chez vous
              </p>
              <p className="text-gray-400">
                Choisissez la formule qui vous correspond
              </p>
            </div>
          </div>
        </section>

        {/* Plans Section */}
        <section className="py-20 md:py-32">
          <div className="container">
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {plans.map((plan) => (
                <Card
                  key={plan.id}
                  className={`relative ${
                    plan.recommended ? "border-2 border-blue-500 shadow-lg" : ""
                  }`}
                >
                  {plan.recommended && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <span className="bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
                        Recommandé
                      </span>
                    </div>
                  )}

                  <CardHeader>
                    <div className="flex items-center gap-2 mb-2">
                      {plan.id === "express" ? (
                        <Zap className="w-5 h-5 text-orange-500" />
                      ) : (
                        <Crown className="w-5 h-5 text-blue-500" />
                      )}
                      <CardTitle className="text-2xl">{plan.name}</CardTitle>
                    </div>
                    <CardDescription>{plan.description}</CardDescription>
                  </CardHeader>

                  <CardContent className="space-y-6">
                    {/* Pricing */}
                    <div>
                      <div className="text-4xl font-bold mb-2">
                        {plan.price}€<span className="text-lg text-gray-500">/mois</span>
                      </div>
                      <p className="text-sm text-gray-600">
                        + {plan.setupFee}€ {plan.setupFeatureText}
                      </p>
                    </div>

                    {/* Features */}
                    <ul className="space-y-3">
                      {plan.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    {/* CTA Button */}
                    <Button
                      onClick={() => handleSelectPlan(plan.id as "express" | "confort")}
                      disabled={isLoading && selectedPlan === plan.id}
                      className={`w-full py-6 text-lg font-semibold ${
                        plan.recommended
                          ? "bg-blue-500 hover:bg-blue-600"
                          : "bg-gray-800 hover:bg-gray-900"
                      }`}
                    >
                      {isLoading && selectedPlan === plan.id
                        ? "Traitement..."
                        : "Souscrire maintenant"}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Info Section */}
        <section className="py-16 bg-blue-50">
          <div className="container max-w-3xl">
            <div className="flex gap-4 p-6 bg-white rounded-lg border border-blue-200">
              <AlertCircle className="w-6 h-6 text-blue-500 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-lg mb-2">Pourquoi des frais de mise en propreté ?</h3>
                <p className="text-gray-700">
                  Pour vous garantir un résultat irréprochable tout au long de votre abonnement, votre tout premier rendez-vous comprend une "Mise à Zéro" complète. Ce grand nettoyage en profondeur nous permet de remettre votre véhicule à neuf. Dès le deuxième mois, le tarif mensuel classique s'applique automatiquement pour maintenir ce niveau d'excellence !
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Options Section */}
        <section className="py-20 md:py-32">
          <div className="container max-w-4xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
              Personnalisez votre entretien
            </h2>
            <p className="text-center text-gray-600 mb-12">
              Besoin d'une attention particulière ce mois-ci ? Ajoutez nos options à la demande lors de notre passage :
            </p>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Interior Options */}
              <div>
                <h3 className="text-xl font-semibold mb-4 text-blue-600">🧼 Pour l'Intérieur</h3>
                <div className="space-y-3">
                  {options
                    .filter((opt) => opt.category === "Intérieur")
                    .map((option, idx) => (
                      <div key={idx} className="flex justify-between items-center p-3 bg-gray-50 rounded">
                        <span className="text-gray-700">{option.name}</span>
                        <span className="font-semibold text-gray-900">+ {option.price}€</span>
                      </div>
                    ))}
                </div>
              </div>

              {/* Exterior Options */}
              <div>
                <h3 className="text-xl font-semibold mb-4 text-blue-600">✨ Pour l'Extérieur</h3>
                <div className="space-y-3">
                  {options
                    .filter((opt) => opt.category === "Extérieur")
                    .map((option, idx) => (
                      <div key={idx} className="flex justify-between items-center p-3 bg-gray-50 rounded">
                        <span className="text-gray-700">{option.name}</span>
                        <span className="font-semibold text-gray-900">+ {option.price}€</span>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Premium Services */}
        <section className="py-16 bg-gradient-to-r from-orange-50 to-yellow-50">
          <div className="container max-w-3xl">
            <h3 className="text-2xl font-bold mb-6 text-center">🏆 Prestations Premium</h3>
            <p className="text-center text-gray-600 mb-8">(Sur demande préalable)</p>

            <div className="space-y-4">
              <div className="flex justify-between items-center p-4 bg-white rounded-lg border">
                <span className="font-semibold text-gray-900">Lustrage Express (Brillance miroir)</span>
                <span className="text-orange-600 font-bold">À partir de 50€</span>
              </div>
              <div className="flex justify-between items-center p-4 bg-white rounded-lg border">
                <span className="font-semibold text-gray-900">Polissage et correction de vernis (Efface-rayures)</span>
                <span className="text-orange-600 font-bold">À partir de 150€</span>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-slate-900 text-white">
          <div className="container text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Prêt à garder votre voiture impeccable ?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Choisissez votre formule et commencez dès maintenant
            </p>
            {!isAuthenticated && (
              <Button className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 text-lg">
                Se connecter pour souscrire
              </Button>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
