import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect"; // MongoDB connection utility
import User from "@/models/User"; // User model

export async function POST(req) {
  try {
    const { userId, role } = await req.json();

    if (!userId || !role) {
      return NextResponse.json(
        { success: false, error: "User ID and role are required" },
        { status: 400 }
      );
    }

    // Connect to the database
    await dbConnect();

    // Update the user's role
    await User.findByIdAndUpdate(userId, { role });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Error updating role:", error);
    return NextResponse.json(
      { success: false, error: "Server error" },
      { status: 500 }
    );
  }
}
