"use client";

import Link from "next/link";
import { Instagram, Facebook, Linkedin, Mail, MapPin, Phone } from "lucide-react";
import { categories } from "@/data/categories";

export default function Footer() {
  const quickLinks = [
    { name: "Home", href: "#home" },
    { name: "Collections", href: "#collections" },
    { name: "About", href: "#about" },
    { name: "Bulk Orders", href: "#bulk-orders" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <footer id="contact" className="bg-brand-deep border-t border-brand-gold/15 text-brand-grey pt-20 relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 pb-16">
        {/* Col 1: Brand & Socials */}
        <div className="flex flex-col items-start gap-6">
          <Link href="#home" className="flex items-center gap-3">
            <svg
              className="w-5 h-5 text-brand-gold"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path d="M4 18v3M20 18v3M4 12h16M4 8h16M19 12v6M5 12v6M7 4h10v4H7z" />
            </svg>
            <span className="font-cormorant font-normal text-base tracking-[0.2em] text-brand-cream">
              THE SITTING COMPANY
            </span>
          </Link>
          <p className="font-dmsans text-[13px] leading-relaxed text-brand-grey max-w-[240px]">
            Shaping spaces with luxury, high-end seating crafted for offices,
            homes, and events. Since 2020.
          </p>
          <div className="flex items-center gap-3 mt-2">
            <Link
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram Profile"
              className="w-8 h-8 rounded-full border border-brand-gold/30 hover:border-brand-gold flex items-center justify-center text-brand-gold transition-colors duration-300"
            >
              <Instagram size={14} />
            </Link>
            <Link
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook Page"
              className="w-8 h-8 rounded-full border border-brand-gold/30 hover:border-brand-gold flex items-center justify-center text-brand-gold transition-colors duration-300"
            >
              <Facebook size={14} />
            </Link>
            <Link
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn Profile"
              className="w-8 h-8 rounded-full border border-brand-gold/30 hover:border-brand-gold flex items-center justify-center text-brand-gold transition-colors duration-300"
            >
              <Linkedin size={14} />
            </Link>
          </div>
        </div>

        {/* Col 2: Quick Links */}
        <div className="flex flex-col gap-6">
          <h3 className="text-[12px] font-dmsans uppercase tracking-widest text-brand-gold font-bold">
            QUICK LINKS
          </h3>
          <div className="flex flex-col gap-3.5">
            {quickLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="font-dmsans text-[13px] hover:text-brand-cream transition-colors duration-300 w-fit"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>

        {/* Col 3: Collections */}
        <div className="flex flex-col gap-6">
          <h3 className="text-[12px] font-dmsans uppercase tracking-widest text-brand-gold font-bold">
            COLLECTIONS
          </h3>
          <div className="flex flex-col gap-3.5">
            {categories.map((category) => (
              <Link
                key={category.id}
                href="#collections"
                className="font-dmsans text-[13px] hover:text-brand-cream transition-colors duration-300 w-fit"
              >
                {category.name}
              </Link>
            ))}
          </div>
        </div>

        {/* Col 4: Get In Touch */}
        <div className="flex flex-col gap-6">
          <h3 className="text-[12px] font-dmsans uppercase tracking-widest text-brand-gold font-bold">
            GET IN TOUCH
          </h3>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2.5">
              <Link
                href="tel:+919868705995"
                className="flex items-center gap-3 font-dmsans text-[13px] hover:text-brand-cream transition-colors duration-300 w-fit"
              >
                <Phone size={14} className="text-brand-gold" />
                <span>+91 98687 05995</span>
              </Link>
              <Link
                href="tel:+919810964905"
                className="flex items-center gap-3 font-dmsans text-[13px] hover:text-brand-cream transition-colors duration-300 w-fit"
              >
                <Phone size={14} className="text-brand-gold" />
                <span>+91 98109 64905</span>
              </Link>
              <Link
                href="tel:+917678497341"
                className="flex items-center gap-3 font-dmsans text-[13px] hover:text-brand-cream transition-colors duration-300 w-fit"
              >
                <Phone size={14} className="text-brand-gold" />
                <span>+91 76784 97341</span>
              </Link>
            </div>
            <Link
              href="mailto:info@thesittingcompany.com"
              className="flex items-center gap-3 font-dmsans text-[13px] hover:text-brand-cream transition-colors duration-300 w-fit"
            >
              <Mail size={14} className="text-brand-gold" />
              <span>info@thesittingcompany.com</span>
            </Link>
            <div className="flex items-start gap-3 font-dmsans text-[13px] text-brand-grey">
              <MapPin size={14} className="text-brand-gold shrink-0 mt-0.5" />
              <span>New Delhi, India</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Copyright Strip */}
      <div className="bg-brand-black/80 border-t border-brand-gold/10 py-6 text-center text-xs tracking-wider">
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="font-dmsans text-[11px] text-brand-grey/80">
            © {new Date().getFullYear()} The Sitting Company. All Rights Reserved.
          </span>
          <span className="font-dmsans text-[10px] text-brand-gold/60 uppercase tracking-widest">
            Designed for Excellence
          </span>
        </div>
      </div>
    </footer>
  );
}
