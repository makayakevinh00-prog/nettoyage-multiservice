import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import { Button } from "@/components/ui/button";

/**
 * DarkModeToggle Component
 * 
 * Bouton pour basculer entre mode clair et sombre
 * Utilise le contexte ThemeContext pour gérer l'état global
 */
export default function DarkModeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className="rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
      aria-label={`Basculer vers le mode ${theme === "light" ? "sombre" : "clair"}`}
    >
      {theme === "light" ? (
        <Moon size={20} className="text-gray-700" />
      ) : (
        <Sun size={20} className="text-yellow-400" />
      )}
    </Button>
  );
}
