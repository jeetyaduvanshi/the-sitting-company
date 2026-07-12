"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, Variants } from "framer-motion";
import { useState, useEffect } from "react";
import { categories } from "@/data/categories";

export default function Categories() {
  const [counts, setCounts] = useState<Record<string, number>>({});

  // Fetch live product counts from DB
  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const res = await fetch("/api/categories");
        if (res.ok) {
          const data = await res.json();
          setCounts(data);
        }
      } catch {
        // Silently fail — hardcoded fallback will still look good
      }
    };
    fetchCounts();
  }, []);

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

  // Build the count label — use live count if available, otherwise show nothing
  const getCountLabel = (categoryName: string) => {
    const count = counts[categoryName];
    if (count === undefined) return null; // still loading
    if (count === 0) return "Coming Soon";
    return `${count} ${count === 1 ? "Product" : "Products"}`;
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
          {categories.map((category) => {
            const countLabel = getCountLabel(category.name);
            const hasProducts = counts[category.name] > 0;

            return (
              <motion.div
                key={category.id}
                variants={cardVariants}
                whileHover={{
                  y: -6,
                  boxShadow: "0 10px 30px -15px rgba(201,168,76,0.15)",
                }}
                className="bg-brand-card border border-brand-divider flex flex-col group relative overflow-hidden transition-all duration-300"
              >
                <Link
                  href={`/category/${category.id}`}
                  className="flex flex-col flex-grow"
                  aria-label={`Browse ${category.name}`}
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

                    {/* "View Collection" pill on hover */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span className="bg-brand-gold text-brand-black text-[10px] font-dmsans font-bold uppercase tracking-widest px-4 py-2">
                        View Collection →
                      </span>
                    </div>
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

                    {/* Live count with subtle indicator */}
                    <div className="flex items-center gap-2 mt-2">
                      {countLabel !== null ? (
                        <>
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${
                              hasProducts ? "bg-brand-gold" : "bg-brand-grey/40"
                            }`}
                          />
                          <span className={`text-xs font-dmsans ${hasProducts ? "text-brand-grey" : "text-brand-grey/50"}`}>
                            {countLabel}
                          </span>
                        </>
                      ) : (
                        // Loading skeleton
                        <span className="inline-block w-20 h-3 bg-brand-divider animate-pulse rounded" />
                      )}
                    </div>
                  </div>
                </Link>

                {/* Bottom Gold Hover Border */}
                <div className="absolute bottom-0 left-0 w-full h-[2px] bg-brand-gold scale-x-0 origin-left transition-transform duration-500 ease-out group-hover:scale-x-100" />
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
