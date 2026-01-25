import { getBookingsByDateRange, getDb } from "../db";
import { sendEmail } from "./email";
import { eq } from "drizzle-orm";
import { bookings } from "../../drizzle/schema";

/**
 * Génère un email de demande de feedback
 */
export function generateFeedbackEmail(booking: any): { html: string; text: string } {
  const feedbackUrl = `${process.env.VITE_FRONTEND_URL || "https://procleanempire.com"}/feedback?bookingId=${booking.id}&email=${encodeURIComponent(booking.email)}`;

  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8">
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; border-radius: 8px; margin-bottom: 20px; }
          .content { background: #f9f9f9; padding: 20px; border-radius: 8px; }
          .button { display: inline-block; background: #667eea; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin: 20px 0; }
          .stars { color: #ffc107; font-size: 24px; }
          .footer { text-align: center; color: #666; font-size: 12px; margin-top: 20px; border-top: 1px solid #ddd; padding-top: 20px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Merci pour votre confiance ! 🙏</h1>
            <p>Nous aimerions connaître votre avis sur notre service</p>
          </div>

          <div class="content">
            <p>Bonjour ${booking.name},</p>

            <p>Nous espérons que notre intervention pour le <strong>${booking.service}</strong> vous a satisfait.</p>

            <p>Votre avis est très important pour nous et nous aide à continuer à améliorer nos services. Nous vous invitons à évaluer votre expérience en quelques minutes.</p>

            <div style="text-align: center;">
              <a href="${feedbackUrl}" class="button">Donner mon avis ⭐</a>
            </div>

            <p style="color: #666; font-size: 14px;">
              Vous pouvez évaluer :
              <br>✓ La qualité du service
              <br>✓ La ponctualité
              <br>✓ Le professionnalisme de notre équipe
              <br>✓ Laisser un commentaire
            </p>

            <p style="margin-top: 30px; color: #666;">
              Merci de votre temps et de votre confiance !<br>
              <strong>L'équipe ProClean Empire</strong>
            </p>
          </div>

          <div class="footer">
            <p>© 2026 ProClean Empire - Tous droits réservés</p>
            <p>Vous recevez cet email car vous avez effectué une réservation avec nous.</p>
          </div>
        </div>
      </body>
    </html>
  `;

  const text = `
Merci pour votre confiance !

Bonjour ${booking.name},

Nous espérons que notre intervention pour le ${booking.service} vous a satisfait.

Votre avis est très important pour nous. Veuillez cliquer sur le lien ci-dessous pour évaluer votre expérience :

${feedbackUrl}

Vous pouvez évaluer :
- La qualité du service
- La ponctualité
- Le professionnalisme de notre équipe
- Laisser un commentaire

Merci de votre temps et de votre confiance !

L'équipe ProClean Empire
  `.trim();

  return { html, text };
}

/**
 * Envoie les demandes de feedback pour les réservations complétées il y a environ 24h
 */
export async function sendPendingFeedbackRequests() {
  try {
    console.log("[FeedbackScheduler] Vérification des réservations pour feedback...");

    const db = await getDb();
    if (!db) {
      console.warn("[FeedbackScheduler] Base de données non disponible");
      return;
    }

    // Récupérer les réservations complétées il y a environ 24h
    const now = new Date();
    const yesterday = new Date(now.getTime() - 24 * 60 * 60 * 1000);
    const twoDaysAgo = new Date(now.getTime() - 48 * 60 * 60 * 1000);

    // Formater les dates en YYYY-MM-DD
    const yesterdayStr = yesterday.toISOString().split("T")[0];
    const twoDaysAgoStr = twoDaysAgo.toISOString().split("T")[0];

    const completedBookings = await db
      .select()
      .from(bookings)
      .where(
        eq(bookings.status, "completed")
      );

    // Filtrer les réservations qui ont été complétées il y a environ 24h
    const bookingsForFeedback = completedBookings.filter((booking: any) => {
      const bookingDate = new Date(booking.date);
      return bookingDate >= twoDaysAgo && bookingDate <= yesterday;
    });

    console.log(`[FeedbackScheduler] ${bookingsForFeedback.length} réservations trouvées pour feedback`);

    // Envoyer les emails de feedback
    for (const booking of bookingsForFeedback) {
      try {
        const { html, text } = generateFeedbackEmail(booking);

        await sendEmail({
          to: booking.email,
          subject: "Votre avis nous intéresse ! ⭐ - ProClean Empire",
          html,
          text,
        });

        console.log(`[FeedbackScheduler] Email de feedback envoyé à ${booking.email}`);
      } catch (error) {
        console.error(`[FeedbackScheduler] Erreur lors de l'envoi à ${booking.email}:`, error);
      }
    }
  } catch (error) {
    console.error("[FeedbackScheduler] Erreur lors de l'envoi des feedbacks:", error);
  }
}

/**
 * Démarre le scheduler pour envoyer les feedbacks tous les jours à 10h
 */
export function startFeedbackScheduler() {
  // Envoyer les feedbacks tous les jours à 10h
  const now = new Date();
  const scheduledTime = new Date();
  scheduledTime.setHours(10, 0, 0, 0);

  // Si l'heure est déjà passée aujourd'hui, planifier pour demain
  if (scheduledTime <= now) {
    scheduledTime.setDate(scheduledTime.getDate() + 1);
  }

  const delay = scheduledTime.getTime() - now.getTime();

  console.log(`[FeedbackScheduler] Prochain envoi de feedbacks prévu dans ${Math.round(delay / 1000 / 60)} minutes`);

  // Planifier le premier envoi
  setTimeout(() => {
    sendPendingFeedbackRequests();

    // Puis, envoyer tous les jours à 10h
    setInterval(() => {
      sendPendingFeedbackRequests();
    }, 24 * 60 * 60 * 1000); // 24 heures
  }, delay);
}
