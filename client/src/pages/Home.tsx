import Header from "@/components/Header";
import AdvancedBookingForm from "@/components/AdvancedBookingForm";
import GoogleReviews from "@/components/GoogleReviews";
import { TestimonialCarousel } from "@/components/TestimonialCarousel";

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
  Calendar,
  Zap,
  Droplets,
  Trash2,
  Video
} from "lucide-react";
import { useState, useEffect } from "react";
import { useLocation } from "wouter";

export default function Home() {
  const [location] = useLocation();
  const [scrollY, setScrollY] = useState(0);
  const [prefilledService, setPrefilledService] = useState("");
  const [prefilledOption, setPrefilledOption] = useState("");

  const scrollToBooking = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const bookingSection = document.getElementById('booking');
    if (bookingSection) {
      // Use setTimeout to ensure the scroll happens after any pending UI updates
      setTimeout(() => {
        bookingSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 0);
    }
  };

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const service = localStorage.getItem('prefilledService');
    const option = localStorage.getItem('prefilledOption');
    if (service) {
      setPrefilledService(service);
      localStorage.removeItem('prefilledService');
    }
    if (option) {
      setPrefilledOption(option);
      localStorage.removeItem('prefilledOption');
    }
  }, [location]);

  const services = [
    {
      icon: Car,
      title: "Automobile",
      description: "Intérieur et extérieur, lavage haute pression, lustrage.",
      image: "/service-automobile.jpg",
      link: "/service-automobile",
    },
    {
      icon: Waves,
      title: "Terrasse",
      description: "Démoussage, nettoyage haute pression, traitement anti-mousse.",
      image: "/hero-terrasse.jpg",
      link: "/service-terrasse",
    },
    {
      icon: Sofa,
      title: "Tapis & Canapés",
      description: "Injection-extraction, détachage professionnel, séchage rapide.",
      image: "/hero-tapis.jpg",
      link: "/service/tapis",
    },
    {
      icon: Building2,
      title: "Balcon",
      description: "Nettoyage complet, joints, garde-corps et revêtements.",
      image: "/hero-balcon.jpg",
      link: "/service/balcon",
    },
    {
      icon: Leaf,
      title: "Jardinage",
      description: "Entretien paysager, taille, débroussaillage professionnel.",
      image: "/hero-jardinage.jpg",
      link: "/service/jardinage",
    },
    {
      icon: Building2,
      title: "Façade",
      description: "Nettoyage haute pression, traitement anti-mousse, joints.",
      image: "/hero-facade.jpg",
      link: "/service/facade",
    },
    {
      icon: Droplets,
      title: "Piscine",
      description: "Nettoyage complet, traitement de l'eau, maintenance.",
      image: "/service-piscine.jpg",
      link: "/service/piscine",
    },
  ];

  const stats = [
    { number: "5+", label: "Ans d'Expérience" },
    { number: "1000+", label: "Clients Satisfaits" },
    { number: "7+", label: "Services Disponibles" },
  ];

  const testimonials = [
    {
      name: "Alexandre M.",
      role: "Particulier",
      content: "Service exceptionnel pour le nettoyage de ma voiture. Résultat impeccable !",
      rating: 5,
    },
    {
      name: "Sophie D.",
      role: "Propriétaire",
      content: "J'ai fait nettoyer ma terrasse et mes tapis. Le travail est remarquable.",
      rating: 5,
    },
    {
      name: "Thomas L.",
      role: "Copropriété",
      content: "ProClean Empire intervient régulièrement pour notre immeuble. Toujours à l'heure et efficace.",
      rating: 5,
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section - Style La Providence */}
        <section className="relative min-h-[calc(100vh-64px)] flex items-center justify-center overflow-hidden">
          {/* Background Image */}
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: "url('/hero-nettoyage-pro.jpg')",
              transform: `translateY(${scrollY * 0.3}px)`,
            }}
          />
          
          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-black/50" />
          
          {/* Content - Centered */}
          <div className="relative z-50 container mx-auto px-4 text-center">
            <div className="max-w-3xl mx-auto">
              {/* Main Title */}
              <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
                Le nettoyage professionnel qui redonne vie à vos biens
              </h1>
              
              {/* Subtitle */}
              <p className="text-2xl md:text-3xl text-orange-400 mb-4 font-semibold">
                Auto, Habitat, Jardin. Intervention 7j/7 à domicile.
              </p>
              
              {/* Trust Bar */}
              <div className="flex flex-wrap justify-center gap-6 mb-10 py-6 border-t border-b border-gray-400/30">
                <div className="flex items-center gap-2 text-white">
                  <Clock3 size={20} className="text-orange-400" />
                  <span className="text-sm font-medium">Devis sous 30min</span>
                </div>
                <div className="flex items-center gap-2 text-white">
                  <Leaf size={20} className="text-green-400" />
                  <span className="text-sm font-medium">Éco-responsable</span>
                </div>
                <div className="flex items-center gap-2 text-white">
                  <Calendar size={20} className="text-blue-400" />
                  <span className="text-sm font-medium">7j/7 disponible</span>
                </div>
                <div className="flex items-center gap-2 text-white">
                  <Sparkles size={20} className="text-yellow-400" />
                  <span className="text-sm font-medium">Matériel Pro</span>
                </div>
              </div>
              
              {/* CTA Button */}
              <button 
                type="button"
                onClick={scrollToBooking} 
                className="relative z-50 inline-flex items-center justify-center px-10 py-4 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-full transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg text-lg cursor-pointer border-none pointer-events-auto touch-none select-none"
              >
                Demander mon devis gratuit →
              </button>
              
              {/* Secondary CTA */}
              <p className="text-gray-300 mt-6 text-sm">
                ✓ Sans engagement • ✓ Gratuit • ✓ Réponse rapide
              </p>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="bg-gradient-to-r from-slate-900 to-black py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-3 gap-8 text-center">
              {stats.map((stat, i) => (
                <div key={i} className="text-white">
                  <div className="text-5xl md:text-6xl font-bold text-blue-400 mb-2">{stat.number}</div>
                  <div className="text-gray-300 text-lg">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="py-20 md:py-32 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Nos Services</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Une gamme complète de services de nettoyage professionnel adaptés à tous vos besoins
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service, i) => {
                const Icon = service.icon;
                return (
                  <a
                    key={i}
                    href={service.link}
                    className={`group bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-105 animate-slideUp stagger-${(i % 5) + 1}`}
                  >
                    <div className="relative h-48 overflow-hidden bg-gray-200">
                      <img 
                        src={service.image} 
                        alt={service.title}
                        loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-6">
                      <Icon className="w-8 h-8 text-blue-600 mb-3" />
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{service.title}</h3>
                      <p className="text-gray-600 mb-4">{service.description}</p>
                      <div className="text-blue-600 font-semibold group-hover:text-blue-700">
                        En savoir plus
                      </div>
                    </div>
                  </a>
                );
              })}
            </div>
          </div>
        </section>

        {/* Advantages Section */}
        <section className="py-20 md:py-32 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Pourquoi ProClean Empire</h2>
            </div>

            <div className="grid md:grid-cols-3 gap-12 max-w-4xl mx-auto">
              {[
                { icon: Shield, title: "Professionnel", desc: "Equipe formee" },
                { icon: Sparkles, title: "Qualite", desc: "Resultats garantis" },
                { icon: CheckCircle2, title: "Fiable", desc: "Satisfaction 100%" },
              ].map((item, i) => {
                const Icon = item.icon;
                return (
                  <div key={i} className={`text-center space-y-3 animate-slideUp stagger-${i + 1}`}>
                    <Icon className="w-10 h-10 text-blue-600 mx-auto" />
                    <h3 className="text-lg font-semibold text-gray-900">{item.title}</h3>
                    <p className="text-sm text-gray-600">{item.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Google Reviews Section */}
        <GoogleReviews />

        {/* Trustpilot Reviews Section */}
        <section className="py-20 md:py-32 bg-gradient-to-br from-yellow-50 via-white to-yellow-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <div className="flex justify-center mb-6">
                <span className="text-6xl">⭐</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Nos Clients Nous Font Confiance</h2>
              <p className="text-xl text-gray-600 mb-8">Decouvrez les avis verifies de nos clients satisfaits</p>
            </div>
            <div className="flex justify-center">
              <a href="https://www.trustpilot.com/review/procleanempire.com" target="_blank" rel="noopener noreferrer" className="inline-block w-full max-w-md">
                <div className="bg-gradient-to-br from-yellow-400 to-yellow-500 p-8 rounded-xl shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105 text-white text-center">
                  <p className="text-2xl font-bold mb-2">Trustpilot</p>
                  <p className="text-lg font-semibold mb-4">Lire nos avis clients</p>
                  <p className="text-sm opacity-90">Cliquez pour voir les avis verifies de ProClean Empire</p>
                </div>
              </a>
            </div>
          </div>
        </section>

        {/* Booking Section */}
        <section id="booking" className="py-20 md:py-32 bg-white animate-fadeIn">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Réservez Votre Service</h2>
              <p className="text-xl text-gray-600">Remplissez le formulaire ci-dessous pour demander un devis</p>
            </div>
            <AdvancedBookingForm 
              prefilledService={prefilledService}
              prefilledOption={prefilledOption}
            />
          </div>
        </section>



        {/* Testimonial Carousel Section */}
        <TestimonialCarousel />


      </main>
    </div>
  );
}
