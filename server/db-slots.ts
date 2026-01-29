import { eq, and, gte, lte } from "drizzle-orm";
import { getDb } from "./db";
import { slotCapacity, bookings } from "../drizzle/schema";

const DEFAULT_MAX_CAPACITY = 3; // Limite par défaut: 3 réservations par jour

/**
 * Vérifie si un créneau est disponible
 */
export async function isSlotAvailable(
  service: string,
  date: string,
  time: string
): Promise<boolean> {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot check slot: database not available");
    return true; // Par défaut, disponible si pas de DB
  }

  try {
    // Chercher le créneau
    const slot = await db
      .select()
      .from(slotCapacity)
      .where(
        and(
          eq(slotCapacity.service, service),
          eq(slotCapacity.date, date),
          eq(slotCapacity.time, time)
        )
      )
      .limit(1);

    if (slot.length === 0) {
      // Créneau n'existe pas encore, donc disponible
      return true;
    }

    // Vérifier si le créneau est complet
    const currentSlot = slot[0];
    return currentSlot.currentBookings < currentSlot.maxCapacity;
  } catch (error) {
    console.error("[Database] Erreur lors de la vérification du créneau:", error);
    return true; // Par défaut, disponible en cas d'erreur
  }
}

/**
 * Récupère le nombre de réservations pour un créneau
 */
export async function getSlotBookingCount(
  service: string,
  date: string,
  time: string
): Promise<number> {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get slot count: database not available");
    return 0;
  }

  try {
    // Compter les réservations confirmées pour ce créneau
    const count = await db
      .select()
      .from(bookings)
      .where(
        and(
          eq(bookings.service, service),
          eq(bookings.date, date),
          eq(bookings.time, time),
          eq(bookings.status, "confirmed")
        )
      );

    return count.length;
  } catch (error) {
    console.error("[Database] Erreur lors du comptage des réservations:", error);
    return 0;
  }
}

/**
 * Enregistre une réservation et met à jour la capacité du créneau
 */
export async function registerSlotBooking(
  service: string,
  date: string,
  time: string
): Promise<boolean> {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot register slot: database not available");
    return false;
  }

  try {
    // Vérifier d'abord si le créneau est disponible
    const isAvailable = await isSlotAvailable(service, date, time);
    if (!isAvailable) {
      console.warn(`❌ Créneau complet: ${service} le ${date} à ${time}`);
      return false;
    }

    // Chercher ou créer le créneau
    const existingSlot = await db
      .select()
      .from(slotCapacity)
      .where(
        and(
          eq(slotCapacity.service, service),
          eq(slotCapacity.date, date),
          eq(slotCapacity.time, time)
        )
      )
      .limit(1);

    if (existingSlot.length === 0) {
      // Créer le créneau
      await db.insert(slotCapacity).values({
        service: service as any,
        date,
        time,
        maxCapacity: DEFAULT_MAX_CAPACITY,
        currentBookings: 1,
        isAvailable: 1,
      });
      console.log(`✅ Créneau créé: ${service} le ${date} à ${time} (1/${DEFAULT_MAX_CAPACITY})`);
    } else {
      // Mettre à jour le créneau
      const slot = existingSlot[0];
      const newCount = slot.currentBookings + 1;
      const isStillAvailable = newCount < DEFAULT_MAX_CAPACITY ? 1 : 0;

      await db
        .update(slotCapacity)
        .set({
          currentBookings: newCount,
          isAvailable: isStillAvailable,
        })
        .where(
          and(
            eq(slotCapacity.service, service),
            eq(slotCapacity.date, date),
            eq(slotCapacity.time, time)
          )
        );

      console.log(
        `✅ Créneau mis à jour: ${service} le ${date} à ${time} (${newCount}/${DEFAULT_MAX_CAPACITY})`
      );
    }

    return true;
  } catch (error) {
    console.error("[Database] Erreur lors de l'enregistrement du créneau:", error);
    return false;
  }
}

/**
 * Récupère les créneaux disponibles pour une date et un service
 */
export async function getAvailableSlotsForDate(
  service: string,
  date: string
): Promise<Array<{ time: string; available: number; capacity: number }>> {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get available slots: database not available");
    return [];
  }

  try {
    const slots = await db
      .select()
      .from(slotCapacity)
      .where(
        and(
          eq(slotCapacity.service, service),
          eq(slotCapacity.date, date)
        )
      );

    return slots.map(slot => ({
      time: slot.time,
      available: Math.max(0, slot.maxCapacity - slot.currentBookings),
      capacity: slot.maxCapacity,
    }));
  } catch (error) {
    console.error("[Database] Erreur lors de la récupération des créneaux:", error);
    return [];
  }
}

/**
 * Libère une réservation (diminue le compteur du créneau)
 */
export async function releaseSlotBooking(
  service: string,
  date: string,
  time: string
): Promise<boolean> {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot release slot: database not available");
    return false;
  }

  try {
    const slot = await db
      .select()
      .from(slotCapacity)
      .where(
        and(
          eq(slotCapacity.service, service),
          eq(slotCapacity.date, date),
          eq(slotCapacity.time, time)
        )
      )
      .limit(1);

    if (slot.length === 0) {
      console.warn(`⚠️  Créneau non trouvé: ${service} le ${date} à ${time}`);
      return false;
    }

    const currentSlot = slot[0];
    const newCount = Math.max(0, currentSlot.currentBookings - 1);

    await db
      .update(slotCapacity)
      .set({
        currentBookings: newCount,
        isAvailable: 1, // Toujours disponible après libération
      })
      .where(
        and(
          eq(slotCapacity.service, service),
          eq(slotCapacity.date, date),
          eq(slotCapacity.time, time)
        )
      );

    console.log(
      `✅ Créneau libéré: ${service} le ${date} à ${time} (${newCount}/${DEFAULT_MAX_CAPACITY})`
    );
    return true;
  } catch (error) {
    console.error("[Database] Erreur lors de la libération du créneau:", error);
    return false;
  }
}

/**
 * Récupère les statistiques des créneaux pour une date
 */
export async function getSlotStatisticsForDate(
  date: string
): Promise<Record<string, { total: number; available: number; booked: number }>> {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get slot statistics: database not available");
    return {};
  }

  try {
    const slots = await db
      .select()
      .from(slotCapacity)
      .where(eq(slotCapacity.date, date));

    const stats: Record<string, { total: number; available: number; booked: number }> = {};

    for (const slot of slots) {
      if (!stats[slot.service]) {
        stats[slot.service] = { total: 0, available: 0, booked: 0 };
      }
      stats[slot.service].total += 1;
      stats[slot.service].booked += slot.currentBookings;
      stats[slot.service].available += Math.max(0, slot.maxCapacity - slot.currentBookings);
    }

    return stats;
  } catch (error) {
    console.error("[Database] Erreur lors de la récupération des statistiques:", error);
    return {};
  }
}
