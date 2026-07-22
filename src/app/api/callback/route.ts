import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import { readFile, writeFile } from "fs/promises";
import path from "path";

const JSON_FILE_PATH = path.join(process.cwd(), "src", "data", "callbacks.json");

// Helper to read callbacks from local JSON file fallback
// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function readCallbacksFromFile(): Promise<any[]> {
  try {
    const raw = await readFile(JSON_FILE_PATH, "utf-8");
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

// Helper to write callbacks to local JSON file fallback
// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function writeCallbacksToFile(data: any[]): Promise<boolean> {
  try {
    await writeFile(JSON_FILE_PATH, JSON.stringify(data, null, 2), "utf-8");
    return true;
  } catch (err) {
    console.error("Failed to write to local callbacks.json:", err);
    return false;
  }
}

export async function POST(request: NextRequest) {
  try {
    const { name, phone, timeSlot, category } = await request.json();

    if (!name || !phone) {
      return NextResponse.json(
        { error: "Name and phone number are required." },
        { status: 400 }
      );
    }

    const callbackRequest = {
      _id: new ObjectId().toString(),
      name: name.trim(),
      phone: phone.trim(),
      timeSlot: timeSlot || "Immediate",
      category: category || "General Enquiry",
      status: "pending",
      createdAt: new Date().toISOString(),
    };

    let savedToDb = false;

    // Try MongoDB first
    try {
      const client = await clientPromise;
      const db = client.db("sitting_company");
      const insertResult = await db.collection("callbacks").insertOne({
        ...callbackRequest,
        _id: new ObjectId(callbackRequest._id), // Save as proper ObjectId in Mongo
        createdAt: new Date(callbackRequest.createdAt)
      });
      if (insertResult.acknowledged) {
        savedToDb = true;
        console.log("Saved callback request to MongoDB:", callbackRequest);
      }
    } catch (dbErr) {
      console.warn("MongoDB not available for write, falling back to local file:", dbErr);
    }

    // Always append/sync to local JSON file as a reliable backup/primary fallback
    const localList = await readCallbacksFromFile();
    localList.unshift(callbackRequest); // Add to the beginning of the list
    await writeCallbacksToFile(localList);

    return NextResponse.json({ 
      success: true, 
      message: "Callback scheduled successfully.",
      savedToDb 
    });
  } catch (err) {
    console.error("Error in POST /api/callback:", err);
    return NextResponse.json(
      { error: "Internal server error. Please try again." },
      { status: 500 }
    );
  }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function GET(_request: NextRequest) {
  try {
    // Try MongoDB first
    try {
      const client = await clientPromise;
      const db = client.db("sitting_company");
      const docs = await db.collection("callbacks").find({}).sort({ createdAt: -1 }).toArray();
      if (docs && docs.length > 0) {
        return NextResponse.json(docs);
      }
    } catch (dbErr) {
      console.warn("MongoDB GET callbacks failed, checking local file fallback:", dbErr);
    }

    // Check local JSON file
    const localList = await readCallbacksFromFile();
    return NextResponse.json(localList);
  } catch (err) {
    console.error("Error in GET /api/callback:", err);
    return NextResponse.json([]);
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, status } = body;

    if (!id || !status) {
      return NextResponse.json({ error: "ID and status are required." }, { status: 400 });
    }

    let updatedInDb = false;

    // Try MongoDB first
    try {
      const client = await clientPromise;
      const db = client.db("sitting_company");
      const result = await db.collection("callbacks").updateOne(
        { _id: new ObjectId(id) },
        { $set: { status, updatedAt: new Date() } }
      );
      if (result.modifiedCount > 0) {
        updatedInDb = true;
      }
    } catch (dbErr) {
      console.warn("MongoDB PATCH callback failed, updating local file fallback:", dbErr);
    }

    // Always update local JSON file fallback as well
    const localList = await readCallbacksFromFile();
    const updatedList = localList.map((item) => {
      if (item._id === id) {
        return { ...item, status, updatedAt: new Date().toISOString() };
      }
      return item;
    });
    await writeCallbacksToFile(updatedList);

    return NextResponse.json({ success: true, updatedInDb });
  } catch (err) {
    console.error("PATCH /api/callback error:", err);
    return NextResponse.json({ error: "Failed to update callback status." }, { status: 500 });
  }
}
