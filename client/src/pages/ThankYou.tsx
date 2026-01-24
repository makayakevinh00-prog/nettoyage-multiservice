import { CheckCircle, Clock, Phone, Mail, MapPin } from "lucide-react";
import { useLocation } from "wouter";
import { useEffect } from "react";

export default function ThankYou() {
  const [, navigate] = useLocation();

  useEffect(() => {
    // Rediriger vers l'accueil après 10 secondes
    const timer = setTimeout(() => {
      navigate("/");
    }, 10000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center px-4 py-12">
      <div className="max-w-2xl w-full bg-white rounded-lg shadow-2xl p-8 md:p-12">
        {/* Success Icon */}
        <div className="text-center mb-8">
          <div className="inline-block">
            <CheckCircle size={80} className="text-green-500 animate-bounce" />
          </div>
        </div>

        {/* Title */}
        <h1 className="text-4xl font-bold text-gray-900 text-center mb-4">
          Merci pour votre réservation ! 🎉
        </h1>

        {/* Subtitle */}
        <p className="text-xl text-gray-600 text-center mb-8">
          Votre demande a été reçue avec succès. Nous vous contacterons très bientôt.
        </p>

        {/* Info Boxes */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Confirmation */}
          <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
            <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
              <Mail size={20} className="text-blue-600" />
              Email de confirmation
            </h3>
            <p className="text-gray-700 text-sm">
              Un email de confirmation a été envoyé à votre adresse. Vérifiez votre boîte de réception et vos spams.
            </p>
          </div>

          {/* Contact */}
          <div className="bg-orange-50 p-6 rounded-lg border border-orange-200">
            <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
              <Clock size={20} className="text-orange-600" />
              Délai de réponse
            </h3>
            <p className="text-gray-700 text-sm">
              Notre équipe vous contactera dans les <strong>30 minutes</strong> pour confirmer votre rendez-vous.
            </p>
          </div>
        </div>

        {/* Contact Info */}
        <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 mb-8">
          <h3 className="font-bold text-gray-900 mb-4">Besoin d'aide ?</h3>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <Phone size={20} className="text-blue-600" />
              <div>
                <p className="text-sm text-gray-600">Téléphone</p>
                <a href="tel:0617212230" className="font-bold text-gray-900 hover:text-blue-600">
                  06 17 21 22 30
                </a>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Mail size={20} className="text-blue-600" />
              <div>
                <p className="text-sm text-gray-600">Email</p>
                <a href="mailto:contact@procleanempire.fr" className="font-bold text-gray-900 hover:text-blue-600">
                  contact@procleanempire.fr
                </a>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <MapPin size={20} className="text-blue-600" />
              <div>
                <p className="text-sm text-gray-600">WhatsApp</p>
                <a href="https://wa.me/33617212230" target="_blank" rel="noopener noreferrer" className="font-bold text-gray-900 hover:text-blue-600">
                  💬 Envoyer un message
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* What Happens Next */}
        <div className="bg-blue-50 p-6 rounded-lg border border-blue-200 mb-8">
          <h3 className="font-bold text-gray-900 mb-4">Prochaines étapes</h3>
          <ol className="space-y-3 text-gray-700">
            <li className="flex gap-3">
              <span className="font-bold text-blue-600 min-w-6">1.</span>
              <span>Nous recevons votre demande et la validons</span>
            </li>
            <li className="flex gap-3">
              <span className="font-bold text-blue-600 min-w-6">2.</span>
              <span>Notre équipe vous appelle pour confirmer les détails</span>
            </li>
            <li className="flex gap-3">
              <span className="font-bold text-blue-600 min-w-6">3.</span>
              <span>Nous vous envoyons un SMS de rappel 24h avant</span>
            </li>
            <li className="flex gap-3">
              <span className="font-bold text-blue-600 min-w-6">4.</span>
              <span>Intervention à la date et heure convenues</span>
            </li>
            <li className="flex gap-3">
              <span className="font-bold text-blue-600 min-w-6">5.</span>
              <span>Vous recevez une facture et pouvez nous noter</span>
            </li>
          </ol>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={() => navigate("/")}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-all"
          >
            Retour à l'accueil
          </button>
          <a
            href="https://wa.me/33617212230"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg transition-all text-center"
          >
            💬 Contacter sur WhatsApp
          </a>
        </div>

        {/* Redirect Message */}
        <p className="text-center text-sm text-gray-600 mt-6">
          Vous serez redirigé vers l'accueil dans 10 secondes...
        </p>
      </div>
    </div>
  );
}
