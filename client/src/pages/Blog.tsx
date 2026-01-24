import { useEffect, useState } from "react";
import { Calendar, User, ArrowRight, Search } from "lucide-react";
import { Button } from "@/components/ui/button";

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  category: string;
  image: string;
  readTime: number;
}

const blogPosts: BlogPost[] = [
  {
    id: "1",
    title: "Les secrets d'un nettoyage automobile professionnel",
    excerpt: "Découvrez comment obtenir une voiture impeccable avec les techniques des professionnels.",
    content: "Le nettoyage automobile professionnel va bien au-delà d'un simple lavage. Chez ProClean Empire, nous utilisons des produits de haute qualité et des techniques éprouvées pour préserver l'éclat de votre véhicule...",
    author: "ProClean Empire",
    date: "2026-01-20",
    category: "Automobile",
    image: "/proclean-voiture-lavage.jpg",
    readTime: 5
  },
  {
    id: "2",
    title: "Comment entretenir votre terrasse pour qu'elle dure plus longtemps",
    excerpt: "Conseils pratiques pour maintenir votre terrasse en parfait état toute l'année.",
    content: "Une terrasse bien entretenue peut durer des décennies. Le nettoyage régulier est essentiel pour prévenir l'accumulation de mousse et d'algues qui peuvent endommager le revêtement...",
    author: "ProClean Empire",
    date: "2026-01-18",
    category: "Terrasse",
    image: "/proclean-terrasse-nettoyage.jpg",
    readTime: 6
  },
  {
    id: "3",
    title: "Tapis et canapés : Guide complet du nettoyage professionnel",
    excerpt: "Apprenez comment nettoyer vos meubles rembourrés sans les endommager.",
    content: "Le nettoyage des tapis et canapés nécessite une expertise particulière. Nos équipes utilisent des techniques d'injection-extraction qui éliminent la saleté en profondeur...",
    author: "ProClean Empire",
    date: "2026-01-15",
    category: "Intérieur",
    image: "/proclean-tapis-aspiration.jpg",
    readTime: 7
  },
  {
    id: "4",
    title: "Panneaux solaires : Pourquoi le nettoyage régulier est crucial",
    excerpt: "Maximisez l'efficacité de vos panneaux solaires avec un nettoyage professionnel.",
    content: "La poussière et la saleté peuvent réduire l'efficacité de vos panneaux solaires de jusqu'à 25%. Un nettoyage régulier garantit un rendement optimal...",
    author: "ProClean Empire",
    date: "2026-01-12",
    category: "Énergie",
    image: "/proclean-panneaux-solaires.jpg",
    readTime: 5
  },
  {
    id: "5",
    title: "Façade de maison : Prévention et nettoyage",
    excerpt: "Protégez votre investissement immobilier avec un nettoyage régulier de façade.",
    content: "La façade de votre maison est la première ligne de défense contre les intempéries. Un nettoyage professionnel élimine les polluants et prévient les dégâts...",
    author: "ProClean Empire",
    date: "2026-01-10",
    category: "Extérieur",
    image: "/proclean-facade-nettoyage.jpg",
    readTime: 6
  },
  {
    id: "6",
    title: "Jardinage professionnel : Créer un espace vert magnifique",
    excerpt: "Transformez votre jardin en un havre de paix avec nos services d'entretien paysager.",
    content: "Un jardin bien entretenu augmente la valeur de votre propriété et crée un espace de détente. Nos équipes de jardinage proposent des solutions complètes...",
    author: "ProClean Empire",
    date: "2026-01-08",
    category: "Jardinage",
    image: "/hero-jardinage.jpg",
    readTime: 8
  }
];

export default function Blog() {
  const [posts, setPosts] = useState<BlogPost[]>(blogPosts);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Tous");

  useEffect(() => {
    let filtered = blogPosts;

    if (searchTerm) {
      filtered = filtered.filter(post =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCategory !== "Tous") {
      filtered = filtered.filter(post => post.category === selectedCategory);
    }

    setPosts(filtered);
  }, [searchTerm, selectedCategory]);

  const categories = ["Tous", ...new Set(blogPosts.map(post => post.category))];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-50">
      {/* Header */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Blog ProClean Empire</h1>
          <p className="text-xl text-blue-100">
            Conseils, astuces et actualités sur le nettoyage professionnel
          </p>
        </div>
      </section>

      {/* Search and Filter */}
      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Search Bar */}
          <div className="mb-8 relative">
            <Search className="absolute left-4 top-3 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Rechercher un article..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Categories */}
          <div className="flex flex-wrap gap-3 mb-12">
            {categories.map((category) => (
              <Button
                key={category}
                onClick={() => setSelectedCategory(category)}
                variant={selectedCategory === category ? "default" : "outline"}
                className={selectedCategory === category ? "bg-blue-600 hover:bg-blue-700" : ""}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-12 px-4 pb-20">
        <div className="max-w-4xl mx-auto">
          {posts.length > 0 ? (
            <div className="grid md:grid-cols-2 gap-8">
              {posts.map((post, index) => (
                <article
                  key={post.id}
                  className={`bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-105 animate-slideUp stagger-${(index % 5) + 1}`}
                >
                  {/* Image */}
                  <div className="relative h-48 overflow-hidden bg-gray-200">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute top-4 right-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                      {post.category}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 mb-4 line-clamp-2">
                      {post.excerpt}
                    </p>

                    {/* Meta */}
                    <div className="flex items-center gap-4 text-sm text-gray-500 mb-4 pb-4 border-b border-gray-200">
                      <div className="flex items-center gap-1">
                        <Calendar size={16} />
                        {new Date(post.date).toLocaleDateString("fr-FR")}
                      </div>
                      <div className="flex items-center gap-1">
                        <User size={16} />
                        {post.author}
                      </div>
                      <div className="ml-auto text-blue-600 font-semibold">
                        {post.readTime} min
                      </div>
                    </div>

                    {/* Read More Button */}
                    <a href={`/blog/${post.id}`} className="inline-flex items-center text-blue-600 hover:text-blue-700 font-semibold group">
                      Lire la suite
                      <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </a>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">Aucun article trouvé</p>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="bg-blue-600 text-white py-16 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Recevez nos conseils par email</h2>
          <p className="text-lg text-blue-100 mb-8">
            Abonnez-vous à notre newsletter pour recevoir les derniers articles et astuces de nettoyage
          </p>
          <div className="flex gap-2">
            <input
              type="email"
              placeholder="Votre email"
              className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
            <Button className="bg-white text-blue-600 hover:bg-gray-100">
              S'abonner
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
