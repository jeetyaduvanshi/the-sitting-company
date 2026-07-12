"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

export default function FloatingElements() {
  // Page Scroll Progress Bar Setup
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <>
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[3px] bg-brand-gold z-[100] origin-left"
        style={{ scaleX }}
      />

      {/* Floating WhatsApp Widget */}
      <div className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-50 flex items-center justify-center">
        {/* Pulsing Ripple Rings */}
        <span className="absolute w-16 h-16 bg-[#25D366]/20 rounded-full animate-ping pointer-events-none" />
        <span className="absolute w-12 h-12 bg-[#25D366]/35 rounded-full animate-pulse pointer-events-none" />

        {/* The Action Button */}
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="relative"
        >
          <Link
            href="https://wa.me/919868705995?text=Hello%2C%20I%20am%20interested%20in%20seating%20solutions%20from%20The%20Sitting%20Company."
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Contact on WhatsApp"
            className="flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-full shadow-2xl hover:scale-105 transition-transform duration-300 overflow-hidden"
          >
            <div className="relative w-full h-full">
              <Image
                src="/images/whatsapp_logo.webp"
                alt="WhatsApp"
                fill
                className="object-contain"
              />
            </div>
          </Link>
        </motion.div>
      </div>
    </>
  );
}
