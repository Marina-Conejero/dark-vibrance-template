
import { useContactForm } from "../../hooks/use-contact-form";
import { Section, SectionTitle } from "../ui/Section";
import { ContactForm } from "../contact/ContactForm";
import { SuccessMessage } from "../contact/SuccessMessage";

export function Contact() {
  const { isSuccess, setIsSuccess } = useContactForm();

  return (
    <Section id="contact" className="relative">
      {/* Background gradient effect */}
      <div className="absolute inset-0 bg-gradient-to-t from-brand-purple/10 to-transparent opacity-30 pointer-events-none" />
      
      <SectionTitle
        subtitle={
          <span className="inline-flex items-center px-4 py-1.5 rounded-full text-sm font-medium glass-highlight">
            Get In Touch
          </span>
        }
        title="Ready to Automate Your Business?"
        description="Let's discuss how we can help you leverage AI and automation to grow without hiring."
      />
      
      <div className="mx-auto max-w-3xl relative z-10">
        <div className="glass rounded-xl p-6 md:p-8 animate-fade-in-up">
          {isSuccess ? (
            <SuccessMessage onReset={() => setIsSuccess(false)} />
          ) : (
            <ContactForm />
          )}
        </div>
      </div>
    </Section>
  );
}
