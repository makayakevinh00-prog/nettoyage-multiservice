import Header from "@/components/Header";
import AdvancedBookingForm from "@/components/AdvancedBookingForm";
import TestimonialCarousel from "@/components/TestimonialCarousel";

import { 
  Car,
  CheckCircle2, 
  Sofa,
  Building2,
  Waves,
  Leaf,
  Sparkles,
  Shield,
  Droplets,
  Clock3,
  Calendar
} from "lucide-react";
import { useState, useEffect } from "react";
import { useLocation } from "wouter";

export default function Home() {
  const [location] = useLocation();
  const [prefilledService, setPrefilledService] = useState("");
  const [prefilledOption, setPrefilledOption] = useState("");

  useEffect(() => {
    const service = localStorage.getItem('prefilledService');
    const option = localStorage.getItem('prefilledOption');
    if (service) {
      setPrefilledService(service);
      localStorage.removeItem('prefilledService');
    }
    if (option) {
      setPrefilledOption(option);
      localStorage.removeItem('prefilledOption');
    }
  }, [location]);

  const scrollToBooking = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const bookingSection = document.getElementById('booking');
    if (bookingSection) {
      setTimeout(() => {
        bookingSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 0);
    }
  };

  const services = [
    {
      icon: Car,
      title: "Automobile",
      description: "Intérieur et extérieur, lavage haute pression, lustrage.",
      image: "https://private-us-east-1.manuscdn.com/sessionFile/BZI25pAxcT9kro8uC3dqXV/sandbox/1rXszqBGmW569xzzHWSd1N-img-1_1770724145000_na1fn_c2VydmljZS1hdXRvbW9iaWxl.jpg?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvQlpJMjVwQXhjVDlrcm84dUMzZHFYVi9zYW5kYm94LzFyWHN6cUJHbVc1Njl4enpIV1NkMU4taW1nLTFfMTc3MDcyNDE0NTAwMF9uYTFmbl9jMlZ5ZG1salpTMWhkWFJ2Ylc5aWFXeGwuanBnP3gtb3NzLXByb2Nlc3M9aW1hZ2UvcmVzaXplLHdfMTkyMCxoXzE5MjAvZm9ybWF0LHdlYnAvcXVhbGl0eSxxXzgwIiwiQ29uZGl0aW9uIjp7IkRhdGVMZXNzVGhhbiI6eyJBV1M6RXBvY2hUaW1lIjoxNzk4NzYxNjAwfX19XX0_&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=bdh5itY7OpPoYLyd8po1z5leiV4k7zVK2-jmgpFuy0jIo47RL5gSW1pQ-A7SS-1L3WAV3GsBsiTYzqzRJrXi92RejGx6JCuO95bixwn~kDWeHGA2l8X1qeCJbjJSy8XZcVqTUm6nBHdmdhPWzlk60ynRvVNr3k3FTsOgjlk36X~oOZIHtGiO2HEg2xBQVWNO0wM3DMzQB3hr1dUY0Lmpp-HtQ4H2tk3Uzf1MMha~KTJZiH1LRxjl2RNck8OKqtwJFCgAqdgH0toYUZ0MWDdua3MsJgUGTTTbWPgH2GYlkbJMTkkqNB0Ai5fcILnkOSIuEAQlIt69~db6UevRey2b-w__",
      link: "/service-automobile",
    },
    {
      icon: Waves,
      title: "Terrasse",
      description: "Démoussage, nettoyage haute pression, traitement anti-mousse.",
      image: "https://private-us-east-1.manuscdn.com/sessionFile/BZI25pAxcT9kro8uC3dqXV/sandbox/1rXszqBGmW569xzzHWSd1N-img-2_1770724156000_na1fn_c2VydmljZS10ZXJyYXNzZQ.jpg?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvQlpJMjVwQXhjVDlrcm84dUMzZHFYVi9zYW5kYm94LzFyWHN6cUJHbVc1Njl4enpIV1NkMU4taW1nLTJfMTc3MDcyNDE1NjAwMF9uYTFmbl9jMlZ5ZG1salpTMTBaWEp5WVhOelpRLmpwZz94LW9zcy1wcm9jZXNzPWltYWdlL3Jlc2l6ZSx3XzE5MjAsaF8xOTIwL2Zvcm1hdCx3ZWJwL3F1YWxpdHkscV84MCIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTc5ODc2MTYwMH19fV19&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=TXm0bJo9Y-cduerHR4llXDAdCfAJIAqrYt3-zmpUbZRYnXwXfLsw2pFo9wfWfwIvLtl2C1e4fUlKhhgNmaoRGQf~xSH0Kp6YGY4~K3jM2ywH6GNN0g-n-hkD~a5EaLsXQ~ef6N1s3mo62k0Bk8j-A9RJvUQBlK31MxUvLcA-G1Jjhv-dtM5fTuzAwuaerXhXKECatgOzHBYPAFLlpP5e5S6LMYrHGUOHSRGL9eahtk9vB4ZK-iQ9f90TV7aX4xHUcoksE2cHG2rPKAKC6h3dmf7fer8LE4Qoj35QR3~RvyBH6iWD-npf2NGaBaltm8ODoX9ForLOH-CBrQS9pxupXw__",
      link: "/service-terrasse",
    },
    {
      icon: Sofa,
      title: "Tapis & Canapés",
      description: "Injection-extraction, détachage professionnel, séchage rapide.",
      image: "https://private-us-east-1.manuscdn.com/sessionFile/BZI25pAxcT9kro8uC3dqXV/sandbox/1rXszqBGmW569xzzHWSd1N-img-3_1770724151000_na1fn_c2VydmljZS10YXBpcw.jpg?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvQlpJMjVwQXhjVDlrcm84dUMzZHFYVi9zYW5kYm94LzFyWHN6cUJHbVc1Njl4enpIV1NkMU4taW1nLTNfMTc3MDcyNDE1MTAwMF9uYTFmbl9jMlZ5ZG1salpTMTBZWEJwY3cuanBnP3gtb3NzLXByb2Nlc3M9aW1hZ2UvcmVzaXplLHdfMTkyMCxoXzE5MjAvZm9ybWF0LHdlYnAvcXVhbGl0eSxxXzgwIiwiQ29uZGl0aW9uIjp7IkRhdGVMZXNzVGhhbiI6eyJBV1M6RXBvY2hUaW1lIjoxNzk4NzYxNjAwfX19XX0_&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=jKvIP8VCf7ggNGSXeN8udZSX-unEMpf-gRZWc8ol7J~nO4nRiBi5VjXZmiahDhHcroaBNMWMAx15ytl5EKIYkJNCnvBZqmYELEhYHpxqMfrGOdGhjYCfJaJDqf0jBXlTJ2UWG4CNe77yBKCEQnr8QeiRstlIlfYSNOBaFAFZtyp7-RU2mW0WvAqVSU3odoBNgfeMLcOtewazFapnjSzzAnCS6ult39slP9MyPcPLjJo2T05V49tiUB91pGV5Qy9bNeqd1Y4~lCQimbzV2TtJDceWY-wu7wIisKl7dPRNVXlA46NehtsHw8STBEN3aBtwxdqVdNS0-KaC~aD0JPtaLQ__",
      link: "/service/tapis",
    },
    {
      icon: Building2,
      title: "Balcon",
      description: "Nettoyage complet, joints, garde-corps et revêtements.",
      image: "https://private-us-east-1.manuscdn.com/sessionFile/BZI25pAxcT9kro8uC3dqXV/sandbox/1rXszqBGmW569xzzHWSd1N-img-4_1770724142000_na1fn_c2VydmljZS1iYWxjb24.jpg?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvQlpJMjVwQXhjVDlrcm84dUMzZHFYVi9zYW5kYm94LzFyWHN6cUJHbVc1Njl4enpIV1NkMU4taW1nLTRfMTc3MDcyNDE0MjAwMF9uYTFmbl9jMlZ5ZG1salpTMWlZV3hqYjI0LmpwZz94LW9zcy1wcm9jZXNzPWltYWdlL3Jlc2l6ZSx3XzE5MjAsaF8xOTIwL2Zvcm1hdCx3ZWJwL3F1YWxpdHkscV84MCIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTc5ODc2MTYwMH19fV19&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=cSiVk0M7nG2~I61gzJ2pvahPhVpNdZKUEXs0YoFs1utjcOROgjI0KO0ETm1IXuGxJHxDT4o6AkhajugvZ8g8OIXR3lX39lZ5yhgoUC9haM0f10m7a0Sa0sN9Y1c5E6rrWPlbrqSJ8Kn1Gpc-nYhgEv-9pu1yYaEDlg7~DuC2Kn1fhK9n7uhrR0-3ZHN11dnS~eLr-wLPYkLPkpJtGV3oduvyc7qf0RhHTtt9CLfTCEIpGy3O4KUJ0qCHLk2nTfi6QDZ0UgEj36vVY3X5IYX7lwL54FX1NFwKa8qOJV-ZUnQIioQIxodkkOzlglH8i3zFpIcHJUve3QYIgNf-tCbdAA__",
      link: "/service/balcon",
    },
    {
      icon: Leaf,
      title: "Jardinage",
      description: "Entretien paysager, taille, débroussaillage professionnel.",
      image: "https://private-us-east-1.manuscdn.com/sessionFile/BZI25pAxcT9kro8uC3dqXV/sandbox/1rXszqBGmW569xzzHWSd1N-img-5_1770724154000_na1fn_c2VydmljZS1qYXJkaW5hZ2U.jpg?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvQlpJMjVwQXhjVDlrcm84dUMzZHFYVi9zYW5kYm94LzFyWHN6cUJHbVc1Njl4enpIV1NkMU4taW1nLTVfMTc3MDcyNDE1NDAwMF9uYTFmbl9jMlZ5ZG1salpTMXFZWEprYVc1aFoyVS5qcGc~eC1vc3MtcHJvY2Vzcz1pbWFnZS9yZXNpemUsd18xOTIwLGhfMTkyMC9mb3JtYXQsd2VicC9xdWFsaXR5LHFfODAiLCJDb25kaXRpb24iOnsiRGF0ZUxlc3NUaGFuIjp7IkFXUzpFcG9jaFRpbWUiOjE3OTg3NjE2MDB9fX1dfQ__&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=Wb9vhhFwTXtajhtN9f-RcO5LJJmNN2EDBpRAfJoAgFxN1n6~mHEytjKKNlc8R~pXEiidIkj0UEuZkN2jONiLDBIJRXf~Mo27VqXqReK1ax10SlUHgRuC0R8y-Clg0kNAkOqaASXVfkzuZHbwDxjSLKbQi303r83b~eCsBlfkeYCKG74Fh5Vv-210fvfErTyhgU50INI9HF1cb-pBIMQJof~0Za-HAnGCkBojD4m3l32su9nSYl84eKyqLCcBC0-lBqmfxFnYha11JVskH8Se3L75xML9FwFBn3CFiUCa6RZs5g28vQHJXblOfxo5u~lZqbjdYqFO13r-d-BTa2mgJQ__",
      link: "/service/jardinage",
    },
    {
      icon: Building2,
      title: "Façade",
      description: "Nettoyage haute pression, traitement anti-mousse, joints.",
      image: "https://private-us-east-1.manuscdn.com/sessionFile/BZI25pAxcT9kro8uC3dqXV/sandbox/DgBWQCNXBPsMR0d3Cpj3EF-img-1_1770724214000_na1fn_c2VydmljZS1mYWNhZGU.jpg?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvQlpJMjVwQXhjVDlrcm84dUMzZHFYVi9zYW5kYm94L0RnQldRQ05YQlBzTVIwZDNDcGozRUYtaW1nLTFfMTc3MDcyNDIxNDAwMF9uYTFmbl9jMlZ5ZG1salpTMW1ZV05oWkdVLmpwZz94LW9zcy1wcm9jZXNzPWltYWdlL3Jlc2l6ZSx3XzE5MjAsaF8xOTIwL2Zvcm1hdCx3ZWJwL3F1YWxpdHkscV84MCIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTc5ODc2MTYwMH19fV19&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=SZe8fP9JvJGXGZAiE8GNN9YpBOvCYvAvRqFATycDcI4EzSpNAco5lTOwOuKu6STwkf6hmN70kvYrN-6CzpPjED68rTpZTDD8jiohcd9IFTFYQhHKHPKTD4R6ArWZvQ1nOpWfIUUolI9nSeitmVEMaDKYQTnnAT1MQk1FmUnppk8ImFN~HU3aXjIs1kESVRib~7uC7drWzET6DVKlIuJHNz-NPrqh6VMvUefHdynBz38Dib~DUTleSYhBU1fvluXGnaO7rrFSa0wcHmO-MN4v3w4wa0WJKlGpvV8MkaaTBf-OCSLf1WuUBxaqbnQuH-3LvhvMuUmYejqcpgXrgP8THw__",
      link: "/service/facade",
    },
    {
      icon: Droplets,
      title: "Piscine",
      description: "Nettoyage complet, traitement de l'eau, maintenance.",
      image: "https://private-us-east-1.manuscdn.com/sessionFile/BZI25pAxcT9kro8uC3dqXV/sandbox/DgBWQCNXBPsMR0d3Cpj3EF-img-2_1770724213000_na1fn_c2VydmljZS1waXNjaW5l.jpg?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvQlpJMjVwQXhjVDlrcm84dUMzZHFYVi9zYW5kYm94L0RnQldRQ05YQlBzTVIwZDNDcGozRUYtaW1nLTJfMTc3MDcyNDIxMzAwMF9uYTFmbl9jMlZ5ZG1salpTMXdhWE5qYVc1bC5qcGc~eC1vc3MtcHJvY2Vzcz1pbWFnZS9yZXNpemUsd18xOTIwLGhfMTkyMC9mb3JtYXQsd2VicC9xdWFsaXR5LHFfODAiLCJDb25kaXRpb24iOnsiRGF0ZUxlc3NUaGFuIjp7IkFXUzpFcG9jaFRpbWUiOjE3OTg3NjE2MDB9fX1dfQ__&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=KfdC~0ROWmmt6o--37HFXGXjqL43VX3D1Ktzhp0PDf2O6RTM6~Dt7TZ-4ZWK180O8HvJXTmVFmxnQ~gtwB8~caQAoGCxqvFejoqMRj06K5gor7iLEMtYJy2~B4-BX0NF2NRkLBEWct2nThDpUhS2AdVDOLIodszUiQFG5Z86wu4-lCR~WPJ7IKwLQB5M2DChtVuOFRsJ4Tu9LElJrIP-~OnQK~MKIriMCtcvk2NCr-s3~rK4ayZfBUUc3~ii~KGcaoEDEAsQaUm4hYHYFPEDFbeUJj9KpP8rsGrU4Ki13BqvRPK8bD6Y05BP~huiWthP-dkDnJ7gNjIFj2atg~sDPQ__",
      link: "/service/piscine",
    },
  ];

  const stats = [
    { number: "5+", label: "Ans d'Expérience" },
    { number: "1000+", label: "Clients Satisfaits" },
    { number: "7+", label: "Services Disponibles" },
  ];

  const testimonials = [
    {
      name: "Alexandre M.",
      role: "Particulier",
      content: "Service exceptionnel pour le nettoyage de ma voiture. Résultat impeccable !",
      rating: 5,
    },
    {
      name: "Sophie D.",
      role: "Propriétaire",
      content: "J'ai fait nettoyer ma terrasse et mes tapis. Le travail est remarquable.",
      rating: 5,
    },
    {
      name: "Thomas L.",
      role: "Copropriété",
      content: "ProClean Empire intervient régulièrement pour notre immeuble. Toujours à l'heure et efficace.",
      rating: 5,
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section - Style La Providence */}
        <section className="relative h-[calc(100vh-64px)] flex items-center justify-center overflow-hidden">
          {/* Background Image with Enhanced Parallax */}
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: "url('https://files.manuscdn.com/user_upload_by_module/session_file/310519663223121429/uqMDgriLrXWQkJGZ.jpg')",
              backgroundAttachment: 'fixed',
            }}
          />
          
          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-black/50" />
          
          {/* Content - Centered */}
          <div className="relative z-50 container mx-auto px-4 text-center">
            <div className="max-w-3xl mx-auto">
              {/* Main Title */}
              <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
                Le nettoyage professionnel qui redonne vie à vos biens
              </h1>
              
              {/* Subtitle */}
              <p className="text-2xl md:text-3xl text-orange-400 mb-4 font-semibold">
                Auto, Habitat, Jardin. Intervention 7j/7 à domicile.
              </p>
              
              {/* Trust Bar */}
              <div className="flex flex-wrap justify-center gap-6 mb-10 py-6 border-t border-b border-gray-400/30">
                <div className="flex items-center gap-2 text-white">
                  <Clock3 size={20} className="text-orange-400" />
                  <span className="text-sm font-medium">Devis sous 30min</span>
                </div>
                <div className="flex items-center gap-2 text-white">
                  <Leaf size={20} className="text-green-400" />
                  <span className="text-sm font-medium">Éco-responsable</span>
                </div>
                <div className="flex items-center gap-2 text-white">
                  <Calendar size={20} className="text-blue-400" />
                  <span className="text-sm font-medium">7j/7 disponible</span>
                </div>
                <div className="flex items-center gap-2 text-white">
                  <Sparkles size={20} className="text-yellow-400" />
                  <span className="text-sm font-medium">Matériel Pro</span>
                </div>
              </div>
              
              {/* CTA Button */}
              <button 
                type="button"
                onClick={scrollToBooking} 
                className="relative z-50 inline-flex items-center justify-center px-10 py-4 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-full transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg text-lg cursor-pointer border-none pointer-events-auto touch-none select-none"
              >
                Demander mon devis gratuit →
              </button>
              
              {/* Secondary CTA */}
              <p className="text-gray-300 mt-6 text-sm">
                ✓ Sans engagement • ✓ Gratuit • ✓ Réponse rapide
              </p>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="bg-gradient-to-r from-slate-900 to-black py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-3 gap-8 text-center">
              {stats.map((stat, i) => (
                <div key={i} className="text-white">
                  <div className="text-5xl md:text-6xl font-bold text-blue-400 mb-2">{stat.number}</div>
                  <div className="text-gray-300 text-lg">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="py-20 md:py-32 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Nos Services</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Une gamme complète de services de nettoyage professionnel adaptés à tous vos besoins
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service, i) => {
                const Icon = service.icon;
                return (
                  <a
                    key={i}
                    href={service.link}
                    className={`group bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-105 animate-slideUp stagger-${(i % 5) + 1}`}
                  >
                    <div className="relative h-48 overflow-hidden bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 flex items-center justify-center group-hover:from-blue-500 group-hover:via-blue-600 group-hover:to-blue-700 transition-all duration-300">
                      {service.image ? (
                        <img
                          src={service.image}
                          alt={service.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                          loading="lazy"
                          decoding="async"
                        />
                      ) : (
                        <Icon className="w-20 h-20 text-white opacity-90" />
                      )}
                    </div>
                    <div className="p-6">
                      <Icon className="w-8 h-8 text-blue-600 mb-3" />
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{service.title}</h3>
                      <p className="text-gray-600 mb-4">{service.description}</p>
                      <div className="text-blue-600 font-semibold group-hover:text-blue-700">
                        En savoir plus
                      </div>
                    </div>
                  </a>
                );
              })}
            </div>
          </div>
        </section>

        {/* Advantages Section */}
        <section className="py-20 md:py-32 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Pourquoi ProClean Empire</h2>
            </div>

            <div className="grid md:grid-cols-3 gap-12 max-w-4xl mx-auto">
              {[
                { icon: Shield, title: "Professionnel", desc: "Equipe formee" },
                { icon: Sparkles, title: "Qualite", desc: "Resultats garantis" },
                { icon: CheckCircle2, title: "Fiable", desc: "Satisfaction 100%" },
              ].map((item, i) => {
                const Icon = item.icon;
                return (
                  <div key={i} className={`text-center space-y-3 animate-slideUp stagger-${i + 1}`}>
                    <Icon className="w-10 h-10 text-blue-600 mx-auto" />
                    <h3 className="text-lg font-semibold text-gray-900">{item.title}</h3>
                    <p className="text-sm text-gray-600">{item.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Google Reviews Section */}


        {/* Avis Clients Section */}
        <section className="py-20 md:py-32 bg-gradient-to-br from-yellow-50 via-white to-yellow-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <div className="flex justify-center mb-6">
                <span className="text-6xl">⭐</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Nos Clients Nous Font Confiance</h2>
              <p className="text-xl text-gray-600 mb-8">Découvrez les avis vérifiés de nos clients satisfaits</p>
            </div>
            <div className="flex justify-center">
              <a href="https://www.trustpilot.com/review/procleanempire.com" target="_blank" rel="noopener noreferrer" className="inline-block w-full max-w-md">
                <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-8 rounded-xl shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105 text-white text-center">
                  <p className="text-2xl font-bold mb-2">5.0 / 5.0</p>
                  <p className="text-lg font-semibold mb-4">Basé sur 100+ avis clients</p>
                  <p className="text-sm opacity-90">Cliquez pour voir les avis vérifiés de ProClean Empire</p>
                </div>
              </a>
            </div>
          </div>
        </section>

        {/* Booking Section */}
        <section id="booking" className="py-20 md:py-32 bg-white animate-fadeIn">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Réservez Votre Service</h2>
              <p className="text-xl text-gray-600">Remplissez le formulaire ci-dessous pour demander un devis</p>
            </div>
            <AdvancedBookingForm 
              prefilledService={prefilledService}
              prefilledOption={prefilledOption}
            />
          </div>
        </section>






      </main>
    </div>
  );
}
