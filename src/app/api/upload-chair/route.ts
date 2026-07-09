import { NextRequest, NextResponse } from "next/server";
import { readFile } from "fs/promises";
import path from "path";
import { v2 as cloudinary } from "cloudinary";
import clientPromise from "@/lib/mongodb";

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Helper: upload image buffer to Cloudinary
const uploadToCloudinary = (buffer: Buffer): Promise<{ secure_url: string; public_id: string }> => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: "the_sitting_company", resource_type: "auto" },
      (error, result) => {
        if (error || !result) reject(error);
        else resolve(result as { secure_url: string; public_id: string });
      }
    );
    stream.end(buffer);
  });
};

// ─── GET: return all products ───────────────────────────────────────────────
export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("sitting_company");
    const col = db.collection("products");
    const docs = await col.find({}).sort({ createdAt: -1 }).toArray();

    // Auto-seed from products.json when collection is empty
    if (docs.length === 0) {
      const filePath = path.join(process.cwd(), "src", "data", "products.json");
      const raw = await readFile(filePath, "utf-8");
      const seed = JSON.parse(raw);
      const seeded = seed.map((p: Record<string, unknown>) => ({
        ...p,
        // Normalise field names on seed
        amazonLink: p.amazonLink ?? p.amazonUrl ?? "#",
        flipkartLink: p.flipkartLink ?? p.flipkartUrl ?? "#",
        createdAt: new Date(),
      }));
      await col.insertMany(seeded);
      return NextResponse.json(seeded);
    }

    return NextResponse.json(docs);
  } catch (err) {
    console.error("GET /api/upload-chair error:", err);
    // Resilient fallback to static file
    try {
      const filePath = path.join(process.cwd(), "src", "data", "products.json");
      const raw = await readFile(filePath, "utf-8");
      return NextResponse.json(JSON.parse(raw));
    } catch {
      return NextResponse.json({ error: "Failed to read products" }, { status: 500 });
    }
  }
}

// ─── POST: upload new product ────────────────────────────────────────────────
export async function POST(request: NextRequest) {
  // Check env vars first
  if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
    return NextResponse.json({ error: "Missing Cloudinary environment variables on server." }, { status: 500 });
  }
  if (!process.env.MONGODB_URI) {
    return NextResponse.json({ error: "Missing MONGODB_URI environment variable on server." }, { status: 500 });
  }

  try {
    const formData = await request.formData();

    const name        = (formData.get("name") as string)?.trim();
    const category    = (formData.get("category") as string)?.trim();
    const description = (formData.get("description") as string)?.trim();
    const price       = (formData.get("price") as string)?.trim();
    const amazonLink  = (formData.get("amazonLink") as string)?.trim() || "#";
    const flipkartLink= (formData.get("flipkartLink") as string)?.trim() || "#";
    const tag         = (formData.get("tag") as string)?.trim() || "";
    const imageFile   = formData.get("image") as File | null;

    if (!name || !category || !description || !price) {
      return NextResponse.json(
        { error: "Name, category, description, and price are required." },
        { status: 400 }
      );
    }

    // Stage 1: Upload image to Cloudinary
    let imageUrl = "/images/monarch_executive.webp";
    let cloudinaryPublicId = "";

    if (imageFile && imageFile.size > 0) {
      try {
        const bytes = await imageFile.arrayBuffer();
        const buffer = Buffer.from(bytes);
        const result = await uploadToCloudinary(buffer);
        imageUrl = result.secure_url;
        cloudinaryPublicId = result.public_id;
      } catch (cloudErr: unknown) {
        const msg = cloudErr instanceof Error ? cloudErr.message : String(cloudErr);
        console.error("Cloudinary upload failed:", msg);
        return NextResponse.json(
          { error: `Cloudinary upload failed: ${msg}` },
          { status: 500 }
        );
      }
    }

    // Stage 2: Save to MongoDB
    const id = `${name.toLowerCase().replace(/[^a-z0-9\s]/g, "").trim().replace(/\s+/g, "-")}-${Date.now()}`;

    const newProduct = {
      id,
      name,
      category,
      description,
      price,
      image: imageUrl,
      amazonLink,
      flipkartLink,
      ...(tag ? { tag } : {}),
      ...(cloudinaryPublicId ? { cloudinaryPublicId } : {}),
      createdAt: new Date(),
    };

    try {
      const client = await clientPromise;
      const db = client.db("sitting_company");
      await db.collection("products").insertOne(newProduct);
    } catch (dbErr: unknown) {
      const msg = dbErr instanceof Error ? dbErr.message : String(dbErr);
      console.error("MongoDB insert failed:", msg);
      return NextResponse.json(
        { error: `MongoDB save failed: ${msg}` },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, product: newProduct }, { status: 201 });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error("POST /api/upload-chair unexpected error:", msg);
    return NextResponse.json({ error: `Unexpected error: ${msg}` }, { status: 500 });
  }
}

// ─── DELETE: remove product by id ───────────────────────────────────────────
export async function DELETE(request: NextRequest) {
  try {
    const { id } = await request.json();
    if (!id) {
      return NextResponse.json({ error: "Product ID is required." }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db("sitting_company");
    const col = db.collection("products");

    const doc = await col.findOne({ id });
    if (!doc) {
      return NextResponse.json({ error: "Product not found." }, { status: 404 });
    }

    // Delete image from Cloudinary
    if (doc.cloudinaryPublicId) {
      try {
        await cloudinary.uploader.destroy(doc.cloudinaryPublicId);
      } catch (e) {
        console.error("Cloudinary delete failed:", e);
      }
    }

    await col.deleteOne({ id });
    return NextResponse.json({ success: true, deleted: id });
  } catch (err) {
    console.error("DELETE /api/upload-chair error:", err);
    return NextResponse.json({ error: "Failed to delete product." }, { status: 500 });
  }
}
