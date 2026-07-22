"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Phone, Calendar, User, Clock, CheckCircle } from "lucide-react";

export default function CallbackModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [timeSlot, setTimeSlot] = useState("Immediate (within 15 mins)");
  const [category, setCategory] = useState("Office Chairs");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const handleOpen = () => {
      setIsOpen(true);
      setSuccess(false);
      setError("");
    };

    window.addEventListener("open-callback-modal", handleOpen);
    return () => {
      window.removeEventListener("open-callback-modal", handleOpen);
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!name.trim()) {
      setError("Please enter your name.");
      return;
    }
    if (!phone.trim() || phone.length < 10) {
      setError("Please enter a valid 10-digit phone number.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/callback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          phone,
          timeSlot,
          category,
        }),
      });

      if (res.ok) {
        setSuccess(true);
        setName("");
        setPhone("");
        // Close after a brief delay
        setTimeout(() => {
          setIsOpen(false);
        }, 3000);
      } else {
        const data = await res.json();
        setError(data.error || "Something went wrong. Please try again.");
      }
    } catch {
      setError("Network error. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="absolute inset-0 bg-brand-black/85 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="relative w-full max-w-md bg-[#160E09] border border-brand-gold/30 rounded-xl shadow-[0_24px_64px_rgba(0,0,0,0.9)] overflow-hidden z-10"
          >
            {/* Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 text-brand-grey hover:text-brand-white transition-colors p-1 rounded-full hover:bg-brand-white/5"
              aria-label="Close modal"
            >
              <X size={18} />
            </button>

            {/* Content */}
            <div className="p-6 sm:p-8">
              {!success ? (
                <>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-full bg-brand-gold/10 border border-brand-gold/20 flex items-center justify-center text-brand-gold">
                      <Phone size={18} className="animate-pulse" />
                    </div>
                    <div>
                      <h3 className="font-cormorant text-2xl text-brand-cream font-semibold">
                        Arrange a Callback
                      </h3>
                      <p className="font-dmsans text-[11px] text-brand-grey/80 tracking-wider uppercase mt-0.5">
                        Our seating experts will call you back
                      </p>
                    </div>
                  </div>

                  <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    {/* Name Input */}
                    <div className="flex flex-col gap-1.5">
                      <label className="font-dmsans text-[10px] uppercase tracking-widest text-brand-gold/80 font-bold">
                        Full Name
                      </label>
                      <div className="relative">
                        <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-brand-grey">
                          <User size={14} />
                        </span>
                        <input
                          type="text"
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="John Doe"
                          className="w-full bg-brand-black/40 border border-brand-divider focus:border-brand-gold/60 focus:outline-none rounded-lg py-2.5 pl-10 pr-4 text-sm text-brand-cream placeholder:text-brand-grey/40 transition-colors"
                        />
                      </div>
                    </div>

                    {/* Phone Input */}
                    <div className="flex flex-col gap-1.5">
                      <label className="font-dmsans text-[10px] uppercase tracking-widest text-brand-gold/80 font-bold">
                        Phone Number
                      </label>
                      <div className="relative">
                        <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-brand-grey">
                          <Phone size={14} />
                        </span>
                        <input
                          type="tel"
                          required
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="98765 43210"
                          className="w-full bg-brand-black/40 border border-brand-divider focus:border-brand-gold/60 focus:outline-none rounded-lg py-2.5 pl-10 pr-4 text-sm text-brand-cream placeholder:text-brand-grey/40 transition-colors"
                        />
                      </div>
                    </div>

                    {/* Time Slot Select */}
                    <div className="flex flex-col gap-1.5">
                      <label className="font-dmsans text-[10px] uppercase tracking-widest text-brand-gold/80 font-bold">
                        Convenient Time
                      </label>
                      <div className="relative">
                        <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-brand-grey">
                          <Clock size={14} />
                        </span>
                        <select
                          value={timeSlot}
                          onChange={(e) => setTimeSlot(e.target.value)}
                          className="w-full bg-brand-black/40 border border-brand-divider focus:border-brand-gold/60 focus:outline-none rounded-lg py-2.5 pl-10 pr-4 text-sm text-brand-cream appearance-none transition-colors cursor-pointer"
                        >
                          <option value="Immediate (within 15 mins)" className="bg-[#160E09] text-brand-cream">Immediate (within 15 mins)</option>
                          <option value="Morning (10 AM - 1 PM)" className="bg-[#160E09] text-brand-cream">Morning (10 AM - 1 PM)</option>
                          <option value="Afternoon (1 PM - 5 PM)" className="bg-[#160E09] text-brand-cream">Afternoon (1 PM - 5 PM)</option>
                          <option value="Evening (5 PM - 8 PM)" className="bg-[#160E09] text-brand-cream">Evening (5 PM - 8 PM)</option>
                        </select>
                      </div>
                    </div>

                    {/* Category Select */}
                    <div className="flex flex-col gap-1.5">
                      <label className="font-dmsans text-[10px] uppercase tracking-widest text-brand-gold/80 font-bold">
                        Interested Collection
                      </label>
                      <div className="relative">
                        <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-brand-grey">
                          <Calendar size={14} />
                        </span>
                        <select
                          value={category}
                          onChange={(e) => setCategory(e.target.value)}
                          className="w-full bg-brand-black/40 border border-brand-divider focus:border-brand-gold/60 focus:outline-none rounded-lg py-2.5 pl-10 pr-4 text-sm text-brand-cream appearance-none transition-colors cursor-pointer"
                        >
                          <option value="Office Chairs" className="bg-[#160E09] text-brand-cream">Office Chairs</option>
                          <option value="Ergonomic Chairs" className="bg-[#160E09] text-brand-cream">Ergonomic Chairs</option>
                          <option value="Boss Chairs" className="bg-[#160E09] text-brand-cream">Boss Chairs</option>
                          <option value="Visitor & Conference" className="bg-[#160E09] text-brand-cream">Visitor & Conference Chairs</option>
                          <option value="Folding Chairs" className="bg-[#160E09] text-brand-cream">Folding Chairs</option>
                          <option value="Bar Stools" className="bg-[#160E09] text-brand-cream">Bar Stools</option>
                          <option value="Gaming Chairs" className="bg-[#160E09] text-brand-cream">Gaming Chairs</option>
                          <option value="Custom/Bulk Seating" className="bg-[#160E09] text-brand-cream">Custom/Bulk Seating</option>
                        </select>
                      </div>
                    </div>

                    {/* Error display */}
                    {error && (
                      <p className="text-red-400 font-dmsans text-xs mt-1">
                        {error}
                      </p>
                    )}

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full inline-flex items-center justify-center px-6 py-3 mt-3 text-xs font-dmsans uppercase tracking-widest text-brand-black bg-brand-gold hover:bg-brand-cream rounded-lg transition-colors font-bold disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_4px_20px_rgba(201,168,76,0.25)]"
                    >
                      {loading ? "Scheduling..." : "Request Callback"}
                    </button>
                  </form>
                </>
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-col items-center justify-center text-center py-8"
                >
                  <CheckCircle size={48} className="text-brand-gold mb-4" />
                  <h3 className="font-cormorant text-2xl text-brand-cream font-semibold mb-2">
                    Callback Scheduled!
                  </h3>
                  <p className="font-dmsans text-sm text-brand-grey leading-relaxed max-w-[280px]">
                    Thank you, {name || "there"}! We have received your request and will call you back shortly.
                  </p>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
