import { Check, Award, Users, Briefcase, TrendingUp, Trophy, Gift, Sparkles, Star } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollReveal } from "@/components/animations/scroll-reveal";
import { StaggerContainer, StaggerItem } from "@/components/animations/scroll-reveal";
import { motion } from "framer-motion";
import { Link } from "wouter";
import uniformImage from "@assets/generated_images/Teen_Summit_athletic_uniform_design_ea0862de.png";
import uniformTeen1 from "@assets/generated_images/African_American_teen_consistent_logo_bbb0214f.png";
import uniformTeen2 from "@assets/generated_images/Latino_teen_boy_consistent_logo_f8341c73.png";
import uniformTeen3 from "@assets/generated_images/Fair-skinned_teen_consistent_logo_14313c13.png";
import capitalFormsImage from "@assets/generated_images/Clean_Three_Capital_infographic_simple_24407603.png";
import drMckeePhoto from "@assets/IMG_9503_1763407676497.jpeg";

const benefits = [
  { icon: Award, text: "Professional media training and public speaking skills" },
  { icon: TrendingUp, text: "Academic Civic NILS (Name, Image, Likeness, Story) development—learn to build YOUR brand" },
  { icon: Award, text: "College credit potential (in development with University of Illinois)" },
  { icon: Briefcase, text: "Compensation for your work (you will be paid for your participation)" },
  { icon: Users, text: "Meals provided during all production days" },
  { icon: Users, text: "Bus cards provided for transportation to and from the station" },
  { icon: Award, text: "Professional portfolio content (videos, photos, resume material)" },
  { icon: Users, text: "Mentorship from industry professionals and UIUC faculty" },
  { icon: TrendingUp, text: "Network with peers who care about making a difference" },
];

const expectations = [
  "12-week commitment (Spring 2026 shooting season, Fall 2026 release)",
  "Friday afternoons: 4pm arrival (snacks & beverages provided)",
  "Friday Schedule: 4-6:30pm dossier meetings",
  "Saturday production days: 8am-5pm (breakfast, topic review, shooting, lunch provided)",
  "Saturday Schedule: 8-9am feeding & topics | 10am-1pm shooting | 1:30pm lunch",
  "Professional conduct and teamwork",
  "Respectful engagement with all perspectives",
];

