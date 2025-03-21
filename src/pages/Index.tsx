
import { Background } from "@/components/ui/Background";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { Services } from "@/components/sections/Services";
import { Logos } from "@/components/sections/Logos";
import { Solutions } from "@/components/sections/Solutions";
import { Process } from "@/components/sections/Process";
import { Testimonials } from "@/components/sections/Testimonials";
import { Contact } from "@/components/sections/Contact";
import { Toaster as SonnerToaster } from "sonner";
import { Toaster } from "@/components/ui/toaster";
import { useEffect } from "react";

const Index = () => {
  // Smooth scroll for anchor links
  useEffect(() => {
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isAnchor = target.tagName === 'A' && target.getAttribute('href')?.startsWith('#');
      
      if (isAnchor) {
        e.preventDefault();
        const href = target.getAttribute('href');
        const element = document.querySelector(href || '');
        
        if (element) {
          element.scrollIntoView({
            behavior: 'smooth'
          });
        }
      }
    };
    
    document.addEventListener('click', handleAnchorClick);
    
    // Clear localStorage on initial load to ensure fresh logo setup (remove after debugging)
    // localStorage.removeItem('companyLogos');
    
    return () => {
      document.removeEventListener('click', handleAnchorClick);
    };
  }, []);
  
  return (
    <div className="relative min-h-screen bg-black">
      <Background starCount={150} />
      
      <Navbar />
      
      <main>
        <Hero />
        <Services />
        <Logos />
        <Solutions />
        <Process />
        <Testimonials />
        <Contact />
      </main>
      
      <Footer />
      <Toaster />
      <SonnerToaster position="top-right" />
    </div>
  );
};

export default Index;
