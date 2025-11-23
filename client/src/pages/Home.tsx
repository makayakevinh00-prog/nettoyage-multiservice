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
import DateTimePicker from "@/components/DateTimePicker";
import FrenchAddressAutocomplete from "@/components/FrenchAddressAutocomplete";

import { 
  Car,
  CheckCircle2, 
  Star,
  Sofa,
  Building2,
  Waves,
  Calendar,
  Clock,
  Leaf,
  Sparkles,
  Shield,
  Clock3
} from "lucide-react";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { trpc } from "@/lib/trpc";
import { useLocation } from "wouter";

export default function Home() {
  const [location] = useLocation();
  
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

  // Gérer la pré-sélection du service depuis l'URL
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const serviceParam = params.get('service');
    if (serviceParam) {
      setBookingData(prev => ({ ...prev, service: serviceParam }));
      // Scroll vers la section réservation
      setTimeout(() => {
        const element = document.querySelector('#reservation');
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  }, [location]);

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
      description: "Lavage intérieur et extérieur, lustrage, protection céramique. Votre véhicule retrouve son éclat d'origine.",
      image: "/service-automobile.jpg",
    },
    {
      icon: Waves,
      title: "Nettoyage Terrasse",
      description: "Démoussage, nettoyage haute pression, traitement anti-mousse. Redonnez vie à vos espaces extérieurs.",
      image: "/service-terrasse.jpg",
    },
    {
      icon: Sofa,
      title: "Nettoyage Tapis & Canapés",
      description: "Injection-extraction professionnelle, détachage en profondeur, séchage rapide et efficace.",
      image: "/service-tapis.jpg",
    },
    {
      icon: Building2,
      title: "Nettoyage Balcon",
      description: "Nettoyage complet des sols, joints, garde-corps. Un balcon impeccable pour profiter de l'extérieur.",
      image: "/service-balcon.jpg",
    },
    {
      icon: Leaf,
      title: "Entretien Jardinage",
      description: "Tonte, taille de haies, débroussaillage, entretien des espaces verts. Un jardin toujours soigné.",
      image: "/service-jardinage.jpg",
    },
  ];

  const avantages = [
    {
      icon: Sparkles,
      title: "Résultats Impeccables",
      description: "Équipements professionnels de dernière génération pour un résultat parfait à chaque intervention.",
    },
    {
      icon: Leaf,
      title: "Produits Écologiques",
      description: "Nous utilisons des produits respectueux de l'environnement et de votre santé.",
    },
    {
      icon: Shield,
      title: "Équipe Qualifiée",
      description: "Professionnels formés et expérimentés, assurés et garantis pour votre tranquillité.",
    },
    {
      icon: Clock3,
      title: "Intervention Rapide",
      description: "Service disponible partout en Île-de-France avec des délais d'intervention courts.",
    },
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
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-white via-blue-50/30 to-white">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative min-h-[650px] flex items-center bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 overflow-hidden">
          <div className="absolute inset-0 bg-[url('/hero-proclean.png')] bg-cover bg-center opacity-20"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/40 to-transparent"></div>
          
          <div className="container relative z-10 py-24">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="text-white space-y-8">
                <div className="inline-block px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
                  <span className="text-sm font-semibold text-white">✨ Service Premium en Île-de-France</span>
                </div>
                
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
                  <span className="text-white">PROCLEAN</span>{" "}
                  <span className="text-blue-200">EMPIRE</span>
                </h1>
                
                <p className="text-2xl md:text-3xl font-semibold text-blue-100">
                  Nettoyage Premium Multiservice
                </p>
                
                <p className="text-xl text-blue-50 leading-relaxed max-w-xl">
                  Votre partenaire de confiance pour le nettoyage professionnel de vos véhicules, 
                  terrasses, tapis, balcons et jardins. Excellence et satisfaction garanties.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <Button 
                    size="lg" 
                    className="bg-white text-blue-700 hover:bg-blue-50 text-lg px-8 py-6 shadow-xl hover:shadow-2xl transition-all duration-300"
                    asChild
                  >
                    <a href="#reservation">Réserver Maintenant</a>
                  </Button>
                  <Button 
                    size="lg" 
                    variant="outline" 
                    className="bg-transparent border-2 border-white text-white hover:bg-white/10 text-lg px-8 py-6"
                    asChild
                  >
                    <a href="#services">Découvrir nos Services</a>
                  </Button>
                </div>
              </div>
              
              <div className="relative hidden lg:block">
                <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white/20">
                  <img 
                    src="/hero-proclean.png" 
                    alt="ProClean Empire - Nettoyage professionnel" 
                    className="w-full h-auto"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section Services */}
        <section id="services" className="py-24 bg-white">
          <div className="container">
            <div className="text-center mb-16">
              <div className="inline-block px-4 py-2 bg-blue-100 rounded-full mb-4">
                <span className="text-sm font-semibold text-blue-700">NOS PRESTATIONS</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
                Des Services d'Excellence
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Découvrez notre gamme complète de services de nettoyage professionnel 
                pour redonner éclat et propreté à tous vos espaces.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service, index) => (
                <Card 
                  key={index} 
                  className="group hover:shadow-2xl transition-all duration-300 border-2 hover:border-blue-400 overflow-hidden bg-white"
                >
                  <div className="relative h-64 overflow-hidden">
                    <img 
                      src={service.image} 
                      alt={service.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
                    <div className="absolute top-4 right-4 w-14 h-14 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-lg">
                      <service.icon className="h-7 w-7 text-blue-600" />
                    </div>
                  </div>
                  <CardHeader>
                    <CardTitle className="text-2xl text-gray-900 group-hover:text-blue-600 transition-colors">
                      {service.title}
                    </CardTitle>
                    <CardDescription className="text-base text-gray-600 leading-relaxed">
                      {service.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button 
                      className="w-full bg-blue-600 hover:bg-blue-700"
                      onClick={() => {
                        const serviceValue = service.title.toLowerCase().includes('automobile') ? 'automobile' :
                                           service.title.toLowerCase().includes('terrasse') ? 'terrasse' :
                                           service.title.toLowerCase().includes('tapis') ? 'tapis' :
                                           service.title.toLowerCase().includes('balcon') ? 'balcon' : 'jardinage';
                        setBookingData(prev => ({ ...prev, service: serviceValue }));
                        setTimeout(() => {
                          const element = document.querySelector('#reservation');
                          if (element) {
                            element.scrollIntoView({ behavior: 'smooth' });
                          }
                        }, 100);
                      }}
                    >
                      Réserver ce Service
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Section Pourquoi nous choisir */}
        <section className="py-24 bg-gradient-to-br from-blue-50 via-white to-blue-50">
          <div className="container">
            <div className="text-center mb-16">
              <div className="inline-block px-4 py-2 bg-blue-100 rounded-full mb-4">
                <span className="text-sm font-semibold text-blue-700">NOS ATOUTS</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
                Pourquoi Choisir ProClean Empire ?
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Une expertise reconnue et un engagement qualité pour votre satisfaction totale.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {avantages.map((avantage, index) => (
                <Card key={index} className="text-center border-2 hover:border-blue-400 hover:shadow-xl transition-all duration-300 bg-white">
                  <CardHeader>
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center mx-auto mb-4 shadow-lg">
                      <avantage.icon className="h-8 w-8 text-white" />
                    </div>
                    <CardTitle className="text-xl text-gray-900">{avantage.title}</CardTitle>
                    <CardDescription className="text-base text-gray-600 leading-relaxed">
                      {avantage.description}
                    </CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Section Réservation */}
        <section id="reservation" className="py-24 bg-white">
          <div className="container max-w-4xl">
            <div className="text-center mb-12">
              <div className="inline-block px-4 py-2 bg-blue-100 rounded-full mb-4">
                <span className="text-sm font-semibold text-blue-700">RÉSERVATION</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
                Réservez Votre Intervention
              </h2>
              <p className="text-xl text-gray-600">
                Choisissez votre service, date et heure. Nous vous confirmerons rapidement votre rendez-vous.
              </p>
            </div>
            
            <Card className="border-2 border-blue-200 shadow-xl bg-white">
              <CardContent className="pt-8">
                <form onSubmit={handleBooking} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="booking-name" className="text-gray-700 font-medium">Nom complet *</Label>
                      <Input
                        id="booking-name"
                        required
                        value={bookingData.name}
                        onChange={(e) => setBookingData({ ...bookingData, name: e.target.value })}
                        placeholder="Jean Dupont"
                        className="border-2 border-gray-200 focus:border-blue-500 h-12"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="booking-email" className="text-gray-700 font-medium">Email *</Label>
                      <Input
                        id="booking-email"
                        type="email"
                        required
                        value={bookingData.email}
                        onChange={(e) => setBookingData({ ...bookingData, email: e.target.value })}
                        placeholder="jean.dupont@email.com"
                        className="border-2 border-gray-200 focus:border-blue-500 h-12"
                      />
                    </div>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="booking-phone" className="text-gray-700 font-medium">Téléphone *</Label>
                      <Input
                        id="booking-phone"
                        type="tel"
                        required
                        value={bookingData.phone}
                        onChange={(e) => setBookingData({ ...bookingData, phone: e.target.value })}
                        placeholder="06 12 34 56 78"
                        className="border-2 border-gray-200 focus:border-blue-500 h-12"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="booking-service" className="text-gray-700 font-medium">Service souhaité *</Label>
                      <Select 
                        value={bookingData.service} 
                        onValueChange={(value) => setBookingData({ ...bookingData, service: value })}
                      >
                        <SelectTrigger className="border-2 border-gray-200 focus:border-blue-500 h-12">
                          <SelectValue placeholder="Choisir un service" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="automobile">Nettoyage Automobile</SelectItem>
                          <SelectItem value="terrasse">Nettoyage Terrasse</SelectItem>
                          <SelectItem value="tapis">Nettoyage Tapis & Canapés</SelectItem>
                          <SelectItem value="balcon">Nettoyage Balcon</SelectItem>
                          <SelectItem value="jardinage">Entretien Jardinage</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <DateTimePicker
                    selectedDate={bookingData.date}
                    selectedTime={bookingData.time}
                    onDateChange={(date) => setBookingData({ ...bookingData, date })}
                    onTimeChange={(time) => setBookingData({ ...bookingData, time })}
                  />
                  
                  <div className="space-y-2">
                    <Label htmlFor="booking-address" className="text-gray-700 font-medium">Adresse d'intervention *</Label>
                    <FrenchAddressAutocomplete
                      id="booking-address"
                      required
                      value={bookingData.address}
                      onChange={(value) => setBookingData({ ...bookingData, address: value })}
                      placeholder="Commencez à taper votre adresse..."
                      className="border-2 border-gray-200 focus:border-blue-500 h-12"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="booking-message" className="text-gray-700 font-medium">Informations complémentaires</Label>
                    <Textarea
                      id="booking-message"
                      value={bookingData.message}
                      onChange={(e) => setBookingData({ ...bookingData, message: e.target.value })}
                      placeholder="Précisions sur votre demande..."
                      rows={4}
                      className="border-2 border-gray-200 focus:border-blue-500"
                    />
                  </div>
                  
                  <Button 
                    type="submit" 
                    size="lg" 
                    className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white text-lg py-6 shadow-lg hover:shadow-xl transition-all duration-300"
                    disabled={sendBookingMutation.isPending}
                  >
                    {sendBookingMutation.isPending ? "Envoi en cours..." : "Confirmer ma Réservation"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Témoignages */}
        <section id="temoignages" className="py-24 bg-gradient-to-br from-blue-50 via-white to-blue-50">
          <div className="container">
            <div className="text-center mb-16">
              <div className="inline-block px-4 py-2 bg-blue-100 rounded-full mb-4">
                <span className="text-sm font-semibold text-blue-700">TÉMOIGNAGES</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
                Ils Nous Font Confiance
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                La satisfaction de nos clients est notre plus belle récompense.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {testimonials.map((testimonial, index) => (
                <Card key={index} className="border-2 hover:border-blue-400 hover:shadow-xl transition-all duration-300 bg-white">
                  <CardHeader>
                    <div className="flex mb-3">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <CardTitle className="text-xl text-gray-900">{testimonial.name}</CardTitle>
                    <CardDescription className="text-blue-600 font-medium">{testimonial.role}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 italic leading-relaxed">"{testimonial.content}"</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-24 bg-white">
          <div className="container max-w-4xl">
            <div className="text-center mb-12">
              <div className="inline-block px-4 py-2 bg-blue-100 rounded-full mb-4">
                <span className="text-sm font-semibold text-blue-700">CONTACT</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
                Demandez Votre Devis Gratuit
              </h2>
              <p className="text-xl text-gray-600">
                Remplissez le formulaire ci-dessous et nous vous contacterons dans les 24 heures.
              </p>
            </div>
            
            <Card className="border-2 border-blue-200 shadow-xl bg-white">
              <CardContent className="pt-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-gray-700 font-medium">Nom complet *</Label>
                      <Input
                        id="name"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Jean Dupont"
                        className="border-2 border-gray-200 focus:border-blue-500 h-12"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-gray-700 font-medium">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="jean.dupont@email.com"
                        className="border-2 border-gray-200 focus:border-blue-500 h-12"
                      />
                    </div>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="phone" className="text-gray-700 font-medium">Téléphone *</Label>
                      <Input
                        id="phone"
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="06 17 21 22 30"
                        className="border-2 border-gray-200 focus:border-blue-500 h-12"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="service" className="text-gray-700 font-medium">Service souhaité *</Label>
                      <Input
                        id="service"
                        required
                        value={formData.service}
                        onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                        placeholder="Ex: Nettoyage automobile"
                        className="border-2 border-gray-200 focus:border-blue-500 h-12"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="message" className="text-gray-700 font-medium">Message</Label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Décrivez vos besoins en détail..."
                      rows={5}
                      className="border-2 border-gray-200 focus:border-blue-500"
                    />
                  </div>
                  
                  <Button 
                    type="submit" 
                    size="lg" 
                    className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white text-lg py-6 shadow-lg hover:shadow-xl transition-all duration-300"
                    disabled={sendQuoteMutation.isPending}
                  >
                    {sendQuoteMutation.isPending ? "Envoi en cours..." : "Envoyer ma Demande"}
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
