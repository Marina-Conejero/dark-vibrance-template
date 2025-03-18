
import { Section, SectionTitle } from "../ui/Section";
import { ProcessStep } from "../ui/ProcessStep";
import { Button } from "../ui/CustomButton";
import { Search, Layers, Cpu, Rocket } from "lucide-react";

export function Process() {
  const steps = [{
    icon: <Search className="h-6 w-6" />,
    step: 1,
    title: "Early Discovery",
    description: "During the initial calls we deep dive into challenges and explore our inspiration catalogue. We rapidly create a clearly prioritized project plan."
  }, {
    icon: <Layers className="h-6 w-6" />,
    step: 2,
    title: "Parallel Delivery",
    description: "We create 'low-hanging fruit' projects, which we can collaboratively deliver quickly to inspire, motivate the team and create early trust."
  }, {
    icon: <Cpu className="h-6 w-6" />,
    step: 3,
    title: "Implementation",
    description: "Bigger projects we implement collaboratively alongside internal teams. We use proprietary solution maps to rapidly deploy MVPs and iterate them."
  }, {
    icon: <Rocket className="h-6 w-6" />,
    step: 4,
    title: "Strategic Innovation",
    description: "Drive innovation and explore new opportunities to scale a competitive edge in the market."
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
