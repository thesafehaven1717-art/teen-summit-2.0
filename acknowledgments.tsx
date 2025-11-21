import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowLeft, Heart, Building2, Users, Award, FileText, Download, Eye } from "lucide-react";
import { ScrollReveal } from "@/components/animations/scroll-reveal";
import representativeAmmonsPhoto from "@assets/IMG_9499_1763406040875.jpeg";
import governorPritzkerPhoto from "@assets/IMG_9501_1763406126729.png";

export default function AcknowledgmentsPage() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-background sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="font-montserrat font-bold text-2xl text-primary">
              Teen Summit 2.0
            </h1>
          </div>
          <Link href="/">
            <Button variant="ghost" data-testid="button-back-home">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Button>
          </Link>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-4 py-16">
        <ScrollReveal>
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/30 rounded-full px-6 py-2 mb-6">
              <Heart className="h-4 w-4 text-primary fill-primary" />
              <p className="font-montserrat font-semibold text-sm text-primary uppercase tracking-wide">
                Gratitude & Recognition
              </p>
              <Heart className="h-4 w-4 text-primary fill-primary" />
            </div>
            <h1 className="font-montserrat font-bold text-4xl md:text-5xl lg:text-6xl text-foreground mb-6">
              With Grateful Thanks
            </h1>
            <p className="font-inter text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
              Teen Summit 2.0 is made possible through the visionary leadership and unwavering support of dedicated public servants and institutions committed to youth civic engagement.
            </p>
          </div>
        </ScrollReveal>

        <div className="space-y-8">
          <ScrollReveal direction="up">
            <Card className="p-8 md:p-12 bg-primary/5 border-primary/20">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                  <Building2 className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h2 className="font-montserrat font-bold text-2xl md:text-3xl text-primary mb-2">
                    State of Illinois
                  </h2>
                  <p className="font-inter text-base text-muted-foreground">
                    Supporting Youth Civic Engagement
                  </p>
                </div>
              </div>
              <p className="font-inter text-lg text-foreground leading-relaxed">
                We extend our deepest gratitude to the <span className="font-semibold text-primary">State of Illinois</span> for its commitment to empowering the next generation of civic leaders. Illinois' investment in youth programs demonstrates a profound understanding that democracy thrives when young voices are heard, valued, and equipped with the tools to engage meaningfully in public discourse.
              </p>
            </Card>
          </ScrollReveal>

          <ScrollReveal direction="up">
            <Card className="p-8 md:p-12 bg-accent/5 border-accent/20">
              <div className="grid md:grid-cols-[200px_1fr] gap-8 items-start">
                <div className="flex justify-center">
                  <img 
                    src={governorPritzkerPhoto} 
                    alt="Governor JB Pritzker" 
                    className="w-48 h-48 object-cover rounded-lg shadow-lg"
                    data-testid="img-governor-pritzker"
                  />
                </div>
                <div>
                  <div className="flex items-start gap-4 mb-6">
                    <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0">
                      <Award className="h-6 w-6 text-accent" />
                    </div>
                    <div>
                      <h2 className="font-montserrat font-bold text-2xl md:text-3xl text-accent mb-2">
                        Governor JB Pritzker
                      </h2>
                      <p className="font-inter text-base text-muted-foreground">
                        Champion of Youth Education & Opportunity
                      </p>
                    </div>
                  </div>
                  <p className="font-inter text-lg text-foreground leading-relaxed mb-4">
                    Thank you, <span className="font-semibold text-accent">Governor JB Pritzker</span>, for your steadfast dedication to education, equity, and opportunity for all Illinois youth. Your administration's commitment to ensuring that every young person—regardless of zip code or background—has access to transformative educational experiences makes programs like Teen Summit 2.0 possible.
                  </p>
                  <p className="font-inter text-base text-muted-foreground leading-relaxed">
                    Your vision for an Illinois where technology bridges divides and innovation empowers communities inspires us to create programming that prepares teens not just for college and careers, but for active, informed citizenship.
                  </p>
                </div>
              </div>
            </Card>
          </ScrollReveal>

          <ScrollReveal direction="up">
            <Card className="p-8 md:p-12 bg-primary/5 border-primary/20">
              <div className="grid md:grid-cols-[200px_1fr] gap-8 items-start">
                <div className="flex justify-center">
                  <img 
                    src={representativeAmmonsPhoto} 
                    alt="Representative Carol Ammons" 
                    className="w-48 h-48 object-cover rounded-lg shadow-lg"
                    data-testid="img-representative-ammons"
                  />
                </div>
                <div>
                  <div className="flex items-start gap-4 mb-6">
                    <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                      <Users className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h2 className="font-montserrat font-bold text-2xl md:text-3xl text-primary mb-2">
                        Representative Carol Ammons
                      </h2>
                      <p className="font-inter text-base text-muted-foreground">
                        Advocate for Youth & Community Empowerment
                      </p>
                    </div>
                  </div>
                  <p className="font-inter text-lg text-foreground leading-relaxed mb-4">
                    We are profoundly grateful to <span className="font-semibold text-primary">Representative Carol Ammons</span> for her tireless advocacy on behalf of Central Illinois youth and families. Your leadership in championing equity, education, and civic engagement has been instrumental in bringing Teen Summit 2.0 to life.
                  </p>
                  <p className="font-inter text-base text-muted-foreground leading-relaxed">
                    Representative Ammons understands that investing in youth voices today creates the strong, informed leaders our communities need tomorrow. Thank you for your unwavering support and for believing in the power of young people to shape our shared future.
                  </p>
                </div>
              </div>
            </Card>
          </ScrollReveal>

          <ScrollReveal direction="up">
            <Card className="p-8 md:p-12 bg-primary/5 border-primary/20">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h2 className="font-montserrat font-bold text-2xl md:text-3xl text-primary mb-2">
                    Congressional Black Caucus
                  </h2>
                  <p className="font-inter text-base text-muted-foreground">
                    Leading with Purpose & Principle
                  </p>
                </div>
              </div>
              <p className="font-inter text-lg text-foreground leading-relaxed mb-4">
                Teen Summit 2.0 proudly acknowledges the <span className="font-semibold text-primary">Congressional Black Caucus</span> for its historic and ongoing commitment to justice, equity, and opportunity. The CBC's leadership in advancing policies that uplift communities of color and ensure every young person has a seat at the table inspires everything we do.
              </p>
              <p className="font-inter text-base text-muted-foreground leading-relaxed">
                Thank you for modeling the kind of principled, informed civic engagement we hope to instill in every Teen Summit participant. Your work reminds us that democracy is strongest when diverse voices are not just heard, but centered in the decisions that shape our nation.
              </p>
            </Card>
          </ScrollReveal>

          <ScrollReveal direction="up">
            <Card className="p-8 md:p-12 text-center bg-card border-card-border">
              <h3 className="font-montserrat font-bold text-xl md:text-2xl text-foreground mb-4">
                A Community Commitment
              </h3>
              <p className="font-inter text-base text-muted-foreground leading-relaxed mb-6">
                Teen Summit 2.0 is more than a program—it's a promise. A promise that young voices matter, that civic engagement is not reserved for adults, and that with the right support, today's teens become tomorrow's transformative leaders.
              </p>
              <p className="font-inter text-base text-foreground leading-relaxed">
                To everyone who believes in this mission: <span className="font-semibold text-primary">Thank you.</span>
              </p>
            </Card>
          </ScrollReveal>

          {/* Platform Guide Download Section */}
          <ScrollReveal direction="up">
            <Card className="p-8 md:p-12 lg:p-16 bg-gradient-to-br from-primary/10 to-accent/10 border-primary/30">
              <div className="flex flex-col md:flex-row items-start md:items-center gap-6 lg:gap-10">
                <div className="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                  <FileText className="h-8 w-8 md:h-10 md:w-10 lg:h-12 lg:w-12 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="font-montserrat font-bold text-2xl md:text-3xl lg:text-4xl text-foreground mb-4 lg:mb-6">
                    Platform Guide Available
                  </h3>
                  <p className="font-inter text-base md:text-lg text-muted-foreground leading-relaxed mb-6 lg:mb-8 max-w-3xl">
                    Download our comprehensive guide that explains what Teen Summit 2.0 is and how the platform works. Written in plain language for everyone—no technical knowledge required.
                  </p>
                  <div className="flex flex-wrap gap-3 lg:gap-4 mb-4 lg:mb-6">
                    <a 
                      href="/guide.html" 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block"
                    >
                      <Button variant="default" size="lg" data-testid="button-view-guide">
                        <Eye className="h-4 w-4 mr-2" />
                        View Complete Guide
                      </Button>
                    </a>
                    <a 
                      href="/TEEN_SUMMIT_PLATFORM_GUIDE.md" 
                      download="Teen_Summit_2.0_Platform_Guide.md"
                      className="inline-block"
                    >
                      <Button variant="outline" size="lg" data-testid="button-download-guide">
                        <Download className="h-4 w-4 mr-2" />
                        Download Text Version
                      </Button>
                    </a>
                  </div>
                  <p className="font-inter text-sm md:text-base text-muted-foreground">
                    Includes: Program overview, how to navigate the site, application process, portal features, and FAQs
                  </p>
                </div>
              </div>
            </Card>
          </ScrollReveal>
        </div>

        <div className="text-center mt-16">
          <Link href="/">
            <Button size="lg" className="bg-primary hover:bg-primary/90" data-testid="button-return-home">
              <ArrowLeft className="h-5 w-5 mr-2" />
              Return to Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
