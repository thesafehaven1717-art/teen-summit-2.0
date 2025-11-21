import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlayCircle, ExternalLink, Award } from "lucide-react";
import { ScrollReveal } from "@/components/animations/scroll-reveal";
import sheilaPortrait1 from "@assets/IMG_9465_1763153453397.webp";
import sheilaPortrait2 from "@assets/IMG_9498_1763404866003.jpeg";
import sheilaPortrait3 from "@assets/IMG_9467_1763153568105.jpeg";

export function SheilaJohnsonSection() {
  return (
    <section className="py-16 md:py-24 px-4 md:px-6 lg:px-8 bg-muted">
      <div className="max-w-7xl mx-auto">
        
        {/* Main Two-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 xl:gap-20 items-start">
          
          {/* Left: Images */}
          <ScrollReveal direction="left">
            <div className="space-y-6">
              <div className="aspect-[3/4] rounded-lg overflow-hidden">
                <img 
                  src={sheilaPortrait3} 
                  alt="Ms. Sheila Johnson - Distinguished UIUC Alumna and Founding Partner" 
                  className="w-full h-full object-cover"
                  data-testid="sheila-johnson-portrait"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                {[sheilaPortrait1, sheilaPortrait2].map((thumbnail, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ y: -4 }}
                    className="aspect-video rounded-lg overflow-hidden"
                    data-testid={`sheila-thumbnail-${index}`}
                  >
                    <img 
                      src={thumbnail} 
                      alt={`Ms. Sheila Johnson portrait ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </motion.div>
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* Right: Content */}
          <ScrollReveal direction="right">
            <div className="space-y-8">
              
              {/* Header */}
              <div className="space-y-4">
                <p className="font-inter text-sm uppercase tracking-wider text-primary font-semibold">
                  Founding Partner
                </p>
                <h2 className="font-montserrat font-bold text-4xl md:text-5xl lg:text-6xl text-foreground">
                  Ms. Sheila Johnson
                </h2>
                <p className="font-inter text-lg md:text-xl text-muted-foreground leading-relaxed">
                  Distinguished UIUC Alumna | Billionaire Businesswoman | Vice Chairman and Partner of Monumental Sports & Entertainment | Global Ambassador for CARE
                </p>
              </div>

              {/* Main Text */}
              <p className="font-inter text-base md:text-lg text-foreground leading-relaxed">
                Teen Summit 2.0 is a reimagined civic space from the Teen Summit of BET fame. As part of the Communiversity Public Media Project (CPMP), we are honored to thank Distinguished UIUC Alumna, billionaire businesswoman, Vice Chairman and Partner of Monumental Sports & Entertainment, and Global Ambassador for CARE Ms. Sheila Johnson for bestowing the opportunity and seed capital to resurrect an important civic cultural institution for America's youth.
              </p>

              {/* Video Section */}
              <div className="border-l-4 border-primary pl-6 py-2">
                <h3 className="font-montserrat font-semibold text-xl md:text-2xl text-foreground mb-3">
                  Watch: Ms. Sheila Johnson on Her Accomplishments
                </h3>
                <p className="font-inter text-base text-muted-foreground mb-4 leading-relaxed">
                  Learn more about Ms. Johnson's incredible journey and achievements in business, sports, and philanthropy.
                </p>
                <Button 
                  variant="default"
                  onClick={() => window.open('https://youtu.be/Ly4dcvNsKRc?si=ta9EbHC_4NgnzjMV', '_blank')}
                  data-testid="button-sheila-video"
                >
                  <PlayCircle className="mr-2 h-4 w-4" />
                  Watch Video
                  <ExternalLink className="ml-2 h-4 w-4" />
                </Button>
              </div>

              {/* Book Section */}
              <div className="border-l-4 border-accent pl-6 py-2">
                <h3 className="font-montserrat font-semibold text-xl md:text-2xl text-foreground mb-3">
                  Walk Through Fire: A Memoir of Love, Loss, and Triumph
                </h3>
                <p className="font-inter text-base text-muted-foreground mb-4 leading-relaxed">
                  In her inspiring memoir, Ms. Johnson shares her remarkable journey from humble beginnings to becoming a billionaire businesswoman, philanthropist, and cultural leader.
                </p>
                <Button 
                  variant="default"
                  onClick={() => window.open('https://www.amazon.com/Walk-Through-Fire-Memoir-Triumph/dp/B0BY3PJH4W', '_blank')}
                  data-testid="button-sheila-book"
                >
                  View on Amazon
                  <ExternalLink className="ml-2 h-4 w-4" />
                </Button>
              </div>

            </div>
          </ScrollReveal>
        </div>

        {/* Quote - Full Width Below */}
        <ScrollReveal direction="up">
          <div className="mt-16 lg:mt-24 border-l-4 border-primary bg-primary/5 rounded-r-lg p-8 md:p-12">
            <p className="font-space-grotesk text-2xl md:text-3xl lg:text-4xl text-foreground font-medium italic text-center">
              "This is the REMIX."
            </p>
          </div>
        </ScrollReveal>

      </div>
    </section>
  );
}
