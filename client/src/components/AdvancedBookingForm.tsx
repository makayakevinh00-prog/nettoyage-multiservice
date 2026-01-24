import { useState, useMemo } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import DateTimePicker from "@/components/DateTimePicker";
import FrenchAddressAutocomplete from "@/components/FrenchAddressAutocomplete";
import { toast } from "sonner";
import { trpc } from "@/lib/trpc";
import { SERVICES, getOptionPrice, formatPrice } from "@shared/pricing";
import { Euro } from "lucide-react";

interface AdvancedBookingFormProps {
  onSuccess?: () => void;
}

export default function AdvancedBookingForm({ onSuccess }: AdvancedBookingFormProps) {
  const [bookingData, setBookingData] = useState<{
    name: string;
    email: string;
    phone: string;
    service: string;
    serviceOption: string;
    date: string;
    time: "matin" | "apres-midi" | "soir" | "";
    address: string;
    message: string;
  }>({
    name: "",
    email: "",
    phone: "",
    service: "",
    serviceOption: "",
    date: "",
    time: "",
    address: "",
    message: "",
  });

  const sendBookingMutation = trpc.contact.sendBooking.useMutation({
    onSuccess: () => {
      toast.success("Votre réservation a été envoyée ! Nous vous confirmerons rapidement.");
      setBookingData({
        name: "",
        email: "",
        phone: "",
        service: "",
        serviceOption: "",
        date: "",
        time: "",
        address: "",
        message: "",
      });
      onSuccess?.();
    },
    onError: (error) => {
      toast.error("Une erreur est survenue. Veuillez réessayer.");
      console.error(error);
    },
  });

  // Obtenir le service sélectionné
  const selectedService = useMemo(() => {
    return bookingData.service ? SERVICES[bookingData.service] : null;
  }, [bookingData.service]);

  // Calculer le prix total
  const totalPrice = useMemo(() => {
    if (!bookingData.serviceOption) return 0;
    return getOptionPrice(bookingData.service, bookingData.serviceOption);
  }, [bookingData.service, bookingData.serviceOption]);

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!bookingData.service || !bookingData.serviceOption || !bookingData.time) {
      toast.error("Veuillez remplir tous les champs obligatoires");
      return;
    }

    if (totalPrice === 0 && bookingData.serviceOption !== "jardinage-custom") {
      toast.error("Veuillez sélectionner une option valide");
      return;
    }

    // Envoyer la réservation
    sendBookingMutation.mutate({
      name: bookingData.name,
      email: bookingData.email,
      phone: bookingData.phone,
      service: bookingData.service as any,
      date: bookingData.date,
      time: bookingData.time,
      address: bookingData.address,
      message: bookingData.message
    });
  };

  return (
    <Card className="border-2 border-blue-200 shadow-lg bg-white">
      <CardHeader className="bg-gradient-to-r from-blue-50 to-blue-100 border-b-2 border-blue-200 p-4 md:p-6">
        <CardTitle className="text-xl md:text-2xl text-blue-900">Réserver Votre Service</CardTitle>
        <CardDescription className="text-sm md:text-base text-blue-700">
          Sélectionnez votre service pour un devis précis
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-4 md:pt-8 px-4 md:px-6">
        <form onSubmit={handleBooking} className="space-y-6">
          {/* Informations personnelles */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Vos Informations</h3>
            <div className="grid md:grid-cols-2 gap-4 md:gap-6">
              <div className="space-y-2">
                <Label htmlFor="booking-name" className="text-gray-700 font-medium">
                  Nom Complet *
                </Label>
                <Input
                  id="booking-name"
                  type="text"
                  required
                  value={bookingData.name}
                  onChange={(e) => setBookingData({ ...bookingData, name: e.target.value })}
                  placeholder="Jean Dupont"
                  className="border-2 border-gray-200 focus:border-blue-500 h-12"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="booking-email" className="text-gray-700 font-medium">
                  Email *
                </Label>
                <Input
                  id="booking-email"
                  type="email"
                  required
                  value={bookingData.email}
                  onChange={(e) => setBookingData({ ...bookingData, email: e.target.value })}
                  placeholder="jean.dupont@email.com"
                  className="border-2 border-gray-200 focus:border-blue-500 h-12"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="booking-phone" className="text-gray-700 font-medium">
                Téléphone *
              </Label>
              <Input
                id="booking-phone"
                type="tel"
                required
                value={bookingData.phone}
                onChange={(e) => setBookingData({ ...bookingData, phone: e.target.value })}
                placeholder="06 12 34 56 78"
                className="border-2 border-gray-200 focus:border-blue-500 h-12"
              />
            </div>
          </div>

          {/* Service et Options */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Votre Service</h3>
            <div className="space-y-2">
              <Label htmlFor="booking-service" className="text-gray-700 font-medium">
                Service souhaité *
              </Label>
              <Select
                value={bookingData.service}
                onValueChange={(value) =>
                  setBookingData({
                    ...bookingData,
                    service: value,
                    serviceOption: "", // Réinitialiser l'option
                  })
                }
              >
                <SelectTrigger className="border-2 border-gray-200 focus:border-blue-500 h-12">
                  <SelectValue placeholder="Choisir un service" />
                </SelectTrigger>
                <SelectContent>
                  {Object.values(SERVICES).map((service) => (
                    <SelectItem key={service.id} value={service.id}>
                      {service.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Options détaillées */}
            {selectedService && selectedService.options.length > 0 && (
              <div className="space-y-2">
                <Label htmlFor="booking-option" className="text-gray-700 font-medium">
                  Options disponibles *
                </Label>
                <Select
                  value={bookingData.serviceOption}
                  onValueChange={(value) =>
                    setBookingData({ ...bookingData, serviceOption: value })
                  }
                >
                  <SelectTrigger className="border-2 border-gray-200 focus:border-blue-500 h-12">
                    <SelectValue placeholder="Sélectionner une option" />
                  </SelectTrigger>
                  <SelectContent>
                    {selectedService.options.map((option) => (
                      <SelectItem key={option.id} value={option.id}>
                        <div className="flex items-center gap-2">
                          <span>{option.label}</span>
                          {option.price > 0 && (
                            <span className="text-blue-600 font-semibold">
                              {formatPrice(option.price)}
                            </span>
                          )}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {/* Description de l'option */}
                {bookingData.serviceOption && (
                  <div className="p-3 bg-blue-50 border-l-4 border-blue-500 rounded">
                    <p className="text-sm text-gray-700">
                      {
                        selectedService.options.find((opt) => opt.id === bookingData.serviceOption)
                          ?.description
                      }
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Date et Heure */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Date et Heure</h3>
            <DateTimePicker
              selectedDate={bookingData.date}
              selectedTime={bookingData.time}
              onDateChange={(date) => setBookingData({ ...bookingData, date })}
              onTimeChange={(time) =>
                setBookingData({ ...bookingData, time: time as typeof bookingData.time })
              }
            />
          </div>

          {/* Adresse */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Lieu d'Intervention</h3>
            <div className="space-y-2">
              <Label htmlFor="booking-address" className="text-gray-700 font-medium">
                Adresse *
              </Label>
              <FrenchAddressAutocomplete
                id="booking-address"
                required
                value={bookingData.address}
                onChange={(value) => setBookingData({ ...bookingData, address: value })}
                placeholder="Commencez à taper votre adresse..."
                className="border-2 border-gray-200 focus:border-blue-500 h-12"
              />
            </div>
          </div>

          {/* Informations complémentaires */}
          <div className="space-y-2">
            <Label htmlFor="booking-message" className="text-gray-700 font-medium">
              Informations complémentaires
            </Label>
            <Textarea
              id="booking-message"
              value={bookingData.message}
              onChange={(e) => setBookingData({ ...bookingData, message: e.target.value })}
              placeholder="Précisions sur votre demande..."
              rows={4}
              className="border-2 border-gray-200 focus:border-blue-500"
            />
          </div>

          {/* Résumé du prix */}
          {totalPrice > 0 && (
            <div className="p-4 bg-gradient-to-r from-green-50 to-blue-50 border-2 border-green-200 rounded-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Euro className="h-6 w-6 text-green-600" />
                  <span className="text-gray-700 font-medium">Montant estimé :</span>
                </div>
                <span className="text-3xl font-bold text-green-600">{formatPrice(totalPrice)}</span>
              </div>
              <p className="text-sm text-gray-600 mt-2">
                Vous recevrez un devis détaillé par email après confirmation.
              </p>
            </div>
          )}

          {/* Bouton de soumission */}
          <Button
            type="submit"
            size="lg"
            className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white text-lg py-6 shadow-lg hover:shadow-xl transition-all duration-300"
            disabled={sendBookingMutation.isPending}
          >
            {sendBookingMutation.isPending ? "Envoi en cours..." : "Confirmer ma Réservation"}
          </Button>

          {/* Note importante */}
          <p className="text-xs text-gray-500 text-center">
            * Frais d'annulation : 25€ si annulation moins de 24h avant le rendez-vous
          </p>
        </form>
      </CardContent>
    </Card>
  );
}
