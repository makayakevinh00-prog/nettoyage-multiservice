import { useState } from "react";
import { ArrowRight, Building2, CheckCircle2, Clock3, Shield, Zap, ArrowLeft, Phone, Mail, MapPin } from "lucide-react";
import { toast } from "sonner";
import { useLocation } from "wouter";
import { APP_LOGO } from "@/const";

export default function Professionnels() {
  const [, setLocation] = useLocation();
  const [formData, setFormData] = useState({
    company: "",
    siren: "",
    name: "",
    email: "",
    phone: "",
    projectType: "",
    surface: "",
    budget: "",
    deadline: "",
    description: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Professional request:", formData);
    toast.success("Votre demande a été envoyée ! Nous vous contacterons sous 24h.");
    setFormData({
      company: "",
      siren: "",
      name: "",
      email: "",
      phone: "",
      projectType: "",
      surface: "",
      budget: "",
      deadline: "",
      description: "",
    });
  };

  const benefits = [
    {
      icon: Building2,
      title: "Projets Complexes",
      description: "Gestion de projets d'envergure avec équipes dédiées",
    },
    {
      icon: Shield,
      title: "Assurance Complète",
      description: "Couverture d'assurance professionnelle et responsabilité civile",
    },
    {
      icon: Clock3,
      title: "Planification Flexible",
      description: "Calendriers adaptés à vos besoins et contraintes",
    },
    {
      icon: Zap,
      title: "Équipements Premium",
      description: "Matériel professionnel de dernière génération",
    },
    {
      icon: CheckCircle2,
      title: "Suivi Régulier",
      description: "Rapports détaillés et suivi de vos interventions",
    },
    {
      icon: ArrowRight,
      title: "Tarifs Compétitifs",
      description: "Devis personnalisés adaptés à votre budget",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header with Logo and Back Button */}
      <div className="sticky top-0 z-40 bg-white border-b border-gray-200">
        <div className="container flex items-center justify-between py-4">
          <button
            onClick={() => setLocation("/")}
            className="flex items-center gap-2 text-blue-600 hover:text-blue-700 transition"
          >
            <ArrowLeft size={20} />
            Retour
          </button>
          <img src={APP_LOGO} alt="ProClean Empire" className="h-8" />
          <div className="w-20" />
        </div>
      </div>

      {/* Hero Section with Company Info */}
      <section className="bg-gradient-to-br from-slate-900 to-slate-800 text-white py-20">
        <div className="container mx-auto px-4">
          <h1 className="text-5xl font-bold mb-4">Informations Professionnelles</h1>
          <p className="text-xl text-gray-300">ProClean Empire - Nettoyage Professionnel en Île-de-France</p>
        </div>
      </section>

      {/* Company Info Cards */}
      <section className="container mx-auto px-4 py-20">
        <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
          {/* Company Info */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Building2 className="text-blue-600" />
              Informations Légales
            </h2>
            
            <div className="space-y-4">
              <div>
                <label className="text-sm font-semibold text-gray-600">SIREN</label>
                <p className="text-lg text-gray-900 font-mono">123 456 789</p>
              </div>
              
              <div>
                <label className="text-sm font-semibold text-gray-600">Raison Sociale</label>
                <p className="text-lg text-gray-900 font-semibold">ProClean Empire SARL</p>
              </div>
              
              <div>
                <label className="text-sm font-semibold text-gray-600">SIRET</label>
                <p className="text-lg text-gray-900 font-mono">123 456 789 00012</p>
              </div>
            </div>
          </div>

          {/* Contact Info */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Phone className="text-blue-600" />
              Coordonnées
            </h2>
            
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                <div>
                  <label className="text-sm font-semibold text-gray-600">Téléphone</label>
                  <p className="text-lg text-gray-900">06 17 21 22 30</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                <div>
                  <label className="text-sm font-semibold text-gray-600">Email</label>
                  <p className="text-lg text-gray-900">serviceclient@procleanempire.com</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                <div>
                  <label className="text-sm font-semibold text-gray-600">Adresse</label>
                  <p className="text-lg text-gray-900">Île-de-France</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <section className="border-t border-gray-200 py-12">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-900">Demande de Devis Professionnel</h2>
          <p className="text-gray-600 mt-2">Remplissez le formulaire ci-dessous pour recevoir un devis personnalisé</p>
        </div>
      </section>

      {/* Hero Section */}
      <section className="relative min-h-[400px] flex items-center justify-center bg-cover bg-center py-20" style={{backgroundImage: "url('/hero-proclean.png')"}}>
        <div className="absolute inset-0 bg-black/40" />
        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Formulaire de Devis
          </h1>
          <p className="text-2xl text-blue-100 max-w-2xl mx-auto">
            ProClean Empire - Nettoyage Professionnel en Île-de-France
          </p>
        </div>
      </section>

      {/* Legal Information Section */}
      <section className="py-20 md:py-32 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
            {/* Legal Info */}
            <div className="bg-white rounded-lg p-8 shadow-md border border-gray-200">
              <div className="flex items-center gap-3 mb-6">
                <Building2 className="w-8 h-8 text-blue-600" />
                <h2 className="text-2xl font-bold text-gray-900">Informations Légales</h2>
              </div>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-600 font-semibold">SIREN</p>
                  <p className="text-lg text-gray-900 font-mono">123 456 789</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 font-semibold">Raison Sociale</p>
                  <p className="text-lg text-gray-900 font-bold">ProClean Empire SARL</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 font-semibold">SIRET</p>
                  <p className="text-lg text-gray-900 font-mono">123 456 789 00012</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 font-semibold">Forme Juridique</p>
                  <p className="text-lg text-gray-900">SARL</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 font-semibold">Capital Social</p>
                  <p className="text-lg text-gray-900">50 000 €</p>
                </div>
              </div>
            </div>

            {/* Contact Info */}
            <div className="bg-white rounded-lg p-8 shadow-md border border-gray-200">
              <div className="flex items-center gap-3 mb-6">
                <Shield className="w-8 h-8 text-blue-600" />
                <h2 className="text-2xl font-bold text-gray-900">Coordonnées</h2>
              </div>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-600 font-semibold">Téléphone</p>
                  <p className="text-lg text-gray-900">01 XX XX XX XX</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 font-semibold">Email</p>
                  <p className="text-lg text-gray-900">contact@procleanempire.fr</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 font-semibold">Adresse</p>
                  <p className="text-lg text-gray-900">Île-de-France</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 font-semibold">Zone d'Intervention</p>
                  <p className="text-lg text-gray-900">Île-de-France (75-95)</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Certifications Section */}
      <section className="py-20 md:py-32 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Certifications & Conformités
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="bg-white rounded-lg p-6 shadow-md">
              <CheckCircle2 className="w-10 h-10 text-green-600 mb-3" />
              <h3 className="text-lg font-bold text-gray-900 mb-2">Assurance Responsabilité Civile</h3>
              <p className="text-gray-600 text-sm">Couverture complète pour tous les sinistres</p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-md">
              <CheckCircle2 className="w-10 h-10 text-green-600 mb-3" />
              <h3 className="text-lg font-bold text-gray-900 mb-2">Normes Environnementales</h3>
              <p className="text-gray-600 text-sm">Produits écologiques certifiés</p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-md">
              <CheckCircle2 className="w-10 h-10 text-green-600 mb-3" />
              <h3 className="text-lg font-bold text-gray-900 mb-2">Conformité RGPD</h3>
              <p className="text-gray-600 text-sm">Protection des données clients</p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-md">
              <CheckCircle2 className="w-10 h-10 text-green-600 mb-3" />
              <h3 className="text-lg font-bold text-gray-900 mb-2">Équipe Formée</h3>
              <p className="text-gray-600 text-sm">Techniciens certifiés et expérimentés</p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-md">
              <CheckCircle2 className="w-10 h-10 text-green-600 mb-3" />
              <h3 className="text-lg font-bold text-gray-900 mb-2">Équipements Professionnels</h3>
              <p className="text-gray-600 text-sm">Matériel certifié et entretenu</p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-md">
              <CheckCircle2 className="w-10 h-10 text-green-600 mb-3" />
              <h3 className="text-lg font-bold text-gray-900 mb-2">Garantie Satisfaction</h3>
              <p className="text-gray-600 text-sm">100% satisfait ou remboursé</p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 md:py-32 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Avantages Professionnels
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, i) => {
              const Icon = benefit.icon;
              return (
                <div key={i} className="bg-white rounded-lg p-8 shadow-md hover:shadow-lg transition-shadow">
                  <Icon className="w-12 h-12 text-blue-600 mb-4" />
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{benefit.title}</h3>
                  <p className="text-gray-600">{benefit.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-20 md:py-32 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Demander un Devis Professionnel
              </h2>
              <p className="text-xl text-gray-600">
                Remplissez le formulaire ci-dessous pour une demande de devis personnalisée
              </p>
            </div>

            <form onSubmit={handleSubmit} className="bg-gray-50 rounded-lg p-8 shadow-md">
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Nom de l'Entreprise *
                  </label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Votre entreprise"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    SIREN *
                  </label>
                  <input
                    type="text"
                    name="siren"
                    value={formData.siren}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="123 456 789"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-1 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Nom de Contact *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Votre nom"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="votre@email.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Téléphone *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="06 XX XX XX XX"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Type de Projet *
                  </label>
                  <select
                    name="projectType"
                    value={formData.projectType}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Sélectionnez un type</option>
                    <option value="bureaux">Nettoyage de Bureaux</option>
                    <option value="immeuble">Immeuble résidentiel</option>
                    <option value="commercial">Espace commercial</option>
                    <option value="industriel">Site industriel</option>
                    <option value="parking">Parking/Allées</option>
                    <option value="facade">Façade/Toiture</option>
                    <option value="vitres">Nettoyage de Vitres</option>
                    <option value="moquette">Nettoyage de Moquette</option>
                    <option value="sol">Nettoyage de Sol</option>
                    <option value="autre">Autre</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Surface (m²)
                  </label>
                  <input
                    type="number"
                    name="surface"
                    value={formData.surface}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="ex: 5000"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Budget Estimé (€)
                  </label>
                  <input
                    type="number"
                    name="budget"
                    value={formData.budget}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="ex: 10000"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Délai Souhaité
                  </label>
                  <select
                    name="deadline"
                    value={formData.deadline}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Sélectionnez un délai</option>
                    <option value="urgent">Urgent (1-2 semaines)</option>
                    <option value="court">Court terme (1 mois)</option>
                    <option value="moyen">Moyen terme (2-3 mois)</option>
                    <option value="long">Long terme (3+ mois)</option>
                  </select>
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Description du Projet
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={6}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Décrivez votre projet en détail..."
                />
              </div>

              <button
                type="submit"
                className="w-full px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105"
              >
                Envoyer la Demande de Devis
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-blue-600 to-blue-800">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Questions ? Parlons de votre projet
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Notre équipe est disponible pour discuter de vos besoins spécifiques
          </p>
          <a href="tel:+33612345678" className="inline-flex items-center justify-center px-8 py-4 bg-white hover:bg-gray-100 text-blue-600 font-semibold rounded-lg transition-all duration-300 transform hover:scale-105">
            Nous Appeler
          </a>
        </div>
      </section>
    </div>
  );
}
