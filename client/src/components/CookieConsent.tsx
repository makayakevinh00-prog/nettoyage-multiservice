import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function CookieConsent() {
  const [showConsent, setShowConsent] = useState(false);
  const [consentGiven, setConsentGiven] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookieConsent');
    if (!consent) {
      setShowConsent(true);
    } else {
      setConsentGiven(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookieConsent', 'accepted');
    setShowConsent(false);
    setConsentGiven(true);
    
    // Charger les scripts d'analyse si consentement donné
    if ((window as any).gtag) {
      (window as any).gtag('consent', 'update', {
        'analytics_storage': 'granted'
      });
    }
  };

  const handleReject = () => {
    localStorage.setItem('cookieConsent', 'rejected');
    setShowConsent(false);
  };

  if (!showConsent) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-900 text-white p-4 shadow-lg z-50">
      <div className="container mx-auto flex items-center justify-between gap-4">
        <div className="flex-1">
          <p className="text-sm">
            Nous utilisons des cookies pour améliorer votre expérience. En continuant, vous acceptez notre{' '}
            <a href="/politique-confidentialite" className="underline hover:text-blue-400">
              politique de confidentialité
            </a>
            .
          </p>
        </div>
        
        <div className="flex gap-2 flex-shrink-0">
          <Button
            onClick={handleReject}
            variant="outline"
            size="sm"
            className="text-gray-900"
          >
            Refuser
          </Button>
          <Button
            onClick={handleAccept}
            size="sm"
            className="bg-blue-600 hover:bg-blue-700"
          >
            Accepter
          </Button>
          <button
            onClick={handleReject}
            className="text-gray-400 hover:text-white"
          >
            <X size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
