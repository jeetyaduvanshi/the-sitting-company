"use client";

import { useState, useRef, useCallback, useEffect, DragEvent, ChangeEvent } from "react";
import Link from "next/link";

type FormState = "idle" | "loading" | "success" | "error";
type Tab = "upload" | "manage";

interface Product {
  id: string;
  name: string;
  category: string;
  description: string;
  price: string;
  image: string;
  amazonLink: string;
  flipkartLink: string;
  tag?: string;
  createdAt?: string;
}

// ─── Category data matching user spec ───────────────────────────────────────
const CATEGORIES = [
  { id: "office-chairs",       name: "Office Chairs",                  emoji: "🪑" },
  { id: "visitor-conference",  name: "Visitor & Conference Chairs",    emoji: "👥" },
  { id: "folding-chairs",      name: "Folding Chairs",                 emoji: "📐" },
  { id: "boss-chairs",         name: "Boss Chairs",                    emoji: "👑" },
  { id: "ergonomic-chairs",    name: "Ergonomic Chairs",               emoji: "⚙️" },
  { id: "bar-stools",          name: "Bar Stools",                     emoji: "🍹" },
  { id: "gaming-chairs",       name: "Gaming Chairs",                  emoji: "🎮" },
];

const TAGS = [
  { label: "No Tag",          value: "" },
  { label: "Signature",       value: "SIGNATURE" },
  { label: "Bestseller",      value: "BESTSELLER" },
  { label: "Limited Edition", value: "LIMITED EDITION" },
  { label: "New Arrival",     value: "NEW ARRIVAL" },
  { label: "Exclusive",       value: "EXCLUSIVE" },
];

// ─── Icons ───────────────────────────────────────────────────────────────────
const UploadIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
  </svg>
);

const SpinIcon = () => (
  <svg className="w-4 h-4 animate-spin" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
  </svg>
);

// ─────────────────────────────────────────────────────────────────────────────
// EDIT MODAL
// ─────────────────────────────────────────────────────────────────────────────
interface EditModalProps {
  product: Product;
  onClose: () => void;
  onSave: (updated: Product) => void;
}

