import { Helmet } from 'react-helmet-async';

interface SchemaOrgProps {
  type: 'LocalBusiness' | 'Service' | 'FAQPage' | 'Organization';
  data: Record<string, any>;
}

export function SchemaOrg({ type, data }: SchemaOrgProps) {
  const getSchema = () => {
    switch (type) {
      case 'LocalBusiness':
        return {
          '@context': 'https://schema.org',
          '@type': 'LocalBusiness',
          name: 'ProClean Empire',
          image: 'https://procleanempire.com/logo.png',
          description: 'Expert en nettoyage multiservice en Île-de-France. Nettoyage automobile, terrasse, tapis, balcon, jardinage, façade, piscine.',
          url: 'https://procleanempire.com',
          telephone: '+33617212230',
          email: 'contact@procleanempire.com',
          address: {
            '@type': 'PostalAddress',
            streetAddress: 'Île-de-France',
            addressLocality: 'Paris',
            postalCode: '75000',
            addressCountry: 'FR'
          },
          areaServed: ['Paris', 'Île-de-France', '75', '77', '78', '91', '92', '93', '94', '95'],
          priceRange: '€€',
          sameAs: [
            'https://www.facebook.com/procleanempire',
            'https://www.instagram.com/proclean_empire',
            'https://www.trustpilot.com/review/procleanempire.com'
          ],
          aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: '5.0',
            reviewCount: '16'
          }
        };

      case 'Service':
        return {
          '@context': 'https://schema.org',
          '@type': 'Service',
          name: data.name,
          description: data.description,
          provider: {
            '@type': 'LocalBusiness',
            name: 'ProClean Empire',
            url: 'https://procleanempire.com'
          },
          areaServed: 'Île-de-France',
          availableLanguage: 'fr',
          priceRange: data.priceRange || '€€'
        };

      case 'FAQPage':
        return {
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: data.faqs.map((faq: any) => ({
            '@type': 'Question',
            name: faq.question,
            acceptedAnswer: {
              '@type': 'Answer',
              text: faq.answer
            }
          }))
        };

      case 'Organization':
        return {
          '@context': 'https://schema.org',
          '@type': 'Organization',
          name: 'ProClean Empire',
          url: 'https://procleanempire.com',
          logo: 'https://procleanempire.com/logo.png',
          description: 'Expert en nettoyage multiservice en Île-de-France',
          sameAs: [
            'https://www.facebook.com/procleanempire',
            'https://www.instagram.com/proclean_empire',
            'https://www.trustpilot.com/review/procleanempire.com'
          ],
          contactPoint: {
            '@type': 'ContactPoint',
            contactType: 'Customer Service',
            telephone: '+33617212230',
            email: 'contact@procleanempire.com'
          }
        };

      default:
        return null;
    }
  };

  const schema = getSchema();

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
    </Helmet>
  );
}

export default SchemaOrg;
