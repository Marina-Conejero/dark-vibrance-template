
import { cn } from "@/lib/utils";

interface TestimonialCardProps {
  quote: string;
  name: string;
  role: string;
  company: string;
  imageSrc: string;
  className?: string;
  style?: React.CSSProperties;
}

export function TestimonialCard({
  quote,
  name,
  role,
  company,
  imageSrc,
  className,
  style,
}: TestimonialCardProps) {
  return (
    <div
      className={cn(
        "p-6 md:p-8 rounded-xl bg-card-gradient border border-white/5 transition-all duration-300 hover:shadow-lg hover:border-white/10",
        className
      )}
      style={style}
    >
      <div className="mb-6">
        <svg width="32" height="24" viewBox="0 0 32 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M11.8667 0L7.14673 9.33333H14.2V24H0V10.6667L7.73336 0H11.8667ZM29.6667 0L25.0001 9.33333H32.0001V24H17.8V10.6667L25.5334 0H29.6667Z" fill="#4A1C2F"/>
        </svg>
      </div>

      <p className="text-gray-300 italic mb-6">
        {quote}
      </p>

      <div className="flex items-center">
        <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
          <img
            src={imageSrc}
            alt={name}
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <h4 className="font-medium text-white">{name}</h4>
          <p className="text-sm text-gray-400">
            {role}, <a href="#" className="text-white">{company}</a>
          </p>
        </div>
      </div>
    </div>
  );
}
