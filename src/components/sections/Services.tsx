
import { Section, SectionTitle } from "../ui/Section";
import { ServiceCard } from "../ui/ServiceCard";
import { Brain, Workflow, BarChart3, Layers, Code, Users } from "lucide-react";

export function Services() {
  const services = [
    {
      icon: <Brain className="h-8 w-8" />,
      title: "AI Implementation",
      description: "Strategic AI implementation that solves real business problems without requiring extensive technical expertise."
    },
    {
      icon: <Workflow className="h-8 w-8" />,
      title: "No-Code Automation",
      description: "Building efficient workflows and systems that automate repetitive tasks, freeing your team to focus on high-value work."
    },
    {
      icon: <BarChart3 className="h-8 w-8" />,
      title: "Process Optimization",
      description: "Analyzing and redesigning business processes to maximize efficiency, reduce costs, and improve customer experience."
    },
    {
      icon: <Layers className="h-8 w-8" />,
      title: "Tech Stack Integration",
      description: "Seamlessly connecting your existing tools and platforms to create a unified, efficient technology ecosystem."
    },
    {
      icon: <Code className="h-8 w-8" />,
      title: "Hands-on Implementation",
      description: "Expert execution of automation solutions that deliver immediate value with minimal disruption to your operations."
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "Training & Knowledge Transfer",
      description: "Empowering your team with the skills and knowledge to maintain and expand upon the automation solutions we build."
    }
  ];

  return (
    <Section id="services">
      <SectionTitle
        subtitle={
          <span className="inline-flex items-center px-4 py-1.5 rounded-full text-sm font-medium glass-highlight">
            Our Services
          </span>
        }
        title="Intelligent Automation Solutions"
        description="We leverage cutting-edge AI and no-code technologies to create automation solutions that drive real business value and tangible ROI."
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {services.map((service, index) => (
          <ServiceCard
            key={index}
            icon={service.icon}
            title={service.title}
            description={service.description}
            className="animate-fade-in-up"
            style={{ animationDelay: `${index * 0.1}s` }}
          />
        ))}
      </div>
    </Section>
  );
}
