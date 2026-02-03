import { useState, useEffect, useRef } from "react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

interface GooglePlacePrediction {
  place_id: string;
  description: string;
  main_text: string;
  secondary_text?: string;
}

interface GoogleMapsAddressAutocompleteProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  id?: string;
  className?: string;
}

declare global {
  interface Window {
    google?: {
      maps: {
        places: {
          AutocompleteService: new () => {
            getPlacePredictions(
              request: { input: string; componentRestrictions?: { country: string | string[] } },
              callback: (predictions: GooglePlacePrediction[] | null, status: string) => void
            ): void;
          };
          PlacesServiceStatus: {
            OK: string;
            ZERO_RESULTS: string;
            INVALID_REQUEST: string;
          };
        };
      };
    };
  }
}

export default function GoogleMapsAddressAutocomplete({
  value,
  onChange,
  placeholder = "Entrez votre adresse...",
  required,
  id,
  className
}: GoogleMapsAddressAutocompleteProps) {
  const [suggestions, setSuggestions] = useState<GooglePlacePrediction[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const autocompleteServiceRef = useRef<any>(null);
  const debounceTimerRef = useRef<NodeJS.Timeout>();

  // Initialiser Google Maps Places API
  useEffect(() => {
    const loadGoogleMapsScript = () => {
      // Vérifier si Google Maps est déjà chargé
      if (window.google?.maps?.places?.AutocompleteService) {
        autocompleteServiceRef.current = new window.google.maps.places.AutocompleteService();
        return;
      }

      // Charger le script Google Maps
      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}&libraries=places`;
      script.async = true;
      script.defer = true;
      script.onload = () => {
        if (window.google?.maps?.places?.AutocompleteService) {
          autocompleteServiceRef.current = new window.google.maps.places.AutocompleteService();
        }
      };
      script.onerror = () => {
        console.error("Erreur lors du chargement de Google Maps API");
      };
      document.head.appendChild(script);
    };

    loadGoogleMapsScript();
  }, []);

  // Gérer les clics en dehors du composant
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Récupérer les suggestions d'adresses
  useEffect(() => {
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    if (value.length < 3) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    setIsLoading(true);

    debounceTimerRef.current = setTimeout(() => {
      if (!autocompleteServiceRef.current) {
        setIsLoading(false);
        return;
      }

      try {
        autocompleteServiceRef.current.getPlacePredictions(
          {
            input: value,
            componentRestrictions: { country: ["fr", "be", "ch", "lu"] } // France et pays voisins
          },
          (predictions: GooglePlacePrediction[] | null, status: string) => {
            if (status === window.google?.maps?.places?.PlacesServiceStatus?.OK && predictions) {
              setSuggestions(predictions.slice(0, 5)); // Limiter à 5 suggestions
              setShowSuggestions(true);
            } else {
              setSuggestions([]);
            }
            setIsLoading(false);
          }
        );
      } catch (error) {
        console.error("Erreur lors de la recherche d'adresse:", error);
        setSuggestions([]);
        setIsLoading(false);
      }
    }, 300); // Délai de 300ms avant la recherche

    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, [value]);

  const handleSelectSuggestion = (suggestion: GooglePlacePrediction) => {
    onChange(suggestion.description);
    setShowSuggestions(false);
    setSuggestions([]);
  };

  return (
    <div ref={wrapperRef} className="relative">
      <div className="relative">
        <Input
          id={id}
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          required={required}
          className={className}
          autoComplete="off"
        />
        {isLoading && value.length >= 3 && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            <Loader2 className="h-5 w-5 text-blue-500 animate-spin" />
          </div>
        )}
      </div>

      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto">
          {suggestions.map((suggestion) => (
            <button
              key={suggestion.place_id}
              type="button"
              onClick={() => handleSelectSuggestion(suggestion)}
              className={cn(
                "w-full px-4 py-3 text-left hover:bg-blue-50 transition-colors",
                "border-b border-gray-100 last:border-b-0",
                "focus:bg-blue-50 focus:outline-none"
              )}
            >
              <div className="text-sm font-medium text-gray-900">{suggestion.main_text}</div>
              {suggestion.secondary_text && (
                <div className="text-xs text-gray-500">{suggestion.secondary_text}</div>
              )}
            </button>
          ))}
        </div>
      )}

      {showSuggestions && suggestions.length === 0 && value.length >= 3 && !isLoading && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg p-4">
          <p className="text-sm text-gray-500">Aucune adresse trouvée</p>
        </div>
      )}
    </div>
  );
}
