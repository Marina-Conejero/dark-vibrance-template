
import { Button } from "../ui/CustomButton";

export function Hero() {
  return <section className="relative min-h-screen flex items-center pt-36 pb-16">
      <div className="container mx-auto container-padding text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight animate-fade-in lg:text-6xl">
            Grow your business without hiring with <span className="text-gradient-primary">No-Code, AI & Automation</span>
          </h1>
          
          <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-3xl mx-auto animate-fade-in-up">
            Get fast, bespoke business solutions without the coding headaches. We bend the tech to fit your business, not the other way around.
          </p>
          
          <div className="flex justify-center animate-fade-in-up mb-12">
            <Button variant="primary" size="lg" hasArrow useCalendar>
              Get Started
            </Button>
          </div>
        </div>

        <div className="mx-auto w-full max-w-4xl animate-float px-4 sm:px-0">
          <img 
            src="/lovable-uploads/50317afc-d54a-4195-acde-caab10394ade.png" 
            alt="Automation ring" 
            className="w-full h-auto"
          />
        </div>
      </div>
    </section>;
}
