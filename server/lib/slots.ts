import { getDb } from "../db";
import { bookings } from "../../drizzle/schema";
import { eq, and, gte, lte } from "drizzle-orm";
import { isTimeSlotOccupied } from "./googleCalendar";

/**
 * Vérifie si un créneau est disponible (max 3 réservations par créneau de 2h)
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
    // DÉSACTIVÉ TEMPORAIREMENT: Vérifier si le créneau est occupé dans Google Calendar
    // const isOccupiedInCalendar = await isTimeSlotOccupied(date, time);
    // if (isOccupiedInCalendar) {
    //   console.log(`[Slots] Créneau ${time} occupé dans Google Calendar`);
    //   return false;
    // }

    // Convertir l'heure en minutes pour calculer la plage
    const [hours, minutes] = time.split(":").map(Number);
    const timeInMinutes = hours * 60 + minutes;
    
    // Plage de 2 heures = 120 minutes
    const startTime = timeInMinutes;
    const endTime = timeInMinutes + 120;

    // Convertir les minutes en format HH:MM
    const formatTime = (mins: number) => {
      const h = Math.floor(Math.max(0, Math.min(1439, mins)) / 60);
      const m = Math.max(0, Math.min(1439, mins)) % 60;
      return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
    };

    const startTimeStr = formatTime(startTime);
    const endTimeStr = formatTime(endTime);

    // Chercher les réservations existantes dans cette plage de 2h
    const existingBookings = await db
      .select()
      .from(bookings)
      .where(
        and(
          eq(bookings.service, service as any),
          eq(bookings.date, date),
          eq(bookings.status, "pending"),
          // Vérifier si le créneau chevauche la plage de 2h
          lte(bookings.time, endTimeStr),
          gte(bookings.time, startTimeStr)
        )
      );

    console.log(
      `[Slots] Vérification pour ${service} le ${date} à ${time}: ${existingBookings.length} réservation(s) trouvée(s)`
    );

    // Si 3 réservations ou plus dans la plage, le créneau est complet
    return existingBookings.length < 3;
  } catch (error) {
    console.error("[Slots] Erreur lors de la vérification du créneau:", error);
    return true; // Par défaut, permettre la réservation en cas d'erreur
  }
}

/**
 * Récupère les créneaux disponibles pour un service et une date
 * Limite à 3 réservations max par créneau de 2h
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
    // Créneaux de 2h : 08:00-10:00, 10:00-12:00, 12:00-14:00, 14:00-16:00, 16:00-18:00, 18:00-20:00
    const timeSlots2h = ['08:00', '10:00', '12:00', '14:00', '16:00', '18:00'];
    const availableSlots: string[] = [];

    for (const slot of timeSlots2h) {
      const isAvailable = await isSlotAvailable(service, date, slot);
      if (isAvailable) {
        availableSlots.push(slot);
      }
    }

    console.log(
      `[Slots] ${availableSlots.length}/${timeSlots2h.length} créneaux disponibles pour ${service} le ${date}`
    );
    return availableSlots;
  } catch (error) {
    console.error("[Slots] Erreur lors de la récupération des créneaux:", error);
    return ['08:00', '10:00', '12:00', '14:00', '16:00', '18:00'];
  }
}

/**
 * Retourne les créneaux horaires par défaut (tranches de 2h)
 */
export function getDefaultTimeSlots(): string[] {
  return [
    "08:00",
    "10:00",
    "12:00",
    "14:00",
    "16:00",
    "18:00",
  ];
}
