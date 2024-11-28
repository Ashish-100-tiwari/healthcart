"use client";

import Navbar from "@/components/Navbar/Navbar";
import { useState, useEffect } from "react";
export default function About() {
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
  return (
    
    <>
    <Navbar userName={userName} userRole={userRole} />
      <div className="min-h-screen bg-gray-50 flex flex-col items-center py-10 pt-32">
        <div className="max-w-4xl bg-white shadow-md rounded-lg p-8">
          <h1 className="text-4xl font-bold text-center text-blue-600 mb-6">
            About Us
          </h1>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Our Mission
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Our platform is designed to empower administrators with seamless
              access to critical data, efficient management tools, and an
              intuitive interface for overseeing operations. We aim to provide
              a secure, reliable, and user-friendly solution for administrators
              to perform their tasks with confidence.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Key Features
            </h2>
            <ul className="list-disc list-inside space-y-2 text-gray-600">
              <li>
                <strong>User Management:</strong> Easily manage users with
                role-based access control.
              </li>
              <li>
                <strong>Advanced Security:</strong> Utilize robust
                authentication and authorization mechanisms.
              </li>
              <li>
                <strong>Real-Time Insights:</strong> Stay updated with data to
                support informed decisions.
              </li>
              <li>
                <strong>Customizable Settings:</strong> Adapt the platform to
                meet specific needs.
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Behind the Technology
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Our dashboard is powered by modern web technologies to deliver a
              seamless experience:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-600 mt-4">
              <li>
                <strong>Authentication:</strong> Secure sessions with JWT
                (JSON Web Tokens).
              </li>
              <li>
                <strong>Backend:</strong> Middleware-driven architecture for
                role-based authorization.
              </li>
              <li>
                <strong>Frontend:</strong> Responsive, user-friendly design
                built with React and Tailwind CSS.
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Meet the Team
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Our team of developers, designers, and security experts are
              dedicated to delivering an exceptional platform tailored to your
              needs. From engineers to support staff, everyone plays a crucial
              role in ensuring your success.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Need Assistance?
            </h2>
            <p className="text-gray-600 leading-relaxed">
              If you need help or are experiencing issues, feel free to reach
              out to our support team through our{" "}
              <a
                href="#"
                className="text-blue-500 underline hover:text-blue-700"
              >
                Help Center
              </a>
              .
            </p>
          </section>
        </div>
      </div>
    </>
  );
}
