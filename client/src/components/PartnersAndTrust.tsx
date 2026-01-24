import { Star } from "lucide-react";

export default function PartnersAndTrust() {
  const partners = [
    { name: "Kärcher", logo: "🏢", desc: "Équipement haute pression" },
    { name: "Koch Chemie", logo: "🧪", desc: "Produits professionnels" },
    { name: "Meguiar's", logo: "✨", desc: "Produits auto premium" },
    { name: "Ecos", logo: "🌿", desc: "Produits écologiques" },
  ];

  const reviews = [
    {
      name: "Alexandre M.",
      rating: 5,
      text: "Service exceptionnel ! Ma voiture sort de l'usine. Équipe très professionnelle.",
      date: "Janvier 2026",
    },
    {
      name: "Sophie D.",
      rating: 5,
      text: "Mon canapé taché est comme neuf ! Travail remarquable et rapide.",
      date: "Janvier 2026",
    },
    {
      name: "Thomas L.",
      rating: 5,
      text: "ProClean intervient régulièrement pour notre immeuble. Toujours impeccable !",
      date: "Décembre 2025",
    },
    {
      name: "Marie P.",
      rating: 5,
      text: "Devis gratuit reçu en 30 min. Intervention rapide et résultat parfait.",
      date: "Décembre 2025",
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container max-w-6xl">
        {/* Partners Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4 text-center">
            Nos Partenaires & Produits
          </h2>
          <p className="text-center text-gray-600 mb-12">
            Nous utilisons uniquement les meilleures marques professionnelles pour garantir vos résultats
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {partners.map((partner) => (
              <div
                key={partner.name}
                className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-lg border border-blue-200 text-center hover:shadow-lg transition"
              >
                <div className="text-4xl mb-3">{partner.logo}</div>
                <h3 className="font-bold text-gray-900 mb-1">{partner.name}</h3>
                <p className="text-sm text-gray-600">{partner.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Google Reviews Section */}
        <div className="border-t pt-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={20} className="fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <span className="text-2xl font-bold text-gray-900">4.9/5</span>
            <span className="text-gray-600">(127 avis)</span>
          </div>

          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
            Avis de Nos Clients
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {reviews.map((review, idx) => (
              <div
                key={idx}
                className="bg-gray-50 p-6 rounded-lg border border-gray-200 hover:shadow-lg transition"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
                    {review.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">{review.name}</h4>
                    <p className="text-xs text-gray-600">{review.date}</p>
                  </div>
                </div>

                <div className="flex gap-1 mb-3">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className="fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>

                <p className="text-gray-700 text-sm italic">"{review.text}"</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <a
              href="https://www.google.com/maps/place/ProClean+Empire"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg transition"
            >
              Voir tous les avis sur Google
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
