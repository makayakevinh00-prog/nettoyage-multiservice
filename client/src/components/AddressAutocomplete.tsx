import { useState, useRef, useEffect, useCallback } from 'react';
import { Input } from '@/components/ui/input';

interface AddressSuggestion {
  id: string;
  label: string;
  score?: number;
}

interface AddressAutocompleteProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function AddressAutocomplete({
  value,
  onChange,
  placeholder = "Entrez votre adresse",
}: AddressAutocompleteProps) {
  const [suggestions, setSuggestions] = useState<AddressSuggestion[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Fermer les suggestions quand on clique en dehors
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
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
      const response = await fetch(`/api/address-search?q=${encodeURIComponent(query)}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        // Si l'API échoue, on affiche juste un message d'aide
        setSuggestions([]);
        setShowSuggestions(false);
        return;
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
      // Silencieusement échouer - l'utilisateur peut toujours entrer son adresse manuellement
      setSuggestions([]);
      setShowSuggestions(false);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    onChange(newValue);
    
    if (newValue.length >= 3) {
      fetchSuggestions(newValue);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleSelectSuggestion = (suggestion: AddressSuggestion) => {
    onChange(suggestion.label);
    setShowSuggestions(false);
    setSuggestions([]);
  };

  return (
    <div ref={containerRef} className="relative w-full">
      <Input
        type="text"
        value={value}
        onChange={handleInputChange}
        placeholder={placeholder}
        className="w-full"
        autoComplete="off"
      />

      {showSuggestions && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
          {isLoading && (
            <div className="px-4 py-2 text-sm text-gray-500">
              Chargement...
            </div>
          )}

          {error && (
            <div className="px-4 py-2 text-sm text-red-500">
              {error}
            </div>
          )}

          {suggestions.length > 0 && (
            <ul className="max-h-48 overflow-y-auto">
              {suggestions.map((suggestion) => (
                <li
                  key={suggestion.id}
                  onClick={() => handleSelectSuggestion(suggestion)}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                >
                  {suggestion.label}
                </li>
              ))}
            </ul>
          )}

          {!isLoading && !error && suggestions.length === 0 && value.length >= 3 && (
            <div className="px-4 py-2 text-sm text-gray-500">
              Aucune suggestion trouvée. Vous pouvez entrer votre adresse manuellement.
            </div>
          )}
        </div>
      )}
    </div>
  );
}
