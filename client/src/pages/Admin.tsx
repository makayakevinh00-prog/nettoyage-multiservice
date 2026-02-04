import { useAuth } from "@/_core/hooks/useAuth";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, CheckCircle2, Clock, XCircle, TrendingUp, BarChart3 } from "lucide-react";
import { useState } from "react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

const STATUS_COLORS: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-800",
  confirmed: "bg-blue-100 text-blue-800",
  completed: "bg-green-100 text-green-800",
  cancelled: "bg-red-100 text-red-800",
};

const INTEGRATION_STATUS_COLORS: Record<string, string> = {
  success: "bg-green-100 text-green-800",
  error: "bg-red-100 text-red-800",
  pending: "bg-yellow-100 text-yellow-800",
  retry: "bg-orange-100 text-orange-800",
};

export default function Admin() {
  const { user } = useAuth();
  const [bookingPage, setBookingPage] = useState(0);
  const [logsPage, setLogsPage] = useState(0);
  const [selectedBookingId, setSelectedBookingId] = useState<number | null>(null);
  const [filters, setFilters] = useState({
    status: "",
    service: "",
    dateFrom: "",
    dateTo: "",
  });

  // Vérifier que l'utilisateur est admin
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
  const { data: statsData } = trpc.adminBookings.getStats.useQuery();
  const { data: bookingsData } = trpc.adminBookings.getBookings.useQuery({
    limit: 20,
    offset: bookingPage * 20,
    status: filters.status || undefined,
    service: filters.service || undefined,
    dateFrom: filters.dateFrom || undefined,
    dateTo: filters.dateTo || undefined,
  });
  const { data: logsData } = trpc.adminBookings.getIntegrationLogs.useQuery({
    limit: 50,
    offset: logsPage * 50,
  });
  const { data: bookingDetail } = trpc.adminBookings.getBookingDetail.useQuery(
    { bookingId: selectedBookingId! },
    { enabled: selectedBookingId !== null }
  );

  const stats = statsData || {
    bookingStats: { total: 0, pending: 0, confirmed: 0, completed: 0, cancelled: 0, totalRevenue: 0 },
    integrationStats: { total: 0, success: 0, error: 0, pending: 0, retry: 0, byService: {} },
  };

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
              <div className="text-2xl font-bold text-green-600">{stats.bookingStats.totalRevenue.toFixed(2)}€</div>
            </CardContent>
          </Card>
        </div>

        {/* Onglets */}
        <Tabs defaultValue="bookings" className="space-y-4">
          <TabsList>
            <TabsTrigger value="bookings">Réservations</TabsTrigger>
            <TabsTrigger value="logs">Logs Intégrations</TabsTrigger>
            <TabsTrigger value="stats">Statistiques</TabsTrigger>
          </TabsList>

          {/* Onglet Réservations */}
          <TabsContent value="bookings" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Filtres</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div>
                    <Label>Statut</Label>
                    <Select value={filters.status} onValueChange={(value) => setFilters({ ...filters, status: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Tous" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">Tous</SelectItem>
                        <SelectItem value="pending">En attente</SelectItem>
                        <SelectItem value="confirmed">Confirmée</SelectItem>
                        <SelectItem value="completed">Complétée</SelectItem>
                        <SelectItem value="cancelled">Annulée</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label>Service</Label>
                    <Select value={filters.service} onValueChange={(value) => setFilters({ ...filters, service: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Tous" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">Tous</SelectItem>
                        <SelectItem value="automobile">Automobile</SelectItem>
                        <SelectItem value="terrasse">Terrasse</SelectItem>
                        <SelectItem value="tapis">Tapis</SelectItem>
                        <SelectItem value="balcon">Balcon</SelectItem>
                        <SelectItem value="jardinage">Jardinage</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label>Du</Label>
                    <Input
                      type="date"
                      value={filters.dateFrom}
                      onChange={(e) => setFilters({ ...filters, dateFrom: e.target.value })}
                    />
                  </div>

                  <div>
                    <Label>Au</Label>
                    <Input
                      type="date"
                      value={filters.dateTo}
                      onChange={(e) => setFilters({ ...filters, dateTo: e.target.value })}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Réservations ({bookingsData?.total || 0})</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-2 px-2">Client</th>
                        <th className="text-left py-2 px-2">Service</th>
                        <th className="text-left py-2 px-2">Date/Heure</th>
                        <th className="text-left py-2 px-2">Statut</th>
                        <th className="text-left py-2 px-2">Prix</th>
                        <th className="text-left py-2 px-2">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {bookingsData?.bookings.map((booking) => (
                        <tr key={booking.id} className="border-b hover:bg-gray-50">
                          <td className="py-2 px-2">
                            <div>
                              <div className="font-medium">{booking.name}</div>
                              <div className="text-xs text-gray-500">{booking.email}</div>
                            </div>
                          </td>
                          <td className="py-2 px-2 capitalize">{booking.service}</td>
                          <td className="py-2 px-2">
                            <div className="text-sm">
                              {format(new Date(booking.date), "dd MMM yyyy", { locale: fr })}
                            </div>
                            <div className="text-xs text-gray-500">{booking.time}</div>
                          </td>
                          <td className="py-2 px-2">
                            <Badge className={STATUS_COLORS[booking.status] || "bg-gray-100"}>
                              {booking.status}
                            </Badge>
                          </td>
                          <td className="py-2 px-2">{booking.totalPrice?.toFixed(2)}€</td>
                          <td className="py-2 px-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => setSelectedBookingId(booking.id)}
                            >
                              Détails
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Pagination */}
                <div className="flex justify-between items-center mt-4">
                  <Button
                    variant="outline"
                    disabled={bookingPage === 0}
                    onClick={() => setBookingPage(bookingPage - 1)}
                  >
                    Précédent
                  </Button>
                  <span className="text-sm text-gray-600">
                    Page {bookingPage + 1} sur {Math.ceil((bookingsData?.total || 0) / 20)}
                  </span>
                  <Button
                    variant="outline"
                    disabled={(bookingPage + 1) * 20 >= (bookingsData?.total || 0)}
                    onClick={() => setBookingPage(bookingPage + 1)}
                  >
                    Suivant
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Détails de la réservation */}
            {selectedBookingId && bookingDetail && (
              <Card>
                <CardHeader>
                  <CardTitle>Détails de la Réservation #{selectedBookingId}</CardTitle>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => setSelectedBookingId(null)}
                    className="absolute top-4 right-4"
                  >
                    ✕
                  </Button>
                </CardHeader>
                <CardContent className="space-y-4">
                  {bookingDetail.booking && (
                    <div>
                      <h3 className="font-semibold mb-2">Informations</h3>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div>
                          <span className="text-gray-600">Nom:</span> {bookingDetail.booking.name}
                        </div>
                        <div>
                          <span className="text-gray-600">Email:</span> {bookingDetail.booking.email}
                        </div>
                        <div>
                          <span className="text-gray-600">Téléphone:</span> {bookingDetail.booking.phone}
                        </div>
                        <div>
                          <span className="text-gray-600">Service:</span> {bookingDetail.booking.service}
                        </div>
                        <div>
                          <span className="text-gray-600">Date:</span>{" "}
                          {format(new Date(bookingDetail.booking.date), "dd MMM yyyy", { locale: fr })}
                        </div>
                        <div>
                          <span className="text-gray-600">Heure:</span> {bookingDetail.booking.time}
                        </div>
                      </div>
                    </div>
                  )}

                  {bookingDetail.logs && bookingDetail.logs.length > 0 && (
                    <div>
                      <h3 className="font-semibold mb-2">Logs d'Intégration</h3>
                      <div className="space-y-2">
                        {bookingDetail.logs.map((log) => (
                          <div key={log.id} className="border rounded p-2 text-sm">
                            <div className="flex items-center justify-between">
                              <div>
                                <span className="font-medium">{log.service}</span>
                                <Badge className={`${INTEGRATION_STATUS_COLORS[log.status] || "bg-gray-100"} ml-2`}>
                                  {log.status}
                                </Badge>
                              </div>
                              <span className="text-xs text-gray-500">
                                {format(new Date(log.createdAt), "dd MMM HH:mm", { locale: fr })}
                              </span>
                            </div>
                            {log.message && <p className="text-gray-600 mt-1">{log.message}</p>}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Onglet Logs */}
          <TabsContent value="logs" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Logs des Intégrations ({logsData?.total || 0})</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-2 px-2">Service</th>
                        <th className="text-left py-2 px-2">Statut</th>
                        <th className="text-left py-2 px-2">Message</th>
                        <th className="text-left py-2 px-2">Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {logsData?.logs.map((log) => (
                        <tr key={log.id} className="border-b hover:bg-gray-50">
                          <td className="py-2 px-2 font-medium">{log.service}</td>
                          <td className="py-2 px-2">
                            <Badge className={INTEGRATION_STATUS_COLORS[log.status] || "bg-gray-100"}>
                              {log.status}
                            </Badge>
                          </td>
                          <td className="py-2 px-2 text-xs text-gray-600">{log.message}</td>
                          <td className="py-2 px-2 text-xs text-gray-500">
                            {format(new Date(log.createdAt), "dd MMM HH:mm", { locale: fr })}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Pagination */}
                <div className="flex justify-between items-center mt-4">
                  <Button
                    variant="outline"
                    disabled={logsPage === 0}
                    onClick={() => setLogsPage(logsPage - 1)}
                  >
                    Précédent
                  </Button>
                  <span className="text-sm text-gray-600">
                    Page {logsPage + 1} sur {Math.ceil((logsData?.total || 0) / 50)}
                  </span>
                  <Button
                    variant="outline"
                    disabled={(logsPage + 1) * 50 >= (logsData?.total || 0)}
                    onClick={() => setLogsPage(logsPage + 1)}
                  >
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
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="w-5 h-5" />
                    Statistiques Réservations
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Total</span>
                    <span className="font-bold">{stats.bookingStats.total}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 flex items-center gap-2">
                      <Clock className="w-4 h-4 text-yellow-600" />
                      En attente
                    </span>
                    <span className="font-bold">{stats.bookingStats.pending}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-600" />
                      Complétées
                    </span>
                    <span className="font-bold">{stats.bookingStats.completed}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 flex items-center gap-2">
                      <XCircle className="w-4 h-4 text-red-600" />
                      Annulées
                    </span>
                    <span className="font-bold">{stats.bookingStats.cancelled}</span>
                  </div>
                  <div className="flex justify-between items-center pt-2 border-t">
                    <span className="text-gray-600 flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-green-600" />
                      Revenu Total
                    </span>
                    <span className="font-bold text-green-600">{stats.bookingStats.totalRevenue.toFixed(2)}€</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertCircle className="w-5 h-5" />
                    Statistiques Intégrations
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Total</span>
                    <span className="font-bold">{stats.integrationStats.total}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-600" />
                      Succès
                    </span>
                    <span className="font-bold text-green-600">{stats.integrationStats.success}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 flex items-center gap-2">
                      <XCircle className="w-4 h-4 text-red-600" />
                      Erreurs
                    </span>
                    <span className="font-bold text-red-600">{stats.integrationStats.error}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 flex items-center gap-2">
                      <Clock className="w-4 h-4 text-yellow-600" />
                      En attente
                    </span>
                    <span className="font-bold">{stats.integrationStats.pending}</span>
                  </div>
                  <div className="flex justify-between items-center pt-2 border-t">
                    <span className="text-gray-600">Taux de succès</span>
                    <span className="font-bold text-green-600">
                      {stats.integrationStats.total > 0
                        ? ((stats.integrationStats.success / stats.integrationStats.total) * 100).toFixed(1)
                        : 0}
                      %
                    </span>
                  </div>
                </CardContent>
              </Card>
            </div>

            {Object.keys(stats.integrationStats.byService).length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Logs par Service</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {Object.entries(stats.integrationStats.byService).map(([service, count]) => (
                      <div key={service} className="flex justify-between items-center">
                        <span className="text-gray-600 capitalize">{service}</span>
                        <span className="font-bold">{count}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
