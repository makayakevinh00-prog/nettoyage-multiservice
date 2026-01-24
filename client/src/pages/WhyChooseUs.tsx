import { CheckCircle2, Award, Users, Zap, Shield, Leaf, Clock, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Benefit {
  icon: React.ReactNode;
  title: string;
  description: string;
  details: string[];
}

const benefits: Benefit[] = [
  {
    icon: <Award size={32} className="text-orange-500" />,
    title: "5 ans d'Expertise",
    description: "Une équipe formée et expérimentée",
    details: [
      "Techniques professionnelles éprouvées",
      "Certifications en nettoyage haute pression",
      "Formations continues de l'équipe",
      "Garantie de satisfaction 100%"
    ]
  },
  {
    icon: <Zap size={32} className="text-blue-500" />,
    title: "Équipements Pro",
    description: "Matériel de dernière génération",
    details: [
      "Nettoyeurs haute pression professionnels",
      "Produits de marque reconnue",
      "Techniques d'injection-extraction",
      "Équipement de sécurité complet"
    ]
  },
  {
    icon: <Clock size={32} className="text-green-500" />,
    title: "Intervention Rapide",
    description: "Disponibilité 7j/7",
    details: [
      "Devis sous 30 minutes",
      "Interventions en 24-48h",
      "Créneaux flexibles",
      "Urgences traitées en priorité"
    ]
  },
  {
    icon: <MapPin size={32} className="text-red-500" />,
    title: "Couverture Complète",
    description: "Toute l'Île-de-France",
    details: [
      "Paris et petite couronne",
      "Grande couronne",
      "Aucun frais de déplacement",
      "Zones rurales incluses"
    ]
  },
  {
    icon: <Leaf size={32} className="text-emerald-500" />,
    title: "Éco-Responsable",
    description: "Respect de l'environnement",
    details: [
      "Produits écologiques",
      "Gestion responsable de l'eau",
      "Réduction des déchets",
      "Engagement durable"
    ]
  },
  {
    icon: <Shield size={32} className="text-indigo-500" />,
    title: "Sécurité Garantie",
    description: "Assurance et protection",
    details: [
      "Assurance responsabilité civile",
      "Garantie des biens",
      "Protocoles de sécurité stricts",
      "Confidentialité garantie"
    ]
  },
  {
    icon: <Users size={32} className="text-purple-500" />,
    title: "Service Client",
    description: "Disponible et réactif",
    details: [
      "Support par téléphone",
      "Réponse par WhatsApp",
      "Chat en direct 24/7",
      "Suivi personnalisé"
    ]
  },
  {
    icon: <CheckCircle2 size={32} className="text-cyan-500" />,
    title: "Garantie Satisfaction",
    description: "Ou argent remboursé",
    details: [
      "Résultat garanti",
      "Retouches gratuites",
      "Remboursement si insatisfait",
      "Engagement de qualité"
    ]
  }
];

const testimonials = [
  {
    name: "Alexandre M.",
    role: "Particulier",
    text: "Service exceptionnel pour le nettoyage de ma voiture. Résultat impeccable, on dirait qu'elle sort de l'usine !",
    rating: 5
  },
  {
    name: "Sophie D.",
    role: "Propriétaire",
    text: "J'ai fait nettoyer ma terrasse et mes tapis. Le travail est remarquable, très professionnel. Je recommande vivement.",
    rating: 5
  },
  {
    name: "Thomas L.",
    role: "Copropriété",
    text: "ProClean Empire intervient régulièrement pour notre immeuble. Toujours à l'heure, efficace et soigné.",
    rating: 5
  }
];

const stats = [
  { number: "500+", label: "Clients satisfaits" },
  { number: "1000+", label: "Interventions réalisées" },
  { number: "4.9/5", label: "Note moyenne" },
  { number: "7j/7", label: "Disponibilité" }
];

export default function WhyChooseUs() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Pourquoi Choisir ProClean Empire ?</h1>
          <p className="text-xl text-blue-100">
            Votre partenaire de confiance pour un nettoyage professionnel en Île-de-France
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-4xl font-bold text-blue-600 mb-2">{stat.number}</div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Grid */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-gray-900">
            Nos Avantages Clés
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, i) => (
              <div
                key={i}
                className="bg-white rounded-lg p-6 shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-105 border border-gray-100"
              >
                <div className="mb-4">{benefit.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{benefit.title}</h3>
                <p className="text-gray-600 text-sm mb-4">{benefit.description}</p>
                <ul className="space-y-2">
                  {benefit.details.map((detail, j) => (
                    <li key={j} className="flex items-start gap-2 text-sm text-gray-700">
                      <CheckCircle2 size={16} className="text-green-500 flex-shrink-0 mt-0.5" />
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-gray-900">
            Ce Que Disent Nos Clients
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, i) => (
              <div key={i} className="bg-white rounded-lg p-8 shadow-md hover:shadow-lg transition-all">
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, j) => (
                    <span key={j} className="text-yellow-400 text-xl">★</span>
                  ))}
                </div>
                <p className="text-gray-700 mb-6 italic">"{testimonial.text}"</p>
                <div>
                  <p className="font-bold text-gray-900">{testimonial.name}</p>
                  <p className="text-sm text-gray-600">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Prêt à Découvrir la Différence ProClean Empire ?
          </h2>
          <p className="text-xl text-orange-100 mb-10">
            Contactez-nous dès aujourd'hui pour un devis gratuit et sans engagement
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:0617212230"
              className="inline-flex items-center justify-center px-10 py-4 bg-white text-orange-600 font-bold rounded-lg hover:bg-gray-100 transition-colors text-lg"
            >
              📞 Appeler maintenant
            </a>
            <a
              href="#booking"
              className="inline-flex items-center justify-center px-10 py-4 bg-orange-700 hover:bg-orange-800 text-white font-bold rounded-lg transition-colors text-lg"
            >
              💬 Demander un devis
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
