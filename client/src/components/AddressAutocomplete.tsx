import { Input } from "@/components/ui/input";
import { useEffect, useRef, useState } from "react";

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
  placeholder,
  required,
  id,
  className
}: AddressAutocompleteProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (!inputRef.current) return;

    // Fonction pour initialiser l'autocomplétion
    const initAutocomplete = () => {
      if (!inputRef.current || !window.google?.maps?.places) {
        return;
      }

      const autocomplete = new window.google.maps.places.Autocomplete(inputRef.current, {
        componentRestrictions: { country: 'fr' },
        fields: ['formatted_address', 'address_components', 'geometry'],
        types: ['address']
      });

      autocomplete.addListener('place_changed', () => {
        const place = autocomplete.getPlace();
        if (place.formatted_address) {
          onChange(place.formatted_address);
        }
      });

      setIsLoaded(true);
    };

    // Vérifier si Google Maps est déjà chargé
    if (window.google?.maps?.places) {
      initAutocomplete();
      return;
    }

    // Sinon, charger le script
    const checkGoogleMaps = setInterval(() => {
      if (window.google?.maps?.places) {
        clearInterval(checkGoogleMaps);
        initAutocomplete();
      }
    }, 100);

    // Charger le script si nécessaire
    if (!document.querySelector('script[src*="maps.googleapis.com"]')) {
      const script = document.createElement('script');
      script.src = 'https://maps.googleapis.com/maps/api/js?libraries=places&loading=async';
      script.async = true;
      script.defer = true;
      document.head.appendChild(script);
    }

    // Nettoyage après 10 secondes
    const timeout = setTimeout(() => {
      clearInterval(checkGoogleMaps);
    }, 10000);

    return () => {
      clearInterval(checkGoogleMaps);
      clearTimeout(timeout);
    };
  }, []);

  return (
    <Input
      ref={inputRef}
      id={id}
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      required={required}
      className={className}
      autoComplete="off"
    />
  );
}

