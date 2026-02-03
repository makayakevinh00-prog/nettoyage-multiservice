import { getDb } from "../db";
import { bookings } from "../../drizzle/schema";
import { eq, and, gte, lte } from "drizzle-orm";

/**
 * Vérifie si un créneau est disponible (pas de réservation dans une plage de 4h)
 */
export async function isSlotAvailable(
  service: string,
  date: string,
  time: string
): Promise<boolean> {
  const db = await getDb();
  if (!db) {
    console.warn("[Slots] Database not available, allowing booking");
    return true;
  }

  try {
    // Convertir l'heure en minutes pour calculer la plage
    const [hours, minutes] = time.split(":").map(Number);
    const timeInMinutes = hours * 60 + minutes;
    
    // Plage de 4 heures = 240 minutes
    const startTime = timeInMinutes - 120; // 2 heures avant
    const endTime = timeInMinutes + 120;   // 2 heures après

    // Convertir les minutes en format HH:MM
    const formatTime = (mins: number) => {
      const h = Math.floor(Math.max(0, Math.min(1439, mins)) / 60);
      const m = Math.max(0, Math.min(1439, mins)) % 60;
      return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
    };

    const startTimeStr = formatTime(startTime);
    const endTimeStr = formatTime(endTime);

    // Chercher les réservations existantes dans cette plage
    const existingBookings = await db
      .select()
      .from(bookings)
      .where(
        and(
          eq(bookings.service, service as any),
          eq(bookings.date, date),
          eq(bookings.status, "pending"),
          // Vérifier si le créneau chevauche la plage de 4h
          lte(bookings.time, endTimeStr),
          gte(bookings.time, startTimeStr)
        )
      );

    console.log(
      `[Slots] Vérification pour ${service} le ${date} à ${time}: ${existingBookings.length} réservation(s) trouvée(s)`
    );

    // Si plus de 3 réservations dans la plage, le créneau est complet
    return existingBookings.length < 3;
  } catch (error) {
    console.error("[Slots] Erreur lors de la vérification du créneau:", error);
    return true; // Par défaut, permettre la réservation en cas d'erreur
  }
}

/**
 * Récupère les créneaux disponibles pour un service et une date
 */
export async function getAvailableSlots(
  service: string,
  date: string
): Promise<string[]> {
  const db = await getDb();
  if (!db) {
    console.warn("[Slots] Database not available, returning all slots");
    return getDefaultTimeSlots();
  }

  try {
    const allSlots = getDefaultTimeSlots();
    const availableSlots: string[] = [];

    for (const slot of allSlots) {
      const isAvailable = await isSlotAvailable(service, date, slot);
      if (isAvailable) {
        availableSlots.push(slot);
      }
    }

    console.log(
      `[Slots] ${availableSlots.length}/${allSlots.length} créneaux disponibles pour ${service} le ${date}`
    );
    return availableSlots;
  } catch (error) {
    console.error("[Slots] Erreur lors de la récupération des créneaux:", error);
    return getDefaultTimeSlots();
  }
}

/**
 * Retourne les créneaux horaires par défaut
 */
export function getDefaultTimeSlots(): string[] {
  return [
    "08:00",
    "09:00",
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
    "18:00",
  ];
}
