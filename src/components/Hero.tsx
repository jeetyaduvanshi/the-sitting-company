"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, Variants } from "framer-motion";

export default function Hero() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const lineVariants: Variants = {
    hidden: { y: 60, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: [0.215, 0.61, 0.355, 1] },
    },
  };

  const fadeUpVariants: Variants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center pt-24 pb-16 px-6 md:px-12 bg-brand-black overflow-hidden"
    >
      {/* Subtle radial gradient accent */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(42,31,20,0.15)_0%,rgba(15,11,8,0)_70%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-12 lg:gap-16 items-center">
        {/* Left Side: Content */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-start text-left z-10"
        >
          {/* Top Label */}
          <motion.span
            variants={fadeUpVariants}
            className="text-[11px] font-dmsans uppercase tracking-widest text-brand-gold mb-6 font-semibold"
          >
            PREMIUM SITTING SINCE 2020
          </motion.span>

          {/* Staggered Heading */}
          <h1 className="flex flex-col font-cormorant font-light text-[64px] sm:text-[90px] lg:text-[110px] leading-[0.95] text-brand-white tracking-normal mb-8">
            <span className="overflow-hidden block py-1">
              <motion.span variants={lineVariants} className="block">
                SITTING
              </motion.span>
            </span>
            <span className="overflow-hidden block py-1">
              <motion.span
                variants={lineVariants}
                className="block text-brand-cream italic font-normal"
              >
                THAT
              </motion.span>
            </span>
            <span className="overflow-hidden block py-1">
              <motion.span variants={lineVariants} className="block">
                DEFINES
              </motion.span>
            </span>
          </h1>

          {/* Description */}
          <motion.p
            variants={fadeUpVariants}
            className="text-brand-grey font-dmsans text-[15px] sm:text-[17px] leading-relaxed max-w-lg mb-10"
          >
            Crafted for offices, homes & events.
            <br />
            Trusted by 500+ businesses across India.
          </motion.p>

          {/* Button CTAs */}
          <motion.div
            variants={fadeUpVariants}
            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto mb-10"
          >
            <Link
              href="#collections"
              className="px-8 py-4 text-[12px] font-dmsans uppercase tracking-wide font-medium border border-brand-gold text-brand-gold hover:bg-brand-gold hover:text-brand-black transition-all duration-300 text-center"
            >
              EXPLORE COLLECTION
            </Link>
            <Link
              href="#bulk-orders"
              className="px-8 py-4 text-[12px] font-dmsans uppercase tracking-wide font-medium bg-brand-cream text-brand-black hover:scale-105 transition-all duration-300 text-center"
            >
              BULK ORDER ENQUIRY
            </Link>
          </motion.div>

          {/* Partners line */}
          <motion.div
            variants={fadeUpVariants}
            className="w-full max-w-sm pt-6 border-t border-brand-gold/20 flex flex-col gap-3"
          >
            <span className="text-[11px] font-dmsans uppercase tracking-widest text-brand-grey">
              Available on Amazon & Flipkart
            </span>
            <div className="flex items-center gap-6 opacity-40 hover:opacity-60 transition-opacity duration-300">
              {/* Amazon Text/Icon Representation */}
              <span className="text-brand-white font-dmsans font-semibold text-xs tracking-wider">
                amazon
              </span>
              <span className="h-3 w-[1px] bg-brand-grey/30" />
              {/* Flipkart Text/Icon Representation */}
              <span className="text-brand-white font-dmsans font-semibold text-xs tracking-wider">
                Flipkart
              </span>
            </div>
          </motion.div>
        </motion.div>

        {/* Right Side: Floating Card */}
        <div className="flex justify-center lg:justify-end z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{
              opacity: 1,
              y: [0, -12, 0],
            }}
            transition={{
              opacity: { duration: 1 },
              y: {
                repeat: Infinity,
                duration: 6,
                ease: "easeInOut",
              },
            }}
            className="relative bg-brand-card p-4 border border-brand-divider shadow-2xl rounded-sm w-full max-w-[400px] group"
          >
            {/* Fine border container */}
            <div className="relative aspect-[4/5] w-full overflow-hidden border border-brand-gold/10">
              <Image
                src="/images/hero_chair.png"
                alt="The Sitting Company Best Selling Ergonomic Office Chair"
                fill
                priority
                sizes="(max-width: 768px) 100vw, 400px"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-black/40 via-transparent to-transparent pointer-events-none" />
            </div>

            {/* Bestseller Badge */}
            <span className="absolute bottom-8 right-8 bg-brand-black/80 backdrop-blur-sm border border-brand-gold/30 px-3 py-1.5 text-[9px] font-dmsans uppercase tracking-widest text-brand-gold font-bold">
              BESTSELLER
            </span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
