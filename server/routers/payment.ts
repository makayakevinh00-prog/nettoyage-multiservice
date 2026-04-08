import { z } from "zod";
import { publicProcedure, router } from "../_core/trpc";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
  apiVersion: "2024-12-18.acacia",
});

// Schéma de validation pour les réservations
const ReservationSchema = z.object({
  service: z.string(),
  prestation: z.string(),
  prestationPrice: z.number().positive(),
  options: z.array(z.object({
    name: z.string(),
    price: z.number().positive(),
  })).default([]),
  totalPrice: z.number().positive(),
  date: z.string(),
  time: z.string(),
  name: z.string(),
  email: z.string().email(),
  phone: z.string(),
  address: z.string().optional(),
  message: z.string().optional(),
});

// Schéma de validation pour les abonnements
const SubscriptionSchema = z.object({
  plan: z.enum(["express", "confort"]),
  name: z.string(),
  email: z.string().email(),
  phone: z.string(),
});

export const paymentRouter = router({
  // Créer une session de paiement pour une prestation ponctuelle
  createReservationCheckout: publicProcedure
    .input(ReservationSchema)
    .mutation(async ({ input, ctx }) => {
      try {
        const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = [
          {
            price_data: {
              currency: "eur",
              product_data: {
                name: `${input.service} - ${input.prestation}`,
                description: input.options.length > 0 
                  ? `Options: ${input.options.map(o => o.name).join(", ")}`
                  : undefined,
              },
              unit_amount: Math.round(input.totalPrice * 100), // Convertir en centimes
            },
            quantity: 1,
          },
        ];

        const session = await stripe.checkout.sessions.create({
          payment_method_types: ["card"],
          line_items: lineItems,
          mode: "payment",
          success_url: `${ctx.req.headers.origin || "https://procleanempire.com"}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
          cancel_url: `${ctx.req.headers.origin || "https://procleanempire.com"}/reservation`,
          customer_email: input.email,
          metadata: {
            service: input.service,
            prestation: input.prestation,
            date: input.date,
            time: input.time,
            name: input.name,
            phone: input.phone,
            address: input.address || "",
            message: input.message || "",
            type: "reservation",
          },
        });

        return {
          sessionId: session.id,
          url: session.url,
        };
      } catch (error) {
        console.error("Erreur lors de la création de la session Stripe:", error);
        throw new Error("Impossible de créer la session de paiement");
      }
    }),

  // Créer une session de paiement pour un abonnement
  createSubscriptionCheckout: publicProcedure
    .input(SubscriptionSchema)
    .mutation(async ({ input, ctx }) => {
      try {
        const planDetails = {
          express: {
            name: "Abonnement Express",
            description: "1 intervention par mois - 30€/mois",
            price: 3000, // 30€ en centimes
          },
          confort: {
            name: "Abonnement Confort",
            description: "2 interventions par mois - 60€/mois",
            price: 6000, // 60€ en centimes
          },
        };

        const plan = planDetails[input.plan];

        const session = await stripe.checkout.sessions.create({
          payment_method_types: ["card"],
          line_items: [
            {
              price_data: {
                currency: "eur",
                product_data: {
                  name: plan.name,
                  description: plan.description,
                },
                unit_amount: plan.price,
                recurring: {
                  interval: "month",
                  interval_count: 1,
                },
              },
              quantity: 1,
            },
          ],
          mode: "subscription",
          success_url: `${ctx.req.headers.origin || "https://procleanempire.com"}/subscription-success?session_id={CHECKOUT_SESSION_ID}`,
          cancel_url: `${ctx.req.headers.origin || "https://procleanempire.com"}/offres`,
          customer_email: input.email,
          metadata: {
            plan: input.plan,
            name: input.name,
            phone: input.phone,
            type: "subscription",
          },
        });

        return {
          sessionId: session.id,
          url: session.url,
        };
      } catch (error) {
        console.error("Erreur lors de la création de la session Stripe:", error);
        throw new Error("Impossible de créer la session de paiement");
      }
    }),

  // Récupérer les détails d'une session
  getCheckoutSession: publicProcedure
    .input(z.object({ sessionId: z.string() }))
    .query(async ({ input }) => {
      try {
        const session = await stripe.checkout.sessions.retrieve(input.sessionId);
        return {
          id: session.id,
          status: session.payment_status,
          customerEmail: session.customer_email,
          metadata: session.metadata,
          amountTotal: session.amount_total,
        };
      } catch (error) {
        console.error("Erreur lors de la récupération de la session:", error);
        throw new Error("Impossible de récupérer les détails du paiement");
      }
    }),
});
