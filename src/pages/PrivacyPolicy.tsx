
import React, { useEffect, useRef } from "react";
import { Section } from "@/components/ui/Section";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useLocation, useNavigate } from "react-router-dom";

const PrivacyPolicy = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const sectionRefs = {
    who: useRef<HTMLDivElement>(null),
    information: useRef<HTMLDivElement>(null),
    purpose: useRef<HTMLDivElement>(null),
    legal: useRef<HTMLDivElement>(null),
    storage: useRef<HTMLDivElement>(null),
    sharing: useRef<HTMLDivElement>(null),
    retention: useRef<HTMLDivElement>(null),
    rights: useRef<HTMLDivElement>(null),
    transfers: useRef<HTMLDivElement>(null),
    security: useRef<HTMLDivElement>(null),
    cookies: useRef<HTMLDivElement>(null),
    updates: useRef<HTMLDivElement>(null),
    contact: useRef<HTMLDivElement>(null),
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

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-brand-dark flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Section className="pt-40 md:pt-48 pb-20 md:pb-28">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold mb-2 text-white text-center">Privacy Policy</h1>
            <p className="text-center text-gray-400 mb-10">Last Updated: May 14, 2024</p>
            
            <p className="mb-10 text-gray-300 leading-relaxed">
              Hive Mechanics is committed to maintaining the privacy and security of the personal data we collect. 
              This privacy policy explains how we handle the information provided to us by our clients and business 
              partners during our engagements.
            </p>
            
            <ScrollArea className="h-full">
              <div className="space-y-8 text-gray-300">
                <div ref={sectionRefs.who} id="who">
                  <h2 className="text-xl font-semibold mb-4 text-white">1. Who We Are</h2>
                  <p className="leading-relaxed">
                    Hive Mechanics is a UK-based consultancy that helps organizations leverage AI, automation, 
                    and real-life operational expertise to solve core business challenges. We collaborate closely 
                    with our partners to design, implement, and optimize technology solutions that drive efficiency 
                    and enhance capabilities without the need for complex code.
                  </p>
                </div>
                
                <div ref={sectionRefs.information} id="information">
                  <h2 className="text-xl font-semibold mb-4 text-white">2. Information We Collect</h2>
                  <p className="leading-relaxed mb-4">
                    We only collect personal data that is essential for providing our consultancy services.
                    This may include:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>
                      <span className="font-medium">Client Contact Information:</span> Basic details such as names, 
                      email addresses, and other information provided during communication, which is stored in our 
                      Customer Relationship Management (CRM) system, currently powered by Notion.
                    </li>
                    <li>
                      <span className="font-medium">Client Credentials:</span> For accessing client-specified software 
                      platforms, we process and store login credentials securely in an encrypted cloud vault.
                    </li>
                  </ul>
                </div>
                
                <div ref={sectionRefs.purpose} id="purpose">
                  <h2 className="text-xl font-semibold mb-4 text-white">3. Purpose of Data Collection</h2>
                  <p className="leading-relaxed mb-4">
                    We use the collected data for:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>
                      <span className="font-medium">Service Delivery:</span> Managing client relationships and 
                      ensuring smooth communication throughout our projects.
                    </li>
                    <li>
                      <span className="font-medium">Accessing Client Systems:</span> Credentials provided by clients are 
                      necessary for us to access the tools and software required to deliver consultancy services.
                    </li>
                  </ul>
                </div>
                
                <div ref={sectionRefs.legal} id="legal">
                  <h2 className="text-xl font-semibold mb-4 text-white">4. Legal Basis for Processing</h2>
                  <p className="leading-relaxed mb-4">
                    We process personal data on the basis of:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>
                      <span className="font-medium">Contractual Necessity:</span> To fulfill our obligations under client agreements.
                    </li>
                    <li>
                      <span className="font-medium">Legitimate Interests:</span> To ensure smooth service delivery and maintain 
                      business relationships through network-based sales and communications.
                    </li>
                  </ul>
                </div>
                
                <div ref={sectionRefs.storage} id="storage">
                  <h2 className="text-xl font-semibold mb-4 text-white">5. Data Storage and Security</h2>
                  <p className="leading-relaxed mb-4">
                    We prioritize the security of the personal data we process. Our storage and security measures include:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>
                      <span className="font-medium">Encrypted Credential Storage:</span> Client credentials are stored in a secure, 
                      encrypted cloud vault, and access is strictly limited to authorized personnel. Credentials are deleted 
                      promptly once our engagement concludes.
                    </li>
                    <li>
                      <span className="font-medium">CRM Management:</span> We utilize Notion for CRM purposes, and Notion's 
                      data handling practices may involve international data transfers outside of the UK or EU, in compliance 
                      with applicable data protection laws.
                    </li>
                    <li>
                      <span className="font-medium">Email Communication:</span> Client communications are stored indefinitely 
                      via Gmail's standard retention practices for project continuity.
                    </li>
                  </ul>
                </div>
                
                <div ref={sectionRefs.sharing} id="sharing">
                  <h2 className="text-xl font-semibold mb-4 text-white">6. Data Sharing</h2>
                  <p className="leading-relaxed">
                    Hive Mechanics does not sell, trade, or share personal data for marketing purposes. Any sharing of data is 
                    strictly for service delivery purposes, such as accessing third-party software on behalf of our clients.
                  </p>
                </div>
                
                <div ref={sectionRefs.retention} id="retention">
                  <h2 className="text-xl font-semibold mb-4 text-white">7. Data Retention</h2>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>
                      <span className="font-medium">Client Credentials:</span> All client credentials are deleted immediately 
                      upon the end of our contractual relationship.
                    </li>
                    <li>
                      <span className="font-medium">Email Communications:</span> These are retained indefinitely for reference 
                      and project continuity, but we can delete them upon request (see Section 8 for Data Rights).
                    </li>
                  </ul>
                </div>
                
                <div ref={sectionRefs.rights} id="rights">
                  <h2 className="text-xl font-semibold mb-4 text-white">8. Your Data Rights</h2>
                  <p className="leading-relaxed mb-4">
                    We respect your rights under applicable data protection laws. You have the right to:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>
                      <span className="font-medium">Access:</span> Request a copy of the personal data we hold about you.
                    </li>
                    <li>
                      <span className="font-medium">Rectification:</span> Request correction of inaccurate or incomplete information.
                    </li>
                    <li>
                      <span className="font-medium">Erasure:</span> Request deletion of your data, except where we are required to 
                      retain it (e.g., for legal obligations).
                    </li>
                    <li>
                      <span className="font-medium">Object:</span> Object to the processing of your data in certain circumstances.
                    </li>
                  </ul>
                  <p className="mt-4 leading-relaxed">
                    For any requests or questions about your data, please contact us at{" "}
                    <a 
                      href="mailto:privacy@hivemechanics.io" 
                      className="text-brand-purple hover:text-brand-blue transition-colors"
                    >
                      privacy@hivemechanics.io
                    </a>.
                  </p>
                </div>
                
                <div ref={sectionRefs.transfers} id="transfers">
                  <h2 className="text-xl font-semibold mb-4 text-white">9. Data Transfers</h2>
                  <p className="leading-relaxed">
                    Data may be transferred to countries outside the UK or EU if necessary to deliver our services, 
                    particularly if such transfers are made by third-party providers like Notion, Slack, or Google Workspace. 
                    These providers may process data in compliance with their own data protection policies. We ensure that 
                    adequate safeguards, such as Standard Contractual Clauses (SCCs), are in place to protect your data 
                    during these transfers.
                  </p>
                </div>
                
                <div ref={sectionRefs.security} id="security">
                  <h2 className="text-xl font-semibold mb-4 text-white">10. Security Measures</h2>
                  <p className="leading-relaxed mb-4">
                    We employ industry-standard security protocols, including:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>
                      <span className="font-medium">Encryption:</span> All sensitive data, including client credentials, 
                      is stored in encrypted form.
                    </li>
                    <li>
                      <span className="font-medium">Limited Access:</span> Access to personal data is restricted to authorized 
                      personnel who require it to deliver services.
                    </li>
                    <li>
                      <span className="font-medium">Data Minimization:</span> We only collect and store the minimum amount of 
                      data necessary for the performance of our services.
                    </li>
                  </ul>
                </div>
                
                <div ref={sectionRefs.cookies} id="cookies">
                  <h2 className="text-xl font-semibold mb-4 text-white">11. No Cookies or Tracking</h2>
                  <p className="leading-relaxed">
                    We do not use cookies or other tracking technologies on our website, reflecting our commitment to privacy. 
                    Our website serves primarily as a business card and does not collect personal data from visitors.
                  </p>
                </div>
                
                <div ref={sectionRefs.updates} id="updates">
                  <h2 className="text-xl font-semibold mb-4 text-white">12. Updates to this Policy</h2>
                  <p className="leading-relaxed">
                    We may update this privacy policy to reflect changes in our practices or to comply with legal or regulatory 
                    requirements. Any significant changes will be communicated via our website or directly to affected parties. 
                    We encourage regular review of this policy for any updates.
                  </p>
                </div>
                
                <div ref={sectionRefs.contact} id="contact">
                  <h2 className="text-xl font-semibold mb-4 text-white">13. Contact Information</h2>
                  <p className="leading-relaxed">
                    If you have any questions regarding this privacy policy or our data protection practices, please contact us at:
                  </p>
                  <p className="mt-4 leading-relaxed">
                    Email: <a 
                      href="mailto:privacy@hivemechanics.io" 
                      className="text-brand-purple hover:text-brand-blue transition-colors"
                    >
                      privacy@hivemechanics.io
                    </a>
                    <br />
                    Company Name: Hive Mechanics<br />
                    Address: 6th Floor One London Wall, London, United Kingdom, EC2Y 5EB
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

export default PrivacyPolicy;
