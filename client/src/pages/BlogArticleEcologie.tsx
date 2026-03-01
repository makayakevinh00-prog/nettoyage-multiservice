import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, ArrowLeft } from "lucide-react";
import { Link } from "wouter";
import { useState } from "react";

export default function BlogArticleEcologie() {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const faqs = [
    {
      question: "Pourquoi choisir le nettoyage écologique ?",
      answer: "Le nettoyage écologique protège votre santé, celle de votre famille et l'environnement. Les produits chimiques agressifs peuvent causer des allergies et des problèmes respiratoires. Les produits écologiques sont tout aussi efficaces sans les risques."
    },
    {
      question: "Quels sont les produits écologiques recommandés ?",
      answer: "Vinaigre blanc, bicarbonate de soude, savon noir, citron, eau oxygénée. Ces produits naturels sont efficaces pour la plupart des nettoyages. Vous pouvez aussi utiliser des produits certifiés écologiques et biodégradables."
    },
    {
      question: "Le nettoyage écologique est-il moins efficace ?",
      answer: "Non ! Les produits écologiques sont tout aussi efficaces que les produits chimiques. Ils nécessitent parfois un peu plus de temps ou d'effort, mais les résultats sont excellents."
    },
    {
      question: "Comment faire du nettoyage écologique à domicile ?",
      answer: "Utilisez des produits naturels : vinaigre blanc dilué pour les vitres, bicarbonate pour les taches, savon noir pour les surfaces. Combinez avec une brosse dure et de l'eau. C'est économique et efficace !"
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
                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full font-semibold">Écologie</span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  25 février 2026
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  6 min de lecture
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Nettoyage Écologique : Pourquoi et Comment ?
              </h1>
              <p className="text-xl text-gray-700">
                Découvrez les avantages du nettoyage écologique pour votre santé et l'environnement. Produits naturels, techniques durables et résultats garantis.
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
                Le nettoyage écologique n'est pas une tendance passagère, c'est une nécessité. Les produits chimiques traditionnels peuvent causer des problèmes de santé, polluer l'eau et nuire à l'environnement. Heureusement, il existe des alternatives efficaces et naturelles.
              </p>

              <h2 className="text-3xl font-bold text-gray-900 mt-8 mb-4">Pourquoi Choisir le Nettoyage Écologique ?</h2>
              <p className="text-gray-700 mb-6">
                Les produits chimiques agressifs contiennent souvent des substances toxiques qui peuvent causer des allergies, des problèmes respiratoires et d'autres problèmes de santé. Le nettoyage écologique utilise des produits naturels qui sont sûrs pour votre famille et vos animaux de compagnie.
              </p>
              <p className="text-gray-700 mb-6">
                De plus, les produits écologiques sont biodégradables et ne polluent pas les cours d'eau. Ils sont également moins chers que les produits chimiques professionnels.
              </p>

              <h2 className="text-3xl font-bold text-gray-900 mt-8 mb-4">Produits Écologiques Recommandés</h2>
              <p className="text-gray-700 mb-6">
                **Vinaigre blanc** : Parfait pour les vitres, les surfaces et l'élimination du calcaire. Dilué dans l'eau, il nettoie efficacement sans laisser de résidu.
              </p>
              <p className="text-gray-700 mb-6">
                **Bicarbonate de soude** : Excellent pour les taches tenaces, les odeurs et le nettoyage en profondeur. Combinez-le avec de l'eau pour créer une pâte.
              </p>
              <p className="text-gray-700 mb-6">
                **Savon noir** : Idéal pour les surfaces, les sols et le nettoyage général. Très efficace et économique.
              </p>
              <p className="text-gray-700 mb-6">
                **Citron** : Excellent pour les taches, les odeurs et le nettoyage des surfaces. L'acide citrique est naturel et efficace.
              </p>

              <h2 className="text-3xl font-bold text-gray-900 mt-8 mb-4">Techniques de Nettoyage Écologique</h2>
              <p className="text-gray-700 mb-6">
                1. **Préparation** : Rassemblez vos produits naturels et vos outils (brosse dure, chiffon, balai).
              </p>
              <p className="text-gray-700 mb-6">
                2. **Application** : Appliquez le produit naturel sur la surface à nettoyer.
              </p>
              <p className="text-gray-700 mb-6">
                3. **Frottage** : Frottez avec une brosse dure ou un chiffon. Laissez agir si nécessaire.
              </p>
              <p className="text-gray-700 mb-6">
                4. **Rinçage** : Rincez abondamment à l'eau claire.
              </p>

              <h2 className="text-3xl font-bold text-gray-900 mt-8 mb-4">Avantages du Nettoyage Écologique</h2>
              <p className="text-gray-700 mb-6">
                ✅ **Sécurité** : Pas de produits toxiques pour votre famille
              </p>
              <p className="text-gray-700 mb-6">
                ✅ **Environnement** : Produits biodégradables et non polluants
              </p>
              <p className="text-gray-700 mb-6">
                ✅ **Économie** : Produits moins chers que les nettoyants chimiques
              </p>
              <p className="text-gray-700 mb-6">
                ✅ **Efficacité** : Tout aussi efficace que les produits chimiques
              </p>

              <h2 className="text-3xl font-bold text-gray-900 mt-8 mb-4">Conclusion</h2>
              <p className="text-gray-700 mb-6">
                Le nettoyage écologique est une excellente alternative aux produits chimiques. C'est bon pour votre santé, l'environnement et votre portefeuille. Commencez dès aujourd'hui avec les produits naturels que vous avez probablement déjà chez vous !
              </p>
              <p className="text-gray-700 mb-6">
                Si vous préférez déléguer cette tâche, ProClean Empire propose un service de nettoyage écologique professionnel en Île-de-France. Contactez-nous pour un devis gratuit !
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
              Besoin d'un Nettoyage Écologique Professionnel ?
            </h2>
            <p className="text-lg text-white mb-8 max-w-2xl mx-auto">
              ProClean Empire propose un service de nettoyage écologique professionnel en Île-de-France. Devis gratuit sous 30 minutes !
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
