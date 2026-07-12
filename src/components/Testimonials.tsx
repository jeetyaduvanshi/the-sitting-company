"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Review {
  stars: number;
  text: string;
  name: string;
  city: string;
}

export default function Testimonials() {
  const reviews: Review[] = [
    {
      stars: 5,
      text: "The Sovereign Lounge is the centerpiece of our home. It's not just a chair; it's a sculpture of pure comfort. Absolutely stellar workmanship.",
      name: "Aarav Sharma",
      city: "Mumbai",
    },
    {
      stars: 5,
      text: "Ordering 150 custom ergonomic chairs for our Bengaluru headquarters was seamless. The quality is exceptional and same-day delivery timelines were met.",
      name: "Priyan Singh",
      city: "Bengaluru",
    },
    {
      stars: 5,
      text: "The orthopedic lumbar alignment on the Aeron Pro completely relieved my workspace posture fatigue. An investment that pays off every single day.",
      name: "Ananya Das",
      city: "New Delhi",
    },
  ];

  const [activeIndex, setActiveIndex] = useState(0);

  // Auto-carousel timer for mobile viewports
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % reviews.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [reviews.length]);

  return (
    <section id="testimonials" className="py-28 px-6 md:px-12 bg-brand-card relative overflow-hidden">
      {/* Ambient glow orbs */}
      <div className="orb-gold absolute -top-20 -right-20 w-[400px] h-[400px] opacity-[0.06]" />
      <div className="orb-gold absolute -bottom-20 -left-20 w-[400px] h-[400px] opacity-[0.05]" style={{ animationDelay: "3s" }} />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-20">
          <span className="text-[11px] font-dmsans uppercase tracking-widest text-brand-gold font-bold block mb-4">
            TESTIMONIALS
          </span>
          <h2 className="font-cormorant text-4xl sm:text-5xl lg:text-6xl text-brand-white">
            What Our Customers Say
          </h2>
        </div>

        {/* Desktop View: Glass Grid */}
        <div className="hidden md:grid grid-cols-3 gap-8">
          {reviews.map((review, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              whileHover={{ y: -6 }}
              className="glass-card p-8 md:p-10 rounded-sm flex flex-col justify-between h-[340px] shimmer-hover group"
            >
              <div>
                {/* Stars with gold glow */}
                <div className="flex gap-1 text-brand-gold mb-6 text-sm drop-shadow-[0_0_6px_rgba(201,168,76,0.6)]">
                  {Array.from({ length: review.stars }).map((_, i) => (
                    <span key={i}>★</span>
                  ))}
                </div>
                {/* Quote */}
                <p className="font-cormorant italic text-lg leading-relaxed text-brand-cream line-clamp-4">
                  {review.text}
                </p>
              </div>

              {/* Divider and Author */}
              <div className="mt-6 pt-6 border-t border-brand-divider flex flex-col group-hover:border-brand-gold/30 transition-colors duration-300">
                <span className="font-dmsans text-sm font-bold text-brand-cream group-hover:text-brand-gold transition-colors duration-300">
                  {review.name}
                </span>
                <span className="font-dmsans text-[11px] text-brand-grey uppercase tracking-widest mt-1">
                  {review.city}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Mobile View: Animated Carousel with Dots */}
        <div className="block md:hidden relative min-h-[340px]">
          <div className="overflow-hidden relative w-full h-[290px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.4 }}
                className="absolute inset-0 glass-card p-8 rounded-sm flex flex-col justify-between h-full"
              >
                <div>
                  <div className="flex gap-1 text-brand-gold mb-4 text-xs drop-shadow-[0_0_4px_rgba(201,168,76,0.6)]">
                    {Array.from({ length: reviews[activeIndex].stars }).map((_, i) => (
                      <span key={i}>★</span>
                    ))}
                  </div>
                  <p className="font-cormorant italic text-base leading-relaxed text-brand-cream line-clamp-5">
                    {reviews[activeIndex].text}
                  </p>
                </div>
                <div className="pt-4 border-t border-brand-divider flex flex-col">
                  <span className="font-dmsans text-sm font-bold text-brand-cream">
                    {reviews[activeIndex].name}
                  </span>
                  <span className="font-dmsans text-[11px] text-brand-grey uppercase tracking-widest mt-1">
                    {reviews[activeIndex].city}
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Dot Indicators */}
          <div className="flex justify-center gap-2.5 mt-8">
            {reviews.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  activeIndex === index
                    ? "bg-brand-gold shadow-[0_0_8px_rgba(201,168,76,0.7)] w-6"
                    : "bg-brand-grey/40 w-2"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
