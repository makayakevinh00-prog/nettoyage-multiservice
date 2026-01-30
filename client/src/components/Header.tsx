import { Button } from "@/components/ui/button";
import { APP_LOGO } from "@/const";
import { Menu, X, ChevronDown } from "lucide-react";
import { useState } from "react";
import { Link } from "wouter";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);

  const services = [
    { name: "Automobile", href: "/#booking", service: "automobile" },
    { name: "Terrasse", href: "/#booking", service: "terrasse" },
    { name: "Tapis & Canapés", href: "/#booking", service: "tapis" },
    { name: "Balcon", href: "/#booking", service: "balcon" },
    { name: "Façade", href: "/#booking", service: "facade" },
    { name: "Panneaux Solaires", href: "/#booking", service: "panneaux" },
    { name: "Jardinage", href: "/#booking", service: "jardinage" },
  ];

  const navItems = [
    { href: "/", label: "Accueil" },
    { label: "Services", submenu: services },
    { href: "/avis", label: "Avis clients" },
    { label: "Professionnels", href: "/professionnels" },
    { href: "#contact", label: "Contact" },
    { href: "/my-bookings", label: "Mes réservations" },
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
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <a 
          href="#" 
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="flex items-center space-x-2 hover:opacity-80 transition-opacity cursor-pointer flex-shrink-0"
        >
          <img src={APP_LOGO} alt="ProClean Empire" className="h-10 w-auto" />
          <span className="text-lg font-bold text-gray-900 hidden sm:inline">ProClean <span className="text-blue-600">Empire</span></span>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-1">
          {navItems.map((item) => (
            <div key={item.label} className="relative group">
              {item.submenu ? (
                <button className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors flex items-center gap-1 rounded-md hover:bg-gray-50">
                  {item.label}
                  <ChevronDown size={16} className="group-hover:rotate-180 transition-transform" />
                </button>
              ) : (
                <a
                  href={item.href}
                  onClick={(e) => scrollToSection(e, item.href || "")}
                  className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors rounded-md hover:bg-gray-50"
                >
                  {item.label}
                </a>
              )}

              {/* Desktop Submenu */}
              {item.submenu && (
                <div className="absolute left-0 mt-0 w-48 bg-white border border-gray-200 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 py-2">
                  {item.submenu.map((subitem, idx) => (
                    <a
                      key={`submenu-${idx}`}
                      href={subitem.href}
                      onClick={(e) => {
                        e.preventDefault();
                        localStorage.setItem('prefilledService', (subitem as any).service || '');
                        window.location.href = '/#booking';
                      }}
                      className="block px-4 py-2 text-sm text-gray-700 hover:text-blue-600 hover:bg-gray-50 transition-colors"
                    >
                      {subitem.name}
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Social Media Links */}
        <div className="hidden md:flex items-center gap-3 mr-4">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700 transition-colors" title="Facebook">
            <span className="text-lg">f</span>
          </a>
          <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" className="text-black hover:text-gray-700 transition-colors" title="TikTok">
            <span className="text-lg">♪</span>
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-pink-600 hover:text-pink-700 transition-colors" title="Instagram">
            <span className="text-lg">📷</span>
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-blue-700 hover:text-blue-800 transition-colors" title="LinkedIn">
            <span className="text-lg">in</span>
          </a>
        </div>

        {/* CTA Button */}
        <div className="hidden lg:flex items-center gap-2">
          <Button variant="outline" className="text-sm" asChild>
            <Link href="/my-bookings">Mes réservations</Link>
          </Button>
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
        <div className="lg:hidden border-t bg-white animate-in fade-in slide-in-from-top-2">
          <nav className="container flex flex-col space-y-1 py-4">
            {navItems.map((item) => (
              <div key={item.label}>
                {item.submenu ? (
                  <>
                    <button
                      onClick={() => setOpenSubmenu(openSubmenu === item.label ? null : item.label)}
                      className="w-full text-left px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md transition-colors flex items-center justify-between"
                    >
                      {item.label}
                      <ChevronDown 
                        size={16} 
                        className={`transition-transform ${openSubmenu === item.label ? 'rotate-180' : ''}`}
                      />
                    </button>
                    {openSubmenu === item.label && (
                      <div className="pl-4 space-y-1 mt-1">
                        {item.submenu.map((subitem, idx) => (
                          <a
                            key={`mobile-submenu-${idx}`}
                            href={subitem.href}
                            onClick={(e) => {
                              e.preventDefault();
                              localStorage.setItem('prefilledService', (subitem as any).service || '');
                              window.location.href = '/#booking';
                              setIsMenuOpen(false);
                            }}
                            className="block px-3 py-2 text-sm text-gray-600 hover:text-blue-600 hover:bg-gray-50 rounded-md transition-colors"
                          >
                            {subitem.name}
                          </a>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <a
                    href={item.href}
                    onClick={(e) => {
                      scrollToSection(e, item.href || "");
                      setIsMenuOpen(false);
                    }}
                    className="block px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md transition-colors"
                  >
                    {item.label}
                  </a>
                )}
              </div>
            ))}
            <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white mt-4" asChild>
              <a href="#booking" onClick={(e) => scrollToSection(e, "#booking")}>
                Réserver maintenant
              </a>
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
}
