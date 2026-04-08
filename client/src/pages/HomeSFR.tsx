import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Check, Star, Zap, Clock, Shield, Smartphone } from "lucide-react";
import { useLocation } from "wouter";

export default function HomeSFR() {
  const [, navigate] = useLocation();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToBooking = () => {
    const element = document.getElementById("booking-section");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      <main className="flex-1">
        {/* Hero Section - Inspiré SFR */}
        <section className="relative min-h-[600px] flex items-center justify-center overflow-hidden">
          {/* Background Image */}
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: 'url(https://d2xsxph8kpxj0f.cloudfront.net/310519663223121429/mWQNegFX82Wq6P3J8ww4RP/hero-sfr_d1f00761.png)',
              backgroundPosition: 'center',
              backgroundSize: 'cover'
            }}
          ></div>
          {/* Overlay Gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/80 via-blue-900/70 to-slate-900/60"></div>

          <div className="container relative z-20 py-20 text-center">
            <div className="max-w-3xl mx-auto">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
                Nettoyage <span className="text-blue-400">Premium</span>
              </h1>
              <p className="text-2xl md:text-3xl text-gray-200 mb-4 font-semibold">
                Pour Entreprises & Particuliers
              </p>
              <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                Abonnements automatiques ou prestations ponctuelles. Choisissez votre formule et laissez-nous faire.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  className="bg-blue-500 hover:bg-blue-600 text-white text-lg px-8 py-6"
                  onClick={() => navigate("/offres")}
                >
                  🚗 Choisir un Abonnement
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-blue-900 text-lg px-8 py-6"
                  onClick={() => navigate("/reservation")}
                >
                  📅 Réserver Maintenant
                </Button>
              </div>

              {/* Trust Badges */}
              <div className="mt-12 flex flex-wrap justify-center gap-6 text-sm text-gray-300">
                <div className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-green-400" />
                  <span>Intervention sous 24h</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-green-400" />
                  <span>Places limitées cette semaine</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-green-400" />
                  <span>Garantie satisfaction</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section Abonnements - PRIORITÉ */}
        <section className="py-20 bg-white">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
                Abonnements Automatiques
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Comme SFR, choisissez votre formule et profitez du nettoyage sans vous en soucier
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {/* Plan Express */}
              <Card className="relative border-2 border-gray-200 hover:border-blue-400 transition-all">
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-2xl">EXPRESS</CardTitle>
                      <CardDescription>Pour débuter</CardDescription>
                    </div>
                    <Zap className="w-6 h-6 text-blue-500" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="mb-6">
                    <div className="text-4xl font-bold text-slate-900">30€</div>
                    <p className="text-gray-600">/mois après le 1er mois</p>
                    <p className="text-sm text-orange-600 font-semibold mt-2">1er mois : 70€ (frais de mise en propreté)</p>
                  </div>

                  <ul className="space-y-3 mb-8">
                    <li className="flex items-center gap-3">
                      <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <span className="text-gray-700">1 intervention par mois</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <span className="text-gray-700">Déplacement inclus</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <span className="text-gray-700">Annulation gratuite</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <span className="text-gray-700">Pause possible à tout moment</span>
                    </li>
                  </ul>

                  <Button
                    className="w-full bg-blue-500 hover:bg-blue-600"
                    size="lg"
                    onClick={() => navigate("/offres")}
                  >
                    Souscrire
                  </Button>
                </CardContent>
              </Card>

              {/* Plan Confort - HIGHLIGHTED */}
              <Card className="relative border-2 border-blue-500 shadow-lg hover:shadow-xl transition-all md:scale-105">
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-bold">
                    ⭐ POPULAIRE
                  </span>
                </div>
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-2xl">CONFORT</CardTitle>
                      <CardDescription>Le plus choisi</CardDescription>
                    </div>
                    <Star className="w-6 h-6 text-yellow-500" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="mb-6">
                    <div className="text-4xl font-bold text-slate-900">60€</div>
                    <p className="text-gray-600">/mois après le 1er mois</p>
                    <p className="text-sm text-orange-600 font-semibold mt-2">1er mois : 90€ (frais de mise en propreté)</p>
                  </div>

                  <ul className="space-y-3 mb-8">
                    <li className="flex items-center gap-3">
                      <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <span className="text-gray-700">2 interventions par mois</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <span className="text-gray-700">Déplacement inclus</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <span className="text-gray-700">Priorité d'intervention</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <span className="text-gray-700">Pause possible à tout moment</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <span className="text-gray-700">Options à la carte</span>
                    </li>
                  </ul>

                  <Button
                    className="w-full bg-blue-600 hover:bg-blue-700"
                    size="lg"
                    onClick={() => navigate("/offres")}
                  >
                    Souscrire Maintenant
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Section Services - Prestations Ponctuelles */}
        <section className="py-20 bg-gray-50">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
                Prestations à l'Acte
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Besoin d'un nettoyage ponctuel ? Choisissez votre service et réservez en 3 clics
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { 
                  icon: "🚗", 
                  title: "Automobile", 
                  desc: "Intérieur, extérieur, détailing", 
                  price: "À partir de 70€",
                  image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663223121429/mWQNegFX82Wq6P3J8ww4RP/service-auto-clean-TE8uYdCBKLVfwsK7uX5zUJ.webp"
                },
                { 
                  icon: "🛋️", 
                  title: "Canapés", 
                  desc: "Petit, moyen, grand format", 
                  price: "À partir de 40€",
                  image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663223121429/mWQNegFX82Wq6P3J8ww4RP/service-couch-clean-X86WemSDtvmaiVMLkdb9bD.webp"
                },
                { 
                  icon: "🧶", 
                  title: "Tapis", 
                  desc: "Injection-extraction pro", 
                  price: "À partir de 35€",
                  image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663223121429/mWQNegFX82Wq6P3J8ww4RP/service-carpet-clean-aoZP5vsE6eKLgY835yUVLr.webp"
                },
                { 
                  icon: "☀️", 
                  title: "Terrasse", 
                  desc: "Nettoyage haute pression", 
                  price: "À partir de 90€",
                  image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663223121429/mWQNegFX82Wq6P3J8ww4RP/service-terrace-clean-6cTaVATdxhhRQvzUWKyrvc.webp"
                },
              ].map((service, i) => (
                <Card key={i} className="hover:shadow-lg transition-all cursor-pointer group overflow-hidden">
                  <div className="relative h-48 overflow-hidden bg-gray-200">
                    <img 
                      src={service.image} 
                      alt={service.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <CardContent className="p-6 text-center">
                    <h3 className="text-xl font-bold text-slate-900 mb-2">{service.title}</h3>
                    <p className="text-gray-600 text-sm mb-4">{service.desc}</p>
                    <p className="text-blue-600 font-bold mb-4">{service.price}</p>
                    <Button
                      variant="outline"
                      className="w-full group-hover:bg-blue-500 group-hover:text-white transition-all"
                      onClick={scrollToBooking}
                    >
                      Réserver
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Section Avantages */}
        <section className="py-20 bg-white">
          <div className="container">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <Clock className="w-12 h-12 text-blue-500 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-slate-900 mb-2">Intervention Rapide</h3>
                <p className="text-gray-600">Sous 24h pour les demandes urgentes</p>
              </div>
              <div className="text-center">
                <Shield className="w-12 h-12 text-blue-500 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-slate-900 mb-2">Garantie Satisfaction</h3>
                <p className="text-gray-600">100% satisfait ou remboursé</p>
              </div>
              <div className="text-center">
                <Smartphone className="w-12 h-12 text-blue-500 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-slate-900 mb-2">Gestion Facile</h3>
                <p className="text-gray-600">Gérez votre abonnement en ligne</p>
              </div>
            </div>
          </div>
        </section>

        {/* Section Réservation */}
        <section id="booking-section" className="py-20 bg-blue-50">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
                Prêt à Commencer ?
              </h2>
              <p className="text-xl text-gray-600">
                Réservez votre prestation en 3 clics
              </p>
            </div>

            <div className="max-w-2xl mx-auto">
              <Button
                size="lg"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white text-lg py-6"
                onClick={() => navigate("/offres")}
              >
                Accéder au Formulaire de Réservation
              </Button>
            </div>
          </div>
        </section>

        {/* CTA Flottant */}
        {scrolled && (
          <div className="fixed bottom-6 right-6 z-40 animate-bounce">
            <Button
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg rounded-full"
              onClick={scrollToBooking}
            >
              📅 Réserver
            </Button>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
