import { Mail, MapPin, Phone } from "lucide-react";
import { APP_LOGO } from "@/const";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-white border-t border-slate-700">
      <div className="container py-16">
        <div className="flex justify-center">
          {/* Informations */}
          <div className="space-y-8 max-w-md">
            {/* Logo et Titre */}
            <div className="flex items-center space-x-3">
              <img src={APP_LOGO} alt="ProClean Empire" className="h-16 w-auto" />
              <div>
                <h2 className="text-3xl font-bold text-white">ProClean <span className="text-orange-500">Empire</span></h2>
                <p className="text-gray-300 text-sm">Nettoyage Premium Multiservice</p>
              </div>
            </div>

            {/* Adresse */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-orange-500">À propos</h3>
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-orange-500 mt-1 flex-shrink-0" />
                <div className="text-sm">
                  <p className="font-semibold text-white">ProClean Empire</p>
                  <p className="text-gray-300">Service de nettoyage professionnel</p>
                  <p className="text-gray-400 text-xs mt-2">Intervenant en Île-de-France</p>
                  <p className="text-gray-400 text-xs">Micro-entreprise certifiée</p>
                </div>
              </div>
            </div>

            {/* Coordonnées */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-orange-500">Nous contacter</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Phone className="h-5 w-5 text-orange-500 flex-shrink-0" />
                  <a href="tel:0617212230" className="hover:text-orange-400 transition-colors text-sm text-gray-300">
                    06 17 21 22 30
                  </a>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="h-5 w-5 text-orange-500 flex-shrink-0" />
                  <a href="mailto:contact@procleanempire.com" className="hover:text-orange-400 transition-colors text-sm text-gray-300">
                    contact@procleanempire.com
                  </a>
                </div>
              </div>
            </div>

            {/* Horaires */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-orange-500">Horaires</h3>
              <div className="text-sm space-y-1 text-gray-300">
                <p><strong className="text-white">Lun - Ven:</strong> 8h - 19h</p>
                <p><strong className="text-white">Samedi:</strong> 9h - 17h</p>
                <p><strong className="text-white">Dimanche:</strong> Sur rendez-vous</p>
                <p className="text-orange-400 font-semibold mt-2">⭐ Intervention 7j/7 disponible</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="bg-slate-950 border-t border-slate-700">
        <div className="container py-6 text-center text-sm text-gray-400">
          <p>&copy; {new Date().getFullYear()} ProClean Empire. Tous droits réservés.</p>
          <p className="mt-2 text-xs">Nettoyage Premium Multiservice en Île-de-France</p>
        </div>
      </div>
    </footer>
  );
}
