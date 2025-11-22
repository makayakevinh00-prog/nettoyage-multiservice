import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { 
  Car,
  CheckCircle2, 
  Star,
  Sofa,
  Building2,
  Waves,
  Calendar,
  Clock,
  Euro
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { trpc } from "@/lib/trpc";

export default function Home() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });

  const [bookingData, setBookingData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    date: "",
    time: "",
    address: "",
    message: "",
  });

  const sendQuoteMutation = trpc.contact.sendQuote.useMutation({
    onSuccess: () => {
      toast.success("Merci ! Nous vous contacterons sous 24h.");
      setFormData({ name: "", email: "", phone: "", service: "", message: "" });
    },
    onError: (error) => {
      toast.error("Une erreur est survenue. Veuillez réessayer.");
      console.error(error);
    },
  });

  const sendBookingMutation = trpc.contact.sendBooking.useMutation({
    onSuccess: () => {
      toast.success("Votre réservation a été envoyée ! Nous vous confirmerons rapidement.");
      setBookingData({ name: "", email: "", phone: "", service: "", date: "", time: "", address: "", message: "" });
    },
    onError: (error) => {
      toast.error("Une erreur est survenue. Veuillez réessayer.");
      console.error(error);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendQuoteMutation.mutate(formData);
  };

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    sendBookingMutation.mutate(bookingData);
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

  const tarifs = [
    {
      service: "Nettoyage Automobile",
      items: [
        { name: "Lavage extérieur simple", price: "25€" },
        { name: "Lavage extérieur + intérieur", price: "45€" },
        { name: "Lavage complet + lustrage", price: "80€" },
        { name: "Detailing premium", price: "150€" },
      ],
    },
    {
      service: "Nettoyage Terrasse",
      items: [
        { name: "Terrasse jusqu'à 20m²", price: "80€" },
        { name: "Terrasse 20-40m²", price: "140€" },
        { name: "Terrasse 40-60m²", price: "200€" },
        { name: "Traitement anti-mousse", price: "+30€" },
      ],
    },
    {
      service: "Nettoyage Tapis & Canapés",
      items: [
        { name: "Tapis petit format (< 3m²)", price: "40€" },
        { name: "Tapis moyen format (3-6m²)", price: "70€" },
        { name: "Tapis grand format (> 6m²)", price: "100€" },
        { name: "Canapé 2-3 places", price: "80€" },
      ],
    },
    {
      service: "Nettoyage Balcon",
      items: [
        { name: "Balcon standard", price: "50€" },
        { name: "Balcon avec garde-corps", price: "70€" },
        { name: "Grand balcon/loggia", price: "100€" },
        { name: "Nettoyage joints", price: "+20€" },
      ],
    },
  ];

  const gallery = [
    {
      title: "Nettoyage Automobile",
      before: "/gallery-car-before.jpg",
      after: "/gallery-car-after.jpg",
    },
    {
      title: "Nettoyage Terrasse",
      before: "/gallery-terrace-before.jpg",
      after: "/gallery-terrace-after.jpg",
    },
    {
      title: "Nettoyage Tapis",
      before: "/gallery-carpet-before.jpg",
      after: "/gallery-carpet-after.jpg",
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
                    <a href="#reservation">Réserver en Ligne</a>
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

        {/* Section Services */}
        <section id="services" className="py-20 bg-gradient-to-b from-white to-blue-50">
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

        {/* Section Galerie Avant/Après */}
        <section id="galerie" className="py-20 bg-white">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold mb-4 text-blue-900">
                Nos Réalisations Avant/Après
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Découvrez la transformation spectaculaire de nos interventions professionnelles.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {gallery.map((item, index) => (
                <Card key={index} className="overflow-hidden border-2 hover:border-blue-500 transition-colors">
                  <CardHeader>
                    <CardTitle className="text-center text-blue-900">{item.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <p className="text-sm font-semibold text-gray-600 mb-2">AVANT</p>
                      <img 
                        src={item.before} 
                        alt={`${item.title} - Avant`}
                        className="w-full h-48 object-cover rounded-lg"
                      />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-green-600 mb-2">APRÈS</p>
                      <img 
                        src={item.after} 
                        alt={`${item.title} - Après`}
                        className="w-full h-48 object-cover rounded-lg"
                      />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Section Tarifs */}
        <section id="tarifs" className="py-20 bg-gradient-to-b from-blue-50 to-white">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold mb-4 text-blue-900">
                Nos Tarifs
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Des prix transparents et compétitifs pour tous nos services de nettoyage.
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
              {tarifs.map((tarif, index) => (
                <Card key={index} className="border-2 hover:border-blue-500 transition-colors">
                  <CardHeader className="bg-blue-900 text-white">
                    <CardTitle className="flex items-center">
                      <Euro className="mr-2 h-5 w-5" />
                      {tarif.service}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <ul className="space-y-3">
                      {tarif.items.map((item, idx) => (
                        <li key={idx} className="flex justify-between items-center pb-3 border-b last:border-b-0">
                          <span className="text-gray-700">{item.name}</span>
                          <span className="font-bold text-blue-900">{item.price}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Section Réservation en Ligne */}
        <section id="reservation" className="py-20 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
          <div className="container max-w-4xl">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
                Réservez Votre Intervention
              </h2>
              <p className="text-lg text-blue-200">
                Choisissez votre service, date et heure. Nous vous confirmerons rapidement.
              </p>
            </div>
            <Card className="border-2 border-blue-400">
              <CardContent className="pt-6">
                <form onSubmit={handleBooking} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="booking-name">Nom complet *</Label>
                      <Input
                        id="booking-name"
                        required
                        value={bookingData.name}
                        onChange={(e) => setBookingData({ ...bookingData, name: e.target.value })}
                        placeholder="Jean Dupont"
                        className="border-2 focus:border-blue-500"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="booking-email">Email *</Label>
                      <Input
                        id="booking-email"
                        type="email"
                        required
                        value={bookingData.email}
                        onChange={(e) => setBookingData({ ...bookingData, email: e.target.value })}
                        placeholder="jean.dupont@email.com"
                        className="border-2 focus:border-blue-500"
                      />
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="booking-phone">Téléphone *</Label>
                      <Input
                        id="booking-phone"
                        type="tel"
                        required
                        value={bookingData.phone}
                        onChange={(e) => setBookingData({ ...bookingData, phone: e.target.value })}
                        placeholder="06 12 34 56 78"
                        className="border-2 focus:border-blue-500"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="booking-service">Service souhaité *</Label>
                      <Select 
                        value={bookingData.service} 
                        onValueChange={(value) => setBookingData({ ...bookingData, service: value })}
                      >
                        <SelectTrigger className="border-2 focus:border-blue-500">
                          <SelectValue placeholder="Choisir un service" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="automobile">Nettoyage Automobile</SelectItem>
                          <SelectItem value="terrasse">Nettoyage Terrasse</SelectItem>
                          <SelectItem value="tapis">Nettoyage Tapis</SelectItem>
                          <SelectItem value="balcon">Nettoyage Balcon</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="booking-date">Date souhaitée *</Label>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                        <Input
                          id="booking-date"
                          type="date"
                          required
                          value={bookingData.date}
                          onChange={(e) => setBookingData({ ...bookingData, date: e.target.value })}
                          className="border-2 focus:border-blue-500 pl-10"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="booking-time">Heure souhaitée *</Label>
                      <div className="relative">
                        <Clock className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                        <Input
                          id="booking-time"
                          type="time"
                          required
                          value={bookingData.time}
                          onChange={(e) => setBookingData({ ...bookingData, time: e.target.value })}
                          className="border-2 focus:border-blue-500 pl-10"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="booking-address">Adresse d'intervention *</Label>
                    <Input
                      id="booking-address"
                      required
                      value={bookingData.address}
                      onChange={(e) => setBookingData({ ...bookingData, address: e.target.value })}
                      placeholder="12 Rue de la République, 75001 Paris"
                      className="border-2 focus:border-blue-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="booking-message">Informations complémentaires</Label>
                    <Textarea
                      id="booking-message"
                      value={bookingData.message}
                      onChange={(e) => setBookingData({ ...bookingData, message: e.target.value })}
                      placeholder="Précisions sur votre demande..."
                      rows={4}
                      className="border-2 focus:border-blue-500"
                    />
                  </div>
                  <Button 
                    type="submit" 
                    size="lg" 
                    className="w-full bg-blue-600 hover:bg-blue-700 text-lg py-6"
                    disabled={sendBookingMutation.isPending}
                  >
                    {sendBookingMutation.isPending ? "Envoi en cours..." : "Confirmer ma Réservation"}
                  </Button>
                </form>
              </CardContent>
            </Card>
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
                        placeholder="06 17 21 22 30"
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
                  <Button 
                    type="submit" 
                    size="lg" 
                    className="w-full bg-blue-600 hover:bg-blue-700 text-lg py-6"
                    disabled={sendQuoteMutation.isPending}
                  >
                    {sendQuoteMutation.isPending ? "Envoi en cours..." : "Envoyer ma demande"}
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
