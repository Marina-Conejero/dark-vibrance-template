
import { Section, SectionTitle } from "../ui/Section";
import { SolutionCard } from "../ui/SolutionCard";
import { LineChart, Users, Cog, Lightbulb, Database } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

export function Solutions() {
  const isMobile = useIsMobile();
  
  const solutions = [{
    icon: <LineChart className="h-8 w-8" />,
    title: "Sales &\nMarketing",
    description: "AI-based lead generation with 360 enrichment,\ncontent generation AI Bot, automated outreach,\nreal-time dashboards, sales alerts, automated sales channel discovery."
  }, {
    icon: <Users className="h-8 w-8" />,
    title: "Customer Relationships",
    description: "Intelligent virtual assistants, custom CRM interfaces for seamless data flow, CRM automations, sentiment analysis, loyalty triggers, auto re-engagement, AI meeting assistant."
  }, {
    icon: <Cog className="h-8 w-8" />,
    title: "Operations & Efficiency",
    description: "Automated approvals, intelligent document processing, AI workflow design, compliance checks, unified tool setups, automated report generation, AI-assisted employee onboarding."
  }, {
    icon: <Lightbulb className="h-8 w-8" />,
    title: "Product & Innovation",
    description: "LLM-based ideation, real-time feedback, rapid prototyping, multi-format data extraction, natural language to database queries, concept visualization, AI custom interfaces from Email to WhatsApp."
  }, {
    icon: <Database className="h-8 w-8" />,
    title: "Data &\nReporting",
    description: "No-code data pipelines, predictive forecasting,\ncustom BI, real-time alerts, automated dashboards,\nanomaly detection, automated data summaries, data reformatting."
  }];
  
  return (
    <Section id="solutions">
      <SectionTitle 
        subtitle={<span className="inline-flex items-center px-4 py-1.5 rounded-full text-sm font-medium glass-highlight">Our Solutions in Action</span>} 
        title="Low Code, High Impact" 
        description="Real-world examples of how our intelligent automation has transformed businesses across industries." 
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
        {solutions.map((solution, index) => (
          <SolutionCard 
            key={index} 
            icon={solution.icon} 
            title={solution.title} 
            description={solution.description} 
            className="animate-fade-in-up group" 
            style={{
              animationDelay: `${index * 0.1}s`
            }}
            isMobile={isMobile}
          />
        ))}
      </div>
    </Section>
  );
}
