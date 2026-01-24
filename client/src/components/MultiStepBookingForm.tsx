import { useState } from "react";
import { ChevronRight, ChevronLeft, Calendar, Clock, User, Phone, Mail, MapPin, MessageSquare } from "lucide-react";
import { toast } from "sonner";
import { trpc } from "@/lib/trpc";

interface MultiStepBookingFormProps {
  serviceName?: string;
  optionName?: string;
  onSuccess?: () => void;
}

export default function MultiStepBookingForm({
  serviceName = "",
  optionName = "",
  onSuccess,
}: MultiStepBookingFormProps) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: serviceName,
    option: optionName,
    date: "",
    time: "",
    address: "",
    message: "",
  });

  const sendBooking = trpc.contact.sendBooking.useMutation();

  // Générer les créneaux horaires disponibles
  const timeSlots = [
    "08:00", "08:30", "09:00", "09:30", "10:00", "10:30",
    "11:00", "11:30", "14:00", "14:30", "15:00", "15:30",
    "16:00", "16:30", "17:00", "17:30", "18:00",
  ];

  // Générer les dates disponibles (7 jours à partir de demain)
  const getAvailableDates = () => {
    const dates = [];
    const today = new Date();
    for (let i = 1; i <= 14; i++) {
      const date = new Date(today);
      date.setDate(date.getDate() + i);
      dates.push(date);
    }
    return dates;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleNext = () => {
    if (step === 1) {
      if (!formData.service) {
        toast.error("Veuillez sélectionner un service");
        return;
      }
      setStep(2);
    } else if (step === 2) {
      if (!formData.name || !formData.email || !formData.phone) {
        toast.error("Veuillez remplir tous les champs");
        return;
      }
      setStep(3);
    } else if (step === 3) {
      if (!formData.date || !formData.time || !formData.address) {
        toast.error("Veuillez remplir tous les champs");
        return;
      }
      handleSubmit();
    }
  };

  const handlePrev = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = async () => {
    try {
      await sendBooking.mutateAsync({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        service: formData.service as any,
        date: formData.date,
        time: formData.time,
        address: formData.address,
        message: formData.message,
      });
      toast.success("Réservation envoyée avec succès ! 🎉");
      onSuccess?.();
    } catch (error) {
      toast.error("Erreur lors de l'envoi de la réservation");
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow-lg border border-gray-200">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Réservez votre service</h2>
            <p className="text-gray-600 mt-1">
              {step === 1 && "Étape 1 : Sélectionnez votre service"}
              {step === 2 && "Étape 2 : Vos coordonnées"}
              {step === 3 && "Étape 3 : Date et heure"}
            </p>
          </div>
          <div className="text-right">
            <span className="text-4xl font-bold text-orange-500">{step}</span>
            <span className="text-gray-600 ml-2">/3</span>
          </div>
        </div>
        <div className="w-full bg-gray-300 rounded-full h-3">
          <div
            className="bg-gradient-to-r from-orange-400 to-orange-600 h-3 rounded-full transition-all duration-300"
            style={{ width: `${(step / 3) * 100}%` }}
          />
        </div>
      </div>

      {/* Step 1: Service Selection */}
      {step === 1 && (
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-gray-900 mb-6">
            🧹 Quel service vous intéresse ?
          </h3>

          <div className="space-y-3">
            {["automobile", "terrasse", "tapis", "balcon", "jardinage"].map((service) => (
              <label
                key={service}
                className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all ${
                  formData.service === service
                    ? "border-blue-600 bg-blue-100"
                    : "border-gray-300 bg-white hover:border-blue-400"
                }`}
              >
                <input
                  type="radio"
                  name="service"
                  value={service}
                  checked={formData.service === service}
                  onChange={handleInputChange}
                  className="w-4 h-4"
                />
                <span className="ml-3 font-semibold text-gray-900 capitalize">
                  {service === "automobile" && "🚗 Nettoyage Automobile"}
                  {service === "terrasse" && "🏡 Nettoyage Terrasse"}
                  {service === "tapis" && "🛋️ Nettoyage Tapis & Canapé"}
                  {service === "balcon" && "🏢 Nettoyage Balcon"}
                  {service === "jardinage" && "🌿 Entretien Jardinage"}
                </span>
              </label>
            ))}
          </div>
        </div>
      )}

      {/* Step 2: Contact Information */}
      {step === 2 && (
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-gray-900 mb-6">
            👤 Vos coordonnées
          </h3>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              <User size={18} className="inline mr-2" />
              Nom complet
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Votre nom"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              <Mail size={18} className="inline mr-2" />
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="votre@email.com"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              <Phone size={18} className="inline mr-2" />
              Téléphone
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              placeholder="06 12 34 56 78"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      )}

      {/* Step 3: Date, Time & Address */}
      {step === 3 && (
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-gray-900 mb-6">
            📅 Quand et où ?
          </h3>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              <Calendar size={18} className="inline mr-2" />
              Date souhaitée
            </label>
            <select
              name="date"
              value={formData.date}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Sélectionner une date</option>
              {getAvailableDates().map((date) => (
                <option key={date.toISOString()} value={date.toISOString().split("T")[0]}>
                  {date.toLocaleDateString("fr-FR", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              <Clock size={18} className="inline mr-2" />
              Heure souhaitée
            </label>
            <select
              name="time"
              value={formData.time}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Sélectionner une heure</option>
              {timeSlots.map((slot) => (
                <option key={slot} value={slot}>
                  {slot}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              <MapPin size={18} className="inline mr-2" />
              Adresse d'intervention
            </label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              placeholder="123 Rue de la Paix, 75000 Paris"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              <MessageSquare size={18} className="inline mr-2" />
              Informations supplémentaires (optionnel)
            </label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              placeholder="Décrivez vos besoins spécifiques..."
              rows={3}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      )}

      {/* Navigation Buttons */}
      <div className="flex gap-4 mt-10 pt-6 border-t border-gray-200">
        <button
          onClick={handlePrev}
          disabled={step === 1}
          className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all ${
            step === 1
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-gray-500 hover:bg-gray-600 text-white"
          }`}
        >
          <ChevronLeft size={20} />
          Précédent
        </button>

        <button
          onClick={handleNext}
          disabled={sendBooking.isPending}
          className={`flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all ${
            sendBooking.isPending
              ? "bg-orange-400 text-white cursor-not-allowed"
              : "bg-orange-500 hover:bg-orange-600 text-white"
          }`}
        >
          {step === 3 ? (
            <>
              {sendBooking.isPending ? "Envoi en cours..." : "Confirmer la réservation"}
            </>
          ) : (
            <>
              Suivant
              <ChevronRight size={20} />
            </>
          )}
        </button>
      </div>

      {/* Info Message */}
      <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
        <p className="text-sm text-green-800 text-center font-semibold">
          ✓ Nous vous contacterons dans les 30 minutes pour confirmer votre réservation
        </p>
      </div>
    </div>
  );
}
