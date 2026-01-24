import { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

const faqItems: FAQItem[] = [
  {
    id: "1",
    category: "Général",
    question: "Quels sont vos horaires d'intervention ?",
    answer: "ProClean Empire intervient 7 jours sur 7, de 8h à 20h. Nous proposons des créneaux flexibles adaptés à votre emploi du temps. Les interventions en dehors de ces horaires peuvent être arrangées sur demande."
  },
  {
    id: "2",
    category: "Général",
    question: "Couvrez-vous toute l'Île-de-France ?",
    answer: "Oui ! Nous intervenons dans tous les départements d'Île-de-France : 75 (Paris), 77 (Seine-et-Marne), 78 (Yvelines), 91 (Essonne), 92 (Hauts-de-Seine), 93 (Seine-Saint-Denis), 94 (Val-de-Marne) et 95 (Val-d'Oise). Aucun frais de déplacement supplémentaire."
  },
  {
    id: "3",
    category: "Services",
    question: "Comment enlever une tache de vin sur un canapé en tissu ?",
    answer: "Les taches de vin frais doivent être traitées rapidement. Nous utilisons une technique d'injection-extraction spécialisée qui élimine la tache sans endommager le tissu. Pour les taches anciennes, nos produits professionnels et notre expertise garantissent un résultat optimal. Demandez un devis gratuit !"
  },
  {
    id: "4",
    category: "Services",
    question: "Pourquoi nettoyer sa terrasse avant le printemps ?",
    answer: "L'hiver accumule mousse, algues et saleté sur les terrasses. Un nettoyage de printemps élimine ces dépôts, prévient les glissades dangereuses et prolonge la durée de vie de votre revêtement. Notre nettoyage haute pression professionnel redonne à votre terrasse son éclat d'origine."
  },
  {
    id: "5",
    category: "Services",
    question: "Quel est le meilleur moment pour démoussage de toiture ?",
    answer: "Le printemps (avril-mai) est idéal pour le démoussage. À cette période, la mousse est active mais les conditions météo sont favorables. Cependant, un démoussage peut être effectué toute l'année. Nous recommandons un entretien annuel pour prévenir l'accumulation."
  },
  {
    id: "6",
    category: "Services",
    question: "Comment entretenir le cuir de sa voiture ?",
    answer: "L'entretien du cuir automobile nécessite des produits spécialisés. Nos services incluent le nettoyage en profondeur, le conditionnement et la protection du cuir. Nous recommandons un entretien tous les 6 mois pour maintenir la souplesse et l'éclat du cuir."
  },
  {
    id: "7",
    category: "Réservation",
    question: "Comment puis-je réserver un service ?",
    answer: "Vous pouvez réserver directement via notre formulaire en ligne, par téléphone au 06 17 21 22 30, ou via WhatsApp. Nous vous proposerons des créneaux disponibles et vous enverrons une confirmation avec tous les détails de l'intervention."
  },
  {
    id: "8",
    category: "Réservation",
    question: "Quel est le délai pour obtenir un devis ?",
    answer: "Nous vous garantissons un devis gratuit sous 30 minutes ! Remplissez notre formulaire en ligne ou contactez-nous directement. Pour les demandes urgentes, appelez-nous au 06 17 21 22 30."
  },
  {
    id: "9",
    category: "Paiement",
    question: "Quels sont les modes de paiement acceptés ?",
    answer: "Nous acceptons tous les modes de paiement : carte bancaire, virement, espèces et chèque. Pour les réservations en ligne, un paiement sécurisé par carte est requis. Les factures sont envoyées automatiquement par email."
  },
  {
    id: "10",
    category: "Général",
    question: "Utilisez-vous des produits écologiques ?",
    answer: "Oui ! ProClean Empire s'engage pour l'environnement. Nous utilisons des produits écologiques et respectueux de la nature autant que possible. Nos techniques de nettoyage haute pression réduisent l'utilisation de produits chimiques. Demandez-nous plus de détails !"
  }
];

export default function FAQ() {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState("Tous");

  const categories = ["Tous", ...new Set(faqItems.map(item => item.category))];
  const filteredItems = selectedCategory === "Tous" 
    ? faqItems 
    : faqItems.filter(item => item.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-50">
      {/* Header */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex justify-center mb-4">
            <HelpCircle size={48} className="text-orange-400" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Questions Fréquentes</h1>
          <p className="text-xl text-blue-100">
            Trouvez les réponses à vos questions sur nos services de nettoyage professionnel
          </p>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((category) => (
              <Button
                key={category}
                onClick={() => setSelectedCategory(category)}
                variant={selectedCategory === category ? "default" : "outline"}
                className={selectedCategory === category ? "bg-blue-600 hover:bg-blue-700" : ""}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Items */}
      <section className="py-12 px-4 pb-20">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-4">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden"
              >
                <button
                  onClick={() => setExpandedId(expandedId === item.id ? null : item.id)}
                  className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-4 text-left flex-1">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                      <span className="text-blue-600 font-bold">{item.id}</span>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {item.question}
                    </h3>
                  </div>
                  <ChevronDown
                    size={24}
                    className={`text-gray-600 transition-transform duration-300 flex-shrink-0 ${
                      expandedId === item.id ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {expandedId === item.id && (
                  <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                    <p className="text-gray-700 leading-relaxed">
                      {item.answer}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* CTA Section */}
          <div className="mt-16 bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg p-8 text-center text-white">
            <h2 className="text-2xl font-bold mb-4">Vous n'avez pas trouvé votre réponse ?</h2>
            <p className="text-lg mb-6 text-orange-100">
              Contactez-nous directement, notre équipe est là pour vous aider !
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:0617212230"
                className="inline-flex items-center justify-center px-8 py-3 bg-white text-orange-600 font-bold rounded-lg hover:bg-gray-100 transition-colors"
              >
                📞 Nous appeler
              </a>
              <a
                href="#booking"
                className="inline-flex items-center justify-center px-8 py-3 bg-orange-700 hover:bg-orange-800 text-white font-bold rounded-lg transition-colors"
              >
                💬 Demander un devis
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
