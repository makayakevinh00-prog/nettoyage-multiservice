import Stripe from 'stripe';
import { sendEmail, generateBookingConfirmationEmail } from './email';
import { notifyOwner } from '../_core/notification';
import { generateICSFile } from './calendar';
import { addEventToGoogleCalendar } from './googleCalendar';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2026-02-25.clover',
});

interface BookingData {
  name: string;
  email: string;
  phone: string;
  service: string;
  date: string;
  time: string;
  address: string;
  message?: string;
}

/**
 * Crée un PaymentIntent pour la caution de 25€
 */
export async function createPaymentIntent(bookingData: BookingData) {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: 2500, // 25€ en centimes
      currency: 'eur',
      metadata: {
        name: bookingData.name,
        email: bookingData.email,
        phone: bookingData.phone,
        service: bookingData.service,
        date: bookingData.date,
        time: bookingData.time,
        address: bookingData.address,
        message: bookingData.message || '',
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
}

/**
 * Traite un paiement réussi
 */
export async function handlePaymentSuccess(paymentIntent: Stripe.PaymentIntent) {
  try {
    const metadata = paymentIntent.metadata as unknown as BookingData;

    // Envoyer la notification au propriétaire
    const serviceNames: Record<string, string> = {
      automobile: 'Nettoyage Automobile',
      terrasse: 'Nettoyage Terrasse',
      tapis: 'Nettoyage Tapis',
      balcon: 'Nettoyage Balcon',
      jardinage: 'Entretien Jardinage',
    };

    const emailContent = `
📅 Nouvelle réservation payée - ProClean Empire

👤 Client: ${metadata.name}
📧 Email: ${metadata.email}
📞 Téléphone: ${metadata.phone}
🧹 Service: ${serviceNames[metadata.service] || metadata.service}

📆 Date: ${metadata.date}
🕐 Heure: ${metadata.time}
📍 Adresse: ${metadata.address}

💳 Paiement: ✅ Caution de 25€ reçue (ID: ${paymentIntent.id})

💬 Informations complémentaires:
${metadata.message || 'Aucune information supplémentaire'}

---
Cette réservation a été confirmée par paiement.
    `.trim();

    await notifyOwner({
      title: `✅ Réservation payée - ${metadata.date} à ${metadata.time}`,
      content: emailContent,
    });

    // Ajouter à Google Calendar
    try {
      await addEventToGoogleCalendar(metadata);
    } catch (calendarError) {
      console.error('Erreur lors de l\'ajout à Google Calendar:', calendarError);
    }

    // Envoyer l'email de confirmation au client
    try {
      const confirmationEmail = generateBookingConfirmationEmail({
        name: metadata.name,
        service: metadata.service,
        date: metadata.date,
        time: metadata.time,
        address: metadata.address,
      });

      const icsContent = generateICSFile(metadata);

      const attachments = icsContent
        ? [
            {
              filename: 'rendez-vous-proclean.ics',
              content: icsContent,
              contentType: 'text/calendar',
            },
          ]
        : undefined;

      await sendEmail({
        to: metadata.email,
        subject: '✅ Votre réservation est confirmée - ProClean Empire',
        html: confirmationEmail.html,
        text: confirmationEmail.text,
        attachments,
      });
    } catch (emailError) {
      console.error('Erreur lors de l\'envoi de l\'email de confirmation:', emailError);
    }

    return true;
  } catch (error) {
    console.error('Erreur lors du traitement du paiement réussi:', error);
    return false;
  }
}

/**
 * Crée un remboursement pour une réservation
 */
export async function createRefund(paymentIntentId: string, reason: string) {
  try {
    const refund = await stripe.refunds.create({
      payment_intent: paymentIntentId,
      reason: 'requested_by_customer',
      metadata: {
        reason,
      },
    });

    console.log(`✅ Remboursement créé: ${refund.id}`);
    return refund;
  } catch (error) {
    console.error('Erreur lors de la création du remboursement:', error);
    throw error;
  }
}

/**
 * Récupère les détails d'un PaymentIntent
 */
export async function getPaymentIntent(paymentIntentId: string) {
  try {
    return await stripe.paymentIntents.retrieve(paymentIntentId);
  } catch (error) {
    console.error('Erreur lors de la récupération du PaymentIntent:', error);
    throw error;
  }
}
