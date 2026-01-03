import { google } from 'googleapis';
import { JWT } from 'google-auth-library';

interface BookingEvent {
  name: string;
  email: string;
  phone: string;
  service: string;
  date: string;
  time: string;
  address: string;
  message?: string;
}

// Service de gestion Google Calendar
let calendarService: any = null;

/**
 * Initialise le service Google Calendar avec les credentials
 */
function initializeCalendarService() {
  if (calendarService) {
    return calendarService;
  }

  const credentialsJson = process.env.GOOGLE_CALENDAR_CREDENTIALS;
  
  if (!credentialsJson) {
    throw new Error('GOOGLE_CALENDAR_CREDENTIALS environment variable is not set');
  }

  let credentials;
  try {
    credentials = JSON.parse(credentialsJson);
  } catch (error) {
    throw new Error('Invalid GOOGLE_CALENDAR_CREDENTIALS JSON format');
  }

  const auth = new JWT({
    email: credentials.client_email,
    key: credentials.private_key,
    scopes: ['https://www.googleapis.com/auth/calendar'],
  });

  calendarService = google.calendar({ version: 'v3', auth });
  return calendarService;
}

/**
 * Convertit le service en description lisible
 */
function getServiceDescription(service: string): string {
  const serviceMap: Record<string, string> = {
    automobile: 'Nettoyage Automobile',
    terrasse: 'Nettoyage Terrasse',
    tapis: 'Nettoyage Tapis & Canapés',
    balcon: 'Nettoyage Balcon',
    jardinage: 'Entretien Jardinage',
  };
  return serviceMap[service] || service;
}

/**
 * Crée un événement dans Google Calendar
 */
export async function addEventToGoogleCalendar(booking: BookingEvent): Promise<boolean> {
  try {
    const calendar = initializeCalendarService();
    const calendarId = process.env.GOOGLE_CALENDAR_ID;

    if (!calendarId) {
      console.error('GOOGLE_CALENDAR_ID environment variable is not set');
      return false;
    }

    // Convertir la date et l'heure en format ISO
    const [year, month, day] = booking.date.split('-');
    const [hours, minutes] = booking.time.split(':');
    
    const startTime = new Date(
      parseInt(year),
      parseInt(month) - 1,
      parseInt(day),
      parseInt(hours),
      parseInt(minutes)
    );

    // Durée de 2 heures par défaut
    const endTime = new Date(startTime.getTime() + 2 * 60 * 60 * 1000);

    const event = {
      summary: `Réservation - ${getServiceDescription(booking.service)}`,
      description: `
Client: ${booking.name}
Email: ${booking.email}
Téléphone: ${booking.phone}
Service: ${getServiceDescription(booking.service)}
Adresse: ${booking.address}
${booking.message ? `Notes: ${booking.message}` : ''}
      `.trim(),
      location: booking.address,
      start: {
        dateTime: startTime.toISOString(),
        timeZone: 'Europe/Paris',
      },
      end: {
        dateTime: endTime.toISOString(),
        timeZone: 'Europe/Paris',
      },
      attendees: [
        {
          email: booking.email,
          displayName: booking.name,
          responseStatus: 'needsAction',
        },
      ],
      reminders: {
        useDefault: false,
        overrides: [
          { method: 'email', minutes: 24 * 60 }, // 24 heures avant
          { method: 'notification', minutes: 60 }, // 1 heure avant
        ],
      },
    };

    const response = await calendar.events.insert({
      calendarId,
      requestBody: event,
      sendNotifications: true,
    });

    console.log(`✅ Événement créé dans Google Calendar: ${response.data.id}`);
    return true;
  } catch (error) {
    console.error('❌ Erreur lors de l\'ajout de l\'événement à Google Calendar:', error);
    return false;
  }
}

/**
 * Teste la connexion à Google Calendar
 */
export async function testGoogleCalendarConnection(): Promise<boolean> {
  try {
    const calendar = initializeCalendarService();
    const calendarId = process.env.GOOGLE_CALENDAR_ID;

    if (!calendarId) {
      console.error('GOOGLE_CALENDAR_ID environment variable is not set');
      return false;
    }

    // Essayer de récupérer le calendrier
    const response = await calendar.calendars.get({
      calendarId,
    });

    console.log(`✅ Connexion Google Calendar réussie: ${response.data.summary}`);
    return true;
  } catch (error) {
    console.error('❌ Erreur de connexion Google Calendar:', error);
    return false;
  }
}
