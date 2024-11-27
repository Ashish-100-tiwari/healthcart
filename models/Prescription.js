// models/Prescription.js
import mongoose from "mongoose";

const PrescriptionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  diseaseName: { type: String, required: true },
  dateTime: { type: Date, default: Date.now },
  symptoms: { type: [String], required: true },
  medicines: { type: [String], required: true },
  doctorName: { type: String, required: true },
  doctorId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
});

export default mongoose.models.Prescription || mongoose.model("Prescription", PrescriptionSchema);
