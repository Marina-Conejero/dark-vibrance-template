
import { Section, SectionTitle } from "../ui/Section";
import { TestimonialCard } from "../ui/TestimonialCard";

export function Testimonials() {
  const testimonials = [
    {
      quote: "Boiling the ocean blindly was bringing us nowhere. Pawel helped us leverage AI tools to find and scale outbound for 1% of what it would have otherwise cost us.",
      name: "Myra",
      role: "Founder & CEO",
      company: "@Sama",
      imageSrc: "https://randomuser.me/api/portraits/women/44.jpg"
    },
    {
      quote: "Pawel's support in automating and enhancing our pre-sales and cold outreach allowed us to process and reach out to thousands of leads each month without hiring a single sales person.",
      name: "Alex",
      role: "CEO",
      company: "@Valist",
      imageSrc: "https://randomuser.me/api/portraits/men/32.jpg"
    },
    {
      quote: "Pawel and his team's expertise propelled our AI usage to new heights, seamlessly integrating with our existing automated workflows and processes. The path from inspiration to implementation was impressively short.",
      name: "Tom",
      role: "Founder & CEO",
      company: "@MVPR",
      imageSrc: "https://randomuser.me/api/portraits/men/67.jpg"
    }
  ];

  return (
    <Section id="testimonials">
      <SectionTitle
        subtitle="Testimonials"
        title="What Our Partners Say"
        description="Don't just take our word for it. Hear from the businesses we've helped transform through intelligent automation."
      />
      
      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        {testimonials.map((testimonial, index) => (
          <TestimonialCard
            key={index}
            quote={testimonial.quote}
            name={testimonial.name}
            role={testimonial.role}
            company={testimonial.company}
            imageSrc={testimonial.imageSrc}
            className="animate-fade-in-up"
            style={{ animationDelay: `${index * 0.1}s` }}
          />
        ))}
      </div>
    </Section>
  );
}
