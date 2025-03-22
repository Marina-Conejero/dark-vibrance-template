
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Background } from "@/components/ui/Background";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <Background starCount={100} />
      <div className="text-center max-w-md p-8 rounded-xl border border-white/5 bg-black/40 backdrop-blur-sm">
        <h1 className="text-6xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-[#4A1C2F] to-[#1C0F37]">404</h1>
        <p className="text-2xl font-semibold mb-4">Page not found</p>
        <p className="text-gray-300 mb-8">
          The page you are looking for doesn't exist or has been moved.
        </p>
        <Button 
          asChild
          className="bg-gradient-to-r from-[#4A1C2F] to-[#1C0F37] hover:opacity-90 px-6 py-5"
        >
          <a href="/">
            <ArrowLeft className="mr-2 h-5 w-5" />
            Return to Home
          </a>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
