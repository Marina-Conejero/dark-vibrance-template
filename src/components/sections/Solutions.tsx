import { Section, SectionTitle } from "../ui/Section";
import { SolutionCard } from "../ui/SolutionCard";
import { LineChart, BarChart3, MessageSquare, FileText, Rocket } from "lucide-react";
export function Solutions() {
  const solutions = [{
    icon: <LineChart className="h-6 w-6" />,
    title: "AI-Powered Investment Pipeline",
    description: "Fully automated system that analyzes and selects promising companies for investment, enriches key contact data, and prepares outreach communications."
  }, {
    icon: <BarChart3 className="h-6 w-6" />,
    title: "Automated B2B Pre-Sales Engine",
    description: "AI-enhanced system that generates leads, qualifies prospects, and manages outreach without the need for a large sales team."
  }, {
    icon: <MessageSquare className="h-6 w-6" />,
    title: "AI Meeting Assistant",
    description: "Autonomous bot that tracks meetings, processes notes, updates CRM, and briefs team members before meetings."
  }, {
    icon: <FileText className="h-6 w-6" />,
    title: "Automated Investor Updates",
    description: "System that aggregates updates from portfolio companies, market data, and trends to create quarterly investor reports."
  }, {
    icon: <Rocket className="h-6 w-6" />,
    title: "AI-Enhanced Growth Flywheel",
    description: "Integrated process for lead generation, data enrichment, and content creation, boosting growth without additional resource allocation."
  }];
  return <Section id="solutions">
      <SectionTitle subtitle={<span className="inline-flex items-center px-4 py-1.5 rounded-full text-sm font-medium glass-highlight">Our Solutions in Action</span>} title="Low Code, High Impact" description="Real-world examples of how our intelligent automation has transformed businesses across industries." />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
        {solutions.map((solution, index) => <SolutionCard key={index} icon={solution.icon} title={solution.title} description={solution.description} className="animate-fade-in-up group" style={{
        animationDelay: `${index * 0.1}s`
      }} />)}
      </div>
    </Section>;
}