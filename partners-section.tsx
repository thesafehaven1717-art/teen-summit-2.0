import { Building2, Radio, Heart, Music, Users, Lightbulb, MessageCircle, TrendingUp, Megaphone, Target, Sparkles, Camera } from "lucide-react";
import { ScrollReveal } from "@/components/animations/scroll-reveal";
import { StaggerContainer, StaggerItem } from "@/components/animations/scroll-reveal";
import { motion } from "framer-motion";
import safeHavenImage from "@assets/IMG_5940_1763621420229.jpg";
import collegeOfEducationLogo from "@assets/IMG_9603_1763621533033.png";
import hipHopInnovationLogo from "@assets/IMG_9604_1763621654729.png";
import willLogo from "@assets/IMG_9605_1763621811665.jpg";

const institutionalPartners = [
  {
    name: "College of Education",
    subtitle: "University of Illinois Urbana-Champaign",
    icon: Building2,
    image: collegeOfEducationLogo,
    url: "https://education.illinois.edu",
  },
  {
    name: "WILL / Illinois Public Media",
    subtitle: "Public Broadcasting",
    icon: Radio,
    image: willLogo,
    url: "https://will.illinois.edu",
  },
  {
    name: "The Safe Haven Studio",
    subtitle: "Community Partner",
    icon: Heart,
    image: safeHavenImage,
    url: "https://www.thesafehavenstudio.net",
  },
  {
    name: "Hip Hop Innovation Center",
    subtitle: "Cultural Arts Partner",
    icon: Music,
    image: hipHopInnovationLogo,
    url: "https://publish.illinois.edu/hip-hop-mus-ed-symposium/hip-hop-innovation-center/",
  },
];

const focusAreas = [
  {
    name: "Youth Culture",
    subtitle: "Authentic Expression",
    icon: Sparkles,
  },
  {
    name: "Civic Engagement",
    subtitle: "Active Participation",
    icon: Users,
  },
  {
    name: "Youth Issues",
    subtitle: "Real Solutions",
    icon: MessageCircle,
  },
  {
    name: "Youth Action & Activism",
    subtitle: "Making Change",
    icon: Megaphone,
  },
  {
    name: "Youth-Led Initiatives",
    subtitle: "Student-Driven",
    icon: Target,
  },
  {
    name: "Youth Empowerment",
    subtitle: "Building Leaders",
    icon: Camera,
  },
];

