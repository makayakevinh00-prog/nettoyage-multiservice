import { Button } from "@/components/ui/button";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import AdvancedBookingForm from "@/components/AdvancedBookingForm";

import { 
  Car,
  CheckCircle2, 
  Star,
  Sofa,
  Building2,
  Waves,
  Calendar,
  Clock,
  Leaf,
  Sparkles,
  Shield,
  Clock3
} from "lucide-react";
import { useState } from "react";
import { useLocation } from "wouter";

export default function Home() {
  const [location] = useLocation();

  const services = [
    {
      icon: Car,
      title: "Nettoyage Automobile",
      description: "Intérieur et extérieur, lavage haute pression, lustrage et protection.",
      image: "/hero-proclean.png",
    },
    {
      icon: Waves,
      title: "Nettoyage Terrasse",
      description: "Démoussage, nettoyage haute pression, traitement anti-mousse.",
      image: "/services-grid.png",
    },
    {
      icon: Sofa,
      title: "Nettoyage Tapis",
      description: "Injection-extraction, détachage professionnel, séchage rapide.",
      image: "/services-grid.png",
    },
    {
      icon: Building2,
      title: "Nettoyage Balcon",
      description: "Nettoyage complet, joints, garde-corps et revêtements.",
      image: "/services-grid.png",
    },
    {
      icon: Leaf,
      title: "Entretien Jardinage",
      description: "Taille, débroussaillage, entretien paysager professionnel.",
      image: "/services-grid.png",
    },
    {
      icon: Sparkles,
      title: "Nettoyage Facade",
      description: "Nettoyage haute pression, traitement anti-mousse, ravalement.",
      image: "/services-grid.png",
    },
    {
      icon: Building2,
      title: "Nettoyage Panneaux Solaires",
      description: "Nettoyage haute pression, maintenance, optimisation rendement.",
      image: "/services-grid.png",
    },
    {
      icon: Building2,
      title: "Nettoyage Professionnel",
      description: "Bureaux, espaces commerciaux, nettoyage complet sur mesure.",
      image: "/services-grid.png",
    },
  ];

  const avantages = [
    {
      icon: Shield,
      title: "Équipements Pro",
      description: "Matériel dernière génération pour résultats optimaux",
    },
    {
      icon: CheckCircle2,
      title: "Produits Écologiques",
      description: "Respectueux de l'environnement et de votre santé",
    },
    {
      icon: Clock3,
      title: "Intervention Rapide",
      description: "Disponibles en Île-de-France sous 48h",
    },
    {
      icon: Star,
      title: "Satisfaction Garantie",
      description: "Ou argent remboursé, 100% sans risque",
    },
  ];

  const testimonials = [
    {
      name: "Patricia Ibaibe",
      role: "Particulier",
      content: "Très beau travail ! Dans le Airbnb je vous les conseille !",
      rating: 5,
    },
    {
      name: "kevinh makaya",
      role: "Particulier",
      content: "Impeccable !!! Ils ont nettoyé chez ma mère et c'est vraiment fou le travail fourni",
      rating: 5,
    },
    {
      name: "Serena Beya",
      role: "Particulier",
      content: "Service impeccable ! Ma voiture est ressortie comme neuve. L'équipe est professionnelle, ponctuelle et très soigneuse. Je recommande sans hésiter !",
      rating: 5,
    },

  ];

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-white via-blue-50/30 to-white">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative min-h-[650px] flex items-center bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 overflow-hidden">
          <div className="absolute inset-0 bg-[url('/hero-proclean.png')] bg-cover bg-center opacity-20"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/40 to-transparent"></div>
          
          <div className="container relative z-10 py-24">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="text-white space-y-8">
                <div className="inline-block px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
                  <span className="text-sm font-semibold text-white">✨ Service Premium en Île-de-France</span>
                </div>
                
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
                  <span className="text-white">PROCLEAN</span>{" "}
                  <span className="text-blue-200">EMPIRE</span>
                </h1>
                
                <p className="text-2xl md:text-3xl font-semibold text-blue-100">
                  Nettoyage Premium Multiservice
                </p>
                
                <p className="text-xl text-blue-50 leading-relaxed max-w-xl">
                  Votre partenaire de confiance pour le nettoyage professionnel de vos véhicules, 
                  terrasses, tapis, balcons et jardins. Excellence et satisfaction garanties.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <Button 
                    size="lg" 
                    className="bg-white text-blue-700 hover:bg-blue-50 text-lg px-8 py-6 shadow-xl hover:shadow-2xl transition-all duration-300"
                    asChild
                  >
                    <a href="#reservation">Réserver Maintenant</a>
                  </Button>
                  <Button 
                    size="lg" 
                    variant="outline" 
                    className="bg-transparent border-2 border-white text-white hover:bg-white/10 text-lg px-8 py-6"
                    asChild
                  >
                    <a href="#services">Découvrir nos Services</a>
                  </Button>
                </div>
              </div>
              
              <div className="relative hidden lg:block">
                <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white/20">
                  <img 
                    src="/hero-proclean.png" 
                    alt="ProClean Empire - Nettoyage professionnel" 
                    className="w-full h-auto"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section Services */}
        <section id="services" className="py-24 bg-white">
          <div className="container">
            <div className="text-center mb-16">
              <div className="inline-block px-4 py-2 bg-blue-100 rounded-full mb-4">
                <span className="text-sm font-semibold text-blue-700">NOS PRESTATIONS</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
                Des Services d'Excellence
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Découvrez notre gamme complète de services de nettoyage professionnel 
                pour redonner éclat et propreté à tous vos espaces.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service, index) => (
                <div 
                  key={index} 
                  className="group hover:shadow-2xl transition-all duration-300 border-2 hover:border-blue-400 overflow-hidden bg-white rounded-lg"
                >
                  <div className="relative h-64 overflow-hidden">
                    <img 
                      src={service.image} 
                      alt={service.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
                    <div className="absolute top-4 right-4 w-14 h-14 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-lg">
                      <service.icon className="h-7 w-7 text-blue-600" />
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-2xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors mb-2">
                      {service.title}
                    </h3>
                    <p className="text-base text-gray-600 leading-relaxed mb-4">
                      {service.description}
                    </p>
                    <Button 
                      className="w-full bg-blue-600 hover:bg-blue-700"
                      onClick={() => {
                        setTimeout(() => {
                          const element = document.querySelector('#reservation');
                          if (element) {
                            element.scrollIntoView({ behavior: 'smooth' });
                          }
                        }, 100);
                      }}
                    >
                      Réserver ce Service
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section Pourquoi nous choisir */}
        <section className="py-24 bg-gradient-to-br from-blue-50 via-white to-blue-50">
          <div className="container">
            <div className="text-center mb-16">
              <div className="inline-block px-4 py-2 bg-blue-100 rounded-full mb-4">
                <span className="text-sm font-semibold text-blue-700">NOS ATOUTS</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
                Pourquoi Choisir ProClean Empire ?
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Une expertise reconnue et un engagement qualité pour votre satisfaction totale.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {avantages.map((avantage, index) => (
                <div key={index} className="text-center border-2 hover:border-blue-400 hover:shadow-xl transition-all duration-300 bg-white rounded-lg p-6">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <avantage.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{avantage.title}</h3>
                  <p className="text-gray-600">{avantage.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section Réservation */}
        <section id="reservation" className="py-24 bg-white">
          <div className="container">
            <div className="text-center mb-16">
              <div className="inline-block px-4 py-2 bg-blue-100 rounded-full mb-4">
                <span className="text-sm font-semibold text-blue-700">RÉSERVATION</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
                Réservez Votre Intervention
              </h2>
              <p className="text-xl text-gray-600">
                Choisissez votre service, les options détaillées, et recevez votre devis personnalisé.
              </p>
            </div>
            
            <AdvancedBookingForm />
          </div>
        </section>

        {/* Galerie avant/après */}
        <section className="py-24 bg-white">
          <div className="container">
            <div className="text-center mb-16">
              <div className="inline-block px-4 py-2 bg-blue-100 rounded-full mb-4">
                <span className="text-sm font-semibold text-blue-700">GALERIE</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
                Nos Réalisations
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Découvrez les transformations spectaculaires de nos clients.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <img src="/gallery/aLJESpvhZTeM.jpg" alt="Terrasse avant/après" className="w-full h-64 object-cover rounded-lg shadow-lg hover:shadow-xl transition-shadow" />
              <img src="/gallery/Ykf3AlT3TbGH.png" alt="Patio nettoyage" className="w-full h-64 object-cover rounded-lg shadow-lg hover:shadow-xl transition-shadow" />
              <img src="/gallery/crpcsQzuHnym.jpg" alt="Terrasse propre" className="w-full h-64 object-cover rounded-lg shadow-lg hover:shadow-xl transition-shadow" />
              <img src="/gallery/tl4jlGLfxzTe.webp" alt="Nettoyage tapis" className="w-full h-64 object-cover rounded-lg shadow-lg hover:shadow-xl transition-shadow" />
              <img src="/gallery/zTsRk9imHR7P.jpeg" alt="Nettoyage professionnel" className="w-full h-64 object-cover rounded-lg shadow-lg hover:shadow-xl transition-shadow" />
              <img src="/gallery/eKzBvq3WtGvE.jpg" alt="Balcon nettoyage" className="w-full h-64 object-cover rounded-lg shadow-lg hover:shadow-xl transition-shadow" />
            </div>
          </div>
        </section>

        {/* Témoignages */}
        <section id="temoignages" className="py-24 bg-gradient-to-br from-blue-50 via-white to-blue-50">
          <div className="container">
            <div className="text-center mb-16">
              <div className="inline-block px-4 py-2 bg-blue-100 rounded-full mb-4">
                <span className="text-sm font-semibold text-blue-700">TÉMOIGNAGES</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
                Ils Nous Font Confiance
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                La satisfaction de nos clients est notre plus belle récompense.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <div key={index} className="bg-white rounded-lg p-8 shadow-lg hover:shadow-xl transition-all duration-300 border-l-4 border-blue-600">
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-gray-700 mb-4 italic">"{testimonial.content}"</p>
                  <div>
                    <p className="font-bold text-gray-900">{testimonial.name}</p>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
