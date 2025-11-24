import { MessageCircle } from "lucide-react";
import { useState } from "react";

export default function WhatsAppButton() {
  const [isHovered, setIsHovered] = useState(false);
  
  // Numéro WhatsApp au format international (sans espaces ni caractères spéciaux)
  const whatsappNumber = "33617212230"; // 06 17 21 22 30 → +33 6 17 21 22 30
  const message = encodeURIComponent("Bonjour, je souhaite obtenir un devis pour vos services de nettoyage.");
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${message}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-[#25D366] hover:bg-[#20BA5A] text-white rounded-full shadow-2xl transition-all duration-300 ease-in-out group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      aria-label="Contactez-nous sur WhatsApp"
    >
      {/* Icône WhatsApp */}
      <div className="flex items-center justify-center w-14 h-14 rounded-full">
        <MessageCircle className="w-7 h-7" />
      </div>
      
      {/* Texte qui apparaît au survol */}
      <div
        className={`overflow-hidden transition-all duration-300 ${
          isHovered ? "max-w-xs pr-5" : "max-w-0"
        }`}
      >
        <span className="whitespace-nowrap font-medium">
          Contactez-nous sur WhatsApp
        </span>
      </div>
      
      {/* Animation de pulsation */}
      <div className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-20"></div>
    </a>
  );
}
