// import { NextResponse } from "next/server";
// import dbConnect from "@/lib/dbConnect";
// import Prescription from "@/models/Prescription";

// export async function POST(req) {
//   try {
//     await dbConnect();

//     const body = await req.json();
//     const { userId, diseaseName, symptoms, medicines, doctorName, doctorId } = body;

//     if (!userId || !diseaseName || !symptoms || !medicines || !doctorName || !doctorId) {
//       return NextResponse.json({ success: false, error: "All fields are required" }, { status: 400 });
//     }

//     const prescription = await Prescription.create({
//       userId,
//       diseaseName,
//       symptoms: symptoms.split(","),
//       medicines: medicines.split(","),
//       doctorName,
//       doctorId,
//     });

//     return NextResponse.json({ success: true, prescription }, { status: 201 });
//   } catch (error) {
//     console.error("Error creating prescription:", error);
//     return NextResponse.json({ success: false, error: "Server error" }, { status: 500 });
//   }
// }
import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Prescription from "@/models/Prescription";
import { authorize } from "@/middleware/auth";

export async function POST(req) {
  const authResult = await authorize(req, ["doctor"]); // Middleware for role validation
  if (authResult instanceof NextResponse) return authResult; // Return auth error response if unauthorized

  const { userId, diseaseName, symptoms, medicines, doctorName, doctorId } = await req.json();

  if (!userId || !diseaseName || !symptoms || !medicines || !doctorName || !doctorId) {
    return NextResponse.json({ success: false, error: "All fields are required" }, { status: 400 });
  }

  await dbConnect();

  try {
    const prescription = await Prescription.create({
      userId,
      diseaseName,
      symptoms: symptoms.split(","),
      medicines: medicines.split(","),
      doctorName,
      doctorId,
    });

    return NextResponse.json({ success: true, prescription }, { status: 201 });
  } catch (error) {
    console.error("Error creating prescription:", error);
    return NextResponse.json({ success: false, error: "Server error" }, { status: 500 });
  }
}

