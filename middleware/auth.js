import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

export async function authorize(req, allowedRoles) {
  try {
    const authHeader = req.headers.get("Authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!allowedRoles.includes(decoded.role)) {
      return NextResponse.json({ success: false, error: "Forbidden" }, { status: 403 });
    }

    return decoded; // Return decoded user data
  } catch (error) {
    return NextResponse.json({ success: false, error: "Invalid or expired token" }, { status: 401 });
  }
}
