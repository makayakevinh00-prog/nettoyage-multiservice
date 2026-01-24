import { useState } from "react";
import { ArrowLeft, Building2, CheckCircle2, Clock3, Shield, Zap, ArrowRight } from "lucide-react";
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

      {/* Hero Section */}
      <section className="relative min-h-[400px] flex items-center justify-center bg-cover bg-center py-20" style={{backgroundImage: "url('/hero-nettoyage-pro.jpg')"}}>
        <div className="absolute inset-0 bg-black/40" />
        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Demande de Devis Professionnel
          </h1>
          <p className="text-2xl text-blue-100 max-w-2xl mx-auto">
            Remplissez le formulaire pour recevoir un devis personnalisé selon vos besoins
          </p>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16 text-gray-900">Nos Avantages Professionnels</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <div key={index} className="bg-white rounded-lg p-8 shadow-md hover:shadow-lg transition">
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
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg p-8 border border-gray-200">
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Vos Informations</h2>

              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Raison Sociale *</label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                    placeholder="Votre entreprise"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">SIREN *</label>
                  <input
                    type="text"
                    name="siren"
                    value={formData.siren}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                    placeholder="123 456 789"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Nom Complet *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                    placeholder="Votre nom"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Email *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                    placeholder="votre@email.com"
                  />
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Téléphone *</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  placeholder="06 XX XX XX XX"
                />
              </div>

              <h2 className="text-3xl font-bold text-gray-900 mb-8 mt-12">Votre Projet</h2>

              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Type de Nettoyage *</label>
                <select
                  name="projectType"
                  value={formData.projectType}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                >
                  <option value="">Sélectionner un type</option>
                  <option value="bureaux">Nettoyage de Bureaux</option>
                  <option value="commerces">Nettoyage de Commerces</option>
                  <option value="industrie">Nettoyage Industriel</option>
                  <option value="batiment">Nettoyage de Bâtiment</option>
                  <option value="vitres">Nettoyage de Vitres</option>
                  <option value="sol">Nettoyage de Sol</option>
                  <option value="autre">Autre</option>
                </select>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Surface (m²)</label>
                  <input
                    type="number"
                    name="surface"
                    value={formData.surface}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                    placeholder="Superficie"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Budget Estimé</label>
                  <input
                    type="text"
                    name="budget"
                    value={formData.budget}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                    placeholder="Ex: 5000€ - 10000€"
                  />
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Date Souhaitée</label>
                <input
                  type="date"
                  name="deadline"
                  value={formData.deadline}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <div className="mb-8">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Description du Projet *</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  placeholder="Décrivez votre projet en détail..."
                />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition duration-200"
              >
                Envoyer ma Demande de Devis
              </button>

              <p className="text-xs text-gray-500 text-center mt-4">
                * Champs obligatoires. Nous vous contacterons dans les 24 heures.
              </p>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
