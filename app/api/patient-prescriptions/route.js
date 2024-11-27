import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Prescription from "@/models/Prescription";
import { authorize } from "@/middleware/auth";

export async function GET(req) {
  const authResult = await authorize(req, ["patient"]); // Middleware for role validation
  if (authResult instanceof NextResponse) return authResult; // Return auth error response if unauthorized

  const userId = authResult.userId;

  await dbConnect();

  try {
    const prescriptions = await Prescription.find({ userId });

    return NextResponse.json({ success: true, prescriptions }, { status: 200 });
  } catch (error) {
    console.error("Error fetching prescriptions:", error);
    return NextResponse.json({ success: false, error: "Server error" }, { status: 500 });
  }
}
