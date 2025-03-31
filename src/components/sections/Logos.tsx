
import { Section, SectionTitle } from "../ui/Section";

type Logo = {
  id: number;
  src: string;
  alt: string;
  isPlaceholder: boolean;
};

export function Logos() {
  // Updated initial logos with the new uploaded ones and replacing the last logo
  const initialLogos: Logo[] = [
    {
      id: 1,
      src: "/lovable-uploads/2b8c6abf-04f5-4725-b570-16dc7c015d27.png",
      alt: "Mindspace",
      isPlaceholder: false
    },
    {
      id: 2,
      src: "/lovable-uploads/7afe8b5c-c8e1-484a-95fb-62f13603bc23.png",
      alt: "Sama",
      isPlaceholder: false
    },
    {
      id: 3,
      src: "/lovable-uploads/8a14e59e-6c72-4310-9e3e-f311241e1ab2.png",
      alt: "CalibrateHCM",
      isPlaceholder: false
    },
    {
      id: 4,
      src: "/lovable-uploads/1a374cef-d896-4bd8-b921-35c15a3fae23.png",
      alt: "MVPR",
      isPlaceholder: false
    },
    {
      id: 5,
      src: "/lovable-uploads/af30a4e8-15da-4b2f-bb54-4c78ac9b814a.png",
      alt: "Hyperscale",
      isPlaceholder: false
    },
    {
      id: 6,
      src: "/lovable-uploads/fc934814-d0ce-47ab-9b09-1e5738295506.png",
      alt: "New Logo",
      isPlaceholder: false
    }
  ];

  // Render placeholder for any logos that might have loading issues
  const renderPlaceholder = (alt: string) => (
    <div className="flex items-center justify-center w-full h-full">
      <svg viewBox="0 0 100 50" className="h-8 md:h-12 w-auto">
        <text x="50" y="30" fontSize="16" fill="#fff" textAnchor="middle" fontWeight="bold">{alt}</text>
      </svg>
    </div>
  );

  return (
    <Section id="trusted-by" className="py-10 md:py-14">
      <SectionTitle 
        subtitle={
          <span className="inline-flex items-center px-4 py-1.5 rounded-full text-sm font-medium glass-highlight">
            Trusted By
          </span>
        } 
        title="Companies We've Helped Transform" 
        alignment="center" 
      />
      
      <div className="mt-12 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-10 lg:gap-12 items-center justify-items-center">
        {initialLogos.map((logo) => (
          <div 
            key={logo.id}
            className="grayscale hover:grayscale-0 opacity-80 hover:opacity-100 transition-all duration-300 flex items-center justify-center h-14 md:h-16"
          >
            {logo.isPlaceholder || !logo.src ? (
              renderPlaceholder(logo.alt)
            ) : (
              <img 
                src={logo.src} 
                alt={logo.alt} 
                className="h-8 md:h-10 w-auto max-w-full object-contain"
                onError={(e) => {
                  console.error(`Failed to load image for ${logo.alt}:`, logo.src);
                  const target = e.target as HTMLImageElement;
                  target.onerror = null;
                }}
              />
            )}
          </div>
        ))}
      </div>
    </Section>
  );
}
