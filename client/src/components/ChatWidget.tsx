import { useState, useEffect, useRef } from "react";
import { MessageCircle, X, Send } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";
import { APP_LOGO } from "@/const";

interface Message {
  id?: number;
  visitorId: string;
  visitorName?: string;
  visitorEmail?: string;
  message: string;
  sender: "visitor" | "ai" | "admin";
  createdAt?: Date;
}

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [visitorId] = useState(() => {
    const id = localStorage.getItem("chatVisitorId");
    if (id) return id;
    const newId = `visitor-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    localStorage.setItem("chatVisitorId", newId);
    return newId;
  });
  const [visitorName, setVisitorName] = useState("");
  const [visitorEmail, setVisitorEmail] = useState("");
  const [showNameForm, setShowNameForm] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const sendMessageMutation = trpc.chat.sendMessage.useMutation();
  const getMessagesMutation = trpc.chat.getMessages.useMutation();

  // Charger les messages existants
  useEffect(() => {
    const loadMessages = async () => {
      try {
        const result = await getMessagesMutation.mutateAsync({ visitorId });
        setMessages(result);
      } catch (error) {
        console.error("Erreur lors du chargement des messages:", error);
      }
    };

    if (isOpen) {
      loadMessages();
    }
  }, [isOpen, visitorId, getMessagesMutation]);

  // Auto-scroll vers le dernier message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!inputValue.trim()) return;

    if (showNameForm && (!visitorName.trim() || !visitorEmail.trim())) {
      toast.error("Veuillez entrer votre nom et email");
      return;
    }

    const newMessage: Message = {
      visitorId,
      visitorName,
      visitorEmail,
      message: inputValue,
      sender: "visitor",
    };

    setMessages((prev) => [...prev, newMessage]);
    setInputValue("");

    try {
      const result = await sendMessageMutation.mutateAsync({
        visitorId,
        visitorName,
        visitorEmail,
        message: inputValue,
      });

      setShowNameForm(false);

      // Afficher la réponse IA
      if (result.aiResponse) {
        setTimeout(() => {
          const aiResponse: Message = {
            visitorId,
            message: result.aiResponse,
            sender: "ai",
          };
          setMessages((prev) => [...prev, aiResponse]);
        }, 500);
      }
    } catch (error) {
      toast.error("Erreur lors de l'envoi du message");
      setMessages((prev) => prev.slice(0, -1));
    }
  };

  return (
    <>
      {/* Chat Widget Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-lg flex items-center justify-center transition-all duration-300 transform hover:scale-110"
        aria-label="Ouvrir le chat"
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-96 h-[500px] bg-white rounded-lg shadow-2xl flex flex-col overflow-hidden animate-scaleIn">
          {/* Header */}
          <div className="bg-blue-600 text-white p-4 flex items-center gap-3">
            <img src={APP_LOGO} alt="ProClean Empire" className="w-8 h-8 rounded" />
            <div>
              <h3 className="font-semibold">ProClean Empire</h3>
              <p className="text-sm text-blue-100">Nous répondons en temps réel</p>
            </div>
          </div>

          {/* Messages Container */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
            {messages.length === 0 && (
              <div className="text-center text-gray-500 py-8">
                <MessageCircle className="w-12 h-12 mx-auto mb-2 opacity-50" />
                <p>Bonjour ! Comment pouvons-nous vous aider ?</p>
              </div>
            )}

            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${msg.sender === "visitor" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-xs px-4 py-2 rounded-lg ${
                    msg.sender === "visitor"
                      ? "bg-blue-600 text-white rounded-br-none"
                      : "bg-gray-200 text-gray-900 rounded-bl-none"
                  }`}
                >
                  <p className="text-sm">{msg.message}</p>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Form */}
          <div className="border-t p-4 bg-white">
            {showNameForm && (
              <div className="space-y-2 mb-4">
                <input
                  type="text"
                  placeholder="Votre nom"
                  value={visitorName}
                  onChange={(e) => setVisitorName(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
                <input
                  type="email"
                  placeholder="Votre email"
                  value={visitorEmail}
                  onChange={(e) => setVisitorEmail(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>
            )}

            <form onSubmit={handleSendMessage} className="flex gap-2">
              <input
                type="text"
                placeholder="Votre message..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
              <button
                type="submit"
                disabled={sendMessageMutation.isPending}
                className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-lg transition-colors disabled:opacity-50"
              >
                <Send className="w-5 h-5" />
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
