import { Section, SectionTitle } from "../ui/Section";
export function Logos() {
  // All logos with transparent backgrounds and white text
  const logos = [
  // Mindspace logo (already has appropriate styling)
  <img key="1" alt="Mindspace" className="h-14 md:h-20 w-auto object-contain" src="/lovable-uploads/a6ea8c7b-03c0-4968-bcdd-359d251b751e.png" />,
  // Sama logo (already has appropriate styling)
  <img key="2" src="/lovable-uploads/e2212927-4fa0-4ee6-abdd-e8419d81daaa.png" alt="Sama" className="h-14 md:h-20 w-auto object-contain" />,
  // Remaining placeholder logos with white text on transparent background
  <svg key="3" viewBox="0 0 100 50" className="h-14 md:h-20 w-auto">
      <text x="50" y="30" fontSize="16" fill="#fff" textAnchor="middle" fontWeight="bold">LOGO 3</text>
    </svg>, <svg key="4" viewBox="0 0 100 50" className="h-14 md:h-20 w-auto">
      <text x="50" y="30" fontSize="16" fill="#fff" textAnchor="middle" fontWeight="bold">LOGO 4</text>
    </svg>, <svg key="5" viewBox="0 0 100 50" className="h-14 md:h-20 w-auto">
      <text x="50" y="30" fontSize="16" fill="#fff" textAnchor="middle" fontWeight="bold">LOGO 5</text>
    </svg>, <svg key="6" viewBox="0 0 100 50" className="h-14 md:h-20 w-auto">
      <text x="50" y="30" fontSize="16" fill="#fff" textAnchor="middle" fontWeight="bold">LOGO 6</text>
    </svg>];
  return <Section id="trusted-by" className="py-16 md:py-20">
      <SectionTitle subtitle={<span className="inline-flex items-center px-4 py-1.5 rounded-full text-sm font-medium glass-highlight">
            Trusted By
          </span>} title="Companies We've Helped Transform" alignment="center" />
      
      <div className="mt-12 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center justify-items-center">
        {logos.map((logo, index) => <div key={index} className="grayscale hover:grayscale-0 opacity-80 hover:opacity-100 transition-all duration-300 flex items-center justify-center h-20 md:h-24">
            {logo}
          </div>)}
      </div>
      
      <div className="mt-8 text-center text-sm text-gray-400">
        <p>For best results, create logos with these dimensions:</p>
        <p>Recommended size: 400px × 200px (2:1 ratio)</p>
        <p>Format: PNG with transparent background</p>
      </div>
    </Section>;
}