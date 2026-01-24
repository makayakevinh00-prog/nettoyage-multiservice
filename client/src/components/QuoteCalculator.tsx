import { useState } from "react";
import { Calculator, ChevronRight } from "lucide-react";
import { useLocation } from "wouter";

export default function QuoteCalculator() {
  const [, navigate] = useLocation();
  const [service, setService] = useState("automobile");
  const [options, setOptions] = useState<string[]>([]);

  const services = {
    automobile: {
      name: "Nettoyage Automobile",
      basePrice: 50,
      options: [
        { id: "interieur", name: "Nettoyage intérieur", price: 30 },
        { id: "lustrage", name: "Lustrage professionnel", price: 40 },
        { id: "ceramique", name: "Protection céramique", price: 50 },
      ],
    },
    tapis: {
      name: "Nettoyage Tapis & Canapé",
      basePrice: 40,
      options: [
        { id: "petit", name: "Petit format", price: 10 },
        { id: "moyen", name: "Format moyen", price: 30 },
        { id: "grand", name: "Grand format", price: 70 },
        { id: "protection", name: "Traitement anti-tache", price: 25 },
      ],
    },
    terrasse: {
      name: "Nettoyage Terrasse",
      basePrice: 60,
      options: [
        { id: "petite", name: "Petite (< 20m²)", price: 20 },
        { id: "moyenne", name: "Moyenne (20-40m²)", price: 80 },
        { id: "grande", name: "Grande (> 40m²)", price: 140 },
        { id: "antimousse", name: "Traitement anti-mousse", price: 30 },
      ],
    },
  };

  const currentService = services[service as keyof typeof services];
  const selectedOptions = currentService.options.filter((opt) =>
    options.includes(opt.id)
  );
  const totalPrice =
    currentService.basePrice +
    selectedOptions.reduce((sum, opt) => sum + opt.price, 0);

  const toggleOption = (id: string) => {
    setOptions((prev) =>
      prev.includes(id) ? prev.filter((o) => o !== id) : [...prev, id]
    );
  };

  return (
    <section className="py-16 bg-gradient-to-br from-blue-50 to-blue-100">
      <div className="container max-w-2xl">
        <div className="flex items-center justify-center gap-3 mb-4">
          <Calculator size={32} className="text-blue-600" />
          <h2 className="text-3xl font-bold text-gray-900">
            Calculateur de Devis
          </h2>
        </div>
        <p className="text-center text-gray-600 mb-8">
          Estimez le prix de votre service en quelques clics
        </p>

        <div className="bg-white p-8 rounded-lg shadow-lg">
          {/* Service Selection */}
          <div className="mb-8">
            <label className="block text-sm font-bold text-gray-900 mb-3">
              Choisir un service
            </label>
            <div className="space-y-2">
              {Object.entries(services).map(([key, svc]) => (
                <label key={key} className="flex items-center p-3 border-2 rounded-lg cursor-pointer transition-all" style={{
                  borderColor: service === key ? '#2563eb' : '#e5e7eb',
                  backgroundColor: service === key ? '#eff6ff' : 'white',
                }}>
                  <input
                    type="radio"
                    name="service"
                    value={key}
                    checked={service === key}
                    onChange={(e) => {
                      setService(e.target.value);
                      setOptions([]);
                    }}
                    className="w-4 h-4"
                  />
                  <span className="ml-3 font-semibold text-gray-900">
                    {svc.name}
                  </span>
                  <span className="ml-auto text-blue-600 font-bold">
                    À partir de {svc.basePrice}€
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Options */}
          <div className="mb-8">
            <label className="block text-sm font-bold text-gray-900 mb-3">
              Options supplémentaires
            </label>
            <div className="space-y-2">
              {currentService.options.map((option) => (
                <label
                  key={option.id}
                  className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition"
                >
                  <input
                    type="checkbox"
                    checked={options.includes(option.id)}
                    onChange={() => toggleOption(option.id)}
                    className="w-4 h-4"
                  />
                  <span className="ml-3 flex-1 font-medium text-gray-900">
                    {option.name}
                  </span>
                  <span className="text-blue-600 font-bold">
                    +{option.price}€
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Price Summary */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6 rounded-lg mb-8">
            <div className="flex justify-between items-center mb-4">
              <span className="text-lg font-semibold">Prix estimé :</span>
              <span className="text-4xl font-bold">{totalPrice}€</span>
            </div>
            <p className="text-sm text-blue-100">
              ✓ Devis sans engagement • ✓ Intervention rapide • ✓ Satisfaction garantie
            </p>
          </div>

          {/* CTA */}
          <button
            onClick={() => navigate("/contact")}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-6 rounded-lg transition flex items-center justify-center gap-2"
          >
            Demander un Devis Personnalisé
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </section>
  );
}
