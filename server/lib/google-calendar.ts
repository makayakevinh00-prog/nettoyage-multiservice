import { google } from 'googleapis';
import { JWT } from 'google-auth-library';

// Types pour les réservations
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
 * Ajoute un événement au calendrier Google
 */
export async function addEventToGoogleCalendar(booking: BookingData) {
  try {
    // Vérification des variables d'environnement
    const clientEmail = process.env.GOOGLE_CLIENT_EMAIL;
    const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n');
    const calendarId = process.env.GOOGLE_CALENDAR_ID;

    if (!clientEmail || !privateKey || !calendarId) {
      console.warn('⚠️ Google Calendar non configuré : variables d\'environnement manquantes.');
      return null;
    }

    // Authentification avec le Service Account
    const auth = new JWT({
      email: clientEmail,
      key: privateKey,
      scopes: ['https://www.googleapis.com/auth/calendar'],
    });

    const calendar = google.calendar({ version: 'v3', auth });

    // Préparation des dates
    const startDateTime = new Date(`${booking.date}T${booking.time}:00`);
    const endDateTime = new Date(startDateTime.getTime() + 2 * 60 * 60 * 1000); // +2 heures par défaut

    const event = {
      summary: `ProClean Empire - ${booking.service} (${booking.name})`,
      location: booking.address,
      description: `
👤 Client: ${booking.name}
📧 Email: ${booking.email}
📞 Téléphone: ${booking.phone}
🧹 Service: ${booking.service}
📍 Adresse: ${booking.address}
💬 Message: ${booking.message || 'Aucun'}
      `.trim(),
      start: {
        dateTime: startDateTime.toISOString(),
        timeZone: 'Europe/Paris',
      },
      end: {
        dateTime: endDateTime.toISOString(),
        timeZone: 'Europe/Paris',
      },
      attendees: [{ email: booking.email }],
      reminders: {
        useDefault: false,
        overrides: [
          { method: 'email', minutes: 24 * 60 },
          { method: 'popup', minutes: 60 },
        ],
      },
    };

    const response = await calendar.events.insert({
      calendarId: calendarId || 'primary',
      requestBody: event,
    });

    console.log('✅ Événement créé dans Google Calendar:', response.data.htmlLink);
    return response.data;
  } catch (error) {
    console.error('❌ Erreur lors de l\'ajout au calendrier Google:', error);
    return null;
  }
}
