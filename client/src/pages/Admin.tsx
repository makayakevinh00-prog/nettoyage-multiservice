import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, CheckCircle2, Clock, XCircle } from "lucide-react";
import { useState } from "react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { toast } from "sonner";
import { Link } from "wouter";

const STATUS_COLORS: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-800",
  confirmed: "bg-blue-100 text-blue-800",
  completed: "bg-green-100 text-green-800",
  cancelled: "bg-red-100 text-red-800",
};

export default function Admin() {
  // Tous les hooks DOIVENT être appelés au niveau du composant
  const { user, loading } = useAuth();
  const [bookingPage, setBookingPage] = useState(0);
  const [logsPage, setLogsPage] = useState(0);
  const utils = trpc.useUtils();

  // Récupérer les données (hooks toujours appelés)
  const { data: statsData, isLoading: statsLoading } = trpc.adminBookings.getStats.useQuery();
  const { data: bookingsData, isLoading: bookingsLoading } = trpc.adminBookings.getBookings.useQuery({
    limit: 20,
    offset: bookingPage * 20,
  });
  const { data: logsData, isLoading: logsLoading } = trpc.adminBookings.getIntegrationLogs.useQuery({
    limit: 50,
    offset: logsPage * 50,
  });

  // Mutation pour mettre à jour le statut
  const updateStatusMutation = trpc.adminBookings.updateStatus.useMutation({
    onSuccess: () => {
      toast.success("Statut mis à jour");
      utils.adminBookings.getStats.invalidate();
      utils.adminBookings.getBookings.invalidate();
    },
    onError: (error) => {
      toast.error("Erreur lors de la mise à jour");
    },
  });

  const handleStatusUpdate = (bookingId: number, status: string) => {
    updateStatusMutation.mutate({
      bookingId,
      status: status as any,
    });
  };

  // Vérifications conditionnelles APRÈS les hooks
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Chargement...</p>
      </div>
    );
  }

  if (user?.role !== "admin") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-red-600">Accès Refusé</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Vous n'avez pas les permissions pour accéder à cette page.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Préparer les données
  const stats = statsData || {
    bookingStats: { total: 0, pending: 0, confirmed: 0, completed: 0, cancelled: 0, totalRevenue: 0 },
    integrationStats: { total: 0, success: 0, error: 0, pending: 0, retry: 0, byService: {} },
  };

  const bookings = bookingsData?.bookings || [];
  const logs = logsData?.logs || [];

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* En-tête avec bouton retour */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Tableau de Bord Administration</h1>
            <p className="text-gray-600">Gérez les réservations et consultez les logs des intégrations</p>
          </div>
          <Link href="/">
            <Button variant="outline" className="whitespace-nowrap">
              ← Retour à l'accueil
            </Button>
          </Link>
        </div>

        {/* Statistiques */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Total Réservations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.bookingStats.total}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">En Attente</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">{stats.bookingStats.pending}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Confirmées</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{stats.bookingStats.confirmed}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Complétées</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{stats.bookingStats.completed}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Annulées</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">{stats.bookingStats.cancelled}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Revenu Total</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-700">
                {stats.bookingStats.totalRevenue.toFixed(2)}€
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Onglets */}
        <Tabs defaultValue="bookings" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="bookings">Réservations</TabsTrigger>
            <TabsTrigger value="logs">Logs Intégrations</TabsTrigger>
            <TabsTrigger value="stats">Statistiques</TabsTrigger>
          </TabsList>

          {/* Onglet Réservations */}
          <TabsContent value="bookings" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Réservations Récentes</CardTitle>
              </CardHeader>
              <CardContent>
                {bookingsLoading ? (
                  <p>Chargement...</p>
                ) : bookings.length === 0 ? (
                  <p className="text-gray-500">Aucune réservation trouvée</p>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-2 px-4">Client</th>
                          <th className="text-left py-2 px-4">Service</th>
                          <th className="text-left py-2 px-4">Date</th>
                          <th className="text-left py-2 px-4">Prix</th>
                          <th className="text-left py-2 px-4">Statut</th>
                          <th className="text-left py-2 px-4">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {bookings.map((booking: any) => (
                          <tr key={booking.id} className="border-b hover:bg-gray-50">
                            <td className="py-2 px-4">{booking.name || booking.clientName || 'N/A'}</td>
                            <td className="py-2 px-4">{booking.service}</td>
                            <td className="py-2 px-4">
                              {format(new Date(booking.date), "dd/MM/yyyy HH:mm", { locale: fr })}
                            </td>
                            <td className="py-2 px-4">{((booking.totalPrice || 0) / 100).toFixed(2)}€</td>
                            <td className="py-2 px-4">
                              <Badge className={STATUS_COLORS[booking.status] || "bg-gray-100"}>
                                {booking.status}
                              </Badge>
                            </td>
                            <td className="py-2 px-4">
                              <select
                                value={booking.status}
                                onChange={(e) => handleStatusUpdate(booking.id, e.target.value)}
                                className="text-xs border rounded px-2 py-1"
                              >
                                <option value="pending">En attente</option>
                                <option value="confirmed">Confirmée</option>
                                <option value="completed">Complétée</option>
                                <option value="cancelled">Annulée</option>
                              </select>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
                <div className="flex justify-between items-center mt-4">
                  <Button
                    onClick={() => setBookingPage(Math.max(0, bookingPage - 1))}
                    disabled={bookingPage === 0}
                  >
                    Précédent
                  </Button>
                  <span>Page {bookingPage + 1}</span>
                  <Button onClick={() => setBookingPage(bookingPage + 1)}>Suivant</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Onglet Logs */}
          <TabsContent value="logs" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Logs Intégrations</CardTitle>
              </CardHeader>
              <CardContent>
                {logsLoading ? (
                  <p>Chargement...</p>
                ) : logs.length === 0 ? (
                  <p className="text-gray-500">Aucun log trouvé</p>
                ) : (
                  <div className="space-y-4">
                    {logs.map((log: any) => (
                      <div key={log.id} className="border rounded p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-medium">{log.service}</p>
                            <p className="text-sm text-gray-600">{log.eventType}</p>
                            <p className="text-xs text-gray-500 mt-1">
                              {format(new Date(log.createdAt), "dd/MM/yyyy HH:mm:ss", { locale: fr })}
                            </p>
                          </div>
                          <Badge
                            className={
                              log.status === "success"
                                ? "bg-green-100 text-green-800"
                                : log.status === "error"
                                ? "bg-red-100 text-red-800"
                                : "bg-yellow-100 text-yellow-800"
                            }
                          >
                            {log.status}
                          </Badge>
                        </div>
                        {log.message && <p className="text-sm mt-2 text-gray-700">{log.message}</p>}
                      </div>
                    ))}
                  </div>
                )}
                <div className="flex justify-between items-center mt-4">
                  <Button
                    onClick={() => setLogsPage(Math.max(0, logsPage - 1))}
                    disabled={logsPage === 0}
                  >
                    Précédent
                  </Button>
                  <span>Page {logsPage + 1}</span>
                  <Button onClick={() => setLogsPage(logsPage + 1)}>Suivant</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Onglet Statistiques */}
          <TabsContent value="stats" className="mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Statistiques Réservations</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <p>Total: {stats.bookingStats.total}</p>
                    <p>En attente: {stats.bookingStats.pending}</p>
                    <p>Confirmées: {stats.bookingStats.confirmed}</p>
                    <p>Complétées: {stats.bookingStats.completed}</p>
                    <p>Annulées: {stats.bookingStats.cancelled}</p>
                    <p className="font-bold mt-4">Revenu: {stats.bookingStats.totalRevenue.toFixed(2)}€</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Statistiques Intégrations</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <p>Total: {stats.integrationStats.total}</p>
                    <p className="text-green-600">Succès: {stats.integrationStats.success}</p>
                    <p className="text-red-600">Erreurs: {stats.integrationStats.error}</p>
                    <p className="text-yellow-600">En attente: {stats.integrationStats.pending}</p>
                    <p className="text-blue-600">Retry: {stats.integrationStats.retry}</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
