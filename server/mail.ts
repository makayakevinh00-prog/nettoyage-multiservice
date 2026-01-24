import nodemailer from 'nodemailer';
import { ENV } from './_core/env';

// Créer le transporteur Gmail
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: ENV.gmailUser,
    pass: ENV.gmailAppPassword,
  },
});

export interface BookingMailData {
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  service: string;
  option: string;
  date: string;
  time: string;
  address: string;
  message?: string;
  price?: number;
}

/**
 * Envoyer un mail de confirmation au client
 */
export async function sendClientConfirmationMail(data: BookingMailData) {
  const priceText = data.price 
    ? `<p><strong>Prix estimé : ${data.price}€</strong></p>`
    : `<p><strong>Nous vous enverrons un devis personnalisé sous 24h.</strong></p>`;

  const htmlContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8">
        <style>
          body { font-family: Arial, sans-serif; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background-color: #0066cc; color: white; padding: 20px; text-align: center; border-radius: 5px; }
          .content { padding: 20px; background-color: #f9f9f9; margin-top: 20px; border-radius: 5px; }
          .detail { margin: 10px 0; }
          .label { font-weight: bold; color: #0066cc; }
          .footer { text-align: center; color: #666; font-size: 12px; margin-top: 20px; }
          .cta { display: inline-block; background-color: #ff9900; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; margin-top: 20px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Merci pour votre demande ! 🎉</h1>
          </div>
          
          <div class="content">
            <p>Bonjour <strong>${data.clientName}</strong>,</p>
            
            <p>Nous avons bien reçu votre demande de devis pour le service de nettoyage. Voici les détails de votre réservation :</p>
            
            <div class="detail">
              <span class="label">Service :</span> ${data.service}
            </div>
            
            <div class="detail">
              <span class="label">Option :</span> ${data.option}
            </div>
            
            <div class="detail">
              <span class="label">Date :</span> ${data.date}
            </div>
            
            <div class="detail">
              <span class="label">Heure :</span> ${data.time}
            </div>
            
            <div class="detail">
              <span class="label">Adresse :</span> ${data.address}
            </div>
            
            ${data.message ? `
            <div class="detail">
              <span class="label">Message :</span> ${data.message}
            </div>
            ` : ''}
            
            <hr style="margin: 20px 0; border: none; border-top: 1px solid #ddd;">
            
            ${priceText}
            
            <p>Notre équipe ProClean Empire vous contactera sous peu pour confirmer votre intervention.</p>
            
            <p>
              <strong>Questions ?</strong><br>
              Appelez-nous au <strong>01 XX XX XX XX</strong> ou répondez à cet email.
            </p>
          </div>
          
          <div class="footer">
            <p>© 2026 ProClean Empire - Nettoyage Professionnel en Île-de-France</p>
            <p>Merci de nous faire confiance !</p>
          </div>
        </div>
      </body>
    </html>
  `;

  try {
    await transporter.sendMail({
      from: `ProClean Empire <${ENV.gmailUser}>`,
      to: data.clientEmail,
      subject: `Confirmation de votre demande de devis - ProClean Empire`,
      html: htmlContent,
    });
    console.log(`[Mail] Confirmation envoyée à ${data.clientEmail}`);
    return true;
  } catch (error) {
    console.error('[Mail] Erreur lors de l\'envoi du mail client:', error);
    return false;
  }
}

/**
 * Envoyer un mail au propriétaire avec les détails de la réservation
 */
export async function sendOwnerNotificationMail(data: BookingMailData) {
  const priceText = data.price 
    ? `<p><strong>Prix : ${data.price}€</strong></p>`
    : `<p><strong>⚠️ DEVIS À ENVOYER</strong> - Pas de prix pour cette option</p>`;

  const htmlContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8">
        <style>
          body { font-family: Arial, sans-serif; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background-color: #ff6600; color: white; padding: 20px; text-align: center; border-radius: 5px; }
          .content { padding: 20px; background-color: #f9f9f9; margin-top: 20px; border-radius: 5px; }
          .detail { margin: 10px 0; }
          .label { font-weight: bold; color: #ff6600; }
          .footer { text-align: center; color: #666; font-size: 12px; margin-top: 20px; }
          .alert { background-color: #fff3cd; border: 1px solid #ffc107; padding: 10px; border-radius: 5px; margin: 10px 0; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>📋 Nouvelle Demande de Devis</h1>
          </div>
          
          <div class="content">
            <p><strong>Nouvelle réservation reçue !</strong></p>
            
            <div class="detail">
              <span class="label">Client :</span> ${data.clientName}
            </div>
            
            <div class="detail">
              <span class="label">Email :</span> ${data.clientEmail}
            </div>
            
            <div class="detail">
              <span class="label">Téléphone :</span> ${data.clientPhone}
            </div>
            
            <div class="detail">
              <span class="label">Service :</span> ${data.service}
            </div>
            
            <div class="detail">
              <span class="label">Option :</span> ${data.option}
            </div>
            
            <div class="detail">
              <span class="label">Date :</span> ${data.date}
            </div>
            
            <div class="detail">
              <span class="label">Heure :</span> ${data.time}
            </div>
            
            <div class="detail">
              <span class="label">Adresse :</span> ${data.address}
            </div>
            
            ${data.message ? `
            <div class="detail">
              <span class="label">Message du client :</span> ${data.message}
            </div>
            ` : ''}
            
            <hr style="margin: 20px 0; border: none; border-top: 1px solid #ddd;">
            
            ${priceText}
            
            ${!data.price ? `
            <div class="alert">
              ⚠️ <strong>ACTION REQUISE :</strong> Cette option n'a pas de prix. Vous devez envoyer un devis personnalisé au client.
            </div>
            ` : ''}
            
            <p><strong>À faire :</strong></p>
            <ul>
              <li>Confirmer la disponibilité pour la date/heure demandée</li>
              <li>Contacter le client au ${data.clientPhone} ou ${data.clientEmail}</li>
              ${!data.price ? '<li>Envoyer un devis personnalisé</li>' : ''}
            </ul>
          </div>
          
          <div class="footer">
            <p>© 2026 ProClean Empire</p>
          </div>
        </div>
      </body>
    </html>
  `;

  try {
    await transporter.sendMail({
      from: `ProClean Empire <${ENV.gmailUser}>`,
      to: ENV.ownerEmail || ENV.gmailUser,
      subject: `Nouvelle demande de devis - ${data.service} - ${data.clientName}`,
      html: htmlContent,
    });
    console.log(`[Mail] Notification propriétaire envoyée`);
    return true;
  } catch (error) {
    console.error('[Mail] Erreur lors de l\'envoi du mail propriétaire:', error);
    return false;
  }
}
