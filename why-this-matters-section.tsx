import { Card } from "@/components/ui/card";
import { TrendingUp, Users, Briefcase } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const stats = [
  {
    icon: Users,
    percentage: "73%",
    targetValue: 73,
    suffix: "%",
    description: "of teens report they've never seriously considered an opposing viewpoint on issues they care about.",
    source: "Pew Research Center",
  },
  {
    icon: TrendingUp,
    percentage: "2X",
    targetValue: 2,
    suffix: "X",
    description: "Perspective-taking exercises double adolescents' ability to understand complex social issues.",
    source: "Journal of Adolescent Research",
  },
  {
    icon: Briefcase,
    percentage: "89%",
    targetValue: 89,
    suffix: "%",
    description: "of employers say critical thinking is the #1 skill they look for in new hires.",
    source: "National Association of Colleges and Employers",
  },
];

function AnimatedStat({ targetValue, suffix }: { targetValue: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const elementRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setCount(targetValue);
      setHasAnimated(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          
          const duration = 2000; // 2 seconds
          const startTime = Date.now();
          
          const animate = () => {
            const currentTime = Date.now();
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Ease out cubic
            const easedProgress = 1 - Math.pow(1 - progress, 3);
            const currentCount = Math.floor(easedProgress * targetValue);
            
            setCount(currentCount);
            
            if (progress < 1) {
              requestAnimationFrame(animate);
            }
          };
          
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [targetValue, hasAnimated]);

  return (
    <p
      ref={elementRef}
      className="font-montserrat font-extrabold text-5xl md:text-6xl text-primary mb-2"
    >
      {count}{suffix}
    </p>
  );
}

export function WhyThisMattersSection() {
  return (
    <section className="py-24 px-4 bg-background">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="font-montserrat font-bold text-4xl md:text-5xl text-foreground mb-6">
            Why "Flip the Script" Works
          </h2>
          <p className="font-inter text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            The data is clear: perspective-taking changes everything.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card
                key={index}
                className="relative p-8 bg-card border-card-border hover-elevate group text-center"
                data-testid={`stat-card-${index}`}
              >
                {/* Icon */}
                <div className="flex justify-center mb-6">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <Icon className="w-8 h-8 text-primary" />
                  </div>
                </div>

                {/* Percentage */}
                <div className="mb-4">
                  <AnimatedStat targetValue={stat.targetValue} suffix={stat.suffix} />
                </div>

                {/* Description */}
                <p className="font-inter text-base text-foreground leading-relaxed mb-4">
                  {stat.description}
                </p>

                {/* Source */}
                <p className="font-inter text-xs text-muted-foreground italic">
                  — {stat.source}
                </p>
              </Card>
            );
          })}
        </div>

        {/* Bottom Message */}
        <div className="text-center">
          <p className="font-inter text-lg md:text-xl text-foreground font-semibold max-w-3xl mx-auto">
            Teen Summit 2.0 isn't just entertainment. It's education disguised as competition.
          </p>
        </div>
      </div>
    </section>
  );
}
