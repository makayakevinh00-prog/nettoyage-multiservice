import { useState, useEffect } from "react";
import { AIChatBox, Message } from "@/components/AIChatBox";
import { trpc } from "@/lib/trpc";
import { MessageCircle, X, Calendar, Clock, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface BookingData {
  service?: string;
  date?: string;
  time?: string;
  address?: string;
  name?: string;
  email?: string;
  phone?: string;
}

export default function ProCleanAIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [bookingMode, setBookingMode] = useState(false);
  const [bookingData, setBookingData] = useState<BookingData>({});
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

    // Détection de mots-clés pour la réservation
    if (content.toLowerCase().includes("réserver") || 
        content.toLowerCase().includes("reservation") ||
        content.toLowerCase().includes("prendre rendez-vous")) {
      setBookingMode(true);
      setTimeout(() => {
        setMessages(prev => [...prev, {
          role: "assistant",
          content: "Parfait ! 📅 Je vais vous aider à réserver. Quel service souhaitez-vous ? (Automobile, Terrasse, Tapis, Balcon, Jardinage, Façade, Toit, Panneaux Solaires, Poubelle)"
        }]);
      }, 500);
    }
  };

  const handleBookingStep = (input: string) => {
    const newMessages = [...messages, { role: "user", content: input }];
    setMessages(newMessages);

    if (!bookingData.service) {
      setBookingData({ ...bookingData, service: input });
      setMessages(prev => [...prev, {
        role: "assistant",
        content: `Excellent ! ${input} ✓\n\nQuelle date souhaitez-vous ? (ex: 25/01/2026)`
      }]);
    } else if (!bookingData.date) {
      setBookingData({ ...bookingData, date: input });
      setMessages(prev => [...prev, {
        role: "assistant",
        content: `Date confirmée : ${input} ✓\n\nQuel créneau préférez-vous ? (Matin 8-12h, Après-midi 14-18h, Soir 18-20h)`
      }]);
    } else if (!bookingData.time) {
      setBookingData({ ...bookingData, time: input });
      setMessages(prev => [...prev, {
        role: "assistant",
        content: `Créneau sélectionné : ${input} ✓\n\nQuelle est votre adresse d'intervention ?`
      }]);
    } else if (!bookingData.address) {
      const updatedData = { ...bookingData, address: input };
      setBookingData(updatedData);
      setMessages(prev => [...prev, {
        role: "assistant",
        content: `Adresse confirmée ✓\n\n📋 Récapitulatif de votre réservation :\n\n• Service : ${updatedData.service}\n• Date : ${updatedData.date}\n• Créneau : ${updatedData.time}\n• Adresse : ${updatedData.address}\n\nVoulez-vous confirmer cette réservation ? (Oui/Non)`
      }]);
    } else if (input.toLowerCase().includes("oui")) {
      setMessages(prev => [...prev, {
        role: "assistant",
        content: "✅ Réservation confirmée ! Vous allez être redirigé vers le formulaire de paiement pour finaliser votre demande."
      }]);
      setBookingMode(false);
      toast.success("Réservation créée ! Redirection vers le formulaire...");
      setTimeout(() => {
        window.location.href = "/#booking";
      }, 2000);
    } else {
      setBookingData({});
      setBookingMode(false);
      setMessages(prev => [...prev, {
        role: "assistant",
        content: "D'accord, annulation de la réservation. Comment puis-je vous aider autrement ?"
      }]);
    }
  };

  // Afficher automatiquement le chat après 3 secondes
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isOpen) {
        setIsOpen(true);
        setMessages(prev => [...prev, {
          role: "assistant",
          content: "Bonjour ! 👋 Je suis l'assistant ProClean Empire. Comment puis-je vous aider aujourd'hui ? Vous cherchez un service de nettoyage particulier ou souhaitez réserver ?"
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
              onClick={() => {
                setIsOpen(false);
                setBookingMode(false);
              }}
              className="text-white hover:bg-blue-700"
            >
              <X size={20} />
            </Button>
          </div>

          {bookingMode ? (
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              <div className="space-y-3">
                {messages.filter(m => m.role !== "system").map((msg, idx) => (
                  <div
                    key={idx}
                    className={`flex ${
                      msg.role === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-xs px-4 py-2 rounded-lg ${
                        msg.role === "user"
                          ? "bg-blue-600 text-white"
                          : "bg-gray-100 text-gray-900"
                      }`}
                    >
                      {msg.content}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4 space-y-2">
                {!bookingData.service && (
                  <>
                    {["Automobile", "Terrasse", "Tapis", "Balcon", "Jardinage"].map(
                      (service) => (
                        <Button
                          key={service}
                          onClick={() => handleBookingStep(service)}
                          variant="outline"
                          className="w-full text-left justify-start"
                        >
                          {service}
                        </Button>
                      )
                    )}
                  </>
                )}
                {bookingData.service && !bookingData.date && (
                  <div className="text-sm text-gray-600">
                    Entrez la date (ex: 25/01/2026)
                  </div>
                )}
                {bookingData.date && !bookingData.time && (
                  <>
                    {["Matin 8-12h", "Après-midi 14-18h", "Soir 18-20h"].map(
                      (slot) => (
                        <Button
                          key={slot}
                          onClick={() => handleBookingStep(slot)}
                          variant="outline"
                          className="w-full text-left justify-start"
                        >
                          <Clock size={16} className="mr-2" />
                          {slot}
                        </Button>
                      )
                    )}
                  </>
                )}
                {bookingData.time && !bookingData.address && (
                  <div className="text-sm text-gray-600">
                    Entrez votre adresse
                  </div>
                )}
                {bookingData.address && (
                  <>
                    <Button
                      onClick={() => handleBookingStep("Oui")}
                      className="w-full bg-green-600 hover:bg-green-700"
                    >
                      ✓ Confirmer
                    </Button>
                    <Button
                      onClick={() => handleBookingStep("Non")}
                      variant="outline"
                      className="w-full"
                    >
                      ✗ Annuler
                    </Button>
                  </>
                )}
              </div>
            </div>
          ) : (
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
                  "Je veux réserver",
                  "Quel est le tarif ?",
                  "Êtes-vous disponibles ?"
                ]}
              />
            </div>
          )}
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
