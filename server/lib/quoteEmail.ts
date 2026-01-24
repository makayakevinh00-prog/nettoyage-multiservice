/**
 * Génération des emails de devis avec tarification détaillée
 */

import { formatPrice } from "@shared/pricing";

function getEmailSignature() {
  const logoUrl = "https://procleanempire.com/proclean-logo.png";
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

export interface QuoteEmailData {
  name: string;
  email: string;
  service: string;
  serviceOption: string;
  optionLabel: string;
  price: number; // en euros
  date: string;
  time: string;
  address: string;
  message?: string;
}

export function generateQuoteEmail(data: QuoteEmailData) {
  const serviceNames: Record<string, string> = {
    automobile: "Nettoyage Automobile",
    terrasse: "Nettoyage Terrasse",
    tapis: "Nettoyage Tapis & Canapés",
    balcon: "Nettoyage Balcon",
    jardinage: "Entretien Jardinage",
    facade: "Nettoyage Façade",
    toit: "Nettoyage Toit",
    panneaux_solaires: "Nettoyage Panneaux Solaires",
    poubelle: "Nettoyage Poubelle (Abonnement)",
  };

  const serviceName = serviceNames[data.service] || data.service;
  const formattedPrice = formatPrice(data.price);

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
    .price-box { background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: white; padding: 25px; margin: 20px 0; border-radius: 8px; text-align: center; }
    .price-amount { font-size: 36px; font-weight: bold; margin: 10px 0; }
    .info-row { margin: 12px 0; display: flex; justify-content: space-between; }
    .label { font-weight: bold; color: #1e40af; }
    .value { color: #374151; }
    .footer { text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; color: #6b7280; font-size: 14px; }
    .button { display: inline-block; background: #1e40af; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; margin: 20px 0; }
    .terms { background: #fef3c7; border-left: 4px solid #f59e0b; padding: 15px; margin: 20px 0; border-radius: 5px; font-size: 13px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>💰 Votre Devis ProClean Empire</h1>
      <p>Nettoyage Premium Multiservice</p>
    </div>
    <div class="content">
      <p>Bonjour <strong>${data.name}</strong>,</p>
      
      <p>Merci de votre intérêt pour nos services ! Voici le devis détaillé de votre réservation :</p>
      
      <div class="info-box">
        <h2 style="color: #1e40af; margin-top: 0;">📋 Détails du Devis</h2>
        <div class="info-row">
          <span class="label">🧹 Service :</span>
          <span class="value">${serviceName}</span>
        </div>
        <div class="info-row">
          <span class="label">📝 Option :</span>
          <span class="value">${data.optionLabel}</span>
        </div>
        <div class="info-row">
          <span class="label">📅 Date prévue :</span>
          <span class="value">${data.date}</span>
        </div>
        <div class="info-row">
          <span class="label">🕐 Heure :</span>
          <span class="value">${data.time}</span>
        </div>
        <div class="info-row">
          <span class="label">📍 Adresse :</span>
          <span class="value">${data.address}</span>
        </div>
      </div>

      <div class="price-box">
        <p style="margin: 0 0 10px 0; font-size: 14px;">Montant à prévoir</p>
        <div class="price-amount">${formattedPrice}</div>
        <p style="margin: 10px 0 0 0; font-size: 12px; opacity: 0.9;">Paiement sur place</p>
      </div>

      <div class="terms">
        <strong>⚠️ Conditions importantes :</strong>
        <ul style="margin: 10px 0; padding-left: 20px;">
          <li>Ce devis est valable 30 jours</li>
          <li>Frais d'annulation : 25€ si annulation moins de 24h avant le rendez-vous</li>
          <li>Le paiement s'effectue sur place après intervention</li>
          <li>Une facture vous sera remise à la fin du service</li>
        </ul>
      </div>

      <div class="info-box">
        <h2 style="color: #1e40af; margin-top: 0;">✅ Prochaines étapes</h2>
        <ol style="margin: 10px 0; padding-left: 20px;">
          <li>Nous confirmerons votre rendez-vous par SMS/téléphone</li>
          <li>Un technicien se présentera à l'heure convenue</li>
          <li>Paiement sur place après intervention</li>
          <li>Vous recevrez une facture et un reçu</li>
        </ol>
      </div>

      <p><strong>Des questions ?</strong> Contactez-nous :</p>
      <ul style="margin: 10px 0; padding-left: 20px;">
        <li>📞 Téléphone : <strong>06 17 21 22 30</strong></li>
        <li>📧 Email : <strong>serviceclient@procleanempire.com</strong></li>
        <li>💬 Chat : Disponible sur notre site web</li>
      </ul>

      ${getEmailSignature()}
    </div>
  </div>
</body>
</html>
  `;

  const text = `
VOTRE DEVIS PROCLEAN EMPIRE
===========================

Bonjour ${data.name},

Merci de votre intérêt pour nos services ! Voici le devis détaillé de votre réservation :

DÉTAILS DU DEVIS :
- Service : ${serviceName}
- Option : ${data.optionLabel}
- Date prévue : ${data.date}
- Heure : ${data.time}
- Adresse : ${data.address}

MONTANT À PRÉVOIR : ${formattedPrice}
(Paiement sur place)

CONDITIONS IMPORTANTES :
- Ce devis est valable 30 jours
- Frais d'annulation : 25€ si annulation moins de 24h avant le rendez-vous
- Le paiement s'effectue sur place après intervention
- Une facture vous sera remise à la fin du service

PROCHAINES ÉTAPES :
1. Nous confirmerons votre rendez-vous par SMS/téléphone
2. Un technicien se présentera à l'heure convenue
3. Paiement sur place après intervention
4. Vous recevrez une facture et un reçu

DES QUESTIONS ?
- Téléphone : 06 17 21 22 30
- Email : serviceclient@procleanempire.com
- Chat : Disponible sur notre site web

ProClean Empire
Nettoyage Premium Multiservice
Île-de-France
  `;

  return { html, text };
}
