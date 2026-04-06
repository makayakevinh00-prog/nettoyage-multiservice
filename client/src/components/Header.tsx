import { useState } from "react";
import { ChevronDown, Menu, X, LogOut } from "lucide-react";
import { Button } from "./ui/button";
import { Link } from "wouter";
import DarkModeToggle from "./DarkModeToggle";
import { APP_LOGO, getLoginUrl } from "@/const";
import { useAuth } from "@/_core/hooks/useAuth";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);
  const { user, logout, isAuthenticated } = useAuth();

  const services = [
    { name: "Automobile", href: "/service-automobile", service: "automobile" },
    { name: "Terrasse", href: "/service-terrasse", service: "terrasse" },
    { name: "Tapis & Canaпés", href: "/service-tapis", service: "tapis" },
    { name: "Balcon", href: "/service-balcon", service: "balcon" },
    { name: "Façade", href: "/service-facade", service: "facade" },
    { name: "Jardinage", href: "/service-jardinage", service: "jardinage" },
    { name: "Piscine", href: "/service-piscine", service: "piscine" },
  ];

  const navItems = [
    { href: "/", label: "Accueil" },
    { href: "/abonnements-auto", label: "🚗 Abonnements Auto", highlight: true },
    { label: "Services", submenu: services },
    { href: "/avis", label: "Avis clients" },
    { label: "Professionnels", href: "/professionnels" },
    { href: "/contact", label: "Contact" },
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

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/90 shadow-sm dark:bg-gray-900/95 dark:border-gray-800">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <Link 
          href="/" 
          onClick={scrollToTop}
          className="flex items-center space-x-2 hover:opacity-80 transition-opacity cursor-pointer flex-shrink-0"
        >
          <img src={APP_LOGO} alt="ProClean Empire" className="h-10 w-auto" />
          <span className="text-lg font-bold text-gray-900 hidden sm:inline dark:text-white">ProClean <span className="text-blue-600">Empire</span></span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-1">
          {navItems.map((item) => (
            <div key={item.label} className="relative group">
              {item.submenu ? (
                <>
                  <button className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 transition-colors flex items-center gap-1">
                    {item.label}
                    <ChevronDown size={16} />
                  </button>
                  <div className="absolute left-0 mt-0 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                    {item.submenu.map((subitem) => (
                      <Link
                        key={subitem.name}
                        href={subitem.href}
                        className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-gray-700 hover:text-blue-600 dark:hover:text-blue-400 first:rounded-t-md last:rounded-b-md transition-colors"
                      >
                        {subitem.name}
                      </Link>
                    ))}
                  </div>
                </>
              ) : (
                <Link
                  href={item.href || "/"}
                  className={`px-3 py-2 text-sm font-medium transition-colors ${
                    (item as any).highlight
                      ? "bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-lg hover:from-blue-700 hover:to-blue-600 shadow-md"
                      : "text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400"
                  }`}
                >
                  {item.label}
                </Link>
              )}
            </div>
          ))}
        </nav>

        {/* Trustpilot Badge */}
        <a 
          href="https://fr.trustpilot.com/review/procleanempire.com" 
          target="_blank" 
          rel="noopener noreferrer"
          className="hidden sm:flex items-center gap-1 px-3 py-1 bg-yellow-50 dark:bg-yellow-900/20 rounded-full hover:bg-yellow-100 dark:hover:bg-yellow-900/30 transition-colors"
          title="Voir nos avis Trustpilot"
        >
          <span className="text-yellow-500">⭐</span>
          <span className="text-xs font-semibold text-yellow-700 dark:text-yellow-400">4.1/5</span>
        </a>

        {/* Social Icons */}
        <div className="hidden md:flex items-center gap-3">
          <a href="https://www.facebook.com/people/Proclean-Empire/61575993812750/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors" title="Facebook">
            <span className="text-lg">f</span>
          </a>
          <a href="https://www.tiktok.com/@procleanempire" target="_blank" rel="noopener noreferrer" className="text-black hover:text-gray-700 dark:text-white dark:hover:text-gray-300 transition-colors" title="TikTok">
            <span className="text-lg">♪</span>
          </a>
          <a href="https://www.instagram.com/proclean_empire/" target="_blank" rel="noopener noreferrer" className="text-pink-600 hover:text-pink-700 dark:text-pink-400 dark:hover:text-pink-300 transition-colors" title="Instagram">
            <span className="text-lg">📷</span>
          </a>

        </div>

        {/* CTA Button */}
        <div className="hidden lg:flex items-center gap-2">
          <DarkModeToggle />
          <Button className="bg-blue-600 hover:bg-blue-700 text-white text-sm" asChild>
            <a href="#booking" onClick={(e) => scrollToSection(e, "#booking")}>
              Réserver
            </a>
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden p-2"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="lg:hidden border-t bg-white dark:bg-gray-800 dark:border-gray-700 animate-in fade-in slide-in-from-top-2">
          <nav className="container flex flex-col space-y-1 py-4">
            {navItems.map((item) => (
              <div key={item.label}>
                {item.submenu ? (
                  <>
                    <button
                      onClick={() => setOpenSubmenu(openSubmenu === item.label ? null : item.label)}
                      className="w-full text-left px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-md transition-colors flex items-center justify-between"
                    >
                      {item.label}
                      <ChevronDown 
                        size={16}
                        className={`transform transition-transform ${openSubmenu === item.label ? "rotate-180" : ""}`}
                      />
                    </button>
                    {openSubmenu === item.label && (
                      <div className="pl-4 space-y-1">
                        {item.submenu.map((subitem) => (
                          <Link
                            key={subitem.name}
                            href={subitem.href}
                            className="block px-3 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 rounded-md transition-colors"
                            onClick={() => setIsMenuOpen(false)}
                          >
                            {subitem.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <Link
                    href={item.href || "/"}
                    className={`block px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                      (item as any).highlight
                        ? "bg-gradient-to-r from-blue-600 to-blue-500 text-white hover:from-blue-700 hover:to-blue-600"
                        : "text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-700"
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                )
              </div>
            ))}
            <div className="border-t pt-4 mt-4 space-y-2">
              {isAuthenticated ? (
                <>
                  <Link href="/my-bookings" className="block px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-md transition-colors" onClick={() => setIsMenuOpen(false)}>
                    Mes réservations
                  </Link>
                </>
              ) : (
                <>
                  <Button variant="outline" className="w-full text-sm" asChild>
                    <a href={getLoginUrl()}>Connexion</a>
                  </Button>
                  <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white text-sm" asChild>
                    <a href="#booking" onClick={(e) => { scrollToSection(e, "#booking"); setIsMenuOpen(false); }}>
                      Reserver
                    </a>
                  </Button>
                </>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
