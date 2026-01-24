import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, CheckCircle2, Euro, Clock, Sparkles } from "lucide-react";
import { useLocation, useSearch } from "wouter";

const serviceDetails: Record<string, any> = {
  automobile: {
    title: "Nettoyage Automobile",
    description: "Lavage intérieur et extérieur, lustrage, protection",
    image: "/team-cleaning-car.jpg",
    packages: [
      { name: "Lavage Complet", price: "90€", features: ["Lavage extérieur complet", "Nettoyage intérieur", "Séchage professionnel"] },
      { name: "Lavage + Lustrage", price: "120€", features: ["Lavage complet", "Lustrage professionnel", "Protection brillance"] },
      { name: "Detailing Premium", price: "150€", features: ["Lavage haute pression", "Lustrage intensif", "Protection céramique", "Finition premium"] },
    ],
  },
  tapis: {
    title: "Nettoyage Tapis & Canapés",
    description: "Forfait ensemble : injection-extraction, détachage professionnel, séchage rapide. Réservation sur devis",
    image: "/service-tapis.jpg",
    packages: [
      { name: "Petit (60x110 ou 80x150 cm)", price: "50€", features: ["Nettoyage injection-extraction", "Détachage", "Séchage rapide"] },
      { name: "Moyen (120x170 a 170x240 cm)", price: "70€", features: ["Nettoyage complet", "Détachage professionnel", "Séchage"] },
      { name: "Grand (200x290 cm et plus)", price: "110€", features: ["Nettoyage haute pression", "Détachage intensif", "Traitement protecteur"] },
    ],
  },
  balcon: {
    title: "Nettoyage Balcon",
    description: "Nettoyage complet, joints, garde-corps et revêtements",
    image: "/team-balcon.jpg",
    packages: [
      { name: "Balcon Standard", price: "50€", features: ["Nettoyage haute pression", "Finition brillante"] },
      { name: "Balcon avec Garde-Corps", price: "70€", features: ["Nettoyage complet", "Nettoyage garde-corps", "Joints"] },
      { name: "Grand Balcon/Loggia", price: "100€", features: ["Nettoyage haute pression", "Traitement protecteur", "Finition premium"] },
    ],
  },
  jardinage: {
    title: "Entretien Jardinage",
    description: "Taille, débroussaillage, entretien paysager professionnel",
    image: "/team-jardinage.jpg",
    packages: [
      { name: "Taille Haies", price: "Demande de Devis", features: ["Taille professionnelle", "Évacuation des débris"] },
      { name: "Débroussaillage", price: "Demande de Devis", features: ["Débroussaillage complet", "Nettoyage du terrain"] },
      { name: "Entretien Jardin", price: "Demande de Devis", features: ["Taille des plantes", "Désherbage", "Entretien général"] },
      { name: "Forfait Mensuel", price: "Demande de Devis", features: ["Entretien régulier", "Taille saisonnière", "Nettoyage"] },
    ],
  },
  facade: {
    title: "Nettoyage Façade",
    description: "Nettoyage haute pression, traitement anti-mousse, ravalement",
    image: "/service-facade.jpg",
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
    image: "/service-panneaux.jpg",
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
    image: "/service-professionnel.jpg",
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
    image: "/service-piscine.jpg",
    packages: [
      { name: "Nettoyage Simple", price: "Demande de Devis", features: ["Nettoyage bassin", "Nettoyage filtration", "Vérification pH"] },
      { name: "Maintenance Mensuelle", price: "Demande de Devis", features: ["Nettoyage régulier", "Traitement chimique", "Inspection"] },
      { name: "Ouverture/Fermeture", price: "Demande de Devis", features: ["Préparation saisonnière", "Nettoyage complet", "Mise en service"] },
    ],
  },
};

export default function ServiceDetail() {
  const [location] = useLocation();
  const { user } = useAuth();
  const searchParams = useSearch();
  
  const serviceId = location.split('/').pop() || '';
  const service = serviceDetails[serviceId];

  if (!service) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Service non trouvé</h1>
          <Button onClick={() => window.history.back()}>Retour</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <Button variant="ghost" onClick={() => window.history.back()} className="mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Retour
        </Button>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div>
            <img
              src={service.image}
              alt={service.title}
              className="w-full h-96 object-cover rounded-lg shadow-lg"
            />
          </div>
          <div>
            <h1 className="text-4xl font-bold mb-4">{service.title}</h1>
            <p className="text-lg text-muted-foreground mb-6">{service.description}</p>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Sparkles className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold">Service Professionnel</h3>
                  <p className="text-sm text-muted-foreground">Équipement de dernière génération</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold">Intervention Rapide</h3>
                  <p className="text-sm text-muted-foreground">Disponible en Île-de-France</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold">Satisfaction Garantie</h3>
                  <p className="text-sm text-muted-foreground">Ou argent remboursé</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-8">Forfaits Disponibles</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {service.packages.map((pkg: any, idx: number) => (
              <Card key={idx} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-xl">{pkg.name}</CardTitle>
                  <CardDescription className="text-lg font-semibold text-blue-600">
                    {pkg.price}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {pkg.features.map((feature: string, fidx: number) => (
                      <li key={fidx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button className="w-full mt-6 bg-blue-600 hover:bg-blue-700">
                    Réserver
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
