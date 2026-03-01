import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, ArrowLeft } from "lucide-react";
import { Link } from "wouter";
import { useState } from "react";

export default function BlogArticleAuto() {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const faqs = [
    {
      question: "À quelle fréquence faut-il laver sa voiture ?",
      answer: "Un lavage tous les 2-4 semaines est recommandé. En hiver ou en zone côtière, augmentez la fréquence. Un lavage régulier protège la peinture et prévient la rouille."
    },
    {
      question: "Quel est le meilleur moment pour laver sa voiture ?",
      answer: "Lavez votre voiture le matin ou en fin d'après-midi, par temps nuageux. Évitez le grand soleil qui peut laisser des traces. Un jour sans pluie prévue est idéal."
    },
    {
      question: "Comment protéger la peinture après le lavage ?",
      answer: "Appliquez un produit de protection (cire ou scellant) tous les 3-6 mois. Utilisez des produits de nettoyage doux. Évitez les lavages haute pression trop agressifs."
    },
    {
      question: "Quels sont les avantages du detailing professionnel ?",
      answer: "Le detailing professionnel nettoie en profondeur, protège la peinture, restaure l'intérieur et prolonge la durée de vie de votre voiture. C'est un investissement qui en vaut la peine."
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      
      <main className="flex-1">
        {/* Back Button */}
        <div className="bg-gray-50 border-b border-gray-200">
          <div className="container mx-auto px-4 py-4">
            <Link href="/blog">
              <Button variant="ghost" className="text-gray-700 hover:text-gray-900">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Retour au blog
              </Button>
            </Link>
          </div>
        </div>

        {/* Article Header */}
        <section className="py-12 md:py-20 bg-white border-b border-gray-200">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <div className="flex items-center gap-4 mb-6 text-sm text-gray-600">
                <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full font-semibold">Automobile</span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  15 février 2026
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  8 min de lecture
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Lavage Auto Professionnel : Nos Secrets Révélés
              </h1>
              <p className="text-xl text-gray-700">
                Découvrez les techniques professionnelles de lavage auto et comment protéger votre voiture. Guide complet pour un résultat impeccable.
              </p>
            </div>
          </div>
        </section>

        {/* Article Content */}
        <section className="py-12 md:py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mt-8 mb-4">Introduction</h2>
              <p className="text-gray-700 mb-6">
                Le lavage auto professionnel n'est pas seulement une question d'esthétique. C'est aussi une question de protection et de durabilité. Une voiture bien entretenue conserve sa valeur et dure plus longtemps. Découvrez les techniques professionnelles pour un résultat impeccable.
              </p>

              <h2 className="text-3xl font-bold text-gray-900 mt-8 mb-4">Les Étapes du Lavage Professionnel</h2>
              <p className="text-gray-700 mb-6">
                **Étape 1 : Rinçage initial** - Rincez la voiture à l'eau pour éliminer les débris et la poussière.
              </p>
              <p className="text-gray-700 mb-6">
                **Étape 2 : Lavage** - Utilisez un savon professionnel et une brosse douce. Lavez de haut en bas.
              </p>
              <p className="text-gray-700 mb-6">
                **Étape 3 : Rinçage final** - Rincez abondamment pour éliminer tous les résidus de savon.
              </p>
              <p className="text-gray-700 mb-6">
                **Étape 4 : Séchage** - Séchez avec des chiffons doux pour éviter les traces d'eau.
              </p>
              <p className="text-gray-700 mb-6">
                **Étape 5 : Protection** - Appliquez une cire ou un scellant pour protéger la peinture.
              </p>

              <h2 className="text-3xl font-bold text-gray-900 mt-8 mb-4">Nettoyage Intérieur Professionnel</h2>
              <p className="text-gray-700 mb-6">
                L'intérieur est tout aussi important que l'extérieur. Aspirez les sièges et les tapis, nettoyez le tableau de bord, les vitres intérieures et les tapis de sol. Utilisez des produits spécialisés pour chaque surface.
              </p>

              <h2 className="text-3xl font-bold text-gray-900 mt-8 mb-4">Detailing : La Touche Finale</h2>
              <p className="text-gray-700 mb-6">
                Le detailing professionnel va au-delà du simple lavage. Il inclut le polissage, le lustrage, la protection des vitres et l'entretien des pneus. C'est un service complet qui restaure votre voiture à son état d'origine.
              </p>

              <h2 className="text-3xl font-bold text-gray-900 mt-8 mb-4">Produits Recommandés</h2>
              <p className="text-gray-700 mb-6">
                Utilisez toujours des produits de qualité professionnelle. Savon auto doux, cire de protection, scellant céramique, produits pour l'intérieur. Les produits professionnels garantissent un meilleur résultat et une meilleure protection.
              </p>

              <h2 className="text-3xl font-bold text-gray-900 mt-8 mb-4">Fréquence Recommandée</h2>
              <p className="text-gray-700 mb-6">
                Lavage : Tous les 2-4 semaines
              </p>
              <p className="text-gray-700 mb-6">
                Cire/Scellant : Tous les 3-6 mois
              </p>
              <p className="text-gray-700 mb-6">
                Detailing complet : 1-2 fois par an
              </p>

              <h2 className="text-3xl font-bold text-gray-900 mt-8 mb-4">Conclusion</h2>
              <p className="text-gray-700 mb-6">
                Un lavage auto professionnel régulier protège votre investissement et prolonge la durée de vie de votre voiture. Si vous préférez déléguer cette tâche, ProClean Empire propose un service de lavage auto professionnel en Île-de-France. Contactez-nous pour un devis gratuit !
              </p>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 md:py-24 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
                Questions Fréquemment Posées
              </h2>

              <div className="space-y-4">
                {faqs.map((faq, index) => (
                  <div 
                    key={index}
                    className="border border-gray-200 rounded-lg overflow-hidden hover:border-orange-500 transition-all bg-white"
                  >
                    <button
                      onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                      className="w-full px-6 py-4 text-left font-bold text-gray-900 hover:bg-gray-50 transition-all flex justify-between items-center"
                    >
                      <span>{faq.question}</span>
                      <span className="text-orange-500">{expandedFaq === index ? '−' : '+'}</span>
                    </button>
                    {expandedFaq === index && (
                      <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 text-gray-700">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-24 bg-gradient-to-r from-orange-500 to-orange-600">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Besoin d'un Lavage Auto Professionnel ?
            </h2>
            <p className="text-lg text-white mb-8 max-w-2xl mx-auto">
              ProClean Empire propose un service de lavage auto professionnel en Île-de-France. Devis gratuit sous 30 minutes !
            </p>
            <Button 
              onClick={() => window.location.href = '/#booking'}
              className="bg-white hover:bg-gray-100 text-orange-600 font-bold px-10 py-4 text-lg rounded-full"
            >
              Demander mon devis gratuit
            </Button>
          </div>
        </section>
      </main>
    </div>
  );
}
