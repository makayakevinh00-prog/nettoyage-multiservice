import { sendEmail, generateReminderEmail } from './email';
import { getBookingsByDateRange } from '../db';
import { format, addDays } from 'date-fns';
import { fr } from 'date-fns/locale';

/**
 * Envoie des rappels pour les rendez-vous de demain
 * À appeler une fois par jour, idéalement à 10h du matin
 */
export async function sendReminderEmails() {
  try {
    console.log('[Reminder] Vérification des rendez-vous de demain...');
    
    // Récupérer la date de demain au format YYYY-MM-DD
    const tomorrow = addDays(new Date(), 1);
    const tomorrowStr = format(tomorrow, 'yyyy-MM-dd');
    
    // Récupérer tous les rendez-vous de demain
    const bookings = await getBookingsByDateRange(tomorrowStr, tomorrowStr);
    
    if (bookings.length === 0) {
      console.log('[Reminder] Aucun rendez-vous demain');
      return { sent: 0, failed: 0 };
    }
    
    console.log(`[Reminder] ${bookings.length} rendez-vous trouvés pour demain`);
    
    let sent = 0;
    let failed = 0;
    
    // Envoyer un email de rappel pour chaque rendez-vous
    for (const booking of bookings) {
      try {
        const formattedDate = format(new Date(booking.date), 'EEEE dd MMMM yyyy', { locale: fr });
        const emailData = {
          name: booking.name,
          service: booking.service,
          date: formattedDate,
          time: booking.time,
          address: booking.address,
        };
        
        const reminderEmail = generateReminderEmail(emailData);
        
        // Envoyer au client
        await sendEmail({
          to: booking.email,
          subject: '🔔 Rappel de votre rendez-vous demain - ProClean Empire',
          html: reminderEmail.html,
          text: reminderEmail.text,
        });
        
        console.log(`[Reminder] Email envoyé à ${booking.email}`);
        sent++;
      } catch (error) {
        console.error(`[Reminder] Erreur lors de l'envoi du rappel pour ${booking.email}:`, error);
        failed++;
      }
    }
    
    console.log(`[Reminder] Résumé: ${sent} emails envoyés, ${failed} erreurs`);
    return { sent, failed };
  } catch (error) {
    console.error('[Reminder] Erreur lors de l\'envoi des rappels:', error);
    throw error;
  }
}

/**
 * Envoie un rappel au propriétaire pour les rendez-vous de demain
 */
export async function sendOwnerReminderEmail() {
  try {
    console.log('[Owner Reminder] Vérification des rendez-vous de demain...');
    
    const tomorrow = addDays(new Date(), 1);
    const tomorrowStr = format(tomorrow, 'yyyy-MM-dd');
    
    const bookings = await getBookingsByDateRange(tomorrowStr, tomorrowStr);
    
    if (bookings.length === 0) {
      console.log('[Owner Reminder] Aucun rendez-vous demain');
      return false;
    }
    
    // Créer un résumé des rendez-vous
    const bookingsList = bookings
      .map((b) => `
        • ${b.name} - ${b.service} à ${b.time}
          Adresse: ${b.address}
          Téléphone: ${b.phone}
          Email: ${b.email}
      `)
      .join('\n');
    
    const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: linear-gradient(135deg, #1e40af 0%, #1e3a8a 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
    .content { background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px; }
    .booking-item { background: white; padding: 15px; margin: 10px 0; border-left: 4px solid #1e40af; border-radius: 5px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>📋 Rendez-vous de demain</h1>
      <p>Résumé des interventions</p>
    </div>
    <div class="content">
      <p>Bonjour,</p>
      
      <p>Vous avez <strong>${bookings.length}</strong> rendez-vous demain. Voici le résumé :</p>
      
      ${bookings.map((b) => `
        <div class="booking-item">
          <p><strong>${b.name}</strong></p>
          <p>Service: ${b.service}</p>
          <p>Heure: ${b.time}</p>
          <p>Adresse: ${b.address}</p>
          <p>Téléphone: ${b.phone}</p>
          <p>Email: ${b.email}</p>
        </div>
      `).join('')}
      
      <p style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
        Assurez-vous que votre équipe est bien préparée pour ces interventions.
      </p>
    </div>
  </div>
</body>
</html>
    `;
    
    const text = `
Rendez-vous de demain - Résumé des interventions

Vous avez ${bookings.length} rendez-vous demain :

${bookingsList}

Assurez-vous que votre équipe est bien préparée pour ces interventions.
    `;
    
    await sendEmail({
      to: 'serviceclient@procleanempire.com',
      subject: `📋 Rendez-vous de demain (${bookings.length} intervention${bookings.length > 1 ? 's' : ''})`,
      html,
      text,
    });
    
    console.log('[Owner Reminder] Email envoyé au propriétaire');
    return true;
  } catch (error) {
    console.error('[Owner Reminder] Erreur lors de l\'envoi du rappel au propriétaire:', error);
    return false;
  }
}
