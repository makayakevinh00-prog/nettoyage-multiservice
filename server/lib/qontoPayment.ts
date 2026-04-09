import axios from 'axios';
import { sendEmail, generateBookingConfirmationEmail } from './email';
import { notifyOwner } from '../_core/notification';
import { generateICSFile } from './calendar';
import { addEventToGoogleCalendar } from './googleCalendar';

const QONTO_API_BASE = 'https://api.qonto.com/v2';

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
 * Crée une demande de paiement Qonto
 */
export async function createQontoPaymentRequest(
  bookingData: BookingData,
  amount: number,
  successUrl: string,
  cancelUrl: string
) {
  try {
    const apiKey = process.env.QONTO_API_KEY;
    const organizationId = process.env.QONTO_ORGANIZATION_ID;

    if (!apiKey || !organizationId) {
      throw new Error('Clés Qonto manquantes');
    }

    // Créer une demande de paiement via l'API Qonto
    const response = await axios.post(
      `${QONTO_API_BASE}/payment_requests`,
      {
        organization_id: organizationId,
        amount_cents: Math.round(amount * 100),
        currency: 'EUR',
        label: `${bookingData.service} - ${bookingData.name}`,
        description: `Réservation pour ${bookingData.date} à ${bookingData.time}`,
        custom_metadata: {
          client_name: bookingData.name,
          client_email: bookingData.email,
          client_phone: bookingData.phone,
          service: bookingData.service,
          date: bookingData.date,
          time: bookingData.time,
          address: bookingData.address,
          message: bookingData.message || '',
        },
        success_redirect_url: successUrl,
        failure_redirect_url: cancelUrl,
      },
      {
        auth: {
          username: apiKey,
          password: '', // Qonto utilise l'API key comme username
        },
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    console.log('[Qonto] Demande de paiement créée:', response.data.payment_request.id);

    return {
      paymentRequestId: response.data.payment_request.id,
      url: response.data.payment_request.payment_url,
    };
  } catch (error) {
    console.error('[Qonto] Erreur lors de la création de la demande de paiement:', error);
    throw new Error('Impossible de créer la demande de paiement');
  }
}

/**
 * Traite un paiement réussi
 */
export async function handleQontoPaymentSuccess(paymentData: BookingData) {
  try {
    const serviceNames: Record<string, string> = {
      automobile: 'Nettoyage Automobile',
      terrasse: 'Nettoyage Terrasse',
      tapis: 'Nettoyage Tapis',
      balcon: 'Nettoyage Balcon',
      jardinage: 'Entretien Jardinage',
    };

    const emailContent = `
📅 Nouvelle réservation payée - ProClean Empire

👤 Client: ${paymentData.name}
📧 Email: ${paymentData.email}
📞 Téléphone: ${paymentData.phone}
🧹 Service: ${serviceNames[paymentData.service] || paymentData.service}

📆 Date: ${paymentData.date}
🕐 Heure: ${paymentData.time}
📍 Adresse: ${paymentData.address}

💳 Paiement: ✅ Reçu via Qonto

💬 Informations complémentaires:
${paymentData.message || 'Aucune information supplémentaire'}

---
Cette réservation a été confirmée par paiement.
    `.trim();

    await notifyOwner({
      title: `✅ Réservation payée - ${paymentData.date} à ${paymentData.time}`,
      content: emailContent,
    });

    // Ajouter à Google Calendar
    try {
      await addEventToGoogleCalendar(paymentData);
    } catch (calendarError) {
      console.error('[Qonto] Erreur lors de l\'ajout à Google Calendar:', calendarError);
    }

    // Envoyer l'email de confirmation au client
    try {
      const confirmationEmail = generateBookingConfirmationEmail({
        name: paymentData.name,
        service: paymentData.service,
        date: paymentData.date,
        time: paymentData.time,
        address: paymentData.address,
      });

      const icsContent = generateICSFile(paymentData);

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
        to: paymentData.email,
        subject: '✅ Votre réservation est confirmée - ProClean Empire',
        html: confirmationEmail.html,
        text: confirmationEmail.text,
        attachments,
      });
    } catch (emailError) {
      console.error('[Qonto] Erreur lors de l\'envoi de l\'email de confirmation:', emailError);
    }

    return true;
  } catch (error) {
    console.error('[Qonto] Erreur lors du traitement du paiement réussi:', error);
    return false;
  }
}

/**
 * Récupère les détails d'une demande de paiement
 */
export async function getQontoPaymentRequest(paymentRequestId: string) {
  try {
    const apiKey = process.env.QONTO_API_KEY;

    if (!apiKey) {
      throw new Error('Clé Qonto manquante');
    }

    const response = await axios.get(
      `${QONTO_API_BASE}/payment_requests/${paymentRequestId}`,
      {
        auth: {
          username: apiKey,
          password: '',
        },
      }
    );

    return response.data.payment_request;
  } catch (error) {
    console.error('[Qonto] Erreur lors de la récupération de la demande de paiement:', error);
    throw error;
  }
}

/**
 * Crée un remboursement
 */
export async function createQontoRefund(paymentRequestId: string, reason: string) {
  try {
    const apiKey = process.env.QONTO_API_KEY;

    if (!apiKey) {
      throw new Error('Clé Qonto manquante');
    }

    const response = await axios.post(
      `${QONTO_API_BASE}/payment_requests/${paymentRequestId}/refund`,
      {
        reason,
      },
      {
        auth: {
          username: apiKey,
          password: '',
        },
      }
    );

    console.log('[Qonto] Remboursement créé:', response.data.refund.id);
    return response.data.refund;
  } catch (error) {
    console.error('[Qonto] Erreur lors de la création du remboursement:', error);
    throw error;
  }
}
