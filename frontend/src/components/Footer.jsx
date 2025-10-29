import React from "react";
import { assets } from "../assets/assets";
import { NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-300 mt-20 rounded-t-[10px]">

      <div className="max-w-7xl mx-auto px-6 py-12 grid gap-10 md:grid-cols-[2fr_1fr]">
        
        {/* Left Section - Logo & About */}
        <div>
          <img className="mb-5 w-40 brightness-200" src={assets.logo} alt="DocOnTap Logo" />
          <p className="text-sm leading-6 opacity-80 md:w-4/5">
            DocOnTap is your trusted platform for booking doctor appointments easily,
            anytime, anywhere. We connect patients with verified healthcare professionals
            across specialties. With support for 15+ Indian languages, we break down
            barriers so quality healthcare is just a tap away.
          </p>
        </div>

        {/* Right Section - Links & Contact stacked */}
        <div className="flex flex-col sm:flex-row md:flex-col lg:flex-row gap-12 justify-end">
          
          {/* Company Links */}
          <div>
            <p className="text-lg font-semibold mb-4 text-white">Company</p>
            <ul className="space-y-2">
              <li>
                <NavLink 
                  to="/about" 
                  className="hover:text-teal-400 transition-colors duration-200"
                >
                  About Us
                </NavLink>
              </li>
              <li>
                <NavLink 
                  to="/contact" 
                  className="hover:text-teal-400 transition-colors duration-200"
                >
                  Contact
                </NavLink>
              </li>
              <li>
                <NavLink 
                  to="/" 
                  className="hover:text-teal-400 transition-colors duration-200"
                >
                  Get in Touch
                </NavLink>
              </li>
              <li className="hover:text-teal-400 transition-colors duration-200">
                Privacy Policy
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <p className="text-lg font-semibold mb-4 text-white">Get in Touch</p>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 hover:text-teal-400 transition-colors duration-200">
                📞 +91-0674-456-7890
              </li>
              <li className="flex items-center gap-2 hover:text-teal-400 transition-colors duration-200">
  ✉️ <a href="mailto:docontap.dev@gmail.com" className="hover:text-teal-400 transition-colors duration-200">docontap.dev@gmail.com</a>
</li>
            </ul>
          </div>

        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700 text-center py-4 text-sm opacity-70">
        © {new Date().getFullYear()} Docontap.com — All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
