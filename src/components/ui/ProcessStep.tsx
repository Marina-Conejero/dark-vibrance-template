
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";

interface ProcessStepProps {
  icon: React.ReactNode;
  step: number;
  title: string;
  description: string;
  className?: string;
  style?: React.CSSProperties;
  isLast?: boolean;
}

export function ProcessStep({ icon, step, title, description, className, style, isLast = false }: ProcessStepProps) {
  return (
    <div className={cn("relative flex flex-col items-start", className)} style={style}>
      {/* Step Circle with Icon */}
      <div className="flex h-16 w-16 items-center justify-center rounded-full mb-4 bg-[#4A1C2F] text-white">
        {icon}
      </div>
      
      {/* Step Number and Title */}
      <div className="flex flex-col items-start mb-3 w-full">
        <span className="text-sm font-medium text-gray-400 mb-1">Step {step}</span>
        <h3 className="text-xl font-semibold">{title}</h3>
      </div>
      
      {/* Description */}
      <p className="text-gray-300 text-left pr-8">{description}</p>
      
      {/* Vertical separator line (not shown for the last step) */}
      {!isLast && (
        <div className="hidden lg:block absolute top-8 right-0 h-full mx-6">
          <div className="h-full border-r border-gray-700" style={{ height: "calc(100% - 3rem)" }}></div>
        </div>
      )}
      
      {/* Arrow at the bottom of each step */}
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 mt-4">
        <ArrowRight className="h-6 w-6 text-gray-400" />
      </div>
    </div>
  );
}
