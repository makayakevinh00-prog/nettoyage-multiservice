import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Leaf, CheckCircle2, Shield, Sparkles, Clock3, MapPin } from "lucide-react";
import { useState } from "react";

export default function ServiceJardinage() {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const scrollToBooking = () => {
    window.location.href = '/reservation-jardinage';
  };

  const faqs = [
    {
      question: "Quel est le prix du nettoyage et entretien de jardin à Paris et en Île-de-France ?",
      answer: "Les tarifs dépendent de la surface et du type d'entretien : petit jardin (moins de 50m²) à partir de 80€, moyen (50-100m²) à partir de 150€, grand (plus de 100m²) sur devis. Forfaits mensuels disponibles avec réduction. Devis gratuit sous 30 minutes."
    },
    {
      question: "Quels services d'entretien de jardin proposez-vous ?",
      answer: "Tonte de gazon, taille de haies, élagage, débroussaillage, nettoyage allées, élimination mousse, traitement anti-mousse, compostage. Tous les travaux de jardinage professionnel. Devis personnalisé selon vos besoins."
    },
    {
      question: "Utilisez-vous des produits écologiques pour le jardin ?",
      answer: "Oui ! Nous privilégions les méthodes écologiques et les produits naturels. Pas de pesticides agressifs. Respect de l'environnement et de la biodiversité. Produits certifiés écologiques."
    },
    {
      question: "Pouvez-vous entretenir mon jardin régulièrement ?",
      answer: "Oui ! Nous proposons des forfaits d'entretien régulier : hebdomadaire, bimensuel ou mensuel. Tarifs réduits pour les contrats d'entretien. Équipe stable et fiable."
    },
    {
      question: "Êtes-vous disponible pour un entretien urgent ?",
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
              backgroundImage: "url('https://files.manuscdn.com/user_upload_by_module/session_file/310519663223121429/EjnzEtAMpiePukrT.jpg')",
              backgroundPosition: 'center 30%',
            }}
          />
          <div className="absolute inset-0 bg-black/40" />
          
          <div className="relative z-50 container mx-auto px-4 text-center">
            <div className="max-w-3xl mx-auto">
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
                Nettoyage et Entretien de Jardin Professionnel
              </h1>
              <p className="text-2xl text-orange-400 mb-8 font-semibold">
                Jardinage, tonte, taille en Île-de-France
              </p>
              <Button 
                onClick={scrollToBooking}
                className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-10 py-4 text-lg rounded-full"
              >
                Demander mon devis gratuit
              </Button>
            </div>
          </div>
        </section>

        {/* Introduction Section */}
        <section className="py-20 md:py-32 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Service de Nettoyage et Entretien de Jardin à Paris et Île-de-France
              </h2>
              <p className="text-xl text-gray-700 mb-6">
                ProClean Empire propose un service complet d'entretien de jardin professionnel. Tonte de gazon, taille de haies, élagage, débroussaillage et nettoyage pour un jardin impeccable.
              </p>
              <p className="text-lg text-gray-700 mb-6">
                Avec plus de 5 ans d'expérience, nous intervenons sur tous types de jardins : petits, grands, terrasses végétalisées. Nos techniques professionnelles garantissent un jardin bien entretenu. Produits écologiques et respectueux de l'environnement.
              </p>
            </div>
          </div>
        </section>

        {/* Services Offered */}
        <section className="py-20 md:py-32 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-gray-900 mb-16 text-center">
              Nos Prestations d'Entretien de Jardin
            </h2>

            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <Card className="hover:shadow-lg transition-all">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Leaf className="w-6 h-6 text-green-500" />
                    Tonte de Gazon
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 mb-4">
                    Tonte régulière de votre gazon avec matériel professionnel haute performance.
                  </p>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-500" />
                      Tonte régulière
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-500" />
                      Matériel professionnel
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-500" />
                      Évacuation résidus
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-all">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Sparkles className="w-6 h-6 text-yellow-500" />
                    Taille de Haies
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 mb-4">
                    Taille professionnelle de haies, arbustes et buissons pour un jardin bien structuré.
                  </p>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-500" />
                      Taille précise
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-500" />
                      Tous types haies
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-500" />
                      Évacuation débris
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-all">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="w-6 h-6 text-blue-500" />
                    Élagage et Débroussaillage
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 mb-4">
                    Élagage d'arbres et débroussaillage professionnel pour un jardin dégagé.
                  </p>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-500" />
                      Élagage sécurisé
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-500" />
                      Débroussaillage
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-500" />
                      Évacuation bois
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-all">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock3 className="w-6 h-6 text-orange-500" />
                    Entretien Régulier
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 mb-4">
                    Forfaits d'entretien régulier pour maintenir votre jardin impeccable toute l'année.
                  </p>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-500" />
                      Entretien mensuel
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-500" />
                      Tarifs réduits
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-500" />
                      Équipe stable
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
              Pourquoi Choisir ProClean Empire pour Entretenir Votre Jardin ?
            </h2>

            <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <CheckCircle2 className="w-8 h-8 text-green-500" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Expertise Jardinage</h3>
                  <p className="text-gray-700">Spécialistes de l'entretien de jardin depuis 5 ans. Tous types de jardins. Techniques professionnelles adaptées à chaque saison.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <Sparkles className="w-8 h-8 text-yellow-500" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Matériel Professionnel</h3>
                  <p className="text-gray-700">Équipement de dernière génération. Tondeuses, taille-haies, débroussailleuses professionnelles pour un travail de qualité.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <Shield className="w-8 h-8 text-blue-500" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Produits Écologiques</h3>
                  <p className="text-gray-700">Respect de l'environnement et de la biodiversité. Produits naturels et écologiques. Pas de pesticides agressifs.</p>
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
              Questions Fréquemment Posées sur l'Entretien de Jardin
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
              Prêt à Entretenir Votre Jardin ?
            </h2>
            <p className="text-xl text-white mb-8 max-w-2xl mx-auto">
              Demandez votre devis gratuit dès maintenant. Intervention rapide à domicile en Île-de-France, 7j/7.
            </p>
            <Button 
              onClick={() => window.location.href = '/reservation-jardinage'}
              className="bg-white hover:bg-gray-100 text-orange-600 font-bold px-10 py-4 text-lg rounded-full"
            >
              Réserver mon entretien de jardin
            </Button>
          </div>
        </section>
      </main>
    </div>
  );
}
