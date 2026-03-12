import { Star } from 'lucide-react';

export function TrustpilotWidget() {
  return (
    <section className="py-16 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <div className="container">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex justify-center mb-4">
              <Star className="w-12 h-12 text-yellow-400 fill-yellow-400" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-900 dark:text-white">
              Nos Clients Nous Font Confiance
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-300">
              Découvrez les avis vérifiés de nos clients satisfaits
            </p>
          </div>

          {/* Trustpilot Link Card */}
          <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg p-8 text-center">
            <div className="mb-6">
              <div className="flex justify-center gap-1 mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-6 h-6 text-yellow-400 fill-yellow-400" />
                ))}
              </div>
              <p className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
                5.0 / 5.0
              </p>
              <p className="text-slate-600 dark:text-slate-300 mb-4">
                Basé sur 100+ avis clients vérifiés
              </p>
            </div>

            <a
              href="https://fr.trustpilot.com/review/procleanempire.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors"
            >
              Lire tous les avis sur Trustpilot
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
