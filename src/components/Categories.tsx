"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, Variants } from "framer-motion";
import { useState, useEffect } from "react";
import { categories } from "@/data/categories";

interface CategoryInfo {
  count: number;
  showpieceImage: string | null;
}

export default function Categories() {
  const [categoryData, setCategoryData] = useState<Record<string, CategoryInfo>>({});

  // Fetch live product counts + showpiece images from DB
  useEffect(() => {
    const fetchCategoryData = async () => {
      try {
        const res = await fetch("/api/categories");
        if (res.ok) {
          const data = await res.json();
          setCategoryData(data);
        }
      } catch {
        // Silently fail — hardcoded fallback will still look good
      }
    };
    fetchCategoryData();
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
    const info = categoryData[categoryName];
    if (!info) return null; // still loading
    if (info.count === 0) return "Coming Soon";
    return `${info.count} ${info.count === 1 ? "Product" : "Products"}`;
  };

  // Get the image to show for a category — use the showpiece from DB if available,
  // otherwise fall back to the static category image
  const getCategoryImage = (categoryName: string, staticImage: string) => {
    const info = categoryData[categoryName];
    if (info?.showpieceImage) return info.showpieceImage;
    return staticImage;
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
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {categories.map((category) => {
            const countLabel = getCountLabel(category.name);
            const info = categoryData[category.name];
            const hasProducts = info ? info.count > 0 : false;
            const displayImage = getCategoryImage(category.name, category.image);

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
                  {/* Image Section — uses showpiece product image from DB */}
                  <div className="relative aspect-[4/3] w-full overflow-hidden">
                    <Image
                      src={displayImage}
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
