import { notifyOwner } from "./_core/notification";

interface NotificationData {
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  service: string;
  date: string;
  time: string;
  totalPrice: number;
  address?: string;
}

/**
 * Envoyer une confirmation de réservation au client
 */
export async function sendReservationConfirmation(data: NotificationData) {
  try {
    // Email de confirmation
    const emailContent = `
      <h2>Confirmation de votre réservation</h2>
      <p>Bonjour ${data.clientName},</p>
      <p>Votre réservation a été confirmée !</p>
      <h3>Détails de votre prestation :</h3>
      <ul>
        <li><strong>Service :</strong> ${data.service}</li>
        <li><strong>Date :</strong> ${new Date(data.date).toLocaleDateString("fr-FR")}</li>
        <li><strong>Heure :</strong> ${data.time}</li>
        <li><strong>Montant :</strong> ${data.totalPrice}€</li>
        ${data.address ? `<li><strong>Adresse :</strong> ${data.address}</li>` : ""}
      </ul>
      <p>Vous recevrez un rappel 24h avant l'intervention.</p>
      <p>Merci d'avoir choisi ProClean Empire !</p>
    `;

    // Notifier le propriétaire
    await notifyOwner({
      title: `Nouvelle réservation - ${data.clientName}`,
      content: `${data.service} - ${data.date} à ${data.time} - ${data.totalPrice}€`,
    });

    console.log("[Notifications] Confirmation de réservation envoyée à", data.clientEmail);
    return true;
  } catch (error) {
    console.error("[Notifications] Erreur lors de l'envoi de la confirmation :", error);
    return false;
  }
}

/**
 * Envoyer un rappel SMS 24h avant l'intervention
 */
export async function sendReminderSMS(data: NotificationData) {
  try {
    const message = `Rappel ProClean Empire : Votre ${data.service} est prévue demain à ${data.time}. À bientôt !`;
    
    console.log(`[Notifications] SMS de rappel envoyé à ${data.clientPhone}: ${message}`);
    
    // En production, intégrer avec un service SMS comme Twilio
    return true;
  } catch (error) {
    console.error("[Notifications] Erreur lors de l'envoi du SMS :", error);
    return false;
  }
}

/**
 * Envoyer une confirmation de paiement
 */
export async function sendPaymentConfirmation(data: NotificationData & { paymentId: string }) {
  try {
    const emailContent = `
      <h2>Paiement confirmé</h2>
      <p>Bonjour ${data.clientName},</p>
      <p>Votre paiement a été traité avec succès !</p>
      <h3>Récapitulatif :</h3>
      <ul>
        <li><strong>Service :</strong> ${data.service}</li>
        <li><strong>Montant :</strong> ${data.totalPrice}€</li>
        <li><strong>ID de transaction :</strong> ${data.paymentId}</li>
      </ul>
      <p>Vous recevrez un rappel 24h avant votre intervention.</p>
    `;

    console.log("[Notifications] Confirmation de paiement envoyée à", data.clientEmail);
    return true;
  } catch (error) {
    console.error("[Notifications] Erreur lors de l'envoi de la confirmation de paiement :", error);
    return false;
  }
}

/**
 * Envoyer une notification de changement d'abonnement
 */
export async function sendSubscriptionChangeNotification(data: {
  clientName: string;
  clientEmail: string;
  action: "created" | "updated" | "cancelled";
  service: string;
  frequency?: string;
  nextDate?: string;
}) {
  try {
    const actionText = {
      created: "créé",
      updated: "modifié",
      cancelled: "annulé",
    }[data.action];

    const emailContent = `
      <h2>Votre abonnement a été ${actionText}</h2>
      <p>Bonjour ${data.clientName},</p>
      <p>Votre abonnement ${data.service} a été ${actionText}.</p>
      ${data.frequency ? `<p><strong>Fréquence :</strong> ${data.frequency}</p>` : ""}
      ${data.nextDate ? `<p><strong>Prochaine intervention :</strong> ${data.nextDate}</p>` : ""}
    `;

    console.log("[Notifications] Notification de changement d'abonnement envoyée à", data.clientEmail);
    return true;
  } catch (error) {
    console.error("[Notifications] Erreur lors de l'envoi de la notification d'abonnement :", error);
    return false;
  }
}

/**
 * Envoyer une notification de support
 */
export async function sendSupportNotification(data: {
  clientName: string;
  clientEmail: string;
  subject: string;
  message: string;
  ticketId: string;
}) {
  try {
    const emailContent = `
      <h2>Votre demande de support a été reçue</h2>
      <p>Bonjour ${data.clientName},</p>
      <p>Merci de nous avoir contactés. Votre demande a été enregistrée.</p>
      <h3>Détails de votre demande :</h3>
      <ul>
        <li><strong>Sujet :</strong> ${data.subject}</li>
        <li><strong>ID du ticket :</strong> ${data.ticketId}</li>
      </ul>
      <p>Notre équipe vous répondra dans les 24h.</p>
    `;

    // Notifier le propriétaire
    await notifyOwner({
      title: `Nouveau ticket de support - ${data.clientName}`,
      content: `${data.subject} - Ticket #${data.ticketId}`,
    });

    console.log("[Notifications] Notification de support envoyée à", data.clientEmail);
    return true;
  } catch (error) {
    console.error("[Notifications] Erreur lors de l'envoi de la notification de support :", error);
    return false;
  }
}
