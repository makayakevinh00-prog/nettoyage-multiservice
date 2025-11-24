import nodemailer from 'nodemailer';

// Configuration du transporteur SMTP
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: 'serviceclient@procleanempire.com',
    pass: process.env.GMAIL_APP_PASSWORD || '', // À configurer dans les secrets
  },
});

export interface SendEmailOptions {
  to: string;
  subject: string;
  html: string;
  text?: string;
  attachments?: Array<{
    filename: string;
    content: string | Buffer;
    contentType?: string;
  }>;
}

export async function sendEmail(options: SendEmailOptions) {
  try {
    const info = await transporter.sendMail({
      from: '"ProClean Empire" <serviceclient@procleanempire.com>',
      to: options.to,
      subject: options.subject,
      text: options.text,
      html: options.html,
      attachments: options.attachments,
    });

    console.log('Email envoyé:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Erreur lors de l\'envoi de l\'email:', error);
    throw error;
  }
}

export function generateBookingConfirmationEmail(data: {
  name: string;
  service: string;
  date: string;
  time: string;
  address: string;
}) {
  const serviceNames: Record<string, string> = {
    automobile: "Nettoyage Automobile",
    terrasse: "Nettoyage Terrasse",
    tapis: "Nettoyage Tapis & Canapés",
    balcon: "Nettoyage Balcon",
    jardinage: "Entretien Jardinage",
  };

  const serviceName = serviceNames[data.service] || data.service;

  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: linear-gradient(135deg, #1e40af 0%, #1e3a8a 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
    .content { background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px; }
    .info-box { background: white; padding: 20px; margin: 20px 0; border-left: 4px solid #1e40af; border-radius: 5px; }
    .info-row { margin: 10px 0; }
    .label { font-weight: bold; color: #1e40af; }
    .footer { text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; color: #6b7280; font-size: 14px; }
    .button { display: inline-block; background: #1e40af; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; margin: 20px 0; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>✅ Réservation Confirmée</h1>
      <p>ProClean Empire</p>
    </div>
    <div class="content">
      <p>Bonjour <strong>${data.name}</strong>,</p>
      
      <p>Nous avons bien reçu votre demande de réservation et nous vous en remercions !</p>
      
      <div class="info-box">
        <h2 style="color: #1e40af; margin-top: 0;">📋 Détails de votre réservation</h2>
        <div class="info-row">
          <span class="label">🧹 Service :</span> ${serviceName}
        </div>
        <div class="info-row">
          <span class="label">📅 Date :</span> ${data.date}
        </div>
        <div class="info-row">
          <span class="label">🕐 Heure :</span> ${data.time}
        </div>
        <div class="info-row">
          <span class="label">📍 Adresse :</span> ${data.address}
        </div>
      </div>
      
      <div style="text-align: center; margin: 30px 0;">
        <p style="margin-bottom: 15px;"><strong>📅 Ajoutez ce rendez-vous à votre calendrier</strong></p>
        <p style="font-size: 14px; color: #6b7280;">Un fichier calendrier (.ics) est joint à cet email.<br>Ouvrez-le pour l'ajouter automatiquement à votre calendrier (Google, Outlook, Apple...)</p>
      </div>
      
      <p><strong>Prochaines étapes :</strong></p>
      <ul>
        <li>Notre équipe va examiner votre demande</li>
        <li>Nous vous contacterons sous 24h pour confirmer le rendez-vous</li>
        <li>Vous recevrez un SMS de rappel la veille de l'intervention</li>
      </ul>
      
      <p>Si vous avez des questions ou souhaitez modifier votre réservation, n'hésitez pas à nous contacter :</p>
      <ul>
        <li>📞 Téléphone : <strong>06 17 21 22 30</strong></li>
        <li>📧 Email : <strong>serviceclient@procleanempire.com</strong></li>
      </ul>
      
      <div class="footer">
        <p><strong>ProClean Empire</strong><br>
        Nettoyage Premium Multiservice<br>
        Île-de-France</p>
        <p style="font-size: 12px; color: #9ca3af;">
          Cet email a été envoyé automatiquement, merci de ne pas y répondre directement.
        </p>
      </div>
    </div>
  </div>
</body>
</html>
  `;

  const text = `
Bonjour ${data.name},

Nous avons bien reçu votre demande de réservation et nous vous en remercions !

DÉTAILS DE VOTRE RÉSERVATION :
- Service : ${serviceName}
- Date : ${data.date}
- Heure : ${data.time}
- Adresse : ${data.address}

PROCHAINES ÉTAPES :
- Notre équipe va examiner votre demande
- Nous vous contacterons sous 24h pour confirmer le rendez-vous
- Vous recevrez un SMS de rappel la veille de l'intervention

CONTACT :
- Téléphone : 06 17 21 22 30
- Email : serviceclient@procleanempire.com

ProClean Empire
Nettoyage Premium Multiservice
Île-de-France
  `;

  return { html, text };
}
