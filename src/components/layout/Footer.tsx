
import { Button } from "../ui/CustomButton";
export function Footer() {
  return <footer className="bg-brand-darker pt-16 pb-8">
      <div className="container mx-auto container-padding">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Logo and Tagline */}
          <div className="md:col-span-2">
            <a href="#" className="flex items-center mb-4">
              <img src="/lovable-uploads/6c91c7da-95b5-44dc-be82-f586e08d008f.png" alt="Hive Mechanics Logo" className="h-10 w-auto filter brightness-0 invert" />
            </a>
            <p className="text-gray-400 mb-4">
              Automating business growth through AI and no-code solutions.
            </p>
            <a href="mailto:contact@hivemechanics.com" className="text-brand-purple hover:text-brand-purple/80 transition-colors">
              contact@hivemechanics.com
            </a>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a href="#services" className="text-gray-400 hover:text-white transition-colors">
                  Our Services
                </a>
              </li>
              <li>
                <a href="https://www.linkedin.com/company/hive-mechanics/jobs/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                  Careers
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  Terms & Conditions
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>

          {/* Get In Touch */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Get In Touch</h4>
            <p className="text-gray-400 mb-4">
              Ready to automate your business growth? Let's talk.
            </p>
            <Button variant="primary" hasArrow useCalendar>Book a Free Consult</Button>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-8 mt-8 border-t border-white/10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p className="text-sm text-gray-500">
                © 2024 Hive Mechanics Ltd. 6th Floor One London Wall, London, United Kingdom, EC2Y 5EB <br />
                Company number: 15950504
              </p>
            </div>
            <div className="md:text-right">
              <p className="text-sm text-gray-500">
                We do not like cookie banners (they're simply annoying) and we take privacy compliance very seriously. 
                That's why we are not using any cookies that are not essential to the functioning of the website and we do not 
                use any tracking scripts or analytics. Therefore, we eliminated the need for cookie consent banners and 
                do not track you in any way.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>;
}
