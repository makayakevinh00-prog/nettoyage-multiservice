/**
 * Configuration des tarifs et options pour chaque service ProClean Empire
 */

export interface ServiceOption {
  id: string;
  label: string;
  price: number; // en euros
  description?: string;
}

export interface Service {
  id: string;
  name: string;
  description: string;
  basePrice?: number; // Prix de base si pas d'options
  options: ServiceOption[];
  requiresSelection: boolean; // Si l'utilisateur doit choisir une option
}

// Tarifs en euros
export const SERVICES: Record<string, Service> = {
  automobile: {
    id: "automobile",
    name: "Nettoyage Automobile",
    description: "Nettoyage complet de votre véhicule",
    options: [
      {
        id: "auto-sans-sieges",
        label: "70€ - Nettoyage intérieur + extérieur",
        price: 70,
        description: "Lavage extérieur complet, nettoyage intérieur, séchage professionnel",
      },
      {
        id: "auto-avec-sieges",
        label: "90€ - Nettoyage complet",
        price: 90,
        description: "Lavage complet, lustrage professionnel, protection brillance",
      },
      {
        id: "auto-suv",
        label: "120€ - SUV",
        price: 120,
        description: "Lavage haute pression, lustrage intensif, protection céramique, finition premium",
      },
    ],
    requiresSelection: true,
  },

  tapis: {
    id: "tapis",
    name: "Nettoyage Tapis",
    description: "Nettoyage professionnel de vos tapis",
    options: [
      {
        id: "tapis-petit",
        label: "50€ - Petit tapis (60×110 ou 80×150 cm)",
        price: 50,
        description: "Nettoyage injection-extraction, détachage, séchage rapide",
      },
      {
        id: "tapis-moyen",
        label: "70€ - Tapis moyen (120×170 à 170×240 cm)",
        price: 70,
        description: "Nettoyage complet, détachage professionnel, séchage",
      },
      {
        id: "tapis-grand",
        label: "110€ - Grand tapis (200×290 cm et plus)",
        price: 110,
        description: "Nettoyage haute pression, détachage intensif, traitement protecteur",
      },
    ],
    requiresSelection: true,
  },

  terrasse: {
    id: "terrasse",
    name: "Nettoyage Terrasse",
    description: "Nettoyage haute pression de votre terrasse",
    options: [
      {
        id: "terrasse-2m2",
        label: "15€ - Terrasse petite (jusqu'à 20m²)",
        price: 15.4,
        description: "Nettoyage haute pression, démoussage",
      },
      {
        id: "terrasse-5m2",
        label: "18€ - Terrasse petite (jusqu'à 20m²)",
        price: 17.6,
        description: "Nettoyage haute pression, démoussage",
      },
      {
        id: "terrasse-10m2",
        label: "29€ - Terrasse petite (jusqu'à 20m²)",
        price: 29.1,
        description: "Nettoyage haute pression, démoussage",
      },
      {
        id: "terrasse-20m2",
        label: "53€ - Terrasse moyenne (20-40m²)",
        price: 52.5,
        description: "Nettoyage complet, traitement anti-mousse, joints",
      },
      {
        id: "terrasse-30m2",
        label: "82€ - Terrasse moyenne (20-40m²)",
        price: 81.9,
        description: "Nettoyage complet, traitement anti-mousse, joints",
      },
      {
        id: "terrasse-50m2",
        label: "139€ - Terrasse grande (40m² et plus)",
        price: 138.7,
        description: "Nettoyage haute pression, traitement protecteur, finition premium",
      },
      {
        id: "terrasse-custom",
        label: "Demande de Devis - Plus de 50 m²",
        price: 0, // À définir après contact
        description: "Nettoyage haute pression, traitement protecteur, finition premium",
      },
    ],
    requiresSelection: true,
  },

  balcon: {
    id: "balcon",
    name: "Nettoyage Balcon",
    description: "Nettoyage complet de votre balcon",
    basePrice: 50,
    options: [
      {
        id: "balcon-standard",
        label: "50€ - Balcon standard (jusqu'à 15m²)",
        price: 50,
        description: "Nettoyage haute pression, finition brillante",
      },
      {
        id: "balcon-garde-corps",
        label: "70€ - Balcon avec garde-corps (15-30m²)",
        price: 70,
        description: "Nettoyage complet, nettoyage garde-corps, joints",
      },
      {
        id: "balcon-grand",
        label: "100€ - Grand balcon/loggia (30m² et plus)",
        price: 100,
        description: "Nettoyage haute pression, traitement protecteur, finition premium",
      },
    ],
    requiresSelection: true,
  },

  jardinage: {
    id: "jardinage",
    name: "Entretien Jardinage",
    description: "Entretien et nettoyage de votre jardin",
    basePrice: 0, // Sur devis
    options: [
      {
        id: "jardinage-custom",
        label: "Sur devis (nous contacter)",
        price: 0,
      },
    ],
    requiresSelection: false,
  },

  facade: {
    id: "facade",
    name: "Nettoyage Façade",
    description: "Nettoyage professionnel de votre façade",
    basePrice: 0, // Sur devis
    options: [
      {
        id: "facade-custom",
        label: "Sur devis (nous contacter)",
        price: 0,
      },
    ],
    requiresSelection: false,
  },

  toit: {
    id: "toit",
    name: "Nettoyage Toit",
    description: "Nettoyage sécurisé de votre toit",
    basePrice: 0, // Sur devis
    options: [
      {
        id: "toit-custom",
        label: "Sur devis (nous contacter)",
        price: 0,
      },
    ],
    requiresSelection: false,
  },

  panneaux_solaires: {
    id: "panneaux_solaires",
    name: "Nettoyage Panneaux Solaires",
    description: "Nettoyage professionnel de vos panneaux solaires",
    basePrice: 0, // Sur devis
    options: [
      {
        id: "panneaux-custom",
        label: "Sur devis (nous contacter)",
        price: 0,
      },
    ],
    requiresSelection: false,
  },

  poubelle: {
    id: "poubelle",
    name: "Nettoyage Poubelle (Abonnement)",
    description: "Nettoyage mensuel de vos bacs à poubelle",
    basePrice: 50,
    options: [
      {
        id: "poubelle-mensuel",
        label: "1 passage par mois",
        price: 50,
        description: "Nettoyage régulier de vos bacs à poubelle",
      },
    ],
    requiresSelection: true,
  },
};

// Promotions temporaires
export const PROMOTIONS = {
  automobile_sans_sieges: {
    serviceId: "automobile",
    optionId: "auto-sans-sieges",
    originalPrice: 70,
    promotionalPrice: 50,
    validUntil: new Date("2026-02-07"),
    description: "Offre spéciale jusqu'au 7 février",
  },
};

/**
 * Obtenir le prix d'une option
 */
export function getOptionPrice(serviceId: string, optionId: string): number {
  const service = SERVICES[serviceId];
  if (!service) return 0;

  const option = service.options.find((opt) => opt.id === optionId);
  if (!option) return 0;

  // Vérifier s'il y a une promotion
  const promotion = Object.values(PROMOTIONS).find(
    (promo) => promo.serviceId === serviceId && promo.optionId === optionId
  );

  if (
    promotion &&
    new Date() < promotion.validUntil
  ) {
    return promotion.promotionalPrice;
  }

  return option.price;
}

/**
 * Formater un prix en euros
 */
export function formatPrice(priceInEuros: number): string {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
  }).format(priceInEuros);
}

/**
 * Convertir un prix en centimes (pour Stripe)
 */
export function priceToStripeAmount(priceInEuros: number): number {
  return Math.round(priceInEuros * 100);
}
