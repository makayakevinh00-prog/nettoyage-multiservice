import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router, adminProcedure } from "./_core/trpc";
import { z } from "zod";
import { notifyOwner } from "./_core/notification";
import { sendEmail, generateBookingConfirmationEmail } from "./lib/email";
import { generateICSFile } from "./lib/calendar";
import { addEventToGoogleCalendar, addEventToOwnerCalendar } from "./lib/googleCalendar";
import { syncBookingToHubSpot } from "./lib/hubspot";
import { generateChatResponse } from "./lib/chatAI";
import { createTestimonial, getApprovedTestimonials, getPendingTestimonials, approveTestimonial, deleteTestimonial } from "./db";
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
        service: z.enum(['automobile', 'terrasse', 'tapis', 'balcon', 'jardinage']),
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

        // Ajouter l'événement à Google Calendar du client
        try {
          await addEventToGoogleCalendar({
            name: input.name,
            email: input.email,
            phone: input.phone,
            service: input.service,
            date: input.date,
            time: input.time,
            address: input.address,
            message: input.message,
          });
        } catch (calendarError) {
          console.error('Erreur lors de l\'ajout à Google Calendar du client:', calendarError);
          // Ne pas bloquer la réservation si Google Calendar échoue
        }

        // Ajouter l'événement au calendrier du propriétaire
        try {
          await addEventToOwnerCalendar({
            name: input.name,
            email: input.email,
            phone: input.phone,
            service: input.service,
            date: input.date,
            time: input.time,
            address: input.address,
            message: input.message,
          });
        } catch (calendarError) {
          console.error('Erreur lors de l\'ajout au calendrier du propriétaire:', calendarError);
          // Ne pas bloquer la réservation si Google Calendar échoue
        }

        // Synchroniser avec HubSpot CRM
        try {
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
        } catch (hubspotError) {
          console.error('Erreur lors de la synchronisation HubSpot:', hubspotError);
          // Ne pas bloquer la réservation si HubSpot échoue
        }

        // Envoyer l'email de confirmation au client avec fichier .ics
        try {
          const confirmationEmail = generateBookingConfirmationEmail({
            name: input.name,
            service: input.service,
            date: input.date,
            time: input.time,
            address: input.address,
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

        return { success: true };
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
});

export type AppRouter = typeof appRouter;
