"use client";

import Image from "next/image";
import { motion, Variants } from "framer-motion";
import { categories } from "@/data/categories";

export default function Categories() {
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
    hidden: { y: 40, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <section id="collections" className="py-28 px-6 md:px-12 bg-brand-black relative">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-[11px] font-dmsans uppercase tracking-widest text-brand-gold font-bold block mb-4">
            OUR COLLECTIONS
          </span>
          <h2 className="font-cormorant text-4xl sm:text-5xl lg:text-6xl text-brand-white">
            Find Your <span className="italic text-brand-cream font-normal">Perfect Chair</span>
          </h2>
        </div>

        {/* Categories Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {categories.map((category) => (
            <motion.div
              key={category.id}
              variants={cardVariants}
              whileHover={{
                y: -6,
                boxShadow: "0 10px 30px -15px rgba(201,168,76,0.15)",
              }}
              className="bg-brand-card border border-brand-divider flex flex-col group relative overflow-hidden transition-all duration-300 cursor-pointer"
            >
              {/* Image Section */}
              <div className="relative aspect-[4/3] w-full overflow-hidden">
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                />
                {/* Dark Overlay */}
                <div className="absolute inset-0 bg-brand-black/25 transition-opacity duration-300 group-hover:bg-brand-black/10" />
              </div>

              {/* Text Details */}
              <div className="p-6 flex flex-col items-start justify-between flex-grow">
                <div>
                  <span className="text-[10px] font-dmsans uppercase tracking-widest text-brand-gold mb-2 block font-semibold">
                    COLLECTION
                  </span>
                  <h3 className="font-cormorant text-2xl font-bold text-brand-cream leading-tight mb-2 group-hover:text-brand-gold transition-colors duration-300">
                    {category.name}
                  </h3>
                </div>
                <span className="text-xs font-dmsans text-brand-grey mt-2">
                  {category.count}
                </span>
              </div>

              {/* Bottom Gold Hover Border */}
              <div className="absolute bottom-0 left-0 w-full h-[2px] bg-brand-gold scale-x-0 origin-left transition-transform duration-500 ease-out group-hover:scale-x-100" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
