import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Navbar({ userName, userRole }) {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove token from localStorage
    window.location.reload();
  };

  return (
    <nav className="bg-lightPink text-softWhite px-4 py-3 shadow-md shadow-white fixed top-0 left-0 w-full z-50">
      <div className="container mx-auto flex justify-between items-center">
        {/* Left Section */}
        <div className="flex items-center space-x-4">
          <Image
            src="/health.png"
            alt="HealthCart Logo"
            width={60}
            height={60}
            className="rounded-full"
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

        {/* Right Section */}
        <div className="flex items-center space-x-4">
          {userRole && (
            <Link
              href={`/${userRole}-dashboard`}
              className="text-lg font-semibold hover:text-pink-700"
            >
              {`${userRole.charAt(0).toUpperCase() + userRole.slice(1)} Dashboard`}
            </Link>
          )}

          {userName ? (
            <>
              <span className="text-lg font-semibold text-pink-700">
                {userName}
              </span>
              <button
                onClick={handleLogout}
                className="text-lg font-semibold hover:text-red-600"
              >
                Logout
              </button>
            </>
          ) : (
            <Link href={`/login`} className="text-lg font-semibold hover:text-pink-700">
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
