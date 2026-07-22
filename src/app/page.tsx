"use client";

import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import SocialProofBanner from "@/components/SocialProofBanner";
import Categories from "@/components/Categories";

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

      {/* Social Proof & Ratings Banner */}
      <SocialProofBanner />

      {/* Collections Grid */}
      <Categories />

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
