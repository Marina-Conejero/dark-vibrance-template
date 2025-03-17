import { useState, useEffect } from "react";
import { Button } from "../ui/CustomButton";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  onClick?: () => void;
}
function NavLink({
  href,
  children,
  onClick
}: NavLinkProps) {
  return <a href={href} onClick={onClick} className="text-sm font-medium text-gray-200 hover:text-white transition-colors px-3 py-2">
      {children}
    </a>;
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
  return <header className={cn("fixed top-0 w-full z-50 transition-all duration-300 py-4", isScrolled && "bg-black/80 backdrop-blur-md shadow-lg py-3")}>
      <div className="container mx-auto container-padding">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="flex items-center">
            <img src="/lovable-uploads/6c91c7da-95b5-44dc-be82-f586e08d008f.png" alt="Hive Mechanics Logo" className="h-10 w-auto filter brightness-0 invert" />
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            <NavLink href="#services">Services</NavLink>
            <NavLink href="#solutions">Solutions</NavLink>
            <NavLink href="#process">Process</NavLink>
            <NavLink href="#testimonials">Testimonials</NavLink>
          </nav>

          {/* CTA Button and Contact Link */}
          <div className="hidden md:flex items-center">
            <NavLink href="#contact">Contact</NavLink>
            <Button variant="primary" size="md" className="ml-2" hasArrow useCalendar>Book a Free Consult</Button>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden text-gray-300 hover:text-white" onClick={toggleMobileMenu}>
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && <div className="md:hidden bg-black/95 backdrop-blur-lg absolute top-full left-0 w-full py-4 shadow-lg animate-fade-in">
          <div className="container mx-auto container-padding">
            <nav className="flex flex-col space-y-3">
              <NavLink href="#services" onClick={closeMobileMenu}>Services</NavLink>
              <NavLink href="#solutions" onClick={closeMobileMenu}>Solutions</NavLink>
              <NavLink href="#process" onClick={closeMobileMenu}>Process</NavLink>
              <NavLink href="#testimonials" onClick={closeMobileMenu}>Testimonials</NavLink>
              <NavLink href="#contact" onClick={closeMobileMenu}>Contact</NavLink>
              <Button variant="primary" size="md" className="mt-4" hasArrow useCalendar>
                Get in Touch
              </Button>
            </nav>
          </div>
        </div>}
    </header>;
}