
import { forwardRef } from "react";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "link";
  size?: "sm" | "md" | "lg";
  hasArrow?: boolean;
  isLoading?: boolean;
  useCalendar?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", hasArrow = false, isLoading = false, useCalendar = false, children, ...props }, ref) => {
    const baseClasses = "inline-flex items-center justify-center rounded-md font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";
    
    const variantClasses = {
      primary: "bg-gradient-primary hover:opacity-90 text-white shadow-md hover:shadow-lg button-glow",
      secondary: "bg-gradient-secondary hover:opacity-90 text-black shadow-md hover:shadow-lg button-glow",
      outline: "border border-brand-purple/50 bg-transparent hover:bg-brand-purple/10 text-white",
      ghost: "bg-transparent hover:bg-white/10 text-white",
      link: "bg-transparent underline-offset-4 hover:underline text-white p-0 h-auto",
    };
    
    const sizeClasses = {
      sm: "text-xs px-3 h-8",
      md: "text-sm px-4 h-10",
      lg: "text-base px-6 h-12",
    };

    // Add Cal.com attributes for primary buttons with useCalendar=true
    const calAttributes = useCalendar && variant === "primary" ? {
      "data-cal-link": "team/hive-mechanics/free-consultation",
      "data-cal-namespace": "free-consultation",
      "data-cal-config": '{"layout":"month_view","theme":"dark"}'
    } : {};

    return (
      <button
        ref={ref}
        className={cn(
          baseClasses,
          variantClasses[variant],
          sizeClasses[size],
          hasArrow && "group",
          className
        )}
        {...calAttributes}
        {...props}
      >
        {isLoading ? (
          <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-t-transparent" />
        ) : null}
        {children}
        {hasArrow && (
          <ArrowRight 
            className="ml-2 h-4 w-4 transform transition-transform duration-300 group-hover:translate-x-1" 
          />
        )}
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button };
