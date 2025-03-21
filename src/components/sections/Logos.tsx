
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
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";

type Logo = {
  id: number;
  src: string;
  alt: string;
  isPlaceholder: boolean;
};

export function Logos() {
  const initialLogos: Logo[] = [
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
    { id: 4, src: "", alt: "LOGO 4", isPlaceholder: true },
    { id: 5, src: "", alt: "LOGO 5", isPlaceholder: true },
    { id: 6, src: "", alt: "LOGO 6", isPlaceholder: true }
  ];

  const [logos, setLogos] = useState<Logo[]>(initialLogos);
  const [selectedLogo, setSelectedLogo] = useState<number | null>(null);
  const [newAlt, setNewAlt] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [previewSrc, setPreviewSrc] = useState<string>("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Load saved logos from localStorage on component mount
  useEffect(() => {
    const savedLogos = localStorage.getItem('companyLogos');
    if (savedLogos) {
      try {
        const parsedLogos = JSON.parse(savedLogos);
        setLogos(parsedLogos);
      } catch (error) {
        console.error('Failed to parse saved logos:', error);
        setLogos(initialLogos);
      }
    }
  }, []);

  // Save logos to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('companyLogos', JSON.stringify(logos));
  }, [logos]);

  const renderPlaceholder = (alt: string) => (
    <div className="flex items-center justify-center w-full h-full">
      <svg viewBox="0 0 100 50" className="h-14 md:h-20 w-auto">
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
    if (!selectedLogo || !file) {
      toast.error("Please select a file to upload");
      return;
    }
    
    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target && event.target.result) {
        const updatedLogos = logos.map(logo => 
          logo.id === selectedLogo 
            ? { 
                ...logo, 
                src: event.target!.result as string, 
                alt: newAlt || logo.alt, 
                isPlaceholder: false 
              } 
            : logo
        );
        
        setLogos(updatedLogos);
        localStorage.setItem('companyLogos', JSON.stringify(updatedLogos));
        
        setFile(null);
        setPreviewSrc("");
        setIsDialogOpen(false);
        toast.success("Logo updated successfully!");
      }
    };
    reader.readAsDataURL(file);
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
      
      <div className="mt-12 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center justify-items-center">
        {logos.map((logo) => (
          <div 
            key={logo.id}
            className="grayscale hover:grayscale-0 opacity-80 hover:opacity-100 transition-all duration-300 flex items-center justify-center h-24 md:h-32 cursor-pointer"
            onClick={() => openLogoDialog(logo.id, logo.alt)}
          >
            {logo.isPlaceholder ? (
              renderPlaceholder(logo.alt)
            ) : (
              <img 
                src={logo.src} 
                alt={logo.alt} 
                className="h-24 md:h-32 w-auto object-contain"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.onerror = null;
                  console.log(`Failed to load image for ${logo.alt}. Showing fallback.`);
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
              Upload a new logo image. For best results, use a PNG with transparent background, sized at 400px × 200px (2:1 ratio).
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
            
            <Button onClick={handleLogoUpload} disabled={!file}>
              Save Logo
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </Section>
  );
}
