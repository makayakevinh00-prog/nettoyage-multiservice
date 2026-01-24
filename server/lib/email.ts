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
      headers: {
        'X-Mailer': 'ProClean Empire',
        'X-Priority': '3',
        'Importance': 'normal',
        'X-MSMail-Priority': 'Normal',
        'List-Unsubscribe': '<mailto:serviceclient@procleanempire.com?subject=unsubscribe>',
      },
    });

    console.log('Email envoyé:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Erreur lors de l\'envoi de l\'email:', error);
    throw error;
  }
}

function getEmailSignature() {
  const logoUrl = 'https://procleanempire.com/proclean-logo.png';
  return `
    <div style="margin-top: 40px; padding-top: 20px; border-top: 2px solid #1e40af; text-align: center;">
      <img src="${logoUrl}" alt="ProClean Empire" style="max-width: 150px; height: auto; margin-bottom: 15px;">
      <p style="margin: 10px 0; font-weight: bold; color: #1e40af; font-size: 16px;">ProClean Empire</p>
      <p style="margin: 5px 0; color: #6b7280; font-size: 13px;">Nettoyage Premium Multiservice</p>
      <p style="margin: 5px 0; color: #6b7280; font-size: 13px;">Île-de-France</p>
      <div style="margin-top: 15px; font-size: 13px; color: #6b7280;">
        <p style="margin: 3px 0;">📞 <strong>06 17 21 22 30</strong></p>
        <p style="margin: 3px 0;">📧 <strong>serviceclient@procleanempire.com</strong></p>
        <p style="margin: 3px 0;">🌐 <strong>procleanempire.com</strong></p>
      </div>
      <p style="margin-top: 15px; font-size: 11px; color: #9ca3af; font-style: italic;">
        Cet email a été envoyé automatiquement, merci de ne pas y répondre directement.
      </p>
    </div>
  `;
}

