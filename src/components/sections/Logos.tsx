
import { Section, SectionTitle } from "../ui/Section";
import { 
  Dialog, 
  DialogTrigger, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription 
} from "../ui/dialog";
import { useEffect, useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/CustomButton";
import { toast } from "sonner";

// Define a type for our logo objects
type Logo = {
  id: number;
  src: string;
  alt: string;
  isPlaceholder: boolean;
};

export function Logos() {
  // Define the initial state with real logos and placeholders
  const initialLogos: Logo[] = [
    // Real logos with appropriate styling
    {
      id: 1,
      src: "/lovable-uploads/a6ea8c7b-03c0-4968-bcdd-359d251b751e.png",
      alt: "Mindspace",
      isPlaceholder: false
    },
    {
      id: 2,
      src: "/lovable-uploads/e2212927-4fa0-4ee6-abdd-e8419d81daaa.png",
      alt: "Sama",
      isPlaceholder: false
    },
    {
      id: 3,
      src: "/lovable-uploads/3dbba578-0442-4d44-ab26-4de29b277135.png",
      alt: "CalibrateHCM",
      isPlaceholder: false
    },
    // Placeholder logos (with empty string for src)
    { id: 4, src: "", alt: "LOGO 4", isPlaceholder: true },
    { id: 5, src: "", alt: "LOGO 5", isPlaceholder: true },
    { id: 6, src: "", alt: "LOGO 6", isPlaceholder: true }
  ];

  const [logos, setLogos] = useState<Logo[]>(initialLogos);
  const [selectedLogo, setSelectedLogo] = useState<number | null>(null);
  const [newAlt, setNewAlt] = useState("");
  const [file, setFile] = useState<File | null>(null);

  // Load logos from localStorage on component mount
  useEffect(() => {
    const savedLogos = localStorage.getItem('companyLogos');
    if (savedLogos) {
      try {
        const parsedLogos = JSON.parse(savedLogos);
        setLogos(parsedLogos);
      } catch (error) {
        console.error('Failed to parse saved logos:', error);
        // If parsing fails, fall back to initial logos
        setLogos(initialLogos);
      }
    }
  }, []);

  // Save logos to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('companyLogos', JSON.stringify(logos));
  }, [logos]);

  // Create placeholder SVG for empty slots
  const renderPlaceholder = (alt: string) => (
    <svg viewBox="0 0 100 50" className="h-14 md:h-20 w-auto">
      <text x="50" y="30" fontSize="16" fill="#fff" textAnchor="middle" fontWeight="bold">{alt}</text>
    </svg>
  );

  // Handle file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || !e.target.files[0]) return;
    setFile(e.target.files[0]);
  };

  // Handle logo upload and update
  const handleLogoUpload = () => {
    if (!selectedLogo || !file) return;
    
    // Create a FileReader to read the file as a data URL
    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target && event.target.result) {
        // Update the logo in state with the data URL
        setLogos(prevLogos => prevLogos.map(logo => 
          logo.id === selectedLogo 
            ? { ...logo, src: event.target!.result as string, alt: newAlt || logo.alt, isPlaceholder: false } 
            : logo
        ));
        
        // Reset state
        setFile(null);
        toast.success("Logo updated successfully!");
      }
    };
    
    // Read the file as a data URL (this will be stored in localStorage)
    reader.readAsDataURL(file);
  };

  return (
    <Section id="trusted-by" className="py-12 md:py-16">
      <SectionTitle 
        subtitle={
          <span className="inline-flex items-center px-4 py-1.5 rounded-full text-sm font-medium glass-highlight">
            Trusted By
          </span>
        } 
        title="Companies We've Helped Transform" 
        alignment="center" 
      />
      
      <div className="mt-12 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center justify-items-center">
        {logos.map((logo) => (
          <Dialog key={logo.id}>
            <DialogTrigger asChild>
              <div 
                className="grayscale hover:grayscale-0 opacity-80 hover:opacity-100 transition-all duration-300 flex items-center justify-center h-24 md:h-32 cursor-pointer"
                onClick={() => {
                  setSelectedLogo(logo.id);
                  setNewAlt(logo.alt);
                  setFile(null);
                }}
              >
                {logo.isPlaceholder ? (
                  renderPlaceholder(logo.alt)
                ) : (
                  <img 
                    src={logo.src} 
                    alt={logo.alt} 
                    className="h-24 md:h-32 w-auto object-contain" 
                  />
                )}
              </div>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Upload Logo</DialogTitle>
                <DialogDescription>
                  Upload a new logo image. For best results, use a PNG with transparent background.
                </DialogDescription>
              </DialogHeader>
              <div className="flex flex-col gap-4 py-4">
                <div className="flex flex-col gap-2">
                  <label htmlFor="logoAlt" className="text-sm font-medium">
                    Company Name
                  </label>
                  <Input
                    id="logoAlt"
                    value={newAlt}
                    onChange={(e) => setNewAlt(e.target.value)}
                    placeholder="Company name"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="logoFile" className="text-sm font-medium">
                    Logo Image
                  </label>
                  <Input
                    id="logoFile"
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                  />
                  <p className="text-xs text-gray-400">
                    Recommended size: 400px × 200px (2:1 ratio)
                  </p>
                </div>
                <Button onClick={handleLogoUpload} disabled={!file}>
                  Save Logo
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        ))}
      </div>
    </Section>
  );
}
