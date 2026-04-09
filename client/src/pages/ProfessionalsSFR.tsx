import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Check, Building2, TrendingUp, Clock, Users, Award, ArrowRight } from "lucide-react";
import { useLocation } from "wouter";

export default function ProfessionalsSFR() {
  const [, navigate] = useLocation();
  const [selectedPlan, setSelectedPlan] = useState("standard");

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      <main className="flex-1">
        {/* Hero Section Professionnels */}
        <section className="relative min-h-[500px] flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-96 h-96 bg-blue-400 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-300 rounded-full blur-3xl"></div>
          </div>

          <div className="container relative z-10 py-20 text-center">
            <div className="max-w-3xl mx-auto">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
                Solutions <span className="text-blue-400">Professionnelles</span>
              </h1>
              <p className="text-2xl md:text-3xl text-gray-200 mb-4 font-semibold">
                Pour Entreprises, Syndics & Commerces
              </p>
              <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                Contrats sur-mesure, tarifs dégressifs, support dédié. Un service professionnel adapté à vos besoins.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  className="bg-blue-500 hover:bg-blue-600 text-white text-lg px-8 py-6"
                  onClick={() => document.getElementById("plans")?.scrollIntoView({ behavior: "smooth" })}
                >
                  📋 Voir les Offres
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-blue-900 text-lg px-8 py-6"
                  onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
                >
                  💬 Demander un Devis
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Section Avantages Professionnels */}
        <section className="py-20 bg-gray-50">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
                Pourquoi Choisir ProClean Empire ?
              </h2>
              <p className="text-xl text-gray-600">Des avantages exclusifs pour les professionnels</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <Card className="border-0 shadow-lg hover:shadow-xl transition-all">
                <CardContent className="p-8">
                  <TrendingUp className="w-12 h-12 text-blue-500 mb-4" />
                  <h3 className="text-xl font-bold text-slate-900 mb-3">Tarifs Dégressifs</h3>
                  <p className="text-gray-600">
                    Plus vous nettoyez, moins vous payez. Économies jusqu'à 40% pour les contrats annuels.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg hover:shadow-xl transition-all">
                <CardContent className="p-8">
                  <Users className="w-12 h-12 text-blue-500 mb-4" />
                  <h3 className="text-xl font-bold text-slate-900 mb-3">Support Dédié</h3>
                  <p className="text-gray-600">
                    Account manager personnel, priorité d'intervention, support 24/7 pour urgences.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg hover:shadow-xl transition-all">
                <CardContent className="p-8">
                  <Clock className="w-12 h-12 text-blue-500 mb-4" />
                  <h3 className="text-xl font-bold text-slate-900 mb-3">Flexibilité</h3>
                  <p className="text-gray-600">
                    Interventions programmées, facturation mensuelle, ajustements selon vos besoins.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg hover:shadow-xl transition-all">
                <CardContent className="p-8">
                  <Award className="w-12 h-12 text-blue-500 mb-4" />
                  <h3 className="text-xl font-bold text-slate-900 mb-3">Qualité Garantie</h3>
                  <p className="text-gray-600">
                    Équipes formées, équipements professionnels, audit qualité régulier.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg hover:shadow-xl transition-all">
                <CardContent className="p-8">
                  <Building2 className="w-12 h-12 text-blue-500 mb-4" />
                  <h3 className="text-xl font-bold text-slate-900 mb-3">Couverture Large</h3>
                  <p className="text-gray-600">
                    Île-de-France complète. Bureaux, immeubles, commerces, usines.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg hover:shadow-xl transition-all">
                <CardContent className="p-8">
                  <Check className="w-12 h-12 text-blue-500 mb-4" />
                  <h3 className="text-xl font-bold text-slate-900 mb-3">Facturation Simple</h3>
                  <p className="text-gray-600">
                    Une facture unique par mois, détails complets, paiement par virement.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Section Plans Professionnels */}
        <section id="plans" className="py-20 bg-white">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
                Nos Offres Professionnelles
              </h2>
              <p className="text-xl text-gray-600">3 plans adaptés à la taille de votre entreprise</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {/* Plan Startup */}
              <Card className="border-2 border-gray-200 hover:border-blue-400 transition-all">
                <CardHeader className="pb-4">
                  <CardTitle className="text-2xl">STARTUP</CardTitle>
                  <CardDescription>Petits commerces & bureaux</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="mb-6">
                    <div className="text-3xl font-bold text-slate-900">À partir de</div>
                    <div className="text-4xl font-bold text-blue-600 mt-2">500€</div>
                    <p className="text-gray-600 text-sm mt-2">/mois (contrat annuel)</p>
                  </div>

                  <ul className="space-y-3 mb-8">
                    <li className="flex items-center gap-3">
                      <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <span className="text-gray-700">2 interventions/mois</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <span className="text-gray-700">Jusqu'à 200m²</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <span className="text-gray-700">Support email</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <span className="text-gray-700">Facturation mensuelle</span>
                    </li>
                  </ul>

                  <Button
                    className="w-full bg-blue-500 hover:bg-blue-600"
                    size="lg"
                    onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
                  >
                    Demander un Devis
                  </Button>
                </CardContent>
              </Card>

              {/* Plan Business - HIGHLIGHTED */}
              <Card className="relative border-2 border-blue-500 shadow-lg hover:shadow-xl transition-all md:scale-105">
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-bold">
                    ⭐ PLUS POPULAIRE
                  </span>
                </div>
                <CardHeader className="pb-4">
                  <CardTitle className="text-2xl">BUSINESS</CardTitle>
                  <CardDescription>PME & Immeubles</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="mb-6">
                    <div className="text-3xl font-bold text-slate-900">À partir de</div>
                    <div className="text-4xl font-bold text-blue-600 mt-2">1 200€</div>
                    <p className="text-gray-600 text-sm mt-2">/mois (contrat annuel)</p>
                  </div>

                  <ul className="space-y-3 mb-8">
                    <li className="flex items-center gap-3">
                      <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <span className="text-gray-700">4 interventions/mois</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <span className="text-gray-700">Jusqu'à 500m²</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <span className="text-gray-700">Account manager</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <span className="text-gray-700">Support prioritaire</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <span className="text-gray-700">Rapports mensuels</span>
                    </li>
                  </ul>

                  <Button
                    className="w-full bg-blue-600 hover:bg-blue-700"
                    size="lg"
                    onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
                  >
                    Demander un Devis
                  </Button>
                </CardContent>
              </Card>

              {/* Plan Enterprise */}
              <Card className="border-2 border-gray-200 hover:border-blue-400 transition-all">
                <CardHeader className="pb-4">
                  <CardTitle className="text-2xl">ENTERPRISE</CardTitle>
                  <CardDescription>Grands comptes</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="mb-6">
                    <div className="text-3xl font-bold text-slate-900">À partir de</div>
                    <div className="text-4xl font-bold text-blue-600 mt-2">2 500€</div>
                    <p className="text-gray-600 text-sm mt-2">/mois (contrat annuel)</p>
                  </div>

                  <ul className="space-y-3 mb-8">
                    <li className="flex items-center gap-3">
                      <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <span className="text-gray-700">Interventions illimitées</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <span className="text-gray-700">Surfaces illimitées</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <span className="text-gray-700">Account manager dédié</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <span className="text-gray-700">Support 24/7</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <span className="text-gray-700">Audit qualité régulier</span>
                    </li>
                  </ul>

                  <Button
                    className="w-full bg-blue-500 hover:bg-blue-600"
                    size="lg"
                    onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
                  >
                    Demander un Devis
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Section Cas d'Usage */}
        <section className="py-20 bg-gray-50">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
                Cas d'Usage
              </h2>
              <p className="text-xl text-gray-600">Adaptés à votre secteur</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {[
                {
                  icon: "🏢",
                  title: "Immeubles & Copropriétés",
                  desc: "Nettoyage des parties communes, escaliers, ascenseurs, façades"
                },
                {
                  icon: "💼",
                  title: "Bureaux & Open Spaces",
                  desc: "Nettoyage quotidien, sanitaires, espaces de travail"
                },
                {
                  icon: "🏪",
                  title: "Commerces & Magasins",
                  desc: "Vitres, devantures, intérieurs, nettoyage après fermeture"
                },
                {
                  icon: "🏭",
                  title: "Usines & Entrepôts",
                  desc: "Nettoyage industriel, sols, zones de production"
                },
                {
                  icon: "🏠",
                  title: "Immobilier (Avant-Vente)",
                  desc: "Nettoyage complet avant visite, staging immobilier"
                },
                {
                  icon: "🏗️",
                  title: "Après Chantier",
                  desc: "Nettoyage de fin de chantier, évacuation débris"
                },
              ].map((useCase, i) => (
                <Card key={i} className="border-0 shadow-md hover:shadow-lg transition-all">
                  <CardContent className="p-8">
                    <div className="text-4xl mb-4">{useCase.icon}</div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">{useCase.title}</h3>
                    <p className="text-gray-600">{useCase.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Section Contact */}
        <section id="contact" className="py-20 bg-blue-50">
          <div className="container">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
                Prêt à Transformer Votre Nettoyage ?
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Demandez un devis gratuit. Notre équipe commerciale vous contactera dans 24h.
              </p>

              <div className="bg-white rounded-lg shadow-lg p-8">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Votre Entreprise</label>
                    <input 
                      type="text" 
                      placeholder="Nom de l'entreprise"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                    <input 
                      type="email" 
                      placeholder="contact@entreprise.fr"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Téléphone</label>
                    <input 
                      type="tel" 
                      placeholder="06 12 34 56 78"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Votre Besoin</label>
                    <textarea 
                      placeholder="Décrivez votre besoin en nettoyage..."
                      rows={4}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    ></textarea>
                  </div>
                  <Button
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white text-lg py-6"
                    size="lg"
                  >
                    Demander un Devis Gratuit <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </div>
              </div>

              <div className="mt-8 flex flex-col sm:flex-row gap-6 justify-center text-center">
                <div>
                  <p className="font-bold text-slate-900">📞 Appel Direct</p>
                  <p className="text-blue-600">06 17 21 22 30</p>
                </div>
                <div>
                  <p className="font-bold text-slate-900">📧 Email</p>
                  <p className="text-blue-600">contact@procleanempire.com</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
