"use client";

import { motion, Variants } from "framer-motion";
import { Gem, Activity, Coins, Building2 } from "lucide-react";

export default function WhyChooseUs() {
  const promises = [
    {
      icon: <Gem className="w-8 h-8 text-brand-gold stroke-[1.2]" />,
      title: "Premium Materials",
      description:
        "Hand-selected top-grain leathers, custom woven meshes, and sustainably sourced walnut accents built to endure generations.",
    },
    {
      icon: <Activity className="w-8 h-8 text-brand-gold stroke-[1.2]" />,
      title: "Ergonomic Design",
      description:
        "Engineered with orthopedic input. Synchronous tilt mechanisms and full lumbar tracking prevent strain and fatigue.",
    },
    {
      icon: <Coins className="w-8 h-8 text-brand-gold stroke-[1.2]" />,
      title: "Affordable Luxury",
      description:
        "Direct-to-consumer model eliminates distributor margins, bringing world-class craftsmanship at unmatched valuations.",
    },
    {
      icon: <Building2 className="w-8 h-8 text-brand-gold stroke-[1.2]" />,
      title: "Corporate Trust",
      description:
        "Partnered with over 500 companies in India, supplying workspaces, luxury hotels, and premier institutes at scale.",
    },
  ];

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants: Variants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <section className="py-28 px-6 md:px-12 bg-brand-black relative overflow-hidden">
      {/* Ambient orb */}
      <div className="orb-gold absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] opacity-[0.04]" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-20">
          <span className="text-[11px] font-dmsans uppercase tracking-widest text-brand-gold font-bold block mb-4">
            OUR PROMISE
          </span>
          <h2 className="font-cormorant text-4xl sm:text-5xl lg:text-6xl text-brand-white">
            Why The Sitting Company?
          </h2>
        </div>

        {/* Promise Cards Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {promises.map((promise, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{ y: -6 }}
              className="glass-card p-8 border-t-2 border-t-brand-gold flex flex-col items-start rounded-sm shimmer-hover group"
            >
              {/* Icon with glow ring */}
              <div className="mb-6 p-3 rounded-full border border-brand-divider icon-glow-hover transition-all duration-350 group-hover:border-brand-gold/30">
                {promise.icon}
              </div>
              <h3 className="font-cormorant text-[22px] font-semibold text-brand-cream mb-4 leading-tight group-hover:text-brand-gold transition-colors duration-300">
                {promise.title}
              </h3>
              <p className="font-dmsans text-[14px] text-brand-grey leading-relaxed">
                {promise.description}
              </p>

              {/* Bottom accent line — expands on hover */}
              <div className="mt-6 h-[1px] w-0 bg-gradient-to-r from-brand-gold/60 to-transparent group-hover:w-full transition-all duration-500" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
