import { describe, it, expect } from 'vitest';
import { appRouter } from './routers';

describe('Booking Integration Test', () => {
  it('should successfully send a booking with email confirmation', async () => {
    const caller = appRouter.createCaller({
      user: null,
      req: {} as any,
      res: {} as any,
    });

    const bookingData = {
      name: 'Test Client',
      email: 'test@example.com',
      phone: '0612345678',
      service: 'automobile' as const,
      date: '2025-12-01',
      time: 'matin' as const,
      address: '123 Rue de Test, 75001 Paris',
      message: 'Test de réservation',
    };

    const result = await caller.contact.sendBooking(bookingData);
    
    expect(result).toEqual({ success: true });
    console.log('✅ Test de réservation réussi - Email envoyé avec succès');
  }, 60000); // Timeout de 60 secondes pour l'envoi d'email
});
