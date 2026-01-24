import { google } from "googleapis";
import { ENV } from "./env";

let calendarClient: ReturnType<typeof google.calendar> | null = null;

export async function getCalendarClient() {
  if (calendarClient) {
    return calendarClient;
  }

  try {
    const credentials = JSON.parse(ENV.googleCalendarCredentials || "{}");
    
    const auth = new google.auth.GoogleAuth({
      credentials,
      scopes: ["https://www.googleapis.com/auth/calendar"],
    });

    calendarClient = google.calendar({ version: "v3", auth });
    return calendarClient;
  } catch (error) {
    console.error("[Google Calendar] Failed to initialize client:", error);
    throw new Error("Google Calendar not configured");
  }
}

export interface CalendarEventData {
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  service: string;
  quantity: number;
  date: Date;
  time: string;
  address: string;
  description?: string;
  price?: number;
}

export async function createCalendarEvent(eventData: CalendarEventData) {
  try {
    const calendar = await getCalendarClient();
    
    // Parse time (format: "HH:mm")
    const [hours, minutes] = eventData.time.split(":").map(Number);
    const startDateTime = new Date(eventData.date);
    startDateTime.setHours(hours, minutes, 0, 0);
    
    // End time: 2 hours after start
    const endDateTime = new Date(startDateTime);
    endDateTime.setHours(endDateTime.getHours() + 2);

    // Build event description
    const description = `
Réservation ProClean Empire

**Informations Client:**
- Nom: ${eventData.clientName}
- Email: ${eventData.clientEmail}
- Téléphone: ${eventData.clientPhone}

**Service:**
- Type: ${eventData.service}
- Quantité: ${eventData.quantity}
${eventData.price ? `- Prix: ${eventData.price}€` : ""}

**Lieu d'Intervention:**
${eventData.address}

**Notes:**
${eventData.description || "Aucune note"}

---
Gestion des réservations ProClean Empire
    `.trim();

    const event = {
      summary: `Réservation - ${eventData.clientName} (${eventData.service})`,
      description,
      start: {
        dateTime: startDateTime.toISOString(),
        timeZone: "Europe/Paris",
      },
      end: {
        dateTime: endDateTime.toISOString(),
        timeZone: "Europe/Paris",
      },
      location: eventData.address,
      attendees: [
        {
          email: eventData.clientEmail,
          displayName: eventData.clientName,
          responseStatus: "needsAction",
        },
      ],
      reminders: {
        useDefault: false,
        overrides: [
          { method: "email", minutes: 24 * 60 }, // 24h before
          { method: "notification", minutes: 60 }, // 1h before
        ],
      },
    };

    const response = await calendar.events.insert({
      calendarId: ENV.googleCalendarId || "primary",
      requestBody: event,
      sendUpdates: "all", // Send invitation to attendees
    });

    console.log("[Google Calendar] Event created:", response.data.id);
    return response.data;
  } catch (error) {
    console.error("[Google Calendar] Failed to create event:", error);
    throw error;
  }
}

export async function updateCalendarEvent(eventId: string, eventData: Partial<CalendarEventData>) {
  try {
    const calendar = await getCalendarClient();

    const event: any = {};
    
    if (eventData.clientName) {
      event.summary = `Réservation - ${eventData.clientName}`;
    }

    if (eventData.date && eventData.time) {
      const [hours, minutes] = eventData.time.split(":").map(Number);
      const startDateTime = new Date(eventData.date);
      startDateTime.setHours(hours, minutes, 0, 0);
      
      const endDateTime = new Date(startDateTime);
      endDateTime.setHours(endDateTime.getHours() + 2);

      event.start = {
        dateTime: startDateTime.toISOString(),
        timeZone: "Europe/Paris",
      };
      event.end = {
        dateTime: endDateTime.toISOString(),
        timeZone: "Europe/Paris",
      };
    }

    const response = await calendar.events.update({
      calendarId: ENV.googleCalendarId || "primary",
      eventId,
      requestBody: event,
      sendUpdates: "all",
    });

    console.log("[Google Calendar] Event updated:", eventId);
    return response.data;
  } catch (error) {
    console.error("[Google Calendar] Failed to update event:", error);
    throw error;
  }
}

export async function deleteCalendarEvent(eventId: string) {
  try {
    const calendar = await getCalendarClient();

    await calendar.events.delete({
      calendarId: ENV.googleCalendarId || "primary",
      eventId,
      sendUpdates: "all",
    });

    console.log("[Google Calendar] Event deleted:", eventId);
  } catch (error) {
    console.error("[Google Calendar] Failed to delete event:", error);
    throw error;
  }
}
