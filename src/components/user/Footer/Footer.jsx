import React from 'react';
import { 
  Building, 
  Info, 
  User, 
  Shield, 
  Phone, 
  Mail, 
  MessageCircle, 
  CreditCard, 
  Smartphone, 
  IndianRupee, 
  Wallet, 
  Facebook, 
  Instagram, 
  Youtube,
  MapPin,
  Truck,
  Headphones,
  Package,
  ChevronRight
} from 'lucide-react';
import MapIframe from "./MapIframe";

const MaxtreoFooter = () => {
  return (
    <footer className="bg-gray-900 text-gray-200 py-8 lg:py-12 px-4">
      {/* Features Bar */}
      <div className="bg-gray-800 py-4 mb-6 lg:mb-8">
        <div className="container mx-auto">
          <div className="relative">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-4 pb-6 lg:pb-8">
              <div className="flex items-center space-x-3 lg:space-x-4">
                <Truck className="h-6 w-6 lg:h-7 lg:w-7 text-orange-500 flex-shrink-0" />
                <div>
                  <p className="text-base lg:text-xl font-semibold text-white">Free Shipping</p>
                  <p className="text-xs lg:text-sm text-gray-400">Across India</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 lg:space-x-4">
                <Headphones className="h-6 w-6 lg:h-7 lg:w-7 text-orange-500 flex-shrink-0" />
                <div>
                  <p className="text-base lg:text-lg font-semibold text-white">Customer Support</p>
                  <p className="text-xs lg:text-sm text-gray-400">Expert is here to help</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 lg:space-x-4">
                <CreditCard className="h-6 w-6 lg:h-7 lg:w-7 text-orange-500 flex-shrink-0" />
                <div>
                  <p className="text-base lg:text-lg font-semibold text-white">Online Payment</p>
                  <p className="text-xs lg:text-sm text-gray-400">100% Secure</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 lg:space-x-4">
                <Package className="h-6 w-6 lg:h-7 lg:w-7 text-orange-500 flex-shrink-0" />
                <div>
                  <p className="text-base lg:text-lg font-semibold text-white">Fast Delivery</p>
                  <p className="text-xs lg:text-sm text-gray-400">Fast & reliable</p>
                </div>
              </div>
            </div>
            
            <hr className="absolute bottom-0 left-0 w-full border-gray-600" />
          </div>
        </div>
      </div>

      {/* Main Footer Sections */}
     <div className="container mx-auto mb-6 lg:mb-8">
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6 lg:gap-8">
    {/* Nested Grid for About, Account, Policy */}
    <div className="md:col-span-2 lg:col-span-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        <div className="md:col-span-2 lg:col-span-2 space-y-4">
      <h3 className="flex items-center space-x-2 font-semibold text-white">
        <MapPin className="h-5 w-5 lg:h-6 lg:w-6" />
        <span className="text-base lg:text-lg">Location</span>
      </h3>
      <hr className="border-gray-600 pb-2" />
      <div className="space-y-2 text-sm">
        <p className="flex items-start space-x-2">
          <MapPin className="h-4 w-4 lg:h-5 lg:w-5 mt-0.5 flex-shrink-0" />
          <span className="text-xs lg:text-sm">
            Sreevalsam Building <br /> Temple By Pass <br /> Thodupuzha Near SBI
          </span>
        </p>
        <div className="w-full max-w-[140px] lg:max-w-[150px] h-14 lg:h-16 relative overflow-hidden rounded border border-gray-600">
          <MapIframe />
        </div>
      </div>
    </div>
        {/* About Section */}
        <div className="space-y-3 lg:space-y-4">
          <h3 className="flex items-center space-x-2 font-semibold text-white">
            <Building className="h-5 w-5 lg:h-6 lg:w-6" />
            <span className="text-base lg:text-lg">About</span>
          </h3>
          <hr className="border-gray-600" />
          <ul className="space-y-1 lg:space-y-2 text-xs lg:text-sm">
            <li>
              <a href="/about-us" className="flex items-center space-x-2 hover:text-white transition-colors w-full py-1">
                <ChevronRight className="h-3 w-3 lg:h-4 lg:w-4" />
                <span>About Us</span>
              </a>
            </li>
            <li>
              <a href="/bank-details" className="flex items-center space-x-2 hover:text-white transition-colors w-full py-1">
                <ChevronRight className="h-3 w-3 lg:h-4 lg:w-4" />
                <span>Bank Details</span>
              </a>
            </li>
            <li>
              <a href="/contact-us" className="flex items-center space-x-2 hover:text-white transition-colors w-full py-1">
                <ChevronRight className="h-3 w-3 lg:h-4 lg:w-4" />
                <span>Contact Us</span>
              </a>
            </li>
            <li>
              <a href="/our-presence" className="flex items-center space-x-2 hover:text-white transition-colors w-full py-1">
                <ChevronRight className="h-3 w-3 lg:h-4 lg:w-4" />
                <span>Our Presence</span>
              </a>
            </li>
          </ul>
        </div>

        {/* Account Section */}
        <div className="space-y-3 lg:space-y-4">
          <h3 className="flex items-center space-x-2 font-semibold text-white">
            <User className="h-5 w-5 lg:h-6 lg:w-6" />
            <span className="text-base lg:text-lg">Account</span>
          </h3>
          <hr className="border-gray-600" />
          <ul className="space-y-1 lg:space-y-2 text-xs lg:text-sm">
            <li>
              <a href="/my-account" className="flex items-center space-x-2 hover:text-white transition-colors w-full py-1">
                <ChevronRight className="h-3 w-3 lg:h-4 lg:w-4" />
                <span>My Account</span>
              </a>
            </li>
            <li>
              <a href="/order-history" className="flex items-center space-x-2 hover:text-white transition-colors w-full py-1">
                <ChevronRight className="h-3 w-3 lg:h-4 lg:w-4" />
                <span>Order History</span>
              </a>
            </li>
            <li>
              <a href="/track-order" className="flex items-center space-x-2 hover:text-white transition-colors w-full py-1">
                <ChevronRight className="h-3 w-3 lg:h-4 lg:w-4" />
                <span>Track Order</span>
              </a>
            </li>
            <li>
              <a href="/wish-list" className="flex items-center space-x-2 hover:text-white transition-colors w-full py-1">
                <ChevronRight className="h-3 w-3 lg:h-4 lg:w-4" />
                <span>Wish List</span>
              </a>
            </li>
          </ul>
        </div>

        {/* Policy Section */}
        <div className="space-y-3 lg:space-y-4">
          <h3 className="flex items-center space-x-2 font-semibold text-white">
            <Shield className="h-5 w-5 lg:h-6 lg:w-6" />
            <span className="text-base lg:text-lg">Policy</span>
          </h3>
          <hr className="border-gray-600" />
          <ul className="space-y-1 lg:space-y-2 text-xs lg:text-sm">
            <li>
              <a href="/privacy-policy" className="flex items-center space-x-2 hover:text-white transition-colors w-full py-1">
                <ChevronRight className="h-3 w-3 lg:h-4 lg:w-4" />
                <span>Privacy Policy</span>
              </a>
            </li>
            <li>
              <a href="/refund-policy" className="flex items-center space-x-2 hover:text-white transition-colors w-full py-1">
                <ChevronRight className="h-3 w-3 lg:h-4 lg:w-4" />
                <span>Refund Policy</span>
              </a>
            </li>
            <li>
              <a href="/shipping-policy" className="flex items-center space-x-2 hover:text-white transition-colors w-full py-1">
                <ChevronRight className="h-3 w-3 lg:h-4 lg:w-4" />
                <span>Shipping Policy</span>
              </a>
            </li>
            <li>
              <a href="/terms-conditions" className="flex items-center space-x-2 hover:text-white transition-colors w-full py-1">
                <ChevronRight className="h-3 w-3 lg:h-4 lg:w-4" />
                <span>Terms & Conditions</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</div>

      {/* Payment System and Social Links */}
      <div className="border-t border-gray-700 pt-6 lg:pt-8">
        <div className="flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0">
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4 text-white items-center">
            <h4 className="flex items-center space-x-2 font-medium text-sm lg:text-base">
              <CreditCard className="h-4 w-4 lg:h-5 lg:w-5" />
              <span>Payment System:</span>
            </h4>
            <div className="flex space-x-2 lg:space-x-3">
              <div className="p-1 lg:p-2 bg-gray-700 rounded flex items-center justify-center" title="UPI">
                <Smartphone className="h-4 w-4 lg:h-5 lg:w-5" />
              </div>
              <div className="p-1 lg:p-2 bg-gray-700 rounded flex items-center justify-center" title="Visa">
                <CreditCard className="h-4 w-4 lg:h-5 lg:w-5" />
              </div>
              <div className="p-1 lg:p-2 bg-gray-700 rounded flex items-center justify-center" title="RuPay">
                <IndianRupee className="h-4 w-4 lg:h-5 lg:w-5" />
              </div>
              <div className="p-1 lg:p-2 bg-gray-700 rounded flex items-center justify-center" title="Paytm">
                <Wallet className="h-4 w-4 lg:h-5 lg:w-5" />
              </div>
            </div>
          </div>

          <div className="flex space-x-3 lg:space-x-4">
            <h4 className="sr-only">Our Social Links:</h4>
            <a href="https://facebook.com" className="p-2 hover:bg-gray-700 rounded transition-colors" aria-label="Facebook" target="_blank" rel="noopener noreferrer">
              <Facebook className="h-4 w-4 lg:h-5 lg:w-5" />
            </a>
            <a href="https://instagram.com" className="p-2 hover:bg-gray-700 rounded transition-colors" aria-label="Instagram" target="_blank" rel="noopener noreferrer">
              <Instagram className="h-4 w-4 lg:h-5 lg:w-5" />
            </a>
            <a href="https://youtube.com" className="p-2 hover:bg-gray-700 rounded transition-colors" aria-label="YouTube" target="_blank" rel="noopener noreferrer">
              <Youtube className="h-4 w-4 lg:h-5 lg:w-5" />
            </a>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-gray-700 pt-4 mt-6 lg:mt-8 text-center">
        <p className="text-xs lg:text-sm text-gray-400">&copy; 2025 maxtreo. All rights reserved.</p>
        <div className="flex flex-col sm:flex-row justify-center space-y-1 sm:space-y-0 sm:space-x-4 lg:space-x-6 mt-2">
          <a href="/privacy" className="text-xs lg:text-sm hover:text-white transition-colors">Privacy Policy</a>
          <a href="/terms" className="text-xs lg:text-sm hover:text-white transition-colors">Terms of Service</a>
          <a href="/returns" className="text-xs lg:text-sm hover:text-white transition-colors">Returns</a>
        </div>
      </div>
    </footer>
  );
};

export default MaxtreoFooter;