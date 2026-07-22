"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, ChevronRight } from "lucide-react";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showBanner, setShowBanner] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/#home" },
    { name: "Collections", href: "/#collections" },
    { name: "Most Loved Chairs", href: "/most-loved-chairs" },
    { name: "About", href: "/#about" },
    { name: "Contact", href: "/#contact" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-500">
      {/* Top Discount Announcement Bar */}
      {showBanner && (
        <div className="bg-gradient-to-r from-[#1C130B] via-[#2E1F12] to-[#1C130B] border-b border-brand-gold/25 text-brand-white text-[11px] font-dmsans py-2 px-4 md:px-8 transition-all duration-300 shadow-md">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
            {/* Left: Spacer to keep announcement centered on desktop */}
            <div className="hidden sm:block w-[120px]" />

            {/* Center: Discount Announcement Message */}
            <div className="flex items-center gap-2.5 mx-auto text-center">
              <span className="bg-gradient-to-r from-brand-gold to-[#E5C158] text-brand-black text-[9px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-widest shadow-[0_0_12px_rgba(201,168,76,0.6)] animate-pulse shrink-0">
                BULK SALE
              </span>
              <p className="tracking-wider text-brand-cream font-medium text-[11px] sm:text-[12px] flex items-center gap-1.5 justify-center select-none">
                <span className="text-brand-gold animate-bounce text-[9px] sm:text-[11px]">✨</span>
                <span>Enjoy</span>
                <span className="animate-text-shimmer font-black underline decoration-brand-gold/40 underline-offset-4 decoration-2" style={{ filter: "drop-shadow(0 0 4px rgba(201,168,76,0.3))" }}>
                  UP TO 50% OFF
                </span>
                <span>on Bulk Orders!</span>
                <span className="text-brand-gold animate-bounce text-[9px] sm:text-[11px]" style={{ animationDelay: "0.2s" }}>✨</span>
              </p>
            </div>

            {/* Right: CTA & Dismiss Button */}
            <div className="flex items-center justify-end gap-3.5 text-brand-cream sm:w-[120px]">
              <Link
                href="/#contact"
                className="hidden md:inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest text-brand-gold hover:text-brand-white transition-colors"
              >
                Contact Us <ChevronRight size={12} />
              </Link>
              <button
                onClick={() => setShowBanner(false)}
                className="text-brand-grey hover:text-brand-white transition-colors p-0.5"
                aria-label="Close Announcement"
              >
                <X size={14} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Navbar */}
      <nav
        className={`w-full transition-all duration-500 ${
          mobileMenuOpen
            ? "bg-[#0F0B08] py-6 shadow-2xl"
            : isScrolled
            ? "bg-[#140E0A]/95 backdrop-blur-xl py-4 shadow-[0_16px_48px_rgba(0,0,0,0.75)]"
            : "bg-[#160E09]/80 backdrop-blur-xl py-5 shadow-[0_12px_36px_rgba(0,0,0,0.55)]"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 lg:px-8 xl:px-12 flex items-center justify-between">
          {/* Left: Logo & Monogram */}
          <Link href="/" className="flex items-center gap-3 group">
            {/* Custom Chair Monogram SVG */}
            <svg
              className="w-6 h-6 text-brand-gold transition-all duration-500 group-hover:rotate-12 group-hover:drop-shadow-[0_0_8px_rgba(201,168,76,0.8)]"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M4 18v3M20 18v3M4 12h16M4 8h16M19 12v6M5 12v6M7 4h10v4H7z" />
            </svg>
            <span className="font-cormorant font-normal text-[15px] sm:text-lg tracking-[0.2em] text-brand-white hover:text-brand-gold transition-colors duration-300 underline-draw">
              THE SITTING COMPANY
            </span>
          </Link>

          {/* Center: Navigation Links */}
          <div className="hidden lg:flex items-center gap-4 xl:gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="relative text-[10px] xl:text-[11px] font-dmsans uppercase tracking-widest text-brand-white/80 hover:text-brand-white transition-colors duration-300 py-1 group whitespace-nowrap"
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-brand-gold/0 via-brand-gold to-brand-gold/0 scale-x-0 origin-left transition-transform duration-400 group-hover:scale-x-100" />
              </Link>
            ))}
          </div>

          {/* Right: Actions */}
          <div className="hidden lg:flex items-center gap-2 xl:gap-3">
            <button
              onClick={() => window.dispatchEvent(new CustomEvent("open-callback-modal"))}
              className="inline-flex items-center justify-center px-4 py-2 text-[10px] xl:text-[11px] font-dmsans uppercase tracking-wide text-brand-black bg-brand-gold hover:bg-brand-cream hover:shadow-[0_0_20px_rgba(201,168,76,0.4)] transition-all duration-300 rounded-full font-bold whitespace-nowrap"
            >
              Request Callback
            </button>
            <Link
              href="/#bulk-orders"
              className="inline-flex items-center justify-center px-4 py-2 text-[10px] xl:text-[11px] font-dmsans uppercase tracking-wide text-brand-gold border border-brand-gold/40 rounded-full hover:bg-brand-gold/10 hover:border-brand-gold/60 transition-all duration-300 bg-brand-black/30 whitespace-nowrap"
            >
              Bulk Enquiry
            </Link>
          </div>

          {/* Mobile Toggle Button */}
          <button
            className="lg:hidden text-brand-white hover:text-brand-gold transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Drawer */}
        {mobileMenuOpen && (
          <div
            className={`lg:hidden fixed ${
              showBanner
                ? isScrolled
                  ? "top-[90px]"
                  : "top-[105px]"
                : isScrolled
                ? "top-[64px]"
                : "top-[76px]"
            } left-0 right-0 bottom-0 bg-[#0F0B08] z-[100] flex flex-col justify-between p-8 animate-fade-in overflow-y-auto`}
          >
            <div className="flex flex-col gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-2xl font-cormorant text-brand-white hover:text-brand-gold transition-colors underline-draw"
                >
                  {link.name}
                </Link>
              ))}
            </div>
            <div className="flex flex-col gap-4 items-center w-full">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setTimeout(() => {
                    window.dispatchEvent(new CustomEvent("open-callback-modal"));
                  }, 100);
                }}
                className="w-full text-center py-3 text-xs font-dmsans uppercase tracking-widest text-brand-black bg-brand-gold hover:bg-brand-cream transition-all duration-300 rounded font-bold"
              >
                Request Callback
              </button>
              <Link
                href="/#bulk-orders"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center py-3 text-xs font-dmsans uppercase tracking-widest text-brand-white border border-brand-divider hover:border-brand-white transition-all duration-300 rounded"
              >
                Bulk Enquiry
              </Link>
              <span className="text-xs text-brand-grey">Mon–Sat, 9AM to 7PM IST</span>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
