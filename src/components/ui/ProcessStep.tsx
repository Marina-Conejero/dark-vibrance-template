
import { cn } from "@/lib/utils";

interface ProcessStepProps {
  icon: React.ReactNode;
  step: number;
  title: string;
  description: string;
  className?: string;
  style?: React.CSSProperties;
}

export function ProcessStep({ icon, step, title, description, className, style }: ProcessStepProps) {
  const getStepColor = (step: number) => {
    switch (step) {
      case 1:
        return "bg-brand-purple text-white";
      case 2:
        return "bg-brand-blue text-white";
      case 3:
        return "bg-blue-500 text-white";
      case 4:
        return "bg-brand-yellow text-black";
      default:
        return "bg-brand-purple text-white";
    }
  };

  return (
    <div className={cn("relative flex flex-col items-start", className)} style={style}>
      <div className={cn(
        "flex h-16 w-16 items-center justify-center rounded-full mb-6",
        getStepColor(step)
      )}>
        {icon}
      </div>
      
      <div className="flex items-center mb-3">
        <span className="text-sm font-medium text-gray-400 mr-2">Step {step}</span>
        <h3 className="text-xl font-semibold">{title}</h3>
      </div>
      
      <p className="text-gray-300">{description}</p>
      
      {step < 4 && (
        <div className="hidden md:block absolute -right-6 top-8 transform rotate-90 md:rotate-0">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      )}
    </div>
  );
}
