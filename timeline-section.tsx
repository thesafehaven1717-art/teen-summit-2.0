import { Users, Search, UserCheck, GraduationCap, Video, Award } from "lucide-react";
import { Card } from "@/components/ui/card";

const timelineEvents = [
  {
    phase: "Phase 1",
    title: "Focus Groups",
    description: "Community listening sessions to understand youth priorities and interests",
    icon: Users,
    status: "ongoing",
  },
  {
    phase: "Phase 2",
    title: "Distillation of Focus Group Issues",
    description: "Analysis and synthesis of community input to shape program content",
    icon: Search,
    status: "ongoing",
  },
  {
    phase: "Phase 3",
    title: "Casting Calls",
    description: "Three casting call sessions to find passionate, articulate young leaders",
    icon: UserCheck,
    status: "upcoming",
  },
  {
    phase: "Phase 4",
    title: "Selection Ceremony & Uniforms",
    description: "Contract signing, NIL branding establishment, uniform distribution, and professional photoshoots",
    icon: Award,
    status: "upcoming",
  },
  {
    phase: "Phase 5",
    title: "Training Workshop",
    description: "2-day intensive: Welcome to Teen Summit orientation and skill development",
    icon: GraduationCap,
    status: "upcoming",
  },
  {
    phase: "Phase 6",
    title: "Production & Release",
    description: "First shoot on Valentine's Day (Feb 14, 2025), Spring 2026 production, wrap party and winner announcement (May 2, 2026), and Fall 2026 release with community celebration",
    icon: Video,
    status: "upcoming",
  },
];

export function TimelineSection() {
  return (
    <section className="py-24 px-4 bg-background">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="font-montserrat font-bold text-4xl md:text-5xl text-foreground mb-6">
            Timeline & Launch
          </h2>
          <p className="font-inter text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            From community engagement to production, here's our journey to bringing Teen Summit 2.0 to life
          </p>
          <div className="mt-8 space-y-3">
            <div className="inline-flex items-center gap-2 bg-accent/10 border border-accent/30 rounded-full px-6 py-2">
              <p className="font-space-grotesk text-lg md:text-xl text-accent font-bold">
                🎬 First Shoot: Valentine's Day, February 14, 2025
              </p>
            </div>
            <p className="font-space-grotesk text-2xl md:text-3xl text-primary font-semibold">
              Full Production: Spring 2026
            </p>
            <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/30 rounded-full px-6 py-2">
              <p className="font-space-grotesk text-lg md:text-xl text-primary font-bold">
                🏆 Wrap Party & Winner Announcement: May 2, 2026
              </p>
            </div>
            <p className="font-space-grotesk text-xl md:text-2xl text-accent font-semibold">
              Release: Fall 2026
            </p>
          </div>
        </div>

        {/* Timeline - Mobile: Vertical, Desktop: Grid */}
        <div className="relative">
          {/* Desktop Grid */}
          <div className="hidden md:grid md:grid-cols-3 gap-8">
            {timelineEvents.map((event, index) => {
              const Icon = event.icon;
              return (
                <Card
                  key={index}
                  className={`p-6 border-card-border hover-elevate ${
                    event.status === "completed" || event.status === "ongoing" ? "bg-primary/5" : "bg-card"
                  }`}
                  data-testid={`timeline-${index}`}
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center ${
                      event.status === "completed" || event.status === "ongoing"
                        ? "bg-primary text-primary-foreground" 
                        : "bg-muted text-muted-foreground"
                    }`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <p className="font-inter text-xs uppercase tracking-wide text-primary font-semibold mb-1">
                        {event.phase}
                      </p>
                      <h3 className="font-montserrat font-bold text-xl text-foreground">
                        {event.title}
                      </h3>
                    </div>
                  </div>
                  <p className="font-inter text-base text-muted-foreground leading-relaxed">
                    {event.description}
                  </p>
                  {event.status === "completed" && (
                    <div className="mt-4 pt-4 border-t border-border">
                      <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold">
                        Completed
                      </span>
                    </div>
                  )}
                  {event.status === "ongoing" && (
                    <div className="mt-4 pt-4 border-t border-border">
                      <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 text-accent text-xs font-semibold">
                        In Progress
                      </span>
                    </div>
                  )}
                </Card>
              );
            })}
          </div>

          {/* Mobile Vertical Timeline */}
          <div className="md:hidden space-y-8">
            {timelineEvents.map((event, index) => {
              const Icon = event.icon;
              const isLast = index === timelineEvents.length - 1;
              return (
                <div key={index} className="relative pl-12" data-testid={`timeline-mobile-${index}`}>
                  {/* Timeline Line */}
                  {!isLast && (
                    <div className="absolute left-6 top-12 bottom-0 w-0.5 bg-border -translate-x-1/2"></div>
                  )}

                  {/* Icon */}
                  <div className={`absolute left-0 top-0 w-12 h-12 rounded-full flex items-center justify-center ${
                    event.status === "completed" || event.status === "ongoing"
                      ? "bg-primary text-primary-foreground" 
                      : "bg-muted text-muted-foreground"
                  }`}>
                    <Icon className="w-6 h-6" />
                  </div>

                  {/* Content */}
                  <Card className={`p-6 ${
                    event.status === "completed" || event.status === "ongoing" ? "bg-primary/5" : "bg-card"
                  } border-card-border`}>
                    <p className="font-inter text-xs uppercase tracking-wide text-primary font-semibold mb-1">
                      {event.phase}
                    </p>
                    <h3 className="font-montserrat font-bold text-xl text-foreground mb-2">
                      {event.title}
                    </h3>
                    <p className="font-inter text-base text-muted-foreground leading-relaxed">
                      {event.description}
                    </p>
                    {event.status === "completed" && (
                      <div className="mt-4 pt-4 border-t border-border">
                        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold">
                          Completed
                        </span>
                      </div>
                    )}
                    {event.status === "ongoing" && (
                      <div className="mt-4 pt-4 border-t border-border">
                        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 text-accent text-xs font-semibold">
                          In Progress
                        </span>
                      </div>
                    )}
                  </Card>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
