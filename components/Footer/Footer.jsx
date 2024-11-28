export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-pink-200 to-yellow-200 text-gray-800 py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          {/* About Section */}
          <div>
            <h3 className="text-xl font-semibold text-yellow-600">About HealthCart</h3>
            <p className="mt-4 text-sm">
              HealthCart is your trusted partner in the digital healthcare journey.
              With a mission to provide accessible and affordable healthcare
              solutions, we empower individuals to take control of their well-being
              through technology and innovation.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-semibold text-yellow-600">Quick Links</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <a
                  href="#services"
                  className="text-sm hover:text-yellow-500 transition"
                >
                  Explore Services
                </a>
              </li>
              <li>
                <a
                  href="#privacy"
                  className="text-sm hover:text-yellow-500 transition"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="#terms"
                  className="text-sm hover:text-yellow-500 transition"
                >
                  Terms of Service
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className="text-sm hover:text-yellow-500 transition"
                >
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Section */}
          <div>
            <h3 className="text-xl font-semibold text-yellow-600">Get in Touch</h3>
            <p className="mt-4 text-sm">
              Email: <a href="mailto:info@healthcart.com" className="hover:text-yellow-500">ashishtiwari1332@gmail.com</a>
            </p>
            <p className="mt-2 text-sm">
              Phone: <a href="tel:+1234567890" className="hover:text-yellow-500">+1 234 567 890</a>
            </p>
            <div className="mt-4 flex justify-center md:justify-start space-x-4">
              <a
                href="#"
                className="text-gray-800 hover:text-yellow-500 transition"
                aria-label="Facebook"
              >
                <i className="fab fa-facebook text-lg"></i>
              </a>
              <a
                href="#"
                className="text-gray-800 hover:text-yellow-500 transition"
                aria-label="Twitter"
              >
                <i className="fab fa-twitter text-lg"></i>
              </a>
              <a
                href="#"
                className="text-gray-800 hover:text-yellow-500 transition"
                aria-label="Instagram"
              >
                <i className="fab fa-instagram text-lg"></i>
              </a>
              <a
                href="#"
                className="text-gray-800 hover:text-yellow-500 transition"
                aria-label="LinkedIn"
              >
                <i className="fab fa-linkedin text-lg"></i>
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-gray-300 pt-4 text-center">
          <p className="text-sm">
            &copy; {new Date().getFullYear()} <strong>HealthCart</strong>. All rights reserved.
          </p>
          <p className="mt-2 text-xs">
            Designed with care to bring you closer to better health.
          </p>
        </div>
      </div>
    </footer>
  );
}
