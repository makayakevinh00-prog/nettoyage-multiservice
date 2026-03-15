import { Helmet } from 'react-helmet-async';

interface ServiceHelmetProps {
  title: string;
  description: string;
  keywords: string;
  canonical: string;
  image?: string;
}

export function ServiceHelmet({ title, description, keywords, canonical, image }: ServiceHelmetProps) {
  const fullTitle = `${title} | ProClean Empire - Nettoyage Multiservice`;
  const ogImage = image || 'https://procleanempire.com/logo-proclean.png';

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <link rel="canonical" href={canonical} />
      
      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:url" content={canonical} />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
    </Helmet>
  );
}
