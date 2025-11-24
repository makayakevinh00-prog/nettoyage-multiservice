import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import { z } from "zod";
import { notifyOwner } from "./_core/notification";
import { sendEmail, generateBookingConfirmationEmail } from "./lib/email";
import { generateICSFile } from "./lib/calendar";

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
  }),
});

export type AppRouter = typeof appRouter;
