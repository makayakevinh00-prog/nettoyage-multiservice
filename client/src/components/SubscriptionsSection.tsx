import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Check, Zap, Crown } from "lucide-react";
import { Link } from "wouter";

export default function SubscriptionsSection() {
  const plans = [
    {
      name: "Express",
      price: "30€",
      period: "/mois",
      description: "L'essentiel pour une voiture propre au quotidien",
      icon: Zap,
      features: [
        "Lavage extérieur complet",
        "Aspiration minutieuse de l'intérieur",
        "Déplacement à domicile inclus",
        "Frais de mise en propreté: 70€ (1er mois)",
      ],
      highlight: false,
      setupFee: "70€",
    },
    {
      name: "Confort",
      price: "60€",
      period: "/mois",
      description: "Le soin supérieur avec une finition parfaite (Recommandé)",
      icon: Crown,
      features: [
        "Lavage extérieur complet",
        "Aspiration minutieuse de l'intérieur",
        "Detailing complet du tableau de bord",
        "Soin des plastiques intérieurs",
        "Déplacement à domicile inclus",
        "Frais de mise en propreté: 90€ (1er mois)",
      ],
      highlight: true,
      setupFee: "90€",
    },
  ];

  return (
    <section className="py-16 bg-gradient-to-b from-blue-50 to-white">
      <div className="container">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
            🚗 Abonnements d'Entretien Auto
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Votre véhicule toujours impeccable, sans bouger de chez vous. Choisissez la formule qui vous correspond !
          </p>
        </div>

        {/* Plans Grid */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-12">
          {plans.map((plan) => {
            const Icon = plan.icon;
            return (
              <Card
                key={plan.name}
                className={`relative transition-all duration-300 hover:shadow-xl ${
                  plan.highlight
                    ? "md:scale-105 border-2 border-blue-600 shadow-lg"
                    : "border-gray-200"
                }`}
              >
                {plan.highlight && (
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <span className="bg-gradient-to-r from-blue-600 to-blue-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
                      ⭐ Recommandé
                    </span>
                  </div>
                )}

                <CardHeader className={plan.highlight ? "pt-8" : ""}>
                  <div className="flex items-center gap-3 mb-2">
                    <Icon className="w-8 h-8 text-blue-600" />
                    <CardTitle className="text-2xl">{plan.name}</CardTitle>
                  </div>
                  <CardDescription className="text-base">{plan.description}</CardDescription>
                </CardHeader>

                <CardContent className="space-y-6">
                  {/* Price */}
                  <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-4 rounded-lg">
                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl font-bold text-blue-600">{plan.price}</span>
                      <span className="text-gray-600">{plan.period}</span>
                    </div>
                    <p className="text-sm text-gray-600 mt-2">
                      + Frais de mise en propreté: <strong>{plan.setupFee}</strong> (1er mois uniquement)
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
                  <Link href="/abonnements-auto">
                    <Button
                      className={`w-full py-6 text-base font-semibold transition-all ${
                        plan.highlight
                          ? "bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white shadow-lg"
                          : "bg-blue-100 text-blue-600 hover:bg-blue-200"
                      }`}
                    >
                      S'abonner maintenant
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Info Box */}
        <div className="bg-blue-50 border-l-4 border-blue-600 p-6 rounded-lg max-w-2xl mx-auto">
          <h3 className="font-semibold text-gray-900 mb-2">💡 Pourquoi des frais de mise en propreté le premier mois ?</h3>
          <p className="text-gray-700">
            Pour vous garantir un résultat irréprochable tout au long de votre abonnement, votre tout premier rendez-vous comprend une "Mise à Zéro" complète. Ce grand nettoyage en profondeur nous permet de remettre votre véhicule à neuf. Dès le deuxième mois, le tarif mensuel classique s'applique automatiquement pour maintenir ce niveau d'excellence !
          </p>
        </div>
      </div>
    </section>
  );
}
