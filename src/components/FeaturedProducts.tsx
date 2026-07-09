"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { products } from "@/data/products";

// Build the unique categories list from actual products
function getUniqueCategories(prods: typeof products) {
  const seen = new Set<string>();
  const cats: string[] = ["All"];
  for (const p of prods) {
    if (!seen.has(p.category)) {
      seen.add(p.category);
      cats.push(p.category);
    }
  }
  return cats;
}

export default function FeaturedProducts() {
  const uniqueCategories = getUniqueCategories(products);
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const filtered = activeCategory === "All"
    ? products
    : products.filter((p) => p.category === activeCategory);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12 },
    },
  };

  const cardVariants: Variants = {
    hidden: { y: 40, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.7, ease: "easeOut" },
    },
  };

  return (
    <section id="products" className="py-28 px-6 md:px-12 bg-brand-black relative">
      <div className="max-w-7xl mx-auto">

        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-12">
          <span className="text-[11px] font-dmsans uppercase tracking-widest text-brand-gold font-bold mb-4">
            OUR CATALOGUE
          </span>
          <h2 className="font-cormorant text-4xl sm:text-5xl lg:text-6xl text-brand-white">
            Our Most <span className="italic text-brand-cream font-normal">Loved Chairs</span>
          </h2>
        </div>

        {/* Category Filter Tabs */}
        {uniqueCategories.length > 1 && (
          <div className="flex flex-wrap items-center justify-center gap-2 mb-14">
            {uniqueCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 text-[10px] font-dmsans uppercase tracking-widest border transition-all duration-300
                  ${activeCategory === cat
                    ? "border-brand-gold bg-brand-gold/10 text-brand-gold"
                    : "border-brand-divider text-brand-grey hover:border-brand-gold/30 hover:text-brand-cream"
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>
        )}

        {/* Products Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit={{ opacity: 0, transition: { duration: 0.2 } }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-8 lg:gap-12"
          >
            {filtered.length === 0 ? (
              <div className="col-span-3 text-center py-20">
                <p className="font-cormorant text-2xl text-brand-grey italic">
                  No chairs in this category yet.
                </p>
                <p className="font-dmsans text-xs text-brand-grey/50 mt-3">
                  Check back soon — new arrivals coming.
                </p>
              </div>
            ) : (
              filtered.map((product) => (
                <motion.div
                  key={product.id}
                  variants={cardVariants}
                  layout
                  className="group bg-brand-card border border-brand-divider hover:border-brand-gold/40 flex flex-col justify-between transition-all duration-500 rounded-sm relative overflow-hidden"
                >
                  {/* Product Tag */}
                  {product.tag && (
                    <span className="absolute top-4 left-4 z-20 bg-brand-black/85 border border-brand-gold/30 px-2.5 py-1 text-[8px] font-dmsans uppercase tracking-widest text-brand-gold font-semibold">
                      {product.tag}
                    </span>
                  )}

                  {/* Category badge */}
                  <span className="absolute top-4 right-4 z-20 bg-brand-black/70 border border-brand-divider px-2 py-1 text-[8px] font-dmsans uppercase tracking-widest text-brand-grey">
                    {product.category}
                  </span>

                  {/* Square Image */}
                  <div className="relative aspect-square w-full bg-brand-black/40 overflow-hidden border-b border-brand-divider">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-brand-black/20" />
                  </div>

                  {/* Product Details */}
                  <div className="p-6 flex-grow flex flex-col justify-between bg-brand-card">
                    <div>
                      <div className="flex items-baseline justify-between mb-3 gap-2">
                        <h3 className="font-cormorant text-2xl text-brand-cream group-hover:text-brand-gold transition-colors duration-300 font-semibold truncate max-w-[70%]">
                          {product.name}
                        </h3>
                        <span className="font-dmsans text-sm font-semibold text-brand-gold">
                          {product.price}
                        </span>
                      </div>
                      <p className="font-dmsans text-xs text-brand-grey leading-relaxed min-h-[40px] line-clamp-2">
                        {product.description}
                      </p>
                    </div>

                    {/* Side-by-Side CTA Buttons - Visible by Default */}
                    <div className="grid grid-cols-2 gap-3 mt-6">
                      <Link
                        href={product.amazonUrl}
                        className="group/btn flex items-center justify-center gap-2 py-2.5 border border-brand-gold/15 hover:border-amber-500/50 bg-brand-black/40 hover:bg-amber-500/5 transition-all duration-300 rounded-sm"
                      >
                        <span className="text-[9px] font-dmsans uppercase tracking-wider text-brand-grey group-hover/btn:text-amber-500 transition-colors duration-300 font-bold">
                          BUY ON
                        </span>
                        <div className="relative w-4 h-4">
                          <Image
                            src="/images/amazon_logo_white.png"
                            alt="Amazon Logo"
                            fill
                            className="object-contain"
                          />
                        </div>
                      </Link>

                      <Link
                        href={product.flipkartUrl}
                        className="group/btn flex items-center justify-center gap-2 py-2.5 border border-brand-gold/15 hover:border-sky-500/50 bg-brand-black/40 hover:bg-sky-500/5 transition-all duration-300 rounded-sm"
                      >
                        <span className="text-[9px] font-dmsans uppercase tracking-wider text-brand-grey group-hover/btn:text-sky-500 transition-colors duration-300 font-bold">
                          BUY ON
                        </span>
                        <div className="relative w-4 h-4">
                          <Image
                            src="/images/flipkart_logo.png"
                            alt="Flipkart Logo"
                            fill
                            className="object-contain"
                          />
                        </div>
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </motion.div>
        </AnimatePresence>


      </div>
    </section>
  );
}
