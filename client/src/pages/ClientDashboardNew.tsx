import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useAuth } from "@/_core/hooks/useAuth";
import { useLocation } from "wouter";
import { Calendar, CreditCard, FileText, LogOut, User, Zap } from "lucide-react";

export default function ClientDashboardNew() {
  const { user, logout } = useAuth();
  const [, navigate] = useLocation();

  // Données fictives pour la démo
  const subscriptions = [
    {
      id: 1,
      plan: "Confort",
      price: 60,
      status: "active",
      startDate: "2026-01-15",
      nextBillingDate: "2026-05-08",
      interventions: 2,
    },
  ];

  const bookings = [
    {
      id: 1,
      service: "Nettoyage Automobile",
      date: "2026-04-10",
      time: "14:00",
      status: "confirmed",
      price: 110,
    },
    {
      id: 2,
      service: "Nettoyage Terrasse",
      date: "2026-04-15",
      time: "10:00",
      status: "pending",
      price: 160,
    },
  ];

  const invoices = [
    {
      id: "INV-001",
      date: "2026-04-08",
      amount: 60,
      status: "paid",
      type: "Abonnement Confort",
    },
    {
      id: "INV-002",
      date: "2026-03-08",
      amount: 60,
      status: "paid",
      type: "Abonnement Confort",
    },
  ];

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col bg-white">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <p className="text-gray-600 mb-4">Veuillez vous connecter pour accéder à votre dashboard</p>
            <Button onClick={() => navigate("/")} className="bg-blue-600 hover:bg-blue-700">
              Retour à l'Accueil
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />

      <main className="flex-1 py-20">
        <div className="container">
          {/* Header */}
          <div className="flex justify-between items-center mb-12">
            <div>
              <h1 className="text-4xl font-bold text-slate-900 mb-2">Mon Dashboard</h1>
              <p className="text-gray-600">Bienvenue, {user.name || user.email}</p>
            </div>
            <Button
              onClick={handleLogout}
              variant="outline"
              className="border-red-600 text-red-600 hover:bg-red-50"
            >
              <LogOut className="w-5 h-5 mr-2" />
              Déconnexion
            </Button>
          </div>

          {/* Stats Cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-gray-600">Abonnement Actif</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-blue-600 mb-2">Confort</div>
                <p className="text-sm text-gray-600">60€/mois • 2 interventions</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-gray-600">Prochaine Intervention</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-green-600 mb-2">10 Avril</div>
                <p className="text-sm text-gray-600">Nettoyage Automobile à 14h</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-gray-600">Dépenses Ce Mois</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-purple-600 mb-2">120€</div>
                <p className="text-sm text-gray-600">Abonnement + Prestations</p>
              </CardContent>
            </Card>
          </div>

          {/* Tabs */}
          <Tabs defaultValue="subscriptions" className="w-full">
            <TabsList className="grid w-full max-w-md grid-cols-3 mb-8">
              <TabsTrigger value="subscriptions">
                <Zap className="w-4 h-4 mr-2" />
                Abonnements
              </TabsTrigger>
              <TabsTrigger value="bookings">
                <Calendar className="w-4 h-4 mr-2" />
                Réservations
              </TabsTrigger>
              <TabsTrigger value="invoices">
                <FileText className="w-4 h-4 mr-2" />
                Factures
              </TabsTrigger>
            </TabsList>

            {/* Subscriptions Tab */}
            <TabsContent value="subscriptions" className="space-y-6">
              {subscriptions.map((sub) => (
                <Card key={sub.id}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle>Abonnement {sub.plan}</CardTitle>
                        <CardDescription>
                          {sub.interventions} intervention(s) par mois
                        </CardDescription>
                      </div>
                      <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">
                        Actif
                      </span>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-600">Prix Mensuel</p>
                        <p className="text-2xl font-bold text-blue-600">{sub.price}€</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Prochain Renouvellement</p>
                        <p className="font-semibold text-gray-900">
                          {new Date(sub.nextBillingDate).toLocaleDateString("fr-FR")}
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-3 pt-4 border-t">
                      <Button variant="outline" className="flex-1">
                        Modifier
                      </Button>
                      <Button variant="outline" className="flex-1 border-red-600 text-red-600 hover:bg-red-50">
                        Résilier
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            {/* Bookings Tab */}
            <TabsContent value="bookings" className="space-y-6">
              {bookings.map((booking) => (
                <Card key={booking.id}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle>{booking.service}</CardTitle>
                        <CardDescription>
                          {new Date(booking.date).toLocaleDateString("fr-FR")} à {booking.time}
                        </CardDescription>
                      </div>
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-semibold ${
                          booking.status === "confirmed"
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {booking.status === "confirmed" ? "Confirmée" : "En Attente"}
                      </span>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Montant</span>
                      <span className="text-2xl font-bold text-blue-600">{booking.price}€</span>
                    </div>

                    <div className="flex gap-3 pt-4 border-t">
                      <Button variant="outline" className="flex-1">
                        Détails
                      </Button>
                      {booking.status === "pending" && (
                        <Button variant="outline" className="flex-1 border-red-600 text-red-600 hover:bg-red-50">
                          Annuler
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}

              <Button onClick={() => navigate("/reservation")} size="lg" className="w-full bg-blue-600 hover:bg-blue-700">
                <Calendar className="w-5 h-5 mr-2" />
                Nouvelle Réservation
              </Button>
            </TabsContent>

            {/* Invoices Tab */}
            <TabsContent value="invoices" className="space-y-6">
              <div className="space-y-2">
                {invoices.map((invoice) => (
                  <Card key={invoice.id}>
                    <CardContent className="pt-6">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-semibold text-gray-900">{invoice.type}</p>
                          <p className="text-sm text-gray-600">
                            {new Date(invoice.date).toLocaleDateString("fr-FR")}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-bold text-blue-600">{invoice.amount}€</p>
                          <span className="text-sm text-green-600 font-semibold">Payée</span>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="w-full mt-4 text-blue-600 hover:bg-blue-50"
                      >
                        <FileText className="w-4 h-4 mr-2" />
                        Télécharger
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <Footer />
    </div>
  );
}
