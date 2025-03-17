
import { Button } from "../ui/CustomButton";
import { CheckCircle } from "lucide-react";

interface SuccessMessageProps {
  onReset: () => void;
}

export function SuccessMessage({ onReset }: SuccessMessageProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <CheckCircle className="w-16 h-16 text-brand-purple mb-4 animate-fade-in" />
      <h3 className="text-xl font-bold mb-2">Message Received!</h3>
      <p className="text-gray-300 mb-6">We'll get back to you as soon as possible.</p>
      <Button 
        onClick={onReset}
        variant="outline"
      >
        Send Another Message
      </Button>
    </div>
  );
}
