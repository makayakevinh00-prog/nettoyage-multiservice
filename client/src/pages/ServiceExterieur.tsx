import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Waves, CheckCircle2, Shield, Sparkles, Clock3, MapPin } from "lucide-react";
import { useState } from "react";

export default function ServiceExterieur() {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const scrollToBooking = () => {
    const bookingSection = document.getElementById('booking-section');
    if (bookingSection) {
      bookingSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const faqs = [
    {
      question: "Quel est le prix du nettoyage de piscine à Paris et en Île-de-France ?",
      answer: "Les tarifs dépendent de la taille et de l'état : petite piscine (moins de 30m²) à partir de 100€, moyenne (30-50m²) à partir de 180€, grande (plus de 50m²) sur devis. Forfaits mensuels disponibles. Devis gratuit sous 30 minutes."
    },
    {
      question: "Quels services de nettoyage de piscine proposez-vous ?",
      answer: "Nettoyage complet du bassin, filtration, traitement de l'eau, nettoyage des parois, élimination algues, équilibrage chimique. Tous les travaux d'entretien piscine. Devis personnalisé selon vos besoins."
    },
    {
      question: "À quelle fréquence faut-il nettoyer une piscine ?",
      answer: "Nous recommandons un nettoyage hebdomadaire en été et bimensuel en hiver. Forfaits d'entretien régulier disponibles. Tarifs réduits pour contrats long terme."
    },
    {
      question: "Utilisez-vous des produits écologiques pour la piscine ?",
      answer: "Oui ! Nous utilisons des produits écologiques et sûrs pour la santé. Pas de chlore agressif. Respect de l'environnement. Produits certifiés."
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
                Nettoyage de Piscine Professionnel
              </h1>
              <p className="text-2xl text-orange-400 mb-8 font-semibold">
                Entretien piscine en Île-de-France
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
                Service de Nettoyage de Piscine à Paris et Île-de-France
              </h2>
              <p className="text-xl text-gray-700 mb-6">
                ProClean Empire propose un service complet de nettoyage et d'entretien de piscine. Nettoyage du bassin, filtration, traitement de l'eau et équilibrage chimique.
              </p>
              <p className="text-lg text-gray-700 mb-6">
                Avec plus de 5 ans d'expérience, nous entretenons tous types de piscines : enterrées, semi-enterrées, hors-sol. Nos techniques professionnelles garantissent une eau cristalline et saine. Produits écologiques et sûrs.
              </p>
            </div>
          </div>
        </section>

        {/* Services Offered */}
        <section className="py-20 md:py-32 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-gray-900 mb-16 text-center">
              Nos Prestations de Nettoyage de Piscine
            </h2>

            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <Card className="hover:shadow-lg transition-all">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Waves className="w-6 h-6 text-blue-500" />
                    Nettoyage Complet
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 mb-4">
                    Nettoyage complet du bassin avec élimination des algues et débris.
                  </p>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-500" />
                      Nettoyage bassin
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-500" />
                      Élimination algues
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-500" />
                      Nettoyage parois
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-all">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Sparkles className="w-6 h-6 text-yellow-500" />
                    Traitement Eau
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 mb-4">
                    Traitement et équilibrage chimique de l'eau pour une piscine saine.
                  </p>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-500" />
                      Équilibrage pH
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-500" />
                      Traitement chlore
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-500" />
                      Analyse eau
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-all">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="w-6 h-6 text-blue-500" />
                    Entretien Filtration
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 mb-4">
                    Maintenance et nettoyage du système de filtration de la piscine.
                  </p>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-500" />
                      Nettoyage filtre
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-500" />
                      Maintenance pompe
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-500" />
                      Vérification système
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
                    Forfaits d'entretien régulier pour une piscine impeccable toute l'année.
                  </p>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-500" />
                      Entretien hebdo
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
              Pourquoi Choisir ProClean Empire pour Entretenir Votre Piscine ?
            </h2>

            <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <CheckCircle2 className="w-8 h-8 text-green-500" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Expertise Piscine</h3>
                  <p className="text-gray-700">Spécialistes de l'entretien piscine depuis 5 ans. Tous types : enterrées, semi-enterrées, hors-sol. Techniques professionnelles.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <Sparkles className="w-8 h-8 text-yellow-500" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Équipement Professionnel</h3>
                  <p className="text-gray-700">Matériel de dernière génération. Tests d'eau précis. Produits de qualité professionnelle pour une eau cristalline.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <Shield className="w-8 h-8 text-blue-500" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Produits Écologiques</h3>
                  <p className="text-gray-700">Produits écologiques et sûrs pour la santé. Pas de chlore agressif. Respect de l'environnement.</p>
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
              Questions Fréquemment Posées sur le Nettoyage de Piscine
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
              Prêt à Entretenir Votre Piscine ?
            </h2>
            <p className="text-xl text-white mb-8 max-w-2xl mx-auto">
              Demandez votre devis gratuit dès maintenant. Intervention rapide à domicile en Île-de-France, 7j/7.
            </p>
            <Button 
              onClick={() => window.location.href = '/?service=piscine'}
              className="bg-white hover:bg-gray-100 text-orange-600 font-bold px-10 py-4 text-lg rounded-full"
            >
              Réserver mon nettoyage de piscine
            </Button>
          </div>
        </section>
      </main>
    </div>
  );
}
