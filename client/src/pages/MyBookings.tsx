import { useState } from "react";
import { useAuth } from "@/_core/hooks/useAuth";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { AlertCircle, Calendar, Clock, MapPin, Trash2, Edit2, CheckCircle2, XCircle, ArrowLeft } from "lucide-react";
import { Link } from "wouter";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { toast } from "sonner";

export default function MyBookings() {
  const { user, loading } = useAuth();
  const [email, setEmail] = useState("");
  const [showEmailForm, setShowEmailForm] = useState(!user);

  // Récupérer les réservations
  const { data: bookings = [], isLoading, refetch } = trpc.bookings.getMyBookings.useQuery(
    { email: showEmailForm ? email : undefined },
    { enabled: !loading && (!!user || showEmailForm) }
  );

  const updateMutation = trpc.bookings.updateBooking.useMutation({
    onSuccess: () => {
      toast.success("Réservation modifiée avec succès");
      refetch();
    },
    onError: (error) => {
      toast.error(error.message || "Erreur lors de la modification");
    },
  });

  const cancelMutation = trpc.bookings.cancelBooking.useMutation({
    onSuccess: () => {
      toast.success("Réservation annulée");
      refetch();
    },
    onError: (error) => {
      toast.error(error.message || "Erreur lors de l'annulation");
    },
  });

  const handleCancelBooking = (bookingId: number) => {
    if (confirm("Êtes-vous sûr de vouloir annuler cette réservation ?")) {
      cancelMutation.mutate({ bookingId });
    }
  };

  const getStatusBadge = (status: string) => {
    const statusConfig: Record<string, { color: string; icon: any; label: string }> = {
      pending: { color: "bg-yellow-100 text-yellow-800", icon: Clock, label: "En attente" },
      confirmed: { color: "bg-blue-100 text-blue-800", icon: CheckCircle2, label: "Confirmée" },
      completed: { color: "bg-green-100 text-green-800", icon: CheckCircle2, label: "Complétée" },
      cancelled: { color: "bg-red-100 text-red-800", icon: XCircle, label: "Annulée" },
    };

    const config = statusConfig[status] || statusConfig.pending;
    const Icon = config.icon;

    return (
      <div className={`flex items-center gap-2 px-3 py-1 rounded-full ${config.color} w-fit`}>
        <Icon className="w-4 h-4" />
        <span className="text-sm font-medium">{config.label}</span>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (showEmailForm && !user) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4">
        <div className="max-w-md mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>Mes Réservations</CardTitle>
              <CardDescription>Entrez votre email pour voir vos réservations</CardDescription>
            </CardHeader>
            <CardContent>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (email) setShowEmailForm(false);
                }}
                className="space-y-4"
              >
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="votre@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <Button type="submit" className="w-full">
                  Voir mes réservations
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <Link href="/" className="flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-6 transition-colors">
          <ArrowLeft size={20} />
          <span>Retour à l'accueil</span>
        </Link>
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Mes Réservations</h1>
          <p className="text-gray-600 mt-2">Gérez et suivez vos réservations ProClean Empire</p>
        </div>

        {isLoading ? (
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : bookings.length === 0 ? (
          <Card>
            <CardContent className="pt-6">
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>Vous n'avez pas encore de réservations.</AlertDescription>
              </Alert>
              <Button className="mt-4" asChild>
                <a href="/">Faire une réservation</a>
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {bookings.map((booking: any) => (
              <Card key={booking.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">{booking.service}</CardTitle>
                      <CardDescription>{booking.name}</CardDescription>
                    </div>
                    {getStatusBadge(booking.status)}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div className="flex items-center gap-2 text-gray-700">
                      <Calendar className="w-4 h-4 text-blue-600" />
                      <span>{booking.date}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-700">
                      <Clock className="w-4 h-4 text-blue-600" />
                      <span>{booking.time}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-700 md:col-span-2">
                      <MapPin className="w-4 h-4 text-blue-600" />
                      <span>{booking.address}</span>
                    </div>
                  </div>

                  {booking.message && (
                    <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                      <p className="text-sm font-medium text-gray-700">Notes:</p>
                      <p className="text-sm text-gray-600">{booking.message}</p>
                    </div>
                  )}

                  <div className="flex items-center justify-between pt-4 border-t">
                    <div>
                      <p className="text-sm text-gray-600">Prix estimé</p>
                      <p className="text-lg font-bold text-blue-600">€ {(booking.totalPrice / 100).toFixed(2)}</p>
                    </div>

                    <div className="flex gap-2">
                      {booking.status !== "cancelled" && booking.status !== "completed" && (
                        <>
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="outline" size="sm">
                                <Edit2 className="w-4 h-4 mr-2" />
                                Modifier
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>Modifier la réservation</DialogTitle>
                                <DialogDescription>
                                  Modifiez les détails de votre réservation
                                </DialogDescription>
                              </DialogHeader>
                              <EditBookingForm
                                booking={booking}
                                onSuccess={() => refetch()}
                              />
                            </DialogContent>
                          </Dialog>

                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => handleCancelBooking(booking.id)}
                            disabled={cancelMutation.isPending}
                          >
                            <Trash2 className="w-4 h-4 mr-2" />
                            Annuler
                          </Button>
                        </>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function EditBookingForm({ booking, onSuccess }: { booking: any; onSuccess: () => void }) {
  const [formData, setFormData] = useState({
    date: booking.date,
    time: booking.time,
    address: booking.address,
    message: booking.message || "",
  });

  const mutation = trpc.bookings.updateBooking.useMutation({
    onSuccess: () => {
      toast.success("Réservation modifiée");
      onSuccess();
    },
    onError: (error) => {
      toast.error(error.message || "Erreur");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate({
      bookingId: booking.id,
      ...formData,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="date">Date</Label>
        <Input
          id="date"
          type="date"
          value={formData.date}
          onChange={(e) => setFormData({ ...formData, date: e.target.value })}
        />
      </div>
      <div>
        <Label htmlFor="time">Heure</Label>
        <Input
          id="time"
          type="time"
          value={formData.time}
          onChange={(e) => setFormData({ ...formData, time: e.target.value })}
        />
      </div>
      <div>
        <Label htmlFor="address">Adresse</Label>
        <Input
          id="address"
          value={formData.address}
          onChange={(e) => setFormData({ ...formData, address: e.target.value })}
        />
      </div>
      <div>
        <Label htmlFor="message">Notes</Label>
        <Textarea
          id="message"
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          placeholder="Informations supplémentaires..."
        />
      </div>
      <Button type="submit" disabled={mutation.isPending} className="w-full">
        {mutation.isPending ? "Modification..." : "Modifier la réservation"}
      </Button>
    </form>
  );
}
