import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      
      <main className="flex-1 container py-16 px-4 md:px-6 max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-4 text-slate-900">Politique de Confidentialité</h1>
        <p className="text-slate-600 mb-12">Dernière mise à jour : {new Date().toLocaleDateString('fr-FR')}</p>

        <section className="space-y-8">
          <div className="bg-slate-50 p-6 rounded-lg">
            <h2 className="text-2xl font-bold mb-4 text-slate-800">1. PRÉAMBULE</h2>
            <p className="text-slate-700">La présente politique de confidentialité informe les utilisateurs du site www.procleanempire.com de la manière dont ProClean Empire collecte et traite leurs données à caractère personnel.</p>
          </div>

          <div className="bg-slate-50 p-6 rounded-lg">
            <h2 className="text-2xl font-bold mb-4 text-slate-800">2. RESPONSABLE DU TRAITEMENT</h2>
            <p className="text-slate-700"><strong>M. Kevinh MAKAYA MATEVE</strong></p>
            <p className="text-slate-700">Email : serviceclient@procleanempire.com</p>
            <p className="text-slate-700">Téléphone : 06 17 21 22 30</p>
          </div>

          <div className="bg-slate-50 p-6 rounded-lg">
            <h2 className="text-2xl font-bold mb-4 text-slate-800">3. DONNÉES COLLECTÉES</h2>
            <ul className="list-disc list-inside space-y-2 text-slate-700">
              <li>Identité (Nom, Prénom)</li>
              <li>Coordonnées (Email, Téléphone)</li>
              <li>Adresse d'intervention</li>
              <li>Détails de la demande</li>
            </ul>
          </div>

          <div className="bg-slate-50 p-6 rounded-lg">
            <h2 className="text-2xl font-bold mb-4 text-slate-800">4. FINALITÉS DU TRAITEMENT</h2>
            <ul className="list-disc list-inside space-y-2 text-slate-700">
              <li>Établissement de devis</li>
              <li>Gestion des prestations</li>
              <li>Suivi client et facturation</li>
              <li>Offres promotionnelles (avec consentement)</li>
            </ul>
          </div>

          <div className="bg-slate-50 p-6 rounded-lg">
            <h2 className="text-2xl font-bold mb-4 text-slate-800">5. DURÉE DE CONSERVATION</h2>
            <p className="text-slate-700"><strong>Prospects :</strong> 3 ans après dernier contact</p>
            <p className="text-slate-700"><strong>Clients :</strong> 5 ans après fin de relation</p>
          </div>

          <div className="bg-slate-50 p-6 rounded-lg">
            <h2 className="text-2xl font-bold mb-4 text-slate-800">6. VOS DROITS (RGPD)</h2>
            <p className="text-slate-700">Vous disposez d'un droit d'accès, de rectification, de suppression et d'opposition à vos données.</p>
            <p className="text-slate-700 mt-2">Pour exercer vos droits : serviceclient@procleanempire.com</p>
          </div>

          <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
            <h2 className="text-2xl font-bold mb-4 text-slate-800">Nous contacter</h2>
            <p className="text-slate-700">Email : serviceclient@procleanempire.com</p>
            <p className="text-slate-700">Téléphone : 06 17 21 22 30</p>
          </div>
        </section>

        <div className="border-t border-slate-200 pt-8 mt-12 text-center text-sm text-slate-600">
          <p>© 2026 ProClean Empire. Tous droits réservés.</p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
