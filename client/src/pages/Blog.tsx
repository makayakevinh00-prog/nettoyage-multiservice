import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Calendar, ArrowRight } from "lucide-react";
import { Link } from "wouter";

export default function Blog() {
  const articles = [
    {
      id: "nettoyer-terrasse",
      title: "Comment Nettoyer sa Terrasse en 5 Étapes Simples",
      excerpt: "Guide complet pour nettoyer votre terrasse comme un professionnel. Découvrez les techniques, produits et équipements nécessaires.",
      date: "28 février 2026",
      category: "Terrasse",
      readTime: "8 min",
      slug: "/blog/terrasse"
    },
    {
      id: "nettoyage-ecologique",
      title: "Nettoyage Écologique : Pourquoi et Comment ?",
      excerpt: "Découvrez les avantages du nettoyage écologique pour votre santé et l'environnement. Produits naturels et techniques durables.",
      date: "25 février 2026",
      category: "Écologie",
      readTime: "6 min",
      slug: "/blog/ecologie"
    },
    {
      id: "nettoyage-facade",
      title: "Guide Complet du Nettoyage de Façade",
      excerpt: "Tout ce que vous devez savoir sur le nettoyage de façade : techniques, sécurité, et résultats professionnels.",
      date: "22 février 2026",
      category: "Façade",
      readTime: "10 min",
      slug: "/blog/nettoyage-facade"
    },
    {
      id: "entretien-piscine",
      title: "Entretien Piscine : Les Erreurs à Éviter",
      excerpt: "Apprenez les erreurs courantes d'entretien de piscine et comment les éviter pour une eau cristalline toute l'année.",
      date: "20 février 2026",
      category: "Piscine",
      readTime: "7 min",
      slug: "/blog/piscine"
    },
    {
      id: "lavage-auto-professionnel",
      title: "Lavage Auto Professionnel : Nos Secrets Révélés",
      excerpt: "Découvrez les techniques professionnelles de lavage automobile pour protéger votre peinture et garder votre voiture impeccable.",
      date: "18 février 2026",
      category: "Automobile",
      readTime: "9 min",
      slug: "/blog/automobile"
    },
    {
      id: "nettoyage-tapis",
      title: "Nettoyage Tapis : Techniques et Produits Recommandés",
      excerpt: "Guide pratique pour nettoyer vos tapis efficacement. Techniques d'injection-extraction et produits écologiques.",
      date: "15 février 2026",
      category: "Tapis",
      readTime: "8 min",
      slug: "/blog/nettoyage-tapis"
    },
    {
      id: "balcon-propre",
      title: "Balcon Propre : Guide Pratique d'Entretien",
      excerpt: "Conseils pratiques pour maintenir votre balcon propre et accueillant. Nettoyage régulier et traitement des taches.",
      date: "12 février 2026",
      category: "Balcon",
      readTime: "6 min",
      slug: "/blog/balcon-propre"
    },
    {
      id: "jardinage-ecologique",
      title: "Jardinage Écologique en Île-de-France",
      excerpt: "Découvrez comment entretenir votre jardin de manière écologique et durable en Île-de-France.",
      date: "10 février 2026",
      category: "Jardinage",
      readTime: "7 min",
      slug: "/blog/jardinage-ecologique"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative h-[400px] flex items-center justify-center overflow-hidden">
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: "url('https://files.manuscdn.com/user_upload_by_module/session_file/310519663223121429/rPOrxYmzanxOtBXU.jpg')",
              backgroundPosition: 'center 30%',
            }}
          />
          <div className="absolute inset-0 bg-black/40" />
          
          <div className="relative z-50 container mx-auto px-4 text-center">
            <div className="max-w-3xl mx-auto">
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
                Blog ProClean Empire
              </h1>
              <p className="text-2xl text-orange-400 mb-8 font-semibold">
                Conseils et guides de nettoyage professionnel
              </p>
            </div>
          </div>
        </section>

        {/* Introduction Section */}
        <section className="py-16 md:py-24 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Découvrez nos Guides de Nettoyage Professionnel
              </h2>
              <p className="text-lg text-gray-700 mb-6">
                Retrouvez tous nos conseils, techniques et guides pratiques pour maintenir votre maison, voiture et jardin impeccables. Articles optimisés et écrits par nos experts en nettoyage professionnel.
              </p>
            </div>
          </div>
        </section>

        {/* Articles Grid */}
        <section className="py-20 md:py-32 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {articles.map((article) => (
                <Card key={article.id} className="hover:shadow-lg transition-all overflow-hidden flex flex-col">
                  <div className="h-48 bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center">
                    <BookOpen className="w-16 h-16 text-white opacity-50" />
                  </div>
                  <CardHeader className="flex-1">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-xs font-semibold text-orange-600 bg-orange-100 px-3 py-1 rounded-full">
                        {article.category}
                      </span>
                      <span className="text-xs text-gray-500">{article.readTime}</span>
                    </div>
                    <CardTitle className="text-xl text-gray-900 line-clamp-3">
                      {article.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="flex-1">
                    <p className="text-gray-700 mb-6 line-clamp-3">
                      {article.excerpt}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500 flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {article.date}
                      </span>
                      <Link href={article.slug}>
                        <Button variant="ghost" size="sm" className="text-orange-600 hover:text-orange-700">
                          Lire <ArrowRight className="w-4 h-4 ml-1" />
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 md:py-32 bg-gradient-to-r from-orange-500 to-orange-600">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Besoin d'un Service de Nettoyage Professionnel ?
            </h2>
            <p className="text-xl text-white mb-8 max-w-2xl mx-auto">
              Contactez ProClean Empire pour un devis gratuit. Intervention rapide à domicile en Île-de-France, 7j/7.
            </p>
            <Button 
              onClick={() => window.location.href = '/#booking'}
              className="bg-white hover:bg-gray-100 text-orange-600 font-bold px-10 py-4 text-lg rounded-full"
            >
              Demander un devis gratuit
            </Button>
          </div>
        </section>
      </main>
    </div>
  );
}
