
import { useState, useEffect } from "react";
import { Button } from "../ui/Button";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  onClick?: () => void;
}

function NavLink({ href, children, onClick }: NavLinkProps) {
  return (
    <a
      href={href}
      onClick={onClick}
      className="text-sm font-medium text-gray-200 hover:text-white transition-colors px-3 py-2"
    >
      {children}
    </a>
  );
}

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300 py-4",
        isScrolled && "bg-black/80 backdrop-blur-md shadow-lg py-3"
      )}
    >
      <div className="container mx-auto container-padding">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="flex items-center">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="24" height="24" rx="8" fill="#111111"/>
              <path d="M18 8H6M6 12H18M6 16H18" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span className="ml-2 text-xl font-bold">HIVE MECHANICS</span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            <NavLink href="#services">Services</NavLink>
            <NavLink href="#process">Process</NavLink>
            <NavLink href="#solutions">Solutions</NavLink>
            <NavLink href="#testimonials">Testimonials</NavLink>
          </nav>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Button 
              variant="primary" 
              size="md"
              className="ml-4"
              hasArrow
            >
              Get in Touch
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-300 hover:text-white"
            onClick={toggleMobileMenu}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-black/95 backdrop-blur-lg absolute top-full left-0 w-full py-4 shadow-lg animate-fade-in">
          <div className="container mx-auto container-padding">
            <nav className="flex flex-col space-y-3">
              <NavLink href="#services" onClick={closeMobileMenu}>Services</NavLink>
              <NavLink href="#process" onClick={closeMobileMenu}>Process</NavLink>
              <NavLink href="#solutions" onClick={closeMobileMenu}>Solutions</NavLink>
              <NavLink href="#testimonials" onClick={closeMobileMenu}>Testimonials</NavLink>
              <Button 
                variant="primary" 
                size="md"
                className="mt-4"
                hasArrow
              >
                Get in Touch
              </Button>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
