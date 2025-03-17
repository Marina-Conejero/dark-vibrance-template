
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
import { Send, CheckCircle, Settings } from "lucide-react";
import { sendContactEmail } from "@/services/emailService";
import { getSlackWebhookUrl, setSlackWebhookUrl, isSlackConfigured } from "@/services/slackService";

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

// Schema for Slack webhook URL
const slackWebhookSchema = z.object({
  webhookUrl: z.string().url({ message: "Please enter a valid Slack webhook URL" })
});

type SlackWebhookFormValues = z.infer<typeof slackWebhookSchema>;

export function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [showSlackSettings, setShowSlackSettings] = useState(false);
  
  // Initialize form with zod resolver
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues,
  });

  // Initialize Slack webhook form
  const slackForm = useForm<SlackWebhookFormValues>({
    resolver: zodResolver(slackWebhookSchema),
    defaultValues: {
      webhookUrl: ""
    }
  });

  // Load saved webhook URL on component mount
  useEffect(() => {
    const savedUrl = getSlackWebhookUrl();
    if (savedUrl) {
      slackForm.setValue("webhookUrl", savedUrl);
    }
  }, [slackForm]);

  // Handle Slack webhook form submission
  const onSaveSlackWebhook = (data: SlackWebhookFormValues) => {
    setSlackWebhookUrl(data.webhookUrl);
    toast({
      title: "Slack webhook saved",
      description: "Contact form submissions will now be sent to your Slack channel."
    });
    setShowSlackSettings(false);
  };

  // Handle form submission
  const onSubmit = async (data: ContactFormValues) => {
    setIsSubmitting(true);
    
    try {
      await sendContactEmail({
        name: data.name,
        email: data.email,
        company: data.company,
        message: data.message
      });
      
      // Show success message
      toast({
        title: "Message sent successfully",
        description: isSlackConfigured() 
          ? "We'll get back to you as soon as possible. Your message was also sent to our Slack channel."
          : "We'll get back to you as soon as possible.",
      });
      
      // Reset the form
      form.reset();
      
      // Show success state
      setIsSuccess(true);
      setTimeout(() => setIsSuccess(false), 3000);
    } catch (error) {
      console.error("Error sending message:", error);
      
      toast({
        title: "Error sending message",
        description: "Please try again later or contact us directly.",
        variant: "destructive",
      });
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
          ) : showSlackSettings ? (
            <div>
              <h3 className="text-xl font-bold mb-4">Configure Slack Integration</h3>
              <p className="text-gray-300 mb-6">
                Enter your Slack webhook URL to receive contact form submissions in your Slack channel.
                <br />
                <a 
                  href="https://api.slack.com/messaging/webhooks" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-brand-purple hover:underline"
                >
                  Learn how to create a Slack webhook
                </a>
              </p>
              
              <form onSubmit={slackForm.handleSubmit(onSaveSlackWebhook)} className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="webhookUrl" className="text-sm font-medium leading-none text-gray-200 mb-2 block">
                    Webhook URL
                  </label>
                  <Input
                    id="webhookUrl"
                    placeholder="https://hooks.slack.com/services/..."
                    {...slackForm.register("webhookUrl")}
                  />
                  {slackForm.formState.errors.webhookUrl && (
                    <p className="text-sm font-medium text-destructive">
                      {slackForm.formState.errors.webhookUrl.message}
                    </p>
                  )}
                </div>
                
                <div className="flex justify-end space-x-2">
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => setShowSlackSettings(false)}
                  >
                    Cancel
                  </Button>
                  <Button 
                    type="submit" 
                    variant="primary"
                  >
                    Save Webhook
                  </Button>
                </div>
              </form>
            </div>
          ) : (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold">Send us a message</h3>
                <Button 
                  variant="ghost" 
                  size="sm"
                  className="text-gray-400 hover:text-white"
                  onClick={() => setShowSlackSettings(true)}
                >
                  <Settings className="h-4 w-4 mr-1" />
                  Slack Settings
                </Button>
              </div>
              
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
                    >
                      <Send className="mr-2 h-4 w-4" />
                      Send Message
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
