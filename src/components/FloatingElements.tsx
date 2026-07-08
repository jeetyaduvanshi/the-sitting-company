"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import Link from "next/link";

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
            href="https://wa.me/919876543210?text=Hello%2C%20I%20am%20interested%20in%20seating%20solutions%20from%20The%20Sitting%20Company."
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Contact on WhatsApp"
            className="flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 bg-[#25D366] text-white rounded-full shadow-2xl hover:bg-[#128C7E] transition-colors duration-300"
          >
            {/* Custom Premium Minimal WhatsApp SVG */}
            <svg
              className="w-6 h-6 sm:w-7 sm:h-7 fill-white"
              viewBox="0 0 24 24"
            >
              <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.457L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.725 1.45 5.276 0 9.561-4.288 9.564-9.567.002-2.556-.994-4.959-2.805-6.772C16.32 2.453 13.922 1.458 11.16 1.458c-5.276 0-9.562 4.29-9.564 9.569-.001 1.636.486 3.235 1.411 4.67l-.955 3.486 3.595-.943zm11.12-6.52c-.225-.113-1.332-.656-1.54-.73-.206-.075-.356-.112-.506.113-.15.226-.582.73-.713.882-.13.15-.262.17-.487.056-.225-.113-.95-.35-1.81-1.118-.67-.597-1.121-1.335-1.253-1.56-.13-.226-.014-.348.099-.461.101-.102.225-.263.338-.395.112-.132.15-.226.225-.376.075-.15.037-.282-.019-.395-.056-.113-.506-1.22-.693-1.67-.182-.44-.367-.38-.506-.387-.13-.007-.28-.007-.43-.007-.15 0-.394.056-.6.282-.206.225-.788.77-7.88 1.88 0 1.11 1.33 3.636 1.517 3.886.188.25 2.62 4.004 6.347 5.61 2.215.955 3.946 1.524 5.295 1.954.912.29 1.745.249 2.4.152.73-.109 2.253-.922 2.572-1.815.318-.892.318-1.657.225-1.814-.094-.157-.244-.247-.47-.36z" />
            </svg>
          </Link>
        </motion.div>
      </div>
    </>
  );
}
