import { useState } from 'react';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';

interface StripePaymentProps {
  bookingData: {
    name: string;
    email: string;
    phone: string;
    service: string;
    date: string;
    time: string;
    address: string;
    message?: string;
  };
  onSuccess: () => void;
  onError: (error: string) => void;
}

export default function StripePayment({ bookingData, onSuccess, onError }: StripePaymentProps) {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      onError('Stripe non disponible');
      return;
    }

    setLoading(true);

    try {
      // Créer le PaymentIntent via l'API
      const response = await fetch('/api/create-payment-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bookingData),
      });

      const { clientSecret } = await response.json();

      // Confirmer le paiement
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement)!,
          billing_details: {
            name: bookingData.name,
            email: bookingData.email,
          },
        },
      });

      if (result.error) {
        onError(result.error.message || 'Erreur de paiement');
      } else if (result.paymentIntent?.status === 'succeeded') {
        toast.success('✅ Paiement réussi ! Votre réservation est confirmée.');
        onSuccess();
      }
    } catch (error) {
      onError(error instanceof Error ? error.message : 'Erreur lors du paiement');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handlePayment} className="space-y-4">
      <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
        <p className="text-sm text-gray-700">
          💳 <strong>Caution de 25€</strong> - Remboursée après la prestation ou conservée en cas d'annulation après 24h
        </p>
      </div>

      <div className="p-4 border border-gray-300 rounded-lg">
        <CardElement
          options={{
            style: {
              base: {
                fontSize: '16px',
                color: '#424770',
                '::placeholder': {
                  color: '#aab7c4',
                },
              },
              invalid: {
                color: '#fa755a',
              },
            },
          }}
        />
      </div>

      <Button
        type="submit"
        disabled={!stripe || loading}
        className="w-full bg-blue-600 hover:bg-blue-700"
      >
        {loading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Traitement du paiement...
          </>
        ) : (
          'Payer 25€ et confirmer la réservation'
        )}
      </Button>
    </form>
  );
}
