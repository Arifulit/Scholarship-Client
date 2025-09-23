import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaGithub } from "react-icons/fa";
import { FiMail, FiPhone, FiMapPin, FiArrowUp, FiAward } from "react-icons/fi";
import { Link } from "react-router-dom";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 text-white transition-colors duration-300">
      {/* Newsletter Section */}
      <div className="bg-gradient-to-r from-lime-500 to-emerald-500 py-12">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-2xl mx-auto">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Stay Updated with Latest Scholarships
            </h3>
            <p className="text-lime-100 mb-6">
              Get notified about new scholarship opportunities directly in your inbox
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <div className="relative flex-1">
                <FiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full pl-10 pr-4 py-3 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
                />
              </div>
              <button className="bg-white text-lime-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200 transform hover:scale-105">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand & About */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-r from-lime-500 to-emerald-500 rounded-lg flex items-center justify-center">
                <FiAward className="text-white text-xl" />
              </div>
              <h2 className="text-2xl font-bold">ScholarHub</h2>
            </div>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Your trusted platform for discovering scholarships and funding opportunities. 
              We connect students with life-changing educational opportunities worldwide.
            </p>
            <div className="flex space-x-4">
              {[
                { icon: FaFacebookF, href: "https://facebook.com", color: "hover:text-blue-400" },
                { icon: FaTwitter, href: "https://twitter.com", color: "hover:text-blue-400" },
                { icon: FaInstagram, href: "https://instagram.com", color: "hover:text-pink-400" },
                { icon: FaLinkedinIn, href: "https://linkedin.com", color: "hover:text-blue-400" },
                { icon: FaGithub, href: "https://github.com", color: "hover:text-gray-300" }
              ].map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-10 h-10 bg-gray-700 rounded-lg flex items-center justify-center text-gray-300 ${social.color} transition-all duration-200 transform hover:scale-110 hover:bg-gray-600`}
                >
                  <social.icon className="text-lg" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-white relative">
              Quick Links
              <div className="absolute bottom-0 left-0 w-8 h-0.5 bg-gradient-to-r from-lime-500 to-emerald-500 rounded-full"></div>
            </h3>
            <ul className="space-y-3">
              {[
                { name: "Home", path: "/" },
                { name: "All Scholarships", path: "/all-scholarship" },
                { name: "Dashboard", path: "/dashboard" },
                { name: "About Us", path: "/about" },
                { name: "Contact", path: "/contact" },
                { name: "Help Center", path: "/help" }
              ].map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.path}
                    className="text-gray-300 hover:text-lime-400 transition-colors duration-200 flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 bg-lime-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"></span>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-white relative">
              Categories
              <div className="absolute bottom-0 left-0 w-8 h-0.5 bg-gradient-to-r from-lime-500 to-emerald-500 rounded-full"></div>
            </h3>
            <ul className="space-y-3">
              {[
                "Engineering",
                "Medical",
                "Business",
                "Arts & Humanities",
                "Science",
                "Technology"
              ].map((category, index) => (
                <li key={index}>
                  <a
                    href="#"
                    className="text-gray-300 hover:text-lime-400 transition-colors duration-200 flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 bg-lime-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"></span>
                    {category}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-white relative">
              Contact Info
              <div className="absolute bottom-0 left-0 w-8 h-0.5 bg-gradient-to-r from-lime-500 to-emerald-500 rounded-full"></div>
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <div className="w-8 h-8 bg-lime-500 bg-opacity-20 rounded-lg flex items-center justify-center mt-0.5">
                  <FiMail className="text-lime-400 text-sm" />
                </div>
                <div>
                  <p className="text-gray-300 text-sm">Email</p>
                  <a href="mailto:support@scholarhub.com" className="text-white hover:text-lime-400 transition-colors duration-200">
                    support@scholarhub.com
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-8 h-8 bg-lime-500 bg-opacity-20 rounded-lg flex items-center justify-center mt-0.5">
                  <FiPhone className="text-lime-400 text-sm" />
                </div>
                <div>
                  <p className="text-gray-300 text-sm">Phone</p>
                  <a href="tel:+1-800-555-0199" className="text-white hover:text-lime-400 transition-colors duration-200">
                    +1-800-555-0199
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-8 h-8 bg-lime-500 bg-opacity-20 rounded-lg flex items-center justify-center mt-0.5">
                  <FiMapPin className="text-lime-400 text-sm" />
                </div>
                <div>
                  <p className="text-gray-300 text-sm">Address</p>
                  <p className="text-white">456 Learning Ave, Education City</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-700 bg-gray-900 dark:bg-gray-950">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex flex-col sm:flex-row items-center gap-4 text-sm text-gray-400">
              <p>&copy; {new Date().getFullYear()} ScholarHub. All rights reserved.</p>
              <div className="flex gap-4">
                <a href="#" className="hover:text-lime-400 transition-colors duration-200">Privacy Policy</a>
                <a href="#" className="hover:text-lime-400 transition-colors duration-200">Terms of Service</a>
                <a href="#" className="hover:text-lime-400 transition-colors duration-200">Cookie Policy</a>
              </div>
            </div>
            
            {/* Back to Top Button */}
            <button
              onClick={scrollToTop}
              className="bg-gradient-to-r from-lime-500 to-emerald-500 p-3 rounded-full text-white hover:from-lime-600 hover:to-emerald-600 transition-all duration-200 transform hover:scale-110 shadow-lg"
              aria-label="Back to top"
            >
              <FiArrowUp className="text-lg" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
