import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function TermsOfService() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      
      <main className="flex-1 container py-16 px-4 md:px-6 max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-4 text-slate-900">Conditions Générales de Vente</h1>
        <p className="text-slate-600 mb-12">Dernière mise à jour : {new Date().toLocaleDateString('fr-FR')}</p>

        <section className="space-y-8">
          <div className="bg-slate-50 p-6 rounded-lg">
            <h2 className="text-2xl font-bold mb-4 text-slate-800">1. OBJET</h2>
            <p className="text-slate-700">Les présentes CGV régissent les prestations de services de nettoyage proposées par ProClean Empire.</p>
          </div>

          <div className="bg-slate-50 p-6 rounded-lg">
            <h2 className="text-2xl font-bold mb-4 text-slate-800">2. DEVIS ET COMMANDE</h2>
            <p className="text-slate-700"><strong>Devis gratuit</strong> valable 30 jours.</p>
            <p className="text-slate-700">La commande est ferme dès réception du devis signé.</p>
          </div>

          <div className="bg-slate-50 p-6 rounded-lg">
            <h2 className="text-2xl font-bold mb-4 text-slate-800">3. TARIFS ET PAIEMENT</h2>
            <p className="text-slate-700">Tous les prix sont en Euros.</p>
            <p className="text-slate-700">Moyens de paiement : virement, carte bancaire, espèces, chèque.</p>
            <p className="text-slate-700">Paiement à l'échéance indiquée sur la facture.</p>
          </div>

          <div className="bg-slate-50 p-6 rounded-lg">
            <h2 className="text-2xl font-bold mb-4 text-slate-800">4. ANNULATION</h2>
            <p className="text-slate-700">Annulation gratuite jusqu'à <strong>48h</strong> avant la prestation.</p>
            <p className="text-slate-700">Au-delà : frais de <strong>30%</strong> du montant du devis.</p>
          </div>

          <div className="bg-slate-50 p-6 rounded-lg">
            <h2 className="text-2xl font-bold mb-4 text-slate-800">5. RESPONSABILITÉ</h2>
            <p className="text-slate-700">ProClean Empire est assuré en Responsabilité Civile Professionnelle.</p>
            <p className="text-slate-700">Limitation : dommages liés à la fragilité des supports non signalés.</p>
          </div>

          <div className="bg-slate-50 p-6 rounded-lg">
            <h2 className="text-2xl font-bold mb-4 text-slate-800">6. RÉCLAMATIONS</h2>
            <p className="text-slate-700">Délai : <strong>48h</strong> après la prestation.</p>
            <p className="text-slate-700">Adresse : serviceclient@procleanempire.com</p>
          </div>

          <div className="bg-slate-50 p-6 rounded-lg">
            <h2 className="text-2xl font-bold mb-4 text-slate-800">7. LITIGES</h2>
            <p className="text-slate-700">Juridiction compétente : tribunal de PONTOISE.</p>
            <p className="text-slate-700">Droit applicable : droit français.</p>
          </div>

          <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
            <h2 className="text-2xl font-bold mb-4 text-slate-800">Nous contacter</h2>
            <p className="text-slate-700">Email : serviceclient@procleanempire.com</p>
            <p className="text-slate-700">Téléphone : 06 17 21 22 30</p>
            <p className="text-slate-700">Adresse : 3 RUE STEPHANE CHARBONNIER, 95300 PONTOISE</p>
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
