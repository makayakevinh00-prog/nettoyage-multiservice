import { describe, it, expect } from "vitest";
import { syncAllProductsToHubSpot, getAllHubSpotProducts, SERVICES_CATALOG } from "./hubspot-products";

describe("HubSpot Products Synchronization", () => {
  it("should have all services defined in catalog", () => {
    expect(SERVICES_CATALOG).toBeDefined();
    expect(Object.keys(SERVICES_CATALOG).length).toBeGreaterThan(0);

    // Vérifier que chaque service a des options
    for (const [key, service] of Object.entries(SERVICES_CATALOG)) {
      expect(service.name).toBeDefined();
      expect(service.description).toBeDefined();
      expect(service.options).toBeDefined();
      expect(service.options.length).toBeGreaterThan(0);
      console.log(`✅ Service ${key}: ${service.name} avec ${service.options.length} options`);
    }
  });

  it("should count total products in catalog", () => {
    let totalProducts = 0;
    for (const service of Object.values(SERVICES_CATALOG)) {
      totalProducts += service.options.length;
    }
    console.log(`📊 Total de produits dans le catalogue: ${totalProducts}`);
    expect(totalProducts).toBeGreaterThan(0);
  });

  it("should sync all products to HubSpot", async () => {
    // Ce test crée 21 produits, donc il faut plus de temps
    if (!process.env.HUBSPOT_API_KEY) {
      console.warn("⚠️  Skipping product sync test - API key not configured");
      expect(true).toBe(true);
      return;
    }

    console.log("📤 Synchronisation de tous les produits...");
    const productIds = await syncAllProductsToHubSpot();

    expect(productIds).toBeDefined();
    
    // Compter les produits synchronisés avec succès
    const successCount = Object.values(productIds).filter(id => id !== null).length;
    console.log(`✅ ${successCount} produits synchronisés avec succès`);
    
    expect(successCount).toBeGreaterThan(0);
  }, { timeout: 60000 });

  it("should retrieve all products from HubSpot", async () => {
    if (!process.env.HUBSPOT_API_KEY) {
      console.warn("⚠️  Skipping product retrieval test - API key not configured");
      expect(true).toBe(true);
      return;
    }

    console.log("📥 Récupération des produits depuis HubSpot...");
    const products = await getAllHubSpotProducts();

    expect(products).toBeDefined();
    expect(Array.isArray(products)).toBe(true);
    
    if (products.length > 0) {
      console.log(`✅ ${products.length} produits trouvés dans HubSpot`);
      
      // Afficher les premiers produits
      products.slice(0, 3).forEach(product => {
        console.log(`  - ${product.properties.name}`);
      });
    }
  });

  it("should verify all service options have prices", () => {
    for (const [serviceKey, service] of Object.entries(SERVICES_CATALOG)) {
      for (const option of service.options) {
        expect(option.price).toBeGreaterThan(0);
        expect(option.name).toBeDefined();
      }
    }
    console.log("✅ Tous les services ont des prix valides");
  });

  it("should list all services and their options", () => {
    console.log("\n📋 Catalogue complet des services:\n");
    
    for (const [serviceKey, service] of Object.entries(SERVICES_CATALOG)) {
      console.log(`\n🏷️  ${service.name}`);
      console.log(`   Description: ${service.description}`);
      console.log(`   Options:`);
      
      for (const option of service.options) {
        const priceEur = (option.price / 100).toFixed(2);
        console.log(`     • ${option.name}: ${priceEur}€`);
      }
    }
  });
});
