import { motion, useReducedMotion } from "framer-motion";

interface FloatingElementProps {
  children: React.ReactNode;
  duration?: number;
  yOffset?: number;
  delay?: number;
  className?: string;
}

export function FloatingElement({ 
  children, 
  duration = 3,
  yOffset = 10,
  delay = 0,
  className = ""
}: FloatingElementProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      animate={{
        y: [-yOffset, yOffset, -yOffset]
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: "easeInOut",
        delay
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
