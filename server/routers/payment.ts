import { z } from "zod";
import { publicProcedure, router } from "../_core/trpc";
import { createQontoPaymentRequest, getQontoPaymentRequest } from "../lib/qontoPayment";

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
  // Créer une demande de paiement pour une prestation ponctuelle
  createReservationCheckout: publicProcedure
    .input(ReservationSchema)
    .mutation(async ({ input, ctx }) => {
      try {
        console.log("[Qonto] Création demande de paiement pour:", input.service, input.prestation, input.totalPrice);
        
        const successUrl = `${ctx.req.headers.origin || "https://procleanempire.com"}/payment-success`;
        const cancelUrl = `${ctx.req.headers.origin || "https://procleanempire.com"}/reservation`;

        const result = await createQontoPaymentRequest(
          {
            name: input.name,
            email: input.email,
            phone: input.phone,
            service: input.service,
            date: input.date,
            time: input.time,
            address: input.address || "",
            message: input.message,
          },
          input.totalPrice,
          successUrl,
          cancelUrl
        );

        return {
          paymentRequestId: result.paymentRequestId,
          url: result.url,
        };
      } catch (error) {
        console.error("[Qonto] Erreur lors de la création de la demande de paiement:", error);
        throw new Error("Impossible de créer la demande de paiement. Veuillez réessayer.");
      }
    }),

  // Créer une demande de paiement pour un abonnement
  createSubscriptionCheckout: publicProcedure
    .input(SubscriptionSchema)
    .mutation(async ({ input, ctx }) => {
      try {
        console.log("[Qonto] Création demande de paiement abonnement:", input.plan);
        
        const planDetails = {
          express: {
            name: "Abonnement Express",
            description: "1 intervention par mois - 30€/mois",
            price: 30,
          },
          confort: {
            name: "Abonnement Confort",
            description: "2 interventions par mois - 60€/mois",
            price: 60,
          },
        };

        const plan = planDetails[input.plan];

        const successUrl = `${ctx.req.headers.origin || "https://procleanempire.com"}/subscription-success`;
        const cancelUrl = `${ctx.req.headers.origin || "https://procleanempire.com"}/offres`;

        const result = await createQontoPaymentRequest(
          {
            name: input.name,
            email: input.email,
            phone: input.phone,
            service: `Abonnement ${input.plan}`,
            date: new Date().toISOString().split('T')[0],
            time: new Date().toLocaleTimeString('fr-FR'),
            address: "",
            message: `Abonnement ${input.plan} - ${plan.description}`,
          },
          plan.price,
          successUrl,
          cancelUrl
        );

        return {
          paymentRequestId: result.paymentRequestId,
          url: result.url,
        };
      } catch (error) {
        console.error("[Qonto] Erreur lors de la création de la demande de paiement:", error);
        throw new Error("Impossible de créer la demande de paiement. Veuillez réessayer.");
      }
    }),

  // Récupérer les détails d'une demande de paiement
  getPaymentRequest: publicProcedure
    .input(z.object({ paymentRequestId: z.string() }))
    .query(async ({ input }) => {
      try {
        const paymentRequest = await getQontoPaymentRequest(input.paymentRequestId);
        return {
          id: paymentRequest.id,
          status: paymentRequest.status,
          amount: paymentRequest.amount_cents / 100,
          currency: paymentRequest.currency,
          metadata: paymentRequest.custom_metadata,
        };
      } catch (error) {
        console.error("[Qonto] Erreur lors de la récupération de la demande de paiement:", error);
        throw new Error("Impossible de récupérer les détails du paiement");
      }
    }),
});
