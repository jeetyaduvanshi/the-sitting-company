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

export const HERO_IMAGE = "/images/hero_chair.webp";

import productsData from "./products.json";

export const products: Product[] = productsData as Product[];

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
