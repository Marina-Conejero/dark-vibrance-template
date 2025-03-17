
import { cn } from "@/lib/utils";

interface SolutionCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  className?: string;
  link?: string;
}

export function SolutionCard({ icon, title, description, className, link }: SolutionCardProps) {
  return (
    <div 
      className={cn(
        "relative p-6 md:p-8 rounded-xl bg-[#101826] border border-white/5 transition-all duration-300 hover:shadow-lg hover:shadow-brand-blue/5 hover:border-brand-blue/20 flex flex-col h-full",
        className
      )}
    >
      <div className="mb-5 flex h-10 w-10 items-center justify-center">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-3">
        {title}
      </h3>
      <p className="text-gray-300 mb-4 flex-grow">
        {description}
      </p>
      {link && (
        <a 
          href={link} 
          className="text-brand-yellow hover:text-brand-yellow/80 font-medium text-sm inline-flex items-center transition-colors"
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
