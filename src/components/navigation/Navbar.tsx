
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, Facebook, Instagram, Youtube } from "lucide-react";
import MobileMenu from "./MobileMenu";
import Logo from "../common/Logo";
import { useFetch } from "../../hooks/request";
import _ from "lodash";

  const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const navigate = useNavigate();
  const isAuthenticated = !!localStorage.getItem("session");
  const { data } = useFetch("get_user_detail");
  const dashboardUrl = data?.user_group_id === 2 ? 'admin-dashboard' : 'user-dashboard';
   
  const handleLogout = () => {
    localStorage.removeItem("session");
    navigate("/signin");
  };
  
  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="container-custom py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          
          <Logo className="max-w-[150px]" />

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="font-medium hover:text-oneoffautos-blue transition-colors">
              Home
            </Link>
            <Link to="/listings" className="font-medium hover:text-oneoffautos-blue transition-colors">
              Listings
            </Link>
            <Link to="/sell-your-ride" className="font-medium hover:text-oneoffautos-blue transition-colors">
              Sell Your Ride
            </Link>
            <Link to="/about" className="font-medium hover:text-oneoffautos-blue transition-colors">
              About
            </Link>
            <Link to="/contact" className="font-medium hover:text-oneoffautos-blue transition-colors">
              Contact
            </Link>
          </nav>

          {/* Social and Mobile Menu Toggle */}
          <div className="flex items-center space-x-4">
            {/* Social Icons */}
            <div className="hidden md:flex items-center space-x-3">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-oneoffautos-blue transition-colors"
                aria-label="Facebook"
              >
                <Facebook size={20} />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-oneoffautos-blue transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
              <a
                href="https://tiktok.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-oneoffautos-blue transition-colors"
                aria-label="TikTok"
              >
                <Youtube size={20} />
              </a>
            </div>

            {/* CTA and Auth Buttons */}
            <div className="hidden md:flex items-center space-x-3 ml-4">
              {isAuthenticated ? (
                <>
                  <Link to={`/${dashboardUrl}`} className="btn-secondary">
                    Dashboard
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="px-4 py-2 border border-red-500 text-red-500 font-medium rounded-md hover:bg-red-500 hover:text-white transition-colors"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/signin"
                    className="px-4 py-2 border border-oneoffautos-blue text-oneoffautos-blue font-medium rounded-md hover:bg-oneoffautos-blue hover:text-white transition-colors"
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/signup"
                    className="px-4 py-2 bg-oneoffautos-blue text-white font-medium rounded-md hover:bg-blue-800 transition-colors"
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
            <button
              className="md:hidden text-gray-700 hover:text-oneoffautos-blue"
              onClick={toggleMobileMenu}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <MobileMenu isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
    </header>
  );
};

export default Navbar;
