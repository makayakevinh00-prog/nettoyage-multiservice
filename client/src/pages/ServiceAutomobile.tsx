import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Car, CheckCircle2, Shield, Sparkles, Clock3, MapPin } from "lucide-react";
import { useState } from "react";
import { ServiceHelmet } from "@/components/ServiceHelmet";
import Header from "@/components/Header";

export default function ServiceAutomobile() {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const serviceTitle = "Nettoyage Automobile Professionnel";
  const serviceDescription = "Service de nettoyage automobile professionnel a Paris et Ile-de-France. Lavage interieur et exterieur, lustrage, protection. Intervention a domicile. Devis gratuit.";
  const serviceKeywords = "nettoyage automobile Paris, nettoyage voiture Ile-de-France, lavage automobile professionnel, nettoyage interieur exterieur, lustrage voiture, detailing automobile";

  const scrollToBooking = () => {
    const bookingSection = document.getElementById('booking-section');
    if (bookingSection) {
      bookingSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const faqs = [
    {
      question: "Quel est le prix du nettoyage automobile à Paris et en Île-de-France ?",
      answer: "Les tarifs varient selon le type de nettoyage : lavage extérieur simple (25€), lavage intérieur et extérieur (45€), lavage complet avec lustrage (80€), et detailing premium (150€). Nous proposons des devis gratuits sans engagement. Contactez-nous pour une estimation personnalisée selon votre véhicule."
    },
    {
      question: "Combien de temps dure un nettoyage automobile professionnel ?",
      answer: "La durée dépend du type de nettoyage : lavage simple (30-45 min), lavage complet (1-2h), detailing premium (3-4h). Nous intervenons à domicile ou en entreprise. Vous pouvez continuer vos activités pendant que nous nettoyons votre véhicule."
    },
    {
      question: "Utilisez-vous des produits écologiques pour le nettoyage automobile ?",
      answer: "Oui ! ProClean Empire utilise exclusivement des produits de nettoyage écologiques et biodégradables. Nos produits sont sans danger pour votre véhicule, l'environnement et votre famille. Nous respectons les normes environnementales strictes."
    },
    {
      question: "Pouvez-vous nettoyer l'intérieur et l'extérieur de ma voiture ?",
      answer: "Absolument ! Nous proposons un nettoyage complet : extérieur (lavage haute pression, lustrage, protection), intérieur (aspiration, nettoyage des sièges, tableaux de bord, vitres). Nos équipes maîtrisent tous les types de véhicules."
    },
    {
      question: "Êtes-vous disponible pour un nettoyage automobile urgent ?",
      answer: "Oui, nous sommes disponibles 7j/7 incluant les week-ends et jours fériés. Contactez-nous au 06 17 21 22 30 pour une intervention rapide. Nous proposons des créneaux de dépannage pour les urgences."
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <ServiceHelmet
        title={serviceTitle}
        description={serviceDescription}
        keywords={serviceKeywords}
        canonical="https://procleanempire.com/service-automobile"
        image="https://files.manuscdn.com/user_upload_by_module/session_file/310519663223121429/EjnzEtAMpiePukrT.jpg"
      />
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
                Nettoyage Automobile Professionnel
              </h1>
              <p className="text-2xl text-orange-400 mb-8 font-semibold">
                Lavage intérieur et extérieur à domicile en Île-de-France
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
                Service de Nettoyage Automobile Premium à Paris et Île-de-France
              </h2>
              <p className="text-xl text-gray-700 mb-6">
                ProClean Empire propose un service de nettoyage automobile professionnel et complet pour tous les types de véhicules. Que vous ayez besoin d'un lavage simple ou d'un detailing premium, nos experts interviennent à domicile ou en entreprise dans toute l'Île-de-France.
              </p>
              <p className="text-lg text-gray-700 mb-6">
                Avec plus de 5 ans d'expérience, nous utilisons du matériel professionnel de dernière génération et des produits écologiques pour garantir un résultat impeccable. Votre véhicule retrouvera son éclat d'origine avec nos techniques de nettoyage haute pression et lustrage.
              </p>
            </div>
          </div>
        </section>

        {/* Services Offered */}
        <section className="py-20 md:py-32 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-gray-900 mb-16 text-center">
              Nos Prestations de Nettoyage Automobile
            </h2>

            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <Card className="hover:shadow-lg transition-all">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Car className="w-6 h-6 text-orange-500" />
                    Lavage Extérieur Simple
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 mb-4">
                    Nettoyage complet de l'extérieur de votre véhicule avec lavage haute pression, séchage et finition. Parfait pour un entretien régulier.
                  </p>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-500" />
                      Lavage haute pression
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-500" />
                      Séchage professionnel
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-500" />
                      Nettoyage des vitres
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-all">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Sparkles className="w-6 h-6 text-yellow-500" />
                    Nettoyage Complet
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 mb-4">
                    Lavage intérieur et extérieur complet. Nettoyage des sièges, tapis, tableau de bord et finition lustrage pour un résultat professionnel.
                  </p>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-500" />
                      Lavage extérieur complet
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-500" />
                      Nettoyage intérieur
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-500" />
                      Lustrage et protection
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-all">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="w-6 h-6 text-blue-500" />
                    Detailing Premium
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 mb-4">
                    Service haut de gamme avec nettoyage en profondeur, traitement des cuirs, protection céramique et finition brillante professionnelle.
                  </p>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-500" />
                      Nettoyage en profondeur
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-500" />
                      Traitement des cuirs
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-500" />
                      Protection céramique
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
                    Forfaits mensuels ou trimestriels pour maintenir votre véhicule en parfait état. Tarifs réduits pour les abonnements.
                  </p>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-500" />
                      Forfaits flexibles
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-500" />
                      Tarifs préférentiels
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-500" />
                      Intervention prioritaire
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
              Pourquoi Choisir ProClean Empire pour le Nettoyage de Votre Automobile ?
            </h2>

            <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <CheckCircle2 className="w-8 h-8 text-green-500" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Expertise Professionnelle</h3>
                  <p className="text-gray-700">Plus de 5 ans d'expérience dans le nettoyage automobile. Notre équipe maîtrise tous les types de véhicules et les techniques de nettoyage les plus avancées.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <Sparkles className="w-8 h-8 text-yellow-500" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Matériel Professionnel</h3>
                  <p className="text-gray-700">Nous utilisons du matériel de nettoyage haute pression de dernière génération pour des résultats impeccables et durables.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <Shield className="w-8 h-8 text-blue-500" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Produits Écologiques</h3>
                  <p className="text-gray-700">Tous nos produits sont écologiques, biodégradables et sans danger pour votre véhicule, votre famille et l'environnement.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <MapPin className="w-8 h-8 text-red-500" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Intervention à Domicile</h3>
                  <p className="text-gray-700">Nous intervenons directement chez vous ou en entreprise dans toute l'Île-de-France. Pas besoin de vous déplacer !</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 md:py-32 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-gray-900 mb-16 text-center">
              Questions Fréquemment Posées sur le Nettoyage Automobile
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
              Prêt à Redonner Vie à Votre Véhicule ?
            </h2>
            <p className="text-xl text-white mb-8 max-w-2xl mx-auto">
              Demandez votre devis gratuit dès maintenant. Intervention rapide à domicile en Île-de-France, 7j/7.
            </p>
            <Button 
              onClick={() => window.location.href = '/?service=automobile'}
              className="bg-white hover:bg-gray-100 text-orange-600 font-bold px-10 py-4 text-lg rounded-full"
            >
              Réserver mon nettoyage automobile →
            </Button>
          </div>
        </section>
      </main>
    </div>
  );
}
