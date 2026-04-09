import { describe, it, expect } from "vitest";

/**
 * Test de validation des clés Qonto
 * Vérifie que les variables d'environnement Qonto sont correctement configurées
 */
describe("Qonto Configuration", () => {
  it("should have QONTO_API_KEY configured", () => {
    const apiKey = process.env.QONTO_API_KEY;
    expect(apiKey).toBeDefined();
    expect(apiKey).toBeTruthy();
    expect(typeof apiKey).toBe("string");
  });

  it("should have QONTO_ORGANIZATION_ID configured", () => {
    const orgId = process.env.QONTO_ORGANIZATION_ID;
    expect(orgId).toBeDefined();
    expect(orgId).toBeTruthy();
    expect(typeof orgId).toBe("string");
  });

  it("should have valid Qonto credentials format", () => {
    const apiKey = process.env.QONTO_API_KEY;
    const orgId = process.env.QONTO_ORGANIZATION_ID;

    // Vérifier que les clés ne sont pas vides
    expect(apiKey?.length).toBeGreaterThan(0);
    expect(orgId?.length).toBeGreaterThan(0);

    // Vérifier le format de l'organization ID (format: ei-xxx-xxx-xxx-xxxx)
    expect(orgId).toMatch(/^ei-/);
  });

  it("should validate Qonto API key format", () => {
    const apiKey = process.env.QONTO_API_KEY;
    
    // La clé API Qonto est généralement un hash hexadécimal
    expect(apiKey).toMatch(/^[a-f0-9]{32}$/);
  });
});
