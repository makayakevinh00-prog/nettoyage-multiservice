export const seoServices = {
  automobile: {
    title: "Nettoyage Automobile Professionnel",
    description: "Service de nettoyage automobile professionnel a Paris et Ile-de-France. Lavage interieur et exterieur, lustrage, protection. Intervention a domicile. Devis gratuit.",
    keywords: "nettoyage automobile Paris, nettoyage voiture Ile-de-France, lavage automobile professionnel, nettoyage interieur exterieur, lustrage voiture, detailing automobile",
    canonical: "https://procleanempire.com/service-automobile",
    image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663223121429/EjnzEtAMpiePukrT.jpg"
  },
  terrasse: {
    title: "Nettoyage Terrasse Professionnel",
    description: "Nettoyage de terrasse professionnel a Paris et Ile-de-France. Demoussage, nettoyage haute pression, traitement anti-mousse. Devis gratuit, intervention rapide.",
    keywords: "nettoyage terrasse Paris, nettoyage terrasse Ile-de-France, demoussage terrasse, nettoyage haute pression, traitement anti-mousse",
    canonical: "https://procleanempire.com/service-terrasse",
    image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663223121429/rPOrxYmzanxOtBXU.jpg"
  },
  tapis: {
    title: "Nettoyage Tapis et Canapes",
    description: "Nettoyage professionnel de tapis et canapes a Paris et Ile-de-France. Injection-extraction, detachage professionnel, sechage rapide. Devis gratuit.",
    keywords: "nettoyage tapis Paris, nettoyage canape Ile-de-France, detachage tapis, injection extraction, nettoyage professionnel tapis",
    canonical: "https://procleanempire.com/service-tapis",
    image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663223121429/zHAPSTRRPawXxZsb.jpg"
  },
  balcon: {
    title: "Nettoyage Balcon Professionnel",
    description: "Nettoyage de balcon professionnel a Paris et Ile-de-France. Nettoyage complet, joints, garde-corps et revetements. Intervention securisee, devis gratuit.",
    keywords: "nettoyage balcon Paris, nettoyage balcon Ile-de-France, nettoyage garde-corps, nettoyage joints balcon",
    canonical: "https://procleanempire.com/service-balcon",
    image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663223121429/GLthMgVOljyOhROV.jpg"
  },
  jardinage: {
    title: "Entretien Jardinage Professionnel",
    description: "Service d'entretien jardinage professionnel a Paris et Ile-de-France. Taille, debroussaillage, nettoyage. Equipe qualifiee, devis gratuit.",
    keywords: "entretien jardinage Paris, nettoyage jardin Ile-de-France, taille haie, debroussaillage, entretien exterieur",
    canonical: "https://procleanempire.com/service-jardinage",
    image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663223121429/rPOrxYmzanxOtBXU.jpg"
  }
};

export const getServiceSEO = (service: string) => {
  return seoServices[service as keyof typeof seoServices] || seoServices.automobile;
};
