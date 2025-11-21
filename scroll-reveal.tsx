import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import { motionConfig } from "@/lib/motionVariants";

interface ScrollRevealProps {
  children: React.ReactNode;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  className?: string;
}

export function ScrollReveal({ 
  children, 
  delay = 0, 
  direction = "up",
  className = ""
}: ScrollRevealProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { 
    once: true, 
    margin: "-100px" 
  });
  const shouldReduceMotion = useReducedMotion();

  const directions = {
    up: { y: motionConfig.offsets.medium, x: 0 },
    down: { y: -motionConfig.offsets.medium, x: 0 },
    left: { x: motionConfig.offsets.medium, y: 0 },
    right: { x: -motionConfig.offsets.medium, y: 0 },
    none: { x: 0, y: 0 }
  };

  return (
    <motion.div
      ref={ref}
      initial={{ 
        opacity: 0, 
        ...(shouldReduceMotion ? {} : directions[direction])
      }}
      animate={isInView ? { 
        opacity: 1, 
        x: 0, 
        y: 0 
      } : { 
        opacity: 0, 
        ...(shouldReduceMotion ? {} : directions[direction])
      }}
      transition={{ 
        duration: shouldReduceMotion ? motionConfig.durations.fast : motionConfig.durations.normal, 
        delay: shouldReduceMotion ? 0 : delay,
        ease: motionConfig.easings.smooth
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

interface StaggerContainerProps {
  children: React.ReactNode;
  staggerDelay?: number;
  className?: string;
}

export function StaggerContainer({ 
  children, 
  staggerDelay = 0.1,
  className = ""
}: StaggerContainerProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { 
    once: true, 
    margin: "-50px" 
  });
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={{
        visible: {
          transition: {
            staggerChildren: shouldReduceMotion ? 0 : staggerDelay
          }
        }
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ 
  children,
  className = ""
}: { 
  children: React.ReactNode;
  className?: string;
}) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, ...(shouldReduceMotion ? {} : { y: motionConfig.offsets.small }) },
        visible: { 
          opacity: 1, 
          y: 0,
          transition: { 
            duration: shouldReduceMotion ? motionConfig.durations.fast : motionConfig.durations.normal,
            ease: motionConfig.easings.smooth
          }
        }
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
