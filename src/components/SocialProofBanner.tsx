"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Star } from "lucide-react";

export default function SocialProofBanner() {
  const platforms = [
    {
      name: "Amazon",
      reviews: "19000+ Reviews",
      rating: "4.9",
      iconType: "amazon",
      badgeColor: "bg-white border-gray-200 text-black",
      link: "https://www.amazon.in",
    },
    {
      name: "Flipkart",
      reviews: "11500+ Reviews",
      rating: "4.8",
      iconType: "flipkart",
      badgeColor: "bg-[#2874F0] text-white",
      link: "https://www.flipkart.com",
    },
    {
      name: "Google",
      reviews: "100+ Reviews",
      rating: "5.0",
      iconType: "google",
      badgeColor: "bg-white border-gray-200 text-black",
      link: "https://www.google.com",
    },
  ];

  return (
    <section className="w-full py-8 md:py-12 bg-white text-black border-y border-gray-200 shadow-sm relative overflow-hidden">
      {/* Decorative subtle background gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-amber-50/40 via-white to-amber-50/40 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="flex flex-col items-center justify-center text-center">
          {/* Main Title */}
          <motion.h2 
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="font-dmsans text-xs sm:text-sm md:text-base font-extrabold uppercase tracking-[0.18em] text-gray-900 mb-6 md:mb-8"
          >
            INDIA&apos;S LEADING ERGONOMIC FURNITURE BRAND
          </motion.h2>

          {/* Review Platform Cards */}
          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 md:gap-16 w-full max-w-4xl">
            {platforms.map((platform, idx) => (
              <motion.a
                key={platform.name}
                href={platform.link}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                whileHover={{ scale: 1.04 }}
                className="flex items-center gap-3 md:gap-4 group cursor-pointer py-2 px-3 sm:px-4 rounded-xl transition-all duration-300 hover:bg-gray-50/80"
              >
                {/* Platform Icon Container */}
                <div className="relative w-10 h-10 sm:w-12 sm:h-12 flex-shrink-0 flex items-center justify-center rounded-full shadow-sm border border-gray-100 bg-white overflow-hidden group-hover:shadow-md transition-shadow">
                  {platform.iconType === "amazon" && (
                    <div className="relative w-7 h-7 flex items-center justify-center">
                      <Image
                        src="/images/amazon_logo_black.png"
                        alt="Amazon Reviews"
                        width={28}
                        height={28}
                        className="object-contain"
                      />
                    </div>
                  )}

                  {platform.iconType === "flipkart" && (
                    <div className="relative w-8 h-8 flex items-center justify-center bg-[#2874F0] rounded-full">
                      <svg className="w-5 h-5" viewBox="0 0 40 40">
                        <rect width="40" height="40" rx="10" fill="#2874F0" />
                        <path d="M10 10h20v20H10z" fill="#FFE11B" />
                        <path d="M17 14h10v4h-6v4h5v4h-5v8h-4V14z" fill="#2874F0" />
                      </svg>
                    </div>
                  )}

                  {platform.iconType === "google" && (
                    <svg className="w-6 h-6 sm:w-7 sm:h-7" viewBox="0 0 24 24">
                      <path
                        fill="#4285F4"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                      <path
                        fill="#34A853"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      />
                      <path
                        fill="#FBBC05"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                      />
                      <path
                        fill="#EA4335"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                      />
                    </svg>
                  )}
                </div>

                {/* Review Info */}
                <div className="flex flex-col text-left">
                  <div className="flex items-center gap-1.5">
                    <span className="font-dmsans text-sm sm:text-base font-bold text-gray-900 tracking-tight group-hover:text-black">
                      {platform.reviews}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="flex text-amber-500">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={11} className="fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <span className="text-[10px] font-dmsans font-semibold text-gray-500 ml-1">
                      {platform.rating} Rating
                    </span>
                  </div>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
