import nodemailer from "nodemailer";
import { ENV } from "./_core/env";

// Créer un transporteur Gmail
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "makayakevinh00@gmail.com", // Email de ProClean Empire
    pass: ENV.gmailAppPassword, // Mot de passe d'application
  },
});

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  service: string;
  option?: string;
  city: string;
  description: string;
  photoUrl?: string;
}

export async function sendContactEmail(data: ContactFormData) {
  try {
    // Email au propriétaire
    const ownerEmail = await transporter.sendMail({
      from: "makayakevinh00@gmail.com",
      to: "makayakevinh00@gmail.com", // Email du propriétaire
      subject: `📧 Nouvelle demande de contact - ${data.service}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #ff6b35;">Nouvelle Demande de Contact</h2>
          
          <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #333; margin-top: 0;">Informations du Client</h3>
            <p><strong>Nom :</strong> ${data.name}</p>
            <p><strong>Email :</strong> <a href="mailto:${data.email}">${data.email}</a></p>
            <p><strong>Téléphone :</strong> <a href="tel:${data.phone}">${data.phone}</a></p>
            <p><strong>Ville/Département :</strong> ${data.city}</p>
          </div>

          <div style="background: #e8f4f8; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #333; margin-top: 0;">Service Demandé</h3>
            <p><strong>Service :</strong> ${data.service}</p>
            ${data.option ? `<p><strong>Option :</strong> ${data.option}</p>` : ""}
            <p><strong>Description :</strong></p>
            <p style="white-space: pre-wrap;">${data.description}</p>
          </div>

          ${data.photoUrl ? `
            <div style="background: #fff3cd; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #333; margin-top: 0;">📸 Photo Jointe</h3>
              <p><a href="${data.photoUrl}" target="_blank">Voir la photo</a></p>
              <img src="${data.photoUrl}" alt="Photo du client" style="max-width: 100%; height: auto; margin-top: 10px; border-radius: 8px;">
            </div>
          ` : ""}

          <div style="background: #d4edda; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #155724; margin-top: 0;">✅ Action Recommandée</h3>
            <p>Contactez le client dans les 30 minutes pour un meilleur taux de conversion.</p>
            <p><strong>Téléphone :</strong> <a href="tel:${data.phone}" style="color: #ff6b35; font-weight: bold;">${data.phone}</a></p>
            <p><strong>Email :</strong> <a href="mailto:${data.email}" style="color: #ff6b35; font-weight: bold;">${data.email}</a></p>
          </div>

          <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
          <p style="color: #999; font-size: 12px; text-align: center;">
            ProClean Empire - Nettoyage Professionnel en Île-de-France
          </p>
        </div>
      `,
    });

    // Email de confirmation au client
    const clientEmail = await transporter.sendMail({
      from: "makayakevinh00@gmail.com",
      to: data.email,
      subject: "✅ Votre demande a été reçue - ProClean Empire",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #ff6b35;">Merci pour votre confiance ! 🎉</h2>
          
          <p>Bonjour ${data.name},</p>
          
          <p>Nous avons bien reçu votre demande de ${data.service}. Notre équipe va l'examiner et vous contactera dans les <strong>30 minutes</strong> pour confirmer votre rendez-vous.</p>

          <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #333; margin-top: 0;">Récapitulatif de votre demande</h3>
            <p><strong>Service :</strong> ${data.service}</p>
            ${data.option ? `<p><strong>Option :</strong> ${data.option}</p>` : ""}
            <p><strong>Localisation :</strong> ${data.city}</p>
          </div>

          <div style="background: #d4edda; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #155724; margin-top: 0;">📞 Besoin d'aide ?</h3>
            <p>Vous pouvez nous contacter directement :</p>
            <p><strong>Téléphone :</strong> <a href="tel:0617212230" style="color: #ff6b35; font-weight: bold;">06 17 21 22 30</a></p>
            <p><strong>WhatsApp :</strong> <a href="https://wa.me/33617212230" style="color: #25D366; font-weight: bold;">Envoyer un message</a></p>
          </div>

          <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
          <p style="color: #999; font-size: 12px; text-align: center;">
            ProClean Empire - Nettoyage Professionnel en Île-de-France<br>
            Intervention 7j/7 • Devis gratuit • Sans engagement
          </p>
        </div>
      `,
    });

    return { success: true, ownerEmail, clientEmail };
  } catch (error) {
    console.error("Erreur lors de l'envoi d'email :", error);
    throw error;
  }
}
