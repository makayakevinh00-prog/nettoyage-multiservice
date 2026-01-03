/**
 * Tracking Google Ads et HubSpot
 */

// Google Ads Conversion ID
const GOOGLE_ADS_CONVERSION_ID = 'AW-17788571669';

/**
 * Envoyer une conversion Google Ads
 */
export function trackGoogleAdsConversion(conversionLabel: string, value?: number) {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', 'conversion', {
      'allow_custom_scripts': true,
      'send_to': `${GOOGLE_ADS_CONVERSION_ID}/${conversionLabel}`,
      ...(value && { 'value': value, 'currency': 'EUR' })
    });
  }
}

/**
 * Envoyer un événement HubSpot
 */
export function trackHubSpotEvent(eventName: string, properties?: Record<string, any>) {
  if (typeof window !== 'undefined' && (window as any)._hsq) {
    (window as any)._hsq.push(['trackEvent', {
      id: eventName,
      value: 0,
      ...properties
    }]);
  }
}

/**
 * Identifier un contact HubSpot
 */
export function identifyHubSpotContact(email: string, properties?: Record<string, any>) {
  if (typeof window !== 'undefined' && (window as any)._hsq) {
    (window as any)._hsq.push(['identify', {
      email: email,
      ...properties
    }]);
  }
}

/**
 * Tracker une réservation
 */
export function trackBookingConversion(bookingData: {
  name: string;
  email: string;
  service: string;
  amount?: number;
}) {
  // Google Ads
  trackGoogleAdsConversion('AW-17788571669/booking_conversion', bookingData.amount || 25);
  
  // HubSpot
  identifyHubSpotContact(bookingData.email, {
    firstname: bookingData.name,
    service: bookingData.service,
    booking_date: new Date().toISOString(),
  });
  
  trackHubSpotEvent('booking_completed', {
    service: bookingData.service,
    amount: bookingData.amount || 25,
  });
}

/**
 * Tracker une demande de devis
 */
export function trackQuoteRequest(formData: {
  name: string;
  email: string;
  service: string;
}) {
  // Google Ads
  trackGoogleAdsConversion('AW-17788571669/quote_request');
  
  // HubSpot
  identifyHubSpotContact(formData.email, {
    firstname: formData.name,
    service: formData.service,
    quote_request_date: new Date().toISOString(),
  });
  
  trackHubSpotEvent('quote_requested', {
    service: formData.service,
  });
}
