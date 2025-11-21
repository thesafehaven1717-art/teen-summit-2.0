import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, Building2, Users, Award, FileText, Download, Eye, Radio } from "lucide-react";
import { ScrollReveal } from "@/components/animations/scroll-reveal";
import representativeAmmonsPhoto from "@assets/IMG_9499_1763406040875.jpeg";
import governorPritzkerPhoto from "@assets/IMG_9501_1763406126729.png";
import ilbcfLogo from "@assets/IMG_9600_1763619485590.png";
import illinoisPublicMediaLogo from "@assets/IMG_9602_1763621397642.jpg";
import reginaldHardwickPhoto from "@assets/IMG_9601_1763620161924.png";

export function AcknowledgmentsSection() {
  return (
    <section className="py-24 px-4 bg-background" id="acknowledgments">
      <div className="max-w-5xl mx-auto">
        <ScrollReveal>
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/30 rounded-full px-6 py-2 mb-6">
              <Heart className="h-4 w-4 text-primary fill-primary" />
              <p className="font-montserrat font-semibold text-sm text-primary uppercase tracking-wide">
                Gratitude & Recognition
              </p>
              <Heart className="h-4 w-4 text-primary fill-primary" />
            </div>
            <h2 className="font-montserrat font-bold text-4xl md:text-5xl lg:text-6xl text-foreground mb-6">
              With Grateful Thanks
            </h2>
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
                  <h3 className="font-montserrat font-bold text-2xl md:text-3xl text-primary mb-2">
                    State of Illinois
                  </h3>
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
                      <h3 className="font-montserrat font-bold text-2xl md:text-3xl text-accent mb-2">
                        Governor JB Pritzker
                      </h3>
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
            <Card className="p-10 md:p-14 bg-primary/5 border-primary/20">
              <div className="grid md:grid-cols-[200px_1fr] gap-10 items-start">
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
                    <div className="w-14 h-14 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                      <Users className="h-7 w-7 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-montserrat font-bold text-3xl md:text-4xl text-primary mb-2">
                        Representative Carol Ammons
                      </h3>
                      <p className="font-inter text-lg text-muted-foreground">
                        Advocate for Youth & Community Empowerment
                      </p>
                    </div>
                  </div>
                  <p className="font-inter text-xl text-foreground leading-relaxed mb-4">
                    We are profoundly grateful to <span className="font-semibold text-primary">Representative Carol Ammons</span> for her tireless advocacy on behalf of Central Illinois youth and families. Your leadership in championing equity, education, and civic engagement has been instrumental in bringing Teen Summit 2.0 to life.
                  </p>
                  <p className="font-inter text-lg text-muted-foreground leading-relaxed">
                    Representative Ammons understands that investing in youth voices today creates the strong, informed leaders our communities need tomorrow. Thank you for your unwavering support and for believing in the power of young people to shape our shared future.
                  </p>
                </div>
              </div>
            </Card>
          </ScrollReveal>

          <ScrollReveal direction="up">
            <Card className="p-8 md:p-12 bg-primary/5 border-primary/20">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-32 h-32 flex items-center justify-center flex-shrink-0">
                  <img 
                    src={ilbcfLogo} 
                    alt="Illinois Legislative Black Caucus Foundation" 
                    className="w-32 h-32 object-contain"
                    data-testid="img-ilbcf-logo"
                  />
                </div>
                <div>
                  <h3 className="font-montserrat font-bold text-2xl md:text-3xl text-primary mb-2">
                    Congressional Black Caucus
                  </h3>
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
            <Card className="p-8 md:p-12 bg-accent/5 border-accent/20">
              <div className="grid md:grid-cols-[200px_1fr] gap-8 items-start mb-8">
                <div className="flex justify-center">
                  <a 
                    href="https://will.illinois.edu" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="hover:opacity-80 transition-opacity"
                    data-testid="link-illinois-public-media"
                  >
                    <img 
                      src={illinoisPublicMediaLogo} 
                      alt="Illinois Public Media" 
                      className="w-48 h-48 object-contain"
                      data-testid="img-illinois-public-media-logo"
                    />
                  </a>
                </div>
                <div>
                  <h3 className="font-montserrat font-bold text-2xl md:text-3xl text-accent mb-2">
                    Illinois Public Media
                  </h3>
                  <p className="font-inter text-base text-muted-foreground mb-4">
                    Amplifying Voices, Building Community
                  </p>
                  <p className="font-inter text-lg text-foreground leading-relaxed mb-4">
                    We are deeply grateful to <span className="font-semibold text-accent">Illinois Public Media</span> for their partnership in bringing Teen Summit 2.0 to audiences across Central Illinois and beyond. As the public broadcasting service of the University of Illinois, Illinois Public Media has a rich legacy of elevating diverse voices and creating space for meaningful community dialogue.
                  </p>
                  <p className="font-inter text-base text-muted-foreground leading-relaxed">
                    Thank you for your commitment to public service media that educates, informs, and inspires. Your platform provides the essential infrastructure that allows Teen Summit 2.0 to reach homes, classrooms, and communities throughout our region, ensuring that youth civic engagement becomes not just a program, but a public conversation.
                  </p>
                </div>
              </div>
              
              <div className="grid md:grid-cols-[200px_1fr] gap-8 items-start pt-8 border-t border-accent/20">
                <div className="flex justify-center">
                  <img 
                    src={reginaldHardwickPhoto} 
                    alt="Reginald Hardwick" 
                    className="w-48 h-48 object-cover rounded-lg shadow-lg"
                    data-testid="img-reginald-hardwick"
                  />
                </div>
                <div>
                  <div className="flex items-start gap-4 mb-6">
                    <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0">
                      <Radio className="h-6 w-6 text-accent" />
                    </div>
                    <div>
                      <h4 className="font-montserrat font-bold text-2xl md:text-3xl text-accent mb-2">
                        Reginald Hardwick
                      </h4>
                      <p className="font-inter text-base text-muted-foreground">
                        Co-Executive Producer, TS2 The Remix | News and Public Affairs Director
                      </p>
                    </div>
                  </div>
                  <p className="font-inter text-lg text-foreground leading-relaxed">
                    Special thanks to <span className="font-semibold text-accent">Reginald Hardwick</span>, regional Emmy Award winner, whose vision and leadership at Illinois Public Media has been instrumental in championing Teen Summit 2.0. As Co-Executive Producer of TS2 The Remix and News and Public Affairs Director at WILL, your dedication to creating platforms for youth voices ensures that the next generation has the tools and opportunities to shape public discourse and engage meaningfully in their communities.
                  </p>
                </div>
              </div>
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
        </div>
      </div>
    </section>
  );
}
