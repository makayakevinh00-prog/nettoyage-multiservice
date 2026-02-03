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
      link: "/service/automobile",
    },
    {
      icon: Waves,
      title: "Terrasse",
      description: "Démoussage, nettoyage haute pression, traitement anti-mousse.",
      image: "/hero-terrasse.jpg",
      link: "/service/terrasse",
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
        <section className="py-20 md:py-32 bg-gradient-to-br from-blue-50 to-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Avis de nos clients</h2>
              <p className="text-xl text-gray-600 mb-8">Lisez les avis verifies de nos clients sur Trustpilot</p>
            </div>
            <div className="flex justify-center">
              <a href="https://www.trustpilot.com/review/procleanempire.com" target="_blank" rel="noopener noreferrer" className="inline-block">
                <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                  <p className="text-blue-600 font-semibold">Lisez les avis marchands sur Trustpilot</p>
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



        {/* Gallery Section - Avant/Après */}
        <section className="py-20 md:py-32 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Nos Réalisations</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Découvrez les transformations spectaculaires réalisées par notre équipe
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Image 1: Before/After Car */}
              <div className="group bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 animate-slideUp stagger-1">
                <div className="relative h-64 overflow-hidden bg-gray-200">
                  <img 
                    src="https://private-us-east-1.manuscdn.com/sessionFile/BZI25pAxcT9kro8uC3dqXV/sandbox/VtLg6mjDUBCGbEryjVuH9i-img-1_1770118181000_na1fn_aGVyby1jbGVhbmluZy1iZWZvcmUtYWZ0ZXI.jpg?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvQlpJMjVwQXhjVDlrcm84dUMzZHFYVi9zYW5kYm94L1Z0TGc2bWpEVUJDR2JFcnlqVnVIOWktaW1nLTFfMTc3MDExODE4MTAwMF9uYTFmbl9hR1Z5YnkxamJHVmhibWx1WnkxaVpXWnZjbVV0WVdaMFpYSS5qcGc~eC1vc3MtcHJvY2Vzcz1pbWFnZS9yZXNpemUsd18xOTIwLGhfMTkyMC9mb3JtYXQsd2VicC9xdWFsaXR5LHFfODAiLCJDb25kaXRpb24iOnsiRGF0ZUxlc3NUaGFuIjp7IkFXUzpFcG9jaFRpbWUiOjE3OTg3NjE2MDB9fX1dfQ__&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=Ql2bAY1tPcZDd8MeaggrsfJ1a84OsDuuvALEm3v0W6pEf8d4DjklJUOVIyz~9m3VwiExdxi1ZjcOP7qN2oteAsEYaCTzARl0WRBLffyvUGwVGVMbMssgf4s~b46K94bN9YnLtsi2~SUfyHdqQ--p4a2i7mQVj~q8aWZ8Lhdc2~oCu1VJHYqmiJjYX-wNQetPldHHOOdIgIfpDXT~jNFE7ObvHNcSV1GA6OzlO767bKRwfGEv6F0jUdK5K9VHVzEm8-~qDxzTOoaNgpL7cDIyRLFV7a8ULm1sbZwhTGmwcqCc2Pnwpwl7XK4ONIOkvguaRktU5eoXxKsBGqXOyV9ajg__" 
                    alt="Nettoyage Automobile Avant/Après"
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Nettoyage Automobile</h3>
                  <p className="text-gray-600">Transformation complète de votre véhicule avec nos services premium</p>
                </div>
              </div>

              {/* Image 2: Team in Action */}
              <div className="group bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 animate-slideUp stagger-2">
                <div className="relative h-64 overflow-hidden bg-gray-200">
                  <img 
                    src="https://private-us-east-1.manuscdn.com/sessionFile/BZI25pAxcT9kro8uC3dqXV/sandbox/VtLg6mjDUBCGbEryjVuH9i-img-2_1770118182000_na1fn_dGVhbS1jbGVhbmluZy1hY3Rpb24.jpg?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvQlpJMjVwQXhjVDlrcm84dUMzZHFYVi9zYW5kYm94L1Z0TGc2bWpEVUJDR2JFcnlqVnVIOWktaW1nLTJfMTc3MDExODE4MjAwMF9uYTFmbl9kR1ZoYlMxamJHVmhibWx1WnkxaFkzUnBiMjQuanBnP3gtb3NzLXByb2Nlc3M9aW1hZ2UvcmVzaXplLHdfMTkyMCxoXzE5MjAvZm9ybWF0LHdlYnAvcXVhbGl0eSxxXzgwIiwiQ29uZGl0aW9uIjp7IkRhdGVMZXNzVGhhbiI6eyJBV1M6RXBvY2hUaW1lIjoxNzk4NzYxNjAwfX19XX0_&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=qOKBEB6-cQFycxo61Z1sizjTb48ykxIM3R-Tm-E~Hw27iPS-4cNw8OKt4waTqbe~XHMnEGJKGxhBnJhfwN1LxlTCIWKWxr87hjZmbGCa0GDN4EMTHU8j~1~Kv2RLzcAFJmi8ETZS-QYdvXyG7CC~XgfJHSkYG~ziYLkfBwBX7bEo2fmgdA5QxVEWpLRqSjcQ0O6u2a6wm0Y0XSrKEOrLfaYuB7KVIpQ3Urh~-lReYFHkv4GN4jIpcyIlMpdqMAqr-kR9refvtemFbgzp05ikUrtmEBgJOpMcMJKDaqxUQ5~CkZ~bvBDbreXNdHsYOSolCcu~Q4~rtCuCYdRuWzrNTg__" 
                    alt="Équipe ProClean Empire en action"
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Notre Équipe Professionnelle</h3>
                  <p className="text-gray-600">Des experts formés et équipés pour tous vos besoins de nettoyage</p>
                </div>
              </div>

              {/* Image 3: Carpet Cleaning */}
              <div className="group bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 animate-slideUp stagger-3">
                <div className="relative h-64 overflow-hidden bg-gray-200">
                  <img 
                    src="https://private-us-east-1.manuscdn.com/sessionFile/BZI25pAxcT9kro8uC3dqXV/sandbox/VtLg6mjDUBCGbEryjVuH9i-img-3_1770118177000_na1fn_Y2FycGV0LWNsZWFuaW5nLXRyYW5zZm9ybWF0aW9u.jpg?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvQlpJMjVwQXhjVDlrcm84dUMzZHFYVi9zYW5kYm94L1Z0TGc2bWpEVUJDR2JFcnlqVnVIOWktaW1nLTNfMTc3MDExODE3NzAwMF9uYTFmbl9ZMkZ5Y0dWMExXTnNaV0Z1YVc1bkxYUnlZVzV6Wm05eWJXRjBhVzl1LmpwZz94LW9zcy1wcm9jZXNzPWltYWdlL3Jlc2l6ZSx3XzE5MjAsaF8xOTIwL2Zvcm1hdCx3ZWJwL3F1YWxpdHkscV84MCIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTc5ODc2MTYwMH19fV19&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=jeiqzDQexb~qiHrO6lBSDGj2FI~QeXjqidHVGkH2wttiIc7NkTr6gDRXZVBbKofc7djh8z44eSoSMmZO5bONxDlk3CqjwGYEJv8qLC5ZfGeJtWKbBHyahx3dUa0tsCgmKFeJFCgnauaPaFgY-b3B2BiVjqxPswx3x7cL5SxbxvMpdqhvjOFZ6t6LF-ZK9PEG3S9-bMagCDaGR3eoWoLwR8V5bnEcw-Uw2YXTaQ5W9L6yeqR6Q0aORqF20Q7D~hoP4~VUTeZL-kmE2FV~zE7hnxm8keB6mBUPZnAPuC1-HRUCDevMZ~zLzWRm7-mfTtS~jHFwWVK0CLXM6TlWUtpqtg__" 
                    alt="Nettoyage de Tapis Avant/Après"
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Nettoyage Tapis & Canapés</h3>
                  <p className="text-gray-600">Extraction professionnelle pour des résultats impeccables</p>
                </div>
              </div>

              {/* Image 4: Terrace Restoration */}
              <div className="group bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 animate-slideUp stagger-4">
                <div className="relative h-64 overflow-hidden bg-gray-200">
                  <img 
                    src="https://private-us-east-1.manuscdn.com/sessionFile/BZI25pAxcT9kro8uC3dqXV/sandbox/VtLg6mjDUBCGbEryjVuH9i-img-4_1770118171000_na1fn_dGVycmFjZS1yZXN0b3JhdGlvbg.jpg?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvQlpJMjVwQXhjVDlrcm84dUMzZHFYVi9zYW5kYm94L1Z0TGc2bWpEVUJDR2JFcnlqVnVIOWktaW1nLTRfMTc3MDExODE3MTAwMF9uYTFmbl9kR1Z5Y21GalpTMXlaWE4wYjNKaGRHbHZiZy5qcGc~eC1vc3MtcHJvY2Vzcz1pbWFnZS9yZXNpemUsd18xOTIwLGhfMTkyMC9mb3JtYXQsd2VicC9xdWFsaXR5LHFfODAiLCJDb25kaXRpb24iOnsiRGF0ZUxlc3NUaGFuIjp7IkFXUzpFcG9jaFRpbWUiOjE3OTg3NjE2MDB9fX1dfQ__&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=r9bvZQu-IwwSPYppLMpNBKLW7jMSDY6fLmA7U1XYITZBwZ5VRiy~Lc~NgtOFsMFP4MkHefGbYUIdXozLFaf~Ct3bbf~0d1uB40PaT3nQFPn7rxfkI9lLLb11W0ONt0LrkXSXoV~a9jxJ5L1bXSMnpjO25ZZ9ZlgDO5EOsT3POvH-Rdrty7vlfsD4YCAnSyUvhdTtokb63niTE37Hu0xbJNvavzzikbXJk9n4c94V2eB7gcBKQ6lPjSs-IyGcL3MIgpKluxHCoCHr-0zgV-0l-D0nQ1f9iJP~BFmse6aZCgpz1xjZjrxjYmp3XMgIIZdh7gS0WwNPntPtUn~ppzaMhw__" 
                    alt="Nettoyage Terrasse Avant/Après"
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Nettoyage Terrasse</h3>
                  <p className="text-gray-600">Haute pression et traitement anti-mousse pour une terrasse comme neuve</p>
                </div>
              </div>

              {/* Image 5: Equipment Showcase */}
              <div className="group bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 animate-slideUp stagger-5">
                <div className="relative h-64 overflow-hidden bg-gray-200">
                  <img 
                    src="https://private-us-east-1.manuscdn.com/sessionFile/BZI25pAxcT9kro8uC3dqXV/sandbox/VtLg6mjDUBCGbEryjVuH9i-img-5_1770118183000_na1fn_ZXF1aXBtZW50LXNob3djYXNl.jpg?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvQlpJMjVwQXhjVDlrcm84dUMzZHFYVi9zYW5kYm94L1Z0TGc2bWpEVUJDR2JFcnlqVnVIOWktaW1nLTVfMTc3MDExODE4MzAwMF9uYTFmbl9aWEYxYVhCdFpXNTBMWE5vYjNkallYTmwuanBnP3gtb3NzLXByb2Nlc3M9aW1hZ2UvcmVzaXplLHdfMTkyMCxoXzE5MjAvZm9ybWF0LHdlYnAvcXVhbGl0eSxxXzgwIiwiQ29uZGl0aW9uIjp7IkRhdGVMZXNzVGhhbiI6eyJBV1M6RXBvY2hUaW1lIjoxNzk4NzYxNjAwfX19XX0_&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=T35kxcZZx-E41eneLy~kdYaxSjHXhn8M00~74ahwgJPJubXO5GTWyglJSpbOfLnxPQd3pLU4-azb7UjpH1Ka0TcJYwZnu7RyDJZhRzyPCtFtXc8b6WsJXMYukxMdb61eFXU4zbh3BHvomqJjo0N73sXr0YX4-7KkGPpDSoBaJcGXvUS6T9riwbRaqGZcvggkuTQCxCTP9Vrn8~qZFPqOTVMZJlSigX2cvcPBrj9tVkLbNFvJjac6WvF-ky-pu1j0G2c81KzhkvQK0xNEUlmdhoXwmsxwAB3Nl~oU2oBCsoOP7yuoOJlE22OXxO9SEwQ6ojw9oPIJ0YBzqDn-KaJ1wQ__" 
                    alt="Équipements Professionnels ProClean Empire"
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Équipements Professionnels</h3>
                  <p className="text-gray-600">Technologie de pointe pour des résultats garantis</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonial Carousel Section */}
        <TestimonialCarousel />


      </main>
    </div>
  );
}
