import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useLocation } from "wouter";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

export default function Payment() {
  const [, navigate] = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const [reservationData, setReservationData] = useState<any>(null);

  // Récupérer les données de réservation du localStorage
  useEffect(() => {
    const data = localStorage.getItem("reservationData");
    if (data) {
      setReservationData(JSON.parse(data));
    } else {
      toast.error("Aucune réservation trouvée");
      navigate("/reservation");
    }
  }, [navigate]);

  const createCheckout = trpc.payment.createReservationCheckout.useMutation({
    onSuccess: (data) => {
      if (data.url) {
        // Rediriger vers Stripe
        window.open(data.url, "_blank");
      }
    },
    onError: (error) => {
      toast.error("Erreur lors de la création du paiement");
      console.error(error);
      setIsLoading(false);
    },
  });

  const handlePayment = async () => {
    if (!reservationData) return;

    setIsLoading(true);

    try {
      createCheckout.mutate({
        service: reservationData.service,
        prestation: reservationData.prestation,
        prestationPrice: reservationData.prestationPrice,
        options: reservationData.options || [],
        totalPrice: reservationData.totalPrice,
        date: reservationData.date,
        time: reservationData.time,
        name: reservationData.name,
        email: reservationData.email,
        phone: reservationData.phone,
        address: reservationData.address,
        message: reservationData.message,
      });
    } catch (error) {
      console.error(error);
      toast.error("Erreur lors du paiement");
      setIsLoading(false);
    }
  };

  if (!reservationData) {
    return (
      <div className="min-h-screen flex flex-col bg-white">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      <main className="flex-1 py-20">
        <div className="container max-w-2xl">
          <div className="mb-12">
            <h1 className="text-4xl font-bold text-slate-900 mb-4">Paiement Sécurisé</h1>
            <p className="text-gray-600">Finalisez votre réservation en toute sécurité</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Résumé de la commande */}
            <Card>
              <CardHeader>
                <CardTitle>Résumé de la Commande</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="border-b pb-4">
                  <p className="text-sm text-gray-600">Service</p>
                  <p className="font-semibold text-gray-900">{reservationData.service}</p>
                </div>

                <div className="border-b pb-4">
                  <p className="text-sm text-gray-600">Prestation</p>
                  <p className="font-semibold text-gray-900">{reservationData.prestation}</p>
                  <p className="text-lg font-bold text-blue-600">{reservationData.prestationPrice}€</p>
                </div>

                {reservationData.options && reservationData.options.length > 0 && (
                  <div className="border-b pb-4">
                    <p className="text-sm text-gray-600 mb-2">Options</p>
                    <div className="space-y-1">
                      {reservationData.options.map((option: any, i: number) => (
                        <div key={i} className="flex justify-between text-sm">
                          <span>{option.name}</span>
                          <span className="text-blue-600">+{option.price}€</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="border-b pb-4">
                  <p className="text-sm text-gray-600">Date & Heure</p>
                  <p className="font-semibold text-gray-900">
                    {new Date(reservationData.date).toLocaleDateString("fr-FR")} à {reservationData.time}
                  </p>
                </div>

                <div className="bg-blue-50 p-4 rounded">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold">Total</span>
                    <span className="text-3xl font-bold text-blue-600">{reservationData.totalPrice}€</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Informations de contact */}
            <Card>
              <CardHeader>
                <CardTitle>Informations de Contact</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-gray-600">Nom</p>
                  <p className="font-semibold text-gray-900">{reservationData.name}</p>
                </div>

                <div>
                  <p className="text-sm text-gray-600">Email</p>
                  <p className="font-semibold text-gray-900">{reservationData.email}</p>
                </div>

                <div>
                  <p className="text-sm text-gray-600">Téléphone</p>
                  <p className="font-semibold text-gray-900">{reservationData.phone}</p>
                </div>

                {reservationData.address && (
                  <div>
                    <p className="text-sm text-gray-600">Adresse</p>
                    <p className="font-semibold text-gray-900">{reservationData.address}</p>
                  </div>
                )}

                {reservationData.message && (
                  <div>
                    <p className="text-sm text-gray-600">Message</p>
                    <p className="font-semibold text-gray-900">{reservationData.message}</p>
                  </div>
                )}

                <div className="bg-green-50 p-4 rounded mt-6">
                  <p className="text-sm text-green-700">
                    ✅ Paiement sécurisé par Stripe
                  </p>
                </div>

                <Button
                  onClick={handlePayment}
                  disabled={isLoading || createCheckout.isPending}
                  size="lg"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white text-lg py-6 mt-6"
                >
                  {isLoading || createCheckout.isPending ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Redirection vers Stripe...
                    </>
                  ) : (
                    <>
                      💳 Payer {reservationData.totalPrice}€
                    </>
                  )}
                </Button>

                <p className="text-xs text-gray-500 text-center mt-4">
                  Vous serez redirigé vers Stripe pour finaliser votre paiement de manière sécurisée.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
