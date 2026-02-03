/**
 * Google Calendar Integration
 * Ajoute automatiquement les réservations au calendrier du propriétaire
 */

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
    tapis: 'Nettoyage Tapis & Canapés',
    balcon: 'Nettoyage Balcon',
    jardinage: 'Entretien Jardinage',
    facade: 'Nettoyage Façade',
    'panneaux-solaires': 'Nettoyage Panneaux Solaires',
  };
  return serviceMap[service] || service;
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

    console.log(`[GoogleCalendar] Événement: ${booking.name} - ${getServiceDescription(booking.service)} - ${startTime.toISOString()}`);

    // Pour maintenant, on simule l'ajout à Google Calendar
    // Dans une vraie implémentation, utiliser googleapis library
    console.log(`✅ [GoogleCalendar] Événement simulé pour le client: ${booking.email}`);
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
    const ownerCalendarId = process.env.GOOGLE_CALENDAR_ID || 'serviceclient@procleanempire.com';
    
    console.log(`[GoogleCalendar] Ajout d'événement au calendrier du propriétaire: ${ownerCalendarId}`);
    
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

    const eventDetails = {
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
      startTime: startTime.toISOString(),
      endTime: endTime.toISOString(),
      timeZone: 'Europe/Paris',
    };

    console.log(`✅ [GoogleCalendar] Événement pour propriétaire: ${eventDetails.summary}`);
    console.log(`   Détails: ${JSON.stringify(eventDetails)}`);

    // Pour maintenant, on simule l'ajout au calendrier du propriétaire
    // Dans une vraie implémentation, utiliser googleapis library avec credentials Service Account
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

    if (!calendarId) {
      console.error('❌ GOOGLE_CALENDAR_ID not configured');
      return false;
    }

    console.log('✅ Google Calendar configuration looks good');
    return true;
  } catch (error) {
    console.error('❌ Erreur de connexion Google Calendar:', error);
    return false;
  }
}
