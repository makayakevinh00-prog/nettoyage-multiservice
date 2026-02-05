import { useAuth } from "@/_core/hooks/useAuth";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, CheckCircle2, Clock, XCircle, Edit2, Trash2 } from "lucide-react";
import { useState } from "react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { toast } from "sonner";

const STATUS_COLORS: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-800",
  confirmed: "bg-blue-100 text-blue-800",
  completed: "bg-green-100 text-green-800",
  cancelled: "bg-red-100 text-red-800",
};

export default function ClientDashboard() {
  const { user, loading } = useAuth();
  const [selectedBooking, setSelectedBooking] = useState<any>(null);
  const utils = trpc.useUtils();

  // Vérifier que l'utilisateur est connecté
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Chargement...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-red-600">Connexion Requise</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Veuillez vous connecter pour accéder à votre tableau de bord.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Récupérer les réservations du client
  const { data: bookings, isLoading: bookingsLoading } = trpc.bookings.getMyBookings.useQuery();

  // Mutation pour annuler une réservation
  const cancelBookingMutation = trpc.bookings.cancelBooking.useMutation({
    onSuccess: () => {
      toast.success("Réservation annulée");
      utils.bookings.getMyBookings.invalidate();
      setSelectedBooking(null);
    },
    onError: () => {
      toast.error("Erreur lors de l'annulation");
    },
  });

  const handleCancelBooking = (bookingId: number) => {
    if (confirm("Êtes-vous sûr de vouloir annuler cette réservation ?")) {
      cancelBookingMutation.mutate({ bookingId });
    }
  };

  const clientBookings = bookings || [];
  const upcomingBookings = clientBookings.filter((b: any) => b.status !== "cancelled" && b.status !== "completed");
  const pastBookings = clientBookings.filter((b: any) => b.status === "completed" || b.status === "cancelled");

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* En-tête */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Mon Tableau de Bord</h1>
          <p className="text-gray-600">Bienvenue, {user.name || user.email}</p>
        </div>

        {/* Réservations à venir */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Réservations à Venir</h2>
          {bookingsLoading ? (
            <p>Chargement...</p>
          ) : upcomingBookings.length === 0 ? (
            <Card>
              <CardContent className="pt-6">
                <p className="text-gray-500 text-center">Aucune réservation à venir</p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {upcomingBookings.map((booking: any) => (
                <Card key={booking.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg">{booking.service}</CardTitle>
                        <p className="text-sm text-gray-600 mt-1">
                          {format(new Date(booking.date), "EEEE d MMMM yyyy", { locale: fr })} à {booking.time}
                        </p>
                      </div>
                      <Badge className={STATUS_COLORS[booking.status] || "bg-gray-100"}>
                        {booking.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 mb-4">
                      <p className="text-sm"><span className="font-medium">Adresse:</span> {booking.address}</p>
                      <p className="text-sm"><span className="font-medium">Téléphone:</span> {booking.phone}</p>
                      <p className="text-sm"><span className="font-medium">Prix:</span> {(booking.totalPrice / 100).toFixed(2)}€</p>
                      {booking.message && (
                        <p className="text-sm"><span className="font-medium">Message:</span> {booking.message}</p>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setSelectedBooking(booking)}
                      >
                        <Edit2 className="w-4 h-4 mr-2" />
                        Modifier
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-red-600"
                        onClick={() => handleCancelBooking(booking.id)}
                        disabled={cancelBookingMutation.isPending}
                      >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Annuler
                      </Button>
                      {booking.totalPrice > 0 && booking.paymentStatus === "pending" && (
                        <Button
                          size="sm"
                          className="bg-blue-600 hover:bg-blue-700"
                        >
                          Payer Maintenant
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>

        {/* Historique des réservations */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Historique</h2>
          {pastBookings.length === 0 ? (
            <Card>
              <CardContent className="pt-6">
                <p className="text-gray-500 text-center">Aucun historique</p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-2">
              {pastBookings.map((booking: any) => (
                <Card key={booking.id} className="opacity-75">
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">{booking.service}</p>
                        <p className="text-sm text-gray-600">
                          {format(new Date(booking.date), "d MMMM yyyy", { locale: fr })}
                        </p>
                      </div>
                      <Badge className={STATUS_COLORS[booking.status] || "bg-gray-100"}>
                        {booking.status}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>

        {/* Modal de modification */}
        {selectedBooking && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <Card className="w-full max-w-md">
              <CardHeader>
                <CardTitle>Modifier la Réservation</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-4">
                  La modification des réservations n'est pas encore disponible. Veuillez contacter le support.
                </p>
                <Button
                  onClick={() => setSelectedBooking(null)}
                  className="w-full"
                >
                  Fermer
                </Button>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
