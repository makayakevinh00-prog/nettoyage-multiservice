export const createServiceSchema = (service: {
  name: string;
  description: string;
  image: string;
  url: string;
}) => ({
  "@context": "https://schema.org",
  "@type": "Service",
  "name": service.name,
  "description": service.description,
  "image": service.image,
  "url": service.url,
  "provider": {
    "@type": "LocalBusiness",
    "name": "ProClean Empire",
    "url": "https://procleanempire.com",
    "telephone": "+33617212230",
    "email": "contact@procleanempire.com",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Paris",
      "addressRegion": "Ile-de-France",
      "addressCountry": "FR"
    }
  },
  "areaServed": {
    "@type": "Region",
    "name": "Ile-de-France"
  },
  "priceRange": "€€",
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "5.0",
    "ratingCount": "100",
    "bestRating": "5",
    "worstRating": "1"
  }
});

export const createFAQSchema = (faqs: Array<{ question: string; answer: string }>) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": faqs.map(faq => ({
    "@type": "Question",
    "name": faq.question,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": faq.answer
    }
  }))
});
