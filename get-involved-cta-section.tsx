import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Star, Users, Mic2, Mail } from "lucide-react";
import { ScrollReveal } from "@/components/animations/scroll-reveal";
import { CountdownTimer } from "@/components/countdown-timer";

export function GetInvolvedCTASection() {
  // Spring 2026 application deadline: February 1, 2026
  const applicationDeadline = new Date('2026-02-01T23:59:59');

  const opportunities = [
    {
      icon: Star,
      title: "Become a Summiteer",
      description: "Join as a teen participant and share your voice on the issues that matter most to you and your community.",
      href: "/apply/summiteer",
      buttonText: "Apply Now",
      testId: "button-apply-summiteer",
      color: "primary",
    },
    {
      icon: Users,
      title: "Volunteer",
      description: "Help bring Teen Summit 2.0 to life by volunteering your time and skills in production, mentoring, or event support.",
      href: "/apply/volunteer",
      buttonText: "Volunteer",
      testId: "button-apply-volunteer",
      color: "secondary",
    },
    {
      icon: Mic2,
      title: "Be a Guest Speaker",
      description: "Share your expertise and perspective with engaged teen participants on topics that shape our democracy.",
      href: "/apply/guest",
      buttonText: "Apply to Speak",
      testId: "button-apply-guest",
      color: "secondary",
    },
    {
      icon: Mail,
      title: "Join Our Newsletter",
      description: "Stay updated with the latest news, episodes, and opportunities from Teen Summit 2.0.",
      href: "/newsletter",
      buttonText: "Subscribe",
      testId: "button-newsletter",
      color: "secondary",
    },
  ];

  return (
    <section className="py-20 px-4 bg-muted/30">
      <div className="max-w-7xl mx-auto">
        <ScrollReveal>
          <div className="text-center mb-12">
            <h2 className="font-montserrat font-bold text-4xl md:text-5xl mb-4">
              Get Involved
            </h2>
            <p className="font-inter text-lg text-muted-foreground max-w-2xl mx-auto">
              Whether you're a teen looking to make your voice heard, an educator wanting to support youth civic engagement, or a professional ready to share your expertise, there's a place for you in Teen Summit 2.0.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <div className="max-w-3xl mx-auto mb-12">
            <CountdownTimer 
              targetDate={applicationDeadline} 
              title="Spring 2026 Summiteer Applications Close In"
            />
            <p className="text-center text-sm text-muted-foreground mt-4">
              Don't miss your chance to be chosen for this elite 12-week program
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {opportunities.map((opportunity, index) => {
            const Icon = opportunity.icon;
            return (
              <ScrollReveal key={opportunity.title} delay={index * 0.1}>
                <Card className="h-full hover-elevate active-elevate-2 transition-all">
                  <CardHeader>
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="font-montserrat text-2xl">
                      {opportunity.title}
                    </CardTitle>
                    <CardDescription className="text-base">
                      {opportunity.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Link href={opportunity.href}>
                      <Button
                        variant={opportunity.color === "primary" ? "default" : "outline"}
                        size="lg"
                        className="w-full"
                        data-testid={opportunity.testId}
                      >
                        {opportunity.buttonText}
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </ScrollReveal>
            );
          })}
        </div>

        <ScrollReveal delay={0.4}>
          <div className="mt-12 text-center">
            <p className="font-inter text-muted-foreground">
              Questions? Reach out to us at{" "}
              <a href="mailto:contact@teensummit.org" className="text-primary hover:underline">
                contact@teensummit.org
              </a>
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
