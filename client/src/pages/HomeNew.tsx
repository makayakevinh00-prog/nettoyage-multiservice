import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, Zap, Crown, ArrowRight, Star } from "lucide-react";
import { APP_LOGO, APP_TITLE, getLoginUrl } from "@/const";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useAuth } from "@/_core/hooks/useAuth";

export default function HomeNew() {
  const { isAuthenticated } = useAuth();
  const [selectedPlan, setSelectedPlan] = useState<"express" | "confort" | null>(null);

  const subscriptionPlans = [
    {
      id: "express",
      name: "Express",
      price: "30",
      period: "/mois",
      description: "L'essentiel pour une voiture propre",
      icon: Zap,
      features: [
        "Lavage extérieur complet",
        "Aspiration intérieur minutieuse",
        "Déplacement à domicile inclus",
        "Frais mise en propreté: 70€ (1er mois)"
      ],
      cta: "Souscrire",
      highlighted: false
    },
    {
      id: "confort",
      name: "Confort",
      price: "60",
      period: "/mois",
      description: "Le soin supérieur avec finition parfaite",
      icon: Crown,
      features: [
        "Lavage extérieur complet",
        "Aspiration minutieuse intérieur",
        "Detailing tableau de bord",
        "Soin plastiques intérieurs",
        "Déplacement à domicile inclus",
        "Frais mise en propreté: 90€ (1er mois)"
      ],
      cta: "Souscrire",
      highlighted: true
    }
  ];

  const services = [
    { name: "Automobile", href: "/service-automobile", icon: "🚗" },
    { name: "Terrasse", href: "/service-terrasse", icon: "🏡" },
    { name: "Tapis", href: "/service-tapis", icon: "🛋️" },
    { name: "Balcon", href: "/service-balcon", icon: "🏢" },
    { name: "Jardinage", href: "/service-jardinage", icon: "🌿" },
    { name: "Façade", href: "/service-facade", icon: "🏗️" }
  ];

  const testimonials = [
    {
      name: "Alexandre M.",
      role: "Particulier",
      content: "Service exceptionnel ! Ma voiture sort de l'usine.",
      rating: 5
    },
    {
      name: "Sophie D.",
      role: "Propriétaire",
      content: "Travail remarquable et très professionnel. Je recommande !",
      rating: 5
    },
    {
      name: "Thomas L.",
      role: "Copropriété",
      content: "Toujours à l'heure, efficace et soigné. Parfait !",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-gray-900">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative min-h-[600px] flex items-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 overflow-hidden">
          <div className="absolute inset-0 bg-[url('/hero-alt.png')] bg-cover bg-center opacity-20"></div>
          <div className="container relative z-10 py-20">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="text-white">
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
                  <span className="text-white">PROCLEAN</span>{" "}
                  <span className="text-blue-400">EMPIRE</span>
                </h1>
                <p className="text-2xl md:text-3xl font-semibold mb-4 text-blue-300">
                  Nettoyage Premium
                </p>
                <p className="text-xl mb-8 text-gray-300 max-w-xl">
                  Votre véhicule toujours impeccable, sans bouger de chez vous. Abonnement mensuel avec intervention à domicile.
                </p>
                <div className="flex gap-4">
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 text-lg" asChild>
                    <a href="#subscriptions">Découvrir les abonnements</a>
                  </Button>
                  <Button variant="outline" className="px-8 py-6 text-lg" asChild>
                    <a href="#services">Autres services</a>
                  </Button>
                </div>
              </div>
              <div className="hidden md:block">
                <div className="bg-blue-600/20 rounded-lg p-8 backdrop-blur">
                  <div className="text-center">
                    <Star className="w-16 h-16 text-yellow-400 mx-auto mb-4" />
                    <p className="text-white text-lg font-semibold">4.1/5</p>
                    <p className="text-gray-300">Basé sur 50+ avis clients</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Subscriptions Section - PRIORITÉ */}
        <section id="subscriptions" className="py-20 bg-white dark:bg-gray-800">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
                Nos Abonnements Automobile
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                Choisissez la formule qui vous correspond. Intervention à domicile, sans engagement.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {subscriptionPlans.map((plan) => {
                const Icon = plan.icon;
                return (
                  <Card
                    key={plan.id}
                    className={`relative transition-all duration-300 ${
                      plan.highlighted
                        ? "md:scale-105 border-blue-600 shadow-2xl"
                        : "border-gray-200 dark:border-gray-700"
                    }`}
                  >
                    {plan.highlighted && (
                      <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                        <span className="bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
                          Recommandé
                        </span>
                      </div>
                    )}
                    <CardHeader>
                      <div className="flex items-center justify-between mb-4">
                        <Icon className="w-8 h-8 text-blue-600" />
                        <span className="text-3xl font-bold text-gray-900 dark:text-white">
                          {plan.price}€
                          <span className="text-sm text-gray-600 dark:text-gray-400 font-normal">
                            {plan.period}
                          </span>
                        </span>
                      </div>
                      <CardTitle className="text-2xl">{plan.name}</CardTitle>
                      <CardDescription className="text-base">{plan.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4 mb-8">
                        {plan.features.map((feature, idx) => (
                          <div key={idx} className="flex gap-3">
                            <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                            <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                          </div>
                        ))}
                      </div>
                      <Button
                        className={`w-full py-6 text-lg font-semibold ${
                          plan.highlighted
                            ? "bg-blue-600 hover:bg-blue-700 text-white"
                            : "bg-gray-100 hover:bg-gray-200 text-gray-900 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white"
                        }`}
                        onClick={() => setSelectedPlan(plan.id as "express" | "confort")}
                      >
                        {plan.cta}
                        <ArrowRight className="w-5 h-5 ml-2" />
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            <div className="mt-12 p-6 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-3">
                💡 Pourquoi des frais de mise en propreté le premier mois ?
              </h3>
              <p className="text-gray-700 dark:text-gray-300">
                Pour vous garantir un résultat irréprochable, votre premier rendez-vous comprend une "Mise à Zéro" complète. Ce grand nettoyage en profondeur remet votre véhicule à neuf. Dès le deuxième mois, le tarif mensuel classique s'applique automatiquement !
              </p>
            </div>
          </div>
        </section>

        {/* Options à la Carte */}
        <section className="py-20 bg-gray-50 dark:bg-gray-900">
          <div className="container">
            <h2 className="text-4xl font-bold mb-12 text-center text-gray-900 dark:text-white">
              Personnalisez votre entretien
            </h2>
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <div>
                <h3 className="text-xl font-semibold mb-6 text-gray-900 dark:text-white">
                  🧼 Pour l'Intérieur
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-white dark:bg-gray-800 rounded-lg">
                    <span className="text-gray-700 dark:text-gray-300">Shampoing et détachage sièges</span>
                    <span className="font-semibold text-blue-600">+40€</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-white dark:bg-gray-800 rounded-lg">
                    <span className="text-gray-700 dark:text-gray-300">Traitement "Poils d'animaux"</span>
                    <span className="font-semibold text-blue-600">+15€</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-white dark:bg-gray-800 rounded-lg">
                    <span className="text-gray-700 dark:text-gray-300">Traitement anti-odeurs</span>
                    <span className="font-semibold text-blue-600">+15€</span>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-6 text-gray-900 dark:text-white">
                  ✨ Pour l'Extérieur
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-white dark:bg-gray-800 rounded-lg">
                    <span className="text-gray-700 dark:text-gray-300">Nettoyage jantes en profondeur</span>
                    <span className="font-semibold text-blue-600">+15€</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-white dark:bg-gray-800 rounded-lg">
                    <span className="text-gray-700 dark:text-gray-300">Cire de protection carrosserie</span>
                    <span className="font-semibold text-blue-600">+20€</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-white dark:bg-gray-800 rounded-lg">
                    <span className="text-gray-700 dark:text-gray-300">Rénovation des phares (paire)</span>
                    <span className="font-semibold text-blue-600">+40€</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Autres Services */}
        <section id="services" className="py-20 bg-white dark:bg-gray-800">
          <div className="container">
            <h2 className="text-4xl font-bold mb-12 text-center text-gray-900 dark:text-white">
              Nos Autres Services
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {services.map((service) => (
                <a
                  key={service.name}
                  href={service.href}
                  className="group p-6 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-colors text-center"
                >
                  <div className="text-4xl mb-3">{service.icon}</div>
                  <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {service.name}
                  </h3>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-20 bg-gray-50 dark:bg-gray-900">
          <div className="container">
            <h2 className="text-4xl font-bold mb-12 text-center text-gray-900 dark:text-white">
              Ce que nos clients disent
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, idx) => (
                <Card key={idx} className="border-gray-200 dark:border-gray-700">
                  <CardContent className="pt-6">
                    <div className="flex gap-1 mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <p className="text-gray-700 dark:text-gray-300 mb-4">"{testimonial.content}"</p>
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white">{testimonial.name}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{testimonial.role}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Final */}
        <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-700">
          <div className="container text-center">
            <h2 className="text-4xl font-bold text-white mb-6">
              Prêt à transformer votre nettoyage ?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Rejoignez des centaines de clients satisfaits. Abonnement sans engagement, annulation possible à tout moment.
            </p>
            <Button className="bg-white hover:bg-gray-100 text-blue-600 px-8 py-6 text-lg font-semibold" asChild>
              <a href="#subscriptions">Souscrire maintenant</a>
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
