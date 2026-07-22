import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import FeaturedProducts from "@/components/FeaturedProducts";
import Footer from "@/components/Footer";
import FloatingElements from "@/components/FloatingElements";

export const metadata: Metadata = {
  title: "Our Most Loved Chairs | The Sitting Company",
  description:
    "Explore our collection of premium ergonomic and luxury chairs — Boss Chairs, Office Chairs, Ergonomic Chairs, Bar Stools and more.",
};

export default function MostLovedChairsPage() {
  return (
    <div className="relative min-h-screen bg-brand-black text-brand-white selection:bg-brand-gold selection:text-brand-black overflow-x-hidden">
      <FloatingElements />
      <Navbar />
      <FeaturedProducts />
      <Footer />
    </div>
  );
}
