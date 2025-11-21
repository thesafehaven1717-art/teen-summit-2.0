import { Card } from "@/components/ui/card";
import { MessageSquare, Music, Mic, Award } from "lucide-react";
import { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import debateImage from "@assets/stock_images/teenagers_students_d_68a6afa2.jpg";
import musicologyImage from "@assets/stock_images/youth_broadcast_stud_daf67ec3.jpg";
import podcastImage from "@assets/stock_images/diverse_teenagers_gr_c1ef52d0.jpg";
import { ScrollReveal } from "@/components/animations/scroll-reveal";
import { StaggerContainer, StaggerItem } from "@/components/animations/scroll-reveal";
import { motion } from "framer-motion";

const acts = [
  {
    id: "act-1",
    title: "ACT I: Debate",
    icon: MessageSquare,
    image: debateImage,
    quote: "Il vaut mieux débattre d'une question sans la régler que de régler une question sans en débattre.",
    quoteAuthor: "Joseph Joubert",
    quoteTranslation: '"It is better to debate a question without settling it than to settle a question without debating it."',
    description: "Rigorous debate as collaborative antagonism—a joint search for truth through structured disagreement. Students learn that saying 'no' is intellectually demanding work, requiring comprehensive analysis and cognitive flexibility.",
    details: [
      "Professional debate training and tournament experience",
      "Critical thinking and evidence-based argumentation",
      "Understanding diverse perspectives through structured discourse",
    ],
  },
  {
    id: "act-2",
    title: "ACT II: Musicology",
    icon: Music,
    image: musicologyImage,
    quote: "Hip-hop creates alternative ways of hearing and producing sounds, alternative music, and alternative uses of public space.",
    quoteAuthor: "Tricia Rose, Black Noise",
    description: "Hip-hop as epistemology—not just aesthetic. Students explore music as a form of knowledge creation, cultural practice, and organic intellectualism among youth.",
    details: [
      "Music as cultural practice and knowledge production",
      "Understanding cosmopolitanism through hip-hop culture",
      "The art and culture of creative collaboration",
    ],
  },
  {
    id: "act-3",
    title: "ACT III: Podcast",
    icon: Mic,
    image: podcastImage,
    description: "Professional media production and broadcasting. Students create compelling audio narratives that amplify youth voices and explore issues that matter to their communities.",
    details: [
      "Professional podcast production and audio engineering",
      "Interview techniques and narrative development",
      "Building your personal brand through media",
      "Distribution and audience engagement strategies",
    ],
  },
];

export function ThreeActsSection() {
  const [expandedAct, setExpandedAct] = useState<string | undefined>(undefined);

  return (
    <section className="py-24 px-4 bg-background">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <ScrollReveal direction="down">
          <div className="text-center mb-16">
            <h2 className="font-montserrat font-bold text-4xl md:text-5xl text-foreground mb-6">
              TS2 Remix : The Show Run Down.
            </h2>
            <p className="font-inter text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
              You are entitled to your feelings. You are not entitled to the facts.
            </p>
          </div>
        </ScrollReveal>

        {/* Acts Grid */}
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16" staggerDelay={0.15}>
          {acts.map((act) => {
            const Icon = act.icon;
            return (
              <StaggerItem key={act.id}>
                <motion.div
                  whileHover={{ y: -8 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card
                    className="relative overflow-hidden hover-elevate border-card-border group cursor-pointer h-full"
                    onClick={() => setExpandedAct(expandedAct === act.id ? undefined : act.id)}
                    data-testid={`card-${act.id}`}
                  >
                    {/* Background Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                    {/* Image Background with Overlay */}
                    <div className="relative aspect-[4/3] overflow-hidden border-b border-border">
                      <motion.div
                        className="absolute inset-0 bg-cover bg-center"
                        style={{ backgroundImage: `url(${act.image})` }}
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.4 }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/70 via-primary/50 to-black/60"></div>
                      </motion.div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <motion.div
                          whileHover={{ scale: 1.1, rotate: 5 }}
                          transition={{ type: "spring", stiffness: 300 }}
                        >
                          <Icon className="w-16 h-16 text-white drop-shadow-lg" />
                        </motion.div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="relative p-6">
                      <h3 className="font-montserrat font-bold text-2xl text-foreground mb-4">
                        {act.title}
                      </h3>
                      
                      {act.quote && (
                        <blockquote className="border-l-4 border-primary pl-4 mb-4">
                          <p className="font-space-grotesk text-sm text-muted-foreground italic mb-2">
                            {act.quote}
                          </p>
                          <cite className="font-inter text-xs text-muted-foreground not-italic">
                            — {act.quoteAuthor}
                          </cite>
                          {act.quoteTranslation && (
                            <p className="font-inter text-xs text-muted-foreground mt-2">
                              {act.quoteTranslation}
                            </p>
                          )}
                        </blockquote>
                      )}

                      <p className="font-inter text-base text-foreground leading-relaxed">
                        {act.description}
                      </p>
                    </div>
                  </Card>
                </motion.div>
              </StaggerItem>
            );
          })}
        </StaggerContainer>

        {/* Expandable Details */}
        <Accordion type="single" collapsible value={expandedAct} onValueChange={setExpandedAct}>
          {acts.map((act) => (
            <AccordionItem key={act.id} value={act.id} className="border-border">
              <AccordionTrigger className="font-montserrat font-semibold text-lg hover:no-underline" data-testid={`accordion-trigger-${act.id}`}>
                Learn More About {act.title}
              </AccordionTrigger>
              <AccordionContent>
                <div className="pt-4 pb-6">
                  <h4 className="font-montserrat font-semibold text-lg text-foreground mb-4">
                    What You'll Experience:
                  </h4>
                  <ul className="space-y-3">
                    {act.details.map((detail, index) => (
                      <li key={index} className="flex items-start gap-3" data-testid={`detail-${act.id}-${index}`}>
                        <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2.5 flex-shrink-0"></div>
                        <p className="font-inter text-base text-foreground leading-relaxed">
                          {detail}
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        {/* Pinning Ceremony */}
        <ScrollReveal direction="up">
          <Card className="mt-16 p-8 md:p-12 bg-primary/5 border-primary/20">
            <div className="flex items-start gap-6">
              <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                <Award className="w-8 h-8 text-primary" />
              </div>
              <div>
                <h3 className="font-montserrat font-bold text-2xl md:text-3xl text-primary mb-4">
                  The Pinning Ceremony
                </h3>
                <p className="font-inter text-lg text-foreground leading-relaxed mb-4">
                  Upon completing all three acts of transformation, Summiters participate in a formal <span className="font-semibold text-primary">Pinning Ceremony</span>—a milestone event recognizing their journey through debate, musicology, and podcasting.
                </p>
                <p className="font-inter text-base text-foreground leading-relaxed mb-4">
                  Each Summiteer receives an official Teen Summit 2.0 pin, symbolizing their mastery of civic discourse, cultural knowledge, and media literacy. This ceremony honors not just completion, but transformation—marking the moment when participants become ambassadors of thoughtful engagement and critical thinking.
                </p>
                <div className="bg-background rounded-lg p-6 mt-6">
                  <p className="font-space-grotesk text-lg text-foreground font-medium mb-3">
                    The Ceremony Includes:
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2.5 flex-shrink-0"></div>
                      <p className="font-inter text-base text-muted-foreground">Formal recognition in front of family, faculty, and community leaders</p>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2.5 flex-shrink-0"></div>
                      <p className="font-inter text-base text-muted-foreground">Official Teen Summit 2.0 pin presentation</p>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2.5 flex-shrink-0"></div>
                      <p className="font-inter text-base text-muted-foreground">Certificate of completion and portfolio showcase</p>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2.5 flex-shrink-0"></div>
                      <p className="font-inter text-base text-muted-foreground">Celebration with cast members, families, and program supporters</p>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </Card>
        </ScrollReveal>
      </div>
    </section>
  );
}
