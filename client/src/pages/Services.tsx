import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Car, Waves, Sofa, Building2, Leaf, ArrowRight } from "lucide-react";
import { useLocation } from "wouter";

export default function Services() {
  const [, navigate] = useLocation();

  const services = [
    {
      icon: Car,
      title: "Nettoyage Automobile",
      description: "Lavage intérieur et extérieur professionnel, lustrage, protection. Intervention à domicile.",
      href: "/service-automobile",
      color: "blue"
    },
    {
      icon: Waves,
      title: "Nettoyage Terrasse",
      description: "Démoussage, nettoyage haute pression, traitement anti-mousse, hydrofuge.",
      href: "/service-terrasse",
      color: "cyan"
    },
    {
      icon: Sofa,
      title: "Nettoyage Canapés & Tapis",
      description: "Injection-extraction, détachage professionnel, séchage rapide, protection textile.",
      href: "/service-tapis",
      color: "purple"
    },
    {
      icon: Building2,
      title: "Nettoyage Balcon",
      description: "Nettoyage complet, joints, garde-corps, revêtements. Service professionnel.",
      href: "/service-balcon",
      color: "orange"
    },
    {
      icon: Leaf,
      title: "Jardinage & Entretien",
      description: "Tonte pelouse, taille de haies, évacuation déchets verts, débroussaillage.",
      href: "/service-jardinage",
      color: "green"
    },
  ];

  const colorClasses = {
    blue: "bg-blue-50 border-blue-200 hover:border-blue-400",
    cyan: "bg-cyan-50 border-cyan-200 hover:border-cyan-400",
    purple: "bg-purple-50 border-purple-200 hover:border-purple-400",
    orange: "bg-orange-50 border-orange-200 hover:border-orange-400",
    green: "bg-green-50 border-green-200 hover:border-green-400",
  };

  const iconColors = {
    blue: "text-blue-600",
    cyan: "text-cyan-600",
    purple: "text-purple-600",
    orange: "text-orange-600",
    green: "text-green-600",
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative min-h-[400px] flex items-center justify-center overflow-hidden bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900">
          <div className="container relative z-10 py-20 text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Nos <span className="text-blue-400">Services</span>
            </h1>
            <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
              Découvrez notre gamme complète de services de nettoyage professionnel en Île-de-France.
            </p>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-20">
          <div className="container">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service, idx) => {
                const Icon = service.icon;
                const colorClass = colorClasses[service.color as keyof typeof colorClasses];
                const iconColor = iconColors[service.color as keyof typeof iconColors];

                return (
                  <Card 
                    key={idx}
                    className={`border-2 transition-all hover:shadow-lg cursor-pointer ${colorClass}`}
                    onClick={() => navigate(service.href)}
                  >
                    <CardHeader>
                      <Icon className={`w-12 h-12 ${iconColor} mb-4`} />
                      <CardTitle className="text-2xl">{service.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-gray-600">{service.description}</p>
                      <Button 
                        variant="outline"
                        className="w-full"
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(service.href);
                        }}
                      >
                        En Savoir Plus
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-20 bg-gray-50">
          <div className="container">
            <h2 className="text-3xl font-bold mb-12 text-center">Pourquoi Choisir ProClean Empire ?</h2>
            <div className="grid md:grid-cols-4 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Expertise</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">5+ ans d'expérience dans tous les types de nettoyage professionnel.</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Écologique</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">Produits biodégradables et respectueux de l'environnement.</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Rapide</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">Intervention sous 24h en Île-de-France, 7j/7.</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Garanti</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">Satisfaction garantie ou argent remboursé.</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-blue-600 text-white">
          <div className="container text-center">
            <h2 className="text-3xl font-bold mb-6">Prêt à Commencer ?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Choisissez un service et réservez votre intervention dès maintenant.
            </p>
            <Button 
              size="lg"
              className="bg-white text-blue-600 hover:bg-gray-100"
              onClick={() => navigate("/offres")}
            >
              Voir Nos Offres
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
