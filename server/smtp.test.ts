import { describe, it, expect } from 'vitest';
import nodemailer from 'nodemailer';

describe('SMTP Configuration Test', () => {
  it('should validate SMTP credentials for serviceclient@procleanempire.com', async () => {
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: 'serviceclient@procleanempire.com',
        pass: process.env.GMAIL_APP_PASSWORD || '',
      },
    });

    // Vérifier la connexion SMTP
    await expect(transporter.verify()).resolves.toBe(true);
  }, 30000); // Timeout de 30 secondes
});
