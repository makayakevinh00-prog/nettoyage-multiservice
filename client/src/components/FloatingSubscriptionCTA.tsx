import { useState, useEffect } from "react";
import { Link } from "wouter";
import { X, Zap } from "lucide-react";

export default function FloatingSubscriptionCTA() {
  const [isVisible, setIsVisible] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    // Afficher le CTA après 3 secondes de chargement
    const timer = setTimeout(() => setIsVisible(true), 3000);

    // Masquer le CTA si l'utilisateur scroll vers le haut
    const handleScroll = () => {
      const scrolled = window.scrollY > 100;
      setIsScrolled(scrolled);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  if (!isVisible || !isScrolled) return null;

  return (
    <div className="fixed bottom-6 right-6 z-40 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <Link href="/abonnements-auto">
        <div className="relative group cursor-pointer">
          {/* Glow Effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-500 rounded-full blur-lg opacity-75 group-hover:opacity-100 transition-opacity" />

          {/* Button */}
          <div className="relative bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white px-6 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform group-hover:scale-110 flex items-center gap-2 font-semibold">
            <Zap size={20} className="animate-pulse" />
            <span>Découvrir nos abonnements</span>
          </div>
        </div>
      </Link>

      {/* Close Button */}
      <button
        onClick={() => setIsVisible(false)}
        className="absolute -top-2 -right-2 bg-gray-800 hover:bg-gray-900 text-white rounded-full p-1 transition-colors"
        aria-label="Fermer"
      >
        <X size={16} />
      </button>
    </div>
  );
}
