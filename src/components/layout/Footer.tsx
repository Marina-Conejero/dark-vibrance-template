
import { Button } from "../ui/Button";

export function Footer() {
  return (
    <footer className="bg-brand-darker pt-16 pb-8">
      <div className="container mx-auto container-padding">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Logo and Tagline */}
          <div className="md:col-span-2">
            <a href="#" className="flex items-center mb-4">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="24" height="24" rx="8" fill="#111111"/>
                <path d="M18 8H6M6 12H18M6 16H18" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span className="ml-2 text-xl font-bold">HIVE MECHANICS</span>
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
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
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
            <Button variant="primary" hasArrow>
              Contact Us
            </Button>
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
    </footer>
  );
}
