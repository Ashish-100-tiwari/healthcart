"use client";

import { useEffect, useState } from "react";

export default function Header() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const { clientX: x, clientY: y } = e;
    setMousePosition({ x, y });
  };

  useEffect(() => {
    document.addEventListener("mousemove", handleMouseMove);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const xRotation = (mousePosition.y - window.innerHeight / 2) / 20;
  const yRotation = (mousePosition.x - window.innerWidth / 2) / 20;

  return (
    <header
      className="relative bg-gradient-to-r from-yellow-400 via-orange-500 to-yellow-300 text-white px-6 py-16 shadow-lg overflow-hidden"
      style={{
        transform: `rotateX(${xRotation}deg) rotateY(${yRotation}deg)`,
        transition: "transform 0.1s ease-out",
      }}
    >
      <div className="container mx-auto text-center">
        <h1 className="text-5xl md:text-6xl font-bold mb-6 tracking-wide">
          Welcome to HealthCart
        </h1>
        <p className="text-lg md:text-xl font-medium max-w-3xl mx-auto">
          Revolutionizing healthcare in the digital world by connecting people
          with innovative health solutions. We are here to make healthcare
          accessible, affordable, and efficient for everyone.
        </p>

        <div className="mt-8 flex justify-center gap-4">
          <a
            href="#learn-more"
            className="px-6 py-3 bg-white text-yellow-500 font-semibold rounded-lg shadow-lg hover:bg-yellow-100 transition duration-300"
          >
            Learn More
          </a>
          <a
            href="#get-started"
            className="px-6 py-3 bg-yellow-600 text-white font-semibold rounded-lg shadow-lg hover:bg-yellow-700 transition duration-300"
          >
            Get Started
          </a>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-32 h-32 bg-yellow-300 rounded-full blur-2xl opacity-50 animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-48 h-48 bg-orange-400 rounded-full blur-3xl opacity-50 animate-pulse"></div>
    </header>
  );
}
