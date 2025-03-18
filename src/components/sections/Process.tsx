
import { Section, SectionTitle } from "../ui/Section";
import { ProcessStep } from "../ui/ProcessStep";
import { Button } from "../ui/CustomButton";
import { Search, Layers, Cpu, Rocket } from "lucide-react";

export function Process() {
  const steps = [{
    icon: <Search className="h-6 w-6" />,
    step: 1,
    title: "Rapid Discovery",
    description: "During the initial calls, we dive deep into challenges, set priorities and identify 'low-hanging fruit' solutions for rapid implementation alongside major projects."
  }, {
    icon: <Layers className="h-6 w-6" />,
    step: 2,
    title: "Collaborative Implementation",
    description: "We always implement our solutions collaboratively alongside internal teams. We use our unique solution maps to rapidly deploy MVPs and iterate them."
  }, {
    icon: <Cpu className="h-6 w-6" />,
    step: 3,
    title: "Know How Transfer",
    description: "We provide all the tools and training necessary for your team to not only seamlessly integrate our solutions, but also to effectively leverage them for long-term success."
  }, {
    icon: <Rocket className="h-6 w-6" />,
    step: 4,
    title: "Competitive Advantage",
    description: "We equip you with up-to-date insights and strategic guidance that secure your competitive edge and ensure your AI & Automation strategy is continuously updated."
  }];
  
  return <Section id="process" className="py-12">
      <SectionTitle subtitle={<span className="inline-flex items-center px-4 py-1.5 rounded-full text-sm font-medium glass-highlight">
            Our Process
          </span>} title={<>Overcoming the <i>"You don't know what you don't know"</i></>} description="Through proven implementation examples and a rapid discovery process, we help our partners uncover and leverage key AI and automation opportunities" />
      
      <div className="mt-16 grid grid-cols-1 lg:grid-cols-4 gap-x-0 gap-y-12">
        {steps.map((step, index) => <ProcessStep key={index} icon={step.icon} step={step.step} title={step.title} description={step.description} isLast={index === steps.length - 1} className="animate-fade-in-up pb-12 relative px-4" style={{
        animationDelay: `${index * 0.1}s`
      }} />)}
      </div>
      
      <div className="mt-20 text-center">
        <Button variant="primary" size="lg" hasArrow useCalendar>Get Started</Button>
      </div>
    </Section>;
}
