import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { toast } from "sonner";
import { useLocation } from "wouter";
import InteractiveCalendar from "@/components/InteractiveCalendar";

export default function Reservation() {
  const [, navigate] = useLocation();
  const [formData, setFormData] = useState({
    service: "automobile",
    prestation: "",
    date: "",
    time: "",
    name: "",
    email: "",
    phone: "",
    address: "",
    message: "",
  });

  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [showCalendar, setShowCalendar] = useState(false);

  // Services avec prestations et options
  const services = {
    automobile: {
      name: "🚗 Nettoyage Automobile",
      prestations: [
        { id: "int-seul", name: "Intérieur seul", price: 70 },
        { id: "int-shampoing", name: "Intérieur + Shampoing Sièges", price: 90 },
        { id: "int-ext", name: "Intérieur + Extérieur", price: 90 },
        { id: "berline", name: "Complet Berline (Int. + Ext.)", price: 110 },
        { id: "suv", name: "Complet SUV (Int. + Ext.)", price: 150 },
      ],
      options: [
        { id: "shampoing", name: "Shampoing Sièges", price: 40 },
        { id: "detailing", name: "Detailing Tableau de bord", price: 30 },
        { id: "poils", name: "Poils d'animaux", price: 20 },
        { id: "odeurs", name: "Anti-odeurs Pro", price: 15 },
        { id: "jantes", name: "Nettoyage Jantes", price: 15 },
        { id: "cire", name: "Cire Brillance", price: 20 },
        { id: "pluie", name: "Anti-pluie Pare-brise", price: 10 },
      ],
    },
    canapes: {
      name: "🛋️ Nettoyage Canapés",
      prestations: [
        { id: "petit", name: "Petit (1 place)", price: 40 },
        { id: "moyen", name: "Moyen (2-3 places)", price: 80 },
        { id: "grand", name: "Grand (Angle / 4+ places)", price: 130 },
      ],
      options: [
        { id: "desinfection", name: "Désinfection", price: 15 },
        { id: "protection", name: "Protection Textile", price: 25 },
      ],
    },
    tapis: {
      name: "🧶 Nettoyage Tapis",
      prestations: [
        { id: "petit", name: "Petit (< 3 m²)", price: 35 },
        { id: "moyen", name: "Moyen (3 à 6 m²)", price: 60 },
        { id: "grand", name: "Grand (> 6 m²)", price: 90 },
      ],
      options: [
        { id: "desinfection", name: "Désinfection", price: 15 },
        { id: "protection", name: "Protection Textile", price: 25 },
      ],
    },
    terrasse: {
      name: "☀️ Nettoyage Terrasse",
      prestations: [
        { id: "20", name: "Jusqu'à 20 m²", price: 90 },
        { id: "40", name: "De 20 à 40 m²", price: 160 },
        { id: "60", name: "De 40 à 60 m²", price: 240 },
      ],
      options: [
        { id: "mousse", name: "Anti-mousse", price: 30 },
        { id: "hydrofuge", name: "Hydrofuge", price: 50 },
      ],
    },
  };

  const currentService = services[formData.service as keyof typeof services];
  const currentPrestation = currentService.prestations.find(
    (p) => p.id === formData.prestation
  );

  // Calculer le prix total
  const calculatePrice = () => {
    let price = currentPrestation?.price || 0;
    selectedOptions.forEach((optionId) => {
      const option = currentService.options.find((o) => o.id === optionId);
      if (option) price += option.price;
    });
    setTotalPrice(price);
  };

  const handleServiceChange = (service: string) => {
    setFormData({ ...formData, service, prestation: "" });
    setSelectedOptions([]);
    setTotalPrice(0);
  };

  const handlePrestationChange = (prestation: string) => {
    setFormData({ ...formData, prestation });
    calculatePrice();
  };

  const handleOptionToggle = (optionId: string) => {
    const newOptions = selectedOptions.includes(optionId)
      ? selectedOptions.filter((o) => o !== optionId)
      : [...selectedOptions, optionId];
    setSelectedOptions(newOptions);

    // Recalculate price
    let price = currentPrestation?.price || 0;
    newOptions.forEach((id) => {
      const option = currentService.options.find((o) => o.id === id);
      if (option) price += option.price;
    });
    setTotalPrice(price);
  };

  const handleDateTimeSelect = (date: string, time: string) => {
    setFormData({ ...formData, date, time });
    setShowCalendar(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.prestation) {
      toast.error("Veuillez sélectionner une prestation");
      return;
    }

    if (!formData.date || !formData.time) {
      toast.error("Veuillez sélectionner une date et une heure");
      return;
    }

    if (!formData.name || !formData.email || !formData.phone) {
      toast.error("Veuillez remplir vos coordonnées");
      return;
    }

    // Préparer les données de réservation
    const reservationData = {
      service: currentService.name,
      prestation: currentPrestation?.name || "",
      prestationPrice: currentPrestation?.price || 0,
      options: selectedOptions.map((optionId) => {
        const option = currentService.options.find((o) => o.id === optionId);
        return {
          name: option?.name || "",
          price: option?.price || 0,
        };
      }),
      totalPrice,
      date: formData.date,
      time: formData.time,
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      address: formData.address,
      message: formData.message,
    };

    // Sauvegarder dans localStorage
    localStorage.setItem("reservationData", JSON.stringify(reservationData));

    toast.success("Réservation confirmée ! Redirection vers le paiement...");

    // Rediriger vers la page de paiement après 1 seconde
    setTimeout(() => {
      navigate("/payment");
    }, 1000);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      <main className="flex-1 py-20">
        <div className="container max-w-4xl">
          <div className="mb-12">
            <h1 className="text-4xl font-bold text-slate-900 mb-4">Réserver une Prestation</h1>
            <p className="text-gray-600">Remplissez le formulaire ci-dessous pour réserver votre nettoyage</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Formulaire */}
            <div className="md:col-span-2">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Service Selection */}
                <div>
                  <Label className="text-base font-semibold mb-3 block">Service</Label>
                  <Select value={formData.service} onValueChange={handleServiceChange}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(services).map(([key, service]) => (
                        <SelectItem key={key} value={key}>
                          {service.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Prestation Selection */}
                <div>
                  <Label className="text-base font-semibold mb-3 block">Prestation</Label>
                  <Select value={formData.prestation} onValueChange={handlePrestationChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Choisir une prestation" />
                    </SelectTrigger>
                    <SelectContent>
                      {currentService.prestations.map((prestation) => (
                        <SelectItem key={prestation.id} value={prestation.id}>
                          {prestation.name} - {prestation.price}€
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Options */}
                {currentService.options.length > 0 && (
                  <div>
                    <Label className="text-base font-semibold mb-3 block">Options (optionnel)</Label>
                    <div className="space-y-2">
                      {currentService.options.map((option) => (
                        <div key={option.id} className="flex items-center gap-3">
                          <input
                            type="checkbox"
                            id={option.id}
                            checked={selectedOptions.includes(option.id)}
                            onChange={() => handleOptionToggle(option.id)}
                            className="w-4 h-4 rounded border-gray-300 text-blue-600"
                          />
                          <label htmlFor={option.id} className="flex-1 cursor-pointer">
                            <span className="text-gray-700">{option.name}</span>
                            <span className="text-blue-600 font-semibold ml-2">+{option.price}€</span>
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Date & Time with Interactive Calendar */}
                <div>
                  <Label className="text-base font-semibold mb-3 block">Date et heure</Label>
                  <button
                    type="button"
                    onClick={() => setShowCalendar(!showCalendar)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-left bg-white hover:bg-gray-50 font-medium"
                  >
                    {formData.date && formData.time
                      ? `${formData.date} à ${formData.time}`
                      : "Cliquez pour sélectionner une date et heure"}
                  </button>
                </div>

                {showCalendar && (
                  <div>
                    <InteractiveCalendar
                      onDateTimeSelect={handleDateTimeSelect}
                      minDate={new Date()}
                      maxDate={new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)}
                    />
                  </div>
                )}

                {/* Contact Info */}
                <div>
                  <Label htmlFor="name" className="text-base font-semibold mb-2 block">
                    Nom complet
                  </Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="email" className="text-base font-semibold mb-2 block">
                      Email
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone" className="text-base font-semibold mb-2 block">
                      Téléphone
                    </Label>
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="address" className="text-base font-semibold mb-2 block">
                    Adresse
                  </Label>
                  <Input
                    id="address"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  />
                </div>

                <div>
                  <Label htmlFor="message" className="text-base font-semibold mb-2 block">
                    Message (optionnel)
                  </Label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Détails supplémentaires..."
                  />
                </div>

                <Button type="submit" size="lg" className="w-full bg-blue-600 hover:bg-blue-700 text-white text-lg py-6">
                  Procéder au Paiement
                </Button>
              </form>
            </div>

            {/* Résumé */}
            <div>
              <Card className="sticky top-20">
                <CardHeader>
                  <CardTitle>Résumé</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {currentPrestation && (
                    <>
                      <div>
                        <p className="text-sm text-gray-600">Service</p>
                        <p className="font-semibold text-gray-900">{currentService.name}</p>
                      </div>

                      <div>
                        <p className="text-sm text-gray-600">Prestation</p>
                        <p className="font-semibold text-gray-900">{currentPrestation.name}</p>
                        <p className="text-lg font-bold text-blue-600">{currentPrestation.price}€</p>
                      </div>

                      {selectedOptions.length > 0 && (
                        <div>
                          <p className="text-sm text-gray-600 mb-2">Options</p>
                          <div className="space-y-1">
                            {selectedOptions.map((optionId) => {
                              const option = currentService.options.find((o) => o.id === optionId);
                              return (
                                <div key={optionId} className="flex justify-between text-sm">
                                  <span>{option?.name}</span>
                                  <span className="text-blue-600">+{option?.price}€</span>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      )}

                      <div className="border-t pt-4">
                        <div className="flex justify-between items-center">
                          <span className="text-lg font-bold">Total</span>
                          <span className="text-2xl font-bold text-blue-600">{totalPrice}€</span>
                        </div>
                      </div>

                      {formData.date && formData.time && (
                        <div className="bg-blue-50 p-3 rounded">
                          <p className="text-sm text-gray-600">Date & Heure</p>
                          <p className="font-semibold text-gray-900">
                            {new Date(formData.date).toLocaleDateString("fr-FR")} à {formData.time}
                          </p>
                        </div>
                      )}
                    </>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
