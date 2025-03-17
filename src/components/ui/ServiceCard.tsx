
import { cn } from "@/lib/utils";

interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  className?: string;
  style?: React.CSSProperties;
}

export function ServiceCard({ icon, title, description, className, style }: ServiceCardProps) {
  return (
    <div 
      className={cn(
        "relative p-6 md:p-8 rounded-xl bg-card-gradient border border-white/5 transition-all duration-300 hover:shadow-lg hover:shadow-brand-purple/5 hover:border-brand-purple/20 group",
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
      <p className="text-gray-300">
        {description}
      </p>
    </div>
  );
}
