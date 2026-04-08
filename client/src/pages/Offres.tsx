import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Check, Star, Zap, ShoppingCart } from "lucide-react";
import { useLocation } from "wouter";

export default function Offres() {
  const [, navigate] = useLocation();
  const [selectedService, setSelectedService] = useState("automobile");
  const [quantity, setQuantity] = useState(1);

  // Tarifs détaillés par service
  const services = {
    automobile: {
      title: "🚗 Nettoyage Automobile",
      prestations: [
        { name: "Intérieur seul", price: 70 },
        { name: "Intérieur + Shampoing Sièges", price: 90 },
        { name: "Intérieur + Extérieur", price: 90 },
        { name: "Complet Berline (Int. + Ext.)", price: 110 },
        { name: "Complet SUV (Int. + Ext.)", price: 150 },
      ],
      options: [
        { name: "Shampoing Sièges", price: 40 },
        { name: "Detailing Tableau de bord", price: 30 },
        { name: "Poils d'animaux", price: 20 },
        { name: "Anti-odeurs Pro", price: 15 },
        { name: "Nettoyage Jantes", price: 15 },
        { name: "Cire Brillance", price: 20 },
        { name: "Anti-pluie Pare-brise", price: 10 },
        { name: "Rénovation Phares (paire)", price: 50 },
      ],
    },
    canapes: {
      title: "🛋️ Nettoyage Canapés & Fauteuils",
      prestations: [
        { name: "Petit (1 place)", price: 40 },
        { name: "Moyen (2-3 places)", price: 80 },
        { name: "Grand (Angle / 4+ places)", price: 130 },
      ],
      options: [
        { name: "Désinfection", price: 15 },
        { name: "Protection Textile", price: 25 },
      ],
    },
    tapis: {
      title: "🧶 Nettoyage Tapis & Moquettes",
      prestations: [
        { name: "Petit (< 3 m²)", price: 35 },
        { name: "Moyen (3 à 6 m²)", price: 60 },
        { name: "Grand (> 6 m²)", price: 90 },
      ],
      options: [
        { name: "Désinfection", price: 15 },
        { name: "Protection Textile", price: 25 },
      ],
    },
    terrasse: {
      title: "☀️ Nettoyage Terrasses & Sols",
      prestations: [
        { name: "Jusqu'à 20 m²", price: 90 },
        { name: "De 20 à 40 m²", price: 160 },
        { name: "De 40 à 60 m²", price: 240 },
      ],
      options: [
        { name: "Anti-mousse", price: 30 },
        { name: "Hydrofuge", price: 50 },
      ],
    },
    jardinage: {
      title: "🌳 Jardinage",
      prestations: [
        { name: "Tonte Pelouse (<100 m²)", price: 40 },
        { name: "Tonte Pelouse (100-300 m²)", price: 70 },
        { name: "Tonte Pelouse (300-500 m²)", price: 110 },
        { name: "Taille de haies (par mètre)", price: 10 },
        { name: "Évacuation déchets verts", price: 40 },
      ],
      options: [
        { name: "Débroussaillage (heure)", price: 45 },
      ],
    },
  };

  const currentService = services[selectedService as keyof typeof services];

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
          <div className="container">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Nos Offres</h1>
            <p className="text-xl text-blue-100">Abonnements automatiques ou prestations ponctuelles</p>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-20">
          <div className="container">
            <Tabs defaultValue="abonnements" className="w-full">
              <TabsList className="grid w-full max-w-md mx-auto mb-12 grid-cols-2">
                <TabsTrigger value="abonnements">📅 Abonnements</TabsTrigger>
                <TabsTrigger value="prestations">🛒 Prestations à l'Acte</TabsTrigger>
              </TabsList>

              {/* Abonnements Tab */}
              <TabsContent value="abonnements" className="space-y-8">
                <div className="text-center mb-12">
                  <h2 className="text-3xl font-bold text-slate-900 mb-4">Abonnements Mensuels</h2>
                </div>

                <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                  {/* Express Plan */}
                  <Card className="border-2 border-gray-200 hover:border-blue-400 transition-all">
                    <CardHeader>
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
                        <p className="text-sm text-orange-600 font-semibold mt-2">1er mois : 70€</p>
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

                      <Button className="w-full bg-blue-500 hover:bg-blue-600" size="lg" onClick={() => navigate('/payment')}>
                        Souscrire
                      </Button>
                    </CardContent>
                  </Card>

                  {/* Confort Plan */}
                  <Card className="border-2 border-blue-500 shadow-lg md:scale-105">
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <span className="bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-bold">
                        ⭐ POPULAIRE
                      </span>
                    </div>
                    <CardHeader>
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
                        <p className="text-sm text-orange-600 font-semibold mt-2">1er mois : 90€</p>
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

                      <Button className="w-full bg-blue-600 hover:bg-blue-700" size="lg" onClick={() => navigate('/payment')}>
                        Souscrire Maintenant
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              {/* Prestations Tab */}
              <TabsContent value="prestations" className="space-y-8">
                <div className="text-center mb-12">
                  <h2 className="text-3xl font-bold text-slate-900 mb-4">Prestations à l'Acte</h2>
                  <p className="text-gray-600 max-w-2xl mx-auto">
                    Besoin d'un nettoyage ponctuel ? Choisissez votre service et réservez en 3 clics
                  </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                  {/* Service Selection */}
                  <div className="md:col-span-1">
                    <Card>
                      <CardHeader>
                        <CardTitle>Services</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-2">
                        {Object.entries(services).map(([key, service]) => (
                          <Button
                            key={key}
                            variant={selectedService === key ? "default" : "outline"}
                            className="w-full justify-start"
                            onClick={() => setSelectedService(key)}
                          >
                            {service.title}
                          </Button>
                        ))}
                      </CardContent>
                    </Card>
                  </div>

                  {/* Service Details */}
                  <div className="md:col-span-2">
                    <Card>
                      <CardHeader>
                        <CardTitle>{currentService.title}</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        {/* Prestations */}
                        <div>
                          <Label className="text-base font-semibold mb-4 block">Prestations</Label>
                          <div className="space-y-2">
                            {currentService.prestations.map((prestation, i) => (
                              <div key={i} className="flex items-center justify-between p-3 border rounded-lg hover:bg-blue-50 cursor-pointer">
                                <span className="text-gray-700">{prestation.name}</span>
                                <span className="font-bold text-blue-600">{prestation.price}€</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Options */}
                        {currentService.options.length > 0 && (
                          <div>
                            <Label className="text-base font-semibold mb-4 block">Options à la carte</Label>
                            <div className="space-y-2">
                              {currentService.options.map((option, i) => (
                                <div key={i} className="flex items-center justify-between p-3 border rounded-lg hover:bg-blue-50">
                                  <span className="text-gray-700">{option.name}</span>
                                  <span className="font-bold text-blue-600">+{option.price}€</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Reservation Button */}
                        <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white text-lg py-6" size="lg" onClick={() => navigate("/reservation")}>
                          <ShoppingCart className="w-5 h-5 mr-2" />
                          Réserver cette prestation
                        </Button>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-blue-50">
          <div className="container text-center">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Besoin d'aide pour choisir ?</h2>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
              Contactez-nous pour un devis personnalisé ou pour discuter de vos besoins spécifiques
            </p>
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
              Demander un Devis Personnalisé
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
