import { useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function LegalNotice() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const currentYear = new Date().getFullYear();
  const lastUpdate = new Date().toLocaleDateString('fr-FR');

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      
      <main className="flex-1 container py-16 px-4 md:px-6 max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-12 text-slate-900">Mentions Légales</h1>

        {/* Section 1: Éditeur */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-slate-800">1. ÉDITEUR DU SITE</h2>
          <div className="bg-slate-50 p-6 rounded-lg space-y-3">
            <p><strong>Raison sociale :</strong> MAKAYA MATEVE KEVINH</p>
            <p><strong>Nom commercial :</strong> Pro Clean Empire</p>
            <p><strong>Forme juridique :</strong> Entrepreneur Individuel (EI) - Micro-entreprise</p>
            <p><strong>Siège social :</strong> 3 RUE STEPHANE CHARBONNIER, 95300 PONTOISE</p>
            <p><strong>SIREN :</strong> 891 283 954</p>
            <p><strong>SIRET :</strong> 891 283 954 00024</p>
            <p><strong>N° TVA intracommunautaire :</strong> FR23891283954</p>
            <p><strong>RCS :</strong> PONTOISE</p>
            <p><strong>Responsable de publication :</strong> Kevinh MAKAYA MATEVE</p>
            
            <div className="border-t border-slate-200 pt-4 mt-4">
              <p className="font-semibold text-slate-900 mb-2">Contact :</p>
              <p><strong>Email :</strong> <a href="mailto:serviceclient@procleanempire.com" className="text-blue-600 hover:underline">serviceclient@procleanempire.com</a></p>
              <p><strong>Téléphone :</strong> <a href="tel:+33617212230" className="text-blue-600 hover:underline">06 17 21 22 30</a></p>
            </div>

            <div className="border-t border-slate-200 pt-4 mt-4">
              <p className="font-semibold text-slate-900 mb-2">Assurance Responsabilité Civile Professionnelle :</p>
              <p><strong>Assureur :</strong> À compléter</p>
              <p><strong>Numéro de police :</strong> À compléter</p>
            </div>
          </div>
        </section>

        {/* Section 2: Hébergeur */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-slate-800">2. HÉBERGEUR DU SITE</h2>
          <div className="bg-slate-50 p-6 rounded-lg space-y-3">
            <p><strong>Nom :</strong> Manus Platform</p>
            <p><strong>Adresse :</strong> À compléter</p>
            <p><strong>Téléphone :</strong> À compléter</p>
          </div>
        </section>

        {/* Section 3: Propriété Intellectuelle */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-slate-800">3. PROPRIÉTÉ INTELLECTUELLE</h2>
          <div className="bg-slate-50 p-6 rounded-lg space-y-4 text-slate-700">
            <p>
              L'ensemble du contenu de ce site (textes, images, logos, vidéos) est la propriété exclusive de ProClean Empire, 
              sauf mention contraire.
            </p>
            <p>
              Toute reproduction, même partielle, sans autorisation préalable est interdite et constitue une contrefaçon.
            </p>
          </div>
        </section>

        {/* Section 4: Protection des Données */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-slate-800">4. PROTECTION DES DONNÉES PERSONNELLES</h2>
          <div className="bg-slate-50 p-6 rounded-lg space-y-4 text-slate-700">
            <p>
              Conformément au Règlement Général sur la Protection des Données (RGPD) et à la loi Informatique et Libertés, 
              vous disposez d'un droit d'accès, de rectification, de suppression et d'opposition aux données personnelles vous concernant.
            </p>
            
            <div>
              <p className="font-semibold text-slate-900 mb-2">Responsable du traitement :</p>
              <p>Kevinh MAKAYA MATEVE</p>
            </div>

            <div>
              <p className="font-semibold text-slate-900 mb-2">Les données collectées via ce site sont utilisées uniquement pour :</p>
              <ul className="list-disc list-inside space-y-1">
                <li>Le traitement des demandes de devis</li>
                <li>La gestion de la relation client</li>
                <li>L'envoi d'informations commerciales (avec consentement)</li>
              </ul>
            </div>

            <p className="italic">
              Vos données ne sont jamais vendues ni transmises à des tiers.
            </p>

            <div>
              <p className="font-semibold text-slate-900 mb-2">Pour exercer vos droits, contactez-nous :</p>
              <p><strong>Email :</strong> <a href="mailto:serviceclient@procleanempire.com" className="text-blue-600 hover:underline">serviceclient@procleanempire.com</a></p>
            </div>
          </div>
        </section>

        {/* Section 5: Cookies */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-slate-800">5. COOKIES</h2>
          <div className="bg-slate-50 p-6 rounded-lg space-y-4 text-slate-700">
            <p>
              Ce site utilise des cookies pour améliorer l'expérience utilisateur et réaliser des statistiques de visite.
            </p>
            <p>
              Vous pouvez paramétrer l'utilisation des cookies dans les paramètres de votre navigateur.
            </p>
          </div>
        </section>

        {/* Section 6: Droit Applicable */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-slate-800">6. DROIT APPLICABLE</h2>
          <div className="bg-slate-50 p-6 rounded-lg space-y-4 text-slate-700">
            <p>
              Le présent site est soumis au droit français.
            </p>
            <p>
              En cas de litige, les tribunaux de PONTOISE sont seuls compétents.
            </p>
          </div>
        </section>

        {/* Section 7: Crédits */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-slate-800">7. CRÉDITS</h2>
          <div className="bg-slate-50 p-6 rounded-lg space-y-3">
            <p><strong>Conception et développement :</strong> Manus Platform</p>
            <p><strong>Photos :</strong> À compléter</p>
          </div>
        </section>

        {/* Last Updated */}
        <div className="border-t border-slate-200 pt-8 mt-12 text-center text-sm text-slate-600">
          <p>Dernière mise à jour : {lastUpdate}</p>
          <p className="mt-2 text-xs">© {currentYear} ProClean Empire. Tous droits réservés.</p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
