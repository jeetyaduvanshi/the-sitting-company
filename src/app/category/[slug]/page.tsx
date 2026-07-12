"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { categories } from "@/data/categories";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// Map category slug → category name
const slugToName: Record<string, string> = {
  "office-chairs": "Office Chairs",
  "visitor-conference": "Visitor & Conference Chairs",
  "folding-chairs": "Folding Chairs",
  "study-chairs": "Study Chairs",
  "ergonomic-chairs": "Ergonomic Chairs",
  "bar-stools": "Bar Stools",
  "lounge-chairs": "Lounge Chairs",
  "gaming-chairs": "Gaming Chairs",
};

interface Product {
  id: string;
  name: string;
  category: string;
  description: string;
  price?: string;
  image: string;
  amazonLink?: string;
  flipkartLink?: string;
  tag?: string;
}

// ─── Tag Badge ────────────────────────────────────────────────────────────────
function TagBadge({ tag }: { tag: string }) {
  return (
    <span className="absolute top-3 right-3 z-10 text-[9px] font-dmsans font-bold tracking-widest uppercase px-2.5 py-1 bg-brand-gold text-brand-black">
      {tag}
    </span>
  );
}

// ─── Product Card ─────────────────────────────────────────────────────────────
function ProductCard({ product }: { product: Product }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="glass-card group relative flex flex-col overflow-hidden"
    >
      {/* Tag */}
      {product.tag && <TagBadge tag={product.tag} />}

      {/* Image */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-brand-card">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-108"
        />
        <div className="absolute inset-0 bg-brand-black/20 transition-opacity duration-300 group-hover:bg-brand-black/5" />
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-grow">
        {/* Category pill */}
        <span className="text-[9px] font-dmsans font-semibold uppercase tracking-widest text-brand-gold mb-2 block">
          {product.category}
        </span>

        {/* Name */}
        <h3 className="font-cormorant text-xl font-bold text-brand-cream leading-snug mb-3 group-hover:text-brand-gold transition-colors duration-300">
          {product.name}
        </h3>

        {/* Description */}
        <p className="text-sm font-dmsans text-brand-grey leading-relaxed mb-6 flex-grow line-clamp-3">
          {product.description}
        </p>

        {/* Bulk order CTA */}
        <div className="mb-5 p-3 border border-brand-gold/20 bg-brand-gold/5">
          <p className="text-[11px] font-dmsans text-brand-gold/80 leading-relaxed">
            📦 <span className="font-semibold">Bulk Orders Available</span> — Contact us for special pricing on bulk purchases
          </p>
        </div>

        {/* Buy Buttons */}
        <div className="flex gap-3 mt-auto">
          <a
            href={product.amazonLink || "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-2 py-2.5 text-[11px] font-dmsans font-semibold uppercase tracking-widest bg-[#FF9900] text-brand-black hover:bg-[#FFB347] transition-colors duration-200"
          >
            <svg className="w-3.5 h-3.5 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
              <path d="M13.958 10.09c0 1.232.029 2.256-.591 3.351-.502.891-1.301 1.438-2.186 1.438-1.214 0-1.922-.924-1.922-2.292 0-2.692 2.415-3.182 4.7-3.182v.685zm3.186 7.705c-.209.189-.512.201-.745.074-1.052-.872-1.238-1.276-1.814-2.106-1.734 1.767-2.962 2.297-5.209 2.297-2.66 0-4.731-1.641-4.731-4.925 0-2.565 1.391-4.309 3.37-5.164 1.715-.754 4.11-.891 5.942-1.095v-.41c0-.753.06-1.642-.383-2.294-.385-.579-1.124-.82-1.775-.82-1.205 0-2.277.618-2.54 1.897-.054.285-.261.567-.549.582l-3.061-.33c-.259-.056-.548-.266-.472-.66.704-3.716 4.06-4.83 7.066-4.83 1.537 0 3.547.41 4.758 1.574 1.538 1.436 1.392 3.352 1.392 5.438v4.923c0 1.481.616 2.13 1.192 2.929.204.287.25.631-.01.842l-2.431 2.078h.001z"/>
            </svg>
            Amazon
          </a>
          <a
            href={product.flipkartLink || "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-2 py-2.5 text-[11px] font-dmsans font-semibold uppercase tracking-widest bg-[#2874F0] text-white hover:bg-[#1a5dc7] transition-colors duration-200"
          >
            <svg className="w-3.5 h-3.5 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z"/>
            </svg>
            Flipkart
          </a>
        </div>
      </div>

      {/* Bottom gold border */}
      <div className="absolute bottom-0 left-0 w-full h-[2px] bg-brand-gold scale-x-0 origin-left transition-transform duration-500 ease-out group-hover:scale-x-100" />
    </motion.div>
  );
}

// ─── Empty State ──────────────────────────────────────────────────────────────
function EmptyState({ categoryName }: { categoryName: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="flex flex-col items-center justify-center py-32 text-center"
    >
      <div className="w-24 h-24 rounded-full border border-brand-gold/20 flex items-center justify-center mb-8 bg-brand-gold/5">
        <svg className="w-10 h-10 text-brand-gold/40" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
        </svg>
      </div>
      <h3 className="font-cormorant text-3xl text-brand-cream mb-3">
        Coming Soon
      </h3>
      <p className="font-dmsans text-brand-grey text-sm max-w-sm leading-relaxed mb-8">
        Our curators are handpicking the finest <span className="text-brand-gold">{categoryName}</span> for you. Check back soon for an exclusive selection.
      </p>
      <Link
        href="/#collections"
        className="shimmer-hover inline-flex items-center gap-2 px-8 py-3 border border-brand-gold text-brand-gold text-xs font-dmsans font-semibold uppercase tracking-widest hover:bg-brand-gold hover:text-brand-black transition-all duration-300"
      >
        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
        </svg>
        Browse Other Collections
      </Link>
    </motion.div>
  );
}

// ─── Skeleton Card ────────────────────────────────────────────────────────────
function SkeletonCard() {
  return (
    <div className="glass-card flex flex-col overflow-hidden animate-pulse">
      <div className="aspect-[4/3] w-full bg-brand-card/60" />
      <div className="p-6 space-y-3">
        <div className="h-2.5 bg-brand-divider rounded w-1/3" />
        <div className="h-5 bg-brand-divider rounded w-3/4" />
        <div className="h-3 bg-brand-divider rounded w-full" />
        <div className="h-3 bg-brand-divider rounded w-5/6" />
        <div className="h-10 bg-brand-divider rounded w-full mt-4" />
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function CategoryPage({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const categoryName = slugToName[slug] || slug.replace(/-/g, " ");

  // Find the template image from our categories data
  const categoryMeta = categories.find((c) => c.id === slug);
  const heroImage = categoryMeta?.image || "/images/monarch_executive.webp";

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await fetch(`/api/upload-chair?category=${encodeURIComponent(categoryName)}`);
        if (!res.ok) throw new Error("Failed to fetch products");
        const data = await res.json();
        setProducts(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error(err);
        setError("Could not load products. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [categoryName]);

  return (
    <>
      <Navbar />

      {/* ── Hero Banner ── */}
      <section className="relative h-[45vh] min-h-[320px] flex items-end overflow-hidden">
        {/* Background image (the same template image from homepage card) */}
        <Image
          src={heroImage}
          alt={categoryName}
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-brand-black/60 to-transparent" />
        <div className="absolute inset-0 bg-brand-black/30" />

        {/* Breadcrumb + Title */}
        <div className="relative z-10 px-6 md:px-12 pb-12 max-w-7xl w-full mx-auto">
          <nav className="flex items-center gap-2 text-[10px] font-dmsans uppercase tracking-widest text-brand-grey mb-4">
            <Link href="/" className="hover:text-brand-gold transition-colors duration-200">
              Home
            </Link>
            <span>›</span>
            <Link href="/#collections" className="hover:text-brand-gold transition-colors duration-200">
              Collections
            </Link>
            <span>›</span>
            <span className="text-brand-gold">{categoryName}</span>
          </nav>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-[10px] font-dmsans font-bold uppercase tracking-widest text-brand-gold block mb-3">
              COLLECTION
            </span>
            <h1 className="font-cormorant text-4xl sm:text-5xl lg:text-6xl text-brand-white font-bold">
              {categoryName}
            </h1>
            {!loading && (
              <p className="font-dmsans text-brand-grey text-sm mt-3">
                {products.length === 0
                  ? "No products yet"
                  : `${products.length} ${products.length === 1 ? "Product" : "Products"}`}
              </p>
            )}
          </motion.div>
        </div>
      </section>

      {/* ── Products Grid ── */}
      <section className="py-20 px-6 md:px-12 bg-brand-black min-h-[50vh]">
        <div className="max-w-7xl mx-auto">

          {/* Error state */}
          {error && (
            <div className="text-center py-16">
              <p className="text-brand-grey font-dmsans text-sm">{error}</p>
            </div>
          )}

          {/* Loading skeletons */}
          {loading && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => <SkeletonCard key={i} />)}
            </div>
          )}

          {/* Empty state */}
          {!loading && !error && products.length === 0 && (
            <EmptyState categoryName={categoryName} />
          )}

          {/* Product cards */}
          {!loading && !error && products.length > 0 && (
            <motion.div
              initial="hidden"
              animate="visible"
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.08 } },
              }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </motion.div>
          )}

          {/* Back to collections */}
          {!loading && products.length > 0 && (
            <div className="text-center mt-20">
              <Link
                href="/#collections"
                className="shimmer-hover inline-flex items-center gap-2 px-8 py-3 border border-brand-divider text-brand-grey text-xs font-dmsans font-semibold uppercase tracking-widest hover:border-brand-gold hover:text-brand-gold transition-all duration-300"
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                </svg>
                All Collections
              </Link>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </>
  );
}
