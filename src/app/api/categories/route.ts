import { NextResponse } from "next/server";
import { readFile } from "fs/promises";
import path from "path";
import clientPromise from "@/lib/mongodb";

// Force dynamic rendering — this route queries MongoDB at runtime
export const dynamic = "force-dynamic";

// ─── GET: return product counts per category ─────────────────────────────────
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

    // Convert to a simple object: { "Office Chairs": 3, "Lounge Chairs": 1 }
    const counts: Record<string, number> = {};
    for (const r of results) {
      if (r._id) counts[r._id] = r.count;
    }

    return NextResponse.json(counts);
  } catch (err) {
    console.error("GET /api/categories error:", err);
    // Fallback: count from static products.json
    try {
      const filePath = path.join(process.cwd(), "src", "data", "products.json");
      const raw = await readFile(filePath, "utf-8");
      const products = JSON.parse(raw) as Array<{ category: string }>;
      const counts: Record<string, number> = {};
      for (const p of products) {
        if (p.category) counts[p.category] = (counts[p.category] || 0) + 1;
      }
      return NextResponse.json(counts);
    } catch {
      return NextResponse.json({});
    }
  }
}
