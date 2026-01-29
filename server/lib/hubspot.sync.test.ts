import { describe, it, expect } from "vitest";
import { syncBookingToHubSpot } from "./hubspot";

describe("HubSpot Full Booking Sync", () => {
  it("should sync complete booking data to HubSpot with all details", async () => {
    if (!process.env.HUBSPOT_API_KEY) {
      console.warn("⚠️  Skipping HubSpot sync test - API key not configured");
      expect(true).toBe(true);
      return;
    }

    const bookingData = {
      name: "Jean Dupont",
      email: `booking-test-${Date.now()}@example.com`,
      phone: "+33612345678",
      service: "automobile",
      serviceOption: "Lavage complet + lustrage",
      date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      time: "14:30",
      address: "123 Rue de la Paix, 75000 Paris",
      totalPrice: 9000, // 90€
      message: "Voiture très sale, besoin d'un nettoyage complet",
    };

    console.log("📤 Envoi de la réservation à HubSpot...");
    console.log("Données:", bookingData);

    const result = await syncBookingToHubSpot(bookingData);

    console.log("✅ Résultat de la synchronisation:", result);

    // Vérifier que la synchronisation a réussi
    expect(result).toBeDefined();
    expect(result).toHaveProperty('contactId');
    expect(result).toHaveProperty('dealId');
    
    // Vérifier que les IDs sont présents (au moins l'un des deux)
    const hasContactOrDeal = result.contactId !== null || result.dealId !== null;
    expect(hasContactOrDeal).toBe(true);

    console.log("✅ Contact ID:", result.contactId);
    console.log("✅ Deal ID:", result.dealId);
  });

  it("should sync terrasse booking with different service option", async () => {
    if (!process.env.HUBSPOT_API_KEY) {
      console.warn("⚠️  Skipping terrasse sync test - API key not configured");
      expect(true).toBe(true);
      return;
    }

    const bookingData = {
      name: "Marie Martin",
      email: `terrasse-test-${Date.now()}@example.com`,
      phone: "+33687654321",
      service: "terrasse",
      serviceOption: "Terrasse 40-60m²",
      date: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      time: "10:00",
      address: "456 Avenue des Champs, 75008 Paris",
      totalPrice: 20000, // 200€
      message: "Terrasse très encrassée, besoin d'un nettoyage haute pression",
    };

    console.log("📤 Envoi de la réservation terrasse à HubSpot...");

    const result = await syncBookingToHubSpot(bookingData);

    expect(result).toBeDefined();
    expect(result).toHaveProperty('contactId');
    expect(result).toHaveProperty('dealId');

    console.log("✅ Terrasse booking synced - Contact:", result.contactId, "Deal:", result.dealId);
  });

  it("should sync tapis booking with quantity", async () => {
    if (!process.env.HUBSPOT_API_KEY) {
      console.warn("⚠️  Skipping tapis sync test - API key not configured");
      expect(true).toBe(true);
      return;
    }

    const bookingData = {
      name: "Pierre Leclerc",
      email: `tapis-test-${Date.now()}@example.com`,
      phone: "+33698765432",
      service: "tapis",
      serviceOption: "Tapis moyen (3-6m²) x2",
      date: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      time: "15:00",
      address: "789 Boulevard Saint-Germain, 75006 Paris",
      totalPrice: 14000, // 140€ pour 2 tapis
      message: "Deux tapis à nettoyer en injection-extraction",
    };

    console.log("📤 Envoi de la réservation tapis à HubSpot...");

    const result = await syncBookingToHubSpot(bookingData);

    expect(result).toBeDefined();
    expect(result).toHaveProperty('contactId');
    expect(result).toHaveProperty('dealId');

    console.log("✅ Tapis booking synced - Contact:", result.contactId, "Deal:", result.dealId);
  });

  it("should verify that all booking types sync successfully", async () => {
    // Augmenter le timeout pour ce test qui crée plusieurs réservations
    if (!process.env.HUBSPOT_API_KEY) {
      console.warn("⚠️  Skipping multi-service sync test - API key not configured");
      expect(true).toBe(true);
      return;
    }

    const services = [
      { service: "automobile", option: "Lavage complet", price: 9000 },
      { service: "terrasse", option: "Terrasse 20-40m²", price: 14000 },
      { service: "tapis", option: "Tapis grand (> 6m²)", price: 11000 },
      { service: "balcon", option: "Balcon avec garde-corps", price: 7000 },
      { service: "facade", option: "Nettoyage façade", price: 15000 },
    ];

    const results = [];

    for (const svc of services) {
      const bookingData = {
        name: `Test ${svc.service}`,
        email: `${svc.service}-${Date.now()}@example.com`,
        phone: "+33612345678",
        service: svc.service,
        serviceOption: svc.option,
        date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        time: "14:00",
        address: "Test Address, Paris",
        totalPrice: svc.price,
      };

      const result = await syncBookingToHubSpot(bookingData);
      results.push({ service: svc.service, result });

      console.log(`✅ ${svc.service} synced - Contact: ${result.contactId}, Deal: ${result.dealId}`);
    }

    // Vérifier que tous les services ont été synchronisés
    expect(results.length).toBe(services.length);
    results.forEach((r) => {
      expect(r.result).toBeDefined();
      expect(r.result).toHaveProperty('contactId');
      expect(r.result).toHaveProperty('dealId');
    });

    console.log("✅ All services synced successfully!");
  }, { timeout: 30000 });
});
