import { Button } from "../ui/CustomButton";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center pt-20 pb-16">
      <div className="container mx-auto container-padding text-center">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6 inline-block animate-fade-in">
            <span className="inline-flex items-center px-4 py-1.5 rounded-full text-sm font-medium bg-white/5 border border-white/10">
              Automation Agency
            </span>
          </div>
          
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight animate-fade-in">
            Grow your business without hiring with <span className="text-gradient-primary">No-Code, AI & Automation</span>
          </h1>
          
          <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-3xl mx-auto animate-fade-in-up">
            Get fast, bespoke business solutions without the coding headaches. We bend the tech to fit your business, not the other way around.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up">
            <Button variant="primary" size="lg" hasArrow>
              Get Started
            </Button>
            <Button variant="outline" size="lg">
              Learn More
            </Button>
          </div>
        </div>

        <div className="mt-20 max-w-3xl mx-auto animate-float">
          <div className="relative w-full h-64 md:h-80">
            <div className="absolute inset-0 bg-gradient-to-r from-brand-purple/20 to-brand-blue/20 rounded-full blur-3xl opacity-30"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                <path fill="#8B5CF6" d="M40.9,-49.5C54.1,-39.3,66.7,-27.5,71.7,-12.5C76.7,2.6,74.2,20.8,65.4,34.7C56.6,48.5,41.4,58,25.2,63.7C9,69.3,-8.3,71.2,-24.6,66.7C-40.9,62.2,-56.1,51.4,-65.1,36.3C-74.1,21.2,-76.8,1.8,-71.9,-15C-67,-31.9,-54.5,-46.2,-40.3,-56.4C-26.1,-66.6,-10.3,-72.7,2.5,-75.6C15.3,-78.5,30.7,-78.1,40.9,-67.5C51.2,-56.9,27.7,-59.7,40.9,-49.5Z" transform="translate(100 100)" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
