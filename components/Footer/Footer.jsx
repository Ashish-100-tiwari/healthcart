export default function Footer() {
  return (
    <footer className="bg-lightPink text-softWhite py-4 mt-8 shadow-md shadow-white">
      <div className="container mx-auto text-center">
        <div className="space-y-2">
          {/* Footer Links */}
          <div>
            <a href="#privacy" className="text-lg font-semibold hover:text-pink-700 mx-2">
              Privacy Policy
            </a>
            <a href="#terms" className="text-lg font-semibold hover:text-pink-700 mx-2">
              Terms of Service
            </a>
            <a href="#contact" className="text-lg font-semibold hover:text-pink-700 mx-2">
              Contact Us
            </a>
          </div>

          {/* Copyright Text */}
          <p className="mt-4 text-sm">
            &copy; {new Date().getFullYear()} HealthCart. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
