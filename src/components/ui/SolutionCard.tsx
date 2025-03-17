
import { cn } from "@/lib/utils";

interface SolutionCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  className?: string;
  link?: string;
  style?: React.CSSProperties;
}

export function SolutionCard({ icon, title, description, className, link, style }: SolutionCardProps) {
  return (
    <div 
      className={cn(
        "relative p-6 md:p-8 rounded-xl bg-card-gradient border border-white/5 transition-all duration-300 hover:shadow-lg hover:shadow-brand-purple/5 hover:border-brand-purple/20 flex flex-col h-full",
        className
      )}
      style={style}
    >
      <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-lg bg-black/20 text-brand-purple">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-3 group-hover:text-gradient-primary transition-all duration-300">
        {title}
      </h3>
      <p className="text-gray-300 mb-4 flex-grow">
        {description}
      </p>
      {link && (
        <a 
          href={link} 
          className="text-brand-purple hover:text-brand-purple/80 font-medium text-sm inline-flex items-center transition-colors"
        >
          Learn more
          <svg className="ml-1 w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </a>
      )}
    </div>
  );
}
