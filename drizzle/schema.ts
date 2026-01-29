import { int, mysqlEnum, mysqlTable, text, timestamp, varchar } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users = mysqlTable("users", {
  /**
   * Surrogate primary key. Auto-incremented numeric value managed by the database.
   * Use this for relations between tables.
   */
  id: int("id").autoincrement().primaryKey(),
  /** Manus OAuth identifier (openId) returned from the OAuth callback. Unique per user. */
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

// Table pour les réservations
export const bookings = mysqlTable("bookings", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId"), // Lien vers l'utilisateur connecté (optionnel pour les réservations anonymes)
  name: varchar("name", { length: 100 }).notNull(),
  email: varchar("email", { length: 320 }).notNull(),
  phone: varchar("phone", { length: 20 }).notNull(),
  service: mysqlEnum("service", ["automobile", "terrasse", "tapis", "balcon", "jardinage"]).notNull(),
  date: varchar("date", { length: 50 }).notNull(),
  time: varchar("time", { length: 10 }).notNull(),
  address: text("address").notNull(),
  message: text("message"),
  // Options détaillées selon le service
  serviceOptions: text("serviceOptions"), // JSON avec les options choisies
  totalPrice: int("totalPrice").notNull().default(0), // Prix en centimes (ex: 5000 = 50€)
  stripePaymentIntentId: varchar("stripePaymentIntentId", { length: 255 }),
  paymentStatus: mysqlEnum("paymentStatus", ["pending", "completed", "failed", "refunded"]).default("pending").notNull(),
  status: mysqlEnum("status", ["pending", "confirmed", "completed", "cancelled"]).default("pending").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Booking = typeof bookings.$inferSelect;
export type InsertBooking = typeof bookings.$inferInsert;

// Table pour les messages de chat
export const chatMessages = mysqlTable("chatMessages", {
  id: int("id").autoincrement().primaryKey(),
  visitorId: varchar("visitorId", { length: 64 }).notNull(),
  visitorName: varchar("visitorName", { length: 100 }),
  visitorEmail: varchar("visitorEmail", { length: 320 }),
  message: text("message").notNull(),
  sender: mysqlEnum("sender", ["visitor", "ai", "admin"]).notNull(),
  isRead: int("isRead").default(0).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type ChatMessage = typeof chatMessages.$inferSelect;
export type InsertChatMessage = typeof chatMessages.$inferInsert;

// Table pour les témoignages clients
export const testimonials = mysqlTable("testimonials", {
  id: int("id").autoincrement().primaryKey(),
  clientName: varchar("clientName", { length: 100 }).notNull(),
  clientEmail: varchar("clientEmail", { length: 320 }).notNull(),
  service: varchar("service", { length: 100 }).notNull(),
  rating: int("rating").notNull(), // 1-5 stars
  title: varchar("title", { length: 200 }).notNull(),
  content: text("content").notNull(),
  imageUrl: varchar("imageUrl", { length: 500 }),
  isApproved: int("isApproved").default(0).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Testimonial = typeof testimonials.$inferSelect;
export type InsertTestimonial = typeof testimonials.$inferInsert;

// Table pour les avis/feedback post-service
export const feedbacks = mysqlTable("feedbacks", {
  id: int("id").autoincrement().primaryKey(),
  bookingId: int("bookingId").notNull(), // Lien vers la réservation
  userId: int("userId"), // Lien vers l'utilisateur si connecté
  email: varchar("email", { length: 320 }).notNull(),
  name: varchar("name", { length: 100 }).notNull(),
  rating: int("rating").notNull(), // 1-5 stars
  comment: text("comment"),
  serviceQuality: int("serviceQuality"), // 1-5 pour la qualité du service
  punctuality: int("punctuality"), // 1-5 pour la ponctualité
  professionalism: int("professionalism"), // 1-5 pour le professionnalisme
  isApproved: int("isApproved").default(0).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Feedback = typeof feedbacks.$inferSelect;
export type InsertFeedback = typeof feedbacks.$inferInsert;
// Table pour les produits/services
export const products = mysqlTable("products", {
  id: int("id").autoincrement().primaryKey(),
  serviceKey: varchar("serviceKey", { length: 50 }).notNull(), // automobile, terrasse, etc.
  serviceName: varchar("serviceName", { length: 100 }).notNull(), // Nettoyage Automobile
  optionName: varchar("optionName", { length: 200 }).notNull(), // Nettoyage complet
  description: text("description"), // Description détaillée
  price: int("price").notNull(), // Prix en centimes (ex: 9000 = 90€)
  currency: varchar("currency", { length: 3 }).default("EUR").notNull(),
  sku: varchar("sku", { length: 100 }).notNull().unique(), // automobile-nettoyage-complet
  isActive: int("isActive").default(1).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Product = typeof products.$inferSelect;
export type InsertProduct = typeof products.$inferInsert;
