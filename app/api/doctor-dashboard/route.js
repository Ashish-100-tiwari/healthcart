import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect"; // MongoDB connection utility
import User from "@/models/User"; // User model
import jwt from "jsonwebtoken"; // Add the jsonwebtoken library

export async function GET(req) {
  try {
    await dbConnect();
    const token = req.headers.get("Authorization");
    if (!token) {
      return NextResponse.json(
        { success: false, error: "Authorization token is required" },
        { status: 401 }
      );
    }
    const jwtToken = token.split(" ")[1];
    const decoded = jwt.verify(jwtToken, process.env.JWT_SECRET); 

    const loggedInUserId = decoded.id; 
    const users = await User.find({
      role: { $ne: "admin" },
      _id: { $ne: loggedInUserId }, // Exclude the logged-in user
    });

    return NextResponse.json({ success: true, users }, { status: 200 });
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json(
      { success: false, error: "Server error" },
      { status: 500 }
    );
  }
}
