import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { useLocation } from "wouter";
import { toast } from "sonner";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ArrowLeft } from "lucide-react";

const SERVICES = {
  terrasse_petite: {
    name: "Terrasse jusqu'à 20m²",
    price: 80,
    description: "Nettoyage complet pour petite terrasse",
    includedServices: ["nettoyage_base"]
  },
  terrasse_moyenne: {
    name: "Terrasse 20-40m²",
    price: 140,
    description: "Nettoyage complet pour terrasse moyenne",
    includedServices: ["nettoyage_base"]
  },
  terrasse_grande: {
    name: "Terrasse 40-60m²",
    price: 200,
    description: "Nettoyage complet pour grande terrasse",
    includedServices: ["nettoyage_base"]
  }
};

const ALL_OPTIONS = [
  { id: "anti_mousse", name: "Traitement anti-mousse", price: 30, excludedFrom: [] },
  { id: "nettoyage_joints", name: "Nettoyage joints", price: 25, excludedFrom: [] },
  { id: "impermeabilisation", name: "Imperméabilisation", price: 40, excludedFrom: [] },
  { id: "nettoyage_mobilier", name: "Nettoyage mobilier extérieur", price: 20, excludedFrom: [] }
];

export default function ReservationTerrasse() {
  const [, navigate] = useLocation();
  const [selectedService, setSelectedService] = useState<keyof typeof SERVICES | null>(null);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  const handleServiceSelect = (service: keyof typeof SERVICES) => {
    setSelectedService(service);
    setSelectedOptions([]);
  };

  const handleOptionToggle = (optionId: string) => {
    setSelectedOptions(prev =>
      prev.includes(optionId)
        ? prev.filter(id => id !== optionId)
        : [...prev, optionId]
    );
  };

  const handleReserve = () => {
    if (!selectedService) {
      toast.error("Veuillez choisir une prestation");
      return;
    }

    const service = SERVICES[selectedService];
    const optionsPrice = selectedOptions.reduce((total, optionId) => {
      const option = ALL_OPTIONS.find(o => o.id === optionId);
      return total + (option?.price || 0);
    }, 0);

    const totalPrice = service.price + optionsPrice;

    // Sauvegarder les données dans le format attendu par Payment.tsx
    const optionDetails = selectedOptions.map(optionId => {
      const option = ALL_OPTIONS.find(o => o.id === optionId);
      return { name: option?.name || "", price: option?.price || 0 };
    });

    localStorage.setItem("reservationData", JSON.stringify({
      service: "🏡 Nettoyage Terrasse",
      prestation: service.name,
      prestationPrice: service.price,
      options: optionDetails,
      totalPrice: totalPrice,
      date: new Date().toISOString(),
      time: "À convenir",
      name: "",
      email: "",
      phone: "",
      address: "",
      message: "",
      type: "ponctuel"
    }));

    navigate("/payment");
  };

  // Filtrer les options disponibles pour le service sélectionné
  const availableOptions = selectedService
    ? ALL_OPTIONS.filter(option => !option.excludedFrom.includes(selectedService))
    : [];

  const selectedOptionsPrice = selectedOptions.reduce((total, optionId) => {
    const option = ALL_OPTIONS.find(o => o.id === optionId);
    return total + (option?.price || 0);
  }, 0);

  const totalPrice = selectedService
    ? SERVICES[selectedService].price + selectedOptionsPrice
    : 0;

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-slate-50 to-white">
      <Header />
      <main className="flex-1 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Bouton retour */}
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 text-gray-600 hover:text-blue-600 mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Retour à l'accueil
        </button>

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Réservez Votre Prestation</h1>
          <p className="text-xl text-gray-600">
            Choisissez votre prestation et personnalisez-la avec des options
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {/* Services */}
          {Object.entries(SERVICES).map(([key, service]) => (
            <Card
              key={key}
              className={`cursor-pointer transition-all ${
                selectedService === key
                  ? "ring-2 ring-blue-500 shadow-lg"
                  : "hover:shadow-md"
              }`}
              onClick={() => handleServiceSelect(key as keyof typeof SERVICES)}
            >
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-2xl">{service.name}</CardTitle>
                    <CardDescription>{service.description}</CardDescription>
                  </div>
                  {selectedService === key && (
                    <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm">✓</span>
                    </div>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-blue-600">
                  {service.price}€
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Options */}
        {selectedService && (
          <div className="bg-white rounded-lg border border-gray-200 p-8 mb-8">
            <h2 className="text-2xl font-bold mb-6">Options Supplémentaires</h2>
            <p className="text-gray-600 mb-6">
              Améliorez votre prestation avec des services complémentaires
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
        {selectedService && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-8 mb-8">
            <h3 className="text-xl font-bold mb-6">Récapitulatif</h3>

            <div className="space-y-4 mb-6">
              <div className="flex justify-between text-lg">
                <span>{SERVICES[selectedService].name}</span>
                <span className="font-bold">{SERVICES[selectedService].price}€</span>
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
                <span>Total à Payer</span>
                <span className="text-blue-600">{totalPrice}€</span>
              </div>
            </div>

            <Button
              onClick={handleReserve}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 text-lg"
            >
              Réserver - {totalPrice}€
            </Button>
          </div>
        )}

        {!selectedService && (
          <div className="text-center text-gray-500 py-12">
            <p className="text-lg">Sélectionnez une prestation pour continuer</p>
          </div>
        )}
      </div>
      </main>
    </div>
  );
}
