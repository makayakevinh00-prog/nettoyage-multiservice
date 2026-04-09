import { useEffect } from "react";
import { useLocation } from "wouter";

/**
 * Composant qui scroll automatiquement en haut de la page
 * à chaque changement de route.
 */
export default function ScrollToTop() {
  const [location] = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [location]);

  return null;
}
