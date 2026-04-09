import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { useLocation } from "wouter";
import { toast } from "sonner";

const SUBSCRIPTION_PLANS = {
  express: {
    name: "EXPRESS",
    monthlyPrice: 30,
    firstPayment: 70,
    description: "Pour débuter",
    features: [
      "1 intervention par mois",
      "Déplacement inclus",
      "Annulation gratuite",
      "Pause possible à tout moment"
    ],
    includedServices: ["interieur_seul"]
  },
  confort: {
    name: "CONFORT",
    monthlyPrice: 60,
    firstPayment: 90,
    description: "Le plus choisi",
    features: [
      "2 interventions par mois",
      "Déplacement inclus",
      "Priorité d'intervention",
      "Pause possible à tout moment",
      "Options à la carte"
    ],
    includedServices: ["interieur_avec_sieges"]
  }
};

const ALL_OPTIONS = [
  { id: "shampoing_sieges", name: "Shampoing Sièges", price: 40, excludedFrom: ["interieur_avec_sieges"] },
  { id: "polissage", name: "Polissage Carrosserie", price: 60, excludedFrom: [] },
  { id: "detailing_tableau", name: "Detailing Tableau de bord", price: 30, excludedFrom: [] },
  { id: "poils_animaux", name: "Poils d'animaux", price: 20, excludedFrom: [] },
  { id: "anti_odeurs", name: "Anti-odeurs Pro", price: 15, excludedFrom: [] },
  { id: "nettoyage_jantes", name: "Nettoyage Jantes", price: 15, excludedFrom: [] },
  { id: "cire_brillance", name: "Cire Brillance", price: 20, excludedFrom: [] },
  { id: "anti_pluie", name: "Anti-pluie Pare-brise", price: 10, excludedFrom: [] },
  { id: "renovation_phares", name: "Rénovation Phares (la paire)", price: 50, excludedFrom: [] },
];

