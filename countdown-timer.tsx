import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Clock } from "lucide-react";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

interface CountdownTimerProps {
  targetDate: Date;
  title?: string;
}

export function CountdownTimer({ targetDate, title = "Application Deadline" }: CountdownTimerProps) {
  const calculateTimeLeft = (): TimeLeft | null => {
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
  };

  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  if (!timeLeft) {
    return (
      <Card className="bg-muted" data-testid="countdown-timer">
        <CardContent className="p-6 text-center">
          <p className="text-lg font-semibold text-muted-foreground">
            Application period has ended
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-gradient-to-br from-primary/10 via-background to-blue-500/10 border-primary/20" data-testid="countdown-timer">
      <CardContent className="p-6">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Clock className="h-5 w-5 text-primary" />
          <h3 className="text-lg font-semibold text-center" data-testid="countdown-title">
            {title}
          </h3>
        </div>
        
        <div className="grid grid-cols-4 gap-4">
          <div className="text-center" data-testid="countdown-days">
            <div className="text-3xl md:text-4xl font-bold text-primary">
              {timeLeft.days}
            </div>
            <div className="text-sm text-muted-foreground font-medium mt-1">
              Days
            </div>
          </div>
          
          <div className="text-center" data-testid="countdown-hours">
            <div className="text-3xl md:text-4xl font-bold text-primary">
              {String(timeLeft.hours).padStart(2, '0')}
            </div>
            <div className="text-sm text-muted-foreground font-medium mt-1">
              Hours
            </div>
          </div>
          
          <div className="text-center" data-testid="countdown-minutes">
            <div className="text-3xl md:text-4xl font-bold text-primary">
              {String(timeLeft.minutes).padStart(2, '0')}
            </div>
            <div className="text-sm text-muted-foreground font-medium mt-1">
              Minutes
            </div>
          </div>
          
          <div className="text-center" data-testid="countdown-seconds">
            <div className="text-3xl md:text-4xl font-bold text-primary">
              {String(timeLeft.seconds).padStart(2, '0')}
            </div>
            <div className="text-sm text-muted-foreground font-medium mt-1">
              Seconds
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
