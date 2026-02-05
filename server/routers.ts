import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router, adminProcedure, protectedProcedure } from "./_core/trpc";
import { z } from "zod";
import { notifyOwner } from "./_core/notification";
import { sendEmail, generateBookingConfirmationEmail } from "./lib/email";
import { generateICSFile } from "./lib/calendar";
import { addEventToGoogleCalendar, addEventToOwnerCalendar } from "./lib/googleCalendar";
import { syncBookingToHubSpot } from "./lib/hubspot";
import { generateChatResponse } from "./lib/chatAI";
import { isSlotAvailable, getAvailableSlots } from "./lib/slots";
import { getAllBookings, getBookingById, getIntegrationLogsByBookingId, getAllIntegrationLogs, getBookingStats, getIntegrationStats, updateBookingStatus } from "./db-admin";
import { createTestimonial, getApprovedTestimonials, getPendingTestimonials, approveTestimonial, deleteTestimonial, getBookingsByUserId, getBookingsByEmail, updateBooking, cancelBooking, createFeedback, getFeedbackByBookingId, getApprovedFeedbacks, getPendingFeedbacks, approveFeedback, deleteFeedback, createBooking, getDb } from "./db";
import { storagePut } from "./storage";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
  apiVersion: "2025-12-15.clover",
});

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  contact: router({
    sendQuote: publicProcedure
      .input(z.object({
        name: z.string().min(1).max(100).trim(),
        email: z.string().email().max(255).trim().toLowerCase(),
        phone: z.string().min(10).max(20).trim().regex(/^[0-9\s\+\-\(\)]+$/),
        service: z.enum(['automobile', 'terrasse', 'tapis', 'balcon', 'jardinage']),
        message: z.string().max(1000).trim().optional(),
      }))
      .mutation(async ({ input }) => {
        const emailContent = `
📧 Nouvelle demande de devis - ProClean Empire

👤 Client: ${input.name}
📧 Email: ${input.email}
📞 Téléphone: ${input.phone}
🧹 Service: ${input.service}

💬 Message:
${input.message || 'Aucun message supplémentaire'}

---
Cette demande a été envoyée depuis le site ProClean Empire.
        `.trim();

        await notifyOwner({
          title: `Nouvelle demande de devis - ${input.service}`,
          content: emailContent,
        });

        return { success: true };
      }),

    sendBooking: publicProcedure
      .input(z.object({
        name: z.string().min(1).max(100).trim(),
        email: z.string().email().max(255).trim().toLowerCase(),
        phone: z.string().min(10).max(20).trim().regex(/^[0-9\s\+\-\(\)]+$/),
        service: z.enum(['automobile', 'terrasse', 'tapis', 'balcon', 'jardinage', 'facade', 'panneaux-solaires']),
        serviceOption: z.string().optional(),
        quantity: z.number().min(1).default(1),
        date: z.string().min(1).max(50).trim(),
        time: z.string().min(1).max(10).trim(),
        address: z.string().min(5).max(500).trim(),
        message: z.string().max(1000).trim().optional(),
      }))
      .mutation(async ({ input }) => {
        const serviceNames: Record<string, string> = {
          automobile: "Nettoyage Automobile",
          terrasse: "Nettoyage Terrasse",
          tapis: "Nettoyage Tapis",
          balcon: "Nettoyage Balcon",
          jardinage: "Entretien Jardinage",
        };

        const emailContent = `
📅 Nouvelle réservation - ProClean Empire

👤 Client: ${input.name}
📧 Email: ${input.email}
📞 Téléphone: ${input.phone}
🧹 Service: ${serviceNames[input.service] || input.service}

📆 Date: ${input.date}
🕐 Heure: ${input.time}
📍 Adresse: ${input.address}

💬 Informations complémentaires:
${input.message || 'Aucune information supplémentaire'}

---
Cette réservation a été envoyée depuis le site ProClean Empire.
Veuillez contacter le client pour confirmer le rendez-vous.
        `.trim();

        // Envoyer la notification au propriétaire
        await notifyOwner({
          title: `Nouvelle réservation - ${input.date} à ${input.time}`,
          content: emailContent,
        });

        // Calculer le prix basé sur l'option sélectionnée
        let totalPrice = 0;
        let optionLabel = '';
        if (input.serviceOption) {
          const priceMatch = input.serviceOption.match(/^([\d.,]+)/);
          if (priceMatch) {
            totalPrice = parseFloat(priceMatch[1].replace(',', '.')) * input.quantity;
            optionLabel = input.serviceOption;
          }
        }

        // Ajouter l'événement à Google Calendar du client
        try {
          console.log(`[GoogleCalendar] Ajout d'événement pour ${input.name}`);
          await addEventToGoogleCalendar({
            name: input.name,
            email: input.email,
            phone: input.phone,
            service: input.service,
            date: input.date,
            time: input.time,
            address: input.address,
            message: `Quantité: ${input.quantity}${input.serviceOption ? `\nOption: ${input.serviceOption}` : ''}${input.message ? `\nNotes: ${input.message}` : ''}`,
          });
          console.log(`[GoogleCalendar] ✅ Événement ajouté pour le client ${input.email}`);
        } catch (calendarError) {
          console.error('[GoogleCalendar] ❌ Erreur lors de l\'ajout à Google Calendar du client:', calendarError);
          // Ne pas bloquer la réservation si Google Calendar échoue
        }

        // Ajouter l'événement au calendrier du propriétaire
        try {
          console.log(`[GoogleCalendar] Ajout d'événement propriétaire pour ${input.name}`);
          const priceText = totalPrice > 0 ? `\nPrix: ${totalPrice.toFixed(2)}€` : '';
          await addEventToOwnerCalendar({
            name: input.name,
            email: input.email,
            phone: input.phone,
            service: input.service,
            date: input.date,
            time: input.time,
            address: input.address,
            message: `Quantité: ${input.quantity}${input.serviceOption ? `\nOption: ${input.serviceOption}` : ''}${priceText}${input.message ? `\nNotes: ${input.message}` : ''}`,
          });
          console.log(`[GoogleCalendar] ✅ Événement ajouté au calendrier du propriétaire pour ${input.name}`);
        } catch (calendarError) {
          console.error('[GoogleCalendar] ❌ Erreur lors de l\'ajout au calendrier du propriétaire:', calendarError);
          // Ne pas bloquer la réservation si Google Calendar échoue
        }

        // Synchroniser avec HubSpot CRM
        try {
          console.log(`[HubSpot] Synchronisation pour ${input.name}`);

          await syncBookingToHubSpot({
            name: input.name,
            email: input.email,
            phone: input.phone,
            service: input.service,
            date: input.date,
            time: input.time,
            address: input.address,
            message: input.message,
          });
          console.log(`[HubSpot] ✅ Synchronisation réussie pour ${input.email}`);
        } catch (hubspotError) {
          console.error('[HubSpot] ❌ Erreur lors de la synchronisation HubSpot:', hubspotError);
          // Ne pas bloquer la réservation si HubSpot échoue
        }

        // Sauvegarder la réservation en base de données
        let bookingId: number | undefined;
        try {
          const result = await createBooking({
            userId: undefined, // Sera mis à jour si l'utilisateur est connecté
            name: input.name,
            email: input.email,
            phone: input.phone,
            service: input.service as any,
            date: input.date,
            time: input.time,
            address: input.address,
            message: input.message,
            serviceOptions: input.serviceOption ? JSON.stringify({ option: input.serviceOption, quantity: input.quantity }) : undefined,
            totalPrice: totalPrice,
            status: 'pending',
          });
          if (result && 'insertId' in result) {
            bookingId = (result as any).insertId as number;
          }
          console.log(`[Booking] Réservation créée avec ID: ${bookingId}`);
        } catch (dbError) {
          console.error('[Booking] Erreur lors de la création de la réservation:', dbError);
          // Ne pas bloquer la réservation si la base de données échoue
        }

        // Envoyer l'email de confirmation au client avec fichier .ics
        try {
          const confirmationEmail = generateBookingConfirmationEmail({
            name: input.name,
            service: input.service,
            date: input.date,
            time: input.time,
            address: input.address,
            serviceOption: optionLabel,
            price: totalPrice,
          });

          // Générer le fichier .ics
          const icsContent = generateICSFile(input);
          
          const attachments = icsContent ? [
            {
              filename: 'rendez-vous-proclean.ics',
              content: icsContent,
              contentType: 'text/calendar',
            },
          ] : undefined;

          await sendEmail({
            to: input.email,
            subject: '✅ Confirmation de votre réservation - ProClean Empire',
            html: confirmationEmail.html,
            text: confirmationEmail.text,
            attachments,
          });
        } catch (emailError) {
          console.error('Erreur lors de l\'envoi de l\'email de confirmation:', emailError);
          // Ne pas bloquer la réservation si l'email échoue
        }

        return { success: true, bookingId };
      }),

    createPaymentIntent: publicProcedure
      .input(z.object({
        name: z.string().min(1).max(100).trim(),
        email: z.string().email().max(255).trim().toLowerCase(),
        phone: z.string().min(10).max(20).trim().regex(/^[0-9\s\+\-\(\)]+$/),
        service: z.enum(['automobile', 'terrasse', 'tapis', 'balcon', 'jardinage']),
        date: z.string().min(1).max(50).trim(),
        time: z.string().min(1).max(10).trim(),
        address: z.string().min(5).max(500).trim(),
        message: z.string().max(1000).trim().optional(),
      }))
      .mutation(async ({ input }) => {
        try {
          // Créer un PaymentIntent pour la caution de 25€
          const paymentIntent = await stripe.paymentIntents.create({
            amount: 2500, // 25€ en centimes
            currency: 'eur',
            metadata: {
              name: input.name,
              email: input.email,
              phone: input.phone,
              service: input.service,
              date: input.date,
              time: input.time,
              address: input.address,
              message: input.message || '',
            },
          });

          return {
            clientSecret: paymentIntent.client_secret,
            paymentIntentId: paymentIntent.id,
          };
        } catch (error) {
          console.error('Erreur lors de la création du PaymentIntent:', error);
          throw new Error('Impossible de créer le paiement');
        }
      }),
  }),

  chat: router({
    sendMessage: publicProcedure
      .input(z.object({
        visitorId: z.string().min(1).max(64),
        visitorName: z.string().min(1).max(100).trim(),
        visitorEmail: z.string().email().max(255).trim().toLowerCase(),
        message: z.string().min(1).max(1000).trim(),
      }))
      .mutation(async ({ input }) => {
        try {
          // Sauvegarder le message du visiteur en base de données
          // (À implémenter avec la base de données)
          console.log('[Chat] Message reçu:', input);
          
          // Générer une réponse IA personnalisée
          const aiResponse = await generateChatResponse(input.message, input.visitorName);
          
          // Notifier le propriétaire
          await notifyOwner({
            title: 'Nouveau message chat',
            content: `${input.visitorName} (${input.visitorEmail}) a envoyé: ${input.message}`,
          });

          return { success: true, aiResponse };
        } catch (error) {
          console.error('[Chat] Erreur lors de l\'envoi du message:', error);
          throw new Error('Impossible d\'envoyer le message');
        }
      }),

    getMessages: publicProcedure
      .input(z.object({
        visitorId: z.string().min(1).max(64),
      }))
      .mutation(async ({ input }) => {
        try {
          // Récupérer les messages du visiteur
          // (À implémenter avec la base de données)
          console.log('[Chat] Récupération des messages pour:', input.visitorId);
          return [];
        } catch (error) {
          console.error('[Chat] Erreur lors de la récupération des messages:', error);
          throw new Error('Impossible de récupérer les messages');
        }
      }),
  }),

  admin: router({
    getPendingTestimonials: adminProcedure
      .query(async () => {
        try {
          return await getPendingTestimonials();
        } catch (error) {
          console.error('[Admin] Failed to get pending testimonials:', error);
          return [];
        }
      }),

    getApprovedTestimonials: adminProcedure
      .query(async () => {
        try {
          return await getApprovedTestimonials();
        } catch (error) {
          console.error('[Admin] Failed to get approved testimonials:', error);
          return [];
        }
      }),

    approveTestimonial: adminProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ input }) => {
        try {
          await approveTestimonial(input.id);
          return { success: true };
        } catch (error) {
          console.error('[Admin] Failed to approve testimonial:', error);
          throw new Error('Impossible d\'approuver le teemoignage');
        }
      }),

    deleteTestimonial: adminProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ input }) => {
        try {
          await deleteTestimonial(input.id);
          return { success: true };
        } catch (error) {
          console.error('[Admin] Failed to delete testimonial:', error);
          throw new Error('Impossible de supprimer le teemoignage');
        }
      }),
  }),

  testimonials: router({
    submit: publicProcedure
      .input(z.object({
        clientName: z.string().min(1).max(100).trim(),
        clientEmail: z.string().email().max(255).trim().toLowerCase(),
        service: z.string().min(1).max(100).trim(),
        rating: z.number().int().min(1).max(5),
        title: z.string().min(5).max(200).trim(),
        content: z.string().min(10).max(1000).trim(),
        imageBase64: z.string().optional(),
      }))
      .mutation(async ({ input }) => {
        try {
          let imageUrl: string | undefined;

          if (input.imageBase64) {
            try {
              const buffer = Buffer.from(input.imageBase64, 'base64');
              const { url } = await storagePut(
                `testimonials/${Date.now()}-${Math.random().toString(36).substr(2, 9)}.jpg`,
                buffer,
                'image/jpeg'
              );
              imageUrl = url;
            } catch (error) {
              console.error('[Testimonials] Failed to upload image:', error);
            }
          }

          await createTestimonial({
            clientName: input.clientName,
            clientEmail: input.clientEmail,
            service: input.service,
            rating: input.rating,
            title: input.title,
            content: input.content,
            imageUrl,
            isApproved: 0,
          });

          await notifyOwner({
            title: 'Nouveau teemoignage en attente de moderation',
            content: `Teemoignage de ${input.clientName} pour ${input.service}. Note: ${input.rating}/5`,
          });

          return { success: true };
        } catch (error) {
          console.error('[Testimonials] Failed to submit testimonial:', error);
          throw new Error('Impossible de soumettre le teemoignage');
        }
      }),

    getApproved: publicProcedure
      .query(async () => {
        try {
          return await getApprovedTestimonials();
        } catch (error) {
          console.error('[Testimonials] Failed to get approved testimonials:', error);
          return [];
        }
      }),
  }),

  bookings: router({
    getMyBookings: protectedProcedure
      .query(async ({ ctx }) => {
        try {
          // Utiliser l'email de l'utilisateur connecté
          if (ctx.user && ctx.user.email) {
            return await getBookingsByEmail(ctx.user.email);
          }
          return [];
        } catch (error) {
          console.error('[Bookings] Failed to get bookings:', error);
          return [];
        }
      }),

    updateBooking: publicProcedure
      .input(z.object({
        bookingId: z.number(),
        date: z.string().optional(),
        time: z.string().optional(),
        address: z.string().optional(),
        message: z.string().optional(),
      }))
      .mutation(async ({ input }) => {
        try {
          const result = await updateBooking(input.bookingId, {
            date: input.date,
            time: input.time,
            address: input.address,
            message: input.message,
          });
          return { success: true, result };
        } catch (error) {
          console.error('[Bookings] Failed to update booking:', error);
          throw new Error('Impossible de modifier la réservation');
        }
      }),

    cancelBooking: publicProcedure
      .input(z.object({
        bookingId: z.number(),
      }))
      .mutation(async ({ input }) => {
        try {
          const result = await cancelBooking(input.bookingId);
          return { success: true, result };
        } catch (error) {
          console.error('[Bookings] Failed to cancel booking:', error);
          throw new Error('Impossible d\'annuler la réservation');
        }
      }),
  }),

  feedback: router({
    submitFeedback: publicProcedure
      .input(z.object({
        bookingId: z.number(),
        email: z.string().email(),
        name: z.string().min(1).max(100),
        rating: z.number().min(1).max(5),
        comment: z.string().max(1000).optional(),
        serviceQuality: z.number().min(1).max(5).optional(),
        punctuality: z.number().min(1).max(5).optional(),
        professionalism: z.number().min(1).max(5).optional(),
      }))
      .mutation(async ({ input }) => {
        try {
          const result = await createFeedback({
            bookingId: input.bookingId,
            email: input.email,
            name: input.name,
            rating: input.rating,
            comment: input.comment,
            serviceQuality: input.serviceQuality,
            punctuality: input.punctuality,
            professionalism: input.professionalism,
          });
          return { success: true, result };
        } catch (error) {
          console.error('[Feedback] Failed to submit feedback:', error);
          throw new Error('Impossible de soumettre votre avis');
        }
      }),

    getFeedbackByBooking: publicProcedure
      .input(z.object({
        bookingId: z.number(),
      }))
      .query(async ({ input }) => {
        try {
          return await getFeedbackByBookingId(input.bookingId);
        } catch (error) {
          console.error('[Feedback] Failed to get feedback:', error);
          return null;
        }
      }),

    getApproved: publicProcedure
      .query(async () => {
        try {
          return await getApprovedFeedbacks();
        } catch (error) {
          console.error('[Feedback] Failed to get approved feedbacks:', error);
          return [];
        }
      }),

    getPending: adminProcedure
      .query(async () => {
        try {
          return await getPendingFeedbacks();
        } catch (error) {
          console.error('[Feedback] Failed to get pending feedbacks:', error);
          return [];
        }
      }),

    approveFeedback: adminProcedure
      .input(z.object({
        feedbackId: z.number(),
      }))
      .mutation(async ({ input }) => {
        try {
          const result = await approveFeedback(input.feedbackId);
          return { success: true, result };
        } catch (error) {
          console.error('[Feedback] Failed to approve feedback:', error);
          throw new Error('Impossible d\'approuver l\'avis');
        }
      }),

    deleteFeedback: adminProcedure
      .input(z.object({
        feedbackId: z.number(),
      }))
      .mutation(async ({ input }) => {
        try {
          const result = await deleteFeedback(input.feedbackId);
          return { success: true, result };
        } catch (error) {
          console.error('[Feedback] Failed to delete feedback:', error);
          throw new Error('Impossible de supprimer l\'avis');
        }
      }),
  }),

  slots: router({
    checkAvailability: publicProcedure
      .input(z.object({
        service: z.string(),
        date: z.string(),
        time: z.string(),
      }))
      .query(async ({ input }) => {
        try {
          const available = await isSlotAvailable(input.service, input.date, input.time);
          return { available };
        } catch (error) {
          console.error('[Slots] Failed to check availability:', error);
          return { available: true };
        }
      }),

    getAvailable: publicProcedure
      .input(z.object({
        service: z.string(),
        date: z.string(),
      }))
      .query(async ({ input }) => {
        try {
          const slots = await getAvailableSlots(input.service, input.date);
          return { slots };
        } catch (error) {
          console.error('[Slots] Failed to get available slots:', error);
          return { slots: [] };
        }
      }),
  }),

  adminBookings: router({
    getBookings: adminProcedure
      .input(z.object({
        limit: z.number().default(20),
        offset: z.number().default(0),
        status: z.string().optional(),
        service: z.string().optional(),
        dateFrom: z.string().optional(),
        dateTo: z.string().optional(),
      }))
      .query(async ({ input }) => {
        try {
          return await getAllBookings(input.limit, input.offset, {
            status: input.status,
            service: input.service,
            dateFrom: input.dateFrom,
            dateTo: input.dateTo,
          });
        } catch (error) {
          console.error('[Admin] Failed to get bookings:', error);
          return { bookings: [], total: 0 };
        }
      }),

    getBookingDetail: adminProcedure
      .input(z.object({
        bookingId: z.number(),
      }))
      .query(async ({ input }) => {
        try {
          const booking = await getBookingById(input.bookingId);
          const logs = await getIntegrationLogsByBookingId(input.bookingId);
          return { booking, logs };
        } catch (error) {
          console.error('[Admin] Failed to get booking detail:', error);
          return { booking: null, logs: [] };
        }
      }),

    getIntegrationLogs: adminProcedure
      .input(z.object({
        limit: z.number().default(50),
        offset: z.number().default(0),
        service: z.string().optional(),
        status: z.string().optional(),
        dateFrom: z.string().optional(),
        dateTo: z.string().optional(),
      }))
      .query(async ({ input }) => {
        try {
          return await getAllIntegrationLogs(input.limit, input.offset, {
            service: input.service,
            status: input.status,
            dateFrom: input.dateFrom,
            dateTo: input.dateTo,
          });
        } catch (error) {
          console.error('[Admin] Failed to get integration logs:', error);
          return { logs: [], total: 0 };
        }
      }),

    getStats: adminProcedure
      .query(async () => {
        try {
          const bookingStats = await getBookingStats();
          const integrationStats = await getIntegrationStats();
          return { bookingStats, integrationStats };
        } catch (error) {
          console.error('[Admin] Failed to get stats:', error);
          return {
            bookingStats: { total: 0, pending: 0, confirmed: 0, completed: 0, cancelled: 0, totalRevenue: 0 },
            integrationStats: { total: 0, success: 0, error: 0, pending: 0, retry: 0, byService: {} },
          };
        }
      }),

    updateStatus: adminProcedure
      .input(z.object({
        bookingId: z.number(),
        status: z.enum(["pending", "confirmed", "completed", "cancelled"]),
      }))
      .mutation(async ({ input }) => {
        try {
          const success = await updateBookingStatus(input.bookingId, input.status);
          if (success) {
            return { success: true };
          } else {
            throw new Error("Impossible de mettre a jour le statut");
          }
        } catch (error) {
          console.error("[Admin] Failed to update booking status:", error);
          throw new Error("Impossible de mettre a jour le statut");
        }
      }),
  }),
});

export type AppRouter = typeof appRouter;
