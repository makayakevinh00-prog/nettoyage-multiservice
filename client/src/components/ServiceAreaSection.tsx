import { MapPin, CheckCircle } from "lucide-react";

interface Department {
  code: string;
  name: string;
  description: string;
}

const departments: Department[] = [
  {
    code: "75",
    name: "Paris",
    description: "Centre de la capitale"
  },
  {
    code: "77",
    name: "Seine-et-Marne",
    description: "Est de l'Île-de-France"
  },
  {
    code: "78",
    name: "Yvelines",
    description: "Ouest de l'Île-de-France"
  },
  {
    code: "91",
    name: "Essonne",
    description: "Sud de l'Île-de-France"
  },
  {
    code: "92",
    name: "Hauts-de-Seine",
    description: "Ouest de la petite couronne"
  },
  {
    code: "93",
    name: "Seine-Saint-Denis",
    description: "Nord de la petite couronne"
  },
  {
    code: "94",
    name: "Val-de-Marne",
    description: "Est de la petite couronne"
  },
  {
    code: "95",
    name: "Val-d'Oise",
    description: "Nord de la grande couronne"
  }
];

export default function ServiceAreaSection() {
  return (
    <section className="py-20 px-4 bg-gradient-to-br from-blue-50 to-gray-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <div className="flex justify-center mb-4">
            <MapPin className="w-12 h-12 text-orange-500" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Zone d'Intervention
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            ProClean Empire intervient dans toute l'Île-de-France. Aucun frais de déplacement supplémentaire.
          </p>
        </div>

        {/* Departments Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {departments.map((dept) => (
            <div
              key={dept.code}
              className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105 border-l-4 border-orange-500"
            >
              <div className="flex items-start gap-3 mb-3">
                <div className="bg-orange-100 rounded-full w-10 h-10 flex items-center justify-center flex-shrink-0">
                  <span className="font-bold text-orange-600 text-sm">{dept.code}</span>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">{dept.name}</h3>
                  <p className="text-sm text-gray-600">{dept.description}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-green-600 text-sm font-semibold">
                <CheckCircle size={16} />
                Couvert
              </div>
            </div>
          ))}
        </div>

        {/* Map Section */}
        <div className="bg-white rounded-lg p-8 shadow-lg">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Carte d'Intervention
          </h3>
          <div className="bg-gray-100 rounded-lg p-8 text-center">
            <svg
              viewBox="0 0 400 300"
              className="w-full max-w-2xl mx-auto"
              style={{ maxHeight: "300px" }}
            >
              {/* Simplified Île-de-France map representation */}
              <text x="200" y="150" fontSize="24" fontWeight="bold" textAnchor="middle" fill="#1f2937">
                🗺️ Île-de-France
              </text>
              <text x="200" y="180" fontSize="14" textAnchor="middle" fill="#666">
                Tous les départements couverts
              </text>
              <text x="200" y="210" fontSize="12" textAnchor="middle" fill="#999">
                Paris (75) • Seine-et-Marne (77) • Yvelines (78) • Essonne (91)
              </text>
              <text x="200" y="230" fontSize="12" textAnchor="middle" fill="#999">
                Hauts-de-Seine (92) • Seine-Saint-Denis (93) • Val-de-Marne (94) • Val-d'Oise (95)
              </text>
            </svg>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-12 bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg p-8 text-center text-white">
          <h3 className="text-2xl font-bold mb-4">
            Vous êtes en Île-de-France ?
          </h3>
          <p className="text-lg text-orange-100 mb-6">
            Nous intervenons rapidement chez vous. Contactez-nous pour un devis gratuit.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:0617212230"
              className="inline-flex items-center justify-center px-8 py-3 bg-white text-orange-600 font-bold rounded-lg hover:bg-gray-100 transition-colors"
            >
              📞 Appeler maintenant
            </a>
            <a
              href="#booking"
              className="inline-flex items-center justify-center px-8 py-3 bg-orange-700 hover:bg-orange-800 text-white font-bold rounded-lg transition-colors"
            >
              💬 Demander un devis
            </a>
          </div>
        </div>

        {/* Info Box */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h4 className="font-bold text-blue-900 mb-3">✓ Avantages de notre couverture complète</h4>
          <ul className="grid md:grid-cols-2 gap-3 text-blue-800 text-sm">
            <li>✓ Pas de frais de déplacement supplémentaires</li>
            <li>✓ Intervention rapide (24-48h)</li>
            <li>✓ Même qualité de service partout</li>
            <li>✓ Équipe locale et réactive</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
