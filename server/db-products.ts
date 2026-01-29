import { eq } from "drizzle-orm";
import { getDb } from "./db";
import { products, InsertProduct } from "../drizzle/schema";
import { SERVICES_CATALOG } from "./lib/hubspot-products";

/**
 * Ajoute tous les produits du catalogue dans la base de données
 */
export async function seedAllProducts(): Promise<number> {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot seed products: database not available");
    return 0;
  }

  let count = 0;

  for (const [serviceKey, service] of Object.entries(SERVICES_CATALOG)) {
    for (const option of service.options) {
      const sku = `${serviceKey}-${option.name.toLowerCase().replace(/\s+/g, '-')}`;

      try {
        // Vérifier si le produit existe déjà
        const existing = await db
          .select()
          .from(products)
          .where(eq(products.sku, sku))
          .limit(1);

        if (existing.length === 0) {
          // Créer le produit
          await db.insert(products).values({
            serviceKey,
            serviceName: service.name,
            optionName: option.name,
            description: service.description,
            price: option.price,
            currency: "EUR",
            sku,
            isActive: 1,
          });

          console.log(`✅ Produit créé: ${sku}`);
          count++;
        } else {
          console.log(`⏭️  Produit existe déjà: ${sku}`);
        }
      } catch (error) {
        console.error(`❌ Erreur création produit ${sku}:`, error);
      }
    }
  }

  console.log(`\n✅ ${count} nouveaux produits ajoutés à la base de données`);
  return count;
}

/**
 * Récupère tous les produits de la base de données
 */
export async function getAllProducts() {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get products: database not available");
    return [];
  }

  try {
    const allProducts = await db.select().from(products).where(eq(products.isActive, 1));
    console.log(`✅ ${allProducts.length} produits trouvés dans la base de données`);
    return allProducts;
  } catch (error) {
    console.error("[Database] Erreur lors de la récupération des produits:", error);
    return [];
  }
}

/**
 * Récupère les produits d'un service spécifique
 */
export async function getProductsByService(serviceKey: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get products: database not available");
    return [];
  }

  try {
    const serviceProducts = await db
      .select()
      .from(products)
      .where(eq(products.serviceKey, serviceKey));

    return serviceProducts;
  } catch (error) {
    console.error(`[Database] Erreur lors de la récupération des produits du service ${serviceKey}:`, error);
    return [];
  }
}

/**
 * Récupère un produit par son SKU
 */
export async function getProductBySku(sku: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get product: database not available");
    return null;
  }

  try {
    const result = await db
      .select()
      .from(products)
      .where(eq(products.sku, sku))
      .limit(1);

    return result.length > 0 ? result[0] : null;
  } catch (error) {
    console.error(`[Database] Erreur lors de la récupération du produit ${sku}:`, error);
    return null;
  }
}

/**
 * Récupère le détail d'un produit avec son prix formaté
 */
export async function getProductDetail(sku: string) {
  const product = await getProductBySku(sku);
  if (!product) return null;

  return {
    ...product,
    priceEur: (product.price / 100).toFixed(2),
    priceFormatted: `${(product.price / 100).toFixed(2)}€`,
  };
}

/**
 * Récupère tous les services avec leurs produits
 */
export async function getAllServicesWithProducts() {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get services: database not available");
    return {};
  }

  try {
    const allProducts = await db.select().from(products).where(eq(products.isActive, 1));

    // Grouper par service
    const grouped: Record<string, any> = {};
    for (const product of allProducts) {
      if (!grouped[product.serviceKey]) {
        grouped[product.serviceKey] = {
          serviceName: product.serviceName,
          description: product.description,
          options: [],
        };
      }
      grouped[product.serviceKey].options.push({
        optionName: product.optionName,
        price: product.price,
        priceEur: (product.price / 100).toFixed(2),
        sku: product.sku,
      });
    }

    return grouped;
  } catch (error) {
    console.error("[Database] Erreur lors de la récupération des services:", error);
    return {};
  }
}
