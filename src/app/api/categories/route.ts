import { NextResponse } from "next/server";
import { readFile } from "fs/promises";
import path from "path";
import clientPromise from "@/lib/mongodb";

// Force dynamic rendering — this route queries MongoDB at runtime
export const dynamic = "force-dynamic";

// ─── GET: return product counts + showpiece image per category ────────────────
export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("sitting_company");
    const col = db.collection("products");

    // Aggregate counts per category
    const pipeline = [
      { $group: { _id: "$category", count: { $sum: 1 } } },
    ];

    const results = await col.aggregate(pipeline).toArray();

    // For each category, also grab the newest product's image (showpiece)
    // This is the same image shown on the homepage category card thumbnail
    const categoryData: Record<string, { count: number; showpieceImage: string | null }> = {};

    for (const r of results) {
      if (!r._id) continue;

      // Get the showpiece product for this category
      // Priority: isShowpiece:true product → newest product (fallback)
      let showpieceProduct = await col
        .find({ category: r._id, isShowpiece: true })
        .limit(1)
        .project({ image: 1 })
        .toArray();

      // Fallback: if no explicit showpiece, use the newest product
      if (showpieceProduct.length === 0) {
        showpieceProduct = await col
          .find({ category: r._id })
          .sort({ createdAt: -1 })
          .limit(1)
          .project({ image: 1 })
          .toArray();
      }

      categoryData[r._id] = {
        count: r.count,
        showpieceImage: showpieceProduct.length > 0 ? showpieceProduct[0].image : null,
      };
    }

    return NextResponse.json(categoryData);
  } catch (err) {
    console.error("GET /api/categories error:", err);
    // Fallback: count from static products.json
    try {
      const filePath = path.join(process.cwd(), "src", "data", "products.json");
      const raw = await readFile(filePath, "utf-8");
      const products = JSON.parse(raw) as Array<{ category: string; image?: string }>;
      const categoryData: Record<string, { count: number; showpieceImage: string | null }> = {};
      for (const p of products) {
        if (p.category) {
          if (!categoryData[p.category]) {
            categoryData[p.category] = { count: 0, showpieceImage: p.image || null };
          }
          categoryData[p.category].count += 1;
        }
      }
      return NextResponse.json(categoryData);
    } catch {
      return NextResponse.json({});
    }
  }
}
