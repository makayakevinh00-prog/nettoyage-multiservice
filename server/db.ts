import { eq, and, gte, lte } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { InsertUser, users, bookings, InsertBooking, testimonials, InsertTestimonial, feedbacks, InsertFeedback, Feedback } from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = 'admin';
      updateSet.role = 'admin';
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

// Booking queries
export async function createBooking(data: InsertBooking) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot create booking: database not available");
    return undefined;
  }
  try {
    const result = await db.insert(bookings).values(data);
    return result;
  } catch (error) {
    console.error("[Database] Failed to create booking:", error);
    throw error;
  }
}

export async function getBookingsByDateRange(startDate: string, endDate: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get bookings: database not available");
    return [];
  }
  try {
    const result = await db
      .select()
      .from(bookings)
      .where(
        and(
          gte(bookings.date, startDate),
          lte(bookings.date, endDate)
        )
      );
    return result;
  } catch (error) {
    console.error("[Database] Failed to get bookings:", error);
    return [];
  }
}

export async function getBookingById(id: number) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get booking: database not available");
    return undefined;
  }
  try {
    const result = await db
      .select()
      .from(bookings)
      .where(eq(bookings.id, id))
      .limit(1);
    return result.length > 0 ? result[0] : undefined;
  } catch (error) {
    console.error("[Database] Failed to get booking:", error);
    return undefined;
  }
}

// Testimonial queries
export async function createTestimonial(data: InsertTestimonial) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot create testimonial: database not available");
    return undefined;
  }
  try {
    const result = await db.insert(testimonials).values(data);
    return result;
  } catch (error) {
    console.error("[Database] Failed to create testimonial:", error);
    throw error;
  }
}

export async function getApprovedTestimonials() {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get testimonials: database not available");
    return [];
  }
  try {
    const result = await db
      .select()
      .from(testimonials)
      .where(eq(testimonials.isApproved, 1))
      .orderBy(testimonials.createdAt);
    return result;
  } catch (error) {
    console.error("[Database] Failed to get testimonials:", error);
    return [];
  }
}

export async function getPendingTestimonials() {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get pending testimonials: database not available");
    return [];
  }
  try {
    const result = await db
      .select()
      .from(testimonials)
      .where(eq(testimonials.isApproved, 0))
      .orderBy(testimonials.createdAt);
    return result;
  } catch (error) {
    console.error("[Database] Failed to get pending testimonials:", error);
    return [];
  }
}

export async function approveTestimonial(id: number) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot approve testimonial: database not available");
    return undefined;
  }
  try {
    const result = await db
      .update(testimonials)
      .set({ isApproved: 1 })
      .where(eq(testimonials.id, id));
    return result;
  } catch (error) {
    console.error("[Database] Failed to approve testimonial:", error);
    throw error;
  }
}

export async function deleteTestimonial(id: number) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot delete testimonial: database not available");
    return undefined;
  }
  try {
    const result = await db
      .delete(testimonials)
      .where(eq(testimonials.id, id));
    return result;
  } catch (error) {
    console.error("[Database] Failed to delete testimonial:", error);
    throw error;
  }
}

// Booking queries - Advanced
export async function getBookingsByUserId(userId: number) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get bookings: database not available");
    return [];
  }
  try {
    const result = await db
      .select()
      .from(bookings)
      .where(eq(bookings.userId, userId))
      .orderBy(bookings.createdAt);
    return result;
  } catch (error) {
    console.error("[Database] Failed to get bookings by user:", error);
    return [];
  }
}

export async function getBookingsByEmail(email: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get bookings: database not available");
    return [];
  }
  try {
    const result = await db
      .select()
      .from(bookings)
      .where(eq(bookings.email, email))
      .orderBy(bookings.createdAt);
    return result;
  } catch (error) {
    console.error("[Database] Failed to get bookings by email:", error);
    return [];
  }
}

export async function updateBooking(id: number, data: Partial<InsertBooking>) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot update booking: database not available");
    return undefined;
  }
  try {
    const result = await db
      .update(bookings)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(bookings.id, id));
    return result;
  } catch (error) {
    console.error("[Database] Failed to update booking:", error);
    throw error;
  }
}

export async function cancelBooking(id: number) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot cancel booking: database not available");
    return undefined;
  }
  try {
    const result = await db
      .update(bookings)
      .set({ status: "cancelled", updatedAt: new Date() })
      .where(eq(bookings.id, id));
    return result;
  } catch (error) {
    console.error("[Database] Failed to cancel booking:", error);
    throw error;
  }
}

// Feedback queries
export async function createFeedback(data: InsertFeedback) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot create feedback: database not available");
    return undefined;
  }
  try {
    const result = await db.insert(feedbacks).values(data);
    return result;
  } catch (error) {
    console.error("[Database] Failed to create feedback:", error);
    throw error;
  }
}

export async function getFeedbackByBookingId(bookingId: number) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get feedback: database not available");
    return undefined;
  }
  try {
    const result = await db
      .select()
      .from(feedbacks)
      .where(eq(feedbacks.bookingId, bookingId))
      .limit(1);
    return result.length > 0 ? result[0] : undefined;
  } catch (error) {
    console.error("[Database] Failed to get feedback:", error);
    return undefined;
  }
}

export async function getApprovedFeedbacks() {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get feedbacks: database not available");
    return [];
  }
  try {
    const result = await db
      .select()
      .from(feedbacks)
      .where(eq(feedbacks.isApproved, 1))
      .orderBy(feedbacks.createdAt);
    return result;
  } catch (error) {
    console.error("[Database] Failed to get feedbacks:", error);
    return [];
  }
}

export async function getPendingFeedbacks() {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get pending feedbacks: database not available");
    return [];
  }
  try {
    const result = await db
      .select()
      .from(feedbacks)
      .where(eq(feedbacks.isApproved, 0))
      .orderBy(feedbacks.createdAt);
    return result;
  } catch (error) {
    console.error("[Database] Failed to get pending feedbacks:", error);
    return [];
  }
}

export async function approveFeedback(id: number) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot approve feedback: database not available");
    return undefined;
  }
  try {
    const result = await db
      .update(feedbacks)
      .set({ isApproved: 1 })
      .where(eq(feedbacks.id, id));
    return result;
  } catch (error) {
    console.error("[Database] Failed to approve feedback:", error);
    throw error;
  }
}

export async function deleteFeedback(id: number) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot delete feedback: database not available");
    return undefined;
  }
  try {
    const result = await db
      .delete(feedbacks)
      .where(eq(feedbacks.id, id));
    return result;
  } catch (error) {
    console.error("[Database] Failed to delete feedback:", error);
    throw error;
  }
}

// TODO: add feature queries here as your schema grows.
