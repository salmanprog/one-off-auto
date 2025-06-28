
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Facebook, Instagram, Youtube, Phone, Mail } from "lucide-react";
import Logo from "../common/Logo";
import { useFetch } from "../../hooks/request";

const Footer = () => {
  const [email, setEmail] = useState("");
  const { data, loading: fetchLoading } = useFetch("get_application_setting");
  const { loading, postData } = useFetch("user_subscribe", "submit");
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const fd = new FormData();
    fd.append("user_email",  email);
    console.log("Email submitted:", email);
    const callback = (receivedData) => {
    };
    postData(fd, callback);
    //setSubmitted(true);
    setEmail("");
  };
  return (
    <footer className="bg-oneoffautos-blue text-white">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo and About */}
          <div>
           <Logo className="max-w-[150px]" variant="white" />
            <p className="mt-4 text-gray-300">
              The premier marketplace for enthusiasts buying and selling unique modified vehicles.
            </p>
            <div className="flex mt-4 space-x-4">
              <a
                href={data?.fb_link}
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-white"
              >
                <Facebook size={20} />
              </a>
              <a
               href={data?.insta_link}
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-white"
              >
                <Instagram size={20} />
              </a>
              <a
               href={data?.youtube_link}
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-white"
              >
                <Youtube size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/listings" className="text-gray-300 hover:text-white transition-colors">
                  Browse Listings
                </Link>
              </li>
              <li>
                <Link to="/sell-your-ride" className="text-gray-300 hover:text-white transition-colors">
                  Sell Your Vehicle
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-300 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">Contact Us</h3>
            <ul className="space-y-2">
              <li className="flex items-center">
                <Phone size={16} className="mr-2" />
                <a href={`tel:${data?.phone_number}`} className="text-gray-300 hover:text-white transition-colors">
                {data?.phone_number}
                </a>
              </li>
              <li className="flex items-center">
                <Mail size={16} className="mr-2" />
                <a href={`mailto:${data?.email}`} className="text-gray-300 hover:text-white transition-colors">
                  {data?.email}
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-xl font-bold mb-4">Stay Updated</h3>
            <p className="text-gray-300 mb-2">
              Subscribe to our newsletter to get updates on new listings and automotive events.
            </p>
            <form onSubmit={handleSubmit} className="mt-2">
              <div className="flex">
                <input
                  type="email"
                  placeholder="Your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="p-2 w-full text-gray-800 rounded-l-md focus:outline-none"
                />
                <button
                  type="submit"
                  className="bg-oneoffautos-red hover:bg-red-700 text-white p-2 rounded-r-md"
                >
                  Subscribe
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-blue-700 mt-8 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} One Off Autos. All rights reserved.
            </p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <Link to="/privacy-policy" className="text-gray-400 hover:text-white text-sm">
                Privacy Policy
              </Link>
              <Link to="/terms-and-conditions" className="text-gray-400 hover:text-white text-sm">
                Terms and Conditions
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
