import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useLocation } from "wouter";
import { CheckCircle2, Download, Home } from "lucide-react";

export default function PaymentSuccess() {
  const [, navigate] = useLocation();
  const [paymentDetails, setPaymentDetails] = useState<any>(null);

  useEffect(() => {
    // Récupérer les données de réservation du localStorage
    const data = localStorage.getItem("reservationData");
    if (data) {
      setPaymentDetails(JSON.parse(data));
      // Nettoyer le localStorage après récupération
      localStorage.removeItem("reservationData");
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      <main className="flex-1 py-20">
        <div className="container max-w-2xl">
          {/* Success Message */}
          <div className="text-center mb-12">
            <div className="flex justify-center mb-6">
              <CheckCircle2 className="w-20 h-20 text-green-500" />
            </div>
            <h1 className="text-4xl font-bold text-slate-900 mb-4">Paiement Réussi !</h1>
            <p className="text-xl text-gray-600">
              Merci pour votre confiance. Votre réservation a été confirmée.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* Confirmation Details */}
            <Card>
              <CardHeader>
                <CardTitle>Détails de la Réservation</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {paymentDetails && (
                  <>
                    <div className="border-b pb-4">
                      <p className="text-sm text-gray-600">Service</p>
                      <p className="font-semibold text-gray-900">{paymentDetails.service}</p>
                    </div>

                    <div className="border-b pb-4">
                      <p className="text-sm text-gray-600">Prestation</p>
                      <p className="font-semibold text-gray-900">{paymentDetails.prestation}</p>
                    </div>

                    <div className="border-b pb-4">
                      <p className="text-sm text-gray-600">Date & Heure</p>
                      <p className="font-semibold text-gray-900">
                        {new Date(paymentDetails.date).toLocaleDateString("fr-FR")} à {paymentDetails.time}
                      </p>
                    </div>

                    <div className="bg-green-50 p-4 rounded">
                      <p className="text-sm text-gray-600">Montant Payé</p>
                      <p className="text-3xl font-bold text-green-600">{paymentDetails.totalPrice}€</p>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>

            {/* Next Steps */}
            <Card>
              <CardHeader>
                <CardTitle>Prochaines Étapes</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-8 w-8 rounded-full bg-blue-100">
                      <span className="text-blue-600 font-bold">1</span>
                    </div>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Confirmation par Email</p>
                    <p className="text-sm text-gray-600">
                      Un email de confirmation a été envoyé à {paymentDetails?.email}
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-8 w-8 rounded-full bg-blue-100">
                      <span className="text-blue-600 font-bold">2</span>
                    </div>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Confirmation de Rendez-vous</p>
                    <p className="text-sm text-gray-600">
                      Nous vous contacterons sous 24h pour confirmer votre rendez-vous
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-8 w-8 rounded-full bg-blue-100">
                      <span className="text-blue-600 font-bold">3</span>
                    </div>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Intervention</p>
                    <p className="text-sm text-gray-600">
                      Notre équipe interviendra à la date et heure prévues
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contact Info */}
          <Card className="mb-12">
            <CardHeader>
              <CardTitle>Besoin d'Aide ?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-600">
                Si vous avez des questions concernant votre réservation, n'hésitez pas à nous contacter :
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Téléphone</p>
                  <p className="font-semibold text-gray-900">+33 (0)1 XX XX XX XX</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Email</p>
                  <p className="font-semibold text-gray-900">contact@procleanempire.com</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={() => navigate("/")}
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              <Home className="w-5 h-5 mr-2" />
              Retour à l'Accueil
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-blue-600 text-blue-600 hover:bg-blue-50"
            >
              <Download className="w-5 h-5 mr-2" />
              Télécharger la Facture
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
