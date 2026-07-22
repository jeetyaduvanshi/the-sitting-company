"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { products, Product } from "@/data/products";

// Build the unique categories list from actual products
function getUniqueCategories(prods: Product[]) {
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
  const [productsList, setProductsList] = useState<Product[]>(products);

  useEffect(() => {
    async function fetchDynamicProducts() {
      try {
        const res = await fetch("/api/upload-chair");
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data) && data.length > 0) {
            setProductsList(data);
          }
        }
      } catch (err) {
        console.error("Failed to load products dynamically:", err);
      }
    }
    fetchDynamicProducts();
  }, []);

  const uniqueCategories = getUniqueCategories(productsList);
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const filtered = activeCategory === "All"
    ? productsList
    : productsList.filter((p) => p.category === activeCategory);

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
    <section id="products" className="pt-36 pb-28 px-6 md:px-12 bg-brand-black relative overflow-hidden">
      {/* Ambient orbs */}
      <div className="orb-gold absolute top-0 right-0 w-[500px] h-[500px] opacity-[0.05]" />
      <div className="orb-gold absolute bottom-0 left-0 w-[400px] h-[400px] opacity-[0.04]" style={{ animationDelay: "5s" }} />
      <div className="max-w-7xl mx-auto relative z-10">

        {/* Back Button */}
        <div className="mb-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-[10px] sm:text-[11px] font-dmsans uppercase tracking-widest text-brand-gold hover:text-brand-white transition-colors duration-300 group w-fit"
          >
            <span className="transform translate-x-0 group-hover:-translate-x-1.5 transition-transform duration-300">←</span> Back to Home
          </Link>
        </div>

        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-12">
          <span className="text-[11px] font-dmsans uppercase tracking-widest text-brand-gold font-bold mb-4">
            MOST LOVED CHAIRS
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
                  className="group glass-card flex flex-col justify-between rounded-sm relative overflow-hidden shimmer-hover"
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
                        <h3 className="font-cormorant text-2xl text-brand-cream group-hover:text-brand-gold transition-colors duration-300 font-semibold">
                          {product.name}
                        </h3>
                      </div>
                      <p className="font-dmsans text-xs text-brand-grey leading-relaxed min-h-[40px] line-clamp-2">
                        {product.description}
                      </p>
                    </div>

                    {/* Side-by-Side CTA Buttons */}
                    <div className="grid grid-cols-2 gap-3 mt-6">
                      <Link
                        href={product.amazonLink || "#"}
                        className="group/btn flex items-center justify-center gap-2 py-2.5 glass border-0 hover:border hover:border-amber-500/40 hover:shadow-[0_0_16px_rgba(255,153,0,0.2)] transition-all duration-300 rounded-sm"
                      >
                        <span className="text-[9px] font-dmsans uppercase tracking-wider text-brand-grey group-hover/btn:text-amber-400 transition-colors duration-300 font-bold">
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
                        href={product.flipkartLink || "#"}
                        className="group/btn flex items-center justify-center gap-2 py-2.5 glass border-0 hover:border hover:border-sky-500/40 hover:shadow-[0_0_16px_rgba(14,165,233,0.2)] transition-all duration-300 rounded-sm"
                      >
                        <span className="text-[9px] font-dmsans uppercase tracking-wider text-brand-grey group-hover/btn:text-sky-400 transition-colors duration-300 font-bold">
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

                    {/* Bulk Order Strip */}
                    <div className="mt-4 flex items-center gap-2.5 border border-brand-gold/20 bg-brand-gold/5 px-4 py-2.5 rounded-sm">
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5 text-brand-gold shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10" />
                      </svg>
                      <p className="font-dmsans text-[9px] uppercase tracking-widest text-brand-gold/80 leading-relaxed">
                        Bulk order of <span className="font-bold text-brand-gold">{product.name.replace('The ', '')}</span> — get exclusive discounts.
                        <a href="/#bulk-orders" className="ml-1 underline underline-offset-2 hover:text-brand-gold transition-colors duration-200">Know more →</a>
                      </p>
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
