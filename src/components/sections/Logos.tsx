
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

  const [logos, setLogos] = useState<Logo[]>(initialLogos);
  const [selectedLogo, setSelectedLogo] = useState<number | null>(null);
  const [newAlt, setNewAlt] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [previewSrc, setPreviewSrc] = useState<string>("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Load saved logos from localStorage on component mount
  useEffect(() => {
    try {
      const savedLogos = localStorage.getItem('companyLogos');
      // Only use saved logos if they exist and are valid JSON
      if (savedLogos) {
        const parsedLogos = JSON.parse(savedLogos);
        if (Array.isArray(parsedLogos) && parsedLogos.length > 0) {
          // Check if we should update to the new logos
          const shouldUpdate = !parsedLogos.some(logo => 
            initialLogos.find(initial => initial.src === logo.src)
          );
          
          if (shouldUpdate) {
            // Update to new logos and save to localStorage
            setLogos(initialLogos);
            localStorage.setItem('companyLogos', JSON.stringify(initialLogos));
            console.log("Updated to new logos and saved to localStorage");
            toast.success("New logos have been loaded");
          } else {
            setLogos(parsedLogos);
            console.log("Loaded logos from localStorage:", parsedLogos);
          }
        } else {
          // If saved logos aren't valid, use initial logos
          setLogos(initialLogos);
          localStorage.setItem('companyLogos', JSON.stringify(initialLogos));
          console.log("Saved initial logos to localStorage");
          toast.success("New logos have been loaded");
        }
      } else {
        // If no saved logos, use initial logos
        setLogos(initialLogos);
        localStorage.setItem('companyLogos', JSON.stringify(initialLogos));
        console.log("No saved logos, using initial logos");
        toast.success("New logos have been loaded");
      }
    } catch (error) {
      console.error('Failed to load saved logos:', error);
      // If error, use initial logos
      setLogos(initialLogos);
      localStorage.setItem('companyLogos', JSON.stringify(initialLogos));
      toast.success("New logos have been loaded");
    }
  }, []);

  // Save logos to localStorage whenever they change
  useEffect(() => {
    try {
      if (logos && logos.length > 0) {
        localStorage.setItem('companyLogos', JSON.stringify(logos));
        console.log("Saved updated logos to localStorage:", logos);
      }
    } catch (error) {
      console.error("Failed to save logos to localStorage:", error);
    }
  }, [logos]);

  const renderPlaceholder = (alt: string) => (
    <div className="flex items-center justify-center w-full h-full">
      <svg viewBox="0 0 100 50" className="h-8 md:h-12 w-auto">
        <text x="50" y="30" fontSize="16" fill="#fff" textAnchor="middle" fontWeight="bold">{alt}</text>
      </svg>
    </div>
  );

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || !e.target.files[0]) return;
    
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    
    // Create a preview
    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target && event.target.result) {
        setPreviewSrc(event.target.result as string);
      }
    };
    reader.readAsDataURL(selectedFile);
  };

  const handleLogoUpload = () => {
    if (!selectedLogo) {
      toast.error("Please select a logo position");
      return;
    }
    
    if (file) {
      // Using file
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target && event.target.result) {
          updateLogo(selectedLogo, event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    } else if (previewSrc) {
      // Using existing preview
      updateLogo(selectedLogo, previewSrc);
    } else {
      toast.error("Please select a file to upload");
      return;
    }
  };

  const updateLogo = (logoId: number, src: string) => {
    const updatedLogos = logos.map(logo => 
      logo.id === logoId 
        ? { 
            ...logo, 
            src: src, 
            alt: newAlt || logo.alt, 
            isPlaceholder: false 
          } 
        : logo
    );
    
    setLogos(updatedLogos);
    setFile(null);
    setPreviewSrc("");
    setIsDialogOpen(false);
    toast.success("Logo updated successfully!");
    
    // Ensure localStorage is updated
    try {
      localStorage.setItem('companyLogos', JSON.stringify(updatedLogos));
      console.log("Logo updated and saved to localStorage");
    } catch (error) {
      console.error("Failed to save updated logo to localStorage:", error);
    }
  };

  const openLogoDialog = (logoId: number, logoAlt: string) => {
    setSelectedLogo(logoId);
    setNewAlt(logoAlt);
    setFile(null);
    setPreviewSrc("");
    setIsDialogOpen(true);
  };

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
        {logos.map((logo) => (
          <div 
            key={logo.id}
            className="grayscale hover:grayscale-0 opacity-80 hover:opacity-100 transition-all duration-300 flex items-center justify-center h-14 md:h-16 cursor-pointer"
            onClick={() => openLogoDialog(logo.id, logo.alt)}
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
                  // If image fails to load, mark as placeholder
                  setLogos(prev => prev.map(l => 
                    l.id === logo.id ? {...l, isPlaceholder: true} : l
                  ));
                }}
              />
            )}
          </div>
        ))}
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Upload Logo</DialogTitle>
            <DialogDescription>
              Upload a new logo image. For best results, use a transparent PNG or SVG file, sized at 400px × 200px (2:1 ratio).
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
                accept=".svg,image/svg+xml,image/png,image/jpeg,image/gif"
                onChange={handleFileChange}
              />
              <p className="text-xs text-muted-foreground">
                Supported formats: SVG, PNG, JPEG, GIF
              </p>
            </div>
            
            {previewSrc && (
              <div className="flex flex-col items-center gap-2 py-2">
                <p className="text-sm font-medium">Preview:</p>
                <div className="bg-black/20 backdrop-blur-sm p-4 rounded-md flex items-center justify-center">
                  <img 
                    src={previewSrc} 
                    alt="Logo preview" 
                    className="max-h-40 max-w-full object-contain"
                  />
                </div>
              </div>
            )}
            
            <Button onClick={handleLogoUpload} disabled={!file && !previewSrc}>
              Save Logo
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </Section>
  );
}
