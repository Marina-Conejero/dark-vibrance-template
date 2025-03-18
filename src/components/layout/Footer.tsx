
import { Button } from "../ui/CustomButton";
import { Link } from "react-router-dom";

export function Footer() {
  return <footer className="bg-brand-darker pt-16 pb-8">
      <div className="container mx-auto container-padding">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Logo and Tagline */}
          <div className="md:col-span-2">
            <Link to="/" className="flex items-center mb-4">
              <img src="/lovable-uploads/6c91c7da-95b5-44dc-be82-f586e08d008f.png" alt="Hive Mechanics Logo" className="h-10 w-auto filter brightness-0 invert" />
            </Link>
            <p className="text-gray-400 mb-4">
              Automating business growth through AI and no-code solutions.
            </p>
            <a href="mailto:hello@hivemechanics.io" className="text-brand-purple hover:text-brand-purple/80 transition-colors">
              hello@hivemechanics.io
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
                <a href="#process" className="text-gray-400 hover:text-white transition-colors">
                  Process
                </a>
              </li>
              <li>
                <a href="#contact" className="text-gray-400 hover:text-white transition-colors">
                  Get in touch
                </a>
              </li>
            </ul>
          </div>

          {/* Legal & Careers */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Legal & Careers</h4>
            <ul className="space-y-2">
              <li>
                <a href="https://www.linkedin.com/company/hive-mechanics/jobs/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                  Careers
                </a>
              </li>
              <li>
                <Link to="/privacy-policy" className="text-gray-400 hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms-and-conditions" className="text-gray-400 hover:text-white transition-colors">
                  Terms & Conditions
                </Link>
              </li>
            </ul>
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
