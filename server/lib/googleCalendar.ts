/**
 * Google Calendar Integration
 * Ajoute automatiquement les réservations au calendrier du propriétaire et du client
 */

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

/**
 * Convertit le service en description lisible
 */
function getServiceDescription(service: string): string {
  const serviceMap: Record<string, string> = {
    automobile: 'Nettoyage Automobile',
    terrasse: 'Nettoyage Terrasse',
    tapis: 'Nettoyage Tapis & Canaпés',
    balcon: 'Nettoyage Balcon',
    jardinage: 'Entretien Jardinage',
    facade: 'Nettoyage Façade',
    piscine: 'Nettoyage Piscine',
  };
  return serviceMap[service] || service;
}

/**
 * Initialise le client Google Calendar
 */
function getGoogleCalendarClient() {
  try {
    const credentials = process.env.GOOGLE_CALENDAR_CREDENTIALS;
    
    if (!credentials) {
      console.warn('[GoogleCalendar] GOOGLE_CALENDAR_CREDENTIALS not configured');
      return null;
    }

    const credentialsObj = JSON.parse(credentials);
    
    const auth = new JWT({
      email: credentialsObj.client_email,
      key: credentialsObj.private_key,
      scopes: ['https://www.googleapis.com/auth/calendar'],
    });

    return google.calendar({ version: 'v3', auth });
  } catch (error) {
    console.error('[GoogleCalendar] Erreur lors de l\'initialisation du client Google Calendar:', error);
    return null;
  }
}

/**
 * Crée un événement dans Google Calendar du client
 */
export async function addEventToGoogleCalendar(booking: BookingEvent): Promise<boolean> {
  try {
    console.log(`[GoogleCalendar] Tentative d'ajout d'événement pour ${booking.email}`);
    
    // Vérifier les credentials
    const calendarId = process.env.GOOGLE_CALENDAR_ID;
    if (!calendarId) {
      console.warn('[GoogleCalendar] GOOGLE_CALENDAR_ID not configured, skipping client calendar event');
      return false;
    }

    const calendar = getGoogleCalendarClient();
    if (!calendar) {
      console.warn('[GoogleCalendar] Impossible d\'initialiser le client Google Calendar');
      return false;
    }

    console.log(`[GoogleCalendar] Utilisation du calendrier: ${calendarId}`);
    
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
      summary: `ProClean Empire - ${getServiceDescription(booking.service)}`,
      description: `Client: ${booking.name}\nTéléphone: ${booking.phone}\nAdresse: ${booking.address}${booking.message ? `\n\nInformations complémentaires:\n${booking.message}` : ""}`,
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
          { method: 'email', minutes: 24 * 60 }, // Rappel 24h avant
          { method: 'popup', minutes: 30 }, // Rappel 30min avant
        ],
      },
    };

    console.log(`[GoogleCalendar] Événement: ${booking.name} - ${getServiceDescription(booking.service)} - ${startTime.toISOString()}`);

    await calendar.events.insert({
      calendarId,
      requestBody: event,
    });

    console.log(`✅ [GoogleCalendar] Événement ajouté au calendrier du client: ${booking.email}`);
    return true;
  } catch (error) {
    console.error('[GoogleCalendar] Erreur lors de l\'ajout de l\'événement au calendrier client:', error);
    return false;
  }
}

/**
 * Ajoute un événement au calendrier du propriétaire
 */
export async function addEventToOwnerCalendar(booking: BookingEvent): Promise<boolean> {
  try {
    const ownerCalendarId = 'serviceclient@procleanempire.com';
    
    console.log(`[GoogleCalendar] Ajout d'événement au calendrier du propriétaire: ${ownerCalendarId}`);
    
    const calendar = getGoogleCalendarClient();
    if (!calendar) {
      console.warn('[GoogleCalendar] Impossible d\'initialiser le client Google Calendar pour le propriétaire');
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
      summary: `[RESERVATION] ${getServiceDescription(booking.service)} - ${booking.name}`,
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
      reminders: {
        useDefault: false,
        overrides: [
          { method: 'email', minutes: 24 * 60 }, // Rappel 24h avant
          { method: 'notification', minutes: 30 }, // Rappel 30min avant
        ],
      },
    };

    await calendar.events.insert({
      calendarId: ownerCalendarId,
      requestBody: event,
    });

    console.log(`✅ [GoogleCalendar] Événement ajouté au calendrier du propriétaire: ${event.summary}`);
    return true;
  } catch (error) {
    console.error('[GoogleCalendar] Erreur lors de l\'ajout au calendrier du propriétaire:', error);
    return false;
  }
}

/**
 * Teste la connexion à Google Calendar
 */
export async function testGoogleCalendarConnection(): Promise<boolean> {
  try {
    const calendarId = process.env.GOOGLE_CALENDAR_ID;
    const credentials = process.env.GOOGLE_CALENDAR_CREDENTIALS;

    console.log('[GoogleCalendar] Test de connexion...');
    console.log(`  - GOOGLE_CALENDAR_ID: ${calendarId ? '✅ Configuré' : '❌ Non configuré'}`);
    console.log(`  - GOOGLE_CALENDAR_CREDENTIALS: ${credentials ? '✅ Configuré' : '❌ Non configuré'}`);

    if (!calendarId || !credentials) {
      console.error('❌ Configuration Google Calendar incomplète');
      return false;
    }

    const calendar = getGoogleCalendarClient();
    if (!calendar) {
      console.error('❌ Impossible d\'initialiser le client Google Calendar');
      return false;
    }

    console.log('✅ Google Calendar configuration looks good');
    return true;
  } catch (error) {
    console.error('❌ Erreur de connexion Google Calendar:', error);
    return false;
  }
}
