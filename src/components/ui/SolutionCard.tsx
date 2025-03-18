
import { cn } from "@/lib/utils";

interface SolutionCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  className?: string;
  style?: React.CSSProperties;
}

export function SolutionCard({ icon, title, description, className, style }: SolutionCardProps) {
  return (
    <div 
      className={cn(
        "relative p-6 md:p-8 rounded-xl bg-card-gradient border border-white/5 transition-all duration-300 hover:shadow-lg hover:shadow-brand-purple/5 hover:border-brand-purple/20 flex flex-col h-full",
        className
      )}
      style={style}
    >
      <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-brand-purple text-white">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-3 group-hover:text-brand-purple transition-all duration-300">
        {title}
      </h3>
      <p className="text-gray-300 flex-grow">
        {description}
      </p>
    </div>
  );
}
