import { createEvents, EventAttributes, DateArray } from "ics";

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

export function generateICSFile(booking: BookingData): string | null {
  try {
    // Parse date and time
    const [year, month, day] = booking.date.split("-").map(Number);
    const [hours, minutes] = booking.time.split(":").map(Number);

    // Create start date array [year, month, day, hours, minutes]
    const startDate: DateArray = [year, month, day, hours, minutes];
    
    // End time is 2 hours after start
    const endHours = hours + 2;
    const endDate: DateArray = [year, month, day, endHours, minutes];

    const event: EventAttributes = {
      start: startDate,
      end: endDate,
      title: `ProClean Empire - ${booking.service}`,
      description: `Service: ${booking.service}\nClient: ${booking.name}\nTéléphone: ${booking.phone}\nAdresse: ${booking.address}${booking.message ? `\n\nInformations complémentaires:\n${booking.message}` : ""}`,
      location: booking.address,
      status: "CONFIRMED",
      busyStatus: "BUSY",
      organizer: { name: "ProClean Empire", email: "serviceclient@procleanempire.com" },
      attendees: [
        {
          name: booking.name,
          email: booking.email,
          rsvp: true,
          partstat: "NEEDS-ACTION",
          role: "REQ-PARTICIPANT",
        },
      ],
    };

    const { error, value } = createEvents([event]);

    if (error) {
      console.error("Erreur lors de la création du fichier ICS:", error);
      return null;
    }

    return value || null;
  } catch (error) {
    console.error("Erreur lors de la génération du fichier ICS:", error);
    return null;
  }
}
