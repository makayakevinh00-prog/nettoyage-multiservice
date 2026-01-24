import { useState, useEffect } from "react";
import { AIChatBox, Message } from "@/components/AIChatBox";
import { trpc } from "@/lib/trpc";
import { MessageCircle, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ProCleanAIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "system",
      content: `Tu es un assistant IA pour ProClean Empire, une entreprise de nettoyage professionnel en Île-de-France.
Tu dois aider les clients à :
- Trouver le service qui correspond à leurs besoins
- Connaître les tarifs et options disponibles
- Répondre à des questions sur les services (automobile, terrasse, tapis, balcon, jardinage, façade, toit, panneaux solaires, poubelle)
- Guider vers la réservation
- Fournir des informations sur l'entreprise

Services disponibles:
1. Nettoyage Automobile - Lavage intérieur/extérieur, lustrage, protection
2. Nettoyage Tapis - Injection-extraction, détachage, séchage rapide
3. Nettoyage Terrasse - Démoussage, nettoyage haute pression, traitement anti-mousse
4. Nettoyage Balcon - Nettoyage complet, joints, garde-corps
5. Entretien Jardinage - Taille, débroussaillage, entretien paysager
6. Nettoyage Façade - Nettoyage haute pression, traitement anti-mousse
7. Nettoyage Toit - Nettoyage complet, traitement anti-mousse
8. Nettoyage Panneaux Solaires - Maintenance et nettoyage
9. Nettoyage Poubelle (Abonnement) - Service régulier

Sois amical, professionnel et utile. Réponds toujours en français.`
    }
  ]);

  const chatMutation = trpc.system.chat.useMutation({
    onSuccess: (response) => {
      setMessages(prev => [...prev, {
        role: "assistant",
        content: response
      }]);
    },
    onError: (error) => {
      console.error("Chat error:", error);
      setMessages(prev => [...prev, {
        role: "assistant",
        content: "Désolé, une erreur est survenue. Pouvez-vous réessayer ?"
      }]);
    },
  });

  const handleSendMessage = (content: string) => {
    const newMessages = [...messages, { role: "user", content }];
    setMessages(newMessages);
    chatMutation.mutate({ messages: newMessages });
  };

  // Afficher automatiquement le chat après 3 secondes
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isOpen) {
        setIsOpen(true);
        // Ajouter un message de bienvenue
        setMessages(prev => [...prev, {
          role: "assistant",
          content: "Bonjour ! 👋 Je suis l'assistant ProClean Empire. Comment puis-je vous aider aujourd'hui ? Vous cherchez un service de nettoyage particulier ?"
        }]);
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isOpen ? (
        <div className="bg-white rounded-lg shadow-2xl border border-gray-200 w-96 max-h-[600px] flex flex-col">
          <div className="bg-blue-600 text-white p-4 rounded-t-lg flex justify-between items-center">
            <div className="flex items-center gap-2">
              <MessageCircle size={20} />
              <h3 className="font-semibold">ProClean Empire Assistant</h3>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(false)}
              className="text-white hover:bg-blue-700"
            >
              <X size={20} />
            </Button>
          </div>
          <div className="flex-1 overflow-hidden">
            <AIChatBox
              messages={messages}
              onSendMessage={handleSendMessage}
              isLoading={chatMutation.isPending}
              placeholder="Posez votre question..."
              height="100%"
              emptyStateMessage="Comment puis-je vous aider ?"
              suggestedPrompts={[
                "Quels services proposez-vous ?",
                "Quel est le tarif du nettoyage automobile ?",
                "Comment réserver un service ?",
                "Êtes-vous disponible rapidement ?"
              ]}
            />
          </div>
        </div>
      ) : (
        <Button
          onClick={() => setIsOpen(true)}
          className="rounded-full w-14 h-14 bg-blue-600 hover:bg-blue-700 text-white shadow-lg flex items-center justify-center"
        >
          <MessageCircle size={24} />
        </Button>
      )}
    </div>
  );
}
