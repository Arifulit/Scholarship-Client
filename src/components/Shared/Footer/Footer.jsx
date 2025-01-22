// const Footer = () => {
//   return (
//     <footer className='px-4 divide-y  text-gray-800 relative bottom-0 left-0'>
//       <div className='py-6 text-sm text-center text-gray-400'>
//         © 2024-2025 PlantNet Inc. All rights reserved.
//       </div>
//     </footer>
//   )
// }

// export default Footer




import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8 mt-4">
      <div className="container mx-auto px-4">
        {/* Footer Top */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo & About */}
          <div>
            <h2 className="text-xl font-semibold mb-4">MediCart</h2>
            <p className="text-gray-300">
              Your trusted multi-vendor platform for medicines and healthcare products.
            </p>
          </div>

          {/* Navigation Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul>
              <li>
                <a href="/" className="text-gray-300 hover:text-white">
                  Home
                </a>
              </li>
              <li>
                <a href="/shop" className="text-gray-300 hover:text-white">
                  Shop
                </a>
              </li>
              <li>
                <a href="/cart" className="text-gray-300 hover:text-white">
                  Cart
                </a>
              </li>
              <li>
                <a href="/dashboard" className="text-gray-300 hover:text-white">
                  Dashboard
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul>
              <li>
                <p className="text-gray-300">Email: support@medicart.com</p>
              </li>
              <li>
                <p className="text-gray-300">Phone: +1-800-555-0199</p>
              </li>
              <li>
                <p className="text-gray-300">Address: 123 Health St, Wellness City</p>
              </li>
            </ul>
          </div>

          {/* Social Media Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-white text-2xl"
              >
                <FaFacebookF />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-white text-2xl"
              >
                <FaTwitter />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-white text-2xl"
              >
                <FaInstagram />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-white text-2xl"
              >
                <FaLinkedinIn />
              </a>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-gray-700 mt-8 pt-4 text-center">
          <p className="text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} MediCart. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
