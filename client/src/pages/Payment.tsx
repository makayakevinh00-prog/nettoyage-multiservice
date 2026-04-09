import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useLocation } from "wouter";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";
import { Loader2, ShieldCheck, ArrowLeft } from "lucide-react";

// Fonctions pour masquer partiellement les informations personnelles
function maskName(name: string): string {
  if (!name) return "";
  const parts = name.trim().split(" ");
  return parts.map(part => {
    if (part.length <= 1) return part;
    return part[0] + "*".repeat(part.length - 1);
  }).join(" ");
}

function maskEmail(email: string): string {
  if (!email) return "";
  const [local, domain] = email.split("@");
  if (!local || !domain) return email;
  const maskedLocal = local.length <= 2 
    ? local[0] + "***" 
    : local[0] + "***" + local[local.length - 1];
  return maskedLocal + "@" + domain;
}

function maskPhone(phone: string): string {
  if (!phone) return "";
  const digits = phone.replace(/\s/g, "");
  if (digits.length <= 4) return phone;
  return digits.slice(0, 2) + " ** ** ** " + digits.slice(-2);
}

function maskAddress(address: string): string {
  if (!address) return "";
  const words = address.split(" ");
  if (words.length <= 2) return address[0] + "***";
  return words[0] + " *** " + words[words.length - 1];
}

export default function Payment() {
  const [, navigate] = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const [reservationData, setReservationData] = useState<any>(null);
  const [contactInfo, setContactInfo] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });
  const [needsContactInfo, setNeedsContactInfo] = useState(false);

  // Récupérer les données de réservation du localStorage
  useEffect(() => {
    const data = localStorage.getItem("reservationData");
    if (data) {
      const parsed = JSON.parse(data);
      setReservationData(parsed);
      
      // Vérifier si les informations de contact sont manquantes
      if (!parsed.name || !parsed.email || !parsed.phone) {
        setNeedsContactInfo(true);
      } else {
        setContactInfo({
          name: parsed.name,
          email: parsed.email,
          phone: parsed.phone,
          address: parsed.address || "",
        });
      }
    } else {
      toast.error("Aucune réservation trouvée");
      navigate("/");
    }
  }, [navigate]);

  const createCheckout = trpc.payment.createReservationCheckout.useMutation({
    onSuccess: (data) => {
      if (data.url) {
        window.open(data.url, "_blank");
        toast.success("Redirection vers le paiement Qonto...");
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

    // Vérifier les informations de contact
    const name = needsContactInfo ? contactInfo.name : reservationData.name;
    const email = needsContactInfo ? contactInfo.email : reservationData.email;
    const phone = needsContactInfo ? contactInfo.phone : reservationData.phone;
    const address = needsContactInfo ? contactInfo.address : reservationData.address;

    if (!name || !email || !phone) {
      toast.error("Veuillez remplir vos coordonnées");
      return;
    }

    // Validation email basique
    if (!email.includes("@")) {
      toast.error("Veuillez entrer un email valide");
      return;
    }

    setIsLoading(true);

    try {
      createCheckout.mutate({
        service: reservationData.service || "Nettoyage Automobile",
        prestation: reservationData.prestation || "",
        prestationPrice: reservationData.prestationPrice || 0,
        options: reservationData.options || [],
        totalPrice: reservationData.totalPrice || 0,
        date: reservationData.date || new Date().toISOString(),
        time: reservationData.time || "À convenir",
        name,
        email,
        phone,
        address: address || "",
        message: reservationData.message || "",
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

  const isSubscription = reservationData.type === "subscription";

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      <main className="flex-1 py-20">
        <div className="container max-w-3xl">
          {/* Back button */}
          <button
            onClick={() => window.history.back()}
            className="flex items-center gap-2 text-gray-600 hover:text-blue-600 mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Retour
          </button>

          <div className="mb-12">
            <h1 className="text-4xl font-bold text-slate-900 mb-4">Paiement Sécurisé</h1>
            <p className="text-gray-600">Finalisez votre {isSubscription ? "abonnement" : "réservation"} en toute sécurité</p>
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

                {reservationData.date && reservationData.time && reservationData.time !== "À convenir" && reservationData.time !== "Mensuel" && (
                  <div className="border-b pb-4">
                    <p className="text-sm text-gray-600">Date & Heure</p>
                    <p className="font-semibold text-gray-900">
                      {new Date(reservationData.date).toLocaleDateString("fr-FR")} à {reservationData.time}
                    </p>
                  </div>
                )}

                {isSubscription && reservationData.monthlyPrice && (
                  <div className="border-b pb-4">
                    <p className="text-sm text-gray-600">Prélèvement mensuel</p>
                    <p className="font-semibold text-gray-900">{reservationData.monthlyPrice}€/mois</p>
                    <p className="text-xs text-gray-500">À partir du mois suivant</p>
                  </div>
                )}

                <div className="bg-blue-50 p-4 rounded">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold">
                      {isSubscription ? "1er Paiement" : "Total"}
                    </span>
                    <span className="text-3xl font-bold text-blue-600">{reservationData.totalPrice}€</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Informations de contact */}
            <Card>
              <CardHeader>
                <CardTitle>
                  {needsContactInfo ? "Vos Coordonnées" : "Informations de Contact"}
                </CardTitle>
                {!needsContactInfo && (
                  <p className="text-xs text-gray-500">Informations masquées pour votre sécurité</p>
                )}
              </CardHeader>
              <CardContent className="space-y-4">
                {needsContactInfo ? (
                  /* Formulaire de contact pour les nouvelles pages */
                  <>
                    <div>
                      <Label htmlFor="name">Nom complet *</Label>
                      <Input
                        id="name"
                        value={contactInfo.name}
                        onChange={(e) => setContactInfo({ ...contactInfo, name: e.target.value })}
                        placeholder="Votre nom"
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={contactInfo.email}
                        onChange={(e) => setContactInfo({ ...contactInfo, email: e.target.value })}
                        placeholder="votre@email.com"
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="phone">Téléphone *</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={contactInfo.phone}
                        onChange={(e) => setContactInfo({ ...contactInfo, phone: e.target.value })}
                        placeholder="06 12 34 56 78"
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="address">Adresse d'intervention</Label>
                      <Input
                        id="address"
                        value={contactInfo.address}
                        onChange={(e) => setContactInfo({ ...contactInfo, address: e.target.value })}
                        placeholder="Votre adresse"
                      />
                    </div>
                  </>
                ) : (
                  /* Affichage masqué pour les réservations classiques */
                  <>
                    {reservationData.name && (
                      <div>
                        <p className="text-sm text-gray-600">Nom</p>
                        <p className="font-semibold text-gray-900">{maskName(reservationData.name)}</p>
                      </div>
                    )}

                    {reservationData.email && (
                      <div>
                        <p className="text-sm text-gray-600">Email</p>
                        <p className="font-semibold text-gray-900">{maskEmail(reservationData.email)}</p>
                      </div>
                    )}

                    {reservationData.phone && (
                      <div>
                        <p className="text-sm text-gray-600">Téléphone</p>
                        <p className="font-semibold text-gray-900">{maskPhone(reservationData.phone)}</p>
                      </div>
                    )}

                    {reservationData.address && (
                      <div>
                        <p className="text-sm text-gray-600">Adresse</p>
                        <p className="font-semibold text-gray-900">{maskAddress(reservationData.address)}</p>
                      </div>
                    )}
                  </>
                )}

                <div className="bg-green-50 p-4 rounded mt-6 flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-green-600" />
                  <p className="text-sm text-green-700">
                    Paiement sécurisé par Qonto
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
                      Redirection vers Qonto...
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
