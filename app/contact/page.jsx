"use client";

import Navbar from "@/components/Navbar/Navbar";
import { useState, useEffect } from "react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [successMessage, setSuccessMessage] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
const [userName, setUserName] = useState(null);
const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        setUserName(payload.name);
        setUserRole(payload.role);
      } catch (error) {
        console.error("Error parsing token:", error);
      }
    }
  }, []);
  const handleSubmit = (e) => {
    e.preventDefault();

    // Simulate form submission
    setTimeout(() => {
      setSuccessMessage("Thank you for reaching out! We'll get back to you soon.");
      setFormData({ name: "", email: "", message: "" });
    }, 1000);
  };

  return (
    <>
    <Navbar userName={userName} userRole={userRole} />
    <div className="bg-gradient-to-r from-pink-200 to-yellow-100 min-h-screen py-12 px-4 pt-32">
      <div className="container mx-auto max-w-4xl">
        <h1 className="text-4xl font-bold text-gray-800 text-center mb-8">
          Contact Us
        </h1>
        <p className="text-center text-gray-700 mb-12">
          Have a question, suggestion, or feedback? We'd love to hear from you.
          Fill out the form below, and we’ll get back to you as soon as possible!
        </p>

        <div className="bg-white shadow-lg rounded-lg p-6">
          {successMessage && (
            <div className="bg-green-100 text-green-800 p-4 rounded mb-6">
              {successMessage}
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="name"
                className="block text-gray-600 font-medium mb-2"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
                placeholder="Enter your full name"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-gray-600 font-medium mb-2"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
                placeholder="Enter your email address"
              />
            </div>

            <div>
              <label
                htmlFor="message"
                className="block text-gray-600 font-medium mb-2"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
                rows="5"
                placeholder="Write your message here"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-yellow-400 hover:bg-yellow-500 text-white font-bold py-3 rounded-lg shadow-md transition"
            >
              Submit
            </button>
          </form>
        </div>
      </div>

      {/* Additional Contact Info */}
      <div className="container mx-auto max-w-4xl text-center mt-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Our Contact Information
        </h2>
        <p className="text-gray-700 mb-6">
          Feel free to reach out to us directly via phone or email.
        </p>
        <ul className="space-y-3">
          <li className="text-lg text-gray-800">
            <strong>Email:</strong>{" "}
            <a
              href="mailto:info@healthcart.com"
              className="text-yellow-600 hover:underline"
            >
              ashishtiwari1332@gmail.com
            </a>
          </li>
          <li className="text-lg text-gray-800">
            <strong>Phone:</strong>{" "}
            <a href="tel:+1234567890" className="text-yellow-600 hover:underline">
              +7982015467
            </a>
          </li>
          <li className="text-lg text-gray-800">
            <strong>Address:</strong> New Delhi
          </li>
        </ul>
      </div>
    </div>
    </>
  );
}
