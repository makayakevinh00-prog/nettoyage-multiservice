import { invokeLLM } from "../_core/llm";

// Réponses personnalisées selon l'intention détectée
const INTENT_RESPONSES: Record<string, string> = {
  services: "Nous offrons une large gamme de services de nettoyage : automobile, tapis, terrasse, balcon, jardinage, façade et services professionnels. Quel service vous intéresse ? 🧹",
  
  tarifs: "Nos tarifs varient selon le service et la surface. Nous proposons des devis gratuits et sans engagement. Quel service souhaitez-vous nettoyer ?",
  
  reservation: "Vous pouvez réserver directement sur notre site en quelques clics ! Sélectionnez votre service, la date et l'heure qui vous conviennent. 📅",
  
  contact: "Vous pouvez nous contacter par téléphone au 06 17 21 22 30 ou via notre formulaire de contact. Notre équipe vous répondra rapidement ! 📞",
  
  experience: "ProClean Empire a 5 ans d'expérience dans le nettoyage multiservice. Notre équipe est formée et utilise des produits écologiques. ✨",
  
  zone: "Nous intervenons partout en Île-de-France pour vous offrir un service de qualité. Quelle est votre localisation ?",
  
  paiement: "Nous acceptons les paiements sur place ou par Stripe lors de la réservation. Vous pouvez également demander un devis personnalisé. 💳",
  
  urgence: "Pour une intervention d'urgence, contactez-nous directement au 06 17 21 22 30. Nous ferons notre possible pour vous accommoder ! 🚨",
  
  default: "Merci pour votre question ! Un agent ProClean Empire vous répondra très bientôt. Comment puis-je vous aider ? 😊",
};

// Détection d'intention basée sur les mots-clés
function detectIntent(message: string): string {
  const lowerMessage = message.toLowerCase();
  
  if (lowerMessage.match(/service|nettoyage|offrez|proposez/)) return "services";
  if (lowerMessage.match(/prix|tarif|coût|combien|devis/)) return "tarifs";
  if (lowerMessage.match(/réserver|booking|rendez-vous|disponibilité/)) return "reservation";
  if (lowerMessage.match(/contact|téléphone|email|appeler/)) return "contact";
  if (lowerMessage.match(/expérience|depuis|ans|qualité|professionnel/)) return "experience";
  if (lowerMessage.match(/zone|région|île-de-france|paris|intervention/)) return "zone";
  if (lowerMessage.match(/paiement|payer|carte|stripe|facture/)) return "paiement";
  if (lowerMessage.match(/urgent|aujourd'hui|maintenant|immédiat/)) return "urgence";
  
  return "default";
}

const SYSTEM_PROMPT = `Tu es un assistant de chat pour ProClean Empire, une entreprise de nettoyage multiservice en Île-de-France.

Services offerts:
- Nettoyage automobile (intérieur, extérieur, lustrage)
- Nettoyage de tapis et canapés
- Nettoyage de terrasses
- Nettoyage de balcons
- Nettoyage de jardinage
- Nettoyage de façades
- Services professionnels (bureaux, immeubles, etc.)

Informations importantes:
- Zone d'intervention: Île-de-France
- Expérience: 5 ans
- Équipe professionnelle et formée
- Produits écologiques
- Devis gratuit et sans engagement
- Téléphone: 06 17 21 22 30

Ton rôle:
1. Répondre aux questions sur les services
2. Fournir des informations sur les tarifs (si disponibles)
3. Diriger vers la page de réservation ou contact si nécessaire
4. Être amical, professionnel et utile
5. Répondre en français
6. Utiliser le prénom du visiteur pour plus de chaleur

Réponds toujours de manière concise (max 2-3 phrases) et propose une action (réservation, devis, etc.) si approprié.`;

export async function generateChatResponse(userMessage: string, visitorName: string): Promise<string> {
  try {
    // Détecter l'intention
    const intent = detectIntent(userMessage);
    
    // Utiliser la réponse personnalisée si disponible
    if (intent !== "default") {
      return `Bonjour ${visitorName} ! ${INTENT_RESPONSES[intent]}`;
    }
    
    // Pour les questions plus complexes, utiliser l'IA
    const response = await invokeLLM({
      messages: [
        {
          role: "system",
          content: SYSTEM_PROMPT,
        },
        {
          role: "user",
          content: `${visitorName} demande: ${userMessage}`,
        },
      ],
    });

    if (response.choices?.[0]?.message?.content) {
      return `Bonjour ${visitorName} ! ${response.choices[0].message.content}`;
    }

    return `Merci pour votre question, ${visitorName} ! Un agent ProClean Empire vous répondra très bientôt.`;
  } catch (error) {
    console.error("[ChatAI] Erreur lors de la génération de réponse:", error);
    return `Merci pour votre message, ${visitorName} ! Un agent ProClean Empire vous répondra très bientôt.`;
  }
}
