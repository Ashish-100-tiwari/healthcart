"use client";

import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar/Navbar";
import { useState, useEffect } from "react";
import Footer from "@/components/Footer/Footer";

export default function AdminDashboard() {
  const router = useRouter();
  const [userName, setUserName] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null); // For modal
  const [newRole, setNewRole] = useState(""); // Role to update
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    // Check authentication and role
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        setUserName(payload.name);
        setUserRole(payload.role);
        if (payload.role !== "admin") {
          router.push("/unauthorized");
        } else {
          fetchUsers(token);
        }
      } catch (error) {
        console.error("Error parsing token:", error);
        router.push("/login");
      }
    } else {
      router.push("/login");
    }
  }, []);

  // Fetch user data for admin
  const fetchUsers = async (token) => {
    try {
      const response = await fetch("/api/admin-dashboard", {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });
      const data = await response.json();
      if (data.success) {
        setUsers(data.users);
      } else {
        console.error("Error fetching users:", data.error);
        setError(data.error || "Failed to fetch users.");
      }
    } catch (error) {
      console.error("Error fetching users:", error);
      setError("An error occurred while fetching users.");
    }
  };

  // Handle role update
  const handleRoleUpdate = async () => {
    if (newRole === "") {
      setError("Please select a new role.");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      setError("Authentication token is missing.");
      return;
    }

    try {
      const response = await fetch("/api/update-role", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
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
        setNewRole("");
        setSuccess("User role updated successfully.");
        setError("");
      } else {
        console.error("Error updating role:", data.error);
        setError(data.error || "Failed to update role.");
        setSuccess("");
      }
    } catch (error) {
      console.error("Error updating role:", error);
      setError("An error occurred while updating the role.");
      setSuccess("");
    }
  };

  return (
    <>
      <Navbar userName={userName} userRole={userRole} />
      <div className="container mx-auto px-4 py-24  ">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Admin Dashboard</h1>

        {error && (
          <div className="bg-red-100 text-red-700 p-4 rounded mb-6 text-center">
            {error}
          </div>
        )}
        {success && (
          <div className="bg-green-100 text-green-700 p-4 rounded mb-6 text-center">
            {success}
          </div>
        )}

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-md rounded-lg">
            <thead>
              <tr>
                <th className="py-3 px-6 bg-gray-200 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                  Name
                </th>
                <th className="py-3 px-6 bg-gray-200 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                  Email
                </th>
                <th className="py-3 px-6 bg-gray-200 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                  Role
                </th>
                <th className="py-3 px-6 bg-gray-200 text-center text-xs font-medium text-gray-600 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {users.length > 0 ? (
                users.map((user) => (
                  <tr key={user._id} className="hover:bg-gray-100 transition">
                    <td className="py-4 px-6 text-sm text-gray-700">{user.name}</td>
                    <td className="py-4 px-6 text-sm text-gray-700">{user.email}</td>
                    <td className="py-4 px-6 text-sm text-gray-700 capitalize">{user.role}</td>
                    <td className="py-4 px-6 text-sm text-center">
                      <button
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
                        onClick={() => setSelectedUser(user)}
                      >
                        View/Edit
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="py-4 px-6 text-center text-gray-500">
                    No users found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Modal */}
        {selectedUser && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-md mx-4">
              <div className="flex justify-between items-center border-b p-4">
                <h2 className="text-xl font-semibold text-gray-800">Edit User Role</h2>
                <button
                  className="text-gray-600 hover:text-gray-800"
                  onClick={() => {
                    setSelectedUser(null);
                    setNewRole("");
                    setError("");
                    setSuccess("");
                  }}
                >
                  ✖
                </button>
              </div>
              <div className="p-6">
                <p className="mb-4"><strong>Name:</strong> {selectedUser.name}</p>
                <p className="mb-4"><strong>Email:</strong> {selectedUser.email}</p>
                <div className="mb-4">
                  <label htmlFor="role" className="block text-gray-700 font-medium mb-2">
                    Update Role
                  </label>
                  <select
                    id="role"
                    value={newRole}
                    onChange={(e) => setNewRole(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select Role</option>
                    <option value="patient">Patient</option>
                    <option value="doctor">Doctor</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>
                <div className="flex justify-end space-x-4">
                  <button
                    className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition"
                    onClick={() => {
                      setSelectedUser(null);
                      setNewRole("");
                      setError("");
                      setSuccess("");
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
                    onClick={handleRoleUpdate}
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer/>
    </>
  );
}
