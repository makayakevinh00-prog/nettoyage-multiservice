import { Star, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Review {
  author: string;
  rating: number;
  date: string;
  content: string;
}

const TRUSTPILOT_REVIEWS: Review[] = [
  {
    author: "Queen K",
    rating: 5,
    date: "12 février 2026",
    content: "Travail de qualité et professionnel. Je recommande",
  },
  {
    author: "Christina",
    rating: 5,
    date: "4 février 2026",
    content: "Je recommande vivement cette société pour ses services de nettoyage professionnel, qui se déplace même jusqu'en Belgique.",
  },
  {
    author: "Rick Oyombi",
    rating: 5,
    date: "30 janvier 2026",
    content: "Service de qualité, je recommande fortement l'équipe est professionnel et très aimable, je vous remercie pour votre sérieux et je reviendrais",
  },
];

const TRUSTPILOT_URL = "https://fr.trustpilot.com/review/procleanempire.com";
const OVERALL_RATING = 4.1;
const TOTAL_REVIEWS = 5;

export function TrustpilotReviews() {
  return (
    <section className="py-16 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <div className="container">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-900 dark:text-white">
              Ce que nos clients disent
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-300">
              Découvrez les avis vérifiés de nos clients satisfaits
            </p>
          </div>

          {/* Overall Rating Card */}
          <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg p-8 mb-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              {/* Rating Summary */}
              <div className="flex flex-col items-center md:items-start gap-4">
                <div className="flex items-baseline gap-3">
                  <span className="text-5xl font-bold text-blue-600">{OVERALL_RATING}</span>
                  <span className="text-2xl text-slate-500">/5</span>
                </div>
                
                {/* Stars */}
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={24}
                      className={i < Math.floor(OVERALL_RATING) ? "fill-yellow-400 text-yellow-400" : "text-slate-300"}
                    />
                  ))}
                </div>

                {/* Review Count */}
                <p className="text-slate-600 dark:text-slate-300 font-medium">
                  {TOTAL_REVIEWS} avis vérifiés
                </p>
              </div>

              {/* CTA Button */}
              <div className="flex flex-col gap-3 w-full md:w-auto">
                <a href={TRUSTPILOT_URL} target="_blank" rel="noopener noreferrer">
                  <Button className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white gap-2">
                    Lire tous les avis
                    <ExternalLink size={18} />
                  </Button>
                </a>
                <a href={`${TRUSTPILOT_URL}#write-review`} target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" className="w-full md:w-auto gap-2">
                    Laisser un avis
                    <ExternalLink size={18} />
                  </Button>
                </a>
              </div>
            </div>
          </div>

          {/* Reviews Grid */}
          <div className="grid md:grid-cols-3 gap-6">
            {TRUSTPILOT_REVIEWS.map((review, index) => (
              <div
                key={index}
                className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
              >
                {/* Stars */}
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={18}
                      className={i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-slate-300"}
                    />
                  ))}
                </div>

                {/* Review Content */}
                <p className="text-slate-700 dark:text-slate-300 mb-4 line-clamp-3">
                  "{review.content}"
                </p>

                {/* Author Info */}
                <div className="border-t border-slate-200 dark:border-slate-700 pt-4">
                  <p className="font-semibold text-slate-900 dark:text-white">
                    {review.author}
                  </p>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    {review.date}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Trustpilot Badge */}
          <div className="mt-12 text-center">
            <a href={TRUSTPILOT_URL} target="_blank" rel="noopener noreferrer" className="inline-block">
              <div className="flex items-center gap-2 bg-white dark:bg-slate-800 px-6 py-3 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  Vérifiés sur
                </span>
                <span className="font-bold text-slate-900 dark:text-white">Trustpilot</span>
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
