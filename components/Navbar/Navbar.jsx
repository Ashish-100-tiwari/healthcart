import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Navbar({ userName, userRole }) {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  return (
    <nav className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-4 py-3 shadow-md fixed top-0 left-0 w-full z-50">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo and Home */}
        <div className="flex items-center space-x-4">
          <Image
            src="/health.png"
            alt="HealthCart Logo"
            width={50}
            height={50}
            className="rounded-full"
          />
          <Link
            href="/"
            className="text-xl font-bold hover:text-yellow-200 transition duration-200"
          >
            HealthCart
          </Link>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-6">
          <Link
            href="/"
            className="hover:text-yellow-200 text-lg font-semibold transition duration-200"
          >
            Home
          </Link>
          <Link
            href="/about"
            className="hover:text-yellow-200 text-lg font-semibold transition duration-200"
          >
            About
          </Link>
          <Link
            href="/contact"
            className="hover:text-yellow-200 text-lg font-semibold transition duration-200"
          >
            Contact
          </Link>
          {userRole && (
            <Link
              href={`/${userRole}-dashboard`}
              className="hover:text-yellow-200 text-lg font-semibold transition duration-200"
            >
              {`${userRole.charAt(0).toUpperCase() + userRole.slice(1)} Dashboard`}
            </Link>
          )}
          {userName ? (
            <>
              <span className="text-lg font-semibold">{userName}</span>
              <button
                onClick={handleLogout}
                className="hover:text-yellow-200 text-lg font-semibold transition duration-200"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              href="/login"
              className="hover:text-yellow-200 text-lg font-semibold transition duration-200"
            >
              Login
            </Link>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden focus:outline-none text-xl"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? "✖" : "☰"}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="mt-4 bg-yellow-500 md:hidden flex flex-col space-y-3 p-4 rounded-lg shadow-lg">
          <Link
            href="/"
            className="hover:bg-yellow-600 text-lg font-semibold rounded-md p-2"
            onClick={() => setIsMenuOpen(false)}
          >
            Home
          </Link>
          <Link
            href="/about"
            className="hover:bg-yellow-600 text-lg font-semibold rounded-md p-2"
            onClick={() => setIsMenuOpen(false)}
          >
            About
          </Link>
          <Link
            href="/contact"
            className="hover:bg-yellow-600 text-lg font-semibold rounded-md p-2"
            onClick={() => setIsMenuOpen(false)}
          >
            Contact
          </Link>
          {userRole && (
            <Link
              href={`/${userRole}-dashboard`}
              className="hover:bg-yellow-600 text-lg font-semibold rounded-md p-2"
              onClick={() => setIsMenuOpen(false)}
            >
              {`${userRole.charAt(0).toUpperCase() + userRole.slice(1)} Dashboard`}
            </Link>
          )}
          {userName ? (
            <>
              <span className="text-lg font-semibold">{userName}</span>
              <button
                onClick={() => {
                  handleLogout();
                  setIsMenuOpen(false);
                }}
                className="hover:bg-yellow-600 text-lg font-semibold rounded-md p-2"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              href="/login"
              className="hover:bg-yellow-600 text-lg font-semibold rounded-md p-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Login
            </Link>
          )}
        </div>
      )}
    </nav>
  );
}
