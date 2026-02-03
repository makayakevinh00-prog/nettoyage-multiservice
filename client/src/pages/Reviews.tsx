import { Star, MapPin, Calendar } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumb from "@/components/Breadcrumb";

export default function Reviews() {
  const reviews = [
    {
      id: 1,
      name: "Alexandre M.",
      location: "Paris 16e",
      date: "Janvier 2025",
      rating: 5,
      title: "Service exceptionnel !",
      content: "Nettoyage de ma voiture impeccable. L'équipe est professionnelle et rapide. Je recommande vivement ProClean Empire !",
      service: "Nettoyage Automobile",
    },
    {
      id: 2,
      name: "Sophie D.",
      location: "Boulogne-Billancourt",
      date: "Décembre 2024",
      rating: 5,
      title: "Très satisfaite du résultat",
      content: "Ma terrasse a été complètement transformée. Le démoussage était nécessaire et c'est parfait maintenant. Merci !",
      service: "Nettoyage Terrasse",
    },
    {
      id: 3,
      name: "Thomas L.",
      location: "Neuilly-sur-Seine",
      date: "Novembre 2024",
      rating: 5,
      title: "Professionnel et fiable",
      content: "Intervention régulière pour notre immeuble. Toujours à l'heure, efficace et soigné. Équipe très courtoise.",
      service: "Services Professionnels",
    },
    {
      id: 4,
      name: "Marie C.",
      location: "Versailles",
      date: "Octobre 2024",
      rating: 5,
      title: "Nettoyage de tapis parfait",
      content: "Mes tapis sont comme neufs ! Ils ont utilisé une technique d'injection-extraction très efficace. Vraiment impressionné.",
      service: "Nettoyage Tapis",
    },
    {
      id: 5,
      name: "Jean P.",
      location: "Levallois-Perret",
      date: "Septembre 2024",
      rating: 5,
      title: "Balcon impeccable",
      content: "Nettoyage complet du balcon avec traitement des joints. Résultat magnifique. Je les rappelle pour la façade.",
      service: "Nettoyage Balcon",
    },
    {
      id: 6,
      name: "Isabelle R.",
      location: "Paris 8e",
      date: "Août 2024",
      rating: 5,
      title: "Équipe très réactive",
      content: "Devis rapide, intervention dans les délais. Travail de qualité et prix honnête. À recommander sans hésiter.",
      service: "Nettoyage Automobile",
    },
    {
      id: 7,
      name: "Michel B.",
      location: "Bois-Colombes",
      date: "Juillet 2024",
      rating: 5,
      title: "Façade comme neuve",
      content: "Nettoyage haute pression de la façade. Résultat spectaculaire. L'équipe a aussi nettoyé les gouttières.",
      service: "Nettoyage Façade",
    },
    {
      id: 8,
      name: "Valérie M.",
      location: "Paris 15e",
      date: "Juin 2024",
      rating: 5,
      title: "Service client excellent",
      content: "Très à l'écoute de mes besoins. Ils ont proposé des solutions adaptées à mon budget. Très professionnel.",
      service: "Services Professionnels",
    },
    {
      id: 9,
      name: "Philippe G.",
      location: "Suresnes",
      date: "Mai 2024",
      rating: 5,
      title: "Jardinage impeccable",
      content: "Entretien paysager complet. Taille, débroussaillage, nettoyage. Tout est parfait. Équipe très compétente.",
      service: "Jardinage",
    },
    {
      id: 10,
      name: "Nathalie T.",
      location: "Paris 12e",
      date: "Avril 2024",
      rating: 5,
      title: "Panneaux solaires brillants",
      content: "Nettoyage des panneaux solaires très professionnel. Rendement amélioré selon mon installateur. Parfait !",
      service: "Nettoyage Panneaux Solaires",
    },
    {
      id: 11,
      name: "Christophe L.",
      location: "Rueil-Malmaison",
      date: "Mars 2024",
      rating: 5,
      title: "Équipe ponctuelle",
      content: "Arrivés à l'heure pile, travail rapide et efficace. Nettoyage complet de la maison. Très satisfait.",
      service: "Services Professionnels",
    },
    {
      id: 12,
      name: "Sandrine V.",
      location: "Paris 6e",
      date: "Février 2024",
      rating: 5,
      title: "Canapé comme neuf",
      content: "Nettoyage de mon canapé en tissu. Tous les détachages ont disparu. Technique très efficace. Merci !",
      service: "Nettoyage Tapis",
    },
    {
      id: 13,
      name: "Bernard D.",
      location: "Antony",
      date: "Janvier 2024",
      rating: 5,
      title: "Intervention d'urgence réussie",
      content: "Tache importante sur mon tapis. Ils ont pu intervenir rapidement. Résultat impeccable. Très réactif.",
      service: "Nettoyage Tapis",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-gray-900">
      <Header />
      
      <main className="flex-1">
        {/* Breadcrumb */}
        <div className="bg-gray-50 dark:bg-gray-800 py-4">
          <div className="container mx-auto px-4">
            <Breadcrumb />
          </div>
        </div>

        {/* Hero Section */}
        <section className="py-12 md:py-20 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-gray-800 dark:to-gray-700">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Avis de Nos Clients
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-6">
              Découvrez ce que nos clients pensent de nos services
            </p>
            <div className="flex justify-center items-center gap-2">
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={24} className="fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <span className="text-2xl font-bold text-gray-900 dark:text-white">5.0/5.0</span>
              <span className="text-lg text-gray-600 dark:text-gray-300">({reviews.length} avis)</span>
            </div>
          </div>
        </section>

        {/* Reviews Grid */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {reviews.map((review) => (
                <div
                  key={review.id}
                  className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow p-6 border border-gray-200 dark:border-gray-700"
                >
                  {/* Rating */}
                  <div className="flex gap-1 mb-3">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} size={18} className="fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    {review.title}
                  </h3>

                  {/* Content */}
                  <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                    {review.content}
                  </p>

                  {/* Service Badge */}
                  <div className="mb-4">
                    <span className="inline-block bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs font-semibold px-3 py-1 rounded-full">
                      {review.service}
                    </span>
                  </div>

                  {/* Author Info */}
                  <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                    <p className="font-semibold text-gray-900 dark:text-white">
                      {review.name}
                    </p>
                    <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mt-2">
                      <div className="flex items-center gap-1">
                        <MapPin size={14} />
                        {review.location}
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar size={14} />
                        {review.date}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-24 bg-gradient-to-br from-blue-600 to-blue-700 dark:from-blue-900 dark:to-blue-800">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Rejoignez Nos Clients Satisfaits
            </h2>
            <p className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto">
              Réservez dès maintenant et découvrez pourquoi nos clients nous font confiance
            </p>
            <a
              href="/#booking"
              className="inline-block bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
            >
              Réserver Maintenant
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
