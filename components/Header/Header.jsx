"use client"
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

  // Calculate the transform styles for 3D effect
  const xRotation = (mousePosition.y - window.innerHeight / 2) / 20;
  const yRotation = (mousePosition.x - window.innerWidth / 2) / 20;

  return (
    <header
      className="bg-lightPink text-softWhite px-4 py-12 shadow-lg"
      style={{
        transform: `rotateX(${xRotation}deg) rotateY(${yRotation}deg)`,
        transition: "transform 0.1s ease-out",
      }}
    >
      <div className="container mx-auto text-center">
        <h1 className="text-4xl font-semibold mb-4">HealthCart</h1>
        <p className="text-lg font-medium">Your Health, Our Priority</p>
      </div>
    </header>
  );
}
