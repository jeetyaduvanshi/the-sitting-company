"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { ChevronLeft, ChevronRight, Play, Pause } from "lucide-react";

interface TitleLine {
  text: string;
  italic: boolean;
}

interface Slide {
  tag: string;
  titleLines: TitleLine[];
  subtext: string;
  description: string;
  highlights: string[];
  image: string;
  ctaText: string;
  ctaLink: string;
}

const slides: Slide[] = [
  {
    tag: "PREMIUM ERGONOMIC SERIES",
    titleLines: [
      { text: "SIT SMART,", italic: false },
      { text: "WORK", italic: true },
      { text: "BETTER", italic: false }
    ],
    subtext: "Dynamic lumbar posture alignment",
    description: "Engineered to fit the natural curvature of your spine, providing dynamic lumbar support that keeps you fresh during long hours.",
    highlights: ["Adaptive Lumbar Support", "3D Adjustable Armrests", "Weight-Activated Tilt"],
    image: "/images/hero_chair.webp",
    ctaText: "EXPLORE COLLECTION",
    ctaLink: "/#collections"
  },
  {
    tag: "EXECUTIVE LUXURY SERIES",
    titleLines: [
      { text: "LEAD WITH", italic: false },
      { text: "ABSOLUTE", italic: true },
      { text: "COMFORT", italic: false }
    ],
    subtext: "Elegance meets posture engineering",
    description: "Handcrafted with premium leather and robust alloy accents, redefining executive presence and wellness.",
    highlights: ["Napa Leather Upholstery", "Memory Foam Cushioning", "Polished Aluminum Chassis"],
    image: "/images/monarch_executive.webp",
    ctaText: "EXPLORE MONARCH",
    ctaLink: "/#collections"
  },
  {
    tag: "THE SOVEREIGN LOUNGE",
    titleLines: [
      { text: "UNWIND IN", italic: false },
      { text: "MODERN", italic: true },
      { text: "LUXURY", italic: false }
    ],
    subtext: "Sophisticated aesthetics for relaxation",
    description: "A sculptural masterpiece that blends cozy sitting with refined lines, designed to elevate premium lounges and cabins.",
    highlights: ["Handcrafted Oak Frame", "Plush Bouclé Fabric", "Solid Brass Accented Hardware"],
    image: "/images/sovereign_lounge.webp",
    ctaText: "EXPLORE LOUNGE",
    ctaLink: "/#collections"
  },
  {
    tag: "PRO-SERIES GAMING CHAIRS",
    titleLines: [
      { text: "GAME HARD,", italic: false },
      { text: "SIT", italic: true },
      { text: "EASY", italic: false }
    ],
    subtext: "Maximize your performance and focus",
    description: "Designed for intensive marathons, combining full-body bucket support with racing-grade structural durability.",
    highlights: ["180° Full Recline Backrest", "Detachable Pillow Cushions", "Reinforced Steel Frame"],
    image: "/images/gaming_chair.webp",
    ctaText: "EXPLORE GAMING",
    ctaLink: "/#collections"
  }
];

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [direction, setDirection] = useState(0); // -1 for prev, 1 for next

  const nextSlide = useCallback(() => {
    setDirection(1);
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  }, []);

  const prevSlide = useCallback(() => {
    setDirection(-1);
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  }, []);

  const goToSlide = useCallback((index: number) => {
    setDirection(index > currentSlide ? 1 : -1);
    setCurrentSlide(index);
  }, [currentSlide]);

  // Autoplay Logic
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      nextSlide();
    }, 6000);
    return () => clearInterval(interval);
  }, [isPlaying, nextSlide]);

  // Spring slide transition for the entire card banner
  const slideVariants: Variants = {
    enter: (dir: number) => ({
      x: dir > 0 ? "100%" : "-100%",
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: {
        x: { type: "spring", stiffness: 180, damping: 24 },
        opacity: { duration: 0.35 },
      },
    },
    exit: (dir: number) => ({
      x: dir > 0 ? "-100%" : "100%",
      opacity: 0,
      transition: {
        x: { type: "spring", stiffness: 180, damping: 24 },
        opacity: { duration: 0.35 },
      },
    }),
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col justify-center pt-36 sm:pt-32 pb-12 bg-brand-black overflow-hidden"
    >
      {/* Ambient orb glow — top left */}
      <div className="orb-gold absolute -top-32 -left-32 w-[600px] h-[600px] opacity-[0.07]" />
      {/* Ambient orb glow — bottom right */}
      <div className="orb-gold absolute -bottom-40 -right-40 w-[500px] h-[500px] opacity-[0.05]" style={{ animationDelay: "4s" }} />

      {/* Subtle radial gradient accent */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(42,31,20,0.18)_0%,rgba(15,11,8,0)_70%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full flex-1 flex flex-col justify-center px-6 md:px-12">
        {/* Sliding Card Wrapper */}
        <div className="relative w-full overflow-hidden flex-1 flex items-center py-6">
          <AnimatePresence mode="wait" initial={false} custom={direction}>
            <motion.div
              key={currentSlide}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="w-full bg-gradient-to-br from-brand-card/90 to-brand-black/90 border border-brand-gold/15 rounded-sm p-8 md:p-12 lg:p-14 grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-8 lg:gap-10 items-center shadow-[0_24px_64px_rgba(0,0,0,0.8)] min-h-[540px] md:min-h-[600px] lg:min-h-[640px]"
            >
              {/* Left Side: Content */}
              <div className="flex flex-col items-start text-left">
                {/* Top Label */}
                <span className="text-[11px] font-dmsans uppercase tracking-widest text-brand-gold mb-5 font-semibold">
                  {slides[currentSlide].tag}
                </span>

                {/* Staggered Heading */}
                <h1 className="flex flex-col font-cormorant font-light text-[44px] sm:text-[64px] lg:text-[76px] leading-[0.95] text-brand-white tracking-normal mb-6">
                  {slides[currentSlide].titleLines.map((line, idx) => (
                    <span key={idx} className="block py-0.5 overflow-hidden">
                      <span className={line.italic ? "text-brand-cream italic font-normal" : ""}>
                        {line.text}
                      </span>
                    </span>
                  ))}
                </h1>

                {/* Description */}
                <p className="text-brand-grey font-dmsans text-[14px] sm:text-[16px] leading-relaxed max-w-lg mb-6">
                  {slides[currentSlide].description}
                </p>

                {/* Highlights Checklist */}
                <ul className="flex flex-col gap-2.5 mb-8 text-[12px] sm:text-[13px] font-dmsans text-brand-cream/90 font-medium">
                  {slides[currentSlide].highlights.map((highlight, idx) => (
                    <li key={idx} className="flex items-center gap-3">
                      <span className="text-brand-gold text-[10px]">✦</span>
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>

                {/* Button CTAs */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto">
                  <Link
                    href={slides[currentSlide].ctaLink}
                    className="px-8 py-4 text-[12px] font-dmsans uppercase tracking-wide font-medium border border-brand-gold text-brand-gold hover:bg-brand-gold hover:text-brand-black hover:brightness-75 transition-all duration-300 text-center shimmer-hover"
                  >
                    {slides[currentSlide].ctaText}
                  </Link>
                  <Link
                    href="/#bulk-orders"
                    className="px-8 py-4 text-[12px] font-dmsans uppercase tracking-wide font-medium bg-brand-cream text-brand-black hover:brightness-75 transition-all duration-300 text-center shimmer-hover"
                  >
                    BULK ORDER ENQUIRY
                  </Link>
                </div>
              </div>

              {/* Right Side: Showcase Image with Creative Arched Grid Backdrop */}
              <div className="flex justify-center lg:justify-end relative w-full h-[360px] sm:h-[460px] lg:h-[540px]">
                {/* Creative Arched Backdrop Canvas */}
                <div className="absolute inset-0 flex items-center justify-center lg:justify-end pointer-events-none">
                  <div className="relative w-[300px] sm:w-[420px] lg:w-[480px] h-[340px] sm:h-[440px] lg:h-[510px] bg-gradient-to-b from-brand-gold/15 to-transparent rounded-t-full border border-brand-gold/10 flex items-center justify-center overflow-hidden">
                    <div 
                      className="absolute inset-0 opacity-[0.06]" 
                      style={{
                        backgroundImage: `radial-gradient(circle at 1px 1px, #C9A84C 1px, transparent 0)`,
                        backgroundSize: '24px 24px'
                      }}
                    />
                    <div className="absolute w-[80%] h-[80%] rounded-full border border-brand-gold/10 animate-[spin_60s_linear_infinite]" />
                    <div className="absolute w-[60%] h-[60%] rounded-full border border-brand-gold/5 animate-[spin_40s_linear_infinite_reverse]" />
                    <div className="absolute w-[95%] h-[95%] rounded-full border border-dashed border-brand-gold/5 animate-[spin_120s_linear_infinite]" />
                  </div>
                </div>

                {/* Chair Image Container with Breathing Float */}
                <div className="relative z-10 w-full h-full flex items-center justify-center lg:justify-end pr-0 lg:pr-2">
                  <motion.div
                    animate={{ y: [0, -12, 0] }}
                    transition={{
                      repeat: Infinity,
                      duration: 5.5,
                      ease: "easeInOut"
                    }}
                    className="relative w-[280px] sm:w-[400px] lg:w-[480px] h-[280px] sm:h-[400px] lg:h-[480px] group cursor-pointer"
                  >
                    <Image
                      src={slides[currentSlide].image}
                      alt={slides[currentSlide].tag}
                      fill
                      priority
                      sizes="(max-width: 768px) 100vw, 600px"
                      className="object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.65)] hover:scale-105 transition-transform duration-500"
                    />

                    {/* Glass Info Pill */}
                    <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 sm:translate-x-0 sm:left-4 glass px-4 py-2 rounded-sm border border-brand-gold/20 shadow-lg pointer-events-none whitespace-nowrap">
                      <p className="font-dmsans text-[9px] uppercase tracking-widest text-brand-gold font-bold">
                        {slides[currentSlide].subtext}
                      </p>
                    </div>

                    {/* Bestseller Badge */}
                    <span className="absolute top-2 right-2 sm:right-6 glass border border-brand-gold/30 px-3 py-1.5 text-[9px] font-dmsans uppercase tracking-widest text-brand-gold font-bold shadow-[0_0_12px_rgba(201,168,76,0.15)] pointer-events-none">
                      BESTSELLER
                    </span>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Footer-aligned Controls and Partners Panel */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mt-6 pt-6 border-t border-brand-gold/10 z-20">
          {/* Interactive Controls (Arrows, Dots, Play/Pause) */}
          <div className="flex items-center gap-4 bg-brand-card/45 border border-brand-gold/15 px-4 py-2.5 rounded-sm backdrop-blur-md self-start">
            <div className="flex items-center gap-1.5">
              <button
                onClick={prevSlide}
                className="w-8 h-8 border border-brand-gold/25 hover:border-brand-gold/60 flex items-center justify-center text-brand-grey hover:text-brand-cream transition-all duration-300"
                aria-label="Previous slide"
              >
                <ChevronLeft size={15} />
              </button>
              <button
                onClick={nextSlide}
                className="w-8 h-8 border border-brand-gold/25 hover:border-brand-gold/60 flex items-center justify-center text-brand-grey hover:text-brand-cream transition-all duration-300"
                aria-label="Next slide"
              >
                <ChevronRight size={15} />
              </button>
            </div>

            {/* Pagination Lines */}
            <div className="flex items-center gap-2 px-1">
              {slides.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => goToSlide(idx)}
                  className={`h-1 transition-all duration-300 ${
                    currentSlide === idx ? "w-6 bg-brand-gold" : "w-1.5 bg-brand-grey/35 hover:bg-brand-grey/60"
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

            <span className="h-4 w-[1px] bg-brand-gold/20" />

            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="w-8 h-8 border border-brand-gold/25 hover:border-brand-gold/60 flex items-center justify-center text-brand-grey hover:text-brand-cream transition-all duration-300"
              aria-label={isPlaying ? "Pause autoplay" : "Play autoplay"}
            >
              {isPlaying ? <Pause size={12} /> : <Play size={12} />}
            </button>
          </div>

          {/* Partners Line */}
          <div className="flex flex-col gap-2.5">
            <span className="text-[10px] font-dmsans uppercase tracking-widest text-brand-gold font-bold">
              Trusted Across Platforms
            </span>
            <div className="flex flex-wrap items-center gap-4 sm:gap-6">
              {/* Amazon Column */}
              <div className="flex items-center gap-2 bg-brand-card/80 border border-brand-gold/15 px-3 py-1.5 rounded-sm">
                <div className="relative h-5 w-5 flex-shrink-0">
                  <Image
                    src="/images/amazon_logo_white.png"
                    alt="Amazon"
                    fill
                    className="object-contain"
                  />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] font-dmsans font-bold text-brand-cream">
                    19000+ Reviews
                  </span>
                </div>
              </div>

              {/* Flipkart Column */}
              <div className="flex items-center gap-2 bg-brand-card/80 border border-brand-gold/15 px-3 py-1.5 rounded-sm">
                <div className="relative h-5 w-5 flex-shrink-0">
                  <Image
                    src="/images/flipkart_logo.png"
                    alt="Flipkart"
                    fill
                    className="object-contain"
                  />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] font-dmsans font-bold text-brand-cream">
                    11500+ Reviews
                  </span>
                </div>
              </div>

              {/* Google Column */}
              <div className="flex items-center gap-2 bg-brand-card/80 border border-brand-gold/15 px-3 py-1.5 rounded-sm">
                <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
                </svg>
                <div className="flex flex-col">
                  <span className="text-[10px] font-dmsans font-bold text-brand-cream">
                    100+ Reviews
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
