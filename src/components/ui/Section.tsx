
import React from "react";
import { cn } from "@/lib/utils";

interface SectionProps {
  id?: string;
  className?: string;
  children: React.ReactNode;
  containerClassName?: string;
}

export function Section({ 
  id, 
  className, 
  children, 
  containerClassName 
}: SectionProps) {
  return (
    <section 
      id={id} 
      className={cn("relative section-spacing w-full", className)}
    >
      <div className={cn("container mx-auto container-padding", containerClassName)}>
        {children}
      </div>
    </section>
  );
}

interface SectionTitleProps {
  subtitle?: string;
  title: React.ReactNode;
  description?: string;
  alignment?: "left" | "center";
  className?: string;
}

export function SectionTitle({
  subtitle,
  title,
  description,
  alignment = "center",
  className,
}: SectionTitleProps) {
  return (
    <div 
      className={cn(
        "mb-12 md:mb-16 max-w-3xl",
        alignment === "center" ? "mx-auto text-center" : "text-left",
        className
      )}
    >
      {subtitle && (
        <div className="inline-block px-3 py-1 mb-4 text-sm font-medium text-brand-purple bg-brand-purple/10 rounded-full animate-fade-in">
          {subtitle}
        </div>
      )}
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 animate-fade-in">
        {title}
      </h2>
      {description && (
        <p className="text-base md:text-lg text-gray-300 animate-fade-in-up">
          {description}
        </p>
      )}
    </div>
  );
}
