import { NextRequest, NextResponse } from "next/server";
import { writeFile, readFile } from "fs/promises";
import path from "path";

// GET: return all products
export async function GET() {
  try {
    const filePath = path.join(process.cwd(), "src", "data", "products.json");
    const data = await readFile(filePath, "utf-8");
    return NextResponse.json(JSON.parse(data));
  } catch {
    return NextResponse.json({ error: "Failed to read products" }, { status: 500 });
  }
}

// POST: upload a new chair product with image
export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();

    // Extract fields
    const name = formData.get("name") as string;
    const category = formData.get("category") as string;
    const description = formData.get("description") as string;
    const price = formData.get("price") as string;
    const amazonUrl = (formData.get("amazonUrl") as string) || "#";
    const flipkartUrl = (formData.get("flipkartUrl") as string) || "#";
    const tag = (formData.get("tag") as string) || "";
    const imageFile = formData.get("image") as File | null;

    // Validate required fields
    if (!name || !category || !description || !price) {
      return NextResponse.json(
        { error: "Name, category, description, and price are required." },
        { status: 400 }
      );
    }

    // Handle image upload
    let imagePath = "/images/placeholder_chair.png";
    if (imageFile && imageFile.size > 0) {
      const bytes = await imageFile.arrayBuffer();
      const buffer = Buffer.from(bytes);

      // Create a unique filename: slug + timestamp + extension
      const ext = imageFile.name.split(".").pop()?.toLowerCase() || "jpg";
      const slug = name
        .toLowerCase()
        .replace(/[^a-z0-9\s]/g, "")
        .trim()
        .replace(/\s+/g, "-");
      const timestamp = Date.now();
      const filename = `${slug}-${timestamp}.${ext}`;

      // Save to public/images/uploaded/
      const uploadDir = path.join(process.cwd(), "public", "images", "uploaded");
      const { mkdir } = await import("fs/promises");
      await mkdir(uploadDir, { recursive: true });

      const absoluteImagePath = path.join(uploadDir, filename);
      await writeFile(absoluteImagePath, buffer);
      imagePath = `/images/uploaded/${filename}`;
    }

    // Build new product object
    const id = name
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, "")
      .trim()
      .replace(/\s+/g, "-");

    const newProduct = {
      id: `${id}-${Date.now()}`,
      name,
      category,
      description,
      price,
      image: imagePath,
      amazonUrl,
      flipkartUrl,
      ...(tag ? { tag } : {}),
    };

    // Read, update, and write products.json
    const jsonPath = path.join(process.cwd(), "src", "data", "products.json");
    const existing = JSON.parse(await readFile(jsonPath, "utf-8"));
    existing.push(newProduct);
    await writeFile(jsonPath, JSON.stringify(existing, null, 2), "utf-8");

    return NextResponse.json({ success: true, product: newProduct }, { status: 201 });
  } catch (err) {
    console.error("Upload error:", err);
    return NextResponse.json({ error: "Upload failed. Please try again." }, { status: 500 });
  }
}

// DELETE: remove a product by ID
export async function DELETE(request: NextRequest) {
  try {
    const { id } = await request.json();
    if (!id) {
      return NextResponse.json({ error: "Product ID is required." }, { status: 400 });
    }

    const jsonPath = path.join(process.cwd(), "src", "data", "products.json");
    const existing = JSON.parse(await readFile(jsonPath, "utf-8"));

    const productToDelete = existing.find((p: { id: string }) => p.id === id);
    if (!productToDelete) {
      return NextResponse.json({ error: "Product not found." }, { status: 404 });
    }

    // Delete uploaded image from disk if it's in /images/uploaded/
    if (productToDelete.image?.startsWith("/images/uploaded/")) {
      const { unlink } = await import("fs/promises");
      try {
        await unlink(path.join(process.cwd(), "public", productToDelete.image));
      } catch {
        // File may already be gone — ignore
      }
    }

    const updated = existing.filter((p: { id: string }) => p.id !== id);
    await writeFile(jsonPath, JSON.stringify(updated, null, 2), "utf-8");

    return NextResponse.json({ success: true, deleted: id });
  } catch (err) {
    console.error("Delete error:", err);
    return NextResponse.json({ error: "Failed to delete product." }, { status: 500 });
  }
}
