"use client";

import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar/Navbar";
import { useState, useEffect } from "react";
import Footer from "@/components/Footer/Footer";

export default function DoctorDashboard() {
  const router = useRouter();
  const [userName, setUserName] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [formData, setFormData] = useState({
    diseaseName: "",
    symptoms: "",
    medicines: "",
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const payload = JSON.parse(atob(token.split(".")[1]));
      setUserName(payload.name);
      setUserRole(payload.role);

      if (payload.role !== "doctor") {
        router.push("/unauthorized");
      }

      fetchUsers(token);
    } else {
      router.push("/login");
    }
  }, []);

  const fetchUsers = async (token) => {
    try {
      const response = await fetch("/api/admin-dashboard", {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`, // Include token in the header
        },
      });

      const data = await response.json();
      console.log("API Response:", data); // Debugging

      if (data.success) {
        setUsers(data.users);
      } else {
        console.error("Error fetching users:", data.error || "Unknown error");
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handlePrescriptionSubmit = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("/api/prescriptions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...formData,
          userId: selectedUser._id,
          doctorName: userName,
          doctorId: JSON.parse(atob(token.split(".")[1])).id,
        }),
      });
      const data = await response.json();

      if (data.success) {
        alert("Prescription submitted successfully!");
        setShowModal(false);
      } else {
        alert(data.error);
      }
    } catch (error) {
      console.error("Error submitting prescription:", error);
    }
  };

  return (
    <>
      <Navbar userName={userName} userRole={userRole} />
      <div className="p-4 mt-32">
        <h1 className="text-2xl font-bold mb-4">Doctor Dashboard</h1>
        <h2 className="text-xl font-semibold mb-4">Users (Excluding Admins and Yourself)</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-lg">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-2 px-4 border-b">Name</th>
                <th className="py-2 px-4 border-b">Email</th>
                <th className="py-2 px-4 border-b">Role</th>
                <th className="py-2 px-4 border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.length > 0 ? (
                users.map((user, index) => (
                  <tr key={index} className="text-center hover:bg-gray-50">
                    <td className="py-2 px-4 border-b">{user.name}</td>
                    <td className="py-2 px-4 border-b">{user.email}</td>
                    <td className="py-2 px-4 border-b">{user.role}</td>
                    <td className="py-2 px-4 border-b">
                      <button
                        onClick={() => {
                          setSelectedUser(user);
                          setShowModal(true);
                        }}
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                      >
                        Write Prescription
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="py-2 px-4 text-center">No users found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
      </div>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-75 z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-11/12 sm:w-96">
            <h2 className="text-xl font-bold mb-4">Write Prescription for {selectedUser.name}</h2>
            <div className="mb-4">
              <label className="block text-sm font-semibold">Disease Name</label>
              <input
                type="text"
                value={formData.diseaseName}
                onChange={(e) => setFormData({ ...formData, diseaseName: e.target.value })}
                className="border p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-semibold">Symptoms</label>
              <textarea
                value={formData.symptoms}
                onChange={(e) => setFormData({ ...formData, symptoms: e.target.value })}
                className="border p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              ></textarea>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-semibold">Medicines</label>
              <textarea
                value={formData.medicines}
                onChange={(e) => setFormData({ ...formData, medicines: e.target.value })}
                className="border p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              ></textarea>
            </div>
            <div className="mt-4 flex justify-end space-x-2">
              <button
                onClick={() => setShowModal(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
              >
                Cancel
              </button>
              <button
                onClick={handlePrescriptionSubmit}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
      <Footer/>
    </>
  );
}
