import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, CheckCircle2, Euro, Clock, Sparkles, Share2, Facebook, Twitter, Linkedin, Mail } from "lucide-react";
import { useLocation, useSearch } from "wouter";
import AdvancedBookingForm from "@/components/AdvancedBookingForm";

const serviceDetails: Record<string, any> = {
  automobile: {
    title: "Nettoyage Automobile",
    description: "Lavage intérieur et extérieur, lustrage, protection",
    image: "/proclean-voiture-lavage.jpg",
    packages: [
      { name: "Lavage Complet", price: "90€", features: ["Lavage extérieur complet", "Nettoyage intérieur", "Séchage professionnel"] },
      { name: "Lavage + Lustrage", price: "120€", features: ["Lavage complet", "Lustrage professionnel", "Protection brillance"] },
      { name: "Detailing Premium", price: "150€", features: ["Lavage haute pression", "Lustrage intensif", "Protection céramique", "Finition premium"] },
    ],
  },
  tapis: {
    title: "Nettoyage Tapis & Canapés",
    description: "Forfait ensemble : injection-extraction, détachage professionnel, séchage rapide. Réservation sur devis",
    image: "/proclean-tapis-aspiration.jpg",
    packages: [
      { name: "Petit (60x110 ou 80x150 cm)", price: "50€", features: ["Nettoyage injection-extraction", "Détachage", "Séchage rapide"] },
      { name: "Moyen (120x170 a 170x240 cm)", price: "70€", features: ["Nettoyage complet", "Détachage professionnel", "Séchage"] },
      { name: "Grand (200x290 cm et plus)", price: "110€", features: ["Nettoyage haute pression", "Détachage intensif", "Traitement protecteur"] },
    ],
  },
  balcon: {
    title: "Nettoyage Balcon",
    description: "Nettoyage complet, joints, garde-corps et revêtements",
    image: "/proclean-balcon-nettoyage.jpg",
    packages: [
      { name: "Balcon Standard", price: "50€", features: ["Nettoyage haute pression", "Finition brillante"] },
      { name: "Balcon avec Garde-Corps", price: "70€", features: ["Nettoyage complet", "Nettoyage garde-corps", "Joints"] },
      { name: "Grand Balcon/Loggia", price: "100€", features: ["Nettoyage haute pression", "Traitement protecteur", "Finition premium"] },
    ],
  },
  jardinage: {
    title: "Entretien Jardinage",
    description: "Taille, débroussaillage, entretien paysager professionnel",
    image: "/proclean_jardinage_1.png",
    packages: [
      { name: "Taille Haies", price: "Demande de Devis", features: ["Taille professionnelle", "Évacuation des débris"] },
      { name: "Débroussaillage", price: "Demande de Devis", features: ["Débroussaillage complet", "Nettoyage du terrain"] },
      { name: "Entretien Jardin", price: "Demande de Devis", features: ["Taille des plantes", "Désherbage", "Entretien général"] },
      { name: "Forfait Mensuel", price: "Demande de Devis", features: ["Entretien régulier", "Taille saisonnière", "Nettoyage"] },
    ],
  },
  facade: {
    title: "Nettoyage Façade",
    description: "Nettoyage haute pression, traitement anti-mousse, joints",
    image: "/proclean-facade-nettoyage.jpg",
    packages: [
      { name: "Façade Petite", price: "150€", features: ["Nettoyage haute pression", "Traitement anti-mousse"] },
      { name: "Façade Moyenne", price: "300€", features: ["Nettoyage complet", "Traitement protecteur", "Joints"] },
      { name: "Façade Grande", price: "500€+", features: ["Nettoyage haute pression", "Traitement anti-mousse", "Ravalement"] },
      { name: "Traitement Protecteur", price: "+50€", features: ["Protection 24 mois", "Anti-mousse", "Anti-pollution"] },
    ],
  },
  panneaux: {
    title: "Nettoyage Panneaux Solaires",
    description: "Nettoyage haute pression, maintenance, optimisation rendement",
    image: "/proclean-panneaux-solaires.jpg",
    packages: [
      { name: "Nettoyage Simple", price: "100€", features: ["Nettoyage haute pression", "Inspection"] },
      { name: "Maintenance Complète", price: "200€", features: ["Nettoyage", "Inspection électrique", "Maintenance"] },
      { name: "Forfait Annuel", price: "300€", features: ["4 nettoyages/an", "Inspections régulières", "Maintenance"] },
      { name: "Optimisation Rendement", price: "+100€", features: ["Diagnostic complet", "Optimisation", "Rapport détaillé"] },
    ],
  },
  professionnel: {
    title: "Nettoyage Professionnel",
    description: "Bureaux, espaces commerciaux, nettoyage complet sur mesure",
    image: "/proclean-canape-nettoyage.jpg",
    packages: [
      { name: "Bureau Petit", price: "Demande de Devis", features: ["Nettoyage complet", "Finition premium"] },
      { name: "Bureau Moyen", price: "Demande de Devis", features: ["Nettoyage en profondeur", "Traitement surfaces"] },
      { name: "Espace Commercial", price: "Demande de Devis", features: ["Nettoyage complet", "Traitement spécialisé", "Finition"] },
      { name: "Contrat Mensuel", price: "Demande de Devis", features: ["Nettoyage régulier", "Maintenance", "Support prioritaire"] },
    ],
  },
  piscine: {
    title: "Nettoyage Piscine",
    description: "Nettoyage complet, traitement de l'eau, maintenance",
    image: "/proclean-piscine-nettoyage.jpg",
    packages: [
      { name: "Nettoyage Simple", price: "Demande de Devis", features: ["Nettoyage bassin", "Nettoyage filtration", "Vérification pH"] },
      { name: "Maintenance Mensuelle", price: "Demande de Devis", features: ["Nettoyage régulier", "Traitement chimique", "Inspection"] },
      { name: "Ouverture/Fermeture", price: "Demande de Devis", features: ["Préparation saisonnière", "Nettoyage complet", "Mise en service"] },
    ],
  },
  terrasse: {
    title: "Nettoyage Terrasse",
    description: "Démoussage, nettoyage haute pression, traitement anti-mousse",
    image: "/proclean-terrasse-nettoyage.jpg",
    packages: [
      { name: "Terrasse Petite", price: "Demande de Devis", features: ["Nettoyage haute pression", "Démoussage"] },
      { name: "Terrasse Moyenne", price: "Demande de Devis", features: ["Nettoyage complet", "Traitement anti-mousse", "Joints"] },
      { name: "Terrasse Grande", price: "Demande de Devis", features: ["Nettoyage haute pression", "Traitement protecteur", "Finition premium"] },
    ],
  },
};
export default function ServiceDetail() {
  const { user } = useAuth();
  const [location, setLocation] = useLocation();
  
  // Extract service ID from URL path
  const pathMatch = location.match(/\/service\/([a-z-]+)/);
  const serviceId = pathMatch ? pathMatch[1].replace(/-/g, "") : "tapis";
  
  const service = serviceDetails[serviceId] || serviceDetails.tapis;

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-white border-b border-gray-200">
        <div className="container flex items-center justify-between py-4">
          <button
            onClick={() => setLocation("/")}
            className="flex items-center gap-2 text-blue-600 hover:text-blue-700 transition"
          >
            <ArrowLeft size={20} />
            Retour
          </button>
          <h1 className="text-2xl font-bold text-gray-900">{service.title}</h1>
          <div className="w-20" />
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative h-96 overflow-hidden">
        <img
          src={service.image}
          alt={service.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white">
            <h2 className="text-5xl font-bold mb-4">{service.title} Premium</h2>
            <p className="text-xl">{service.description}</p>
          </div>
        </div>
      </section>

      {/* Description */}
      <section className="py-16 bg-gray-50">
        <div className="container max-w-4xl">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">Service Professionnel</h3>
              <p className="text-gray-600 mb-6">
                ProClean Empire propose un service {service.title.toLowerCase()} complet et professionnel. 
                Nos experts utilisent les meilleures techniques et produits pour garantir un résultat impeccable.
              </p>
              <ul className="space-y-3">
                <li className="flex items-center gap-3">
                  <CheckCircle2 className="text-blue-600" size={20} />
                  <span className="text-gray-700">Équipements professionnels</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle2 className="text-blue-600" size={20} />
                  <span className="text-gray-700">Produits écologiques</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle2 className="text-blue-600" size={20} />
                  <span className="text-gray-700">Intervention rapide</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle2 className="text-blue-600" size={20} />
                  <span className="text-gray-700">Satisfaction garantie</span>
                </li>
              </ul>
            </div>
            <div>
              <img
                src={service.image}
                alt="Détail du service"
                className="rounded-lg shadow-lg w-full h-80 object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Packages */}
      <section className="py-16">
        <div className="container max-w-5xl">
          <h3 className="text-3xl font-bold mb-12 text-center text-gray-900">Nos Forfaits</h3>
          <div className="grid md:grid-cols-2 gap-8">
            {service.packages.map((pkg: any, idx: number) => (
              <Card key={idx} className="hover:shadow-lg transition">
                <CardHeader>
                  <CardTitle className="text-xl">{pkg.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="mb-4">
                    {pkg.price !== "Demande de Devis" && !pkg.price.includes("0") && (
                      <div className="text-2xl font-bold text-blue-600 mb-4">{pkg.price}</div>
                    )}
                  </div>
                  <ul className="space-y-2 mb-6">
                    {pkg.features.map((feature: string, i: number) => (
                      <li key={i} className="flex items-center gap-2 text-gray-700">
                        <CheckCircle2 size={16} className="text-green-600" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button 
                    className="w-full bg-blue-600 hover:bg-blue-700"
                    onClick={() => {
                      // Scroll to booking form
                      document.getElementById('booking-form')?.scrollIntoView({ behavior: 'smooth' });
                      // Store the selected service and option
                      localStorage.setItem('selectedService', serviceId);
                      localStorage.setItem('selectedOption', pkg.name);
                    }}
                  >
                    {pkg.price === "Demande de Devis" || pkg.price.includes("0") ? "Demander un Devis" : "Reserver"}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Avantages */}
      <section className="py-16 bg-blue-50">
        <div className="container max-w-4xl">
          <h3 className="text-3xl font-bold mb-12 text-center text-gray-900">Pourquoi Nous Choisir ?</h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <Sparkles className="mx-auto mb-4 text-blue-600" size={40} />
              <h4 className="text-xl font-bold mb-2">Résultats Professionnels</h4>
              <p className="text-gray-600">
                Nos experts utilisent les meilleures techniques pour un résultat impeccable
              </p>
            </div>
            <div className="text-center">
              <Clock className="mx-auto mb-4 text-blue-600" size={40} />
              <h4 className="text-xl font-bold mb-2">Intervention Rapide</h4>
              <p className="text-gray-600">
                Disponibles en Île-de-France sous 48h pour votre convenance
              </p>
            </div>
            <div className="text-center">
              <CheckCircle2 className="mx-auto mb-4 text-blue-600" size={40} />
              <h4 className="text-xl font-bold mb-2">Garantie Satisfaction</h4>
              <p className="text-gray-600">
                100% satisfait ou remboursé, sans questions
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Booking Form */}
      <section id="booking-form" className="py-16 bg-gradient-to-br from-blue-50 to-blue-100">
        <div className="container max-w-2xl">
          <h3 className="text-3xl font-bold mb-2 text-center text-gray-900">Reservez Maintenant</h3>
          <p className="text-center text-gray-600 mb-8">
            Remplissez le formulaire ci-dessous pour reserver votre service
          </p>
          <AdvancedBookingForm
            prefilledService={serviceId}
            onSuccess={() => setLocation('/merci')}
          />
        </div>
      </section>

      {/* Social Share Section */}
      <section className="py-16 bg-gray-50">
        <div className="container max-w-4xl text-center">
          <h3 className="text-3xl font-bold mb-8 text-gray-900">Partagez ce Service</h3>
          <p className="text-gray-600 mb-8">Aimez ce service ? Partagez-le avec vos amis et votre réseau</p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Button
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3"
              onClick={() => {
                const url = window.location.href;
                const text = `Découvrez le service ${service.title} de ProClean Empire`;
                window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank', 'width=600,height=400');
              }}
            >
              <span className="text-xl">f</span>
              Facebook
            </Button>
            <Button
              className="flex items-center gap-2 bg-blue-400 hover:bg-blue-500 text-white px-6 py-3"
              onClick={() => {
                const url = window.location.href;
                const text = `Découvrez le service ${service.title} de ProClean Empire`;
                window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`, '_blank', 'width=600,height=400');
              }}
            >
              <span className="text-xl">𝕏</span>
              Twitter
            </Button>
            <Button
              className="flex items-center gap-2 bg-blue-700 hover:bg-blue-800 text-white px-6 py-3"
              onClick={() => {
                const url = window.location.href;
                window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, '_blank', 'width=600,height=400');
              }}
            >
              <span className="text-xl">in</span>
              LinkedIn
            </Button>
            <Button
              className="flex items-center gap-2 bg-gray-600 hover:bg-gray-700 text-white px-6 py-3"
              onClick={() => {
                const url = window.location.href;
                const subject = `Service : ${service.title}`;
                const body = `Découvrez ce service chez ProClean Empire : ${url}`;
                window.location.href = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
              }}
            >
              <span className="text-xl">✉</span>
              Email
            </Button>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16">
        <div className="container max-w-4xl text-center">
          <h3 className="text-3xl font-bold mb-6 text-gray-900">Prêt à Commencer ?</h3>
          <p className="text-xl text-gray-600 mb-8">
            Contactez-nous dès maintenant pour un devis gratuit et une intervention rapide
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
              Demander un Devis
            </Button>
            <Button size="lg" variant="outline">
              Nous Contacter
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
