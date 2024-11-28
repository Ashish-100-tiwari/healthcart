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
        setUserRole(payload.role);
      } catch (error) {
        console.error("Error parsing token:", error);
      }
    }
  }, []);

  return (
    <>
      <Navbar userName={userName} userRole={userRole} />
      <main className="bg-gradient-to-r from-pink-100 to-yellow-50 min-h-screen">
        {/* <Header /> */}
        <section className="text-gray-800 px-6 py-16 lg:py-24">
          <div className="container mx-auto max-w-5xl text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-yellow-600">
              Welcome to HealthCart
            </h1>
            <p className="mt-6 text-lg md:text-xl text-gray-700">
              At HealthCart, we are transforming healthcare by leveraging
              cutting-edge technology to bridge gaps in accessibility and
              affordability. Our mission is to make quality healthcare
              accessible to everyone, regardless of location, time, or resources.
            </p>
            <div className="mt-8 flex justify-center space-x-4">
              <a
                href="#services"
                className="px-6 py-3 bg-yellow-500 text-white font-semibold rounded-lg shadow-md hover:bg-yellow-600 transition duration-300"
              >
                Explore Services
              </a>
              <a
                href="#contact"
                className="px-6 py-3 bg-white text-yellow-500 border border-yellow-500 font-semibold rounded-lg shadow-md hover:bg-yellow-100 transition duration-300"
              >
                Contact Us
              </a>
            </div>
          </div>
        </section>

        <section id="services" className="py-16 bg-white text-gray-800">
          <div className="container mx-auto max-w-6xl px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-pink-500">
              Why HealthCart Matters in the Digital World
            </h2>
            <p className="mt-4 text-lg md:text-xl">
              The healthcare industry is evolving rapidly, and digital platforms
              like HealthCart are at the forefront of this revolution. Here's
              why HealthCart is indispensable:
            </p>
            <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="p-6 border rounded-lg shadow hover:shadow-lg transition">
                <h3 className="text-xl font-semibold text-yellow-600">
                  Accessibility
                </h3>
                <p className="mt-2">
                  With HealthCart, users can access healthcare services from
                  anywhere, whether it’s urban cities or remote villages.
                </p>
              </div>
              <div className="p-6 border rounded-lg shadow hover:shadow-lg transition">
                <h3 className="text-xl font-semibold text-yellow-600">
                  Affordability
                </h3>
                <p className="mt-2">
                  Our platform ensures cost-effective solutions without
                  compromising on the quality of care.
                </p>
              </div>
              <div className="p-6 border rounded-lg shadow hover:shadow-lg transition">
                <h3 className="text-xl font-semibold text-yellow-600">
                  Convenience
                </h3>
                <p className="mt-2">
                  Schedule appointments, order medicines, and consult with
                  experts—all from the comfort of your home.
                </p>
              </div>
              <div className="p-6 border rounded-lg shadow hover:shadow-lg transition">
                <h3 className="text-xl font-semibold text-yellow-600">
                  Data-Driven Insights
                </h3>
                <p className="mt-2">
                  Our advanced analytics provide actionable insights to improve
                  health outcomes.
                </p>
              </div>
              <div className="p-6 border rounded-lg shadow hover:shadow-lg transition">
                <h3 className="text-xl font-semibold text-yellow-600">
                  Empowering Communities
                </h3>
                <p className="mt-2">
                  We empower individuals with knowledge, helping them take
                  control of their health journeys.
                </p>
              </div>
              <div className="p-6 border rounded-lg shadow hover:shadow-lg transition">
                <h3 className="text-xl font-semibold text-yellow-600">
                  Sustainability
                </h3>
                <p className="mt-2">
                  Digital solutions reduce the carbon footprint of traditional
                  healthcare systems.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section
          id="contact"
          className="py-16 bg-gradient-to-r from-pink-50 to-yellow-100 text-gray-800"
        >
          <div className="container mx-auto max-w-4xl px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-yellow-600">
              Ready to Start Your Health Journey?
            </h2>
            <p className="mt-4 text-lg md:text-xl">
              Join HealthCart today and be a part of the digital healthcare
              revolution. Let's make a healthier world together.
            </p>
            <a
              href="/signup"
              className="inline-block mt-8 px-8 py-4 bg-yellow-500 text-white font-semibold rounded-lg shadow-md hover:bg-yellow-600 transition duration-300"
            >
              Sign Up Now
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
