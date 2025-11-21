import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { 
  Car,
  CheckCircle2, 
  Home as HomeIcon, 
  Sparkles, 
  Star,
  Sofa,
  Building2,
  Waves
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function Home() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Merci ! Nous vous contacterons sous 24h.");
    setFormData({ name: "", email: "", phone: "", service: "", message: "" });
  };

  const services = [
    {
      icon: Car,
      title: "Nettoyage Automobile",
      description: "Intérieur et extérieur, lavage haute pression, lustrage et protection.",
      image: "/hero-proclean.png",
    },
    {
      icon: Waves,
      title: "Nettoyage Terrasse",
      description: "Démoussage, nettoyage haute pression, traitement anti-mousse.",
      image: "/services-grid.png",
    },
    {
      icon: Sofa,
      title: "Nettoyage Tapis",
      description: "Injection-extraction, détachage professionnel, séchage rapide.",
      image: "/services-grid.png",
    },
    {
      icon: Building2,
      title: "Nettoyage Balcon",
      description: "Nettoyage complet, joints, garde-corps et revêtements.",
      image: "/services-grid.png",
    },
  ];

  const avantages = [
    "Équipements professionnels de dernière génération",
    "Produits écologiques et respectueux de l'environnement",
    "Équipe formée et expérimentée",
    "Intervention rapide en Île-de-France",
    "Devis gratuit et sans engagement",
    "Satisfaction garantie ou argent remboursé",
  ];

  const testimonials = [
    {
      name: "Alexandre M.",
      role: "Particulier",
      content: "Service exceptionnel pour le nettoyage de ma voiture. Résultat impeccable, on dirait qu'elle sort de l'usine !",
      rating: 5,
    },
    {
      name: "Sophie D.",
      role: "Propriétaire",
      content: "J'ai fait nettoyer ma terrasse et mes tapis. Le travail est remarquable, très professionnel. Je recommande vivement.",
      rating: 5,
    },
    {
      name: "Thomas L.",
      role: "Copropriété",
      content: "ProClean Empire intervient régulièrement pour notre immeuble. Toujours à l'heure, efficace et soigné.",
      rating: 5,
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative min-h-[600px] flex items-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
          <div className="absolute inset-0 bg-[url('/hero-alt.png')] bg-cover bg-center opacity-30"></div>
          <div className="container relative z-10 py-20">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="text-white">
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
                  <span className="text-white">PROCLEAN</span>{" "}
                  <span className="text-blue-400">EMPIRE</span>
                </h1>
                <p className="text-2xl md:text-3xl font-semibold mb-4 text-blue-300">
                  NETTOYAGE PREMIUM
                </p>
                <p className="text-xl mb-8 text-gray-300">
                  VOITURE · TAPIS · TERRASSE
                </p>
                <p className="text-lg mb-8 text-gray-200 max-w-xl">
                  ProClean Empire est votre partenaire de confiance pour le nettoyage de terrasses, toits, façades, jardins, véhicules et logements. 
                  Nous intervenons partout en <strong>Île-de-France</strong>, avec des équipements professionnels et un sens du détail qui fait la différence.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white text-lg px-8 py-6" asChild>
                    <a href="#contact">Prendre RDV</a>
                  </Button>
                  <Button size="lg" variant="outline" className="bg-white/10 hover:bg-white/20 text-white border-white text-lg px-8 py-6" asChild>
                    <a href="#services">Nos Services</a>
                  </Button>
                </div>
              </div>
              <div className="relative hidden md:block">
                <img 
                  src="/hero-proclean.png" 
                  alt="ProClean Empire - Nettoyage professionnel" 
                  className="rounded-lg shadow-2xl w-full h-auto"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Section C'est l'heure du grand nettoyage */}
        <section className="py-20 bg-gradient-to-b from-white to-blue-50">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold mb-4 text-blue-900">
                C'EST L'HEURE DU GRAND NETTOYAGE!
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Découvrez nos services de nettoyage professionnel pour redonner éclat et propreté à vos espaces.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {services.map((service, index) => (
                <Card key={index} className="hover:shadow-xl transition-all duration-300 border-2 hover:border-blue-500 overflow-hidden group">
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={service.image} 
                      alt={service.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="text-white font-bold text-xl">{service.title}</h3>
                    </div>
                  </div>
                  <CardContent className="pt-6">
                    <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center mb-4">
                      <service.icon className="h-6 w-6 text-blue-600" />
                    </div>
                    <p className="text-gray-600">{service.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Section Pourquoi nous choisir */}
        <section className="py-20 bg-slate-900 text-white">
          <div className="container">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-4xl md:text-5xl font-bold mb-6 text-blue-400">
                  Pourquoi Choisir ProClean Empire ?
                </h2>
                <p className="text-xl mb-8 text-gray-300">
                  Le plaisir du propre en vidéo
                </p>
                <div className="space-y-4">
                  {avantages.map((avantage, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <CheckCircle2 className="h-6 w-6 text-blue-400 flex-shrink-0 mt-1" />
                      <span className="text-lg">{avantage}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="relative">
                <img 
                  src="/hero-alt.png" 
                  alt="ProClean Empire en action" 
                  className="rounded-lg shadow-2xl w-full h-auto"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Témoignages Section */}
        <section id="temoignages" className="py-20 bg-gradient-to-b from-blue-50 to-white">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold mb-4 text-blue-900">Avis de nos Clients</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                La satisfaction de nos clients est notre priorité absolue.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {testimonials.map((testimonial, index) => (
                <Card key={index} className="border-2 hover:border-blue-500 transition-colors">
                  <CardHeader>
                    <div className="flex mb-2">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <CardTitle className="text-lg">{testimonial.name}</CardTitle>
                    <CardDescription>{testimonial.role}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 italic">"{testimonial.content}"</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-20 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
          <div className="container max-w-4xl">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">Demandez votre Devis Gratuit</h2>
              <p className="text-lg text-blue-200">
                Remplissez le formulaire ci-dessous et nous vous contacterons dans les 24 heures.
              </p>
            </div>
            <Card className="border-2 border-blue-400">
              <CardContent className="pt-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Nom complet *</Label>
                      <Input
                        id="name"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Jean Dupont"
                        className="border-2 focus:border-blue-500"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="jean.dupont@email.com"
                        className="border-2 focus:border-blue-500"
                      />
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="phone">Téléphone *</Label>
                      <Input
                        id="phone"
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+33 1 23 45 67 89"
                        className="border-2 focus:border-blue-500"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="service">Service souhaité *</Label>
                      <Input
                        id="service"
                        required
                        value={formData.service}
                        onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                        placeholder="Ex: Nettoyage automobile"
                        className="border-2 focus:border-blue-500"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Décrivez vos besoins en détail..."
                      rows={5}
                      className="border-2 focus:border-blue-500"
                    />
                  </div>
                  <Button type="submit" size="lg" className="w-full bg-blue-600 hover:bg-blue-700 text-lg py-6">
                    Envoyer ma demande
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
