import { z } from "zod";
import { protectedProcedure, router } from "../_core/trpc";
import { getDb } from "../db";
import { autoSubscriptions, subscriptionInvoices, subscriptionOptions } from "../../drizzle/schema";
import { eq, and } from "drizzle-orm";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
  apiVersion: "2026-02-25.clover",
});

export const subscriptionsRouter = router({
  // Créer un nouvel abonnement
  createSubscription: protectedProcedure
    .input(
      z.object({
        plan: z.enum(["express", "confort"]),
        paymentMethodId: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const db = await getDb();
      if (!db) throw new Error("Database not available");

      const planPrices = {
        express: 3000, // 30€ en centimes
        confort: 6000, // 60€ en centimes
      };

      try {
        // Créer un client Stripe s'il n'existe pas
        let stripeCustomerId = ctx.user.email;
        const customer = await stripe.customers.create({
          email: ctx.user.email,
          name: ctx.user.name,
          metadata: {
            userId: ctx.user.id.toString(),
          },
        });
        stripeCustomerId = customer.id;

        // Créer l'abonnement Stripe
        const subscription = await stripe.subscriptions.create({
          customer: stripeCustomerId,
          items: [
            {
              price_data: {
                currency: "eur",
                product_data: {
                  name: `Abonnement ${input.plan === "express" ? "Express" : "Confort"} - Nettoyage Auto`,
                },
                recurring: {
                  interval: "month",
                },
                unit_amount: planPrices[input.plan],
              },
            },
          ],
          payment_settings: {
            payment_method_types: ["card"],
            save_default_payment_method: "on_subscription",
          },
          default_payment_method: paymentMethodId,
        });

        // Sauvegarder dans la base de données
        await db.insert(autoSubscriptions).values({
          userId: ctx.user.id,
          plan: input.plan,
          monthlyPrice: planPrices[input.plan],
          stripeCustomerId,
          stripeSubscriptionId: subscription.id,
          status: "active",
          currentBillingCycleStart: new Date(subscription.current_period_start * 1000),
          currentBillingCycleEnd: new Date(subscription.current_period_end * 1000),
          nextBillingDate: new Date(subscription.current_period_end * 1000),
        });

        return {
          success: true,
          subscriptionId: subscription.id,
          message: "Abonnement créé avec succès",
        };
      } catch (error) {
        console.error("[Subscriptions] Error creating subscription:", error);
        throw new Error("Erreur lors de la création de l'abonnement");
      }
    }),

  // Récupérer l'abonnement actif de l'utilisateur
  getActiveSubscription: protectedProcedure.query(async ({ ctx }) => {
    const db = await getDb();
    if (!db) return null;

    const subscription = await db
      .select()
      .from(autoSubscriptions)
      .where(
        and(
          eq(autoSubscriptions.userId, ctx.user.id),
          eq(autoSubscriptions.status, "active")
        )
      )
      .limit(1);

    return subscription[0] || null;
  }),

  // Récupérer les factures de l'utilisateur
  getInvoices: protectedProcedure.query(async ({ ctx }) => {
    const db = await getDb();
    if (!db) return [];

    const userSubscriptions = await db
      .select()
      .from(autoSubscriptions)
      .where(eq(autoSubscriptions.userId, ctx.user.id));

    if (userSubscriptions.length === 0) return [];

    const invoices = await db
      .select()
      .from(subscriptionInvoices)
      .where(eq(subscriptionInvoices.subscriptionId, userSubscriptions[0].id));

    return invoices;
  }),

  // Ajouter une option à l'abonnement
  addSubscriptionOption: protectedProcedure
    .input(
      z.object({
        optionName: z.string(),
        optionPrice: z.number(),
        month: z.string(), // Format: YYYY-MM
      })
    )
    .mutation(async ({ ctx, input }) => {
      const db = await getDb();
      if (!db) throw new Error("Database not available");

      const subscription = await db
        .select()
        .from(autoSubscriptions)
        .where(
          and(
            eq(autoSubscriptions.userId, ctx.user.id),
            eq(autoSubscriptions.status, "active")
          )
        )
        .limit(1);

      if (!subscription[0]) throw new Error("Aucun abonnement actif");

      await db.insert(subscriptionOptions).values({
        subscriptionId: subscription[0].id,
        optionName: input.optionName,
        optionPrice: input.optionPrice,
        appliedForMonth: input.month,
      });

      return { success: true };
    }),

  // Annuler l'abonnement
  cancelSubscription: protectedProcedure
    .input(z.object({ reason: z.string().optional() }))
    .mutation(async ({ ctx, input }) => {
      const db = await getDb();
      if (!db) throw new Error("Database not available");

      const subscription = await db
        .select()
        .from(autoSubscriptions)
        .where(
          and(
            eq(autoSubscriptions.userId, ctx.user.id),
            eq(autoSubscriptions.status, "active")
          )
        )
        .limit(1);

      if (!subscription[0]) throw new Error("Aucun abonnement actif");

      try {
        // Annuler chez Stripe
        await stripe.subscriptions.cancel(subscription[0].stripeSubscriptionId);

        // Mettre à jour la base de données
        await db
          .update(autoSubscriptions)
          .set({
            status: "cancelled",
            cancellationDate: new Date(),
            cancellationReason: input.reason,
          })
          .where(eq(autoSubscriptions.id, subscription[0].id));

        return { success: true, message: "Abonnement annulé" };
      } catch (error) {
        console.error("[Subscriptions] Error cancelling subscription:", error);
        throw new Error("Erreur lors de l'annulation de l'abonnement");
      }
    }),

  // Mettre en pause l'abonnement
  pauseSubscription: protectedProcedure.mutation(async ({ ctx }) => {
    const db = await getDb();
    if (!db) throw new Error("Database not available");

    const subscription = await db
      .select()
      .from(autoSubscriptions)
      .where(
        and(
          eq(autoSubscriptions.userId, ctx.user.id),
          eq(autoSubscriptions.status, "active")
        )
      )
      .limit(1);

    if (!subscription[0]) throw new Error("Aucun abonnement actif");

    try {
      await stripe.subscriptions.update(subscription[0].stripeSubscriptionId, {
        pause_collection: {
          behavior: "mark_uncollectible",
        },
      });

      await db
        .update(autoSubscriptions)
        .set({ status: "paused" })
        .where(eq(autoSubscriptions.id, subscription[0].id));

      return { success: true, message: "Abonnement mis en pause" };
    } catch (error) {
      console.error("[Subscriptions] Error pausing subscription:", error);
      throw new Error("Erreur lors de la mise en pause");
    }
  }),

  // Reprendre l'abonnement
  resumeSubscription: protectedProcedure.mutation(async ({ ctx }) => {
    const db = await getDb();
    if (!db) throw new Error("Database not available");

    const subscription = await db
      .select()
      .from(autoSubscriptions)
      .where(
        and(
          eq(autoSubscriptions.userId, ctx.user.id),
          eq(autoSubscriptions.status, "paused")
        )
      )
      .limit(1);

    if (!subscription[0]) throw new Error("Aucun abonnement en pause");

    try {
      await stripe.subscriptions.update(subscription[0].stripeSubscriptionId, {
        pause_collection: undefined,
      });

      await db
        .update(autoSubscriptions)
        .set({ status: "active" })
        .where(eq(autoSubscriptions.id, subscription[0].id));

      return { success: true, message: "Abonnement repris" };
    } catch (error) {
      console.error("[Subscriptions] Error resuming subscription:", error);
      throw new Error("Erreur lors de la reprise");
    }
  }),
});
