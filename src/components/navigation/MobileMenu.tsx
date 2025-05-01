
import React from "react";
import { Link } from "react-router-dom";
import { Facebook, Instagram, Youtube, X } from "lucide-react";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileMenu = ({ isOpen, onClose }: MobileMenuProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-gradient-to-b from-white to-oneoffautos-lightgray md:hidden">
      <div className="container-custom py-4 flex flex-col h-full">
        {/* Close button */}
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="p-2 rounded-full bg-oneoffautos-red text-white hover:bg-red-700 transition-colors"
            aria-label="Close menu"
          >
            <X size={24} />
          </button>
        </div>

        {/* Logo */}
        <div className="flex justify-center mb-8">
          <Link to="/" onClick={onClose} className="inline-block">
            <span className="text-2xl font-bold">
              <span className="text-oneoffautos-red">ONE</span>OFF<span className="text-oneoffautos-red">AUTOS</span>
            </span>
          </Link>
        </div>

        <nav className="flex flex-col space-y-4">
          <Link
            to="/"
            onClick={onClose}
            className="py-3 px-4 text-center font-medium text-gray-800 hover:text-oneoffautos-blue border-b border-gray-200 hover:bg-white/50 rounded-md transition-colors"
          >
            Home
          </Link>
          <Link
            to="/listings"
            onClick={onClose}
            className="py-3 px-4 text-center font-medium text-gray-800 hover:text-oneoffautos-blue border-b border-gray-200 hover:bg-white/50 rounded-md transition-colors"
          >
            Listings
          </Link>
          <Link
            to="/sell-your-ride"
            onClick={onClose}
            className="py-3 px-4 text-center font-medium text-gray-800 hover:text-oneoffautos-blue border-b border-gray-200 hover:bg-white/50 rounded-md transition-colors"
          >
            Sell Your Ride
          </Link>
          <Link
            to="/about"
            onClick={onClose}
            className="py-3 px-4 text-center font-medium text-gray-800 hover:text-oneoffautos-blue border-b border-gray-200 hover:bg-white/50 rounded-md transition-colors"
          >
            About
          </Link>
          <Link
            to="/contact"
            onClick={onClose}
            className="py-3 px-4 text-center font-medium text-gray-800 hover:text-oneoffautos-blue border-b border-gray-200 hover:bg-white/50 rounded-md transition-colors"
          >
            Contact
          </Link>
        </nav>

        <div className="mt-8 px-4">
          <Link
            to="/sell-your-ride"
            onClick={onClose}
            className="w-full text-center flex justify-center items-center py-3 px-6 bg-oneoffautos-red text-white rounded-md hover:bg-red-700 transition-colors font-medium shadow-sm"
          >
            Sell Your Ride
          </Link>
        </div>

        <div className="mt-auto mb-8">
          <p className="text-center text-gray-600 mb-4">Connect with us</p>
          <div className="flex justify-center space-x-6">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-oneoffautos-blue text-white p-3 rounded-full hover:bg-blue-800 transition-colors"
              aria-label="Facebook"
            >
              <Facebook size={20} />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-oneoffautos-blue text-white p-3 rounded-full hover:bg-blue-800 transition-colors"
              aria-label="Instagram"
            >
              <Instagram size={20} />
            </a>
            <a
              href="https://tiktok.com"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-oneoffautos-blue text-white p-3 rounded-full hover:bg-blue-800 transition-colors"
              aria-label="TikTok"
            >
              <Youtube size={20} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
