import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-lightPink text-softWhite px-4 py-3 shadow-md shadow-white fixed top-0 left-0 w-full z-50">
      <div className="container mx-auto flex justify-between items-center">
        {/* Left Side: Logo and Links */}
        <div className="flex items-center space-x-4">
          <Image
            src="/health.png" // Path to your logo
            alt="HealthCart Logo"
            width={60}  // Increase size as needed
            height={60} // Increase size as needed
            className="rounded-full"  // Make the logo round
          />
          <Link href="#" className="text-lg p-3 font-semibold hover:text-pink-700">
            Home
          </Link>
          <Link href="#about" className="text-lg font-semibold hover:text-pink-700">
            About
          </Link>
          <Link href="#contact" className="text-lg font-semibold hover:text-pink-700">
            Contact
          </Link>
        </div>

        {/* Right Side: Login */}
        <div className="flex items-center">
          <button className="text-lg font-semibold hover:text-pink-700">
            Login
          </button>
        </div>
      </div>
    </nav>
  );
}
