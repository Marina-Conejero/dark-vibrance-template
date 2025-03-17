
import { Section, SectionTitle } from "../ui/Section";
import { Fragment } from "react";

export function Logos() {
  // Using actual client logos for first two, placeholder SVGs for the rest
  const logos = [
    // Mindspace logo
    <img 
      key="1" 
      src="/lovable-uploads/6ab5cd4b-8184-4d99-bb45-8bff186cdc32.png" 
      alt="Mindspace" 
      className="h-10 md:h-12 w-auto"
    />,
    // Sama logo
    <img 
      key="2" 
      src="/lovable-uploads/e2212927-4fa0-4ee6-abdd-e8419d81daaa.png" 
      alt="Sama" 
      className="h-10 md:h-12 w-auto"
    />,
    // Remaining placeholder logos
    <svg key="3" viewBox="0 0 100 50" className="h-8 md:h-10 w-auto">
      <rect width="80" height="30" x="10" y="10" fill="#333" rx="5" />
      <text x="50" y="30" fontSize="16" fill="#fff" textAnchor="middle">LOGO 3</text>
    </svg>,
    <svg key="4" viewBox="0 0 100 50" className="h-8 md:h-10 w-auto">
      <rect width="80" height="30" x="10" y="10" fill="#333" rx="5" />
      <text x="50" y="30" fontSize="16" fill="#fff" textAnchor="middle">LOGO 4</text>
    </svg>,
    <svg key="5" viewBox="0 0 100 50" className="h-8 md:h-10 w-auto">
      <rect width="80" height="30" x="10" y="10" fill="#333" rx="5" />
      <text x="50" y="30" fontSize="16" fill="#fff" textAnchor="middle">LOGO 5</text>
    </svg>,
    <svg key="6" viewBox="0 0 100 50" className="h-8 md:h-10 w-auto">
      <rect width="80" height="30" x="10" y="10" fill="#333" rx="5" />
      <text x="50" y="30" fontSize="16" fill="#fff" textAnchor="middle">LOGO 6</text>
    </svg>,
  ];

  return (
    <Section id="trusted-by" className="py-16 md:py-20">
      <SectionTitle
        subtitle="Trusted By"
        title="Companies We've Helped Transform"
        alignment="center"
      />
      
      <div className="mt-12 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center justify-items-center">
        {logos.map((logo, index) => (
          <div 
            key={index} 
            className="grayscale hover:grayscale-0 opacity-60 hover:opacity-100 transition-all duration-300"
          >
            {logo}
          </div>
        ))}
      </div>
    </Section>
  );
}
