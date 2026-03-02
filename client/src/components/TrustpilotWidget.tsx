import { useEffect } from 'react';

export function TrustpilotWidget() {
  useEffect(() => {
    // Charger le script Trustpilot
    const script = document.createElement('script');
    script.src = 'https://widget.trustpilot.com/bootstrap/v5/tp.widget.bootstrap.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      // Nettoyer si nécessaire
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, []);

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

          {/* Trustpilot Widget */}
          <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg p-8">
            <div
              className="trustpilot-widget"
              data-locale="fr-FR"
              data-template-id="56278e9abfbbba0bdcd568bc"
              data-businessunit-id="6717e0e3c6e3b80001f1b5a9"
              data-style-height="130px"
              data-style-width="100%"
            >
              <a href="https://fr.trustpilot.com/review/procleanempire.com" target="_blank" rel="noopener noreferrer">
                Trustpilot
              </a>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-8 text-center">
            <a
              href="https://fr.trustpilot.com/review/procleanempire.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
            >
              Lire tous les avis
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
