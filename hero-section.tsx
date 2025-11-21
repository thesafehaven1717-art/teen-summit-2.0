import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { newsletterSignupSchema, type NewsletterSignup } from "@shared/schema";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { ArrowRight, Play, Star } from "lucide-react";
import { useState, useEffect } from "react";
import { Link } from "wouter";
import heroBackgroundImage from "@assets/generated_images/Teen_Summit_studio_with_podiums_f75c8af9.webp";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { motionConfig } from "@/lib/motionVariants";

const taglines = [
  "Flip the Script. Find the Truth.",
  "Two Sides. One Voice.",
  "Where Debate Meets Hip-Hop.",
];

export function HeroSection() {
  const { toast } = useToast();
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [currentTagline, setCurrentTagline] = useState(0);
  const shouldReduceMotion = useReducedMotion();
  
  // Rotate taglines every 4 seconds (disabled if reduced motion is preferred)
  useEffect(() => {
    if (shouldReduceMotion) return;
    const interval = setInterval(() => {
      setCurrentTagline((prev) => (prev + 1) % taglines.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [shouldReduceMotion]);

  const form = useForm<NewsletterSignup>({
    resolver: zodResolver(newsletterSignupSchema),
    defaultValues: {
      email: "",
    },
  });

  const mutation = useMutation({
    mutationFn: (data: NewsletterSignup) =>
      apiRequest("POST", "/api/newsletter/signup", data),
    onSuccess: () => {
      toast({
        title: "Success!",
        description: "You've been added to our newsletter. Welcome to the movement!",
      });
      form.reset();
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: NewsletterSignup) => {
    mutation.mutate(data);
  };

  return (
    <section className="relative h-screen w-full overflow-hidden bg-black">
      {/* Hero Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroBackgroundImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-primary/30 via-black/50 to-black/70"></div>
      </div>

      {/* Dark Gradient Overlay for Text Readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/90"></div>

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center py-8">
        {/* University Announcement */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-4"
        >
          <p className="font-inter text-sm md:text-base text-white/90 tracking-wide uppercase mb-2">
            The University of Illinois Urbana-Champaign is proud to announce
          </p>
        </motion.div>

        {/* Main Headline */}
        <motion.h1 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
          className="font-montserrat font-extrabold text-6xl md:text-7xl lg:text-8xl text-white mb-4 leading-tight max-w-5xl"
        >
          Teen Summit 2.0
        </motion.h1>

        {/* Tagline */}
        <motion.p 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="font-space-grotesk text-2xl md:text-3xl lg:text-4xl text-primary font-medium mb-3"
        >
          This is the REMIX
        </motion.p>
        
        {/* Rotating Sub-Tagline */}
        <div className="h-8 mb-6">
          {shouldReduceMotion ? (
            <p className="font-inter text-lg md:text-xl text-white/90">
              {taglines[0]}
            </p>
          ) : (
            <AnimatePresence mode="wait">
              <motion.p
                key={currentTagline}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="font-inter text-lg md:text-xl text-white/90"
              >
                {taglines[currentTagline]}
              </motion.p>
            </AnimatePresence>
          )}
        </div>

        {/* Subtitle */}
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="font-inter text-lg md:text-xl text-white/80 max-w-3xl mb-5 leading-relaxed"
        >
          An exclusive opportunity for selected Central Illinois youth to master civic engagement through debate, musicology, and podcasting
        </motion.p>

        {/* Selection Emphasis */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="flex items-center gap-3 bg-primary/20 backdrop-blur-md border border-primary/30 rounded-full px-6 py-3 mb-6"
        >
          <Star className="h-5 w-5 text-primary fill-primary" />
          <p className="font-montserrat font-semibold text-white text-sm md:text-base">
            Limited Spots Available • Competitive Selection Process
          </p>
          <Star className="h-5 w-5 text-primary fill-primary" />
        </motion.div>

        {/* Email Capture Form */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="w-full max-w-md mb-5"
        >
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col sm:flex-row gap-3">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormControl>
                      <Input
                        {...field}
                        type="email"
                        placeholder="Enter your email"
                        className="h-12 bg-white/10 backdrop-blur-sm border-white/20 text-white placeholder:text-white/50 focus:border-primary transition-all focus:scale-[1.02]"
                        data-testid="input-hero-email"
                      />
                    </FormControl>
                    <FormMessage className="text-left text-white/90" />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                size="lg"
                className="h-12 px-8 bg-primary hover:bg-primary/90 font-montserrat font-semibold transition-all hover:scale-105"
                disabled={mutation.isPending}
                data-testid="button-hero-signup"
              >
                {mutation.isPending ? "Joining..." : "Join the Movement"}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </form>
          </Form>
        </motion.div>

        {/* Become a Summiteer CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.1 }}
          className="mb-4"
        >
          <Button
            size="lg"
            asChild
            className="h-14 px-8 bg-primary border-2 border-primary hover:bg-primary/90 font-montserrat font-bold text-lg transition-all hover:scale-105"
          >
            <Link href="/apply/summiteer" data-testid="button-hero-summiteer-cta">
              <Star className="mr-2 h-5 w-5 fill-white" />
              Apply to Be Chosen
            </Link>
          </Button>
        </motion.div>

        {/* Video Play Button */}
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsVideoPlaying(!isVideoPlaying)}
          className="group flex items-center gap-3 px-6 py-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 hover-elevate transition-all mt-4"
          data-testid="button-play-video"
        >
          <motion.div 
            animate={{ rotate: isVideoPlaying ? 360 : 0 }}
            transition={{ duration: 0.4 }}
            className="w-12 h-12 rounded-full bg-primary flex items-center justify-center"
          >
            <Play className="h-6 w-6 text-white fill-white" />
          </motion.div>
          <span className="font-inter font-medium text-white text-lg">
            Watch the Announcement
          </span>
        </motion.button>
      </div>

      {/* Scroll Indicator Space */}
      <div className="absolute bottom-0 left-0 right-0 h-20 pointer-events-none"></div>
    </section>
  );
}
