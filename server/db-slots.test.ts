import { describe, it, expect } from "vitest";
import {
  isSlotAvailable,
  getSlotBookingCount,
  registerSlotBooking,
  releaseSlotBooking,
  getAvailableSlotsForDate,
  getSlotStatisticsForDate,
} from "./db-slots";

describe("Slot Capacity Management", () => {
  const testService = "automobile";
  const testDate = "2026-02-05";
  const testTime = "14:30";

  it("should check if a slot is available", async () => {
    console.log("🔍 Vérification de la disponibilité du créneau...");
    const available = await isSlotAvailable(testService, testDate, testTime);
    expect(typeof available).toBe("boolean");
    console.log(`✅ Créneau disponible: ${available}`);
  });

  it("should get booking count for a slot", async () => {
    console.log("📊 Récupération du nombre de réservations...");
    const count = await getSlotBookingCount(testService, testDate, testTime);
    expect(typeof count).toBe("number");
    expect(count).toBeGreaterThanOrEqual(0);
    console.log(`✅ Nombre de réservations: ${count}`);
  });

  it("should register a slot booking", async () => {
    console.log("📝 Enregistrement d'une réservation...");
    const registered = await registerSlotBooking(testService, testDate, testTime);
    expect(typeof registered).toBe("boolean");
    console.log(`✅ Réservation enregistrée: ${registered}`);
  });

  it("should track slot capacity correctly", async () => {
    console.log("📈 Vérification de la capacité du créneau...");
    
    // Enregistrer 3 réservations
    for (let i = 0; i < 3; i++) {
      const registered = await registerSlotBooking(testService, testDate, "15:00");
      expect(registered).toBe(true);
      console.log(`  ✅ Réservation ${i + 1}/3 enregistrée`);
    }

    // La 4ème devrait échouer (créneau complet)
    const fourthBooking = await registerSlotBooking(testService, testDate, "15:00");
    expect(fourthBooking).toBe(false);
    console.log(`  ❌ 4ème réservation rejetée (créneau complet)`);
  });

  it("should release a slot booking", async () => {
    console.log("🔓 Libération d'une réservation...");
    const released = await releaseSlotBooking(testService, testDate, "15:00");
    expect(typeof released).toBe("boolean");
    console.log(`✅ Réservation libérée: ${released}`);
  });

  it("should get available slots for a date", async () => {
    console.log("📅 Récupération des créneaux disponibles...");
    const slots = await getAvailableSlotsForDate(testService, testDate);
    expect(Array.isArray(slots)).toBe(true);
    console.log(`✅ ${slots.length} créneaux trouvés`);
    
    slots.slice(0, 3).forEach(slot => {
      console.log(`  - ${slot.time}: ${slot.available}/${slot.capacity} disponibles`);
    });
  });

  it("should get slot statistics for a date", async () => {
    console.log("📊 Récupération des statistiques des créneaux...");
    const stats = await getSlotStatisticsForDate(testDate);
    expect(typeof stats).toBe("object");
    
    console.log(`✅ Statistiques pour ${testDate}:`);
    for (const [service, stat] of Object.entries(stats)) {
      console.log(`  - ${service}: ${stat.booked}/${stat.total} réservés, ${stat.available} disponibles`);
    }
  });

  it("should prevent overbooking", async () => {
    console.log("🚫 Test de prévention du surréservation...");
    
    const testTime2 = "16:00";
    let successCount = 0;

    // Essayer de réserver 5 fois (max 3)
    for (let i = 0; i < 5; i++) {
      const registered = await registerSlotBooking(testService, testDate, testTime2);
      if (registered) {
        successCount++;
        console.log(`  ✅ Réservation ${i + 1} acceptée`);
      } else {
        console.log(`  ❌ Réservation ${i + 1} rejetée`);
      }
    }

    expect(successCount).toBeLessThanOrEqual(3);
    console.log(`✅ Surréservation bloquée: ${successCount}/5 acceptées`);
  });
});
