import { protectedProcedure, publicProcedure, router } from "../_core/trpc";
import { z } from "zod";
import {
  sendReservationConfirmation,
  sendPaymentConfirmation,
  sendSubscriptionChangeNotification,
  sendSupportNotification,
} from "../notifications";

export const notificationsRouter = router({
  // Envoyer une confirmation de réservation
  sendReservationConfirmation: publicProcedure
    .input(
      z.object({
        clientName: z.string(),
        clientEmail: z.string().email(),
        clientPhone: z.string(),
        service: z.string(),
        date: z.string(),
        time: z.string(),
        totalPrice: z.number(),
        address: z.string().optional(),
      })
    )
    .mutation(async ({ input }) => {
      const success = await sendReservationConfirmation(input);
      return { success };
    }),

  // Envoyer une confirmation de paiement
  sendPaymentConfirmation: publicProcedure
    .input(
      z.object({
        clientName: z.string(),
        clientEmail: z.string().email(),
        clientPhone: z.string(),
        service: z.string(),
        date: z.string(),
        time: z.string(),
        totalPrice: z.number(),
        paymentId: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      const success = await sendPaymentConfirmation(input);
      return { success };
    }),

  // Envoyer une notification de changement d'abonnement
  sendSubscriptionChangeNotification: protectedProcedure
    .input(
      z.object({
        clientName: z.string(),
        clientEmail: z.string().email(),
        action: z.enum(["created", "updated", "cancelled"]),
        service: z.string(),
        frequency: z.string().optional(),
        nextDate: z.string().optional(),
      })
    )
    .mutation(async ({ input }) => {
      const success = await sendSubscriptionChangeNotification(input);
      return { success };
    }),

  // Envoyer une notification de support
  sendSupportNotification: publicProcedure
    .input(
      z.object({
        clientName: z.string(),
        clientEmail: z.string().email(),
        subject: z.string(),
        message: z.string(),
        ticketId: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      const success = await sendSupportNotification(input);
      return { success };
    }),
});
