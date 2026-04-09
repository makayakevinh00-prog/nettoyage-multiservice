import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Building2, CheckCircle2, Shield, Sparkles, Clock3, MapPin } from "lucide-react";
import { useState } from "react";

export default function ServiceBalcon() {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const scrollToBooking = () => {
    window.location.href = '/reservation-balcon';
  };

  const faqs = [
    {
      question: "Quel est le prix du nettoyage de balcon à Paris et en Île-de-France ?",
      answer: "Les tarifs dépendent de la taille : balcon standard (50€), avec garde-corps (70€), grand balcon/loggia (100€). Nettoyage joints supplémentaire (+20€). Devis gratuit sous 30 minutes."
    },
    {
      question: "Combien de temps dure le nettoyage d'un balcon ?",
      answer: "La durée varie selon la taille et l'état : balcon standard (1-2h), grand balcon (2-3h). Nous utilisons du matériel haute pression professionnel pour un résultat rapide."
    },
    {
      question: "Pouvez-vous nettoyer les garde-corps et rampes ?",
      answer: "Oui ! Nous nettoyons complètement les garde-corps, rampes, carrelage et joints. Technique adaptée selon le matériau (fer, aluminium, verre, etc.)."
    },
    {
      question: "Utilisez-vous des produits écologiques ?",
      answer: "Oui ! Tous nos produits sont écologiques et biodégradables. Sans danger pour votre famille, vos animaux et l'environnement. Respectueux des normes strictes."
    },
    {
      question: "Êtes-vous disponible pour un nettoyage urgent ?",
      answer: "Oui, nous sommes disponibles 7j/7 incluant les week-ends. Contactez-nous au 06 17 21 22 30 pour une intervention rapide. Créneaux de dépannage disponibles."
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
              backgroundImage: "url('https://files.manuscdn.com/user_upload_by_module/session_file/310519663223121429/rPOrxYmzanxOtBXU.jpg')",
              backgroundPosition: 'center 30%',
            }}
          />
          <div className="absolute inset-0 bg-black/40" />
          
          <div className="relative z-50 container mx-auto px-4 text-center">
            <div className="max-w-3xl mx-auto">
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
                Nettoyage de Balcon Professionnel
              </h1>
              <p className="text-2xl text-orange-400 mb-8 font-semibold">
                Nettoyage complet et garde-corps en Île-de-France
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
                Service de Nettoyage de Balcon à Paris et Île-de-France
              </h2>
              <p className="text-xl text-gray-700 mb-6">
                ProClean Empire propose un service de nettoyage de balcon complet et professionnel. Nettoyage haute pression, garde-corps, carrelage et joints pour un balcon impeccable.
              </p>
              <p className="text-lg text-gray-700 mb-6">
                Avec plus de 5 ans d'expérience, nous intervenons sur tous types de balcons : petits, grands, loggias. Nos techniques professionnelles éliminent la saleté, la mousse et les taches sans endommager votre balcon. Produits écologiques garantis.
              </p>
            </div>
          </div>
        </section>

        {/* Services Offered */}
        <section className="py-20 md:py-32 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-gray-900 mb-16 text-center">
              Nos Prestations de Nettoyage de Balcon
            </h2>

            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <Card className="hover:shadow-lg transition-all">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Building2 className="w-6 h-6 text-orange-500" />
                    Nettoyage Balcon Standard
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 mb-4">
                    Nettoyage complet du balcon avec lavage haute pression et séchage professionnel.
                  </p>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-500" />
                      Nettoyage haute pression
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-500" />
                      Séchage professionnel
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-500" />
                      Nettoyage carrelage
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-all">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Sparkles className="w-6 h-6 text-yellow-500" />
                    Nettoyage Garde-Corps
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 mb-4">
                    Nettoyage spécialisé des garde-corps, rampes et barres. Tous matériaux : fer, aluminium, verre.
                  </p>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-500" />
                      Tous matériaux
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-500" />
                      Technique adaptée
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-500" />
                      Finition brillante
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-all">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="w-6 h-6 text-blue-500" />
                    Nettoyage Joints
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 mb-4">
                    Nettoyage profond des joints entre les dalles avec élimination de la mousse.
                  </p>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-500" />
                      Nettoyage joints
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-500" />
                      Élimination mousse
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-500" />
                      Traitement anti-mousse
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
                    Forfaits d'entretien régulier pour maintenir votre balcon propre toute l'année.
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
              Pourquoi Choisir ProClean Empire pour Nettoyer Votre Balcon ?
            </h2>

            <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <CheckCircle2 className="w-8 h-8 text-green-500" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Expertise Balcons</h3>
                  <p className="text-gray-700">Spécialistes du nettoyage de balcons depuis 5 ans. Tous types : petits, grands, loggias. Techniques adaptées à chaque configuration.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <Sparkles className="w-8 h-8 text-yellow-500" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Matériel Professionnel</h3>
                  <p className="text-gray-700">Équipement haute pression de dernière génération. Pression ajustée selon le matériau pour un résultat optimal sans dommage.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <Shield className="w-8 h-8 text-blue-500" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Produits Écologiques</h3>
                  <p className="text-gray-700">Produits écologiques et biodégradables. Sans danger pour votre famille, vos animaux et l'environnement.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <MapPin className="w-8 h-8 text-red-500" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Intervention Rapide</h3>
                  <p className="text-gray-700">Devis gratuit sous 30 minutes. Intervention rapide à domicile en Île-de-France. Disponible 7j/7.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 md:py-32 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-gray-900 mb-16 text-center">
              Questions Fréquemment Posées sur le Nettoyage de Balcon
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
              Prêt à Nettoyer Votre Balcon ?
            </h2>
            <p className="text-xl text-white mb-8 max-w-2xl mx-auto">
              Demandez votre devis gratuit dès maintenant. Intervention rapide à domicile en Île-de-France, 7j/7.
            </p>
            <Button 
              onClick={() => window.location.href = '/reservation-balcon'}
              className="bg-white hover:bg-gray-100 text-orange-600 font-bold px-10 py-4 text-lg rounded-full"
            >
              Réserver mon nettoyage de balcon
            </Button>
          </div>
        </section>
      </main>
    </div>
  );
}
