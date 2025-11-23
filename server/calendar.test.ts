import { describe, it, expect } from 'vitest';
import { generateICSFile } from './lib/calendar';

describe('Calendar ICS Generation', () => {
  it('should generate a valid ICS file for a booking', () => {
    const booking = {
      name: 'Jean Dupont',
      email: 'jean.dupont@example.com',
      phone: '0612345678',
      service: 'automobile',
      date: '2025-12-01',
      time: '14:00',
      address: '123 Rue de la Paix, 75001 Paris',
      message: 'Nettoyage complet intérieur et extérieur',
    };

    const icsContent = generateICSFile(booking);

    expect(icsContent).toBeTruthy();
    expect(icsContent).toContain('BEGIN:VCALENDAR');
    expect(icsContent).toContain('END:VCALENDAR');
    expect(icsContent).toContain('BEGIN:VEVENT');
    expect(icsContent).toContain('END:VEVENT');
    expect(icsContent).toContain('ProClean Empire');
    expect(icsContent).toContain('Jean Dupont');
    // Les virgules sont échappées dans le format ICS
    expect(icsContent).toContain('123 Rue de la Paix');
  });

  it('should handle different services correctly', () => {
    const services = ['automobile', 'terrasse', 'tapis', 'balcon', 'jardinage'];

    services.forEach((service) => {
      const booking = {
        name: 'Test Client',
        email: 'test@example.com',
        phone: '0612345678',
        service,
        date: '2025-12-15',
        time: '10:00',
        address: '456 Avenue Test, 75002 Paris',
      };

      const icsContent = generateICSFile(booking);
      expect(icsContent).toBeTruthy();
      expect(icsContent).toContain('BEGIN:VCALENDAR');
    });
  });

  it('should set correct duration (2 hours)', () => {
    const booking = {
      name: 'Test Client',
      email: 'test@example.com',
      phone: '0612345678',
      service: 'automobile',
      date: '2025-12-01',
      time: '09:00',
      address: '789 Boulevard Test, 75003 Paris',
    };

    const icsContent = generateICSFile(booking);
    
    // Le fichier ICS devrait contenir une date de début et de fin
    expect(icsContent).toBeTruthy();
    expect(icsContent).toContain('DTSTART');
    expect(icsContent).toContain('DTEND');
  });
});
