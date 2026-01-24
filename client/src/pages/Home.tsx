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
      image: "/service-automobile.jpg",
      link: "/service/automobile",
    },
    {
      icon: Waves,
      title: "Terrasse",
      description: "Démoussage, nettoyage haute pression, traitement anti-mousse.",
      image: "/service-terrasse.jpg",
      link: "/service/terrasse",
    },
    {
      icon: Sofa,
      title: "Tapis & Canapés",
      description: "Injection-extraction, détachage professionnel, séchage rapide.",
      image: "/service-tapis.jpg",
      link: "/service/tapis",
    },
    {
      icon: Building2,
      title: "Balcon",
      description: "Nettoyage complet, joints, garde-corps et revêtements.",
      image: "/service-balcon.jpg",
      link: "/service/balcon",
    },
    {
      icon: Leaf,
      title: "Jardinage",
      description: "Entretien paysager, taille, débroussaillage professionnel.",
      image: "/service-jardinage.jpg",
      link: "/service/jardinage",
    },
    {
      icon: Building2,
      title: "Façade",
      description: "Nettoyage haute pression, traitement anti-mousse, joints.",
      image: "/service-facade.jpg",
      link: "/service/facade",
    },
  ];

  const stats = [
    { number: "5+", label: "Ans d'Expérience" },
    { number: "1000+", label: "Clients Satisfaits" },
    { number: "7", label: "Services Disponibles" },
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
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
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
          <div className="relative z-10 container mx-auto px-4 text-center">
            <div className="max-w-3xl mx-auto">
              {/* Main Title */}
              <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
                PROCLEAN<br />
                <span className="text-blue-400">EMPIRE</span>
              </h1>
              
              {/* Subtitle */}
              <p className="text-2xl md:text-3xl text-gray-100 mb-4 font-light">
                Nettoyage Multiservice Premium
              </p>
              
              {/* Description */}
              <p className="text-lg text-gray-200 mb-10 max-w-2xl mx-auto">
                Nous entretenons tous les sites où la propreté est capitale.
              </p>
              
              {/* Services List */}
              <p className="text-gray-300 mb-10 text-base">
                Voiture • Tapis • Terrasse • Balcon • Jardinage • Façade • Professionnel
              </p>
              
              {/* CTA Button */}
              <a href="#booking" className="inline-flex items-center justify-center px-10 py-4 bg-white hover:bg-gray-100 text-gray-900 font-semibold rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg">
                DEMANDER UN DEVIS
                <ArrowRight className="ml-2 w-5 h-5" />
              </a>
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
                    className="group bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                  >
                    <div className="relative h-48 overflow-hidden bg-gray-200">
                      <img 
                        src={service.image} 
                        alt={service.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-6">
                      <Icon className="w-8 h-8 text-blue-600 mb-3" />
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{service.title}</h3>
                      <p className="text-gray-600 mb-4">{service.description}</p>
                      <div className="text-blue-600 font-semibold group-hover:text-blue-700">
                        En savoir plus →
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
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Pourquoi Nous Choisir</h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { icon: Shield, title: "Professionnel", desc: "Équipe formée et expérimentée" },
                { icon: Sparkles, title: "Qualité", desc: "Résultats impeccables garantis" },
                { icon: Clock3, title: "Rapide", desc: "Intervention rapide en Île-de-France" },
                { icon: Zap, title: "Efficace", desc: "Équipements dernière génération" },
                { icon: CheckCircle2, title: "Fiable", desc: "Satisfaction garantie ou remboursé" },
                { icon: Star, title: "Avis", desc: "13 avis clients 5.0/5 étoiles" },
              ].map((item, i) => {
                const Icon = item.icon;
                return (
                  <div key={i} className="text-center">
                    <Icon className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                    <p className="text-gray-600">{item.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-20 md:py-32 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Avis Clients</h2>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, i) => (
                <div key={i} className="bg-white rounded-lg p-8 shadow-md">
                  <div className="flex gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, j) => (
                      <Star key={j} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-4 italic">"{testimonial.content}"</p>
                  <div>
                    <p className="font-bold text-gray-900">{testimonial.name}</p>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Booking Section */}
        <section id="booking" className="py-20 md:py-32 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Réservez Votre Service</h2>
              <p className="text-xl text-gray-600">Remplissez le formulaire ci-dessous pour demander un devis</p>
            </div>
            <AdvancedBookingForm />
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-24 bg-gradient-to-r from-blue-600 to-blue-800">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Prêt à transformer vos espaces ?</h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Contactez-nous dès aujourd'hui pour un devis gratuit et sans engagement
            </p>
            <a href="#booking" className="inline-flex items-center justify-center px-8 py-4 bg-white hover:bg-gray-100 text-blue-600 font-semibold rounded-lg transition-all duration-300 transform hover:scale-105">
              Demander un Devis
              <ArrowRight className="ml-2 w-5 h-5" />
            </a>
          </div>
        </section>
      </main>
    </div>
  );
}
