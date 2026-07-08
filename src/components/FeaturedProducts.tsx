"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, Variants } from "framer-motion";
import { products } from "@/data/products";

export default function FeaturedProducts() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const cardVariants: Variants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  return (
    <section id="products" className="py-28 px-6 md:px-12 bg-brand-black relative">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-20">
          <span className="text-[11px] font-dmsans uppercase tracking-widest text-brand-gold font-bold mb-4">
            BEST SELLERS
          </span>
          <h2 className="font-cormorant text-4xl sm:text-5xl lg:text-6xl text-brand-white">
            Our Most <span className="italic text-brand-cream font-normal">Loved Chairs</span>
          </h2>
        </div>

        {/* Products Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8 lg:gap-12"
        >
          {products.map((product) => (
            <motion.div
              key={product.id}
              variants={cardVariants}
              className="group bg-brand-card border border-brand-divider hover:border-brand-gold/40 flex flex-col justify-between transition-all duration-500 rounded-sm relative overflow-hidden h-auto"
            >
              {/* Product Tag if available */}
              {product.tag && (
                <span className="absolute top-4 left-4 z-20 bg-brand-black/85 border border-brand-gold/30 px-2.5 py-1 text-[8px] font-dmsans uppercase tracking-widest text-brand-gold font-semibold">
                  {product.tag}
                </span>
              )}

              {/* Square Image container (1:1) */}
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

              {/* Product Details Section */}
              <div className="p-6 flex-grow flex flex-col justify-between bg-brand-card">
                <div>
                  <div className="flex items-baseline justify-between mb-3 gap-2">
                    <h3 className="font-cormorant text-2xl text-brand-cream group-hover:text-brand-gold transition-colors duration-300 font-semibold truncate max-w-[70%]">
                      {product.name}
                    </h3>
                    <span className="font-dmsans text-sm font-semibold text-brand-gold font-bold">
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
                    className="group/btn flex items-center justify-center gap-1 py-2.5 border border-brand-gold/15 hover:border-amber-500/50 bg-brand-black/40 hover:bg-amber-500/5 transition-all duration-300 rounded-sm"
                  >
                    <span className="text-[9px] font-dmsans uppercase tracking-wider text-brand-grey group-hover/btn:text-amber-500 transition-colors duration-300 font-bold">
                      BUY ON
                    </span>
                    <svg
                      className="w-12 h-3.5 fill-current text-brand-cream group-hover/btn:text-white transition-colors duration-300"
                      viewBox="0 0 54 18"
                    >
                      <path d="M1.3 14h3.5v-3.7c0-1.1.5-1.6 1.3-1.6.8 0 1.2.4 1.2 1.2v4.1h3.5v-4.7c0-2-1.1-3.2-2.9-3.2-.9 0-1.7.5-2.4 1.3V8.6H1.3v5.4z" />
                      <path d="M1.7 15.6C4.5 17 8.2 17.5 12 17.5c3.2 0 6.5-.3 9-1.2.6-.2.1-1-.4-.8-2 1-5 1.2-8.6 1.2-3.5 0-6.8-.3-9.5-1.3-.5-.2-.7.6-.2.8z" fill="#f97316" />
                    </svg>
                  </Link>

                  <Link
                    href={product.flipkartUrl}
                    className="group/btn flex items-center justify-center gap-1.5 py-2.5 border border-brand-gold/15 hover:border-sky-500/50 bg-brand-black/40 hover:bg-sky-500/5 transition-all duration-300 rounded-sm"
                  >
                    <span className="text-[9px] font-dmsans uppercase tracking-wider text-brand-grey group-hover/btn:text-sky-500 transition-colors duration-300 font-bold">
                      BUY ON
                    </span>
                    <div className="flex items-center gap-0.5">
                      <svg className="w-3 h-3 fill-current text-sky-500" viewBox="0 0 24 24">
                        <path d="M17 18a2 2 0 1 1-4 0 2 2 0 0 1 4 0zM7 18a2 2 0 1 1-4 0 2 2 0 0 1 4 0zM19 4H5v1h14V4zm-2 3H7v7h10V7z" />
                      </svg>
                      <span className="text-[10px] font-dmsans font-bold text-brand-cream group-hover/btn:text-white transition-colors duration-300 tracking-tight">
                        Flipkart
                      </span>
                    </div>
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
