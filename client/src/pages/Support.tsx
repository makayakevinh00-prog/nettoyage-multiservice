import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ChevronDown, MessageSquare, HelpCircle, Phone, Mail } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { toast } from "sonner";

interface FAQItem {
  id: number;
  question: string;
  answer: string;
  category: string;
}

export default function Support() {
  const [activeTab, setActiveTab] = useState<"faq" | "contact" | "chat">("faq");
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);
  const [chatMessages, setChatMessages] = useState<Array<{ role: string; content: string }>>([
    { role: "bot", content: "Bonjour ! Comment puis-je vous aider ?" },
  ]);
  const [chatInput, setChatInput] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const faqItems: FAQItem[] = [
    {
      id: 1,
      category: "Abonnements",
      question: "Comment puis-je modifier la fréquence de mon abonnement ?",
      answer:
        "Vous pouvez modifier votre abonnement depuis votre espace client en cliquant sur 'Modifier' à côté de votre abonnement actif. Les changements prendront effet à la prochaine facturation.",
    },
    {
      id: 2,
      category: "Abonnements",
      question: "Puis-je annuler mon abonnement à tout moment ?",
      answer:
        "Oui, vous pouvez annuler votre abonnement à tout moment sans frais supplémentaires. L'annulation prendra effet immédiatement après confirmation.",
    },
    {
      id: 3,
      category: "Paiements",
      question: "Quels modes de paiement acceptez-vous ?",
      answer:
        "Nous acceptons les cartes bancaires (Visa, Mastercard, American Express), PayPal, Apple Pay et Google Pay. Tous les paiements sont sécurisés via Stripe.",
    },
    {
      id: 4,
      category: "Paiements",
      question: "Puis-je modifier mes informations de paiement ?",
      answer:
        "Oui, vous pouvez mettre à jour vos informations de paiement depuis votre espace client dans la section 'Paiements'.",
    },
    {
      id: 5,
      category: "Réservations",
      question: "Comment puis-je réserver une prestation ?",
      answer:
        "Cliquez sur 'Réserver maintenant' depuis la page d'accueil, sélectionnez votre service, prestation et options, puis choisissez votre date et heure. Vous serez ensuite redirigé vers la page de paiement.",
    },
    {
      id: 6,
      category: "Réservations",
      question: "Puis-je modifier ou annuler une réservation ?",
      answer:
        "Oui, vous pouvez modifier ou annuler une réservation jusqu'à 48h avant la date prévue. Contactez-nous via le formulaire de support pour plus de détails.",
    },
    {
      id: 7,
      category: "Services",
      question: "Intervenez-vous en dehors de l'Île-de-France ?",
      answer:
        "Actuellement, nous intervenons uniquement en Île-de-France. Contactez-nous pour connaître les zones exactes couvertes.",
    },
    {
      id: 8,
      category: "Services",
      question: "Utilisez-vous des produits écologiques ?",
      answer:
        "Oui, nous utilisons exclusivement des produits écologiques et respectueux de l'environnement pour tous nos services.",
    },
  ];

  const handleChatSubmit = () => {
    if (!chatInput.trim()) return;

    // Ajouter le message de l'utilisateur
    const newMessages = [
      ...chatMessages,
      { role: "user", content: chatInput },
    ];

    // Simuler une réponse du bot
    const responses = [
      "Merci pour votre question. Comment puis-je vous aider davantage ?",
      "Je comprends. Pouvez-vous me donner plus de détails ?",
      "C'est une excellente question. Laissez-moi vérifier cela pour vous.",
      "Je suis ici pour vous aider. Qu'autre chose puis-je faire ?",
    ];

    const randomResponse = responses[Math.floor(Math.random() * responses.length)];
    newMessages.push({ role: "bot", content: randomResponse });

    setChatMessages(newMessages);
    setChatInput("");
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Votre message a été envoyé. Nous vous répondrons sous 24h.");
    setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
  };

  const toggleFAQ = (id: number) => {
    setExpandedFAQ(expandedFAQ === id ? null : id);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />

      <main className="flex-1 py-20">
        <div className="container max-w-6xl">
          {/* En-tête */}
          <div className="mb-12 text-center">
            <h1 className="text-4xl font-bold text-slate-900 mb-4">Centre d'Aide</h1>
            <p className="text-gray-600 text-lg">
              Trouvez les réponses à vos questions ou contactez notre équipe
            </p>
          </div>

          {/* Onglets */}
          <div className="flex gap-4 mb-8 justify-center flex-wrap">
            <button
              onClick={() => setActiveTab("faq")}
              className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                activeTab === "faq"
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-700 border border-gray-300 hover:border-blue-600"
              }`}
            >
              <HelpCircle className="w-4 h-4 inline mr-2" />
              FAQ
            </button>
            <button
              onClick={() => setActiveTab("chat")}
              className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                activeTab === "chat"
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-700 border border-gray-300 hover:border-blue-600"
              }`}
            >
              <MessageSquare className="w-4 h-4 inline mr-2" />
              Chat
            </button>
            <button
              onClick={() => setActiveTab("contact")}
              className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                activeTab === "contact"
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-700 border border-gray-300 hover:border-blue-600"
              }`}
            >
              <Mail className="w-4 h-4 inline mr-2" />
              Contact
            </button>
          </div>

          {/* Contenu */}
          <div className="grid md:grid-cols-3 gap-8">
            {/* FAQ */}
            {activeTab === "faq" && (
              <div className="md:col-span-2 space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Questions Fréquemment Posées</CardTitle>
                    <CardDescription>Trouvez rapidement les réponses à vos questions</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {faqItems.map((item) => (
                      <div key={item.id} className="border border-gray-200 rounded-lg overflow-hidden">
                        <button
                          onClick={() => toggleFAQ(item.id)}
                          className="w-full px-4 py-4 flex items-center justify-between hover:bg-gray-50 transition-all"
                        >
                          <div className="text-left">
                            <p className="text-sm text-blue-600 font-semibold mb-1">{item.category}</p>
                            <p className="font-semibold text-gray-900">{item.question}</p>
                          </div>
                          <ChevronDown
                            className={`w-5 h-5 text-gray-600 transition-transform ${
                              expandedFAQ === item.id ? "rotate-180" : ""
                            }`}
                          />
                        </button>
                        {expandedFAQ === item.id && (
                          <div className="px-4 py-4 bg-gray-50 border-t border-gray-200">
                            <p className="text-gray-700">{item.answer}</p>
                          </div>
                        )}
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Chat */}
            {activeTab === "chat" && (
              <div className="md:col-span-2">
                <Card className="h-[600px] flex flex-col">
                  <CardHeader>
                    <CardTitle>Chat en Ligne</CardTitle>
                    <CardDescription>Discutez avec notre équipe</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-1 overflow-y-auto space-y-4 mb-4">
                    {chatMessages.map((msg, idx) => (
                      <div
                        key={idx}
                        className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                      >
                        <div
                          className={`max-w-xs px-4 py-2 rounded-lg ${
                            msg.role === "user"
                              ? "bg-blue-600 text-white"
                              : "bg-gray-200 text-gray-900"
                          }`}
                        >
                          {msg.content}
                        </div>
                      </div>
                    ))}
                  </CardContent>
                  <div className="border-t border-gray-200 p-4 flex gap-2">
                    <input
                      type="text"
                      value={chatInput}
                      onChange={(e) => setChatInput(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && handleChatSubmit()}
                      placeholder="Tapez votre message..."
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <Button onClick={handleChatSubmit} className="bg-blue-600 hover:bg-blue-700">
                      Envoyer
                    </Button>
                  </div>
                </Card>
              </div>
            )}

            {/* Contact */}
            {activeTab === "contact" && (
              <div className="md:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Formulaire de Contact</CardTitle>
                    <CardDescription>Envoyez-nous votre demande</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleContactSubmit} className="space-y-4">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="name" className="text-base font-semibold mb-2 block">
                            Nom
                          </Label>
                          <Input
                            id="name"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="email" className="text-base font-semibold mb-2 block">
                            Email
                          </Label>
                          <Input
                            id="email"
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            required
                          />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="phone" className="text-base font-semibold mb-2 block">
                          Téléphone
                        </Label>
                        <Input
                          id="phone"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        />
                      </div>
                      <div>
                        <Label htmlFor="subject" className="text-base font-semibold mb-2 block">
                          Sujet
                        </Label>
                        <Input
                          id="subject"
                          value={formData.subject}
                          onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="message" className="text-base font-semibold mb-2 block">
                          Message
                        </Label>
                        <Textarea
                          id="message"
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                          rows={5}
                          required
                        />
                      </div>
                      <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
                        Envoyer
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Sidebar avec infos de contact */}
            <div className="md:col-span-1 space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Contactez-nous</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex gap-3">
                    <Phone className="w-5 h-5 text-blue-600 flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-semibold text-gray-900">Téléphone</p>
                      <p className="text-gray-600">+33 1 XX XX XX XX</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <Mail className="w-5 h-5 text-blue-600 flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-semibold text-gray-900">Email</p>
                      <p className="text-gray-600">support@proclean.fr</p>
                    </div>
                  </div>
                  <div className="border-t border-gray-200 pt-4">
                    <p className="text-sm text-gray-600">
                      <strong>Horaires :</strong>
                      <br />
                      Lun-Ven : 8h-20h
                      <br />
                      Sam : 9h-17h
                      <br />
                      Dim : Fermé
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
