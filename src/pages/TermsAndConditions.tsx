
import React, { useEffect, useRef } from "react";
import { Section } from "@/components/ui/Section";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useLocation, useNavigate } from "react-router-dom";

const TermsAndConditions = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const sectionRefs = {
    introduction: useRef<HTMLDivElement>(null),
    services: useRef<HTMLDivElement>(null),
    engagement: useRef<HTMLDivElement>(null),
    ownership: useRef<HTMLDivElement>(null),
    confidentiality: useRef<HTMLDivElement>(null),
    fees: useRef<HTMLDivElement>(null),
    liability: useRef<HTMLDivElement>(null),
    termination: useRef<HTMLDivElement>(null),
    disclaimers: useRef<HTMLDivElement>(null),
    privacy: useRef<HTMLDivElement>(null),
    governing: useRef<HTMLDivElement>(null),
    miscellaneous: useRef<HTMLDivElement>(null),
  };
  
  useEffect(() => {
    // Scroll to top when directly navigating to the page
    window.scrollTo(0, 0);
    
    // Check if there's a hash in the URL
    if (location.hash) {
      const sectionId = location.hash.substring(1);
      const sectionRef = sectionRefs[sectionId as keyof typeof sectionRefs];
      
      if (sectionRef && sectionRef.current) {
        setTimeout(() => {
          sectionRef.current?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  }, [location]);

  const createSectionLink = (sectionId: string, text: string) => {
    return (
      <a 
        href="/"
        className="text-brand-purple hover:text-brand-blue transition-colors"
        onClick={(e) => {
          e.preventDefault();
          navigate('/');
        }}
      >
        {text}
      </a>
    );
  };

  return (
    <div className="min-h-screen bg-brand-dark flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Section className="pt-40 md:pt-48 pb-20 md:pb-28">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold mb-10 text-white text-center">Terms and Conditions</h1>
            
            <ScrollArea className="h-full">
              <div className="space-y-8 text-gray-300">
                <div ref={sectionRefs.introduction} id="introduction">
                  <h2 className="text-xl font-semibold mb-4 text-white">1. Introduction</h2>
                  <p className="leading-relaxed">
                    These Terms and Conditions ("Terms") govern your use of the website operated by Hive Mechanics Ltd and the services provided by the company ("Services"). By accessing or using the website www.hivemechanics.io or engaging our Services, you agree to be bound by these Terms. If you do not agree to these Terms, you must discontinue your use of the website and Services.
                  </p>
                </div>
                
                <div ref={sectionRefs.services} id="services">
                  <h2 className="text-xl font-semibold mb-4 text-white">2. Services</h2>
                  <p className="leading-relaxed">
                    Hive Mechanics Ltd provides consulting, automation, and AI implementation services, including but not limited to solution design, no-code/low-code implementation, AI tool integration, and strategic advisory. Details of the Services will be outlined in individual agreements between Hive Mechanics Ltd and the client (the "Client").
                  </p>
                </div>
                
                <div ref={sectionRefs.engagement} id="engagement">
                  <h2 className="text-xl font-semibold mb-4 text-white">3. Engagement and Deliverables</h2>
                  <p className="leading-relaxed">
                    Upon engagement, Hive Mechanics Ltd undertakes to provide the Services as agreed in writing, ensuring that all deliverables are prepared with professionalism and in accordance with UK industry standards. The Client agrees to provide the necessary access and resources to facilitate the delivery of the Services.
                  </p>
                </div>
                
                <div ref={sectionRefs.ownership} id="ownership">
                  <h2 className="text-xl font-semibold mb-4 text-white">4. Ownership of Work Product</h2>
                  <p className="leading-relaxed mb-4">
                    <span className="font-medium">4.1. Consultant's Intellectual Property:</span> Intellectual property created by Hive Mechanics Ltd specifically for the Client, based on proprietary information provided by the Client, will be the property of the Client. Hive Mechanics Ltd retains ownership of pre-existing intellectual property, methodologies, and tools used to deliver the Services.
                  </p>
                  <p className="leading-relaxed">
                    <span className="font-medium">4.2. Client's Intellectual Property:</span> All data, materials, and intellectual property supplied by the Client remain the property of the Client. Hive Mechanics Ltd will not use or disclose such materials except as required to deliver the Services.
                  </p>
                </div>
                
                <div ref={sectionRefs.confidentiality} id="confidentiality">
                  <h2 className="text-xl font-semibold mb-4 text-white">5. Confidentiality</h2>
                  <p className="leading-relaxed">
                    During the provision of Services, Hive Mechanics Ltd may have access to confidential information belonging to the Client. We agree to maintain the confidentiality of such information and use it only to fulfill our obligations under the agreed Services. Confidential information will not be disclosed to any third party without prior consent, unless required by law.
                  </p>
                </div>
                
                <div ref={sectionRefs.fees} id="fees">
                  <h2 className="text-xl font-semibold mb-4 text-white">6. Fees and Payment</h2>
                  <p className="leading-relaxed">
                    The fees for our Services are outlined in the agreement between Hive Mechanics Ltd and the Client. Payments must be made in accordance with the agreed payment schedule. Late payment may result in the suspension of Services until payment is received in full.
                  </p>
                </div>
                
                <div ref={sectionRefs.liability} id="liability">
                  <h2 className="text-xl font-semibold mb-4 text-white">7. Limitation of Liability</h2>
                  <p className="leading-relaxed mb-4">
                    <span className="font-medium">7.1. Exclusion of Liability:</span> To the fullest extent permitted by law, Hive Mechanics Ltd shall not be liable for any indirect or consequential losses, including loss of profit, business, or data.
                  </p>
                  <p className="leading-relaxed mb-4">
                    <span className="font-medium">7.2. Limitation of Liability:</span> Our total liability in respect of any claims arising from the provision of our Services will be limited to the amount paid by the Client for the Services in question.
                  </p>
                  <p className="leading-relaxed">
                    <span className="font-medium">7.3. No Warranties:</span> Hive Mechanics Ltd does not guarantee that the outcomes of our Services will always meet the Client's expectations or warrant specific results.
                  </p>
                </div>
                
                <div ref={sectionRefs.termination} id="termination">
                  <h2 className="text-xl font-semibold mb-4 text-white">8. Termination</h2>
                  <p className="leading-relaxed">
                    Either party may terminate the agreement by providing written notice if the other party materially breaches the terms of the agreement. Upon termination, all outstanding fees for Services rendered must be paid within 14 days of the termination date. Hive Mechanics Ltd reserves the right to withhold any completed work until payment is made in full.
                  </p>
                </div>
                
                <div ref={sectionRefs.disclaimers} id="disclaimers">
                  <h2 className="text-xl font-semibold mb-4 text-white">9. Disclaimers</h2>
                  <p className="leading-relaxed mb-4">
                    <span className="font-medium">9.1. Website Use Disclaimer:</span> The content on our website is provided for general information purposes only. While we strive to ensure accuracy, Hive Mechanics Ltd makes no warranties regarding the completeness or reliability of the information provided.
                  </p>
                  <p className="leading-relaxed">
                    <span className="font-medium">9.2. No Warranties:</span> The website and its content are provided "as is" without any warranties of any kind, either express or implied, including warranties of merchantability, fitness for a particular purpose, or non-infringement.
                  </p>
                </div>
                
                <div ref={sectionRefs.privacy} id="privacy">
                  <h2 className="text-xl font-semibold mb-4 text-white">10. Privacy Policy</h2>
                  <p className="leading-relaxed">
                    Please review our {createSectionLink("privacy", "Privacy Policy")} to understand how Hive Mechanics Ltd collects, uses, and protects personal data. By using the website, you consent to the practices described in the Privacy Policy.
                  </p>
                </div>
                
                <div ref={sectionRefs.governing} id="governing">
                  <h2 className="text-xl font-semibold mb-4 text-white">11. Governing Law</h2>
                  <p className="leading-relaxed">
                    These Terms and any agreements governed by them will be subject to the laws of England and Wales. Any disputes arising from or related to these Terms shall be resolved under the exclusive jurisdiction of the courts of England and Wales.
                  </p>
                </div>
                
                <div ref={sectionRefs.miscellaneous} id="miscellaneous">
                  <h2 className="text-xl font-semibold mb-4 text-white">12. Miscellaneous</h2>
                  <p className="leading-relaxed mb-4">
                    <span className="font-medium">12.1. Amendments:</span> Hive Mechanics Ltd reserves the right to modify these Terms at any time. The latest version will be available on the website.
                  </p>
                  <p className="leading-relaxed mb-4">
                    <span className="font-medium">12.2. Force Majeure:</span> Hive Mechanics Ltd shall not be liable for any failure to fulfill obligations due to circumstances beyond its control.
                  </p>
                  <p className="leading-relaxed">
                    <span className="font-medium">12.3. Severability:</span> If any provision of these Terms is found to be invalid or unenforceable, the remaining provisions will remain in effect.
                  </p>
                </div>
              </div>
            </ScrollArea>
          </div>
        </Section>
      </main>
      <Footer />
    </div>
  );
};

export default TermsAndConditions;
