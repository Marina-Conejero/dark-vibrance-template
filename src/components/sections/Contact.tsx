
import { useState } from "react";
import { useContactForm } from "../../hooks/use-contact-form";
import { Section, SectionTitle } from "../ui/Section";
import { ContactForm } from "../contact/ContactForm";
import { SuccessMessage } from "../contact/SuccessMessage";
import { Button } from "../ui/CustomButton";
import { Check, Send } from "lucide-react";

export function Contact() {
  const { isSuccess, setIsSuccess } = useContactForm();
  const [apiKey, setApiKey] = useState("");
  const [isApiKeySet, setIsApiKeySet] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleApiKeySubmit = async () => {
    if (!apiKey.trim()) return;
    
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/set-api-key', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ apiKey }),
      });
      
      if (response.ok) {
        setIsApiKeySet(true);
      }
    } catch (error) {
      console.error('Error setting API key:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

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
          {!isApiKeySet ? (
            <div className="flex flex-col items-center text-center py-8">
              <h3 className="text-xl font-bold mb-4">Set up your Resend API key</h3>
              <p className="text-gray-300 mb-6 max-w-md">After you provide the API key, I'll implement the email sending functionality.</p>
              
              <div className="flex flex-col sm:flex-row gap-3 w-full max-w-md">
                <input
                  type="password"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  placeholder="Paste your Resend API key here"
                  className="flex h-10 rounded-md border border-input bg-background/60 px-3 py-2 text-base ring-offset-background transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-purple focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm flex-1"
                />
                <Button 
                  onClick={handleApiKeySubmit}
                  variant="primary"
                  isLoading={isSubmitting}
                >
                  {isSubmitting ? "Setting..." : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      Add API Key
                    </>
                  )}
                </Button>
              </div>
            </div>
          ) : (
            isSuccess ? (
              <SuccessMessage onReset={() => setIsSuccess(false)} />
            ) : (
              <ContactForm />
            )
          )}
        </div>
      </div>
    </Section>
  );
}
