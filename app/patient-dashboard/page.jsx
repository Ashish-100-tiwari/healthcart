"use client";

import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar/Navbar";
import { useState, useEffect } from "react";
import Footer from "@/components/Footer/Footer";

export default function PatientDashboard() {
  const router = useRouter();
  const [userName, setUserName] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [prescriptions, setPrescriptions] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const payload = JSON.parse(atob(token.split(".")[1]));
      setUserName(payload.name);
      setUserRole(payload.role);

      if (payload.role !== "patient") {
        router.push("/unauthorized");
      }

      fetchPrescriptions(token);
    } else {
      router.push("/login");
    }
  }, []);

  const fetchPrescriptions = async (token) => {
    try {
      const response = await fetch("/api/patient-prescriptions", {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });

      const data = await response.json();
      if (data.success) {
        setPrescriptions(data.prescriptions);
      } else {
        console.error("Error fetching prescriptions:", data.error);
      }
    } catch (error) {
      console.error("Error fetching prescriptions:", error);
    }
  };

  return (
    <>
      <Navbar userName={userName} userRole={userRole} />
      <div className="p-4 mt-32">
        <h1 className="text-2xl font-bold mb-4">Patient Dashboard</h1>
        <h2 className="text-xl font-semibold mb-4">Your Prescriptions</h2>
        <table className="min-w-full bg-white border border-gray-200 rounded-lg">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Date</th>
              <th className="py-2 px-4 border-b">Disease Name</th>
              <th className="py-2 px-4 border-b">Symptoms</th>
              <th className="py-2 px-4 border-b">Medicines</th>
              <th className="py-2 px-4 border-b">Prescribed By</th>
            </tr>
          </thead>
          <tbody>
            {prescriptions.length > 0 ? (
              prescriptions.map((prescription, index) => (
                <tr key={index} className="text-center">
                  <td className="py-2 px-4 border-b">
                    {new Date(prescription.dateTime).toLocaleDateString()}
                  </td>
                  <td className="py-2 px-4 border-b">{prescription.diseaseName}</td>
                  <td className="py-2 px-4 border-b">
                    {prescription.symptoms.join(", ")}
                  </td>
                  <td className="py-2 px-4 border-b">
                    {prescription.medicines.join(", ")}
                  </td>
                  <td className="py-2 px-4 border-b">{prescription.doctorName}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="py-2 px-4 text-center">
                  No prescriptions found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <Footer/>
    </>
  );
}