function EditModal({ product, onClose, onSave }: EditModalProps) {
  const [name,         setName]         = useState(product.name);
  const [category,     setCategory]     = useState(product.category);
  const [description,  setDescription]  = useState(product.description || "");
  const [price,        setPrice]        = useState(product.price || "");
  const [amazonLink,   setAmazonLink]   = useState(product.amazonLink === "#" ? "" : (product.amazonLink || ""));
  const [flipkartLink, setFlipkartLink] = useState(product.flipkartLink === "#" ? "" : (product.flipkartLink || ""));
  const [tag,          setTag]          = useState(product.tag || "");
  const [saving,       setSaving]       = useState(false);
  const [errorMsg,     setErrorMsg]     = useState("");
  const [saved,        setSaved]        = useState(false);

  const handleSave = async () => {
    if (!name.trim()) { setErrorMsg("Chair name cannot be empty."); return; }
    if (!category)    { setErrorMsg("Please select a category."); return; }
    setErrorMsg("");
    setSaving(true);
    try {
      const res = await fetch("/api/upload-chair", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: product.id,
          name: name.trim(),
          category,
          description: description.trim(),
          price: price.trim(),
          amazonLink: amazonLink.trim() || "#",
          flipkartLink: flipkartLink.trim() || "#",
          tag,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Update failed");
      setSaved(true);
      onSave({ ...product, ...data.product, name: name.trim(), category, description: description.trim(), price: price.trim(), amazonLink: amazonLink.trim() || "#", flipkartLink: flipkartLink.trim() || "#", tag });
      setTimeout(() => onClose(), 800);
    } catch (err: unknown) {
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40 bg-[#0F0B08]/80 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Slide-in panel */}
      <div className="fixed top-0 right-0 bottom-0 z-50 w-full max-w-lg bg-[#140E07] border-l border-[#C9A84C]/20 flex flex-col shadow-2xl overflow-y-auto">

        {/* Panel header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-[#2A1F14] flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 overflow-hidden border border-[#2A1F14] flex-shrink-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
            </div>
            <div>
              <p className="text-[9px] font-sans uppercase tracking-widest text-[#C9A84C] mb-0.5">Editing Chair</p>
              <p className="font-serif text-base text-[#F0E6D3] leading-tight truncate max-w-[220px]">{product.name}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center text-[#9A8F84] hover:text-[#F0E6D3] border border-[#2A1F14] hover:border-[#9A8F84] transition-all duration-200"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Notice */}
        <div className="mx-6 mt-5 px-4 py-3 bg-[#C9A84C]/5 border border-[#C9A84C]/20 flex items-start gap-3 flex-shrink-0">
          <svg className="w-4 h-4 text-[#C9A84C] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
          </svg>
          <p className="font-sans text-[10px] text-[#9A8F84] leading-relaxed">
            Image is already uploaded. You can fill in or update any details below and save when ready.
          </p>
        </div>

        {/* Form fields */}
        <div className="flex-1 px-6 py-5 space-y-5">

          {/* Name */}
          <div>
            <label className="block text-[10px] font-sans uppercase tracking-widest text-[#C9A84C] font-semibold mb-2">
              Chair Name <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. The Royal Visitor Pro"
              className="w-full bg-[#1A1209] border border-[#2A1F14] focus:border-[#C9A84C]/60 text-[#F0E6D3] placeholder-[#9A8F84]/40 font-sans text-sm px-4 py-3 outline-none transition-colors duration-300"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-[10px] font-sans uppercase tracking-widest text-[#C9A84C] font-semibold mb-2">
              Category <span className="text-red-400">*</span>
            </label>
            <div className="grid grid-cols-2 gap-2">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setCategory(cat.name)}
                  className={`flex items-center gap-2 px-3 py-2.5 border text-left text-[10px] font-sans transition-all duration-200 ${
                    category === cat.name
                      ? "border-[#C9A84C] bg-[#C9A84C]/10 text-[#C9A84C]"
                      : "border-[#2A1F14] text-[#9A8F84] hover:border-[#C9A84C]/30 hover:text-[#F0E6D3]"
                  }`}
                >
                  <span>{cat.emoji}</span>
                  <span className="uppercase tracking-widest leading-tight">{cat.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-[10px] font-sans uppercase tracking-widest text-[#C9A84C] font-semibold mb-2">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              placeholder="Describe material, features, comfort level..."
              className="w-full bg-[#1A1209] border border-[#2A1F14] focus:border-[#C9A84C]/60 text-[#F0E6D3] placeholder-[#9A8F84]/40 font-sans text-sm px-4 py-3 outline-none transition-colors duration-300 resize-none leading-relaxed"
            />
          </div>

          {/* Price */}
          <div>
            <label className="block text-[10px] font-sans uppercase tracking-widest text-[#C9A84C] font-semibold mb-2">
              Price
            </label>
            <input
              type="text"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="e.g. ₹12,500"
              className="w-full bg-[#1A1209] border border-[#2A1F14] focus:border-[#C9A84C]/60 text-[#F0E6D3] placeholder-[#9A8F84]/40 font-sans text-sm px-4 py-3 outline-none transition-colors duration-300"
            />
          </div>

          {/* Amazon Link */}
          <div>
            <label className="block text-[10px] font-sans uppercase tracking-widest text-[#C9A84C] font-semibold mb-2">
              Amazon Link <span className="text-[#9A8F84] font-normal">(optional)</span>
            </label>
            <input
              type="url"
              value={amazonLink}
              onChange={(e) => setAmazonLink(e.target.value)}
              placeholder="https://www.amazon.in/..."
              className="w-full bg-[#1A1209] border border-[#2A1F14] focus:border-[#C9A84C]/60 text-[#F0E6D3] placeholder-[#9A8F84]/40 font-sans text-xs px-4 py-3 outline-none transition-colors duration-300"
            />
          </div>

          {/* Flipkart Link */}
          <div>
            <label className="block text-[10px] font-sans uppercase tracking-widest text-[#C9A84C] font-semibold mb-2">
              Flipkart Link <span className="text-[#9A8F84] font-normal">(optional)</span>
            </label>
            <input
              type="url"
              value={flipkartLink}
              onChange={(e) => setFlipkartLink(e.target.value)}
              placeholder="https://www.flipkart.com/..."
              className="w-full bg-[#1A1209] border border-[#2A1F14] focus:border-[#C9A84C]/60 text-[#F0E6D3] placeholder-[#9A8F84]/40 font-sans text-xs px-4 py-3 outline-none transition-colors duration-300"
            />
          </div>

          {/* Badge / Tag */}
          <div>
            <label className="block text-[10px] font-sans uppercase tracking-widest text-[#C9A84C] font-semibold mb-2">
              Badge <span className="text-[#9A8F84] font-normal">(optional)</span>
            </label>
            <div className="flex flex-wrap gap-2">
              {TAGS.map((t) => (
                <button
                  key={t.value || "none"}
                  type="button"
                  onClick={() => setTag(t.value)}
                  className={`px-3 py-2 text-[9px] font-sans uppercase tracking-widest border transition-all duration-200 ${
                    tag === t.value
                      ? "border-[#C9A84C] bg-[#C9A84C]/10 text-[#C9A84C]"
                      : "border-[#2A1F14] text-[#9A8F84] hover:border-[#C9A84C]/30 hover:text-[#F0E6D3]"
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          {/* Error */}
          {errorMsg && (
            <div className="flex items-start gap-3 px-4 py-3 bg-red-500/5 border border-red-500/20">
              <svg className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
              </svg>
              <p className="font-sans text-xs text-red-400">{errorMsg}</p>
            </div>
          )}
        </div>

        {/* Sticky footer */}
        <div className="flex-shrink-0 px-6 py-5 border-t border-[#2A1F14] flex gap-3">
          <button
            onClick={handleSave}
            disabled={saving || saved}
            className={`flex-1 py-3.5 text-[11px] font-sans uppercase tracking-widest font-bold transition-all duration-300 flex items-center justify-center gap-2 ${
              saved
                ? "bg-green-500/20 border border-green-500/40 text-green-400"
                : "bg-[#C9A84C] hover:bg-[#F0E6D3] text-[#0F0B08] disabled:opacity-60 disabled:cursor-not-allowed"
            }`}
          >
            {saving ? (
              <><SpinIcon /> Saving...</>
            ) : saved ? (
              <>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
                Saved!
              </>
            ) : (
              <>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 3a2.828 2.828 0 114 4L7.5 20.5 2 22l1.5-5.5L17 3z" />
                </svg>
                Save Changes
              </>
            )}
          </button>
          <button
            onClick={onClose}
            disabled={saving}
            className="px-5 py-3.5 text-[11px] font-sans uppercase tracking-widest text-[#9A8F84] border border-[#2A1F14] hover:border-[#9A8F84] hover:text-[#F0E6D3] transition-all duration-200"
          >
            Cancel
          </button>
        </div>
      </div>
    </>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// MANAGE TAB
// ─────────────────────────────────────────────────────────────────────────────
function ManageTab() {
  const [products,   setProducts]   = useState<Product[]>([]);
  const [loading,    setLoading]    = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [confirmId,  setConfirmId]  = useState<string | null>(null);
  const [editProduct,setEditProduct]= useState<Product | null>(null);
  const [error,      setError]      = useState("");

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res  = await fetch("/api/upload-chair");
      const data = await res.json();
      setProducts(Array.isArray(data) ? data : []);
    } catch {
      setError("Failed to load products.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchProducts(); }, []);

  const handleDelete = async (id: string) => {
    setDeletingId(id);
    setError("");
    try {
      const res = await fetch("/api/upload-chair", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      if (!res.ok) throw new Error("Delete failed");
      setProducts((prev) => prev.filter((p) => p.id !== id));
      setConfirmId(null);
    } catch {
      setError("Failed to delete. Please try again.");
    } finally {
      setDeletingId(null);
    }
  };

  const handleSaved = (updated: Product) => {
    setProducts((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-32">
        <div className="flex flex-col items-center gap-4">
          <SpinIcon />
          <p className="font-sans text-xs text-[#9A8F84] uppercase tracking-widest">Loading catalogue...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Edit modal */}
      {editProduct && (
        <EditModal
          product={editProduct}
          onClose={() => setEditProduct(null)}
          onSave={(updated) => { handleSaved(updated); }}
        />
      )}

      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="font-serif text-2xl text-[#F0E6D3]">Current Catalogue</h2>
            <p className="font-sans text-xs text-[#9A8F84] mt-1">
              {products.length} chair{products.length !== 1 ? "s" : ""} total
            </p>
          </div>
          <button
            onClick={fetchProducts}
            className="flex items-center gap-2 text-[10px] font-sans uppercase tracking-widest text-[#9A8F84] hover:text-[#C9A84C] border border-[#2A1F14] hover:border-[#C9A84C]/30 px-3 py-2 transition-all duration-200"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
            </svg>
            Refresh
          </button>
        </div>

        {error && (
          <div className="mb-6 px-4 py-3 bg-red-500/5 border border-red-500/20 text-red-400 font-sans text-xs">
            {error}
          </div>
        )}

        {products.length === 0 ? (
          <div className="text-center py-24 border border-dashed border-[#2A1F14]">
            <p className="font-serif text-2xl text-[#9A8F84] italic mb-2">No chairs added yet.</p>
            <p className="font-sans text-xs text-[#9A8F84]/50">Switch to the Upload tab to add your first chair.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {products.map((product) => {
              const isConfirming = confirmId === product.id;
              const isDeleting   = deletingId === product.id;

              return (
                <div
                  key={product.id}
                  className={`flex items-center gap-4 p-4 border transition-all duration-300 ${
                    isConfirming
                      ? "border-red-500/40 bg-red-500/5"
                      : "border-[#2A1F14] bg-[#1A1209] hover:border-[#C9A84C]/20"
                  }`}
                >
                  {/* Thumbnail */}
                  <div className="w-16 h-16 flex-shrink-0 overflow-hidden bg-[#0F0B08] border border-[#2A1F14]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src =
                          "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='64' height='64' viewBox='0 0 24 24' fill='none' stroke='%232A1F14' stroke-width='1.5'%3E%3Cpath d='M4 18v3M20 18v3M4 12h16M4 8h16M19 12v6M5 12v6M7 4h10v4H7z'/%3E%3C/svg%3E";
                      }}
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <p className="font-serif text-base text-[#F0E6D3] truncate">{product.name}</p>
                      {product.tag && (
                        <span className="flex-shrink-0 text-[8px] font-sans uppercase tracking-widest border border-[#C9A84C]/30 text-[#C9A84C] px-1.5 py-0.5">
                          {product.tag}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="font-sans text-xs text-[#9A8F84]">{product.category}</span>
                      {product.amazonLink && product.amazonLink !== "#" && (
                        <>
                          <span className="w-1 h-1 rounded-full bg-[#2A1F14]" />
                          <span className="font-sans text-[10px] text-green-500/70">Amazon ✓</span>
                        </>
                      )}
                      {product.flipkartLink && product.flipkartLink !== "#" && (
                        <>
                          <span className="w-1 h-1 rounded-full bg-[#2A1F14]" />
                          <span className="font-sans text-[10px] text-sky-500/70">Flipkart ✓</span>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Action controls */}
                  <div className="flex items-center gap-2 flex-shrink-0">
                    {isConfirming ? (
                      <>
                        <span className="font-sans text-xs text-red-400 hidden sm:block">Remove this chair?</span>
                        <button
                          onClick={() => handleDelete(product.id)}
                          disabled={isDeleting}
                          className="px-4 py-2 text-[10px] font-sans uppercase tracking-widest bg-red-500 hover:bg-red-400 text-white transition-colors duration-200 disabled:opacity-60 flex items-center gap-1.5"
                        >
                          {isDeleting ? <SpinIcon /> : null}
                          {isDeleting ? "Removing..." : "Yes, Remove"}
                        </button>
                        <button
                          onClick={() => setConfirmId(null)}
                          disabled={isDeleting}
                          className="px-4 py-2 text-[10px] font-sans uppercase tracking-widest border border-[#2A1F14] text-[#9A8F84] hover:text-[#F0E6D3] hover:border-[#9A8F84] transition-all duration-200"
                        >
                          Cancel
                        </button>
                      </>
                    ) : (
                      <>
                        {/* Edit button */}
                        <button
                          onClick={() => { setConfirmId(null); setEditProduct(product); }}
                          className="flex items-center gap-1.5 px-3 py-2 text-[10px] font-sans uppercase tracking-widest text-[#9A8F84] border border-[#2A1F14] hover:border-[#C9A84C]/50 hover:text-[#C9A84C] hover:bg-[#C9A84C]/5 transition-all duration-200"
                          title="Edit chair details"
                        >
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17 3a2.828 2.828 0 114 4L7.5 20.5 2 22l1.5-5.5L17 3z" />
                          </svg>
                          Edit
                        </button>

                        {/* Remove button */}
                        <button
                          onClick={() => setConfirmId(product.id)}
                          className="flex items-center gap-1.5 px-3 py-2 text-[10px] font-sans uppercase tracking-widest text-[#9A8F84] border border-[#2A1F14] hover:border-red-500/40 hover:text-red-400 hover:bg-red-500/5 transition-all duration-200"
                        >
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                          </svg>
                          Remove
                        </button>
                      </>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// UPLOAD FORM
// ─────────────────────────────────────────────────────────────────────────────
function UploadForm({ onSuccess }: { onSuccess: (name: string, cat: string) => void }) {
  const [formState, setFormState]       = useState<FormState>("idle");
  const [errorMsg, setErrorMsg]         = useState("");
  const [imageFile, setImageFile]       = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isDragging, setIsDragging]     = useState(false);
  const fileInputRef                    = useRef<HTMLInputElement>(null);

  const [name,          setName]          = useState("");
  const [category,      setCategory]      = useState("");
  const [description,   setDescription]   = useState("");
  const [price,         setPrice]         = useState("");
  const [amazonLink,    setAmazonLink]    = useState("");
  const [flipkartLink,  setFlipkartLink]  = useState("");
  const [tag,           setTag]           = useState("");
  const [step,          setStep]          = useState<1 | 2>(1);

  const handleFile = useCallback((file: File) => {
    if (!file.type.startsWith("image/")) { setErrorMsg("Please upload a valid image (JPG, PNG, WEBP)."); return; }
    if (file.size > 10 * 1024 * 1024)   { setErrorMsg("Image must be under 10MB."); return; }
    setErrorMsg("");
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  }, []);

  const onDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault(); setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) handleFile(file);
  };

  const onFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim())        { setErrorMsg("Chair name is required.");      return; }
    if (!category)           { setErrorMsg("Please select a category.");    return; }
    if (!description.trim()) { setErrorMsg("Description is required.");     return; }
    if (!price.trim())       { setErrorMsg("Price is required.");           return; }
    if (!imageFile)          { setErrorMsg("Please upload a chair image."); return; }

    setErrorMsg("");
    setFormState("loading");

    try {
      const fd = new FormData();
      fd.append("name",         name.trim());
      fd.append("category",     category);
      fd.append("description",  description.trim());
      fd.append("price",        price.trim());
      fd.append("amazonLink",   amazonLink.trim()  || "#");
      fd.append("flipkartLink", flipkartLink.trim() || "#");
      if (tag) fd.append("tag", tag);
      fd.append("image", imageFile);

      const res  = await fetch("/api/upload-chair", { method: "POST", body: fd });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Upload failed.");
      setFormState("success");
      onSuccess(data.product?.name || name, category);
    } catch (err: unknown) {
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong.");
      setFormState("error");
    }
  };

  return (
    <div className="max-w-5xl mx-auto">

      {/* Step indicators */}
      <div className="flex items-center justify-center gap-3 mb-10">
        {[1, 2].map((s) => (
          <div key={s} className="flex items-center gap-2">
            {s === 2 && <div className="w-8 h-px bg-[#2A1F14]" />}
            <div className={`flex items-center gap-2 px-4 py-2 border transition-colors duration-300 ${step === s ? "border-[#C9A84C] bg-[#C9A84C]/10" : "border-[#2A1F14]"}`}>
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold font-sans ${step === s ? "bg-[#C9A84C] text-[#0F0B08]" : "bg-[#2A1F14] text-[#9A8F84]"}`}>
                {s === 1 && step > 1 ? "✓" : s}
              </span>
              <span className={`text-[10px] font-sans uppercase tracking-widest ${step === s ? "text-[#F0E6D3]" : "text-[#9A8F84]"}`}>
                {s === 1 ? "Select Category" : "Chair Details"}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* ── STEP 1: Category ── */}
      {step === 1 && (
        <div className="max-w-4xl mx-auto">
          <p className="text-center font-sans text-sm text-[#9A8F84] mb-8">Which type of chair are you adding?</p>
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {CATEGORIES.map((cat) => {
              const isSelected = category === cat.name;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => { setCategory(cat.name); setErrorMsg(""); }}
                  className={`relative group flex flex-col items-center justify-center gap-3 p-6 border-2 transition-all duration-300 text-center
                    ${isSelected ? "border-[#C9A84C] bg-[#C9A84C]/10" : "border-[#2A1F14] bg-[#1A1209] hover:border-[#C9A84C]/40"}`}
                >
                  {isSelected && (
                    <span className="absolute top-2 right-2 w-5 h-5 rounded-full bg-[#C9A84C] flex items-center justify-center text-[#0F0B08] text-[10px] font-bold">✓</span>
                  )}
                  <span className="text-3xl">{cat.emoji}</span>
                  <p className={`font-serif text-base font-semibold leading-tight transition-colors duration-300 ${isSelected ? "text-[#C9A84C]" : "text-[#F0E6D3] group-hover:text-[#C9A84C]"}`}>
                    {cat.name}
                  </p>
                  <div className={`absolute bottom-0 left-0 w-full h-[2px] bg-[#C9A84C] transition-transform duration-300 origin-left ${isSelected ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"}`} />
                </button>
              );
            })}
          </div>
          {errorMsg && <p className="text-center font-sans text-xs text-red-400 mb-4">{errorMsg}</p>}
          <div className="flex flex-col items-center gap-3">
            {category && <p className="font-sans text-sm text-[#9A8F84]">Selected: <span className="text-[#C9A84C] font-semibold">{category}</span></p>}
            <button
              type="button"
              onClick={() => { if (!category) { setErrorMsg("Please select a category."); return; } setErrorMsg(""); setStep(2); }}
              disabled={!category}
              className="px-12 py-4 text-[11px] font-sans uppercase tracking-[0.2em] font-bold text-[#0F0B08] bg-[#C9A84C] hover:bg-[#F0E6D3] transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-3"
            >
              Continue →
            </button>
          </div>
        </div>
      )}

      {/* ── STEP 2: Details ── */}
      {step === 2 && (
        <form onSubmit={handleSubmit} className="max-w-5xl mx-auto">

          {/* Category badge */}
          <div className="flex items-center justify-between mb-8 p-4 bg-[#1A1209] border border-[#C9A84C]/20">
            <div className="flex items-center gap-3">
              <span className="text-2xl">{CATEGORIES.find(c => c.name === category)?.emoji || "🪑"}</span>
              <div>
                <p className="text-[10px] font-sans uppercase tracking-widest text-[#9A8F84]">Category</p>
                <p className="font-serif text-lg text-[#C9A84C] font-semibold">{category}</p>
              </div>
            </div>
            <button type="button" onClick={() => setStep(1)}
              className="text-[10px] font-sans uppercase tracking-widest text-[#9A8F84] hover:text-[#C9A84C] border border-[#2A1F14] hover:border-[#C9A84C]/30 px-3 py-2 transition-all duration-200">
              Change
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

            {/* LEFT: Image + Tag */}
            <div className="space-y-5">
              <div>
                <label className="block text-[10px] font-sans uppercase tracking-widest text-[#C9A84C] font-semibold mb-4">
                  Chair Photo <span className="text-red-400">*</span>
                </label>
                <div
                  onDrop={onDrop}
                  onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                  onDragLeave={() => setIsDragging(false)}
                  onClick={() => fileInputRef.current?.click()}
                  className={`relative aspect-square w-full border-2 border-dashed flex flex-col items-center justify-center cursor-pointer transition-all duration-300 overflow-hidden
                    ${isDragging ? "border-[#C9A84C] bg-[#C9A84C]/5" : "border-[#2A1F14] hover:border-[#C9A84C]/50 bg-[#1A1209]"}`}
                >
                  {imagePreview ? (
                    <>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={imagePreview} alt="Preview" className="absolute inset-0 w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-[#0F0B08]/65 opacity-0 hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-2">
                        <UploadIcon />
                        <span className="text-[10px] font-sans uppercase tracking-widest text-[#F0E6D3] font-semibold">Change Photo</span>
                      </div>
                    </>
                  ) : (
                    <div className="flex flex-col items-center gap-5 p-8 text-center select-none">
                      <div className="w-16 h-16 rounded-full border border-[#2A1F14] flex items-center justify-center text-[#C9A84C]"><UploadIcon /></div>
                      <div>
                        <p className="font-serif text-xl text-[#F0E6D3] mb-1">Drag & Drop your photo</p>
                        <p className="font-sans text-xs text-[#9A8F84]">or <span className="text-[#C9A84C] underline underline-offset-2">click to browse</span></p>
                      </div>
                      <p className="font-sans text-[10px] text-[#9A8F84]/50 uppercase tracking-widest">JPG · PNG · WEBP · Max 10MB</p>
                    </div>
                  )}
                  <input ref={fileInputRef} type="file" accept="image/jpeg,image/png,image/webp" className="hidden" onChange={onFileChange} />
                </div>
                {imageFile && (
                  <div className="mt-2 flex items-center gap-2 px-3 py-2 bg-[#1A1209] border border-[#2A1F14]">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#C9A84C]" />
                    <span className="font-sans text-xs text-[#9A8F84] truncate flex-1">{imageFile.name}</span>
                    <span className="font-sans text-[10px] text-[#9A8F84]/60">{(imageFile.size / 1024 / 1024).toFixed(2)} MB</span>
                  </div>
                )}
              </div>

              {/* Tag */}
              <div>
                <label className="block text-[10px] font-sans uppercase tracking-widest text-[#C9A84C] font-semibold mb-3">
                  Badge <span className="text-[#9A8F84] font-normal">(optional)</span>
                </label>
                <div className="flex flex-wrap gap-2">
                  {TAGS.map((t) => (
                    <button key={t.value || "none"} type="button" onClick={() => setTag(t.value)}
                      className={`px-3 py-2 text-[9px] font-sans uppercase tracking-widest border transition-all duration-200
                        ${tag === t.value ? "border-[#C9A84C] bg-[#C9A84C]/10 text-[#C9A84C]" : "border-[#2A1F14] text-[#9A8F84] hover:border-[#C9A84C]/30 hover:text-[#F0E6D3]"}`}>
                      {t.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* RIGHT: Text fields */}
            <div className="space-y-5">

              {/* Product Name */}
              <div>
                <label className="block text-[10px] font-sans uppercase tracking-widest text-[#C9A84C] font-semibold mb-3">
                  Chair Name <span className="text-red-400">*</span>
                </label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. The Royal Visitor Pro"
                  className="w-full bg-[#1A1209] border border-[#2A1F14] focus:border-[#C9A84C]/60 text-[#F0E6D3] placeholder-[#9A8F84]/40 font-sans text-sm px-4 py-3.5 outline-none transition-colors duration-300" />
              </div>

              {/* Description */}
              <div>
                <label className="block text-[10px] font-sans uppercase tracking-widest text-[#C9A84C] font-semibold mb-3">
                  Description <span className="text-red-400">*</span>
                </label>
                <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={4}
                  placeholder="Describe material, features, comfort level..."
                  className="w-full bg-[#1A1209] border border-[#2A1F14] focus:border-[#C9A84C]/60 text-[#F0E6D3] placeholder-[#9A8F84]/40 font-sans text-sm px-4 py-3.5 outline-none transition-colors duration-300 resize-none leading-relaxed" />
              </div>

              {/* Price */}
              <div>
                <label className="block text-[10px] font-sans uppercase tracking-widest text-[#C9A84C] font-semibold mb-3">
                  Price <span className="text-red-400">*</span>
                </label>
                <input type="text" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="e.g. ₹12,500"
                  className="w-full bg-[#1A1209] border border-[#2A1F14] focus:border-[#C9A84C]/60 text-[#F0E6D3] placeholder-[#9A8F84]/40 font-sans text-sm px-4 py-3.5 outline-none transition-colors duration-300" />
              </div>

              {/* Amazon Link */}
              <div>
                <label className="block text-[10px] font-sans uppercase tracking-widest text-[#C9A84C] font-semibold mb-3">
                  Amazon Link <span className="text-[#9A8F84] font-normal">(optional)</span>
                </label>
                <input type="url" value={amazonLink} onChange={(e) => setAmazonLink(e.target.value)}
                  placeholder="https://www.amazon.in/..."
                  className="w-full bg-[#1A1209] border border-[#2A1F14] focus:border-[#C9A84C]/60 text-[#F0E6D3] placeholder-[#9A8F84]/40 font-sans text-xs px-4 py-3.5 outline-none transition-colors duration-300" />
              </div>

              {/* Flipkart Link */}
              <div>
                <label className="block text-[10px] font-sans uppercase tracking-widest text-[#C9A84C] font-semibold mb-3">
                  Flipkart Link <span className="text-[#9A8F84] font-normal">(optional)</span>
                </label>
                <input type="url" value={flipkartLink} onChange={(e) => setFlipkartLink(e.target.value)}
                  placeholder="https://www.flipkart.com/..."
                  className="w-full bg-[#1A1209] border border-[#2A1F14] focus:border-[#C9A84C]/60 text-[#F0E6D3] placeholder-[#9A8F84]/40 font-sans text-xs px-4 py-3.5 outline-none transition-colors duration-300" />
              </div>

              {/* Error message */}
              {(errorMsg || formState === "error") && (
                <div className="flex items-start gap-3 p-4 bg-red-500/5 border border-red-500/20">
                  <svg className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
                  </svg>
                  <p className="font-sans text-xs text-red-400 leading-relaxed">{errorMsg || "Upload failed. Please try again."}</p>
                </div>
              )}

              {/* Submit */}
              <button type="submit" disabled={formState === "loading"}
                className="w-full py-4 bg-[#C9A84C] hover:bg-[#F0E6D3] text-[#0F0B08] font-sans text-[11px] uppercase tracking-widest font-bold transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-3">
                {formState === "loading" ? <><SpinIcon /> Uploading to Cloudinary...</> : <><UploadIcon /> Publish to {category}</>}
              </button>
              <p className="font-sans text-[10px] text-[#9A8F84]/50 text-center">
                Image → Cloudinary · Product data → MongoDB Atlas
              </p>
            </div>

          </div>
        </form>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN PAGE
// ─────────────────────────────────────────────────────────────────────────────
export default function UploadPage() {
  const [activeTab, setActiveTab]   = useState<Tab>("upload");
  const [successData, setSuccessData] = useState<{ name: string; category: string } | null>(null);

  const handleUploadSuccess = (name: string, cat: string) => {
    setSuccessData({ name, category: cat });
  };

  const handleUploadAnother = () => {
    setSuccessData(null);
    setActiveTab("upload");
  };

  return (
    <div className="min-h-screen bg-[#0F0B08] text-[#F5F0EA]">

      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0F0B08]/95 backdrop-blur-md border-b border-[#C9A84C]/10 py-4">
        <div className="max-w-6xl mx-auto px-6 md:px-12 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <svg className="w-5 h-5 text-[#C9A84C]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 18v3M20 18v3M4 12h16M4 8h16M19 12v6M5 12v6M7 4h10v4H7z" />
            </svg>
            <span className="font-serif text-sm tracking-[0.2em] text-[#F0E6D3] group-hover:text-[#C9A84C] transition-colors duration-300">
              THE SITTING COMPANY
            </span>
          </Link>
          <Link href="/" className="flex items-center gap-2 text-[11px] font-sans uppercase tracking-widest text-[#9A8F84] hover:text-[#F0E6D3] transition-colors duration-300">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            Back to Website
          </Link>
        </div>
      </nav>

      <div className="pt-28 pb-20 px-6 md:px-12">
        <div className="max-w-6xl mx-auto">

          {/* Header */}
          <div className="text-center mb-10">
            <span className="text-[10px] font-sans uppercase tracking-[0.25em] text-[#C9A84C] font-bold block mb-4">
              Admin — Product Management
            </span>
            <h1 className="font-serif text-5xl sm:text-6xl text-[#F5F0EA] mb-2">
              Catalogue <span className="italic text-[#F0E6D3] font-normal">Control</span>
            </h1>
            <p className="font-sans text-xs text-[#9A8F84] mt-3">
              Images stored on <span className="text-[#C9A84C]">Cloudinary</span> · Products saved in <span className="text-[#C9A84C]">MongoDB Atlas</span>
            </p>
          </div>

          {/* Tab switcher */}
          <div className="flex justify-center mb-12">
            <div className="flex border border-[#2A1F14] p-1 gap-1">
              {([
                { key: "upload", label: "Upload New Chair", icon: (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                  </svg>
                )},
                { key: "manage", label: "Manage / Remove", icon: (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 12h.007v.008H3.75V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-.375 5.25h.007v.008H3.75v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                  </svg>
                )},
              ] as const).map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => { setActiveTab(tab.key as Tab); setSuccessData(null); }}
                  className={`flex items-center gap-2 px-6 py-3 text-[11px] font-sans uppercase tracking-widest transition-all duration-300 ${
                    activeTab === tab.key
                      ? "bg-[#C9A84C] text-[#0F0B08] font-bold"
                      : "text-[#9A8F84] hover:text-[#F0E6D3]"
                  }`}
                >
                  {tab.icon}
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-4 mb-12">
            <div className="flex-1 h-px bg-[#2A1F14]" />
            <span className="text-[#C9A84C] text-xs">✦</span>
            <div className="flex-1 h-px bg-[#2A1F14]" />
          </div>

          {/* Success screen */}
          {successData && activeTab === "upload" ? (
            <div className="flex items-center justify-center py-16">
              <div className="text-center max-w-md mx-auto">
                <div className="w-20 h-20 rounded-full border-2 border-[#C9A84C]/60 flex items-center justify-center mx-auto mb-8 text-[#C9A84C]">
                  <svg className="w-9 h-9" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                </div>
                <span className="text-[11px] font-sans uppercase tracking-widest text-[#C9A84C] font-bold block mb-3">Published!</span>
                <h2 className="font-serif text-3xl text-[#F0E6D3] mb-2">&ldquo;{successData.name}&rdquo;</h2>
                <p className="font-sans text-sm text-[#9A8F84] mb-2">
                  Added to <span className="text-[#C9A84C]">{successData.category}</span> and now live on the website.
                </p>
                <p className="font-sans text-xs text-[#9A8F84]/50 mb-8">Image saved to Cloudinary · Data saved to MongoDB</p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <button onClick={handleUploadAnother}
                    className="px-6 py-3 text-[11px] font-sans uppercase tracking-widest text-[#0F0B08] bg-[#C9A84C] hover:bg-[#F0E6D3] transition-all duration-300 font-bold">
                    Upload Another
                  </button>
                  <button onClick={() => setActiveTab("manage")}
                    className="px-6 py-3 text-[11px] font-sans uppercase tracking-widest text-[#F0E6D3] border border-[#2A1F14] hover:border-[#C9A84C]/40 transition-all duration-300">
                    View All Chairs
                  </button>
                  <Link href="/"
                    className="px-6 py-3 text-[11px] font-sans uppercase tracking-widest text-[#9A8F84] border border-[#2A1F14] hover:border-[#C9A84C]/40 transition-all duration-300 text-center">
                    Go to Website
                  </Link>
                </div>
              </div>
            </div>
          ) : activeTab === "upload" ? (
            <UploadForm onSuccess={handleUploadSuccess} />
          ) : (
            <ManageTab />
          )}

        </div>
      </div>
    </div>
  );
}
