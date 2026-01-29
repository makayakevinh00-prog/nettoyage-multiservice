import { describe, it, expect } from 'vitest';
import { generateBookingConfirmationEmail, generateReminderEmail } from './email';

describe('Email Configuration and Sending', () => {
  describe('Email Address Configuration', () => {
    it('should use serviceclient@procleanempire.com in booking confirmation', () => {
      const bookingEmail = generateBookingConfirmationEmail({
        name: 'Test User',
        service: 'automobile',
        date: '2024-12-01',
        time: '14:00',
        address: '123 Rue de Test, Paris',
      });

      expect(bookingEmail.html).toContain('serviceclient@procleanempire.com');
      expect(bookingEmail.text).toContain('serviceclient@procleanempire.com');
    });

    it('should NOT use makayakevinh00@gmail.com in booking confirmation', () => {
      const bookingEmail = generateBookingConfirmationEmail({
        name: 'Test User',
        service: 'automobile',
        date: '2024-12-01',
        time: '14:00',
        address: '123 Rue de Test, Paris',
      });

      expect(bookingEmail.html).not.toContain('makayakevinh00@gmail.com');
      expect(bookingEmail.text).not.toContain('makayakevinh00@gmail.com');
    });

    it('should have correct email in booking confirmation with price', () => {
      const bookingEmail = generateBookingConfirmationEmail({
        name: 'Test User',
        service: 'automobile',
        date: '2024-12-01',
        time: '14:00',
        address: '123 Rue de Test, Paris',
        price: 7000, // 70€
      });

      expect(bookingEmail.html).toContain('serviceclient@procleanempire.com');
      expect(bookingEmail.text).toContain('serviceclient@procleanempire.com');
      expect(bookingEmail.html).toContain('70.00€');
    });

    it('should have correct email in reminder email', () => {
      const reminderEmail = generateReminderEmail({
        name: 'Test User',
        service: 'automobile',
        date: '2024-12-01',
        time: '14:00',
        address: '123 Rue de Test, Paris',
      });

      expect(reminderEmail.html).toContain('serviceclient@procleanempire.com');
      expect(reminderEmail.text).toContain('serviceclient@procleanempire.com');
    });
  });

  describe('Email Content Validation', () => {
    it('should include all booking details in confirmation email', () => {
      const bookingEmail = generateBookingConfirmationEmail({
        name: 'John Doe',
        service: 'terrasse',
        date: '2024-12-15',
        time: '10:00',
        address: '456 Avenue de Test, Lyon',
        serviceOption: 'Terrasse 20-40m²',
        price: 14000, // 140€
      });

      expect(bookingEmail.html).toContain('John Doe');
      expect(bookingEmail.html).toContain('Nettoyage Terrasse');
      expect(bookingEmail.html).toContain('2024-12-15');
      expect(bookingEmail.html).toContain('10:00');
      expect(bookingEmail.html).toContain('456 Avenue de Test, Lyon');
      expect(bookingEmail.html).toContain('Terrasse 20-40m²');
      expect(bookingEmail.html).toContain('140.00€');
    });

    it('should include phone number in booking confirmation', () => {
      const bookingEmail = generateBookingConfirmationEmail({
        name: 'Test User',
        service: 'automobile',
        date: '2024-12-01',
        time: '14:00',
        address: '123 Rue de Test, Paris',
      });

      expect(bookingEmail.html).toContain('06 17 21 22 30');
      expect(bookingEmail.text).toContain('06 17 21 22 30');
    });

    it('should include payment instructions', () => {
      const bookingEmail = generateBookingConfirmationEmail({
        name: 'Test User',
        service: 'automobile',
        date: '2024-12-01',
        time: '14:00',
        address: '123 Rue de Test, Paris',
      });

      expect(bookingEmail.html).toContain('Paiement sur place');
      expect(bookingEmail.html).toContain('espèces');
      expect(bookingEmail.html).toContain('cartes bancaires');
    });

    it('should include preparation instructions', () => {
      const bookingEmail = generateBookingConfirmationEmail({
        name: 'Test User',
        service: 'automobile',
        date: '2024-12-01',
        time: '14:00',
        address: '123 Rue de Test, Paris',
      });

      expect(bookingEmail.html).toContain('À préparer avant l\'intervention');
      expect(bookingEmail.html).toContain('accès à votre domicile');
    });
  });
});
