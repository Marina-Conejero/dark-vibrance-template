
import { useState, useEffect } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Section, SectionTitle } from "../ui/Section";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/CustomButton";
import { toast } from "../../hooks/use-toast";
import { Send, CheckCircle, Key, Trash2 } from "lucide-react";
import { 
  isResendConfigured, 
  sendContactEmail, 
  setResendApiKey, 
  initializeResendFromStorage,
  clearResendApiKey
} from "@/services/emailService";

// Schema for form validation
const contactFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  company: z.string().min(1, { message: "Company name is required." }),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

// Default values for the form
const defaultValues: Partial<ContactFormValues> = {
  name: "",
  email: "",
  company: "",
  message: "",
};

export function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isResendSet, setIsResendSet] = useState(false);
  
  // Initialize form with zod resolver
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues,
  });

  // Check for stored API key on component mount
  useEffect(() => {
    const isInitialized = initializeResendFromStorage();
    setIsResendSet(isInitialized);
  }, []);
  
  // Handle setting the Resend API key
  const handleSetApiKey = async () => {
    const apiKey = prompt("Please enter your Resend API key (it will be stored securely in your browser):");
    if (!apiKey) return;
    
    try {
      const success = setResendApiKey(apiKey);
      if (success) {
        setIsResendSet(true);
        toast({
          title: "API Key Set Successfully",
          description: "Your Resend API key has been securely stored.",
        });
      }
    } catch (error) {
      console.error("Error setting API key:", error);
      toast({
        title: "Error Setting API Key",
        description: "Please try again with a valid Resend API key.",
        variant: "destructive",
      });
    }
  };
  
  // Handle removing the Resend API key
  const handleRemoveApiKey = () => {
    if (confirm("Are you sure you want to remove your Resend API key?")) {
      clearResendApiKey();
      setIsResendSet(false);
      toast({
        title: "API Key Removed",
        description: "Your Resend API key has been removed from storage.",
      });
    }
  };

  // Handle form submission
  const onSubmit = async (data: ContactFormValues) => {
    setIsSubmitting(true);
    
    try {
      if (!isResendSet) {
        throw new Error("Resend API key not set");
      }
      
      await sendContactEmail({
        name: data.name,
        email: data.email,
        company: data.company,
        message: data.message
      });
      
      // Show success message
      toast({
        title: "Message sent successfully",
        description: "We'll get back to you as soon as possible.",
      });
      
      // Reset the form
      form.reset();
      
      // Show success state
      setIsSuccess(true);
      setTimeout(() => setIsSuccess(false), 3000);
    } catch (error) {
      console.error("Error sending message:", error);
      
      if (!isResendSet) {
        toast({
          title: "Resend API key not set",
          description: "Please set your Resend API key first.",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Error sending message",
          description: "Please try again later or contact us directly.",
          variant: "destructive",
        });
      }
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
        <div className="flex justify-center mb-4">
          {!isResendSet ? (
            <Button onClick={handleSetApiKey} variant="outline" className="mb-4 text-sm">
              <Key className="mr-2 h-4 w-4" />
              Set Resend API Key
            </Button>
          ) : (
            <div className="flex gap-2 mb-4">
              <Button variant="outline" className="text-sm text-green-500 pointer-events-none">
                <CheckCircle className="mr-2 h-4 w-4" />
                Resend API Key Configured
              </Button>
              <Button onClick={handleRemoveApiKey} variant="outline" className="text-sm text-red-500">
                <Trash2 className="mr-2 h-4 w-4" />
                Remove API Key
              </Button>
            </div>
          )}
        </div>
        
        <div className="glass rounded-xl p-6 md:p-8 animate-fade-in-up">
          {isSuccess ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <CheckCircle className="w-16 h-16 text-brand-purple mb-4 animate-fade-in" />
              <h3 className="text-xl font-bold mb-2">Message Received!</h3>
              <p className="text-gray-300 mb-6">We'll get back to you as soon as possible.</p>
              <Button 
                onClick={() => setIsSuccess(false)}
                variant="outline"
              >
                Send Another Message
              </Button>
            </div>
          ) : (
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Your name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input placeholder="your.email@example.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <FormField
                  control={form.control}
                  name="company"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Company</FormLabel>
                      <FormControl>
                        <Input placeholder="Your company name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Message</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Tell us about your project or automation needs..." 
                          className="min-h-32"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="flex justify-end">
                  <Button 
                    type="submit" 
                    variant="primary" 
                    size="lg" 
                    isLoading={isSubmitting}
                    className="w-full md:w-auto"
                    disabled={!isResendSet}
                  >
                    <Send className="mr-2 h-4 w-4" />
                    Send Message
                  </Button>
                </div>
              </form>
            </Form>
          )}
        </div>
      </div>
    </Section>
  );
}
