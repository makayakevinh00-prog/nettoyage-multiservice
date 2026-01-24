import { Button } from "@/components/ui/button";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import { useLocation } from "wouter";

export default function NousConnaitre() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-white border-b border-gray-200">
        <div className="container flex items-center justify-between py-4">
          <button
            onClick={() => setLocation("/")}
            className="flex items-center gap-2 text-blue-600 hover:text-blue-700 transition"
          >
            <ArrowLeft size={20} />
            Retour
          </button>
          <h1 className="text-2xl font-bold text-gray-900">Nous Connaître</h1>
          <div className="w-20"></div>
        </div>
      </div>

      {/* PRÉSENTATION DE L'ENTREPRISE */}
      <section className="py-20 bg-white">
        <div className="container max-w-6xl mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 uppercase tracking-wide text-center">
            Présentation de l'Entreprise
          </h2>
          <p className="text-center text-gray-600 mb-12 text-lg max-w-2xl mx-auto">
            Trouver la solution la plus adaptée à vos besoins
          </p>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <p className="text-gray-700 text-lg leading-relaxed">
                ProClean Empire vous propose une prestation de services de qualité exceptionnelle pour des clients exigeants en Île-de-France. Avec une présence solide depuis plus de 5 ans, nous nous sommes établis comme partenaire de confiance pour le nettoyage professionnel et multiservice.
              </p>
              <p className="text-gray-700 text-lg leading-relaxed">
                Nos équipes interviennent quotidiennement pour nettoyer et entretenir des milliers de mètres carrés, offrant un panel de services sur mesure adaptés à chaque client. De l'automobile au nettoyage de façade, en passant par les terrasses et les espaces professionnels, ProClean Empire réalise des prestations de propreté avec excellence.
              </p>
              <p className="text-gray-700 text-lg leading-relaxed">
                Notre objectif est de satisfaire les besoins de nos clients et d'offrir aux occupants des espaces de travail et de vie agréables et hygiéniques. Nous croyons que la propreté est un facteur clé du bien-être et de la qualité de vie.
              </p>
              <p className="text-gray-700 text-lg leading-relaxed">
                Réactivité, Proximité, Esprit de service et Excellence : ces valeurs accompagnent l'ensemble de nos collaborateurs qui veillent à apporter le meilleur. Grâce à l'innovation et aux équipements modernes, nous apportons à nos équipes des solutions pour être encore plus réactifs au quotidien chez nos clients.
              </p>
            </div>

            <div className="relative h-96 rounded-lg overflow-hidden shadow-lg">
              <img
                src="/team-professional-portrait.jpg"
                alt="ProClean Empire Team"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* QUELQUES CHIFFRES */}
      <section className="py-20 bg-gray-50">
        <div className="container max-w-6xl mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold mb-16 text-gray-900 uppercase tracking-wide text-center">
            Quelques Chiffres
          </h2>

          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-5xl md:text-6xl font-bold text-blue-600 mb-2">5+</div>
              <p className="text-gray-600 text-lg">Ans d'Expérience</p>
            </div>
            <div className="text-center">
              <div className="text-5xl md:text-6xl font-bold text-blue-600 mb-2">1000+</div>
              <p className="text-gray-600 text-lg">Clients Satisfaits</p>
            </div>
            <div className="text-center">
              <div className="text-5xl md:text-6xl font-bold text-blue-600 mb-2">50000+</div>
              <p className="text-gray-600 text-lg">m² Nettoyés</p>
            </div>
            <div className="text-center">
              <div className="text-5xl md:text-6xl font-bold text-blue-600 mb-2">92%</div>
              <p className="text-gray-600 text-lg">Taux de Satisfaction</p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mt-12">
            <div className="text-center">
              <div className="text-5xl md:text-6xl font-bold text-blue-600 mb-2">8</div>
              <p className="text-gray-600 text-lg">Services Disponibles</p>
            </div>
            <div className="text-center">
              <div className="text-5xl md:text-6xl font-bold text-blue-600 mb-2">Île-de-France</div>
              <p className="text-gray-600 text-lg">Zone d'Intervention</p>
            </div>
            <div className="text-center">
              <div className="text-5xl md:text-6xl font-bold text-blue-600 mb-2">24/7</div>
              <p className="text-gray-600 text-lg">Disponibilité</p>
            </div>
          </div>
        </div>
      </section>

      {/* NOS VALEURS - INTERVIEW */}
      <section className="py-20 bg-white">
        <div className="container max-w-4xl mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 uppercase tracking-wide text-center">
            Nos Valeurs
          </h2>
          <p className="text-center text-gray-600 mb-12 text-lg">
            L'Interview du Fondateur : Kevin H. Makaya
          </p>

          <div className="space-y-12">
            {/* Q1 */}
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Présentez-nous ProClean Empire en quelques mots ?
              </h3>
              <p className="text-gray-700 text-lg leading-relaxed">
                ProClean Empire est une entreprise de services spécialisée dans le nettoyage multiservice. Avec une présence solide en Île-de-France depuis plus de 5 ans, nous sommes fiers d'être un partenaire de confiance pour tous ceux qui recherchent une excellence en matière de propreté et d'hygiène. Nos équipes dévouées interviennent quotidiennement pour transformer et maintenir les espaces de nos clients, du particulier au professionnel.
              </p>
            </div>

            {/* Q2 */}
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Quelles sont les valeurs de l'entreprise ?
              </h3>
              <p className="text-gray-700 text-lg leading-relaxed mb-4">
                À ProClean Empire, nous considérons la propreté non pas simplement comme une responsabilité, mais comme un engagement perpétuel envers l'excellence et l'innovation. Nos valeurs fondamentales sont :
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="text-blue-600 flex-shrink-0 mt-1" size={20} />
                  <span className="text-gray-700"><strong>Excellence :</strong> Qualité irréprochable dans chaque intervention</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="text-blue-600 flex-shrink-0 mt-1" size={20} />
                  <span className="text-gray-700"><strong>Réactivité :</strong> Interventions rapides et efficaces</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="text-blue-600 flex-shrink-0 mt-1" size={20} />
                  <span className="text-gray-700"><strong>Proximité :</strong> Équipes locales à votre écoute</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="text-blue-600 flex-shrink-0 mt-1" size={20} />
                  <span className="text-gray-700"><strong>Innovation :</strong> Équipements modernes et techniques éco-responsables</span>
                </li>
              </ul>
            </div>

            {/* Q3 */}
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Comment choisir une bonne entreprise de nettoyage aujourd'hui ?
              </h3>
              <p className="text-gray-700 text-lg leading-relaxed">
                Le choix d'une entreprise de nettoyage est une décision essentielle qui influence directement la qualité de votre environnement. Chez ProClean Empire, nous pensons que vous devez rechercher : premièrement, l'expérience et la fiabilité. Une entreprise bien établie apporte une expertise approfondie et une connaissance du secteur. Deuxièmement, la réputation compte. La confiance que nos clients placent en nous témoigne de notre savoir-faire. Troisièmement, une bonne entreprise en 2026 doit être durable et innovante, en constante recherche de solutions respectueuses de l'environnement. Enfin, trouvez une entreprise qui répond précisément à vos attentes spécifiques.
              </p>
            </div>

            {/* Q4 */}
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Quel est votre positionnement sur le marché français de la Propreté ?
              </h3>
              <p className="text-gray-700 text-lg leading-relaxed">
                ProClean Empire se positionne comme un acteur premium et fiable du marché du nettoyage en Île-de-France. Nous sommes reconnus pour notre capacité à comprendre profondément les besoins spécifiques de nos clients et à offrir des solutions adaptées. Notre positionnement repose sur l'alliance entre une approche haut de gamme, une compréhension approfondie des clients et un savoir-faire excellent. Nous nous engageons à être un partenaire de confiance et un leader dans le secteur de la propreté multiservice.
              </p>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-16 text-center">
            <Button
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 text-lg rounded-lg"
              onClick={() => setLocation("/")}
            >
              Découvrir Nos Services
            </Button>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section className="py-20 bg-gray-50">
        <div className="container max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 uppercase tracking-wide">
            Contactez-Nous
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            ProClean Empire - Direction Générale<br />
            Île-de-France<br />
            France
          </p>
          <Button
            size="lg"
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 text-lg rounded-lg"
          >
            Nous Contacter
          </Button>
        </div>
      </section>
    </div>
  );
}
