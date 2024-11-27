import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import User from "@/models/User"; 

export async function GET() {
  try {
    await dbConnect();
    const users = await User.find({}, "name email role");

    // Return the user data
    return NextResponse.json({ success: true, users }, { status: 200 });
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json({ success: false, error: "Server error" }, { status: 500 });
  }
}
