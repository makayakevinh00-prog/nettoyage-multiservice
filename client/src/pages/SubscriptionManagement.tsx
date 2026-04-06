import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, Calendar, CreditCard, Pause, Play, Trash2, Download } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { trpc } from "@/lib/trpc";

export default function SubscriptionManagement() {
  const { user, isAuthenticated } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  // Récupérer l'abonnement actif
  const { data: subscription, isLoading: isLoadingSubscription, refetch } = trpc.subscriptions.getActiveSubscription.useQuery(undefined, {
    enabled: isAuthenticated,
  });

  // Récupérer les factures
  const { data: invoices = [] } = trpc.subscriptions.getInvoices.useQuery(undefined, {
    enabled: isAuthenticated,
  });

  const cancelMutation = trpc.subscriptions.cancelSubscription.useMutation({
    onSuccess: () => {
      toast.success("Abonnement annulé");
      refetch();
    },
    onError: (error) => {
      toast.error(error.message || "Erreur lors de l'annulation");
    },
  });

  const pauseMutation = trpc.subscriptions.pauseSubscription.useMutation({
    onSuccess: () => {
      toast.success("Abonnement mis en pause");
      refetch();
    },
    onError: (error) => {
      toast.error(error.message || "Erreur lors de la mise en pause");
    },
  });

  const resumeMutation = trpc.subscriptions.resumeSubscription.useMutation({
    onSuccess: () => {
      toast.success("Abonnement repris");
      refetch();
    },
    onError: (error) => {
      toast.error(error.message || "Erreur lors de la reprise");
    },
  });

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex flex-col bg-white">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Veuillez vous connecter</h1>
            <p className="text-gray-600">Vous devez être connecté pour gérer votre abonnement</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />

      <main className="flex-1 py-12">
        <div className="container max-w-4xl">
          <h1 className="text-4xl font-bold mb-12">Gestion de mon abonnement</h1>

          {isLoadingSubscription ? (
            <div className="text-center py-12">
              <p className="text-gray-600">Chargement...</p>
            </div>
          ) : subscription ? (
            <div className="space-y-8">
              {/* Subscription Card */}
              <Card className="border-2 border-blue-500">
                <CardHeader>
                  <CardTitle className="text-2xl">
                    Abonnement {subscription.plan === "express" ? "Express" : "Confort"}
                  </CardTitle>
                  <CardDescription>
                    {subscription.status === "active" && "Actif"}
                    {subscription.status === "paused" && "En pause"}
                    {subscription.status === "cancelled" && "Annulé"}
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-6">
                  {/* Status */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Tarif mensuel</p>
                      <p className="text-2xl font-bold">
                        {subscription.monthlyPrice / 100}€/mois
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Statut</p>
                      <div className="flex items-center gap-2">
                        <div
                          className={`w-3 h-3 rounded-full ${
                            subscription.status === "active"
                              ? "bg-green-500"
                              : subscription.status === "paused"
                              ? "bg-yellow-500"
                              : "bg-red-500"
                          }`}
                        />
                        <span className="font-semibold capitalize">
                          {subscription.status === "active" && "Actif"}
                          {subscription.status === "paused" && "En pause"}
                          {subscription.status === "cancelled" && "Annulé"}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Billing Dates */}
                  <div className="grid md:grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Calendar className="w-5 h-5 text-blue-500" />
                      <div>
                        <p className="text-sm text-gray-600">Prochain prélèvement</p>
                        <p className="font-semibold">
                          {subscription.nextBillingDate
                            ? new Date(subscription.nextBillingDate).toLocaleDateString("fr-FR")
                            : "N/A"}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <CreditCard className="w-5 h-5 text-blue-500" />
                      <div>
                        <p className="text-sm text-gray-600">Cycle actuel</p>
                        <p className="font-semibold">
                          {subscription.currentBillingCycleStart
                            ? new Date(subscription.currentBillingCycleStart).toLocaleDateString("fr-FR")
                            : "N/A"}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-wrap gap-3">
                    {subscription.status === "active" && (
                      <>
                        <Button
                          onClick={() => pauseMutation.mutate()}
                          disabled={pauseMutation.isPending}
                          variant="outline"
                          className="gap-2"
                        >
                          <Pause className="w-4 h-4" />
                          Mettre en pause
                        </Button>
                        <Button
                          onClick={() => cancelMutation.mutate({ reason: "Raison non spécifiée" })}
                          disabled={cancelMutation.isPending}
                          variant="destructive"
                          className="gap-2"
                        >
                          <Trash2 className="w-4 h-4" />
                          Annuler l'abonnement
                        </Button>
                      </>
                    )}

                    {subscription.status === "paused" && (
                      <Button
                        onClick={() => resumeMutation.mutate()}
                        disabled={resumeMutation.isPending}
                        className="gap-2 bg-green-600 hover:bg-green-700"
                      >
                        <Play className="w-4 h-4" />
                        Reprendre l'abonnement
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Invoices */}
              <div>
                <h2 className="text-2xl font-bold mb-4">Factures</h2>
                {invoices.length > 0 ? (
                  <div className="space-y-3">
                    {invoices.map((invoice) => (
                      <Card key={invoice.id}>
                        <CardContent className="pt-6">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-semibold">
                                Facture du {new Date(invoice.createdAt).toLocaleDateString("fr-FR")}
                              </p>
                              <p className="text-sm text-gray-600">
                                Montant: {invoice.amount / 100}€ - Statut: {invoice.status}
                              </p>
                            </div>
                            {invoice.pdfUrl && (
                              <Button
                                onClick={() => window.open(invoice.pdfUrl, "_blank")}
                                variant="outline"
                                size="sm"
                                className="gap-2"
                              >
                                <Download className="w-4 h-4" />
                                Télécharger
                              </Button>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <Card>
                    <CardContent className="pt-6 text-center text-gray-600">
                      Aucune facture disponible
                    </CardContent>
                  </Card>
                )}
              </div>

              {/* Info */}
              <div className="flex gap-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-gray-700">
                  <p className="font-semibold mb-2">Information importante</p>
                  <p>
                    Vous pouvez mettre votre abonnement en pause à tout moment. Les prélèvements mensuels s'arrêteront automatiquement. Pour reprendre, cliquez sur "Reprendre l'abonnement".
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <Card>
              <CardContent className="pt-6">
                <div className="text-center py-12">
                  <h2 className="text-2xl font-bold mb-4">Aucun abonnement actif</h2>
                  <p className="text-gray-600 mb-6">
                    Vous n'avez pas d'abonnement automobile actif pour le moment.
                  </p>
                  <Button
                    onClick={() => (window.location.href = "/abonnements-auto")}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    Découvrir nos abonnements
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
