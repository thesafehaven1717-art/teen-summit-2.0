import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ScrollReveal } from "@/components/animations/scroll-reveal";

const faqs = [
  {
    question: "What is Teen Summit 2.0?",
    answer: "Teen Summit 2.0 is an elite 12-week civic media program combining debate, musicology, and podcasting. Selected Summiters (not participants—you're chosen!) engage in structured discourse, develop their Academic Civic NILS (Name, Image, Likeness, Story), and produce original multimedia content exploring critical social issues."
  },
  {
    question: "When does the program run?",
    answer: "The Spring 2026 cohort runs for 12 weeks during the spring semester. Filming schedules, episode recordings, and workshops are held on designated days. You'll receive a detailed calendar upon acceptance."
  },
  {
    question: "Is this program competitive? How are Summiters selected?",
    answer: "Absolutely. This is a highly selective program—Summiters are chosen, not just accepted. We seek teens who demonstrate intellectual curiosity, civic engagement, leadership potential, and a genuine passion for making an impact. The application process includes essays, references, and potentially interviews."
  },
  {
    question: "What are Academic Civic NILS?",
    answer: "Academic Civic NILS stands for Name, Image, Likeness, and Story. It's your personal brand built on civic engagement and intellectual achievement. You'll learn to leverage social media, content creation, and public speaking to amplify your voice and create opportunities—all while building Civic Capital, Intellectual Capital, and Financial Capital."
  },
  {
    question: "What do Summiters receive?",
    answer: "Selected Summiters receive professional uniforms (which you can customize and 'swag out'), bus cards for transportation, access to media production training, mentorship from industry professionals, networking opportunities, media content for college applications, and a formal Pinning Ceremony upon completing all Three Acts. You'll also build a portfolio of published work."
  },
  {
    question: "What are the Three Acts of Transformation?",
    answer: "Act I: Civic Discourse Training—Master debate, research, and structured argumentation. Act II: Media Production & Musicology—Create podcasts, analyze music's role in social movements, and develop multimedia content. Act III: Public Presentation & Impact—Showcase your work, present findings, and receive your official Teen Summit 2.0 pin at the Pinning Ceremony."
  },
  {
    question: "Do I need prior debate or media experience?",
    answer: "No prior experience is required—just passion, commitment, and willingness to learn. We'll train you in debate techniques, media production, research methods, and public speaking. However, demonstrating curiosity and initiative in your application will strengthen your candidacy."
  },
  {
    question: "Is there a cost to participate?",
    answer: "Teen Summit 2.0 is FREE for selected Summiters. All materials, training, uniforms, and resources are provided. We believe financial barriers should never limit access to civic engagement and leadership development."
  },
  {
    question: "Can parents attend filming sessions?",
    answer: "Yes! Parents are welcome and encouraged to attend filming sessions. We provide dedicated seating, meals, and opportunities to view production. The Parent Portal gives you access to schedules, episode information, and program updates."
  },
  {
    question: "How does this help with college applications?",
    answer: "Summiters graduate with a portfolio including: published episodes, blog posts, debate research (dossiers), social media analytics demonstrating audience growth, and documented civic engagement. These materials differentiate you in competitive college admissions and scholarship applications."
  },
  {
    question: "What if I can't make every session?",
    answer: "This is a 12-week commitment requiring consistent attendance. While we understand emergencies happen, Summiters are expected to prioritize the program. Excessive absences may affect your ability to complete all Three Acts and receive your pin at the Pinning Ceremony."
  },
  {
    question: "How do I apply?",
    answer: "Complete the Summiteer Application form on our website. You'll submit essays about your interests, goals, and why you want to join Teen Summit 2.0. Strong applications show genuine passion for civic engagement, intellectual curiosity, and commitment to the 12-week program."
  }
];

export function FAQSection() {
  return (
    <section className="py-24 bg-muted/30">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-muted-foreground">
              Everything you need to know about Teen Summit 2.0
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <Accordion type="single" collapsible className="w-full space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="bg-card border rounded-lg px-6"
                data-testid={`faq-item-${index}`}
              >
                <AccordionTrigger 
                  className="text-left hover:no-underline"
                  data-testid={`faq-trigger-${index}`}
                >
                  <span className="font-semibold">{faq.question}</span>
                </AccordionTrigger>
                <AccordionContent 
                  className="text-muted-foreground"
                  data-testid={`faq-content-${index}`}
                >
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </ScrollReveal>

        <ScrollReveal delay={0.3}>
          <div className="mt-12 text-center">
            <p className="text-muted-foreground mb-4">
              Still have questions?
            </p>
            <a 
              href="/contact" 
              className="text-primary font-semibold hover:underline"
              data-testid="link-contact-from-faq"
            >
              Contact us and we'll get back to you
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
