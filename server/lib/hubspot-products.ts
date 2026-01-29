/**
 * HubSpot Products Integration
 * Synchronise tous les services et prix avec HubSpot
 */

const HUBSPOT_API_KEY = process.env.HUBSPOT_API_KEY;
const HUBSPOT_API_URL = 'https://api.hubapi.com';

// Tous les services et leurs options de prix
export const SERVICES_CATALOG = {
  automobile: {
    name: "Nettoyage Automobile",
    description: "Lavage intérieur et extérieur, lustrage, protection",
    options: [
      { name: "Nettoyage intérieur + extérieur", price: 7000 }, // 70€
      { name: "Nettoyage complet", price: 9000 }, // 90€
      { name: "SUV", price: 12000 }, // 120€
    ],
  },
  tapis: {
    name: "Nettoyage Tapis & Canapés",
    description: "Injection-extraction, détachage professionnel, séchage rapide",
    options: [
      { name: "Petit tapis (60x110 ou 80x150 cm)", price: 5000 }, // 50€
      { name: "Tapis moyen (120x170 à 170x240 cm)", price: 7000 }, // 70€
      { name: "Grand tapis (200x290 cm et plus)", price: 11000 }, // 110€
    ],
  },
  balcon: {
    name: "Nettoyage Balcon",
    description: "Nettoyage complet, joints, garde-corps et revêtements",
    options: [
      { name: "Balcon standard (jusqu'à 15m²)", price: 5000 }, // 50€
      { name: "Balcon avec garde-corps (15-30m²)", price: 7000 }, // 70€
      { name: "Grand balcon/loggia (30m² et plus)", price: 10000 }, // 100€
    ],
  },
  facade: {
    name: "Nettoyage Façade",
    description: "Nettoyage haute pression, traitement anti-mousse, joints",
    options: [
      { name: "Petite façade (jusqu'à 50m²)", price: 15000 }, // 150€
      { name: "Façade moyenne (50-150m²)", price: 30000 }, // 300€
      { name: "Grande façade (150m² et plus)", price: 50000 }, // 500€
      { name: "Traitement protecteur anti-mousse", price: 5000 }, // 50€
    ],
  },
  panneaux: {
    name: "Nettoyage Panneaux Solaires",
    description: "Nettoyage haute pression, maintenance, optimisation rendement",
    options: [
      { name: "Nettoyage simple (jusqu'à 20m²)", price: 10000 }, // 100€
      { name: "Maintenance complète (20-50m²)", price: 20000 }, // 200€
      { name: "Forfait annuel (4 nettoyages)", price: 30000 }, // 300€
      { name: "Optimisation rendement", price: 10000 }, // 100€
    ],
  },
  terrasse: {
    name: "Nettoyage Terrasse",
    description: "Démoussage, nettoyage haute pression, traitement anti-mousse",
    options: [
      { name: "Terrasse petite (jusqu'à 20m²)", price: 8000 }, // 80€
      { name: "Terrasse moyenne (20-40m²)", price: 14000 }, // 140€
      { name: "Terrasse grande (40m² et plus)", price: 20000 }, // 200€
    ],
  },
};

interface HubSpotProduct {
  name: string;
  description: string;
  sku: string;
  price: number;
  currency: string;
  type: string;
}

/**
 * Crée un produit dans HubSpot
 */
export async function createHubSpotProduct(product: HubSpotProduct): Promise<string | null> {
  try {
    if (!HUBSPOT_API_KEY) {
      console.error('HUBSPOT_API_KEY environment variable is not set');
      return null;
    }

    const properties: Record<string, string | number> = {
      name: product.name,
      description: product.description,
      sku: product.sku,
      price: product.price,
      cost_of_goods_sold: Math.floor(product.price * 0.3), // Estimation du coût
      recurringbillingfrequency: 'one_time',
    };

    const response = await fetch(`${HUBSPOT_API_URL}/crm/v3/objects/products`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${HUBSPOT_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ properties }),
    });

    if (response.ok) {
      const data = await response.json() as any;
      console.log(`✅ Produit HubSpot créé: ${data.id} - ${product.name}`);
      return data.id;
    } else {
      const errorData = await response.json() as any;
      console.error(`❌ Erreur création produit: ${response.status}`, errorData);
    }

    return null;
  } catch (error) {
    console.error('❌ Erreur lors de la création du produit HubSpot:', error);
    return null;
  }
}

/**
 * Synchronise tous les produits du catalogue avec HubSpot
 */
export async function syncAllProductsToHubSpot(): Promise<Record<string, string | null>> {
  const productIds: Record<string, string | null> = {};

  console.log('📤 Synchronisation des produits avec HubSpot...');

  for (const [serviceKey, service] of Object.entries(SERVICES_CATALOG)) {
    console.log(`\n📦 Service: ${service.name}`);

    for (const option of service.options) {
      const sku = `${serviceKey}-${option.name.toLowerCase().replace(/\s+/g, '-')}`;
      
      const product: HubSpotProduct = {
        name: `${service.name} - ${option.name}`,
        description: `${service.description} - ${option.name}`,
        sku,
        price: option.price,
        currency: 'EUR',
        type: 'service',
      };

      const productId = await createHubSpotProduct(product);
      productIds[sku] = productId;

      // Petit délai pour éviter de surcharger l'API
      await new Promise(resolve => setTimeout(resolve, 500));
    }
  }

  console.log('\n✅ Synchronisation des produits terminée!');
  return productIds;
}

/**
 * Crée une ligne de produit (line item) dans un deal HubSpot
 */
export async function addLineItemToDeal(
  dealId: string,
  productId: string,
  quantity: number,
  price: number
): Promise<boolean> {
  try {
    if (!HUBSPOT_API_KEY) {
      console.error('HUBSPOT_API_KEY environment variable is not set');
      return false;
    }

    const response = await fetch(
      `${HUBSPOT_API_URL}/crm/v3/objects/line_items`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${HUBSPOT_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          properties: {
            hs_product_id: productId,
            quantity: quantity.toString(),
            price: price.toString(),
            hs_recurring_billing_period: 'one_time',
          },
          associations: [
            {
              types: [{ associationCategory: 'HUBSPOT_DEFINED', associationType: 'line_item_to_deal' }],
              id: dealId,
            },
          ],
        }),
      }
    );

    if (response.ok) {
      console.log(`✅ Ligne de produit ajoutée au deal ${dealId}`);
      return true;
    } else {
      const errorData = await response.json() as any;
      console.error(`❌ Erreur ajout ligne de produit: ${response.status}`, errorData);
    }

    return false;
  } catch (error) {
    console.error('❌ Erreur lors de l\'ajout de la ligne de produit:', error);
    return false;
  }
}

/**
 * Récupère tous les produits créés dans HubSpot
 */
export async function getAllHubSpotProducts(): Promise<any[]> {
  try {
    if (!HUBSPOT_API_KEY) {
      console.error('HUBSPOT_API_KEY environment variable is not set');
      return [];
    }

    const response = await fetch(`${HUBSPOT_API_URL}/crm/v3/objects/products?limit=100`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${HUBSPOT_API_KEY}`,
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      const data = await response.json() as any;
      console.log(`✅ ${data.results.length} produits trouvés dans HubSpot`);
      return data.results;
    }

    return [];
  } catch (error) {
    console.error('❌ Erreur lors de la récupération des produits:', error);
    return [];
  }
}
