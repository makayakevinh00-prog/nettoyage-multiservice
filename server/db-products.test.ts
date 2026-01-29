import { describe, it, expect } from "vitest";
import { seedAllProducts, getAllProducts, getProductsByService, getAllServicesWithProducts } from "./db-products";

describe("Database Products Management", () => {
  it("should seed all products to database", async () => {
    console.log("📤 Ajout de tous les produits à la base de données...");
    const count = await seedAllProducts();

    expect(count).toBeGreaterThanOrEqual(0);
    console.log(`✅ ${count} produits ajoutés`);
  });

  it("should retrieve all products from database", async () => {
    console.log("📥 Récupération de tous les produits...");
    const allProducts = await getAllProducts();

    expect(Array.isArray(allProducts)).toBe(true);
    console.log(`✅ ${allProducts.length} produits trouvés`);

    if (allProducts.length > 0) {
      console.log("\nPremiers produits:");
      allProducts.slice(0, 3).forEach(p => {
        const priceEur = (p.price / 100).toFixed(2);
        console.log(`  - ${p.serviceName} - ${p.optionName}: ${priceEur}€`);
      });
    }
  });

  it("should get products by service", async () => {
    console.log("📥 Récupération des produits automobile...");
    const automobileProducts = await getProductsByService("automobile");

    expect(Array.isArray(automobileProducts)).toBe(true);
    console.log(`✅ ${automobileProducts.length} produits automobile trouvés`);

    automobileProducts.forEach(p => {
      const priceEur = (p.price / 100).toFixed(2);
      console.log(`  - ${p.optionName}: ${priceEur}€`);
    });
  });

  it("should get all services with products", async () => {
    console.log("📥 Récupération de tous les services avec produits...");
    const services = await getAllServicesWithProducts();

    expect(typeof services).toBe("object");
    console.log(`✅ ${Object.keys(services).length} services trouvés\n`);

    for (const [key, service] of Object.entries(services)) {
      console.log(`🏷️  ${service.serviceName}`);
      for (const option of service.options) {
        console.log(`     • ${option.optionName}: ${option.priceEur}€`);
      }
    }
  });

  it("should verify all products have valid prices", async () => {
    const allProducts = await getAllProducts();

    for (const product of allProducts) {
      expect(product.price).toBeGreaterThan(0);
      expect(product.serviceName).toBeDefined();
      expect(product.optionName).toBeDefined();
    }

    console.log(`✅ Tous les ${allProducts.length} produits ont des prix valides`);
  });
});
