import { Mail, MapPin, Phone, Instagram, Linkedin } from "lucide-react";
import { FaTiktok } from "react-icons/fa";
import { APP_LOGO } from "@/const";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-white border-t border-slate-800">
      <div className="container py-12">
        <div className="flex justify-center mb-8">
          <a 
            href="/" 
            className="flex items-center space-x-2 hover:opacity-80 transition-opacity cursor-pointer"
            title="Retour à l'accueil"
          >
            <img src={APP_LOGO} alt="ProClean Empire" className="h-12 w-auto" />
            <span className="text-lg font-bold text-white hidden sm:inline">ProClean <span className="text-blue-400">Empire</span></span>
          </a>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* À propos */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-blue-400">ProClean Empire</h3>
            <p className="text-sm text-gray-300">
              Votre partenaire de confiance pour le nettoyage de terrasses, toits, façades, jardins, 
              véhicules et logements. Nous intervenons partout en Île-de-France avec des équipements 
              professionnels et un sens du détail qui fait la différence.
            </p>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-blue-400">Contact</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-sm">
                <Phone className="h-4 w-4 text-blue-400" />
                <a href="tel:0617212230" className="hover:text-blue-400 transition-colors">06 17 21 22 30</a>
              </div>
              <div className="flex items-center space-x-3 text-sm">
                <Mail className="h-4 w-4 text-blue-400" />
                <a href="mailto:serviceclient@procleanempire.com" className="hover:text-blue-400 transition-colors">serviceclient@procleanempire.com</a>
              </div>
              <div className="flex items-center space-x-3 text-sm">
                <MapPin className="h-4 w-4 text-blue-400" />
                <span>Île-de-France</span>
              </div>
            </div>
          </div>

          {/* Horaires & Réseaux sociaux */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-blue-400">Horaires</h3>
            <div className="space-y-2 text-sm mb-6">
              <p>Lundi - Vendredi: 8h - 19h</p>
              <p>Samedi: 9h - 17h</p>
              <p>Dimanche: Sur rendez-vous</p>
              <p className="text-blue-400 font-medium mt-4">Intervention 7j/7 disponible</p>
            </div>
            <h3 className="text-lg font-semibold mb-4 text-blue-400">Suivez-nous</h3>
            <div className="flex space-x-4">
              <a 
                href="https://www.instagram.com/proclean_empire/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-blue-400 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-6 w-6" />
              </a>
              <a 
                href="https://www.tiktok.com/@procleanempire" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-blue-400 transition-colors"
                aria-label="TikTok"
              >
                <FaTiktok className="h-6 w-6" />
              </a>
              <a 
                href="https://www.linkedin.com/company/proclean-empire/about/?viewAsMember=true" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-blue-400 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-slate-800 text-center text-sm text-gray-400">
          <p>&copy; {new Date().getFullYear()} ProClean Empire. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
}
