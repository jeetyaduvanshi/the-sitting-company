"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function AboutStrip() {
  return (
    <section id="about" className="bg-brand-black border-t border-b border-brand-divider relative overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-2">
        {/* Left Side: Full Bleed Image */}
        <div className="relative h-[400px] sm:h-[500px] lg:h-auto min-h-[400px] w-full overflow-hidden border-b lg:border-b-0 lg:border-r border-brand-divider">
          <Image
            src="/images/about_lifestyle.webp"
            alt="The Sitting Company lifestyle furniture manufacturing craftsmanship"
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover transition-transform duration-700 ease-out hover:scale-105"
          />
          <div className="absolute inset-0 bg-brand-black/25 pointer-events-none" />
        </div>

        {/* Right Side: Editorial Text */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col justify-center items-start p-8 sm:p-16 lg:p-20 xl:p-28 bg-brand-deep text-brand-white"
        >
          <span className="text-[11px] font-dmsans uppercase tracking-widest text-brand-gold font-bold mb-6">
            OUR STORY
          </span>
          <h2 className="font-cormorant text-4xl sm:text-5xl leading-tight mb-8 text-brand-cream">
            Crafting Premium Seating <br className="hidden sm:inline" />
            for Every Space
          </h2>
          <p className="font-dmsans text-[15px] sm:text-[16px] text-brand-grey leading-relaxed mb-10 max-w-lg">
            At The Sitting Company, we believe a chair is more than utility—it&apos;s
            the foundation of focus, relaxation, and design. Combining heritage
            Indian craftsmanship with contemporary ergonomic engineering, we shape
            seating that defines your space.
          </p>
          <Link
            href="/#collections"
            className="px-8 py-3.5 text-[11px] font-dmsans uppercase tracking-widest border border-brand-gold text-brand-gold hover:bg-brand-gold hover:text-brand-black transition-all duration-300 rounded-sm font-semibold"
          >
            KNOW MORE →
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
