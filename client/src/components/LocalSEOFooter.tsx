export default function LocalSEOFooter() {
  const departments = {
    "75 - Paris": [
      "Paris 1er", "Paris 2e", "Paris 3e", "Paris 4e", "Paris 5e",
      "Paris 6e", "Paris 7e", "Paris 8e", "Paris 9e", "Paris 10e",
      "Paris 11e", "Paris 12e", "Paris 13e", "Paris 14e", "Paris 15e",
      "Paris 16e", "Paris 17e", "Paris 18e", "Paris 19e", "Paris 20e",
    ],
    "77 - Seine-et-Marne": [
      "Melun", "Fontainebleau", "Meaux", "Provins", "Coulommiers",
      "Nemours", "Montereau-Fault-Yonne", "Bray-sur-Seine", "Moret-sur-Loing", "Nangis",
    ],
    "78 - Yvelines": [
      "Versailles", "Saint-Germain-en-Laye", "Rambouillet", "Mantes-la-Jolie", "Dreux",
      "Chevreuse", "Montfort-l'Amaury", "Houdan", "Limay", "Bonnières-sur-Seine",
    ],
    "91 - Essonne": [
      "Évry", "Corbeil-Essonnes", "Massy", "Palaiseau", "Orsay",
      "Dourdan", "Étampes", "Fontainebleau", "Mennecy", "Brunoy",
    ],
    "92 - Hauts-de-Seine": [
      "Nanterre", "Boulogne-Billancourt", "Neuilly-sur-Seine", "Levallois-Perret", "Courbevoie",
      "Issy-les-Moulineaux", "Malakoff", "Montrouge", "Antony", "Sèvres",
    ],
    "93 - Seine-Saint-Denis": [
      "Saint-Denis", "Montreuil", "Noisy-le-Sec", "Aubervilliers", "Bobigny",
      "Pantin", "Romainville", "Bagnolet", "Noisy-le-Grand", "Villepinte",
    ],
    "94 - Val-de-Marne": [
      "Créteil", "Vitry-sur-Seine", "Ivry-sur-Seine", "Villejuif", "Alfortville",
      "Maisons-Alfort", "Charenton-le-Pont", "Saint-Maur-des-Fossés", "Nogent-sur-Marne", "Fontenay-sous-Bois",
    ],
    "95 - Val-d'Oise": [
      "Pontoise", "Cergy", "Argenteuil", "Sarcelles", "Gonesse",
      "Taverny", "Viarmes", "L'Isle-Adam", "Magny-en-Vexin", "Beaumont-sur-Oise",
    ],
  };

  return (
    <section className="bg-gray-50 py-12 border-t">
      <div className="container max-w-6xl">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          Nos Zones d'Intervention en Île-de-France
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {Object.entries(departments).map(([dept, cities]) => (
            <div key={dept} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="font-bold text-blue-600 mb-3">{dept}</h3>
              <ul className="space-y-1">
                {cities.slice(0, 5).map((city) => (
                  <li key={city} className="text-sm text-gray-600 hover:text-blue-600 transition">
                    • {city}
                  </li>
                ))}
                {cities.length > 5 && (
                  <li className="text-sm text-gray-500 italic">
                    + {cities.length - 5} autres villes
                  </li>
                )}
              </ul>
            </div>
          ))}
        </div>

        {/* SEO Text Block */}
        <div className="bg-blue-50 p-8 rounded-lg border border-blue-200">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            ProClean Empire : Votre Expert en Nettoyage Professionnel en Île-de-France
          </h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            ProClean Empire intervient dans tous les départements de l'Île-de-France (75, 77, 78, 91, 92, 93, 94, 95) 
            pour le nettoyage professionnel de vos véhicules, intérieurs et espaces extérieurs. Que vous soyez à 
            <strong> Versailles, Boulogne-Billancourt, Créteil, Argenteuil ou Meaux</strong>, notre équipe d'experts 
            se déplace à domicile pour vous offrir un service de qualité premium.
          </p>
          <p className="text-gray-700 leading-relaxed">
            Nos services incluent le nettoyage automobile (lavage, lustrage, detailing), le nettoyage de tapis et canapés 
            (injection-extraction), le nettoyage de terrasses et façades (haute pression), ainsi que l'entretien de jardins 
            et piscines. Devis gratuit en 30 minutes. Intervention 7j/7. Satisfaction garantie.
          </p>
        </div>
      </div>
    </section>
  );
}
