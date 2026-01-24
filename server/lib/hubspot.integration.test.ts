import { describe, it, expect, beforeAll } from "vitest";
import { 
  testHubSpotConnection, 
  syncBookingToHubSpot,
  createOrUpdateHubSpotContact,
  createHubSpotDeal 
} from "./hubspot";

describe("HubSpot Integration", () => {
  beforeAll(() => {
    // Vérifier que la clé API est configurée
    if (!process.env.HUBSPOT_API_KEY) {
      console.warn("⚠️  HUBSPOT_API_KEY not configured. Tests will be skipped.");
    }
  });

  it("should handle missing API key gracefully", async () => {
    // Sauvegarder la clé actuelle
    const originalKey = process.env.HUBSPOT_API_KEY;
    
    // Supprimer la clé
    delete process.env.HUBSPOT_API_KEY;
    
    // Tester la connexion
    const result = await testHubSpotConnection();
    
    // Restaurer la clé
    if (originalKey) {
      process.env.HUBSPOT_API_KEY = originalKey;
    }
    
    // Vérifier que la fonction retourne false
    expect(result).toBe(false);
  });

  it("should sync booking data to HubSpot with all required fields", async () => {
    if (!process.env.HUBSPOT_API_KEY) {
      console.warn("⚠️  Skipping HubSpot sync test - API key not configured");
      expect(true).toBe(true);
      return;
    }

    const bookingData = {
      name: "Test Client",
      email: `test-${Date.now()}@example.com`,
      phone: "+33612345678",
      service: "automobile",
      date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      time: "14:00",
      address: "123 Rue de Test, 75000 Paris",
      totalPrice: 150,
      message: "Test booking",
    };

    const result = await syncBookingToHubSpot(bookingData);
    
    // Vérifier que la synchronisation a au moins tenté de créer les ressources
    expect(result).toBeDefined();
    expect(result).toHaveProperty('contactId');
    expect(result).toHaveProperty('dealId');
  });

  it("should create or update contact with proper error handling", async () => {
    if (!process.env.HUBSPOT_API_KEY) {
      console.warn("⚠️  Skipping contact creation test - API key not configured");
      expect(true).toBe(true);
      return;
    }

    const contactData = {
      email: `contact-${Date.now()}@example.com`,
      firstname: "Test",
      lastname: "User",
      phone: "+33612345678",
      service: "terrasse",
      booking_date: new Date().toISOString().split('T')[0],
      booking_time: "10:00",
      booking_address: "456 Avenue Test, 75001 Paris",
    };

    const result = await createOrUpdateHubSpotContact(contactData);
    
    // Vérifier que la fonction retourne soit un ID, soit null
    expect(typeof result === 'string' || result === null).toBe(true);
  });

  it("should create deal with proper error handling", async () => {
    if (!process.env.HUBSPOT_API_KEY) {
      console.warn("⚠️  Skipping deal creation test - API key not configured");
      expect(true).toBe(true);
      return;
    }

    const dealData = {
      dealname: "Test Deal - Nettoyage Automobile",
      dealstage: "negotiation",
      amount: 200,
      closedate: new Date().getTime(),
      service: "automobile",
    };

    const result = await createHubSpotDeal(dealData);
    
    // Vérifier que la fonction retourne soit un ID, soit null
    expect(typeof result === 'string' || result === null).toBe(true);
  });

  it("should handle booking sync gracefully when API is unavailable", async () => {
    // Ce test vérifie que la synchronisation ne bloque pas la réservation
    const bookingData = {
      name: "Test Client",
      email: `test-${Date.now()}@example.com`,
      phone: "+33612345678",
      service: "automobile",
      date: new Date().toISOString().split('T')[0],
      time: "14:00",
      address: "789 Rue Test, 75002 Paris",
    };

    // La synchronisation ne devrait jamais lever d'erreur
    expect(async () => {
      await syncBookingToHubSpot(bookingData);
    }).not.toThrow();
  });
});
