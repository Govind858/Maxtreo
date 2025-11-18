import React from "react";
import { FaWhatsapp, FaFacebook, FaInstagram, FaMapMarkerAlt } from "react-icons/fa";
import MapIframe from "./MapIframe";

function maxtreoFooter() {
  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Left Column: Logo, Description, and Map */}
          <div className="md:col-span-4">
            <div className="mb-6">
              <h2 className="text-2xl font-bold mb-2">maxtreo</h2>
              <p className="text-sm text-gray-300">Experience Maximum Tech with Maxtreo</p>
            </div>
            <div className="w-full">
              <MapIframe />
            </div>
          </div>

          {/* Right Columns: Links and Contact */}
          <div className="md:col-span-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Quick Links */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
                <ul className="space-y-2">
                  <li><a href="/about" className="text-sm text-gray-300 hover:text-white transition-colors">About</a></li>
                  <li><a href="/products" className="text-sm text-gray-300 hover:text-white transition-colors">Products</a></li>
                  <li><a href="/support" className="text-sm text-gray-300 hover:text-white transition-colors">Support</a></li>
                  <li><a href="/contact" className="text-sm text-gray-300 hover:text-white transition-colors">Contact</a></li>
                </ul>
              </div>

              {/* Categories */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Categories</h3>
                <ul className="space-y-2">
                  <li><a href="/gaming-pcs" className="text-sm text-gray-300 hover:text-white transition-colors">Gaming PCs</a></li>
                  <li><a href="/peripherals" className="text-sm text-gray-300 hover:text-white transition-colors">Peripherals</a></li>
                  <li><a href="/accessories" className="text-sm text-gray-300 hover:text-white transition-colors">Accessories</a></li>
                  <li><a href="/workstations" className="text-sm text-gray-300 hover:text-white transition-colors">Workstations</a></li>
                </ul>
              </div>

              {/* Contact & Social */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Connect With Us</h3>
                <div className="mb-4">
                  <div className="flex items-start space-x-2">
                    <FaMapMarkerAlt className="text-gray-400 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-300">Sreevalsam Building Temple By Pass Thodupuzha Near SBI</span>
                  </div>
                </div>
                <div className="flex space-x-4">
                  <a href="https://wa.me/917920938981" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-green-400 transition-colors text-xl">
                    <FaWhatsapp />
                  </a>
                  <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-blue-400 transition-colors text-xl">
                    <FaFacebook />
                  </a>
                  <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-pink-400 transition-colors text-xl">
                    <FaInstagram />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-gray-800 pt-6 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-300 mb-4 md:mb-0">&copy; 2025 maxtreo. All rights reserved.</p>
            <div className="flex space-x-6">
              <a href="/privacy" className="text-sm text-gray-300 hover:text-white transition-colors">Privacy Policy</a>
              <a href="/terms" className="text-sm text-gray-300 hover:text-white transition-colors">Terms of Service</a>
              <a href="/returns" className="text-sm text-gray-300 hover:text-white transition-colors">Returns</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default maxtreoFooter;