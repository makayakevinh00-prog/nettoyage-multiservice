import { Button } from "@/components/ui/button";
import { APP_LOGO } from "@/const";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Link } from "wouter";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { href: "/", label: "Accueil" },
    { href: "#services", label: "Services" },
    { href: "#temoignages", label: "Avis clients" },
    { href: "/professionnels", label: "Professionnels" },
    { href: "#contact", label: "Contact" },
  ];

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith("#")) {
      e.preventDefault();
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
        setIsMenuOpen(false);
      }
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/90 shadow-sm">
      <div className="container flex h-20 items-center justify-between">
        <a 
          href="#" 
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="flex items-center space-x-3 hover:opacity-80 transition-opacity cursor-pointer"
        >
          <img src={APP_LOGO} alt="ProClean Empire" className="h-12 w-auto" />
          <span className="text-2xl font-bold text-blue-900">ProClean Empire</span>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={(e) => scrollToSection(e, item.href)}
              className="text-base font-medium transition-colors hover:text-blue-600 text-gray-700"
            >
              {item.label}
            </a>
          ))}
          <Button className="bg-blue-600 hover:bg-blue-700" asChild>
            <a href="#contact" onClick={(e) => scrollToSection(e, "#contact")}>
              Prestations
            </a>
          </Button>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden border-t bg-white">
          <nav className="container flex flex-col space-y-4 py-4">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => scrollToSection(e, item.href)}
                className="text-base font-medium transition-colors hover:text-blue-600 text-gray-700"
              >
                {item.label}
              </a>
            ))}
            <Button className="w-full bg-blue-600 hover:bg-blue-700" asChild>
              <a href="#contact" onClick={(e) => scrollToSection(e, "#contact")}>
                Prestations
              </a>
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
}
