"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function BulkOrder() {
  const benefits = [
    "Minimum Order: 10+ Chairs",
    "Custom Requirements Accepted",
    "PAN India Delivery Available",
    "Dedicated Account Support",
  ];

  return (
    <section
      id="bulk-orders"
      className="py-24 px-6 md:px-12 bg-brand-gold text-brand-black relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-12 lg:gap-16 items-center">
        {/* Left Side: Business Info */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-start"
        >
          <span className="text-[11px] font-dmsans uppercase tracking-widest text-brand-black/70 mb-4 font-bold">
            COMMERCIAL & CONTRACT
          </span>
          <h2 className="font-cormorant text-5xl sm:text-6xl font-light leading-[1.05] mb-6">
            CHAIRS FOR <br />
            <span className="font-bold">YOUR BUSINESS</span>
          </h2>
          <p className="font-dmsans text-[15px] sm:text-[16px] text-brand-black/85 leading-relaxed max-w-xl mb-8">
            Hotels, offices, institutes & event companies — we supply premium
            chairs in bulk across India with bespoke customization options and
            wholesale contract pricing.
          </p>

          {/* Benefits Bullet Points */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-center gap-3">
                {/* Custom Checkmark SVG */}
                <svg
                  className="w-5 h-5 text-brand-black shrink-0"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="font-dmsans text-[14px] font-semibold text-brand-black/90">
                  {benefit}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Right Side: Call & WhatsApp Actions + B2B Enquiry Form */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="bg-brand-black text-brand-white p-8 md:p-10 border border-brand-divider rounded-sm shadow-xl flex flex-col justify-between relative"
        >
          <EnquiryForm />
        </motion.div>
      </div>
    </section>
  );
}

// Sub-component for clean B2B form implementation
function EnquiryForm() {
  const [formSubmitted, setFormSubmitted] = React.useState(false);
  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    phone: "",
    quantity: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
      setFormData({ name: "", email: "", phone: "", quantity: "", message: "" });
    }, 4000);
  };

  if (formSubmitted) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <svg
          className="w-12 h-12 text-brand-gold mb-6 animate-bounce"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <h3 className="font-cormorant text-2xl text-brand-cream mb-2">
          Enquiry Received
        </h3>
        <p className="font-dmsans text-xs text-brand-grey max-w-xs leading-relaxed">
          Thank you for reaching out. Our corporate account manager will contact you within 2 business hours.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full">
      <span className="text-[10px] font-dmsans uppercase tracking-widest text-brand-gold font-bold mb-4">
        REQUEST A BULK QUOTE
      </span>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4 mb-6">
        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Your Name *"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="bg-transparent border-b border-brand-divider text-brand-white focus:border-brand-gold focus:outline-none py-1.5 text-xs font-dmsans w-full"
          />
          <input
            type="email"
            placeholder="Corporate Email *"
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="bg-transparent border-b border-brand-divider text-brand-white focus:border-brand-gold focus:outline-none py-1.5 text-xs font-dmsans w-full"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <input
            type="tel"
            placeholder="Phone / WhatsApp *"
            required
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className="bg-transparent border-b border-brand-divider text-brand-white focus:border-brand-gold focus:outline-none py-1.5 text-xs font-dmsans w-full"
          />
          <input
            type="number"
            placeholder="Est. Quantity *"
            required
            min="10"
            value={formData.quantity}
            onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
            className="bg-transparent border-b border-brand-divider text-brand-white focus:border-brand-gold focus:outline-none py-1.5 text-xs font-dmsans w-full"
          />
        </div>

        <textarea
          placeholder="Special Requirements (Dimensions, custom branding, colors)"
          rows={2}
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          className="bg-transparent border-b border-brand-divider text-brand-white focus:border-brand-gold focus:outline-none py-1.5 text-xs font-dmsans w-full resize-none"
        />

        <button
          type="submit"
          className="w-full py-3 bg-brand-cream text-brand-black font-dmsans uppercase tracking-widest text-[11px] font-bold hover:bg-brand-gold transition-all duration-300 rounded-sm mt-2"
        >
          SUBMIT ENQUIRY →
        </button>
      </form>

      {/* Direct Contact Alternatives */}
      <div className="pt-4 border-t border-brand-divider flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex flex-col items-center sm:items-start">
          <span className="text-[9px] font-dmsans text-brand-grey uppercase tracking-wider">
            OR CALL US DIRECTLY
          </span>
          <Link
            href="tel:+919876543210"
            className="font-cormorant text-base font-semibold text-brand-cream hover:text-brand-gold transition-colors duration-300"
          >
            +91 98765 43210
          </Link>
        </div>

        <Link
          href="https://wa.me/919876543210?text=Hello%2C%20I%20am%20interested%20in%20making%20a%20bulk%20enquiry%20with%20The%20Sitting%20Company."
          target="_blank"
          rel="noopener noreferrer"
          className="py-2 px-4 bg-[#25D366] text-white font-dmsans uppercase tracking-widest text-[10px] font-bold hover:bg-[#1ebd59] transition-all duration-300 flex items-center gap-2 rounded-sm shadow"
        >
          <svg className="w-3.5 h-3.5 fill-white" viewBox="0 0 24 24">
            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.457L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.725 1.45 5.276 0 9.561-4.288 9.564-9.567.002-2.556-.994-4.959-2.805-6.772C16.32 2.453 13.922 1.458 11.16 1.458c-5.276 0-9.562 4.29-9.564 9.569-.001 1.636.486 3.235 1.411 4.67l-.955 3.486 3.595-.943zm11.12-6.52c-.225-.113-1.332-.656-1.54-.73-.206-.075-.356-.112-.506.113-.15.226-.582.73-.713.882-.13.15-.262.17-.487.056-.225-.113-.95-.35-1.81-1.118-.67-.597-1.121-1.335-1.253-1.56-.13-.226-.014-.348.099-.461.101-.102.225-.263.338-.395.112-.132.15-.226.225-.376.075-.15.037-.282-.019-.395-.056-.113-.506-1.22-.693-1.67-.182-.44-.367-.38-.506-.387-.13-.007-.28-.007-.43-.007-.15 0-.394.056-.6.282-.206.225-.788.77-7.88 1.88 0 1.11 1.33 3.636 1.517 3.886.188.25 2.62 4.004 6.347 5.61 2.215.955 3.946 1.524 5.295 1.954.912.29 1.745.249 2.4.152.73-.109 2.253-.922 2.572-1.815.318-.892.318-1.657.225-1.814-.094-.157-.244-.247-.47-.36z" />
          </svg>
          WHATSAPP
        </Link>
      </div>
    </div>
  );
}
