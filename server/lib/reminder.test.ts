import { describe, it, expect, vi, beforeEach } from 'vitest';
import { sendReminderEmails, sendOwnerReminderEmail } from './reminder';
import * as emailModule from './email';
import * as dbModule from '../db';

// Mock des modules
vi.mock('./email');
vi.mock('../db');

describe('Reminder System', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('sendReminderEmails', () => {
    it('devrait envoyer des rappels pour les rendez-vous de demain', async () => {
      // Arrange
      const mockBookings = [
        {
          id: 1,
          name: 'Jean Dupont',
          email: 'jean@example.com',
          phone: '0612345678',
          service: 'automobile' as const,
          date: '2025-01-17',
          time: '10:00',
          address: '123 Rue de Paris',
          message: null,
          stripePaymentIntentId: null,
          paymentStatus: 'completed' as const,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];

      vi.mocked(dbModule.getBookingsByDateRange).mockResolvedValue(mockBookings);
      vi.mocked(emailModule.sendEmail).mockResolvedValue({ success: true, messageId: 'msg-123' });

      // Act
      const result = await sendReminderEmails();

      // Assert
      expect(result.sent).toBe(1);
      expect(result.failed).toBe(0);
      expect(emailModule.sendEmail).toHaveBeenCalledTimes(1);
      expect(emailModule.sendEmail).toHaveBeenCalledWith(
        expect.objectContaining({
          to: 'jean@example.com',
          subject: expect.stringContaining('Rappel'),
        })
      );
    });

    it('devrait retourner 0 envoyés si aucun rendez-vous demain', async () => {
      // Arrange
      vi.mocked(dbModule.getBookingsByDateRange).mockResolvedValue([]);

      // Act
      const result = await sendReminderEmails();

      // Assert
      expect(result.sent).toBe(0);
      expect(result.failed).toBe(0);
      expect(emailModule.sendEmail).not.toHaveBeenCalled();
    });

    it('devrait gérer les erreurs d\'envoi d\'email', async () => {
      // Arrange
      const mockBookings = [
        {
          id: 1,
          name: 'Jean Dupont',
          email: 'jean@example.com',
          phone: '0612345678',
          service: 'automobile' as const,
          date: '2025-01-17',
          time: '10:00',
          address: '123 Rue de Paris',
          message: null,
          stripePaymentIntentId: null,
          paymentStatus: 'completed' as const,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];

      vi.mocked(dbModule.getBookingsByDateRange).mockResolvedValue(mockBookings);
      vi.mocked(emailModule.sendEmail).mockRejectedValue(new Error('SMTP error'));

      // Act
      const result = await sendReminderEmails();

      // Assert
      expect(result.sent).toBe(0);
      expect(result.failed).toBe(1);
    });

    it('devrait envoyer des rappels pour plusieurs rendez-vous', async () => {
      // Arrange
      const mockBookings = [
        {
          id: 1,
          name: 'Jean Dupont',
          email: 'jean@example.com',
          phone: '0612345678',
          service: 'automobile' as const,
          date: '2025-01-17',
          time: '10:00',
          address: '123 Rue de Paris',
          message: null,
          stripePaymentIntentId: null,
          paymentStatus: 'completed' as const,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 2,
          name: 'Marie Martin',
          email: 'marie@example.com',
          phone: '0687654321',
          service: 'terrasse' as const,
          date: '2025-01-17',
          time: '14:00',
          address: '456 Avenue de Lyon',
          message: null,
          stripePaymentIntentId: null,
          paymentStatus: 'completed' as const,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];

      vi.mocked(dbModule.getBookingsByDateRange).mockResolvedValue(mockBookings);
      vi.mocked(emailModule.sendEmail).mockResolvedValue({ success: true, messageId: 'msg-123' });

      // Act
      const result = await sendReminderEmails();

      // Assert
      expect(result.sent).toBe(2);
      expect(result.failed).toBe(0);
      expect(emailModule.sendEmail).toHaveBeenCalledTimes(2);
    });
  });

  describe('sendOwnerReminderEmail', () => {
    it('devrait envoyer un résumé au propriétaire', async () => {
      // Arrange
      const mockBookings = [
        {
          id: 1,
          name: 'Jean Dupont',
          email: 'jean@example.com',
          phone: '0612345678',
          service: 'automobile' as const,
          date: '2025-01-17',
          time: '10:00',
          address: '123 Rue de Paris',
          message: null,
          stripePaymentIntentId: null,
          paymentStatus: 'completed' as const,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];

      vi.mocked(dbModule.getBookingsByDateRange).mockResolvedValue(mockBookings);
      vi.mocked(emailModule.sendEmail).mockResolvedValue({ success: true, messageId: 'msg-456' });

      // Act
      const result = await sendOwnerReminderEmail();

      // Assert
      expect(result).toBe(true);
      expect(emailModule.sendEmail).toHaveBeenCalledWith(
        expect.objectContaining({
          to: 'serviceclient@procleanempire.com',
          subject: expect.stringContaining('Rendez-vous de demain'),
        })
      );
    });

    it('devrait retourner false si aucun rendez-vous demain', async () => {
      // Arrange
      vi.mocked(dbModule.getBookingsByDateRange).mockResolvedValue([]);

      // Act
      const result = await sendOwnerReminderEmail();

      // Assert
      expect(result).toBe(false);
      expect(emailModule.sendEmail).not.toHaveBeenCalled();
    });

    it('devrait gérer les erreurs lors de l\'envoi au propriétaire', async () => {
      // Arrange
      const mockBookings = [
        {
          id: 1,
          name: 'Jean Dupont',
          email: 'jean@example.com',
          phone: '0612345678',
          service: 'automobile' as const,
          date: '2025-01-17',
          time: '10:00',
          address: '123 Rue de Paris',
          message: null,
          stripePaymentIntentId: null,
          paymentStatus: 'completed' as const,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];

      vi.mocked(dbModule.getBookingsByDateRange).mockResolvedValue(mockBookings);
      vi.mocked(emailModule.sendEmail).mockRejectedValue(new Error('SMTP error'));

      // Act
      const result = await sendOwnerReminderEmail();

      // Assert
      expect(result).toBe(false);
    });
  });
});
