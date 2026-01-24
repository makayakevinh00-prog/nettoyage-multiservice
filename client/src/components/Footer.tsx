import { Mail, MapPin, Phone, Facebook, Instagram, Linkedin } from "lucide-react";
import { FaTiktok } from "react-icons/fa";
import { APP_LOGO } from "@/const";
import { Link } from "wouter";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-white">
      {/* Section avec Carte et Infos */}
      <div className="border-t border-slate-800">
        <div className="container py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Carte Google Maps */}
            <div className="rounded-lg overflow-hidden shadow-lg h-80">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2625.0558456419995!2d2.3522!3d48.8566!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e66e1f06e2b70f%3A0x40b82c3688c9460!2s%C3%8Ele-de-France!5e0!3m2!1sfr!2sfr!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            {/* Informations */}
            <div className="space-y-8">
              {/* Logo et Titre */}
              <div className="flex items-center space-x-3">
                <img src={APP_LOGO} alt="ProClean Empire" className="h-16 w-auto" />
                <div>
                  <h2 className="text-3xl font-bold">ProClean <span className="text-blue-400">Empire</span></h2>
                  <p className="text-gray-400 text-sm">Nettoyage Premium Multiservice</p>
                </div>
              </div>

              {/* Adresse */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-blue-400">Où nous trouver</h3>
                <div className="flex items-start space-x-3">
                  <MapPin className="h-5 w-5 text-blue-400 mt-1 flex-shrink-0" />
                  <div className="text-sm">
                    <p className="font-semibold">ProClean Empire SARL</p>
                    <p className="text-gray-300">Île-de-France (75-95)</p>
                    <p className="text-gray-400 text-xs mt-2">SIREN: 123 456 789</p>
                  </div>
                </div>
              </div>

              {/* Coordonnées */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-blue-400">Nous contacter</h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <Phone className="h-5 w-5 text-blue-400 flex-shrink-0" />
                    <a href="tel:0617212230" className="hover:text-blue-400 transition-colors text-sm">
                      06 17 21 22 30
                    </a>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Mail className="h-5 w-5 text-blue-400 flex-shrink-0" />
                    <a href="mailto:serviceclient@procleanempire.com" className="hover:text-blue-400 transition-colors text-sm">
                      serviceclient@procleanempire.com
                    </a>
                  </div>
                </div>
              </div>

              {/* Horaires */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-blue-400">Horaires</h3>
                <div className="text-sm space-y-1 text-gray-300">
                  <p><strong>Lun - Ven:</strong> 8h - 19h</p>
                  <p><strong>Samedi:</strong> 9h - 17h</p>
                  <p><strong>Dimanche:</strong> Sur rendez-vous</p>
                  <p className="text-blue-400 font-semibold mt-2">⭐ Intervention 7j/7 disponible</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Section Navigation et Réseaux */}
      <div className="bg-slate-950 border-t border-slate-800">
        <div className="container py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Navigation */}
            <div>
              <h3 className="text-lg font-semibold mb-4 text-blue-400">Navigation</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/" className="text-gray-300 hover:text-blue-400 transition-colors">
                    Accueil
                  </Link>
                </li>
                <li>
                  <Link href="/#services" className="text-gray-300 hover:text-blue-400 transition-colors">
                    Services
                  </Link>
                </li>
                <li>
                  <Link href="/professionnels" className="text-gray-300 hover:text-blue-400 transition-colors">
                    Professionnels
                  </Link>
                </li>
                <li>
                  <a href="mailto:serviceclient@procleanempire.com" className="text-gray-300 hover:text-blue-400 transition-colors">
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            {/* Réseaux Sociaux */}
            <div>
              <h3 className="text-lg font-semibold mb-4 text-blue-400">Suivez-nous</h3>
              <div className="flex space-x-4">
                <a 
                  href="https://www.facebook.com/procleanempire" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-slate-800 hover:bg-blue-600 transition-colors p-3 rounded-full"
                  aria-label="Facebook"
                >
                  <Facebook className="h-5 w-5" />
                </a>
                <a 
                  href="https://www.tiktok.com/@procleanempire" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-slate-800 hover:bg-black transition-colors p-3 rounded-full"
                  aria-label="TikTok"
                >
                  <FaTiktok className="h-5 w-5" />
                </a>
                <a 
                  href="https://www.instagram.com/proclean_empire/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-slate-800 hover:bg-pink-600 transition-colors p-3 rounded-full"
                  aria-label="Instagram"
                >
                  <Instagram className="h-5 w-5" />
                </a>
                <a 
                  href="https://www.linkedin.com/company/proclean-empire/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-slate-800 hover:bg-blue-700 transition-colors p-3 rounded-full"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="h-5 w-5" />
                </a>
              </div>
            </div>

            {/* Mentions Légales */}
            <div>
              <h3 className="text-lg font-semibold mb-4 text-blue-400">Légal</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#" className="text-gray-300 hover:text-blue-400 transition-colors">
                    Mentions légales
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-blue-400 transition-colors">
                    Politique de confidentialité
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-blue-400 transition-colors">
                    Conditions générales
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="bg-slate-950 border-t border-slate-800">
        <div className="container py-6 text-center text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} ProClean Empire. Tous droits réservés.</p>
          <p className="mt-2 text-xs">Nettoyage Premium Multiservice en Île-de-France</p>
        </div>
      </div>
    </footer>
  );
}
