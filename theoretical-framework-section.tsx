import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { BookOpen, Users, Music, MessageSquare, Lightbulb } from "lucide-react";

const scholars = [
  {
    category: "Show Philosophy",
    icon: Lightbulb,
    scholars: [
      {
        name: "Jürgen Habermas",
        concept: "Public Sphere Theory",
        description: "Philosopher whose work on the public sphere and communicative action informs Teen Summit's approach to creating democratic civic space.",
      },
      {
        name: "John Dewey",
        concept: "Democratic Education",
        description: "Educational philosopher whose work on democracy and education underpins Teen Summit's commitment to youth civic engagement.",
      },
      {
        name: "C. Thi Nguyen",
        concept: "Epistemic Bubbles vs. Echo Chambers",
        description: "Philosopher who distinguishes between epistemic bubbles (lack of exposure to other views) and echo chambers (active distrust of outsiders). Teen Summit creates intentional spaces to burst bubbles through structured cross-ideological dialogue.",
      },
      {
        name: "Eli Pariser",
        concept: "The Filter Bubble",
        description: "Author of 'The Filter Bubble' (2011), documenting how algorithmic personalization creates information isolation. Teen Summit counters algorithmic echo chambers by curating diverse perspectives and facilitating face-to-face engagement across difference.",
      },
      {
        name: "Cass Sunstein",
        concept: "Fragmentation & Information Cocoons",
        description: "Legal scholar whose work on 'Republic.com' examines how personalized media creates polarization and information cocoons. Teen Summit's debate format ensures exposure to opposing viewpoints and evidence-based reasoning.",
      },
    ],
  },
  {
    category: "Pedagogy & Hip-Hop Education",
    icon: BookOpen,
    scholars: [
      {
        name: "Tony Reguesters",
        concept: "AfroFuturist",
        description: "Pioneering work in AfroFuturism and its application to youth empowerment and cultural education.",
      },
      {
        name: "Christopher Emdin",
        concept: '"Reality Pedagogy" and Cosmopolitanism',
        description: "Theorizes hip-hop's role in creating 'cosmopolitanism' - students moving between multiple worlds - and reality pedagogy as culturally responsive teaching.",
      },
      {
        name: "Marc Lamont Hill",
        concept: "Hip-Hop as Epistemology",
        description: "Author of 'Beats, Rhymes, and Classroom Life,' theorizes hip-hop as epistemology, not just aesthetic. His work on 'organic intellectualism' among Black youth supports teens as rigorous thinkers.",
      },
    ],
  },
  {
    category: "Hip-Hop Studies & Cultural Practice",
    icon: Music,
    scholars: [
      {
        name: "Tricia Rose",
        concept: "Hip-Hop as Black Cultural Practice",
        description: "Author of 'Black Noise,' the foundational text on hip-hop as Black cultural practice. Theorizes the DJ, MC, and b-boy as creators of alternative ways of hearing, producing sounds, and using public space.",
      },
      {
        name: "Mark Katz",
        concept: "Hip-Hop DJ Culture",
        description: "Author of 'Groove Music: The Art and Culture of the Hip-Hop DJ' (Oxford, 2012), documenting DJ culture as artistic practice.",
      },
      {
        name: "Sophy Smith",
        concept: "Turntablism & Collaboration",
        description: "Author of 'Hip-Hop Turntablism, Creativity and Collaboration' (Ashgate, 2015), exploring creative collaboration in hip-hop.",
      },
      {
        name: "Lynnée Denise",
        concept: '"DJ Scholarship"',
        description: "Coined the term 'DJ Scholarship' in 2013, establishing the intellectual framework for understanding DJing as scholarly practice.",
      },
    ],
  },
  {
    category: "Debate & Critical Discourse",
    icon: MessageSquare,
    scholars: [
      {
        name: "Bo Seo",
        concept: '"Collaborative Antagonism"',
        description: "Author of 'Good Arguments' (2022). Central thesis: debate is 'collaborative antagonism' - a joint search for truth through structured disagreement. Positions debate as epistemic practice requiring cognitive flexibility.",
      },
      {
        name: "Eric Jarosinski",
        concept: "Philosophy of Negation",
        description: "Author of 'Nein. A Manifesto' (2015). Argues that saying 'no' is intellectually demanding work requiring comprehensive analysis and understanding of what you're negating.",
      },
      {
        name: "Mr. Jim Seeden",
        concept: "Minnesota Debate Excellence",
        description: "Recipient of the James Graupner Distinguished Service Award, one of the highest honors in Minnesota debate. Recognized by the Minnesota Debate Teachers Association.",
      },
    ],
  },
  {
    category: "African American Verbal Art & Communication",
    icon: Users,
    scholars: [
      {
        name: "Claudia Mitchell-Kernan",
        concept: '"Signifying" and Verbal Art',
        description: "Author of 'Signifying' in Mother Wit from the Laughing Barrel (1972) and ethnographic work on African American verbal art, documenting sophisticated rhetorical traditions.",
      },
    ],
  },
];

export function TheoreticalFrameworkSection() {
  return (
    <section className="py-24 px-4 bg-muted">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="font-montserrat font-bold text-4xl md:text-5xl text-foreground mb-6">
            Theoretical Framework
          </h2>
          <p className="font-inter text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Teen Summit 2.0 is built on rigorous scholarship from leading thinkers in pedagogy, hip-hop studies, debate, and civic engagement
          </p>
        </div>

        {/* Scholars Accordion */}
        <Accordion type="single" collapsible className="space-y-4">
          {scholars.map((category, categoryIndex) => {
            const Icon = category.icon;
            return (
              <AccordionItem
                key={categoryIndex}
                value={`category-${categoryIndex}`}
                className="bg-card border border-card-border rounded-md overflow-hidden"
                data-testid={`framework-category-${categoryIndex}`}
              >
                <AccordionTrigger className="px-6 py-4 hover:no-underline hover-elevate">
                  <div className="flex items-center gap-4 text-left">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <span className="font-montserrat font-bold text-xl text-foreground">
                      {category.category}
                    </span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-6">
                  <div className="space-y-6 pt-4">
                    {category.scholars.map((scholar, scholarIndex) => (
                      <div
                        key={scholarIndex}
                        className="border-l-4 border-primary pl-6 py-2"
                        data-testid={`scholar-${categoryIndex}-${scholarIndex}`}
                      >
                        <h4 className="font-montserrat font-bold text-lg text-foreground mb-1">
                          {scholar.name}
                        </h4>
                        <p className="font-space-grotesk text-base text-primary font-medium mb-2">
                          {scholar.concept}
                        </p>
                        <p className="font-inter text-base text-muted-foreground leading-relaxed">
                          {scholar.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            );
          })}
        </Accordion>

        {/* Additional Context */}
        <div className="mt-12 text-center">
          <p className="font-inter text-base text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            This theoretical foundation ensures Teen Summit 2.0 is not just a media project, but a rigorous educational experience grounded in decades of scholarship on youth empowerment, cultural practice, and democratic discourse.
          </p>
        </div>
      </div>
    </section>
  );
}
