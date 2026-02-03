import { useState, useEffect, useRef, useCallback } from "react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

interface AddressSuggestion {
  id: string;
  label: string;
  score: number;
}

interface AddressAutocompleteProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  id?: string;
  className?: string;
}

export default function AddressAutocomplete({
  value,
  onChange,
  placeholder = "Entrez votre adresse...",
  required,
  id,
  className
}: AddressAutocompleteProps) {
  const [suggestions, setSuggestions] = useState<AddressSuggestion[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const debounceTimer = useRef<NodeJS.Timeout | undefined>(undefined);

  // Fermer les suggestions quand on clique en dehors
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Fonction pour récupérer les suggestions
  const fetchSuggestions = useCallback(async (query: string) => {
    if (query.length < 3) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // Essayer d'abord avec le proxy serveur (plus fiable)
      const response = await fetch(`/api/address-search?q=${encodeURIComponent(query)}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      if (data.features && Array.isArray(data.features)) {
        const formattedSuggestions: AddressSuggestion[] = data.features
          .slice(0, 5)
          .map((feature: any) => ({
            id: feature.properties?.id || feature.id || Math.random().toString(),
            label: feature.properties?.label || feature.label || '',
            score: feature.properties?.score || feature.score || 0,
          }))
          .filter((s: AddressSuggestion) => s.label);

        setSuggestions(formattedSuggestions);
        setShowSuggestions(true);
      } else {
        setSuggestions([]);
      }
    } catch (err) {
      console.error("Erreur lors de la recherche d'adresse:", err);
      setError("Impossible de charger les suggestions");
      setSuggestions([]);
      
      // Fallback : afficher un message d'aide
      setShowSuggestions(true);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Debounce la recherche
  useEffect(() => {
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }

    debounceTimer.current = setTimeout(() => {
      fetchSuggestions(value);
    }, 300);

    return () => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }
    };
  }, [value, fetchSuggestions]);

  const handleSelectSuggestion = (suggestion: AddressSuggestion) => {
    onChange(suggestion.label);
    setShowSuggestions(false);
    setSuggestions([]);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
    setShowSuggestions(true);
  };

  return (
    <div ref={wrapperRef} className="relative w-full">
      <div className="relative">
        <Input
          id={id}
          type="text"
          value={value}
          onChange={handleInputChange}
          onFocus={() => value.length >= 3 && setShowSuggestions(true)}
          placeholder={placeholder}
          required={required}
          className={cn("pr-10", className)}
          autoComplete="off"
        />
        
        {isLoading && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            <Loader2 className="h-5 w-5 text-blue-500 animate-spin" />
          </div>
        )}
      </div>

      {/* Dropdown des suggestions */}
      {showSuggestions && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-64 overflow-y-auto">
          {error ? (
            <div className="px-4 py-3 text-sm text-gray-600">
              <p className="mb-2">{error}</p>
              <p className="text-xs text-gray-500">Vous pouvez continuer à saisir votre adresse manuellement</p>
            </div>
          ) : suggestions.length > 0 ? (
            suggestions.map((suggestion) => (
              <button
                key={suggestion.id}
                type="button"
                onClick={() => handleSelectSuggestion(suggestion)}
                className={cn(
                  "w-full px-4 py-3 text-left hover:bg-blue-50 transition-colors",
                  "border-b border-gray-100 last:border-b-0",
                  "focus:bg-blue-50 focus:outline-none"
                )}
              >
                <div className="text-sm font-medium text-gray-900">
                  {suggestion.label}
                </div>
                {suggestion.score && (
                  <div className="text-xs text-gray-500 mt-1">
                    Pertinence: {Math.round(suggestion.score * 100)}%
                  </div>
                )}
              </button>
            ))
          ) : value.length >= 3 ? (
            <div className="px-4 py-3 text-sm text-gray-600">
              <p>Aucune adresse trouvée pour "{value}"</p>
              <p className="text-xs text-gray-500 mt-2">Vérifiez l'orthographe ou continuez la saisie</p>
            </div>
          ) : (
            <div className="px-4 py-3 text-sm text-gray-500">
              <p>Tapez au moins 3 caractères pour voir les suggestions</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
