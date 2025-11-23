import { describe, it, expect } from 'vitest';
import { sendEmail, generateBookingConfirmationEmail } from './lib/email';

describe('Email functionality', () => {
  it('should generate booking confirmation email content', () => {
    const email = generateBookingConfirmationEmail({
      name: 'Test User',
      service: 'automobile',
      date: '2024-12-01',
      time: '14:00',
      address: '123 Rue de Test, Paris',
    });

    expect(email.html).toContain('Test User');
    expect(email.html).toContain('Nettoyage Automobile');
    expect(email.html).toContain('2024-12-01');
    expect(email.text).toContain('Test User');
  });

  it('should validate email configuration', async () => {
    // Test basique pour vérifier que la configuration est présente
    expect(process.env.GMAIL_APP_PASSWORD).toBeDefined();
    expect(process.env.GMAIL_APP_PASSWORD).not.toBe('');
  }, { timeout: 10000 });
});
