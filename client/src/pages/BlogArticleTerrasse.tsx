import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Clock, ArrowLeft } from "lucide-react";
import { Link } from "wouter";
import { useState } from "react";

export default function BlogArticleTerrasse() {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const faqs = [
    {
      question: "Quelle est la meilleure période pour nettoyer sa terrasse ?",
      answer: "Le printemps et l'automne sont les meilleures périodes. Évitez les périodes de gel en hiver. Un nettoyage régulier (tous les 3-6 mois) est recommandé pour maintenir votre terrasse en bon état."
    },
    {
      question: "Quels produits utiliser pour nettoyer une terrasse ?",
      answer: "Utilisez des produits écologiques et biodégradables. Eau savonneuse, vinaigre blanc, ou produits spécialisés pour terrasse. Évitez les produits chimiques agressifs qui endommagent la surface."
    },
    {
      question: "Comment éliminer les taches tenaces sur une terrasse ?",
      answer: "Pour les taches tenaces : frottez avec une brosse dure, utilisez un nettoyeur haute pression (avec prudence), ou appliquez un détachant spécialisé. Pour les taches d'algues, utilisez un traitement anti-mousse."
    },
    {
      question: "À quelle fréquence faut-il nettoyer sa terrasse ?",
      answer: "Un nettoyage régulier tous les 3-6 mois est recommandé. En zone humide ou ombragée, augmentez la fréquence. Un entretien régulier prévient l'accumulation de saleté et d'algues."
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
                <span className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full font-semibold">Terrasse</span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  28 février 2026
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  8 min de lecture
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Comment Nettoyer sa Terrasse en 5 Étapes Simples
              </h1>
              <p className="text-xl text-gray-700">
                Guide complet pour nettoyer votre terrasse comme un professionnel. Découvrez les techniques, produits et équipements nécessaires pour obtenir une terrasse impeccable.
              </p>
            </div>
          </div>
        </section>

        {/* Article Content */}
        <section className="py-12 md:py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto prose prose-lg max-w-none">
              <h2 className="text-3xl font-bold text-gray-900 mt-8 mb-4">Introduction</h2>
              <p className="text-gray-700 mb-6">
                Une terrasse propre et bien entretenue est le prolongement idéal de votre maison. Cependant, avec le temps, les intempéries, l'humidité et la pollution accumulent saleté, mousse et algues. Nettoyer sa terrasse régulièrement n'est pas seulement une question d'esthétique, c'est aussi une question de sécurité et de durabilité.
              </p>

              <h2 className="text-3xl font-bold text-gray-900 mt-8 mb-4">Étape 1 : Préparation et Équipement</h2>
              <p className="text-gray-700 mb-6">
                Avant de commencer, rassemblez tous les équipements nécessaires. Vous aurez besoin d'une brosse dure, d'un balai, d'un nettoyeur haute pression (optionnel mais recommandé), de produits de nettoyage écologiques, de gants de protection et d'une paire de chaussures antidérapantes.
              </p>
              <p className="text-gray-700 mb-6">
                Vérifiez également la météo. Évitez de nettoyer par temps de pluie ou de grand soleil. Un jour nuageux et sec est idéal. Dégagez la terrasse de tous les meubles et objets pour avoir accès à toute la surface.
              </p>

              <h2 className="text-3xl font-bold text-gray-900 mt-8 mb-4">Étape 2 : Balayage Initial</h2>
              <p className="text-gray-700 mb-6">
                Commencez par balayer la terrasse pour éliminer les feuilles mortes, poussière et débris. Cette étape est cruciale car elle facilite le nettoyage ultérieur. Utilisez un balai rigide pour atteindre les coins et les joints.
              </p>

              <h2 className="text-3xl font-bold text-gray-900 mt-8 mb-4">Étape 3 : Application du Produit de Nettoyage</h2>
              <p className="text-gray-700 mb-6">
                Appliquez un produit de nettoyage écologique sur toute la surface. Vous pouvez utiliser une solution d'eau savonneuse, de vinaigre blanc dilué, ou un produit spécialisé pour terrasse. Laissez agir pendant 15-20 minutes pour que le produit pénètre et dissolve la saleté.
              </p>

              <h2 className="text-3xl font-bold text-gray-900 mt-8 mb-4">Étape 4 : Frottage et Nettoyage</h2>
              <p className="text-gray-700 mb-6">
                Frottez la terrasse avec une brosse dure en effectuant des mouvements circulaires. Insistez sur les zones tachées ou moussues. Pour les taches tenaces, utilisez un nettoyeur haute pression à faible pression pour éviter d'endommager la surface.
              </p>

              <h2 className="text-3xl font-bold text-gray-900 mt-8 mb-4">Étape 5 : Rinçage et Séchage</h2>
              <p className="text-gray-700 mb-6">
                Rincez abondamment à l'eau claire pour éliminer tous les résidus de produit. Utilisez un nettoyeur haute pression si disponible, ou un tuyau d'arrosage. Laissez sécher complètement avant de remettre les meubles en place.
              </p>

              <h2 className="text-3xl font-bold text-gray-900 mt-8 mb-4">Conseils Supplémentaires</h2>
              <p className="text-gray-700 mb-6">
                Pour maintenir votre terrasse en bon état, nettoyez-la régulièrement (tous les 3-6 mois). Appliquez un traitement anti-mousse en automne pour prévenir la formation d'algues. Utilisez toujours des produits écologiques pour protéger l'environnement et votre famille.
              </p>

              <h2 className="text-3xl font-bold text-gray-900 mt-8 mb-4">Conclusion</h2>
              <p className="text-gray-700 mb-6">
                Nettoyer sa terrasse en suivant ces 5 étapes simples garantit un résultat professionnel. Si vous préférez déléguer cette tâche, ProClean Empire propose un service de nettoyage de terrasse professionnel en Île-de-France. Contactez-nous pour un devis gratuit !
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
              Besoin d'un Nettoyage Professionnel de Terrasse ?
            </h2>
            <p className="text-lg text-white mb-8 max-w-2xl mx-auto">
              ProClean Empire propose un service de nettoyage de terrasse professionnel en Île-de-France. Devis gratuit sous 30 minutes !
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
