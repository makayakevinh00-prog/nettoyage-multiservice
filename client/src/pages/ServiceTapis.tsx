import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Sofa, CheckCircle2, Shield, Sparkles, Clock3, MapPin } from "lucide-react";
import { useState } from "react";

export default function ServiceTapis() {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const scrollToBooking = () => {
    window.location.href = '/reservation-tapis';
  };

  const faqs = [
    {
      question: "Quel est le prix du nettoyage de tapis à Paris et en Île-de-France ?",
      answer: "Les tarifs dépendent de la taille : petit tapis < 3m² (40€), moyen 3-6m² (70€), grand > 6m² (100€). Canapé 2-3 places (80€). Devis gratuit sous 30 minutes. Contactez-nous pour une estimation précise selon votre tapis."
    },
    {
      question: "Combien de temps dure le nettoyage d'un tapis ?",
      answer: "La durée varie selon la taille et l'état : petit tapis (1-2h), moyen (2-3h), grand (3-4h). Nous utilisons la technique injection-extraction professionnelle pour un séchage rapide (4-6h)."
    },
    {
      question: "Éliminez-vous les taches tenaces et les odeurs ?",
      answer: "Oui ! Nous éliminons les taches tenaces (café, vin, sang, etc.) avec des produits spécialisés. Traitement anti-odeurs inclus. Résultat garanti ou argent remboursé."
    },
    {
      question: "Le nettoyage de tapis élimine-t-il les acariens et allergènes ?",
      answer: "Absolument ! Notre technique injection-extraction élimine 99% des acariens, allergènes et bactéries. Idéal pour les personnes allergiques. Produits hypoallergéniques disponibles."
    },
    {
      question: "Pouvez-vous nettoyer les canapés et meubles rembourrés ?",
      answer: "Oui ! Nous nettoyons les canapés, fauteuils, chaises rembourrées avec techniques adaptées. Même résultat professionnel que pour les tapis. Devis gratuit."
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative h-[500px] flex items-center justify-center overflow-hidden">
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: "url('https://files.manuscdn.com/user_upload_by_module/session_file/310519663223121429/EjnzEtAMpiePukrT.jpg')",
              backgroundPosition: 'center 30%',
            }}
          />
          <div className="absolute inset-0 bg-black/40" />
          
          <div className="relative z-50 container mx-auto px-4 text-center">
            <div className="max-w-3xl mx-auto">
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
                Nettoyage Tapis et Canapés Professionnel
              </h1>
              <p className="text-2xl text-orange-400 mb-8 font-semibold">
                Injection-extraction et détachage en Île-de-France
              </p>
              <Button 
                onClick={scrollToBooking}
                className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-10 py-4 text-lg rounded-full"
              >
                Demander mon devis gratuit →
              </Button>
            </div>
          </div>
        </section>

        {/* Introduction Section */}
        <section className="py-20 md:py-32 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Service de Nettoyage de Tapis et Canapés à Paris et Île-de-France
              </h2>
              <p className="text-xl text-gray-700 mb-6">
                ProClean Empire propose un service de nettoyage de tapis et canapés professionnel avec technique injection-extraction. Élimination des taches tenaces, acariens et odeurs pour un résultat impeccable.
              </p>
              <p className="text-lg text-gray-700 mb-6">
                Avec plus de 5 ans d'expérience, nous nettoyons tous types de tapis et meubles rembourrés. Nos produits écologiques et hypoallergéniques sont sans danger pour votre famille. Séchage rapide garanti.
              </p>
            </div>
          </div>
        </section>

        {/* Services Offered */}
        <section className="py-20 md:py-32 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-gray-900 mb-16 text-center">
              Nos Prestations de Nettoyage de Tapis
            </h2>

            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <Card className="hover:shadow-lg transition-all">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Sofa className="w-6 h-6 text-orange-500" />
                    Nettoyage Tapis Petit Format
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 mb-4">
                    Nettoyage complet des petits tapis (moins de 3m²) avec injection-extraction et détachage professionnel.
                  </p>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-500" />
                      Injection-extraction
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-500" />
                      Détachage professionnel
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-500" />
                      Séchage rapide
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-all">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Sparkles className="w-6 h-6 text-yellow-500" />
                    Nettoyage Tapis Moyen et Grand
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 mb-4">
                    Nettoyage complet des tapis moyens (3-6m²) et grands (plus de 6m²) avec traitement anti-acariens.
                  </p>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-500" />
                      Traitement anti-acariens
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-500" />
                      Élimination allergènes
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-500" />
                      Désodorisation
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-all">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="w-6 h-6 text-blue-500" />
                    Nettoyage Canapés et Fauteuils
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 mb-4">
                    Nettoyage professionnel des canapés, fauteuils et chaises rembourrées avec technique adaptée.
                  </p>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-500" />
                      Technique adaptée
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-500" />
                      Détachage spécialisé
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-500" />
                      Protection tissu
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-all">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock3 className="w-6 h-6 text-orange-500" />
                    Maintenance Régulière
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 mb-4">
                    Forfaits d'entretien régulier pour maintenir vos tapis et canapés propres toute l'année.
                  </p>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-500" />
                      Entretien régulier
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-500" />
                      Tarifs réduits
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-500" />
                      Priorité intervention
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-20 md:py-32 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-gray-900 mb-16 text-center">
              Pourquoi Choisir ProClean Empire pour Nettoyer Vos Tapis ?
            </h2>

            <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <CheckCircle2 className="w-8 h-8 text-green-500" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Technique Injection-Extraction</h3>
                  <p className="text-gray-700">Technique professionnelle la plus efficace pour éliminer 99% des acariens, allergènes et bactéries. Séchage rapide en 4-6h.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <Sparkles className="w-8 h-8 text-yellow-500" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Détachage Spécialisé</h3>
                  <p className="text-gray-700">Élimination des taches tenaces (café, vin, sang, etc.) avec produits spécialisés. Résultat garanti ou argent remboursé.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <Shield className="w-8 h-8 text-blue-500" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Produits Écologiques</h3>
                  <p className="text-gray-700">Produits hypoallergéniques et écologiques. Sans danger pour votre famille, vos animaux et l'environnement.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <MapPin className="w-8 h-8 text-red-500" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Intervention à Domicile</h3>
                  <p className="text-gray-700">Nous intervenons directement chez vous en Île-de-France. Disponible 7j/7 avec créneaux flexibles.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 md:py-32 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-gray-900 mb-16 text-center">
              Questions Fréquemment Posées sur le Nettoyage de Tapis
            </h2>

            <div className="max-w-3xl mx-auto space-y-4">
              {faqs.map((faq, index) => (
                <div 
                  key={index}
                  className="border border-gray-200 rounded-lg overflow-hidden hover:border-orange-500 transition-all"
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
        </section>

        {/* CTA Section */}
        <section id="booking-section" className="py-20 md:py-32 bg-gradient-to-r from-orange-500 to-orange-600">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Prêt à Nettoyer Vos Tapis et Canapés ?
            </h2>
            <p className="text-xl text-white mb-8 max-w-2xl mx-auto">
              Demandez votre devis gratuit dès maintenant. Intervention rapide à domicile en Île-de-France, 7j/7.
            </p>
            <Button 
              onClick={() => window.location.href = '/reservation-tapis'}
              className="bg-white hover:bg-gray-100 text-orange-600 font-bold px-10 py-4 text-lg rounded-full"
            >
              Réserver mon nettoyage de tapis
            </Button>
          </div>
        </section>
      </main>
    </div>
  );
}
