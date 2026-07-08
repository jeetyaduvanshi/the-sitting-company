export interface Product {
  id: string;
  name: string;
  category: string;
  description: string;
  price: string;
  image: string;
  amazonUrl: string;
  flipkartUrl: string;
  tag?: string;
}

export const HERO_IMAGE = "/images/hero_chair.png";

export const products: Product[] = [
  {
    id: "sovereign-lounge",
    name: "The Sovereign Lounge",
    category: "Lounge Chairs",
    description: "An iconic silhouette crafted with hand-finished top-grain antique leather and a brushed brass swivel base.",
    price: "₹48,500",
    image: "/images/sovereign_lounge.png",
    amazonUrl: "#",
    flipkartUrl: "#",
    tag: "SIGNATURE",
  },
  {
    id: "aeron-pro-ergonomic",
    name: "The Aeron Pro",
    category: "Ergonomic Chairs",
    description: "Engineered for optimal lumbar alignment, featuring multi-flex mesh, auto-weight sensing, and dynamic tilt.",
    price: "₹32,000",
    image: "/images/aeron_pro.png",
    amazonUrl: "#",
    flipkartUrl: "#",
    tag: "BESTSELLER",
  },
  {
    id: "monarch-executive",
    name: "The Monarch Executive",
    category: "Office Chairs",
    description: "A commanding presence for the modern workspace. Upholstered in premium cashmere with a dark walnut backing frame.",
    price: "₹62,000",
    image: "/images/monarch_executive.png",
    amazonUrl: "#",
    flipkartUrl: "#",
    tag: "LIMITED EDITION",
  },
];

// Helper functions for dynamic product routing and relation lookups
export function getProductBySlug(slug: string) {
  const normSlug = slug.toLowerCase().replace(/[^a-z0-9]/g, "");
  return products.find(
    (p) => p.id.toLowerCase().replace(/[^a-z0-9]/g, "") === normSlug
  );
}

export function getAllSlugs() {
  return products.map((p) => p.id);
}

export function getRelatedProducts(currentId: string, limit: number = 3) {
  return products.filter((p) => p.id !== currentId).slice(0, limit);
}
