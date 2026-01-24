import { useState } from "react";
import { ArrowRight, Building2, CheckCircle2, Clock3, Shield, Zap } from "lucide-react";
import { toast } from "sonner";

export default function Professionnels() {
  const [formData, setFormData] = useState({
    company: "",
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
      {/* Hero Section */}
      <section className="relative min-h-[400px] flex items-center justify-center bg-gradient-to-br from-blue-900 to-blue-800 py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Solutions Professionnelles
          </h1>
          <p className="text-2xl text-blue-100 max-w-2xl mx-auto">
            Nettoyage multiservice pour les entreprises, immeubles et gestionnaires de propriétés
          </p>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 md:py-32 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Pourquoi Nous Choisir pour Vos Projets Professionnels
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
      <section className="py-20 md:py-32 bg-white">
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
                    <option value="immeuble">Immeuble résidentiel</option>
                    <option value="commercial">Espace commercial</option>
                    <option value="industriel">Site industriel</option>
                    <option value="parking">Parking/Allées</option>
                    <option value="facade">Façade/Toiture</option>
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
            <ArrowRight className="ml-2 w-5 h-5" />
          </a>
        </div>
      </section>
    </div>
  );
}
