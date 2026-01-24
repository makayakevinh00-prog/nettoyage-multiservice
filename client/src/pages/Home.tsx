import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Car,
  Waves,
  Sofa,
  Building2,
  Leaf,
  Sparkles,
  Shield,
  Clock3,
  CheckCircle2,
  ArrowRight,
  Zap,
  Phone
} from "lucide-react";
import { useState } from "react";
import { useLocation } from "wouter";
import { TestimonialCarousel } from "@/components/TestimonialCarousel";
import { TestimonialForm } from "@/components/TestimonialForm";
import GoogleReviews from "@/components/GoogleReviews";
import AdvancedBookingForm from "@/components/AdvancedBookingForm";

export default function Home() {
  const [, setLocation] = useLocation();
  const [showBooking, setShowBooking] = useState(false);

  const services = [
    {
      icon: Car,
      title: "Nettoyage Automobile",
      description: "Lavage complet intérieur et extérieur, haute pression, lustrage professionnel.",
    },
    {
      icon: Waves,
      title: "Nettoyage Terrasse",
      description: "Nettoyage haute pression, traitement anti-mousse, protection durable.",
    },
    {
      icon: Sofa,
      title: "Nettoyage Tapis & Canapés",
      description: "Injection-extraction, détachage professionnel, séchage rapide.",
    },
    {
      icon: Building2,
      title: "Nettoyage Balcon",
      description: "Nettoyage complet, joints, garde-corps, revêtements spécialisés.",
    },
    {
      icon: Leaf,
      title: "Entretien Jardinage",
      description: "Taille, débroussaillage, entretien paysager professionnel.",
    },
    {
      icon: Building2,
      title: "Nettoyage Façade",
      description: "Nettoyage haute pression, traitement anti-mousse, ravalement.",
    },
    {
      icon: Sparkles,
      title: "Panneaux Solaires",
      description: "Nettoyage spécialisé, maintenance, optimisation rendement.",
    },
    {
      icon: Shield,
      title: "Services Professionnels",
      description: "Bureaux, espaces commerciaux, nettoyage sur mesure.",
    },
  ];

  const values = [
    {
      icon: Sparkles,
      title: "Excellence",
      description: "Qualité irréprochable dans chaque intervention",
    },
    {
      icon: Clock3,
      title: "Réactivité",
      description: "Interventions rapides et efficaces en Île-de-France",
    },
    {
      icon: Shield,
      title: "Proximité",
      description: "Équipes locales, disponibles et à votre écoute",
    },
    {
      icon: Zap,
      title: "Innovation",
      description: "Équipements modernes et techniques éco-responsables",
    },
  ];

  const stats = [
    { number: "5+", label: "Ans d'Expérience" },
    { number: "1000+", label: "Clients Satisfaits" },
    { number: "50000+", label: "m² Nettoyés" },
    { number: "8", label: "Services Disponibles" },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* HERO SECTION */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('/team-professional-portrait.jpg')",
            backgroundAttachment: "fixed",
          }}
        >
          <div className="absolute inset-0 bg-black/50"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 container text-center text-white max-w-4xl mx-auto px-4">
          <h1 className="text-6xl md:text-7xl font-bold mb-6 leading-tight tracking-tight">
            PROCLEAN<br />
            <span className="text-blue-400">EMPIRE</span>
          </h1>
          <p className="text-2xl md:text-3xl font-light mb-4 text-gray-100">
            Nettoyage Multiservice Premium
          </p>
          <p className="text-xl md:text-2xl mb-8 text-gray-200 max-w-2xl mx-auto">
            Nous entretenons tous les espaces où la propreté est capitale.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 text-lg rounded-lg"
              onClick={() => setShowBooking(true)}
            >
              <Phone className="mr-2" size={20} />
              Réserver Maintenant
            </Button>
            <Button 
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white/10 px-8 py-6 text-lg rounded-lg"
              onClick={() => setLocation("/nous-connaitre")}
            >
              En Savoir Plus
            </Button>
          </div>
        </div>
      </section>

      {/* NOS VALEURS */}
      <section className="py-20 bg-white">
        <div className="container max-w-6xl mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-gray-900 uppercase tracking-wide">
            Les Plus + ProClean Empire
          </h2>
          <p className="text-center text-gray-600 mb-16 text-lg max-w-2xl mx-auto">
            Découvrez ce qui nous différencie sur le marché du nettoyage professionnel
          </p>
          
          <div className="grid md:grid-cols-4 gap-8">
            {values.map((value, idx) => (
              <div key={idx} className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="p-4 bg-blue-50 rounded-full">
                    <value.icon size={32} className="text-blue-600" />
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-2 text-gray-900">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STATISTIQUES */}
      <section className="py-20 bg-gray-50">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            {stats.map((stat, idx) => (
              <div key={idx} className="text-center">
                <div className="text-5xl md:text-6xl font-bold text-blue-600 mb-2">
                  {stat.number}
                </div>
                <p className="text-gray-600 text-lg">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* NOS SERVICES */}
      <section className="py-20 bg-white">
        <div className="container max-w-6xl mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-gray-900 uppercase tracking-wide">
            Nos Services
          </h2>
          <p className="text-center text-gray-600 mb-16 text-lg max-w-2xl mx-auto">
            Une gamme complète de services de nettoyage adaptés à tous vos besoins
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, idx) => (
              <Card key={idx} className="hover:shadow-lg transition-shadow cursor-pointer border-0 bg-gray-50">
                <CardContent className="p-6">
                  <div className="flex justify-center mb-4">
                    <service.icon size={40} className="text-blue-600" />
                  </div>
                  <h3 className="text-lg font-bold text-center mb-2 text-gray-900">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 text-sm text-center">
                    {service.description}
                  </p>
                  <button
                    onClick={() => setLocation(`/service/${service.title.toLowerCase().replace(/[&\s]/g, '-')}`)}
                    className="w-full mt-4 text-blue-600 hover:text-blue-700 font-semibold text-sm flex items-center justify-center gap-2"
                  >
                    En savoir plus <ArrowRight size={16} />
                  </button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION RÉSERVATION */}
      {showBooking && (
        <section className="py-20 bg-blue-50">
          <div className="container max-w-4xl mx-auto px-4">
            <button
              onClick={() => setShowBooking(false)}
              className="mb-4 text-gray-600 hover:text-gray-900"
            >
              ← Fermer
            </button>
            <AdvancedBookingForm />
          </div>
        </section>
      )}

      {/* TÉMOIGNAGES */}
      <section className="py-20 bg-gray-50">
        <div className="container max-w-6xl mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-gray-900 uppercase tracking-wide">
            Avis Clients
          </h2>
          <p className="text-center text-gray-600 mb-16 text-lg max-w-2xl mx-auto">
            Découvrez ce que nos clients pensent de nos services
          </p>
          <TestimonialCarousel />
        </div>
      </section>

      {/* FORMULAIRE TÉMOIGNAGE */}
      <section className="py-20 bg-white">
        <div className="container max-w-4xl mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-gray-900 uppercase tracking-wide">
            Partagez Votre Expérience
          </h2>
          <p className="text-center text-gray-600 mb-16 text-lg">
            Votre avis nous aide à nous améliorer continuellement
          </p>
          <TestimonialForm />
        </div>
      </section>

      {/* AVIS GOOGLE */}
      <section className="py-20 bg-gray-50">
        <div className="container max-w-6xl mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-gray-900 uppercase tracking-wide">
            Avis Google
          </h2>
          <GoogleReviews />
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-700 text-white">
        <div className="container max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Prêt à Transformer Vos Espaces ?
          </h2>
          <p className="text-xl mb-8 text-blue-100 max-w-2xl mx-auto">
            Contactez-nous dès aujourd'hui pour un devis gratuit et sans engagement
          </p>
          <Button 
            size="lg"
            className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-6 text-lg rounded-lg font-semibold"
            onClick={() => setShowBooking(true)}
          >
            Demander un Devis
          </Button>
        </div>
      </section>
    </div>
  );
}
