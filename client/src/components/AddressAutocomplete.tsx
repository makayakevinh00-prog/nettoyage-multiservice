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
  const [autocomplete, setAutocomplete] = useState<google.maps.places.Autocomplete | null>(null);

  useEffect(() => {
    if (!inputRef.current) return;

    // Charger l'API Google Maps Places
    const loadGoogleMaps = async () => {
      try {
        // Vérifier si google.maps est déjà chargé
        if (typeof google !== 'undefined' && google.maps && google.maps.places) {
          initAutocomplete();
          return;
        }

        // Charger le script Google Maps via le proxy Manus
        const script = document.createElement('script');
        script.src = 'https://maps.googleapis.com/maps/api/js?libraries=places&loading=async';
        script.async = true;
        script.defer = true;
        script.onload = () => {
          initAutocomplete();
        };
        document.head.appendChild(script);
      } catch (error) {
        console.error('Erreur lors du chargement de Google Maps:', error);
      }
    };

    const initAutocomplete = () => {
      if (!inputRef.current) return;

      const autocompleteInstance = new google.maps.places.Autocomplete(inputRef.current, {
        componentRestrictions: { country: 'fr' },
        fields: ['formatted_address', 'address_components', 'geometry'],
        types: ['address']
      });

      autocompleteInstance.addListener('place_changed', () => {
        const place = autocompleteInstance.getPlace();
        if (place.formatted_address) {
          onChange(place.formatted_address);
        }
      });

      setAutocomplete(autocompleteInstance);
    };

    loadGoogleMaps();

    return () => {
      if (autocomplete) {
        google.maps.event.clearInstanceListeners(autocomplete);
      }
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