export function ForTeensSection() {
  return (
    <section className="py-24 px-4 bg-background">
      <div className="max-w-7xl mx-auto">
        {/* Headline */}
        <ScrollReveal direction="down">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/30 rounded-full px-6 py-2 mb-6">
              <Sparkles className="h-4 w-4 text-primary" />
              <p className="font-montserrat font-semibold text-sm text-primary uppercase tracking-wide">
                An Elite Opportunity
              </p>
              <Sparkles className="h-4 w-4 text-primary" />
            </div>
            <h2 className="font-montserrat font-bold text-4xl md:text-5xl lg:text-6xl text-foreground mb-6">
              You Were Chosen For A Reason
            </h2>
            <div className="max-w-3xl mx-auto space-y-6">
              <p className="font-inter text-lg md:text-xl text-foreground leading-relaxed">
                Out of hundreds of applicants, <span className="font-bold text-primary">only a select few</span> will be chosen to join Teen Summit 2.0.
              </p>
              <p className="font-inter text-lg md:text-xl text-foreground leading-relaxed">
                We see your potential. We hear your voice. We recognize your leadership.
              </p>
              <p className="font-inter text-lg md:text-xl text-foreground leading-relaxed">
                <span className="text-primary font-semibold">You have something important to say and the world needs to hear it.</span> This isn't just a TV show—it's an <span className="font-bold text-primary">exclusive platform</span> for exceptional young leaders. If you're chosen, the world will hear it.
              </p>
              <div className="bg-primary/5 border border-primary/20 rounded-lg p-6 mt-8">
                <p className="font-space-grotesk text-xl md:text-2xl text-primary font-semibold">
                  Being selected as a Summiteer means you're joining an elite group of changemakers—skills and connections that will follow you to college, careers, and beyond.
                </p>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Prize Highlights */}
        <ScrollReveal direction="up">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 max-w-4xl mx-auto">
            <motion.div
              whileHover={{ y: -5 }}
              transition={{ duration: 0.3 }}
              className="relative overflow-hidden"
            >
              <Card className="p-8 bg-gradient-to-br from-primary/10 to-primary/5 border-primary/30 h-full hover-elevate">
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 mb-4 rounded-full bg-primary/20 flex items-center justify-center">
                    <Trophy className="w-8 h-8 text-primary" />
                  </div>
                  <h4 className="font-montserrat font-bold text-3xl md:text-4xl text-primary mb-2">
                    $40,000
                  </h4>
                  <p className="font-inter text-sm md:text-base text-foreground">
                    In Total Prizes
                  </p>
                </div>
              </Card>
            </motion.div>

            <motion.div
              whileHover={{ y: -5 }}
              transition={{ duration: 0.3 }}
              className="relative overflow-hidden"
            >
              <Card className="p-8 bg-gradient-to-br from-primary/10 to-primary/5 border-primary/30 h-full hover-elevate">
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 mb-4 rounded-full bg-primary/20 flex items-center justify-center">
                    <Award className="w-8 h-8 text-primary" />
                  </div>
                  <h4 className="font-montserrat font-bold text-3xl md:text-4xl text-primary mb-2">
                    $10,000
                  </h4>
                  <p className="font-inter text-sm md:text-base text-foreground">
                    In Scholarships
                  </p>
                </div>
              </Card>
            </motion.div>
          </div>

          <div className="flex justify-center mb-16">
            <motion.div
              whileHover={{ y: -5 }}
              transition={{ duration: 0.3 }}
              className="relative overflow-hidden max-w-md w-full"
            >
              <Card className="p-8 bg-gradient-to-br from-accent/20 to-accent/10 border-accent/40 hover-elevate">
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 mb-4 rounded-full bg-accent/30 flex items-center justify-center">
                    <Gift className="w-8 h-8 text-accent" />
                  </div>
                  <h4 className="font-montserrat font-bold text-2xl md:text-3xl text-accent mb-2">
                    Secret Prize
                  </h4>
                  <p className="font-inter text-sm md:text-base text-foreground">
                    From a Billionaire
                  </p>
                </div>
              </Card>
            </motion.div>
          </div>
        </ScrollReveal>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          {/* What You'll Gain */}
          <ScrollReveal direction="left">
            <div>
              <h3 className="font-montserrat font-bold text-2xl md:text-3xl text-foreground mb-8">
                What You'll Gain
              </h3>
              <StaggerContainer className="space-y-4">
                {benefits.map((benefit, index) => {
                  const Icon = benefit.icon;
                  return (
                    <StaggerItem key={index}>
                      <div
                        className="flex items-start gap-4 group"
                        data-testid={`benefit-${index}`}
                      >
                        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center mt-1">
                          <Check className="w-4 h-4 text-primary" />
                        </div>
                        <p className="font-inter text-base md:text-lg text-foreground leading-relaxed">
                          {benefit.text}
                        </p>
                      </div>
                    </StaggerItem>
                  );
                })}
              </StaggerContainer>
            </div>
          </ScrollReveal>

          {/* What We Expect */}
          <ScrollReveal direction="right">
            <div>
              <h3 className="font-montserrat font-bold text-2xl md:text-3xl text-foreground mb-8">
                What We Expect From You
              </h3>
              <StaggerContainer className="space-y-4 mb-8">
                {expectations.map((expectation, index) => (
                  <StaggerItem key={index}>
                    <div
                      className="flex items-start gap-4"
                      data-testid={`expectation-${index}`}
                    >
                      <div className="flex-shrink-0 w-2 h-2 rounded-full bg-muted-foreground mt-2.5"></div>
                      <p className="font-inter text-base md:text-lg text-foreground leading-relaxed">
                        {expectation}
                      </p>
                    </div>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </div>
          </ScrollReveal>
        </div>

        {/* The Uniform Card */}
        <Card className="p-8 md:p-12 mb-12 bg-card border-card-border">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="font-montserrat font-bold text-2xl md:text-3xl text-foreground mb-4">
                The Uniform
              </h3>
              <p className="font-inter text-lg text-foreground leading-relaxed mb-4">
                You'll receive custom Teen Summit 2.0 branded athleisure uniforms—yours to keep. This isn't just merch; it's your armor. When you put it on, you're representing something bigger than yourself.
              </p>
              <p className="font-inter text-lg text-foreground leading-relaxed mb-4">
                <span className="font-semibold text-primary">Make it yours.</span> You have the ability to swag out the uniforms—personalize them, style them your way, and express your individuality while representing Teen Summit 2.0. Your voice, your style, your platform.
              </p>
              <div className="bg-primary/5 rounded-lg p-4 border border-primary/20 mb-4">
                <h4 className="font-montserrat font-semibold text-base text-foreground mb-2">
                  Uniform Details:
                </h4>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                    <p className="font-inter text-sm text-foreground">All-black athletic tracksuit with premium fabric</p>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                    <p className="font-inter text-sm text-foreground">Vibrant orange and blue racing stripes</p>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                    <p className="font-inter text-sm text-foreground">Teen Summit 2.0 logo on jacket and pants</p>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                    <p className="font-inter text-sm text-foreground">Professional Adidas/Nike style athletic wear</p>
                  </li>
                </ul>
              </div>
              <p className="font-inter text-base text-muted-foreground">
                Extra uniforms are available at the station if needed.
              </p>
            </div>
            <div className="relative">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                <div className="rounded-xl overflow-hidden bg-gradient-to-br from-primary/10 to-accent/10 p-4">
                  <img 
                    src={uniformTeen1} 
                    alt="African American teenage girl wearing Teen Summit 2.0 black athletic tracksuit with orange and blue stripes" 
                    className="w-full h-auto rounded-lg object-cover"
                    data-testid="img-uniform-teen-1"
                  />
                </div>
                <div className="rounded-xl overflow-hidden bg-gradient-to-br from-primary/10 to-accent/10 p-4">
                  <img 
                    src={uniformTeen2} 
                    alt="Latino teenage boy wearing Teen Summit 2.0 black athletic tracksuit with orange and blue stripes" 
                    className="w-full h-auto rounded-lg object-cover"
                    data-testid="img-uniform-teen-2"
                  />
                </div>
                <div className="rounded-xl overflow-hidden bg-gradient-to-br from-primary/10 to-accent/10 p-4">
                  <img 
                    src={uniformTeen3} 
                    alt="Fair-skinned teenage girl wearing Teen Summit 2.0 black athletic tracksuit with orange and blue stripes" 
                    className="w-full h-auto rounded-lg object-cover"
                    data-testid="img-uniform-teen-3"
                  />
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* NIL Rights Card */}
        <Card className="p-8 md:p-12 bg-primary/5 border-primary/20">
          <h3 className="font-montserrat font-bold text-2xl md:text-3xl text-primary mb-4">
            Your Academic Civic NILS Rights
          </h3>
          <p className="font-space-grotesk text-xl md:text-2xl text-foreground font-medium mb-6 leading-relaxed">
            You own your image. You own your voice. You own your story.
          </p>
          <p className="font-inter text-lg text-foreground leading-relaxed mb-6">
            We'll teach you how to build your personal brand, grow your social media presence, and position yourself for opportunities beyond this show. Think of this as your entry into the creator economy—with professional guidance every step of the way.
          </p>
          
          <div className="mb-6">
            <h4 className="font-montserrat font-semibold text-lg text-foreground mb-4">
              Three Essential Forms of Capital You'll Develop:
            </h4>
            <div className="rounded-lg overflow-hidden border border-primary/20 mb-6">
              <img 
                src={capitalFormsImage} 
                alt="Three Forms of Capital: Intellectual, Social, and Financial Capital" 
                className="w-full h-auto"
              />
            </div>
            
            <div className="space-y-4">
              <div className="bg-background/50 rounded-lg p-4 border border-primary/20">
                <h5 className="font-montserrat font-semibold text-base text-primary mb-2">
                  Intellectual Capital
                </h5>
                <p className="font-inter text-sm text-foreground leading-relaxed">
                  Develop critical thinking, research, and debate skills through rigorous civic discourse. Explore <span className="font-semibold">musicology</span>—the academic study of music's cultural, historical, and social contexts—learning how music shapes and reflects societal movements, identities, and political change. Understand music as a powerful form of civic expression and cultural documentation.
                </p>
              </div>
              
              <div className="bg-background/50 rounded-lg p-4 border border-primary/20">
                <h5 className="font-montserrat font-semibold text-base text-accent mb-2">
                  Social Capital
                </h5>
                <p className="font-inter text-sm text-foreground leading-relaxed">
                  Build meaningful connections with fellow Summiters, professionals, professors, and potential celebrities. Network with industry leaders and expand your circle of influence.
                </p>
              </div>
              
              <div className="bg-background/50 rounded-lg p-4 border border-primary/20">
                <h5 className="font-montserrat font-semibold text-base text-primary mb-2">
                  Financial Capital
                </h5>
                <p className="font-inter text-sm text-foreground leading-relaxed">
                  Receive compensation, access scholarship opportunities, and learn professional brand-building strategies that open doors to future opportunities in media, education, and beyond.
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* Communiversity Public Media Project - Canvas Access */}
        <Card className="p-8 md:p-12 mb-12 bg-card border-card-border">
          <h3 className="font-montserrat font-bold text-2xl md:text-3xl text-foreground mb-4">
            The Communiversity Approach
          </h3>
          <p className="font-inter text-lg text-foreground leading-relaxed mb-4">
            As part of the <span className="font-semibold text-primary">Communiversity Public Media Project</span>, we believe that teaching civics is a community endeavor. All materials—including trainings, workshops, and meeting content—are available to teens and their families.
          </p>
          <p className="font-inter text-lg text-foreground leading-relaxed mb-4">
            The University of Illinois is proud to be a <span className="font-semibold">Land Grant Institution</span> that uses technology in groundbreaking ways. We ensure that digital divide issues aren't a hindrance to learning.
          </p>
          <div className="bg-primary/5 rounded-lg p-6 border border-primary/20">
            <p className="font-inter text-base text-foreground leading-relaxed">
              <span className="font-semibold text-primary">All materials are available on Canvas</span>, the University's digital learning platform. Whether you're selected as a Summiteer or simply want to learn, you'll have access to the same high-quality civic education resources.
            </p>
          </div>
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6 bg-gradient-to-br from-primary/10 to-accent/10 rounded-lg p-8 md:p-10 border-2 border-primary/30 mt-8">
            <img 
              src={drMckeePhoto} 
              alt="Dr. McKee" 
              className="w-40 h-40 rounded-full object-cover border-4 border-primary/30 shadow-lg"
              data-testid="img-dr-mckee-teens"
            />
            <div className="flex-1 text-center md:text-left">
              <h4 className="font-montserrat font-bold text-2xl md:text-3xl text-primary mb-3">
                Dr. Malaika McKee
              </h4>
              <p className="font-inter text-base md:text-lg text-foreground leading-relaxed">
                Creator, Showrunner, and Co-Producer of Teen Summit 2.0 and creator of the Flip the Script methodology. She is the Founder and Director of the Communiversity Public Media Project and currently serving as Chancellor's Fellow at UIUC in the{" "}
                <a 
                  href="https://publicengagement.illinois.edu" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary hover:underline font-semibold"
                  data-testid="link-public-engagement-teens"
                >
                  Office of Public Engagement
                </a>.
              </p>
            </div>
          </div>
        </Card>

        {/* CTA */}
        <ScrollReveal>
          <div className="text-center mt-16">
            <h3 className="font-montserrat font-bold text-3xl md:text-4xl text-foreground mb-4">
              Do You Have What It Takes?
            </h3>
            <p className="font-inter text-lg md:text-xl text-muted-foreground mb-4">
              Submit your application and compete for a spot among Central Illinois' most promising young voices.
            </p>
            <p className="font-inter text-base text-primary font-semibold mb-8">
              Only the most dedicated, thoughtful, and passionate applicants will be selected.
            </p>
            <Link href="/apply/summiteer">
              <Button
                size="lg"
                className="h-14 px-8 bg-primary hover:bg-primary/90 font-montserrat font-bold text-lg transition-all hover:scale-105"
                data-testid="button-for-teens-summiteer-cta"
              >
                <Star className="mr-2 h-5 w-5 fill-white" />
                Apply for Selection
              </Button>
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
