import Header from "@/components/Header";
import AdvancedBookingForm from "@/components/AdvancedBookingForm";
import { TestimonialCarousel } from "@/components/TestimonialCarousel";

import { 
  Car,
  CheckCircle2, 
  Sofa,
  Building2,
  Waves,
  Leaf,
  Sparkles,
  Shield,
  Droplets,
  Clock3,
  Calendar,
  Star
} from "lucide-react";
import { useState, useEffect } from "react";
import { useLocation } from "wouter";

export default function Home() {
  const [location] = useLocation();
  const [prefilledService, setPrefilledService] = useState("");
  const [prefilledOption, setPrefilledOption] = useState("");

  useEffect(() => {
    // Lire le paramètre service depuis le hash ou la query string
    let serviceParam = null;
    
    // Essayer de lire depuis le hash (#booking?service=automobile)
    const hash = window.location.hash;
    if (hash.includes('service=')) {
      const hashParams = new URLSearchParams(hash.substring(hash.indexOf('?')));
      serviceParam = hashParams.get('service');
    }
    
    // Sinon, essayer la query string (?service=automobile)
    if (!serviceParam) {
      const queryParams = new URLSearchParams(window.location.search);
      serviceParam = queryParams.get('service');
    }
    
    // Vérifier aussi le localStorage pour la compatibilité
    const service = serviceParam || localStorage.getItem('prefilledService');
    const option = localStorage.getItem('prefilledOption');
    
    if (service) {
      setPrefilledService(service);
      if (!serviceParam) {
        localStorage.removeItem('prefilledService');
      }
    }
    if (option) {
      setPrefilledOption(option);
      localStorage.removeItem('prefilledOption');
    }
  }, [location]);

  const scrollToBooking = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Attendre que le DOM soit prêt
    const bookingSection = document.getElementById('booking');
    if (bookingSection) {
      // Utiliser requestAnimationFrame pour s'assurer que le scroll se fait après le rendu
      requestAnimationFrame(() => {
        bookingSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    } else {
      console.warn('[ScrollToBooking] Section booking non trouvée');
    }
  };

  const services = [
    {
      icon: Car,
      title: "Automobile",
      description: "Intérieur et extérieur, lavage haute pression, lustrage.",
      image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663223121429/EjnzEtAMpiePukrT.jpg",
      link: "/service-automobile",
    },
    {
      icon: Waves,
      title: "Terrasse",
      description: "Démoussage, nettoyage haute pression, traitement anti-mousse.",
      image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663223121429/rPOrxYmzanxOtBXU.jpg",
      link: "/service-terrasse",
    },
    {
      icon: Sofa,
      title: "Tapis & Canapés",
      description: "Injection-extraction, détachage professionnel, séchage rapide.",
      image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663223121429/zHAPSTRRPawXxZsb.jpg",
      link: "/service/tapis",
    },
    {
      icon: Building2,
      title: "Balcon",
      description: "Nettoyage complet, joints, garde-corps et revêtements.",
      image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663223121429/GLthMgVOljyOhROV.jpg",
      link: "/service/balcon",
    },
    {
      icon: Leaf,
      title: "Jardinage",
      description: "Entretien paysager, taille, débroussaillage professionnel.",
      image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663223121429/sPjcGnTpdjqAvYrd.jpg",
      link: "/service/jardinage",
    },
    {
      icon: Building2,
      title: "Façade",
      description: "Nettoyage haute pression, traitement anti-mousse, joints.",
      image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663223121429/oZbSazSBaoTildUX.jpg",
      link: "/service/facade",
    },
    {
      icon: Droplets,
      title: "Piscine",
      description: "Nettoyage complet, traitement de l'eau, maintenance.",
      image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663223121429/sprSdKxEQNuxSJgS.jpg",
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
        <section className="relative h-[calc(100vh-64px)] flex items-center justify-center overflow-hidden">
          {/* Background Image with Enhanced Parallax */}
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: "url('https://files.manuscdn.com/user_upload_by_module/session_file/310519663223121429/ZaLXBaclDvmmBzAs.jpg')",
              backgroundAttachment: 'scroll',
              backgroundPosition: 'center 30%',
            }}
          />
          
          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-black/40" />
          
          {/* Content - Centered */}
          <div className="relative z-50 container mx-auto px-4 text-center">
            <div className="max-w-3xl mx-auto">
              {/* Main Title */}
              <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
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

        {/* Why Choose Us Section */}
        <section className="py-20 md:py-32 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Pourquoi Choisir ProClean Empire ?</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">Nous sommes l'entreprise de nettoyage professionnel de référence en Île-de-France depuis plus de 5 ans</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <CheckCircle2 className="w-8 h-8 text-green-500" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Expertise Professionnelle</h3>
                  <p className="text-gray-700">Plus de 5 ans d'expérience dans le nettoyage professionnel. Notre équipe maîtrise tous les types de nettoyage : automobile, terrasse, tapis, balcon, façade, jardinage et piscine.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <Shield className="w-8 h-8 text-blue-500" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Certifications & Assurances</h3>
                  <p className="text-gray-700">Entreprise certifiée et assurée. Nous respectons les normes de sécurité et d'hygiène les plus strictes pour garantir votre satisfaction.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <Sparkles className="w-8 h-8 text-yellow-500" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Matériel Professionnel</h3>
                  <p className="text-gray-700">Nous utilisons le matériel de nettoyage de dernière génération pour des résultats impeccables et durables en toutes circonstances.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <Leaf className="w-8 h-8 text-green-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Éco-Responsable</h3>
                  <p className="text-gray-700">Produits de nettoyage écologiques et respectueux de l'environnement. Nous minimisons notre impact écologique tout en garantissant l'efficacité.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <Clock3 className="w-8 h-8 text-orange-500" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Intervention Rapide</h3>
                  <p className="text-gray-700">Devis gratuit sous 30 minutes. Intervention rapide à domicile dans toute l'Île-de-France. Disponible 7j/7 pour vos urgences.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <Star className="w-8 h-8 text-blue-400" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Satisfaction Garantie</h3>
                  <p className="text-gray-700">5.0/5 ⭐ sur la base de 100+ avis clients vérifiés. Votre satisfaction est notre priorité absolue.</p>
                </div>
              </div>
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
                    <div className="relative h-56 md:h-48 overflow-hidden bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 flex items-center justify-center group-hover:from-blue-500 group-hover:via-blue-600 group-hover:to-blue-700 transition-all duration-300">
                      {service.image ? (
                        <img
                          src={service.image}
                          alt={service.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                          loading="lazy"
                          decoding="async"
                        />
                      ) : (
                        <Icon className="w-20 h-20 text-white opacity-90" />
                      )}
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


        {/* Avis Clients Section */}
        <section className="py-20 md:py-32 bg-gradient-to-br from-yellow-50 via-white to-yellow-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <div className="flex justify-center mb-6">
                <span className="text-6xl">⭐</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Nos Clients Nous Font Confiance</h2>
              <p className="text-xl text-gray-600 mb-8">Découvrez les avis vérifiés de nos clients satisfaits</p>
            </div>
            <div className="flex justify-center">
              <a href="https://www.trustpilot.com/review/procleanempire.com" target="_blank" rel="noopener noreferrer" className="inline-block w-full max-w-md">
                <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-8 rounded-xl shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105 text-white text-center">
                  <p className="text-2xl font-bold mb-2">5.0 / 5.0</p>
                  <p className="text-lg font-semibold mb-4">Basé sur 100+ avis clients</p>
                  <p className="text-sm opacity-90">Cliquez pour voir les avis vérifiés de ProClean Empire</p>
                </div>
              </a>
            </div>
          </div>
        </section>

        {/* FAQ Section - SEO Optimization */}
        <section className="py-20 md:py-32 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Questions Fréquemment Posées</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">Trouvez les réponses à vos questions sur nos services de nettoyage professionnel en Île-de-France</p>
            </div>

            <div className="max-w-3xl mx-auto space-y-6">
              <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Quels services de nettoyage proposez-vous à Paris et en Île-de-France ?</h3>
                <p className="text-gray-700">ProClean Empire propose une gamme complète de services de nettoyage professionnel : nettoyage automobile (intérieur et extérieur), nettoyage de terrasse, nettoyage de tapis et canapés, nettoyage de balcon, nettoyage de jardinage, nettoyage de façade, et nettoyage de piscine. Nous intervenons à Paris, 93, 95 et partout en Île-de-France.</p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Quel est le délai pour obtenir un devis gratuit ?</h3>
                <p className="text-gray-700">Nous vous proposons un devis gratuit sous 30 minutes. Il suffit de remplir notre formulaire de réservation en ligne ou de nous appeler au 06 17 21 22 30. Notre équipe vous contactera rapidement pour discuter de vos besoins en nettoyage.</p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Êtes-vous disponible le week-end et les jours fériés ?</h3>
                <p className="text-gray-700">Oui, ProClean Empire est disponible 7 jours sur 7, y compris les week-ends et jours fériés. Nous comprenons que vos besoins en nettoyage ne s'arrêtent pas en semaine. Contactez-nous pour planifier votre intervention au moment qui vous convient le mieux.</p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Utilisez-vous des produits écologiques et respectueux de l'environnement ?</h3>
                <p className="text-gray-700">Absolument ! ProClean Empire est engagée dans une démarche éco-responsable. Nous utilisons des produits de nettoyage respectueux de l'environnement et des techniques professionnelles qui minimisent l'impact écologique tout en garantissant des résultats impeccables.</p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Quelle est votre zone d'intervention en Île-de-France ?</h3>
                <p className="text-gray-700">ProClean Empire intervient dans toute l'Île-de-France, notamment à Paris (75), Hauts-de-Seine (92), Seine-Saint-Denis (93), Val-de-Marne (94), Val-d'Oise (95), Seine-et-Marne (77), Essonne (91) et Yvelines (78). Nous proposons une intervention rapide à domicile dans votre secteur.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Booking Section */}
        <section id="booking" className="py-20 md:py-32 bg-white animate-fadeIn">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Réservez Votre Service</h2>
                <p className="text-xl text-gray-600 mb-8">Remplissez le formulaire ci-dessous pour demander un devis</p>
              </div>
              <AdvancedBookingForm 
                prefilledService={prefilledService}
                prefilledOption={prefilledOption}
              />
            </div>
          </div>
        </section>






      </main>
    </div>
  );
}
