import { Card } from "@/components/ui/card";
import { Play, GraduationCap, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollReveal } from "@/components/animations/scroll-reveal";
import { motion } from "framer-motion";
import { useState } from "react";
import video1 from "@assets/download_1763153481705.mp4";
import video2 from "@assets/download_1763153501771.mp4";
import video3 from "@assets/download_1763153507118.mp4";
import video4 from "@assets/download_1763153511644.mp4";
import drMckeePhoto from "@assets/IMG_9503_1763407676497.jpeg";

const testerClips = [
  { src: video1, title: "Tester Clip 1" },
  { src: video2, title: "Tester Clip 2" },
  { src: video3, title: "Tester Clip 3" },
  { src: video4, title: "Tester Clip 4" },
];

export function WhatIsSection() {
  const [currentVideo, setCurrentVideo] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const nextVideo = () => {
    setCurrentVideo((prev) => (prev + 1) % testerClips.length);
    setIsPlaying(false);
  };

  const prevVideo = () => {
    setCurrentVideo((prev) => (prev - 1 + testerClips.length) % testerClips.length);
    setIsPlaying(false);
  };

  return (
    <section className="py-24 px-4 bg-muted/30">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left Column - Text */}
          <ScrollReveal direction="left">
            <div>
            <h2 className="font-montserrat font-bold text-4xl md:text-5xl text-foreground mb-6">
              What Is Teen Summit 2.0?
            </h2>
            
            <div className="space-y-4 mb-8">
              <p className="font-inter text-lg md:text-xl text-foreground leading-relaxed">
                Teen Summit 2.0 is not your typical debate show.
              </p>
              
              <p className="font-inter text-lg md:text-xl text-foreground leading-relaxed">
                It's a revolutionary format where Central Illinois youth learn to master the most important skill of the 21st century: <span className="font-bold text-primary">seeing the world from perspectives that aren't your own</span>.
              </p>
              
              <p className="font-inter text-lg md:text-xl text-foreground leading-relaxed">
                Through our signature "Flip the Script" methodology, you'll argue both sides of important issues—guided by expert data, energized by live DJing, and amplified through podcast discussion.
              </p>
              
              <p className="font-inter text-lg md:text-xl text-foreground leading-relaxed font-semibold">
                This isn't just TV. This is training for leadership.
              </p>
            </div>

            {/* Partners Section */}
            <div className="border-t border-border pt-8">
              <p className="font-inter text-sm text-muted-foreground mb-4 uppercase tracking-wide">
                Produced in Partnership With
              </p>
              
              <div className="flex flex-wrap items-center gap-6">
                <a 
                  href="https://education.illinois.edu" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover-elevate transition-all p-2 rounded-md"
                  data-testid="link-footer-partner-education"
                >
                  <GraduationCap className="w-8 h-8 text-primary" />
                  <div>
                    <p className="font-montserrat font-semibold text-sm text-foreground">
                      College of Education
                    </p>
                    <p className="font-inter text-xs text-muted-foreground">
                      Urbana-Champaign
                    </p>
                  </div>
                </a>
                
                <a 
                  href="https://will.illinois.edu" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover-elevate transition-all p-2 rounded-md"
                  data-testid="link-footer-partner-will"
                >
                  <div className="w-8 h-8 rounded bg-primary/10 flex items-center justify-center">
                    <span className="font-montserrat font-bold text-xs text-primary">PBS</span>
                  </div>
                  <div>
                    <p className="font-montserrat font-semibold text-sm text-foreground">
                      WILL
                    </p>
                    <p className="font-inter text-xs text-muted-foreground">
                      Illinois Public Media
                    </p>
                  </div>
                </a>
                
                <a 
                  href="https://www.thesafehavenstudio.net" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover-elevate transition-all p-2 rounded-md"
                  data-testid="link-footer-partner-safehaven"
                >
                  <div className="w-8 h-8 rounded bg-primary/10 flex items-center justify-center">
                    <span className="font-montserrat font-bold text-xs text-primary">SH</span>
                  </div>
                  <div>
                    <p className="font-montserrat font-semibold text-sm text-foreground">
                      The Safe Haven
                    </p>
                    <p className="font-inter text-xs text-muted-foreground">
                      Champaign's Creative Sanctuary
                    </p>
                  </div>
                </a>
              </div>
              
              <div className="mt-6 space-y-4">
                <p className="font-inter text-sm text-muted-foreground italic">
                  Made possible by <span className="font-semibold text-foreground">Ms. Sheila Johnson</span> and the Communiversity Public Media Project.
                </p>
                <div className="flex items-start gap-4 bg-muted/30 rounded-lg p-4 border border-border">
                  <img 
                    src={drMckeePhoto} 
                    alt="Dr. McKee" 
                    className="w-16 h-16 rounded-full object-cover border-2 border-primary/20"
                    data-testid="img-dr-mckee"
                  />
                  <p className="font-inter text-sm text-muted-foreground flex-1">
                    <span className="font-semibold text-foreground">Dr. McKee</span> is the Creator, Showrunner, and Co-Producer of Teen Summit 2.0 and creator of the Flip the Script methodology. She is the Founder and Director of the Communiversity Public Media Project and currently serving as Chancellor's Fellow at UIUC in the{" "}
                    <a 
                      href="https://publicengagement.illinois.edu" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-primary hover:underline font-semibold"
                      data-testid="link-public-engagement"
                    >
                      Office of Public Engagement
                    </a>.
                  </p>
                </div>
              </div>
            </div>
            </div>
          </ScrollReveal>

          {/* Right Column - Video Player */}
          <ScrollReveal direction="right">
            <div className="flex justify-center lg:justify-start mt-8 lg:mt-0">
              <Card className="relative aspect-[9/16] w-full max-w-sm overflow-hidden bg-black border-card-border">
                {/* Video Element */}
                <video
                  key={currentVideo}
                  className="w-full h-full object-cover"
                  controls
                  autoPlay={isPlaying}
                  onPlay={() => setIsPlaying(true)}
                  onPause={() => setIsPlaying(false)}
                  data-testid="video-player"
                >
                  <source src={testerClips[currentVideo].src} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>

                {/* Navigation Arrows */}
                {testerClips.length > 1 && (
                  <>
                    <button
                      onClick={prevVideo}
                      className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 backdrop-blur-sm flex items-center justify-center border border-white/20 hover:bg-black/80 transition-colors z-10"
                      data-testid="button-prev-video"
                      aria-label="Previous video"
                    >
                      <ChevronLeft className="w-6 h-6 text-white" />
                    </button>
                    <button
                      onClick={nextVideo}
                      className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 backdrop-blur-sm flex items-center justify-center border border-white/20 hover:bg-black/80 transition-colors z-10"
                      data-testid="button-next-video"
                      aria-label="Next video"
                    >
                      <ChevronRight className="w-6 h-6 text-white" />
                    </button>
                  </>
                )}

                {/* Video Counter */}
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-montserrat font-semibold text-white text-lg">
                        Teen Summit 2.0 - Concept Clips
                      </p>
                      <p className="font-inter text-sm text-white/80">
                        Video {currentVideo + 1} of {testerClips.length}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      {testerClips.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => {
                            setCurrentVideo(index);
                            setIsPlaying(false);
                          }}
                          className={`w-2 h-2 rounded-full transition-all ${
                            index === currentVideo
                              ? "bg-primary w-8"
                              : "bg-white/40 hover:bg-white/60"
                          }`}
                          data-testid={`video-indicator-${index}`}
                          aria-label={`Go to video ${index + 1}`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