export default function SubscriptionPage() {
  const [, navigate] = useLocation();
  const [selectedPlan, setSelectedPlan] = useState<keyof typeof SUBSCRIPTION_PLANS | null>(null);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  const handlePlanSelect = (plan: keyof typeof SUBSCRIPTION_PLANS) => {
    setSelectedPlan(plan);
    setSelectedOptions([]);
  };

  const handleOptionToggle = (optionId: string) => {
    setSelectedOptions(prev =>
      prev.includes(optionId)
        ? prev.filter(id => id !== optionId)
        : [...prev, optionId]
    );
  };

  const handleSubscribe = () => {
    if (!selectedPlan) {
      toast.error("Veuillez choisir un abonnement");
      return;
    }

    const plan = SUBSCRIPTION_PLANS[selectedPlan];
    const optionsPrice = selectedOptions.reduce((total, optionId) => {
      const option = ALL_OPTIONS.find(o => o.id === optionId);
      return total + (option?.price || 0);
    }, 0);

    const totalFirstPayment = plan.firstPayment + optionsPrice;

    // Sauvegarder les données dans le format attendu par Payment.tsx
    const optionDetails = selectedOptions.map(optionId => {
      const option = ALL_OPTIONS.find(o => o.id === optionId);
      return { name: option?.name || "", price: option?.price || 0 };
    });

    localStorage.setItem("reservationData", JSON.stringify({
      service: "\ud83d\ude97 Abonnement Nettoyage Automobile",
      prestation: `Abonnement ${plan.name}`,
      prestationPrice: plan.firstPayment,
      options: optionDetails,
      totalPrice: totalFirstPayment,
      date: new Date().toISOString(),
      time: "Mensuel",
      name: "",
      email: "",
      phone: "",
      address: "",
      message: `Abonnement ${plan.name} - ${plan.monthlyPrice}\u20ac/mois`,
      type: "subscription",
      monthlyPrice: plan.monthlyPrice
    }));

    navigate("/payment");
  };

  // Filtrer les options disponibles pour le plan sélectionné
  const availableOptions = selectedPlan
    ? ALL_OPTIONS.filter(option => !option.excludedFrom.includes(selectedPlan))
    : [];

  const selectedOptionsPrice = selectedOptions.reduce((total, optionId) => {
    const option = ALL_OPTIONS.find(o => o.id === optionId);
    return total + (option?.price || 0);
  }, 0);

  const totalFirstPayment = selectedPlan
    ? SUBSCRIPTION_PLANS[selectedPlan].firstPayment + selectedOptionsPrice
    : 0;

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Choisissez Votre Abonnement</h1>
          <p className="text-xl text-gray-600">
            Sélectionnez la formule qui vous convient et personnalisez-la avec des options
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Plans */}
          {Object.entries(SUBSCRIPTION_PLANS).map(([key, plan]) => (
            <Card
              key={key}
              className={`cursor-pointer transition-all ${
                selectedPlan === key
                  ? "ring-2 ring-blue-500 shadow-lg"
                  : "hover:shadow-md"
              }`}
              onClick={() => handlePlanSelect(key as keyof typeof SUBSCRIPTION_PLANS)}
            >
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-2xl">{plan.name}</CardTitle>
                    <CardDescription>{plan.description}</CardDescription>
                  </div>
                  {selectedPlan === key && (
                    <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm">✓</span>
                    </div>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <div className="mb-6">
                  <div className="text-3xl font-bold text-blue-600 mb-2">
                    {plan.monthlyPrice}€<span className="text-lg text-gray-600">/mois</span>
                  </div>
                  <div className="text-sm text-gray-600">
                    Premier mois : <span className="font-bold text-lg">{plan.firstPayment}€</span>
                  </div>
                </div>

                <ul className="space-y-3">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <span className="text-green-500">✓</span>
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Options */}
        {selectedPlan && (
          <div className="bg-white rounded-lg border border-gray-200 p-8 mb-8">
            <h2 className="text-2xl font-bold mb-6">Options Supplémentaires</h2>
            <p className="text-gray-600 mb-6">
              Ajoutez des services complémentaires à votre abonnement
            </p>

            <div className="grid md:grid-cols-2 gap-4">
              {availableOptions.map(option => (
                <div
                  key={option.id}
                  className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:bg-blue-50 transition-colors"
                >
                  <Checkbox
                    id={option.id}
                    checked={selectedOptions.includes(option.id)}
                    onCheckedChange={() => handleOptionToggle(option.id)}
                  />
                  <label
                    htmlFor={option.id}
                    className="flex-1 cursor-pointer"
                  >
                    <div className="font-medium text-gray-900">{option.name}</div>
                    <div className="text-sm text-blue-600">+{option.price}€</div>
                  </label>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Summary */}
        {selectedPlan && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-8 mb-8">
            <h3 className="text-xl font-bold mb-6">Récapitulatif</h3>

            <div className="space-y-4 mb-6">
              <div className="flex justify-between text-lg">
                <span>Abonnement {SUBSCRIPTION_PLANS[selectedPlan].name}</span>
                <span className="font-bold">{SUBSCRIPTION_PLANS[selectedPlan].firstPayment}€</span>
              </div>

              {selectedOptions.length > 0 && (
                <>
                  <div className="border-t border-blue-200 pt-4">
                    <p className="font-medium mb-3">Options sélectionnées :</p>
                    {selectedOptions.map(optionId => {
                      const option = ALL_OPTIONS.find(o => o.id === optionId);
                      return (
                        <div key={optionId} className="flex justify-between text-gray-700 ml-4">
                          <span>{option?.name}</span>
                          <span>+{option?.price}€</span>
                        </div>
                      );
                    })}
                  </div>
                </>
              )}

              <div className="border-t border-blue-200 pt-4 flex justify-between text-2xl font-bold">
                <span>Total Premier Paiement</span>
                <span className="text-blue-600">{totalFirstPayment}€</span>
              </div>

              <div className="text-sm text-gray-600 bg-white p-3 rounded">
                Prélèvement automatique de <strong>{SUBSCRIPTION_PLANS[selectedPlan].monthlyPrice}€</strong> le mois prochain
              </div>
            </div>

            <Button
              onClick={handleSubscribe}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 text-lg"
            >
              Souscrire - {totalFirstPayment}€
            </Button>
          </div>
        )}

        {!selectedPlan && (
          <div className="text-center text-gray-500 py-12">
            <p className="text-lg">Sélectionnez un abonnement pour continuer</p>
          </div>
        )}
      </div>
    </div>
  );
}
