"use client";

import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import Categories from "@/components/Categories";
import FeaturedProducts from "@/components/FeaturedProducts";
import BulkOrder from "@/components/BulkOrder";
import WhyChooseUs from "@/components/WhyChooseUs";
import Testimonials from "@/components/Testimonials";
import AboutStrip from "@/components/AboutStrip";
import Footer from "@/components/Footer";
import FloatingElements from "@/components/FloatingElements";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-brand-black text-brand-white selection:bg-brand-gold selection:text-brand-black overflow-x-hidden">
      {/* Floating Elements (WhatsApp Widget + Scroll Progress indicator) */}
      <FloatingElements />

      {/* Navigation */}
      <Navbar />

      {/* Hero Section */}
      <Hero />

      {/* Trust Ticker Strip */}
      <Marquee />

      {/* Collections Grid */}
      <Categories />

      {/* Best Sellers Grid */}
      <FeaturedProducts />

      {/* Commercial Bulk Business Orders */}
      <BulkOrder />

      {/* Why Choose Us Promise list */}
      <WhyChooseUs />

      {/* Testimonials customer quotes */}
      <Testimonials />

      {/* Brand history split section */}
      <AboutStrip />

      {/* Footer */}
      <Footer />
    </div>
  );
}
