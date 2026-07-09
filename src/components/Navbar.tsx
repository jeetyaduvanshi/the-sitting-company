"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/#home" },
    { name: "Collections", href: "/#collections" },
    { name: "About", href: "/#about" },
    { name: "Bulk Orders", href: "/#bulk-orders" },
    { name: "Contact", href: "/#contact" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b border-brand-gold/10 ${
        isScrolled
          ? "bg-brand-black/90 backdrop-blur-md py-4"
          : "bg-brand-black/60 backdrop-blur-sm py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Left: Logo & Monogram */}
        <Link href="#home" className="flex items-center gap-3 group">
          {/* Custom Chair Monogram SVG */}
          <svg
            className="w-6 h-6 text-brand-gold transition-transform duration-500 group-hover:rotate-12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M4 18v3M20 18v3M4 12h16M4 8h16M19 12v6M5 12v6M7 4h10v4H7z" />
          </svg>
          <span className="font-cormorant font-normal text-[15px] sm:text-lg tracking-[0.2em] text-brand-cream hover:text-brand-gold transition-colors duration-300">
            THE SITTING COMPANY
          </span>
        </Link>

        {/* Center: Navigation Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="relative text-[11px] font-dmsans uppercase tracking-widest text-brand-grey hover:text-brand-cream transition-colors duration-300 py-1 group"
            >
              {link.name}
              <span className="absolute bottom-0 left-0 w-full h-[1px] bg-brand-cream scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100" />
            </Link>
          ))}
        </div>

        {/* Right: Bulk Enquiry Button */}
        <div className="hidden md:block">
          <Link
            href="/#bulk-orders"
            className="inline-flex items-center justify-center px-5 py-2 text-[11px] font-dmsans uppercase tracking-wide text-brand-gold border border-brand-gold rounded-full hover:bg-brand-gold hover:text-brand-black transition-all duration-300"
          >
            Bulk Enquiry
          </Link>
        </div>

        {/* Mobile Toggle Button */}
        <button
          className="md:hidden text-brand-cream hover:text-brand-gold transition-colors"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle Menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed top-[69px] left-0 right-0 bottom-0 bg-brand-black border-t border-brand-divider z-40 flex flex-col justify-between p-8 animate-fade-in">
          <div className="flex flex-col gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-2xl font-cormorant text-brand-cream hover:text-brand-gold transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </div>
          <div className="flex flex-col gap-6 items-center">
            <Link
              href="/#bulk-orders"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center py-3 text-xs font-dmsans uppercase tracking-widest text-brand-black bg-brand-cream hover:bg-brand-gold hover:text-brand-black transition-all duration-300 rounded"
            >
              Bulk Enquiry
            </Link>
            <span className="text-xs text-brand-grey">Mon–Sat, 9AM to 7PM IST</span>
          </div>
        </div>
      )}
    </nav>
  );
}
