import { APP_TITLE } from "@/const";
import { Mail, MapPin, Phone } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-muted/50 border-t">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* À propos */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{APP_TITLE}</h3>
            <p className="text-sm text-muted-foreground">
              Votre partenaire de confiance pour tous vos besoins de nettoyage professionnel.
              Service de qualité, équipe expérimentée et satisfaction garantie.
            </p>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-sm">
                <Phone className="h-4 w-4 text-primary" />
                <span>+33 1 23 45 67 89</span>
              </div>
              <div className="flex items-center space-x-3 text-sm">
                <Mail className="h-4 w-4 text-primary" />
                <span>contact@nettoyage-multiservice.fr</span>
              </div>
              <div className="flex items-center space-x-3 text-sm">
                <MapPin className="h-4 w-4 text-primary" />
                <span>Paris et Île-de-France</span>
              </div>
            </div>
          </div>

          {/* Horaires */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Horaires</h3>
            <div className="space-y-2 text-sm">
              <p>Lundi - Vendredi: 8h - 19h</p>
              <p>Samedi: 9h - 17h</p>
              <p>Dimanche: Sur rendez-vous</p>
              <p className="text-secondary font-medium mt-4">Intervention 7j/7 disponible</p>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} {APP_TITLE}. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
}
