import { getDb } from "./db";
import { bookings, integrationLogs, InsertIntegrationLog } from "../drizzle/schema";
import { eq, desc, and, gte, lte } from "drizzle-orm";

/**
 * Récupère toutes les réservations avec pagination
 */
export async function getAllBookings(
  limit: number = 20,
  offset: number = 0,
  filters?: {
    status?: string;
    service?: string;
    dateFrom?: string;
    dateTo?: string;
  }
) {
  const db = await getDb();
  if (!db) {
    console.warn("[Admin] Database not available");
    return { bookings: [], total: 0 };
  }

  try {
    let query = db.select().from(bookings);

    // Appliquer les filtres
    const conditions = [];
    if (filters?.status) {
      conditions.push(eq(bookings.status, filters.status as any));
    }
    if (filters?.service) {
      conditions.push(eq(bookings.service, filters.service as any));
    }
    if (filters?.dateFrom) {
      conditions.push(gte(bookings.date, filters.dateFrom));
    }
    if (filters?.dateTo) {
      conditions.push(lte(bookings.date, filters.dateTo));
    }

    if (conditions.length > 0) {
      query = query.where(and(...conditions));
    }

    // Récupérer le total
    const allBookings = await query;
    const total = allBookings.length;

    // Appliquer la pagination et le tri
    const result = await db
      .select()
      .from(bookings)
      .where(conditions.length > 0 ? and(...conditions) : undefined)
      .orderBy(desc(bookings.createdAt))
      .limit(limit)
      .offset(offset);

    return { bookings: result, total };
  } catch (error) {
    console.error("[Admin] Failed to get bookings:", error);
    return { bookings: [], total: 0 };
  }
}

/**
 * Récupère une réservation par ID
 */
export async function getBookingById(bookingId: number) {
  const db = await getDb();
  if (!db) {
    console.warn("[Admin] Database not available");
    return null;
  }

  try {
    const result = await db
      .select()
      .from(bookings)
      .where(eq(bookings.id, bookingId))
      .limit(1);

    return result.length > 0 ? result[0] : null;
  } catch (error) {
    console.error("[Admin] Failed to get booking:", error);
    return null;
  }
}

/**
 * Crée un log d'intégration
 */
export async function createIntegrationLog(log: InsertIntegrationLog) {
  const db = await getDb();
  if (!db) {
    console.warn("[Admin] Database not available");
    return null;
  }

  try {
    await db.insert(integrationLogs).values(log);
    return true;
  } catch (error) {
    console.error("[Admin] Failed to create integration log:", error);
    return false;
  }
}

/**
 * Récupère les logs d'intégration pour une réservation
 */
export async function getIntegrationLogsByBookingId(bookingId: number) {
  const db = await getDb();
  if (!db) {
    console.warn("[Admin] Database not available");
    return [];
  }

  try {
    const result = await db
      .select()
      .from(integrationLogs)
      .where(eq(integrationLogs.bookingId, bookingId))
      .orderBy(desc(integrationLogs.createdAt));

    return result;
  } catch (error) {
    console.error("[Admin] Failed to get integration logs:", error);
    return [];
  }
}

/**
 * Récupère tous les logs d'intégration avec pagination
 */
export async function getAllIntegrationLogs(
  limit: number = 50,
  offset: number = 0,
  filters?: {
    service?: string;
    status?: string;
    dateFrom?: string;
    dateTo?: string;
  }
) {
  const db = await getDb();
  if (!db) {
    console.warn("[Admin] Database not available");
    return { logs: [], total: 0 };
  }

  try {
    const conditions = [];
    if (filters?.service) {
      conditions.push(eq(integrationLogs.service, filters.service));
    }
    if (filters?.status) {
      conditions.push(eq(integrationLogs.status, filters.status as any));
    }
    if (filters?.dateFrom) {
      conditions.push(gte(integrationLogs.createdAt, new Date(filters.dateFrom)));
    }
    if (filters?.dateTo) {
      conditions.push(lte(integrationLogs.createdAt, new Date(filters.dateTo)));
    }

    // Récupérer le total
    let countQuery = db.select().from(integrationLogs);
    if (conditions.length > 0) {
      countQuery = countQuery.where(and(...conditions));
    }
    const allLogs = await countQuery;
    const total = allLogs.length;

    // Récupérer les logs avec pagination
    let query = db
      .select()
      .from(integrationLogs)
      .orderBy(desc(integrationLogs.createdAt))
      .limit(limit)
      .offset(offset);

    if (conditions.length > 0) {
      query = query.where(and(...conditions));
    }

    const result = await query;
    return { logs: result, total };
  } catch (error) {
    console.error("[Admin] Failed to get integration logs:", error);
    return { logs: [], total: 0 };
  }
}

/**
 * Récupère les statistiques des réservations
 */
export async function getBookingStats() {
  const db = await getDb();
  if (!db) {
    console.warn("[Admin] Database not available");
    return {
      total: 0,
      pending: 0,
      confirmed: 0,
      completed: 0,
      cancelled: 0,
      totalRevenue: 0,
    };
  }

  try {
    const allBookings = await db.select().from(bookings);

    const stats = {
      total: allBookings.length,
      pending: allBookings.filter((b) => b.status === "pending").length,
      confirmed: allBookings.filter((b) => b.status === "confirmed").length,
      completed: allBookings.filter((b) => b.status === "completed").length,
      cancelled: allBookings.filter((b) => b.status === "cancelled").length,
      totalRevenue: allBookings.reduce((sum, b) => sum + (b.totalPrice || 0), 0) / 100, // Convertir centimes en euros
    };

    return stats;
  } catch (error) {
    console.error("[Admin] Failed to get booking stats:", error);
    return {
      total: 0,
      pending: 0,
      confirmed: 0,
      completed: 0,
      cancelled: 0,
      totalRevenue: 0,
    };
  }
}

/**
 * Met à jour le statut d'une réservation
 */
export async function updateBookingStatus(bookingId: number, status: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Admin] Database not available");
    return false;
  }

  try {
    await db
      .update(bookings)
      .set({ status: status as any })
      .where(eq(bookings.id, bookingId));
    return true;
  } catch (error) {
    console.error("[Admin] Failed to update booking status:", error);
    return false;
  }
}

/**
 * Récupère les statistiques des intégrations
 */
export async function getIntegrationStats() {
  const db = await getDb();
  if (!db) {
    console.warn("[Admin] Database not available");
    return {
      total: 0,
      success: 0,
      error: 0,
      pending: 0,
      retry: 0,
      byService: {},
    };
  }

  try {
    const allLogs = await db.select().from(integrationLogs);

    const stats = {
      total: allLogs.length,
      success: allLogs.filter((l) => l.status === "success").length,
      error: allLogs.filter((l) => l.status === "error").length,
      pending: allLogs.filter((l) => l.status === "pending").length,
      retry: allLogs.filter((l) => l.status === "retry").length,
      byService: {} as Record<string, number>,
    };

    // Compter par service
    allLogs.forEach((log) => {
      stats.byService[log.service] = (stats.byService[log.service] || 0) + 1;
    });

    return stats;
  } catch (error) {
    console.error("[Admin] Failed to get integration stats:", error);
    return {
      total: 0,
      success: 0,
      error: 0,
      pending: 0,
      retry: 0,
      byService: {},
    };
  }
}
