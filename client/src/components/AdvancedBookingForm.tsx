import { useState, useEffect, useMemo } from "react";
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
import { useAuth } from "@/_core/hooks/useAuth";

interface AdvancedBookingFormProps {
  onSuccess?: () => void;
  prefilledService?: string;
  prefilledOption?: string;
  prefilledName?: string;
  prefilledEmail?: string;
  prefilledPhone?: string;
}

export default function AdvancedBookingForm({ 
  onSuccess,
  prefilledService,
  prefilledOption,
  prefilledName,
  prefilledEmail,
  prefilledPhone
}: AdvancedBookingFormProps) {
  const { user } = useAuth();
  
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
    name: prefilledName || user?.name || "",
    email: prefilledEmail || user?.email || "",
    phone: prefilledPhone || "",
    service: prefilledService || "",
    serviceOption: prefilledOption || "",
    date: "",
    time: "",
    address: "",
    message: "",
  });

  // Mettre a jour les donnees pre-remplies quand elles changent
  useEffect(() => {
    if (prefilledService) {
      setBookingData(prev => ({
        ...prev,
        service: prefilledService,
        serviceOption: prefilledOption || ""
      }));
    }
  }, [prefilledService, prefilledOption]);

  const sendBookingMutation = trpc.contact.sendBooking.useMutation({
    onSuccess: () => {
      toast.success("Votre réservation a été envoyée ! Nous vous confirmerons rapidement.");
      setBookingData({
        name: user?.name || "",
        email: user?.email || "",
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
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Réserver Votre Service</CardTitle>
        <CardDescription>Sélectionnez votre service pour un devis précis</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleBooking} className="space-y-6">
          {/* Vos Informations */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Vos Informations</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="booking-name">Nom Complet *</Label>
                <Input
                  id="booking-name"
                  placeholder="Jean Dupont"
                  value={bookingData.name}
                  onChange={(e) => setBookingData({ ...bookingData, name: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="booking-email">Email *</Label>
                <Input
                  id="booking-email"
                  type="email"
                  placeholder="jean.dupont@email.com"
                  value={bookingData.email}
                  onChange={(e) => setBookingData({ ...bookingData, email: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="booking-phone">Téléphone *</Label>
                <Input
                  id="booking-phone"
                  type="tel"
                  placeholder="06 12 34 56 78"
                  value={bookingData.phone}
                  onChange={(e) => setBookingData({ ...bookingData, phone: e.target.value })}
                  required
                />
              </div>
            </div>
          </div>

          {/* Votre Service */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Votre Service</h3>
            <div className="space-y-4">
              <div>
                <Label htmlFor="service">Service souhaité *</Label>
                <Select value={bookingData.service} onValueChange={(value) => {
                  setBookingData({ ...bookingData, service: value, serviceOption: "" });
                }}>
                  <SelectTrigger id="service">
                    <SelectValue placeholder="Choisir un service" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(SERVICES).map(([key, service]) => (
                      <SelectItem key={key} value={key}>
                        {service.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {selectedService && (
                <div>
                  <Label htmlFor="option">Option *</Label>
                  <Select value={bookingData.serviceOption} onValueChange={(value) => {
                    setBookingData({ ...bookingData, serviceOption: value });
                  }}>
                    <SelectTrigger id="option">
                      <SelectValue placeholder="Choisir une option" />
                    </SelectTrigger>
                    <SelectContent>
                      {selectedService.options.map((option) => (
                        <SelectItem key={option.id} value={option.id}>
                          {option.name} {option.price !== "Demande de Devis" && `- ${formatPrice(option.price)}`}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}

              {totalPrice > 0 && (
                <div className="bg-blue-50 p-4 rounded-lg flex items-center justify-between">
                  <span className="font-semibold text-gray-700">Prix estimé:</span>
                  <div className="flex items-center gap-2">
                    <Euro size={20} className="text-blue-600" />
                    <span className="text-2xl font-bold text-blue-600">{formatPrice(totalPrice)}</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Date et Heure */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Date et Heure</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="booking-date">Date souhaitée *</Label>
                <DateTimePicker
                  value={bookingData.date}
                  onChange={(date) => setBookingData({ ...bookingData, date })}
                />
              </div>
              <div>
                <Label htmlFor="booking-time">Créneau horaire *</Label>
                <Select value={bookingData.time} onValueChange={(value: any) => {
                  setBookingData({ ...bookingData, time: value });
                }}>
                  <SelectTrigger id="booking-time">
                    <SelectValue placeholder="Choisir un créneau" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="matin">Matin (8h-12h)</SelectItem>
                    <SelectItem value="apres-midi">Après-midi (12h-17h)</SelectItem>
                    <SelectItem value="soir">Soir (17h-20h)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Lieu d'Intervention */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Lieu d'Intervention</h3>
            <div>
              <Label htmlFor="booking-address">Adresse *</Label>
              <FrenchAddressAutocomplete
                value={bookingData.address}
                onChange={(address) => setBookingData({ ...bookingData, address })}
              />
            </div>
          </div>

          {/* Informations complémentaires */}
          <div>
            <Label htmlFor="booking-message">Informations complémentaires</Label>
            <Textarea
              id="booking-message"
              placeholder="Précisions sur votre demande..."
              value={bookingData.message}
              onChange={(e) => setBookingData({ ...bookingData, message: e.target.value })}
              rows={4}
            />
          </div>

          {/* Bouton de soumission */}
          <div className="flex gap-4">
            <Button 
              type="submit" 
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
              disabled={sendBookingMutation.isPending}
            >
              {totalPrice > 0 ? "Réserver" : "Demander un Devis"}
            </Button>
          </div>


        </form>
      </CardContent>
    </Card>
  );
}
