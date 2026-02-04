import { useAuth } from "@/_core/hooks/useAuth";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, CheckCircle2, Clock, XCircle } from "lucide-react";
import { useState } from "react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

const STATUS_COLORS: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-800",
  confirmed: "bg-blue-100 text-blue-800",
  completed: "bg-green-100 text-green-800",
  cancelled: "bg-red-100 text-red-800",
};

export default function Admin() {
  const { user, loading } = useAuth();
  const [bookingPage, setBookingPage] = useState(0);
  const [logsPage, setLogsPage] = useState(0);

  // Vérifier que l'utilisateur est admin
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

  // Récupérer les données
  const { data: statsData, isLoading: statsLoading } = trpc.adminBookings.getStats.useQuery();
  const { data: bookingsData, isLoading: bookingsLoading } = trpc.adminBookings.getBookings.useQuery({
    limit: 20,
    offset: bookingPage * 20,
  });
  const { data: logsData, isLoading: logsLoading } = trpc.adminBookings.getIntegrationLogs.useQuery({
    limit: 50,
    offset: logsPage * 50,
  });

  const stats = statsData || {
    bookingStats: { total: 0, pending: 0, confirmed: 0, completed: 0, cancelled: 0, totalRevenue: 0 },
    integrationStats: { total: 0, success: 0, error: 0, pending: 0, retry: 0, byService: {} },
  };

  const bookings = bookingsData?.bookings || [];
  const logs = logsData?.logs || [];

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* En-tête */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Tableau de Bord Administration</h1>
          <p className="text-gray-600">Gérez les réservations et consultez les logs des intégrations</p>
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
              <div className="text-2xl font-bold">{stats.bookingStats.totalRevenue}€</div>
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
          <TabsContent value="bookings" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Réservations Récentes</CardTitle>
              </CardHeader>
              <CardContent>
                {bookingsLoading ? (
                  <p>Chargement...</p>
                ) : bookings.length === 0 ? (
                  <p className="text-gray-500">Aucune réservation</p>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-2 px-2">Client</th>
                          <th className="text-left py-2 px-2">Service</th>
                          <th className="text-left py-2 px-2">Date</th>
                          <th className="text-left py-2 px-2">Statut</th>
                        </tr>
                      </thead>
                      <tbody>
                        {bookings.map((booking: any) => (
                          <tr key={booking.id} className="border-b hover:bg-gray-50">
                            <td className="py-2 px-2">{booking.name}</td>
                            <td className="py-2 px-2">{booking.service}</td>
                            <td className="py-2 px-2">{booking.date}</td>
                            <td className="py-2 px-2">
                              <Badge className={STATUS_COLORS[booking.status] || "bg-gray-100"}>
                                {booking.status}
                              </Badge>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
                <div className="flex justify-between mt-4">
                  <Button onClick={() => setBookingPage(Math.max(0, bookingPage - 1))} disabled={bookingPage === 0}>
                    Précédent
                  </Button>
                  <span className="text-sm text-gray-600">Page {bookingPage + 1}</span>
                  <Button onClick={() => setBookingPage(bookingPage + 1)}>
                    Suivant
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Onglet Logs */}
          <TabsContent value="logs" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Logs Intégrations</CardTitle>
              </CardHeader>
              <CardContent>
                {logsLoading ? (
                  <p>Chargement...</p>
                ) : logs.length === 0 ? (
                  <p className="text-gray-500">Aucun log</p>
                ) : (
                  <div className="space-y-2">
                    {logs.map((log: any) => (
                      <div key={log.id} className="border rounded p-3 flex items-start gap-3">
                        {log.status === "success" && <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5" />}
                        {log.status === "error" && <AlertCircle className="w-5 h-5 text-red-600 mt-0.5" />}
                        {log.status === "pending" && <Clock className="w-5 h-5 text-yellow-600 mt-0.5" />}
                        <div className="flex-1">
                          <p className="font-medium">{log.service}</p>
                          <p className="text-sm text-gray-600">{log.message}</p>
                          <p className="text-xs text-gray-400">{format(new Date(log.createdAt), "PPpp", { locale: fr })}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                <div className="flex justify-between mt-4">
                  <Button onClick={() => setLogsPage(Math.max(0, logsPage - 1))} disabled={logsPage === 0}>
                    Précédent
                  </Button>
                  <span className="text-sm text-gray-600">Page {logsPage + 1}</span>
                  <Button onClick={() => setLogsPage(logsPage + 1)}>
                    Suivant
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Onglet Statistiques */}
          <TabsContent value="stats" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Statistiques Intégrations</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <p className="text-sm"><span className="font-medium">Total:</span> {stats.integrationStats.total}</p>
                    <p className="text-sm text-green-600"><span className="font-medium">Succès:</span> {stats.integrationStats.success}</p>
                    <p className="text-sm text-red-600"><span className="font-medium">Erreurs:</span> {stats.integrationStats.error}</p>
                    <p className="text-sm text-yellow-600"><span className="font-medium">En attente:</span> {stats.integrationStats.pending}</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Statistiques Réservations</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <p className="text-sm"><span className="font-medium">Total:</span> {stats.bookingStats.total}</p>
                    <p className="text-sm"><span className="font-medium">Taux de succès:</span> {stats.bookingStats.total > 0 ? Math.round((stats.bookingStats.completed / stats.bookingStats.total) * 100) : 0}%</p>
                    <p className="text-sm"><span className="font-medium">Revenu moyen:</span> {stats.bookingStats.total > 0 ? (stats.bookingStats.totalRevenue / stats.bookingStats.total).toFixed(2) : 0}€</p>
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