export function generateBookingConfirmationEmail(data: {
  name: string;
  service: string;
  date: string;
  time: string;
  address: string;
  serviceOption?: string;
  price?: number;
}) {
  const serviceNames: Record<string, string> = {
    automobile: "Nettoyage Automobile",
    terrasse: "Nettoyage Terrasse",
    tapis: "Nettoyage Tapis & Canapés",
    balcon: "Nettoyage Balcon",
    jardinage: "Entretien Jardinage",
    facade: "Nettoyage Façade",
    panneaux: "Nettoyage Panneaux Solaires",
    professionnel: "Nettoyage Professionnel",
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
    .payment-box { background: #eff6ff; border: 2px solid #1e40af; padding: 20px; margin: 20px 0; border-radius: 5px; }
    .preparation-box { background: #f0fdf4; border-left: 4px solid #22c55e; padding: 15px; margin: 15px 0; border-radius: 5px; }
    .footer { text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; color: #6b7280; font-size: 14px; }
    .button { display: inline-block; background: #1e40af; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; margin: 20px 0; }
    ul { padding-left: 20px; }
    li { margin: 8px 0; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>✅ Réservation Confirmée</h1>
      <p>ProClean Empire - Nettoyage Premium</p>
    </div>
    <div class="content">
      <p>Bonjour <strong>${data.name}</strong>,</p>
      
      <p>Nous avons bien reçu votre demande de réservation et nous vous en remercions ! Voici les détails complets de votre intervention.</p>
      
      <div class="info-box">
        <h2 style="color: #1e40af; margin-top: 0;">📋 Détails de votre réservation</h2>
        <div class="info-row">
          <span class="label">🧹 Service :</span> ${serviceName}
        </div>
        ${data.serviceOption ? `<div class="info-row"><span class="label">📦 Option :</span> ${data.serviceOption}</div>` : ''}
        <div class="info-row">
          <span class="label">📅 Date :</span> ${data.date}
        </div>
        <div class="info-row">
          <span class="label">🕐 Heure :</span> ${data.time}
        </div>
        <div class="info-row">
          <span class="label">📍 Adresse :</span> ${data.address}
        </div>
        ${data.price ? `<div class="info-row" style="margin-top: 15px; padding-top: 15px; border-top: 1px solid #e5e7eb;"><span class="label">💰 Tarif :</span> ${(data.price / 100).toFixed(2)}€</div>` : ''}
      </div>
      
      <div class="payment-box">
        <h3 style="color: #1e40af; margin-top: 0;">💳 Modalités de Paiement</h3>
        <p><strong>Paiement sur place :</strong></p>
        <ul>
          <li>Nous acceptons les espèces, cartes bancaires et virements</li>
          <li>Veuillez préparer le montant exact ou une carte bancaire</li>
          <li>Une facture vous sera remise à la fin de l'intervention</li>
          <li>Aucun paiement d'avance n'est requis</li>
        </ul>
      </div>
      
      <div class="preparation-box">
        <h3 style="color: #22c55e; margin-top: 0;">✅ À préparer avant l'intervention</h3>
        <ul>
          <li>Assurez-vous que l'accès à votre domicile est facile</li>
          <li>Dégagez les zones à nettoyer si possible</li>
          <li>Préparez un point d'eau accessible (si nécessaire pour le service)</li>
          <li>Gardez votre téléphone à proximité pour toute question</li>
          <li>Informez-nous de tout accès spécial ou restriction</li>
        </ul>
      </div>
      
      <div style="text-align: center; margin: 30px 0;">
        <p style="margin-bottom: 15px;"><strong>📅 Ajoutez ce rendez-vous à votre calendrier</strong></p>
        <p style="font-size: 14px; color: #6b7280;">Un fichier calendrier (.ics) est joint à cet email.<br>Ouvrez-le pour l'ajouter automatiquement à votre calendrier (Google, Outlook, Apple...)</p>
      </div>
      
      <p><strong>Prochaines étapes :</strong></p>
      <ul>
        <li>✓ Notre équipe va examiner votre demande</li>
        <li>✓ Nous vous contacterons sous 24h pour confirmer le rendez-vous</li>
        <li>✓ Vous recevrez un SMS de rappel 24h avant l'intervention</li>
        <li>✓ Notre équipe arrivera à l'heure prévue avec tous les équipements</li>
      </ul>
      
      <p><strong>Besoin de modifier ou annuler ?</strong></p>
      
      <p>Si vous avez des questions ou souhaitez modifier votre réservation, n'hésitez pas à nous contacter :</p>
      <ul>
        <li>📞 Téléphone : <strong>06 17 21 22 30</strong></li>
        <li>📧 Email : <strong>serviceclient@procleanempire.com</strong></li>
        <li>💬 WhatsApp : <strong>06 17 21 22 30</strong></li>
      </ul>
      
      ${getEmailSignature()}
    </div>
  </div>
</body>
</html>
  `;

  const text = `
Bonjour ${data.name},

Nous avons bien reçu votre demande de réservation et nous vous en remercions ! Voici les détails complets de votre intervention.

DÉTAILS DE VOTRE RÉSERVATION :
- Service : ${serviceName}
${data.serviceOption ? `- Option : ${data.serviceOption}` : ''}
- Date : ${data.date}
- Heure : ${data.time}
- Adresse : ${data.address}
${data.price ? `- Tarif : ${(data.price / 100).toFixed(2)}€` : ''}

MODALITÉS DE PAIEMENT :
Paiement sur place :
- Nous acceptons les espèces, cartes bancaires et virements
- Veuillez préparer le montant exact ou une carte bancaire
- Une facture vous sera remise à la fin de l'intervention
- Aucun paiement d'avance n'est requis

À PRÉPARER AVANT L'INTERVENTION :
- Assurez-vous que l'accès à votre domicile est facile
- Dégagez les zones à nettoyer si possible
- Préparez un point d'eau accessible (si nécessaire)
- Gardez votre téléphone à proximité
- Informez-nous de tout accès spécial ou restriction

PROCHAINES ÉTAPES :
✓ Notre équipe va examiner votre demande
✓ Nous vous contacterons sous 24h pour confirmer le rendez-vous
✓ Vous recevrez un SMS de rappel 24h avant l'intervention
✓ Notre équipe arrivera à l'heure prévue avec tous les équipements

BESOIN DE MODIFIER OU ANNULER ?

CONTACT :
- Téléphone : 06 17 21 22 30
- Email : serviceclient@procleanempire.com
- WhatsApp : 06 17 21 22 30
- Site : procleanempire.com

ProClean Empire
Nettoyage Premium Multiservice
Île-de-France
  `;

  return { html, text };
}

export function generateReminderEmail(data: {
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
  const signature = getEmailSignature();

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
    .alert { background: #fef3c7; border-left: 4px solid #f59e0b; padding: 15px; margin: 20px 0; border-radius: 5px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>🔔 Rappel de votre rendez-vous</h1>
      <p>ProClean Empire</p>
    </div>
    <div class="content">
      <p>Bonjour <strong>${data.name}</strong>,</p>
      
      <p>Ceci est un rappel de votre rendez-vous prévu <strong>demain</strong> avec ProClean Empire.</p>
      
      <div class="alert">
        <p style="margin: 0; font-weight: bold; color: #b45309;">⏰ Votre rendez-vous est prévu demain !</p>
      </div>
      
      <div class="info-box">
        <h2 style="color: #1e40af; margin-top: 0;">📋 Détails de votre rendez-vous</h2>
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
      
      <p><strong>Conseils avant l'intervention :</strong></p>
      <ul>
        <li>Assurez-vous que l'accès à votre domicile est facile</li>
        <li>Préparez les zones à nettoyer si nécessaire</li>
        <li>Gardez votre téléphone à proximité pour toute question</li>
      </ul>
      
      <p>Si vous avez besoin de modifier ou d'annuler votre rendez-vous, contactez-nous au plus tôt :</p>
      <ul>
        <li>📞 Téléphone : <strong>06 17 21 22 30</strong></li>
        <li>📧 Email : <strong>serviceclient@procleanempire.com</strong></li>
      </ul>
      
      ${signature}
    </div>
  </div>
</body>
</html>
  `;

  const text = `
Bonjour ${data.name},

Ceci est un rappel de votre rendez-vous prévu demain avec ProClean Empire.

DÉTAILS DE VOTRE RENDEZ-VOUS :
- Service : ${serviceName}
- Date : ${data.date}
- Heure : ${data.time}
- Adresse : ${data.address}

CONSEILS AVANT L'INTERVENTION :
- Assurez-vous que l'accès à votre domicile est facile
- Préparez les zones à nettoyer si nécessaire
- Gardez votre téléphone à proximité pour toute question

Si vous avez besoin de modifier ou d'annuler votre rendez-vous, contactez-nous au plus tôt :
- Téléphone : 06 17 21 22 30
- Email : serviceclient@procleanempire.com

ProClean Empire
Nettoyage Premium Multiservice
Île-de-France
  `;

  return { html, text };
}
