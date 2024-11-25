"use client";
import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import Navbar from "@/components/Navbar/Navbar";
import { useState, useEffect } from "react";

export default function Home() {
  const [userName, setUserName] = useState(null);
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        setUserName(payload.name);
        setUserRole(payload.role); // Extract and set the role from the token payload
      } catch (error) {
        console.error("Error parsing token:", error);
      }
    }
  }, []);

  return (
    <>
      <Navbar userName={userName} userRole={userRole} />
      <div className="bg-lightPink min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-4xl font-bold text-softWhite">Welcome to HealthCart</h1>
        <p className="text-lg text-gray-800 mt-4">
          Your health, our priority. Explore resources, connect with doctors, and more.
        </p>
      </div>
      <Header />
      <Footer />
    </>
  );
}
