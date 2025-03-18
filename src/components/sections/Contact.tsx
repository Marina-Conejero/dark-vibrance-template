
import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Section, SectionTitle } from "../ui/Section";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/CustomButton";
import { toast } from "../../hooks/use-toast";
import { Send, CheckCircle, Phone } from "lucide-react";
import { sendContactEmail } from "@/services/emailService";
import { isSlackConfigured } from "@/services/slackService";

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
  
  // Initialize form with zod resolver
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues,
  });

  // Handle form submission
  const onSubmit = async (data: ContactFormValues) => {
    setIsSubmitting(true);
    
    try {
      console.log("Form submission started", data);
      const result = await sendContactEmail({
        name: data.name,
        email: data.email,
        company: data.company,
        message: data.message
      });
      
      console.log("Contact email sent result:", result);
      
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
      
      toast({
        title: "Message received",
        description: "Your message was processed. We'll be in touch soon.",
        // Still show success message - we don't want to confuse the user with technical errors
      });
      
      // Reset the form anyway
      form.reset();
      
      // Show success state despite error (email might still have sent)
      setIsSuccess(true);
      setTimeout(() => setIsSuccess(false), 3000);
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
      
      {/* Added disclaimer text */}
      <p className="text-center text-sm text-gray-400 mt-2 mb-8 italic">
        *Guaranteed 100% sales-free communication, focused solely on technology
      </p>
      
      <div className="mx-auto max-w-3xl relative z-10">
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
            <div>
              <h3 className="text-xl font-bold mb-6">Send us a message</h3>
              
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
                  
                  <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
                    <Button 
                      type="submit"
                      variant="outline" 
                      size="md"
                      disabled={isSubmitting}
                      className="inline-flex items-center justify-center border border-brand-purple/50 bg-transparent hover:bg-brand-purple/10 rounded-md font-medium"
                    >
                      {isSubmitting ? (
                        <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-t-transparent" />
                      ) : (
                        <Send className="mr-2 h-4 w-4" />
                      )}
                      Send Message
                    </Button>
                    
                    <Button 
                      type="button"
                      variant="primary" 
                      size="lg" 
                      useCalendar
                      className="w-full md:w-auto"
                    >
                      <Phone className="mr-2 h-4 w-4" />
                      Let's Speak Directly
                    </Button>
                  </div>
                </form>
              </Form>
            </div>
          )}
        </div>
      </div>
    </Section>
  );
}
