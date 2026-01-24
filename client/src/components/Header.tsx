import { Button } from "@/components/ui/button";
import { APP_LOGO } from "@/const";
import { Menu, X, ChevronDown } from "lucide-react";
import { useState } from "react";
import { Link } from "wouter";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);

  const services = [
    { name: "Automobile", href: "/service/automobile" },
    { name: "Terrasse", href: "/service/terrasse" },
    { name: "Tapis & Canapés", href: "/service/tapis" },
    { name: "Balcon", href: "/service/balcon" },
    { name: "Façade", href: "/service/facade" },
    { name: "Panneaux Solaires", href: "/service/panneaux-solaires" },
    { name: "Jardinage", href: "/service/jardinage" },
  ];

  const navItems = [
    { href: "/", label: "Accueil" },
    { label: "Services", submenu: services },
    { href: "#temoignages", label: "Avis clients" },
    { label: "Professionnels", href: "/professionnels" },
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
          <span className="text-lg font-bold text-gray-900 hidden sm:inline">ProClean</span>
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
                  {item.submenu.map((subitem) => (
                    <a
                      key={subitem.href}
                      href={subitem.href}
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

        {/* CTA Button */}
        <div className="hidden lg:block">
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
                        {item.submenu.map((subitem) => (
                          <a
                            key={subitem.href}
                            href={subitem.href}
                            onClick={() => setIsMenuOpen(false)}
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
