"use client";

import React from "react";

export default function Marquee() {
  const items = [
    "10,000+ Chairs Sold",
    "PAN India Delivery",
    "Bulk Orders Welcome",
    "Premium Quality Assured",
    "Trusted by 500+ Businesses",
    "Same Day Dispatch Available",
  ];

  // Repeat the items to make sure it scrolls seamlessly
  const doubledItems = [...items, ...items, ...items, ...items];

  return (
    <div className="relative w-full overflow-hidden bg-brand-card py-4 border-t border-b border-brand-gold/25 z-10">
      <div className="flex items-center whitespace-nowrap animate-marquee">
        {doubledItems.map((item, idx) => (
          <span
            key={idx}
            className="flex items-center font-dmsans text-[11px] md:text-xs font-semibold tracking-widest text-brand-gold uppercase mx-6 md:mx-12"
          >
            <span className="text-[10px] mr-4 md:mr-8 text-brand-gold/60">✦</span>
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
