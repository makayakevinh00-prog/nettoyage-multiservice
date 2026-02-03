import { Mail, Phone, MapPin, Clock } from "lucide-react";
import AdvancedContactForm from "@/components/AdvancedContactForm";
import { useEffect } from "react";

export default function Contact() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-50">
      {/* Header */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Nous Contacter</h1>
          <p className="text-xl text-blue-100">
            Envoyez-nous votre demande et recevez un devis gratuit sous 30 minutes
          </p>
        </div>
      </section>

      {/* Contact Info */}
      <section className="py-12 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            {/* Téléphone */}
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <div className="bg-orange-100 p-4 rounded-full">
                  <Phone className="w-8 h-8 text-orange-600" />
                </div>
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Téléphone</h3>
              <a href="tel:0617212230" className="text-orange-600 hover:text-orange-700 font-semibold">
                06 17 21 22 30
              </a>
              <p className="text-sm text-gray-600 mt-2">Lun-Dim 8h-20h</p>
            </div>

            {/* Email */}
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <div className="bg-blue-100 p-4 rounded-full">
                  <Mail className="w-8 h-8 text-blue-600" />
                </div>
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Email</h3>
              <a href="mailto:serviceclient@procleanempire.com" className="text-blue-600 hover:text-blue-700 font-semibold break-all">
                serviceclient@procleanempire.com
              </a>
              <p className="text-sm text-gray-600 mt-2">Réponse en 30 min</p>
            </div>

            {/* Localisation */}
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <div className="bg-green-100 p-4 rounded-full">
                  <MapPin className="w-8 h-8 text-green-600" />
                </div>
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Zone d'Intervention</h3>
              <p className="text-green-600 font-semibold">Toute l'Île-de-France</p>
              <p className="text-sm text-gray-600 mt-2">75 à 95</p>
            </div>

            {/* Horaires */}
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <div className="bg-purple-100 p-4 rounded-full">
                  <Clock className="w-8 h-8 text-purple-600" />
                </div>
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Horaires</h3>
              <p className="text-purple-600 font-semibold">7j/7</p>
              <p className="text-sm text-gray-600 mt-2">8h - 20h</p>
            </div>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-20 px-4">
        <div className="max-w-3xl mx-auto">
          <AdvancedContactForm />
        </div>
      </section>

      {/* WhatsApp CTA */}
      <section className="bg-green-50 py-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Préférez WhatsApp ?</h2>
          <p className="text-gray-600 mb-6">
            Envoyez-nous une photo de votre problème directement via WhatsApp pour une réponse encore plus rapide
          </p>
          <a
            href="https://wa.me/33617212230?text=Bonjour%20ProClean%20Empire%2C%20j%27aimerais%20un%20devis%20pour..."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-8 py-4 bg-green-500 hover:bg-green-600 text-white font-bold rounded-lg transition-colors"
          >
            💬 Nous contacter sur WhatsApp
          </a>
        </div>
      </section>
    </div>
  );
}
