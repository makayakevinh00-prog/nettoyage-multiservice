import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { 
  Building2, 
  CheckCircle2, 
  Home as HomeIcon, 
  Sparkles, 
  Star, 
  Trash2, 
  Users, 
  Droplets 
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
      icon: HomeIcon,
      title: "Nettoyage Résidentiel",
      description: "Maisons, appartements, villas. Service régulier ou ponctuel adapté à vos besoins.",
    },
    {
      icon: Building2,
      title: "Nettoyage Commercial",
      description: "Bureaux, commerces, espaces professionnels. Intervention en dehors des heures d'ouverture.",
    },
    {
      icon: Trash2,
      title: "Nettoyage Industriel",
      description: "Entrepôts, usines, sites industriels. Équipement professionnel et normes de sécurité.",
    },
    {
      icon: Droplets,
      title: "Nettoyage de Vitres",
      description: "Vitres, baies vitrées, façades vitrées. Résultat impeccable sans traces.",
    },
    {
      icon: Sparkles,
      title: "Nettoyage Après Travaux",
      description: "Élimination des poussières et débris après rénovation ou construction.",
    },
    {
      icon: Users,
      title: "Nettoyage de Fin de Bail",
      description: "État des lieux impeccable pour récupérer votre caution sans souci.",
    },
  ];

  const tarifs = [
    {
      title: "Formule Essentielle",
      price: "À partir de 25€/h",
      features: [
        "Nettoyage standard",
        "Dépoussiérage",
        "Aspirateur",
        "Nettoyage des sols",
      ],
    },
    {
      title: "Formule Premium",
      price: "À partir de 35€/h",
      features: [
        "Tout de la formule Essentielle",
        "Nettoyage approfondi",
        "Vitres intérieures",
        "Désinfection",
      ],
      popular: true,
    },
    {
      title: "Formule Sur Mesure",
      price: "Sur devis",
      features: [
        "Service personnalisé",
        "Intervention spécialisée",
        "Équipement professionnel",
        "Disponibilité 7j/7",
      ],
    },
  ];

  const testimonials = [
    {
      name: "Marie Dubois",
      role: "Particulier",
      content: "Service impeccable ! L'équipe est professionnelle, ponctuelle et très efficace. Je recommande vivement.",
      rating: 5,
    },
    {
      name: "Jean Martin",
      role: "Gérant de restaurant",
      content: "Nous faisons appel à leurs services depuis 2 ans. Toujours satisfait de la qualité du travail fourni.",
      rating: 5,
    },
    {
      name: "Sophie Laurent",
      role: "Propriétaire",
      content: "Excellent rapport qualité-prix. Le nettoyage de fin de bail était parfait, j'ai récupéré ma caution intégralement.",
      rating: 5,
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-primary/10 via-background to-secondary/10 py-20 md:py-32">
          <div className="container">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  Nettoyage Professionnel Multiservice
                </h1>
                <p className="text-lg md:text-xl text-muted-foreground mb-8">
                  Des espaces impeccables pour votre confort et votre sérénité. 
                  Service de qualité, équipe expérimentée et satisfaction garantie.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button size="lg" asChild>
                    <a href="#contact">Demander un Devis Gratuit</a>
                  </Button>
                  <Button size="lg" variant="outline" asChild>
                    <a href="#services">Découvrir nos Services</a>
                  </Button>
                </div>
              </div>
              <div className="relative">
                <img 
                  src="/hero-cleaning.jpeg" 
                  alt="Équipe de nettoyage professionnelle" 
                  className="rounded-lg shadow-2xl w-full h-auto"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="py-20 bg-muted/30">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Nos Services</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Une gamme complète de services de nettoyage adaptés à tous vos besoins, 
                résidentiels, commerciaux ou industriels.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((service, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                      <service.icon className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle>{service.title}</CardTitle>
                    <CardDescription>{service.description}</CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Tarifs Section */}
        <section id="tarifs" className="py-20">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Nos Tarifs</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Des formules flexibles et transparentes pour répondre à tous les budgets.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {tarifs.map((tarif, index) => (
                <Card 
                  key={index} 
                  className={`relative ${tarif.popular ? 'border-primary shadow-lg scale-105' : ''}`}
                >
                  {tarif.popular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                      <span className="bg-secondary text-secondary-foreground px-4 py-1 rounded-full text-sm font-semibold">
                        Populaire
                      </span>
                    </div>
                  )}
                  <CardHeader>
                    <CardTitle>{tarif.title}</CardTitle>
                    <div className="text-3xl font-bold text-primary mt-2">{tarif.price}</div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {tarif.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start">
                          <CheckCircle2 className="h-5 w-5 text-secondary mr-2 flex-shrink-0 mt-0.5" />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Button className="w-full mt-6" variant={tarif.popular ? "default" : "outline"} asChild>
                      <a href="#contact">Choisir cette formule</a>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Témoignages Section */}
        <section id="temoignages" className="py-20 bg-muted/30">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Ce que disent nos clients</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                La satisfaction de nos clients est notre priorité absolue.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {testimonials.map((testimonial, index) => (
                <Card key={index}>
                  <CardHeader>
                    <div className="flex mb-2">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 fill-accent text-accent" />
                      ))}
                    </div>
                    <CardTitle className="text-lg">{testimonial.name}</CardTitle>
                    <CardDescription>{testimonial.role}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground italic">"{testimonial.content}"</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-20">
          <div className="container max-w-4xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Demandez votre Devis Gratuit</h2>
              <p className="text-lg text-muted-foreground">
                Remplissez le formulaire ci-dessous et nous vous contacterons dans les 24 heures.
              </p>
            </div>
            <Card>
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
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="service">Service souhaité *</Label>
                      <Input
                        id="service"
                        required
                        value={formData.service}
                        onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                        placeholder="Ex: Nettoyage résidentiel"
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
                    />
                  </div>
                  <Button type="submit" size="lg" className="w-full">
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
