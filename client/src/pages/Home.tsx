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
  Leaf,
  Sparkles,
  Shield,
  Clock3,
  ArrowRight,
  Zap
} from "lucide-react";
import { useState, useEffect } from "react";
import { useLocation } from "wouter";

export default function Home() {
  const [location] = useLocation();
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const services = [
    {
      icon: Car,
      title: "Automobile",
      description: "Intérieur et extérieur, lavage haute pression, lustrage.",
      image: "/hero-proclean.png",
    },
    {
      icon: Waves,
      title: "Terrasse",
      description: "Démoussage, nettoyage haute pression, traitement anti-mousse.",
      image: "/services-grid.png",
    },
    {
      icon: Sofa,
      title: "Tapis & Canapés",
      description: "Injection-extraction, détachage professionnel, séchage rapide.",
      image: "/services-grid.png",
    },
    {
      icon: Building2,
      title: "Balcon",
      description: "Nettoyage complet, joints, garde-corps et revêtements.",
      image: "/services-grid.png",
    },
    {
      icon: Leaf,
      title: "Jardinage",
      description: "Taille, débroussaillage, entretien paysager professionnel.",
      image: "/services-grid.png",
    },
    {
      icon: Sparkles,
      title: "Façade",
      description: "Nettoyage haute pression, traitement anti-mousse, ravalement.",
      image: "/services-grid.png",
    },
    {
      icon: Zap,
      title: "Panneaux Solaires",
      description: "Nettoyage haute pression, maintenance, optimisation rendement.",
      image: "/services-grid.png",
    },
    {
      icon: Building2,
      title: "Professionnel",
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

  const stats = [
    { number: "13", label: "Avis Google", rating: "5.0/5 ⭐" },
    { number: "500+", label: "Clients Satisfaits" },
    { number: "10+", label: "Années d'Expérience" },
    { number: "24h", label: "Intervention Rapide" },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-40"
            style={{
              backgroundImage: "url('/hero-proclean.png')",
              transform: `translateY(${scrollY * 0.5}px)`,
            }}
          />
          
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent" />
          
          <div className="relative z-10 container mx-auto px-4 py-20 text-center md:text-left">
            <div className="max-w-2xl">
              <div className="inline-block mb-6 px-4 py-2 bg-blue-600/20 border border-blue-500/50 rounded-full">
                <span className="text-blue-300 text-sm font-semibold">✨ Service Premium en Île-de-France</span>
              </div>
              
              <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
                PROCLEAN<br />
                <span className="text-blue-400">EMPIRE</span>
              </h1>
              
              <p className="text-xl md:text-2xl text-gray-300 mb-4 font-light">
                Nettoyage Multiservice Premium
              </p>
              
              <p className="text-lg text-gray-400 mb-8 max-w-xl">
                Voiture • Tapis • Terrasse • Balcon • Jardinage • Façade • Professionnel
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <a href="#booking" className="inline-flex items-center justify-center px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105">
                  Réserver Maintenant
                  <ArrowRight className="ml-2 w-5 h-5" />
                </a>
                <a href="#services" className="inline-flex items-center justify-center px-8 py-4 border-2 border-blue-500 text-blue-400 hover:bg-blue-500/10 font-semibold rounded-lg transition-all duration-300">
                  Découvrir nos Services
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="bg-gradient-to-r from-slate-900 to-black py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, idx) => (
                <div key={idx} className="text-center transform hover:scale-110 transition-transform duration-300">
                  <div className="text-4xl md:text-5xl font-bold text-blue-400 mb-2">
                    {stat.number}
                  </div>
                  <div className="text-gray-300 font-medium">{stat.label}</div>
                  {stat.rating && <div className="text-yellow-400 text-sm mt-1">{stat.rating}</div>}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* About Section */}
        <section className="py-20 md:py-32 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="order-2 md:order-1">
                <img 
                  src="/hero-proclean.png" 
                  alt="ProClean Empire" 
                  className="rounded-lg shadow-2xl w-full object-cover h-96"
                />
              </div>
              <div className="order-1 md:order-2">
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                  Votre Partenaire de Confiance
                </h2>
                <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                  ProClean Empire est spécialisée dans le nettoyage multiservice premium en Île-de-France. Avec plus de 10 ans d'expérience, nous mettons à votre service une équipe professionnelle, des équipements de dernière génération et un engagement envers l'excellence.
                </p>
                <div className="space-y-4">
                  {avantages.map((avantage, idx) => (
                    <div key={idx} className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                        <avantage.icon className="w-6 h-6 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{avantage.title}</h3>
                        <p className="text-gray-600 text-sm">{avantage.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="py-20 md:py-32 bg-gradient-to-b from-gray-50 to-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Nos Services
              </h2>
              <p className="text-xl text-gray-600">
                Une gamme complète de solutions de nettoyage adaptées à vos besoins
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {services.map((service, idx) => {
                const Icon = service.icon;
                return (
                  <div 
                    key={idx}
                    className="group relative overflow-hidden rounded-xl bg-white shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
                  >
                    <div className="absolute inset-0 bg-cover bg-center opacity-0 group-hover:opacity-20 transition-opacity duration-300"
                      style={{ backgroundImage: `url('${service.image}')` }}
                    />
                    
                    <div className="relative p-8 h-full flex flex-col justify-between">
                      <div>
                        <div className="w-14 h-14 bg-blue-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-blue-600 transition-colors duration-300">
                          <Icon className="w-7 h-7 text-blue-600 group-hover:text-white transition-colors duration-300" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">{service.title}</h3>
                        <p className="text-gray-600 text-sm leading-relaxed">{service.description}</p>
                      </div>
                      
                      <div className="mt-6 flex items-center text-blue-600 font-semibold text-sm group-hover:gap-2 transition-all duration-300">
                        En savoir plus
                        <ArrowRight className="w-4 h-4 ml-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Booking Section */}
        <section id="booking" className="py-20 md:py-32 bg-black">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                Réservez Votre Service
              </h2>
              <p className="text-xl text-gray-400">
                Formulaire de réservation simple et rapide
              </p>
            </div>
            
            <div className="max-w-4xl mx-auto bg-gray-900 rounded-xl p-8 md:p-12 shadow-2xl">
              <AdvancedBookingForm />
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-24 bg-gradient-to-r from-blue-600 to-blue-800">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Besoin d'une intervention d'urgence ?
            </h2>
            <p className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto">
              Contactez-nous directement au <span className="font-semibold">06 17 21 22 30</span> ou par email à <span className="font-semibold">serviceclient@procleanempire.com</span>
            </p>
            <a 
              href="tel:+33617212230"
              className="inline-flex items-center px-8 py-4 bg-white text-blue-600 font-bold rounded-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105"
            >
              Nous Appeler Maintenant
              <ArrowRight className="ml-2 w-5 h-5" />
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
