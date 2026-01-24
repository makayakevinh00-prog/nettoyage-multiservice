import { useState } from "react";
import { ChevronDown, Car, Home, Leaf, Droplets, Building2, Zap } from "lucide-react";
import { useLocation } from "wouter";

export default function MegaMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [, navigate] = useLocation();

  const services = {
    auto: {
      title: "🚗 Automobile",
      icon: Car,
      items: [
        { name: "Lavage Complet", path: "/service/automobile", desc: "Intérieur et extérieur" },
        { name: "Lavage + Lustrage", path: "/service/automobile", desc: "Protection brillance" },
        { name: "Detailing Premium", path: "/service/automobile", desc: "Finition céramique" },
      ],
    },
    maison: {
      title: "🏠 Maison",
      icon: Home,
      items: [
        { name: "Tapis & Canapés", path: "/service/tapis", desc: "Injection-extraction" },
        { name: "Balcon", path: "/service/balcon", desc: "Nettoyage complet" },
        { name: "Façade", path: "/service/facade", desc: "Haute pression" },
      ],
    },
    exterieur: {
      title: "🌿 Extérieur",
      icon: Leaf,
      items: [
        { name: "Terrasse", path: "/service/terrasse", desc: "Démoussage & nettoyage" },
        { name: "Piscine", path: "/service/piscine", desc: "Entretien complet" },
        { name: "Jardinage", path: "/service/jardinage", desc: "Taille & entretien" },
      ],
    },
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-blue-600 transition font-semibold"
      >
        Services
        <ChevronDown
          size={18}
          className={`transition-transform ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />

          {/* Mega Menu */}
          <div className="absolute top-full left-0 z-50 w-screen bg-white shadow-2xl border-t-4 border-blue-600">
            <div className="container py-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {Object.entries(services).map(([key, category]) => (
                  <div key={key} className="space-y-4">
                    <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                      {category.title}
                    </h3>
                    <ul className="space-y-3">
                      {category.items.map((item, idx) => (
                        <li key={idx}>
                          <button
                            onClick={() => {
                              navigate(item.path);
                              setIsOpen(false);
                            }}
                            className="group block w-full text-left"
                          >
                            <p className="font-semibold text-gray-900 group-hover:text-blue-600 transition">
                              {item.name}
                            </p>
                            <p className="text-sm text-gray-600 group-hover:text-gray-700">
                              {item.desc}
                            </p>
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}

                {/* Promo Box */}
                <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-6 rounded-lg border-2 border-orange-300">
                  <h4 className="font-bold text-gray-900 mb-2">Offre Spéciale</h4>
                  <p className="text-sm text-gray-700 mb-4">
                    Devis gratuit en 30 minutes. Intervention 7j/7.
                  </p>
                  <button
                    onClick={() => {
                      navigate("/contact");
                      setIsOpen(false);
                    }}
                    className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded-lg transition"
                  >
                    Demander un Devis
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
