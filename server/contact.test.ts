import { describe, expect, it, vi } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";
import * as notification from "./_core/notification";

// Mock the notifyOwner function
vi.mock("./_core/notification", () => ({
  notifyOwner: vi.fn().mockResolvedValue(true),
}));

function createMockContext(): TrpcContext {
  return {
    user: null,
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {} as TrpcContext["res"],
  };
}

describe("contact.sendQuote", () => {
  it("should send a quote request successfully", async () => {
    const ctx = createMockContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.contact.sendQuote({
      name: "Jean Dupont",
      email: "jean.dupont@example.com",
      phone: "0612345678",
      service: "Nettoyage Automobile",
      message: "Je souhaite un devis pour mon véhicule",
    });

    expect(result).toEqual({ success: true });
    expect(notification.notifyOwner).toHaveBeenCalledWith({
      title: "Nouvelle demande de devis - Nettoyage Automobile",
      content: expect.stringContaining("Jean Dupont"),
    });
  });

  it("should handle quote request without message", async () => {
    const ctx = createMockContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.contact.sendQuote({
      name: "Marie Martin",
      email: "marie@example.com",
      phone: "0698765432",
      service: "Nettoyage Terrasse",
    });

    expect(result).toEqual({ success: true });
    expect(notification.notifyOwner).toHaveBeenCalledWith({
      title: "Nouvelle demande de devis - Nettoyage Terrasse",
      content: expect.stringContaining("Aucun message supplémentaire"),
    });
  });
});

describe("contact.sendBooking", () => {
  it("should send a booking request successfully", async () => {
    const ctx = createMockContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.contact.sendBooking({
      name: "Pierre Dubois",
      email: "pierre@example.com",
      phone: "0611223344",
      service: "automobile",
      date: "2024-12-25",
      time: "14:00",
      address: "12 Rue de la Paix, 75001 Paris",
      message: "Préférence pour l'après-midi",
    });

    expect(result).toEqual({ success: true });
    expect(notification.notifyOwner).toHaveBeenCalledWith({
      title: expect.stringContaining("2024-12-25"),
      content: expect.stringContaining("Pierre Dubois"),
    });
  });

  it("should handle booking without additional message", async () => {
    const ctx = createMockContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.contact.sendBooking({
      name: "Sophie Laurent",
      email: "sophie@example.com",
      phone: "0655443322",
      service: "tapis",
      date: "2024-12-30",
      time: "10:00",
      address: "5 Avenue des Champs, 75008 Paris",
    });

    expect(result).toEqual({ success: true });
    expect(notification.notifyOwner).toHaveBeenCalledWith({
      title: expect.stringContaining("2024-12-30"),
      content: expect.stringContaining("Aucune information supplémentaire"),
    });
  });

  it("should validate required fields", async () => {
    const ctx = createMockContext();
    const caller = appRouter.createCaller(ctx);

    await expect(
      caller.contact.sendBooking({
        name: "",
        email: "invalid-email",
        phone: "123",
        service: "automobile",
        date: "2024-12-25",
        time: "14:00",
        address: "Test Address",
      })
    ).rejects.toThrow();
  });
});
