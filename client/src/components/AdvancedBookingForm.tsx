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
import AddressAutocomplete from "@/components/AddressAutocomplete";
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
    quantity: number;
    date: string;
    time: string;
    address: string;
    message: string;
    selectedAddons: string[]; // IDs des addons sélectionnés
  }>({
    name: prefilledName || user?.name || "",
    email: prefilledEmail || user?.email || "",
    phone: prefilledPhone || "",
    service: prefilledService || "",
    serviceOption: prefilledOption || "",
    quantity: 1,
    date: "",
    time: "",
    address: "",
    message: "",
    selectedAddons: [],
  });

  // Mettre a jour les donnees pre-remplies quand elles changent
  useEffect(() => {
    if (prefilledService && bookingData.service !== prefilledService) {
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
        quantity: 1,
        date: "",
        time: "",
        address: "",
        message: "",
        selectedAddons: [],
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

  // Calculer le prix total (en prenant en compte la quantité et les addons)
  const totalPrice = useMemo(() => {
    if (!bookingData.serviceOption) return 0;
    const basePrice = getOptionPrice(bookingData.service, bookingData.serviceOption);
    let total = basePrice * bookingData.quantity;
    
    // Ajouter le prix des addons sélectionnés
    if (selectedService?.addons && bookingData.selectedAddons.length > 0) {
      bookingData.selectedAddons.forEach(addonId => {
        const addon = selectedService.addons?.find(a => a.id === addonId);
        if (addon) {
          total += addon.price * bookingData.quantity; // Multiplier par la quantité aussi
        }
      });
    }
    
    return total;
  }, [bookingData.service, bookingData.serviceOption, bookingData.quantity, bookingData.selectedAddons, selectedService]);

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!bookingData.service || !bookingData.serviceOption || !bookingData.time) {
      toast.error("Veuillez remplir tous les champs obligatoires");
      return;
    }

    if (totalPrice === 0 && bookingData.serviceOption !== "jardinage-custom" && bookingData.serviceOption !== "autre-custom") {
      toast.error("Veuillez sélectionner une option valide");
      return;
    }

    // Envoyer la réservation
    const addonsLabel = bookingData.selectedAddons.length > 0 
      ? ` + ${bookingData.selectedAddons.map(id => {
          const addon = selectedService?.addons?.find(a => a.id === id);
          return addon?.label || '';
        }).join(', ')}`
      : '';
    
    sendBookingMutation.mutate({
      name: bookingData.name,
      email: bookingData.email,
      phone: bookingData.phone,
      service: bookingData.service as any,
      serviceOption: bookingData.serviceOption + addonsLabel,
      quantity: bookingData.quantity,
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
                <Select value={bookingData.service || ""} onValueChange={(value) => {
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
                <>
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
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="quantity">
                      {bookingData.service === "automobile" && "Nombre de vehicules *"}
                      {bookingData.service === "tapis" && "Nombre de tapis *"}
                      {bookingData.service === "terrasse" && "Nombre de terrasses *"}
                      {bookingData.service === "balcon" && "Nombre de balcons *"}
                      {bookingData.service === "facade" && "Nombre de facades *"}
                      {bookingData.service === "panneaux-solaires" && "Nombre de panneaux *"}
                    </Label>
                    <div className="flex items-center gap-4">
                      <button
                        type="button"
                        onClick={() => setBookingData({ ...bookingData, quantity: Math.max(1, bookingData.quantity - 1) })}
                        className="w-12 h-12 flex items-center justify-center border-2 border-gray-300 rounded-lg hover:bg-gray-100 font-bold text-xl"
                      >
                        −
                      </button>
                      <input
                        id="quantity"
                        type="number"
                        min="1"
                        value={bookingData.quantity}
                        onChange={(e) => setBookingData({ ...bookingData, quantity: Math.max(1, parseInt(e.target.value) || 1) })}
                        className="w-20 h-12 text-center border-2 border-gray-300 rounded-lg font-bold text-xl"
                        readOnly
                      />
                      <button
                        type="button"
                        onClick={() => setBookingData({ ...bookingData, quantity: bookingData.quantity + 1 })}
                        className="w-12 h-12 flex items-center justify-center border-2 border-gray-300 rounded-lg hover:bg-gray-100 font-bold text-xl"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Options supplémentaires */}
                  {selectedService.addons && selectedService.addons.length > 0 && (
                    <div className="border-t pt-4">
                      <Label className="text-base font-semibold mb-3 block">Options supplémentaires</Label>
                      <div className="space-y-3">
                        {selectedService.addons.map((addon) => (
                          <div key={addon.id} className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-gray-50">
                            <input
                              type="checkbox"
                              id={addon.id}
                              checked={bookingData.selectedAddons.includes(addon.id)}
                              onChange={(e) => {
                                if (e.target.checked) {
                                  setBookingData({
                                    ...bookingData,
                                    selectedAddons: [...bookingData.selectedAddons, addon.id]
                                  });
                                } else {
                                  setBookingData({
                                    ...bookingData,
                                    selectedAddons: bookingData.selectedAddons.filter(id => id !== addon.id)
                                  });
                                }
                              }}
                              className="w-4 h-4 cursor-pointer"
                            />
                            <label htmlFor={addon.id} className="flex-1 cursor-pointer">
                              <div className="font-medium text-gray-900">{addon.label}</div>
                              {addon.description && <div className="text-sm text-gray-600">{addon.description}</div>}
                            </label>
                            <span className="font-semibold text-blue-600">+{formatPrice(addon.price)}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </>
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

              {bookingData.date && bookingData.time && (
                <div className="bg-amber-50 p-3 rounded-lg border border-amber-200">
                  <p className="text-sm text-amber-800">
                    Limite: 3 reservations par jour. Si complet, nous vous proposerons une autre date.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Date et Heure */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Date et Heure</h3>
            <DateTimePicker
              selectedDate={bookingData.date}
              selectedTime={bookingData.time}
              onDateChange={(date) => setBookingData({ ...bookingData, date })}
              onTimeChange={(time) => setBookingData({ ...bookingData, time })}
            />
          </div>

          {/* Lieu d'Intervention */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Lieu d'Intervention</h3>
            <div>
              <Label htmlFor="booking-address">Adresse *</Label>
              <AddressAutocomplete
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
