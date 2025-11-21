import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Calendar, Clock } from "lucide-react";
import { motion } from "framer-motion";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

interface CastingDate {
  date: Date;
  label: string;
}

const castingDates: CastingDate[] = [
  { date: new Date("2025-01-17T16:00:00"), label: "First Casting Call" },
  { date: new Date("2025-01-30T16:00:00"), label: "Second Casting Call" },
  { date: new Date("2025-01-31T16:00:00"), label: "Third Casting Call" },
];

function calculateTimeLeft(targetDate: Date): TimeLeft | null {
  const difference = targetDate.getTime() - new Date().getTime();
  
  if (difference <= 0) {
    return null;
  }

  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((difference / 1000 / 60) % 60),
    seconds: Math.floor((difference / 1000) % 60),
  };
}

function TimeUnit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <motion.div
        key={value}
        initial={{ scale: 1.2, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-primary text-primary-foreground rounded-lg p-3 sm:p-4 min-w-[60px] sm:min-w-[80px]"
      >
        <div className="font-space-grotesk font-bold text-2xl sm:text-4xl text-center">
          {String(value).padStart(2, "0")}
        </div>
      </motion.div>
      <div className="font-inter text-xs sm:text-sm text-muted-foreground mt-2 uppercase tracking-wide">
        {label}
      </div>
    </div>
  );
}

export function CastingCountdown() {
  const [timeLefts, setTimeLefts] = useState<(TimeLeft | null)[]>(
    castingDates.map((cd) => calculateTimeLeft(cd.date))
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLefts(castingDates.map((cd) => calculateTimeLeft(cd.date)));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const upcomingDates = castingDates
    .map((cd, index) => ({ ...cd, timeLeft: timeLefts[index], index }))
    .filter((cd) => cd.timeLeft !== null);

  if (upcomingDates.length === 0) {
    return null;
  }

  return (
    <section className="py-16 px-4 bg-gradient-to-b from-background to-primary/5">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/30 rounded-full px-6 py-2 mb-4">
            <Calendar className="h-4 w-4 text-primary" />
            <p className="font-montserrat font-semibold text-sm text-primary uppercase tracking-wide">
              Upcoming Casting Calls
            </p>
          </div>
          <h2 className="font-montserrat font-bold text-3xl sm:text-4xl md:text-5xl text-foreground mb-4">
            Your Time to Shine
          </h2>
          <p className="font-inter text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Mark your calendar for these exclusive casting opportunities
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {upcomingDates.map(({ date, label, timeLeft, index }) => {
            if (!timeLeft) return null;

            return (
              <Card
                key={index}
                className="p-6 sm:p-8 bg-card border-card-border hover-elevate"
                data-testid={`casting-countdown-${index}`}
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Clock className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-montserrat font-bold text-xl sm:text-2xl text-foreground">
                      {label}
                    </h3>
                    <p className="font-inter text-sm text-muted-foreground">
                      {date.toLocaleDateString("en-US", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                    <p className="font-inter text-xs text-muted-foreground mt-1">
                      4:00 PM - 6:30 PM
                    </p>
                  </div>
                </div>

                <div className="flex justify-center gap-2 sm:gap-4">
                  <TimeUnit value={timeLeft.days} label="Days" />
                  <div className="flex items-center text-3xl sm:text-5xl text-primary font-bold pb-8">:</div>
                  <TimeUnit value={timeLeft.hours} label="Hours" />
                  <div className="flex items-center text-3xl sm:text-5xl text-primary font-bold pb-8">:</div>
                  <TimeUnit value={timeLeft.minutes} label="Minutes" />
                  <div className="flex items-center text-3xl sm:text-5xl text-primary font-bold pb-8">:</div>
                  <TimeUnit value={timeLeft.seconds} label="Seconds" />
                </div>
              </Card>
            );
          })}
        </div>

        <div className="mt-8 text-center">
          <p className="font-inter text-sm text-muted-foreground">
            Location and registration details will be announced soon
          </p>
        </div>
      </div>
    </section>
  );
}