export function PartnersSection() {
  return (
    <section className="py-24 px-4 bg-muted">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <ScrollReveal direction="down">
          <div className="text-center mb-16">
            <h2 className="font-montserrat font-bold text-4xl md:text-5xl text-foreground mb-6">
              Communiversity & Partners
            </h2>
            <p className="font-inter text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
              Teen Summit 2.0 is made possible through the collaboration of distinguished partners committed to empowering youth voices
            </p>
          </div>
        </ScrollReveal>

        {/* Institutional Partners Grid */}
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20" staggerDelay={0.1}>
          {institutionalPartners.map((partner, index) => {
            const Icon = partner.icon;
            return (
              <StaggerItem key={index}>
                <motion.div
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.2 }}
                  className="group flex flex-col items-center text-center p-8 bg-card border border-card-border rounded-md hover-elevate transition-all h-full"
                  data-testid={`partner-${index}`}
                >
                  {/* Logo Placeholder */}
                  {partner.image ? (
                    partner.url ? (
                      <a 
                        href={partner.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="block w-full"
                        data-testid={`link-partner-${partner.name.toLowerCase().replace(/\s+/g, '-')}`}
                      >
                        <motion.div 
                          whileHover={{ scale: 1.05 }}
                          transition={{ duration: 0.3 }}
                          className={`w-full ${partner.name === "College of Education" ? "aspect-auto" : "aspect-square"} mb-6 rounded-md overflow-hidden border border-border group-hover:border-primary transition-colors ${partner.name === "The Safe Haven Studio" ? "" : partner.name === "College of Education" ? "bg-background p-6" : "bg-background p-4"}`}
                        >
                          <img 
                            src={partner.image} 
                            alt={partner.name}
                            className={`w-full ${partner.name === "College of Education" ? "h-auto" : "h-full"} ${partner.name === "The Safe Haven Studio" ? "object-cover" : "object-contain"}`}
                            data-testid={`img-partner-${partner.name.toLowerCase().replace(/\s+/g, '-')}`}
                          />
                        </motion.div>
                      </a>
                    ) : (
                      <motion.div 
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.3 }}
                        className={`w-full ${partner.name === "College of Education" ? "aspect-auto" : "aspect-square"} mb-6 rounded-md overflow-hidden border border-border group-hover:border-primary transition-colors ${partner.name === "The Safe Haven Studio" ? "" : partner.name === "College of Education" ? "bg-background p-6" : "bg-background p-4"}`}
                      >
                        <img 
                          src={partner.image} 
                          alt={partner.name}
                          className={`w-full ${partner.name === "College of Education" ? "h-auto" : "h-full"} ${partner.name === "The Safe Haven Studio" ? "object-cover" : "object-contain"}`}
                        />
                      </motion.div>
                    )
                  ) : (
                    <motion.div 
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                      className="w-24 h-24 mb-6 rounded-md bg-gradient-to-br from-primary/10 to-transparent flex items-center justify-center border border-border group-hover:border-primary transition-colors"
                    >
                      <Icon className="w-12 h-12 text-muted-foreground group-hover:text-primary transition-colors" />
                    </motion.div>
                  )}

                  {/* Partner Name */}
                  <h3 className="font-montserrat font-bold text-lg text-foreground mb-2">
                    {partner.name}
                  </h3>

                  {/* Subtitle */}
                  <p className="font-inter text-sm text-muted-foreground">
                    {partner.subtitle}
                  </p>
                </motion.div>
              </StaggerItem>
            );
          })}
        </StaggerContainer>

        {/* Focus Areas Section */}
        <ScrollReveal direction="up">
          <div className="text-center mb-12">
            <h3 className="font-montserrat font-bold text-3xl md:text-4xl text-foreground mb-4">
              Our Focus Areas
            </h3>
            <p className="font-inter text-lg text-muted-foreground max-w-2xl mx-auto">
              Teen Summit 2.0 centers youth voices across critical areas of civic and cultural engagement
            </p>
          </div>
        </ScrollReveal>

        <StaggerContainer className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6" staggerDelay={0.08}>
          {focusAreas.map((area, index) => {
            const Icon = area.icon;
            return (
              <StaggerItem key={index}>
                <motion.div
                  whileHover={{ y: -5, scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                  className="group flex flex-col items-center text-center p-6 bg-gradient-to-br from-primary/5 to-transparent border border-primary/20 rounded-md hover-elevate transition-all h-full"
                  data-testid={`focus-area-${index}`}
                >
                  <motion.div
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                    className="w-16 h-16 mb-4 rounded-md bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center"
                  >
                    <Icon className="w-8 h-8 text-primary" />
                  </motion.div>

                  <h4 className="font-montserrat font-bold text-sm text-foreground mb-1 leading-tight">
                    {area.name}
                  </h4>

                  <p className="font-inter text-xs text-muted-foreground">
                    {area.subtitle}
                  </p>
                </motion.div>
              </StaggerItem>
            );
          })}
        </StaggerContainer>

        {/* Congressional Communiversity Partners */}
        <div className="mt-20">
          <ScrollReveal direction="up">
            <div className="text-center mb-12">
              <h3 className="font-montserrat font-bold text-3xl md:text-4xl text-foreground mb-4">
                Congressional Communiversity Partners
              </h3>
              <p className="font-inter text-lg text-muted-foreground max-w-2xl mx-auto">
                Teen Summit 2.0 is supported by a network of civic, educational, and cultural institutions
              </p>
            </div>
          </ScrollReveal>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" staggerDelay={0.08}>
            {[
              "Congressional Black Caucus",
              "Representative Carol Ammons",
              "Stratford College",
              "Krannert Center",
              "University of Illinois Student Affairs",
              "Office of Public Engagement",
              "The Chancellor's Office",
              "College of Fine and Applied Arts (FAA)",
              "The U of I Alumni Association"
            ].map((partner, index) => (
              <StaggerItem key={index}>
                <motion.div
                  whileHover={{ y: -3 }}
                  transition={{ duration: 0.2 }}
                  className="px-6 py-4 bg-card border border-card-border rounded-md hover-elevate text-center"
                  data-testid={`congressional-partner-${index}`}
                >
                  <p className="font-inter text-sm md:text-base text-foreground">
                    {partner}
                  </p>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </div>
    </section>
  );
}
