import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, ArrowLeft } from "lucide-react";
import { Link } from "wouter";
import { useState } from "react";

export default function BlogArticlePiscine() {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const faqs = [
    {
      question: "À quelle fréquence faut-il nettoyer une piscine ?",
      answer: "Un nettoyage hebdomadaire en été et bimensuel en hiver est recommandé. L'entretien régulier prévient l'accumulation de débris et d'algues. Un traitement quotidien de l'eau (pH, chlore) est aussi nécessaire."
    },
    {
      question: "Comment traiter l'eau de la piscine ?",
      answer: "Testez régulièrement le pH (7.2-7.6), le chlore (0.5-1.5 ppm) et l'alcalinité. Ajustez les niveaux avec les produits appropriés. Utilisez un filtre et une pompe en bon état."
    },
    {
      question: "Comment éliminer les algues de la piscine ?",
      answer: "Utilisez un traitement anti-algues spécialisé. Brossez les parois, nettoyez le filtre et augmentez le chlore temporairement. Maintenez une bonne circulation de l'eau."
    },
    {
      question: "Quelles sont les erreurs courantes d'entretien ?",
      answer: "Ne pas tester l'eau régulièrement, négliger le nettoyage du filtre, laisser les débris s'accumuler, ignorer les problèmes d'algues. Ces erreurs entraînent une eau trouble et des problèmes de santé."
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
                <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full font-semibold">Piscine</span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  20 février 2026
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  7 min de lecture
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Entretien Piscine : Les Erreurs à Éviter
              </h1>
              <p className="text-xl text-gray-700">
                Apprenez les erreurs courantes d'entretien de piscine et comment les éviter pour une eau cristalline toute l'année.
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
                L'entretien d'une piscine est essentiel pour maintenir une eau saine et cristalline. Cependant, de nombreux propriétaires commettent des erreurs qui entraînent des problèmes d'algues, une eau trouble et des problèmes de santé. Découvrez les erreurs courantes et comment les éviter.
              </p>

              <h2 className="text-3xl font-bold text-gray-900 mt-8 mb-4">Erreur 1 : Ne Pas Tester l'Eau Régulièrement</h2>
              <p className="text-gray-700 mb-6">
                C'est l'erreur la plus courante. Testez l'eau au moins 2-3 fois par semaine. Vérifiez le pH (7.2-7.6), le chlore (0.5-1.5 ppm) et l'alcalinité. Un mauvais équilibre chimique entraîne des algues et une eau trouble.
              </p>

              <h2 className="text-3xl font-bold text-gray-900 mt-8 mb-4">Erreur 2 : Négliger le Nettoyage du Filtre</h2>
              <p className="text-gray-700 mb-6">
                Le filtre doit être nettoyé régulièrement. Un filtre encrassé réduit l'efficacité de la circulation et favorise la croissance d'algues. Nettoyez le filtre tous les 2-3 jours en été.
              </p>

              <h2 className="text-3xl font-bold text-gray-900 mt-8 mb-4">Erreur 3 : Laisser les Débris s'Accumuler</h2>
              <p className="text-gray-700 mb-6">
                Les feuilles, insectes et débris doivent être enlevés quotidiennement. Utilisez un filet de surface et un aspirateur de piscine. Les débris en décomposition consomment le chlore et favorisent les algues.
              </p>

              <h2 className="text-3xl font-bold text-gray-900 mt-8 mb-4">Erreur 4 : Ignorer les Problèmes d'Algues</h2>
              <p className="text-gray-700 mb-6">
                Les algues se développent rapidement. Dès que vous voyez des taches vertes ou brunes, agissez immédiatement. Utilisez un traitement anti-algues, augmentez le chlore et brossez les parois.
              </p>

              <h2 className="text-3xl font-bold text-gray-900 mt-8 mb-4">Erreur 5 : Mauvaise Circulation de l'Eau</h2>
              <p className="text-gray-700 mb-6">
                La pompe et la filtration doivent fonctionner au moins 8-12 heures par jour. Une mauvaise circulation entraîne une eau stagnante et des algues. Vérifiez régulièrement que la pompe fonctionne correctement.
              </p>

              <h2 className="text-3xl font-bold text-gray-900 mt-8 mb-4">Conseils pour un Entretien Réussi</h2>
              <p className="text-gray-700 mb-6">
                ✅ Testez l'eau régulièrement (2-3 fois par semaine)
              </p>
              <p className="text-gray-700 mb-6">
                ✅ Nettoyez le filtre tous les 2-3 jours
              </p>
              <p className="text-gray-700 mb-6">
                ✅ Enlevez les débris quotidiennement
              </p>
              <p className="text-gray-700 mb-6">
                ✅ Maintenez une bonne circulation de l'eau
              </p>
              <p className="text-gray-700 mb-6">
                ✅ Agissez rapidement en cas de problème d'algues
              </p>

              <h2 className="text-3xl font-bold text-gray-900 mt-8 mb-4">Conclusion</h2>
              <p className="text-gray-700 mb-6">
                L'entretien régulier d'une piscine n'est pas difficile, mais il nécessite de la discipline. En évitant ces erreurs courantes, vous aurez une eau cristalline et saine toute l'année. Si vous préférez déléguer cette tâche, ProClean Empire propose un service d'entretien piscine professionnel en Île-de-France. Contactez-nous pour un devis gratuit !
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
              Besoin d'un Entretien Piscine Professionnel ?
            </h2>
            <p className="text-lg text-white mb-8 max-w-2xl mx-auto">
              ProClean Empire propose un service d'entretien piscine professionnel en Île-de-France. Devis gratuit sous 30 minutes !
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
