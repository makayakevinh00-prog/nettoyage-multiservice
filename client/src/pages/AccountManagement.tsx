import { useState } from "react";
import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { AlertCircle, CreditCard, Calendar, FileText, LogOut, Settings } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { toast } from "sonner";
import { useLocation } from "wouter";

export default function AccountManagement() {
  const { user, logout } = useAuth();
  const [, navigate] = useLocation();
  const [activeTab, setActiveTab] = useState<"subscriptions" | "payments" | "history" | "support">("subscriptions");

  // Données simulées
  const subscriptions = [
    {
      id: 1,
      name: "Abonnement Express - Automobile",
      frequency: "Hebdomadaire",
      price: 30,
      nextDate: "2026-04-15",
      status: "active",
    },
    {
      id: 2,
      name: "Abonnement Confort - Terrasse",
      frequency: "Mensuelle",
      price: 60,
      nextDate: "2026-05-08",
      status: "active",
    },
  ];

  const payments = [
    {
      id: 1,
      date: "2026-04-08",
      description: "Paiement Abonnement Express",
      amount: 30,
      status: "completed",
    },
    {
      id: 2,
      date: "2026-04-01",
      description: "Prestation Nettoyage Automobile",
      amount: 110,
      status: "completed",
    },
    {
      id: 3,
      date: "2026-03-25",
      description: "Paiement Abonnement Confort",
      amount: 60,
      status: "completed",
    },
  ];

  const history = [
    {
      id: 1,
      date: "2026-04-08",
      service: "Nettoyage Automobile",
      type: "Prestation",
      status: "completed",
    },
    {
      id: 2,
      date: "2026-04-01",
      service: "Nettoyage Terrasse",
      type: "Abonnement",
      status: "completed",
    },
  ];

  const handleModifySubscription = (id: number) => {
    toast.success("Redirection vers la modification d'abonnement...");
    // Redirection vers page de modification
  };

  const handleCancelSubscription = (id: number) => {
    if (confirm("Êtes-vous sûr de vouloir annuler cet abonnement ?")) {
      toast.success("Abonnement annulé");
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate("/");
    toast.success("Déconnexion réussie");
  };

  const handleSupportSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast.success("Votre demande a été envoyée. Nous vous répondrons sous 24h.");
    (e.target as HTMLFormElement).reset();
  };

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col bg-white">
        <Header />
        <main className="flex-1 flex items-center justify-center py-20">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle>Accès refusé</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">Vous devez être connecté pour accéder à cette page.</p>
              <Button onClick={() => navigate("/")} className="w-full">
                Retour à l'accueil
              </Button>
            </CardContent>
          </Card>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />

      <main className="flex-1 py-20">
        <div className="container max-w-6xl">
          {/* En-tête */}
          <div className="mb-12">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-4xl font-bold text-slate-900">Mon Compte</h1>
                <p className="text-gray-600 mt-2">Bienvenue, {user.name || user.email}</p>
              </div>
              <Button variant="destructive" onClick={handleLogout} className="gap-2">
                <LogOut className="w-4 h-4" />
                Déconnexion
              </Button>
            </div>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {/* Sidebar Navigation */}
            <div className="md:col-span-1">
              <div className="space-y-2">
                <button
                  onClick={() => setActiveTab("subscriptions")}
                  className={`w-full text-left px-4 py-3 rounded-lg font-medium transition-all ${
                    activeTab === "subscriptions"
                      ? "bg-blue-600 text-white"
                      : "bg-white text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <Calendar className="w-4 h-4 inline mr-2" />
                  Abonnements
                </button>
                <button
                  onClick={() => setActiveTab("payments")}
                  className={`w-full text-left px-4 py-3 rounded-lg font-medium transition-all ${
                    activeTab === "payments"
                      ? "bg-blue-600 text-white"
                      : "bg-white text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <CreditCard className="w-4 h-4 inline mr-2" />
                  Paiements
                </button>
                <button
                  onClick={() => setActiveTab("history")}
                  className={`w-full text-left px-4 py-3 rounded-lg font-medium transition-all ${
                    activeTab === "history"
                      ? "bg-blue-600 text-white"
                      : "bg-white text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <FileText className="w-4 h-4 inline mr-2" />
                  Historique
                </button>
                <button
                  onClick={() => setActiveTab("support")}
                  className={`w-full text-left px-4 py-3 rounded-lg font-medium transition-all ${
                    activeTab === "support"
                      ? "bg-blue-600 text-white"
                      : "bg-white text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <AlertCircle className="w-4 h-4 inline mr-2" />
                  Support
                </button>
              </div>
            </div>

            {/* Main Content */}
            <div className="md:col-span-3">
              {/* Abonnements */}
              {activeTab === "subscriptions" && (
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Mes Abonnements</CardTitle>
                      <CardDescription>Gérez vos abonnements actifs</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {subscriptions.map((sub) => (
                        <div key={sub.id} className="border border-gray-200 rounded-lg p-4">
                          <div className="flex items-start justify-between mb-3">
                            <div>
                              <h3 className="font-semibold text-gray-900">{sub.name}</h3>
                              <p className="text-sm text-gray-600">Fréquence : {sub.frequency}</p>
                            </div>
                            <span className="inline-block px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                              Actif
                            </span>
                          </div>
                          <div className="flex items-center justify-between mb-4">
                            <div>
                              <p className="text-2xl font-bold text-blue-600">{sub.price}€</p>
                              <p className="text-sm text-gray-600">Prochaine intervention : {sub.nextDate}</p>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleModifySubscription(sub.id)}
                            >
                              <Settings className="w-4 h-4 mr-2" />
                              Modifier
                            </Button>
                            <Button
                              variant="destructive"
                              size="sm"
                              onClick={() => handleCancelSubscription(sub.id)}
                            >
                              Annuler
                            </Button>
                          </div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </div>
              )}

              {/* Paiements */}
              {activeTab === "payments" && (
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Historique des Paiements</CardTitle>
                      <CardDescription>Vos transactions récentes</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="overflow-x-auto">
                        <table className="w-full">
                          <thead>
                            <tr className="border-b border-gray-200">
                              <th className="text-left py-3 px-4 font-semibold text-gray-700">Date</th>
                              <th className="text-left py-3 px-4 font-semibold text-gray-700">Description</th>
                              <th className="text-right py-3 px-4 font-semibold text-gray-700">Montant</th>
                              <th className="text-center py-3 px-4 font-semibold text-gray-700">Statut</th>
                            </tr>
                          </thead>
                          <tbody>
                            {payments.map((payment) => (
                              <tr key={payment.id} className="border-b border-gray-100 hover:bg-gray-50">
                                <td className="py-3 px-4 text-gray-900">{payment.date}</td>
                                <td className="py-3 px-4 text-gray-700">{payment.description}</td>
                                <td className="py-3 px-4 text-right font-semibold text-gray-900">{payment.amount}€</td>
                                <td className="py-3 px-4 text-center">
                                  <span className="inline-block px-2 py-1 bg-green-100 text-green-800 rounded text-sm font-medium">
                                    Complété
                                  </span>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}

              {/* Historique */}
              {activeTab === "history" && (
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Historique des Prestations</CardTitle>
                      <CardDescription>Vos interventions passées</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {history.map((item) => (
                          <div key={item.id} className="border border-gray-200 rounded-lg p-4 flex items-center justify-between">
                            <div>
                              <h3 className="font-semibold text-gray-900">{item.service}</h3>
                              <p className="text-sm text-gray-600">{item.date} • {item.type}</p>
                            </div>
                            <span className="inline-block px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                              Complétée
                            </span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}

              {/* Support */}
              {activeTab === "support" && (
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Contacter le Support</CardTitle>
                      <CardDescription>Nous sommes là pour vous aider</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <form onSubmit={handleSupportSubmit} className="space-y-4">
                        <div>
                          <Label htmlFor="subject" className="text-base font-semibold mb-2 block">
                            Sujet
                          </Label>
                          <Input
                            id="subject"
                            placeholder="Décrivez votre problème"
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="message" className="text-base font-semibold mb-2 block">
                            Message
                          </Label>
                          <Textarea
                            id="message"
                            placeholder="Détails de votre demande"
                            rows={5}
                            required
                          />
                        </div>
                        <Button type="submit" className="w-full">
                          Envoyer
                        </Button>
                      </form>
                    </CardContent>
                  </Card>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
