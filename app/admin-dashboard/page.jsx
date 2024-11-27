"use client";

import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar/Navbar";
import { useState, useEffect } from "react";

export default function AdminDashboard() {
  const router = useRouter();
  const [userName, setUserName] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null); // For modal
  const [newRole, setNewRole] = useState(""); // Role to update

  useEffect(() => {
    // Check authentication and role
    const token = localStorage.getItem("token");
    if (token) {
      const payload = JSON.parse(atob(token.split(".")[1]));
      setUserName(payload.name);
      setUserRole(payload.role);
      if (payload.role !== "admin") {
        router.push("/unauthorized");
      }
    } else {
      router.push("/login");
    }
  }, []);

  useEffect(() => {
    // Fetch user data for admin
    const fetchUsers = async () => {
      try {
        const response = await fetch("/api/admin-dashboard");
        const data = await response.json();
        if (data.success) {
          setUsers(data.users);
        } else {
          console.error("Error fetching users:", data.error);
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  // Handle role update
  const handleRoleUpdate = async () => {
    try {
      const response = await fetch("/api/update-role", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: selectedUser._id, role: newRole }),
      });
      const data = await response.json();
      if (data.success) {
        // Update users list locally
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user._id === selectedUser._id ? { ...user, role: newRole } : user
          )
        );
        setSelectedUser(null); // Close modal
      } else {
        console.error("Error updating role:", data.error);
      }
    } catch (error) {
      console.error("Error updating role:", error);
    }
  };

  return (
    <>
      <Navbar userName={userName} userRole={userRole} />
      <div className="p-4 mt-32">
        <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
        <table className="min-w-full bg-white border border-gray-200 rounded-lg">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Name</th>
              <th className="py-2 px-4 border-b">Email</th>
              <th className="py-2 px-4 border-b">Role</th>
              <th className="py-2 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={index} className="text-center">
                <td className="py-2 px-4 border-b">{user.name}</td>
                <td className="py-2 px-4 border-b">{user.email}</td>
                <td className="py-2 px-4 border-b">{user.role}</td>
                <td className="py-2 px-4 border-b">
                  <button
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                    onClick={() => setSelectedUser(user)}
                  >
                    View/Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Modal */}
        {selectedUser && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-xl font-bold mb-4">User Information</h2>
              <p><strong>Name:</strong> {selectedUser.name}</p>
              <p><strong>Email:</strong> {selectedUser.email}</p>
              <p><strong>Current Role:</strong> {selectedUser.role}</p>
              <div className="mt-4">
                <label className="block font-semibold mb-2">Update Role</label>
                <select
                  value={newRole}
                  onChange={(e) => setNewRole(e.target.value)}
                  className="border border-gray-300 rounded px-4 py-2 w-full"
                >
                  <option value="">Select Role</option>
                  <option value="patient">Patient</option>
                  <option value="doctor">Doctor</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
              <div className="flex justify-end mt-4 space-x-2">
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded"
                  onClick={() => setSelectedUser(null)}
                >
                  Cancel
                </button>
                <button
                  className="bg-green-500 text-white px-4 py-2 rounded"
                  onClick={handleRoleUpdate}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
