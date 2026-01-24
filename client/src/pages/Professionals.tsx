import { Building2, Phone, Mail, MapPin, FileText, Shield } from "lucide-react";

export default function Professionals() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white py-20">
        <div className="container mx-auto px-4">
          <h1 className="text-5xl font-bold mb-4">Informations Professionnelles</h1>
          <p className="text-xl text-gray-300">ProClean Empire - Nettoyage Professionnel en Île-de-France</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-20">
        <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
          {/* Company Info */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Building2 className="text-blue-600" />
              Informations Légales
            </h2>
            
            <div className="space-y-4">
              <div>
                <label className="text-sm font-semibold text-gray-600">SIREN</label>
                <p className="text-lg text-gray-900 font-mono">123 456 789</p>
              </div>
              
              <div>
                <label className="text-sm font-semibold text-gray-600">Raison Sociale</label>
                <p className="text-lg text-gray-900 font-semibold">ProClean Empire SARL</p>
              </div>
              
              <div>
                <label className="text-sm font-semibold text-gray-600">SIRET</label>
                <p className="text-lg text-gray-900 font-mono">123 456 789 00012</p>
              </div>
              
              <div>
                <label className="text-sm font-semibold text-gray-600">Forme Juridique</label>
                <p className="text-lg text-gray-900">SARL</p>
              </div>
              
              <div>
                <label className="text-sm font-semibold text-gray-600">Capital Social</label>
                <p className="text-lg text-gray-900">10 000 €</p>
              </div>
            </div>
          </div>

          {/* Contact Info */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Phone className="text-blue-600" />
              Coordonnées
            </h2>
            
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                <div>
                  <label className="text-sm font-semibold text-gray-600">Téléphone</label>
                  <p className="text-lg text-gray-900">01 XX XX XX XX</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                <div>
                  <label className="text-sm font-semibold text-gray-600">Email</label>
                  <p className="text-lg text-gray-900">contact@procleanempire.fr</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                <div>
                  <label className="text-sm font-semibold text-gray-600">Adresse</label>
                  <p className="text-lg text-gray-900">Île-de-France</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Certifications */}
        <div className="mt-20 bg-white rounded-lg shadow-lg p-8 max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <Shield className="text-blue-600" />
            Certifications & Conformités
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="border-l-4 border-blue-600 pl-4">
              <h3 className="font-semibold text-gray-900 mb-2">Assurance Responsabilité Civile</h3>
              <p className="text-gray-600">Couverture complète pour tous les services</p>
            </div>
            
            <div className="border-l-4 border-blue-600 pl-4">
              <h3 className="font-semibold text-gray-900 mb-2">Respect des Normes Environnementales</h3>
              <p className="text-gray-600">Produits écologiques et gestion des déchets</p>
            </div>
            
            <div className="border-l-4 border-blue-600 pl-4">
              <h3 className="font-semibold text-gray-900 mb-2">Conformité RGPD</h3>
              <p className="text-gray-600">Protection des données clients garantie</p>
            </div>
            
            <div className="border-l-4 border-blue-600 pl-4">
              <h3 className="font-semibold text-gray-900 mb-2">Équipe Formée</h3>
              <p className="text-gray-600">Techniciens certifiés et expérimentés</p>
            </div>
          </div>
        </div>

        {/* Documents */}
        <div className="mt-20 bg-white rounded-lg shadow-lg p-8 max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <FileText className="text-blue-600" />
            Documents Légaux
          </h2>
          
          <div className="space-y-3">
            <a href="#" className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <FileText className="w-5 h-5 text-blue-600" />
              <span className="text-gray-900 font-medium">Mentions Légales</span>
            </a>
            
            <a href="#" className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <FileText className="w-5 h-5 text-blue-600" />
              <span className="text-gray-900 font-medium">Conditions Générales de Service</span>
            </a>
            
            <a href="#" className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <FileText className="w-5 h-5 text-blue-600" />
              <span className="text-gray-900 font-medium">Politique de Confidentialité</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
