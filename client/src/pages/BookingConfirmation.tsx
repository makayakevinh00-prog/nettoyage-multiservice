import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { CheckCircle, Calendar, Clock, MapPin, Phone, Mail, Download } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function BookingConfirmation() {
  const [location] = useLocation();
  const [bookingData, setBookingData] = useState<any>(null);

  useEffect(() => {
    const data = localStorage.getItem("lastBooking");
    if (data) {
      setBookingData(JSON.parse(data));
    }
  }, []);

  const handleDownloadConfirmation = () => {
    if (!bookingData) return;
    
    const confirmationText = `
CONFIRMATION DE RÉSERVATION - ProClean Empire

Numéro de confirmation: ${bookingData.confirmationNumber || "N/A"}

CLIENT
------
Nom: ${bookingData.name}
Email: ${bookingData.email}
Téléphone: ${bookingData.phone}

SERVICE
-------
Type: ${bookingData.service}
Date: ${bookingData.date}
Heure: ${bookingData.time}
Adresse: ${bookingData.address}

MESSAGE
-------
${bookingData.message || "Aucun message"}

STATUT
------
✓ Réservation confirmée
✓ Email de confirmation envoyé
✓ Rendez-vous ajouté à votre calendrier

Merci d'avoir choisi ProClean Empire !
    `;

    const element = document.createElement("a");
    element.setAttribute("href", "data:text/plain;charset=utf-8," + encodeURIComponent(confirmationText));
    element.setAttribute("download", `confirmation-${bookingData.confirmationNumber}.txt`);
    element.style.display = "none";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  if (!bookingData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-gray-50">
        <div className="text-center">
          <p className="text-gray-600 mb-4">Aucune réservation trouvée</p>
          <a href="/" className="text-blue-600 hover:underline">
            Retour à l'accueil
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Success Header */}
        <div className="text-center mb-8 animate-slideUp">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Réservation Confirmée !
          </h1>
          <p className="text-xl text-gray-600">
            Votre demande a été enregistrée avec succès
          </p>
        </div>

        {/* Confirmation Card */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8 animate-slideUp stagger-1">
          <div className="mb-6 pb-6 border-b border-gray-200">
            <p className="text-sm text-gray-600">Numéro de confirmation</p>
            <p className="text-2xl font-bold text-blue-600">
              {bookingData.confirmationNumber || "PROCLEAN-" + Date.now()}
            </p>
          </div>

          {/* Booking Details */}
          <div className="space-y-6">
            {/* Service */}
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-10 w-10 rounded-md bg-blue-100">
                  <Calendar className="h-6 w-6 text-blue-600" />
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Service</p>
                <p className="text-lg font-semibold text-gray-900">
                  {bookingData.service}
                </p>
              </div>
            </div>

            {/* Date & Time */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-10 w-10 rounded-md bg-blue-100">
                    <Calendar className="h-6 w-6 text-blue-600" />
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Date</p>
                  <p className="text-lg font-semibold text-gray-900">
                    {bookingData.date}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-10 w-10 rounded-md bg-blue-100">
                    <Clock className="h-6 w-6 text-blue-600" />
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Heure</p>
                  <p className="text-lg font-semibold text-gray-900">
                    {bookingData.time}
                  </p>
                </div>
              </div>
            </div>

            {/* Address */}
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-10 w-10 rounded-md bg-blue-100">
                  <MapPin className="h-6 w-6 text-blue-600" />
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Adresse</p>
                <p className="text-lg font-semibold text-gray-900">
                  {bookingData.address}
                </p>
              </div>
            </div>

            {/* Contact Info */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-10 w-10 rounded-md bg-blue-100">
                    <Phone className="h-6 w-6 text-blue-600" />
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Téléphone</p>
                  <p className="text-lg font-semibold text-gray-900">
                    {bookingData.phone}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-10 w-10 rounded-md bg-blue-100">
                    <Mail className="h-6 w-6 text-blue-600" />
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Email</p>
                  <p className="text-lg font-semibold text-gray-900">
                    {bookingData.email}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Next Steps */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8 animate-slideUp stagger-2">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Prochaines étapes
          </h3>
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <span className="flex-shrink-0 h-6 w-6 flex items-center justify-center rounded-full bg-blue-600 text-white text-sm font-semibold">
                1
              </span>
              <p className="text-gray-700">
                Un email de confirmation a été envoyé à <strong>{bookingData.email}</strong>
              </p>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex-shrink-0 h-6 w-6 flex items-center justify-center rounded-full bg-blue-600 text-white text-sm font-semibold">
                2
              </span>
              <p className="text-gray-700">
                Le rendez-vous a été ajouté à votre calendrier
              </p>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex-shrink-0 h-6 w-6 flex items-center justify-center rounded-full bg-blue-600 text-white text-sm font-semibold">
                3
              </span>
              <p className="text-gray-700">
                Nous vous rappellerons 24h avant l'intervention
              </p>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex-shrink-0 h-6 w-6 flex items-center justify-center rounded-full bg-blue-600 text-white text-sm font-semibold">
                4
              </span>
              <p className="text-gray-700">
                L'équipe ProClean Empire arrivera à l'heure prévue
              </p>
            </li>
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slideUp stagger-3">
          <Button
            onClick={handleDownloadConfirmation}
            className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700"
          >
            <Download size={20} />
            Télécharger la confirmation
          </Button>
          <a href="/" className="flex items-center justify-center">
            <Button variant="outline">
              Retour à l'accueil
            </Button>
          </a>
        </div>

        {/* Contact Info */}
        <div className="text-center mt-12 text-gray-600">
          <p className="mb-2">Besoin d'aide ?</p>
          <p>
            Contactez-nous au{" "}
            <a href="tel:+33617212230" className="text-blue-600 hover:underline">
              06 17 21 22 30
            </a>
            {" "}ou{" "}
            <a href="mailto:serviceclient@procleanempire.com" className="text-blue-600 hover:underline">
              serviceclient@procleanempire.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
