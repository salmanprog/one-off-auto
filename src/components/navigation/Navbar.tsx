
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, Facebook, Instagram, Youtube, Bell } from "lucide-react";
import MobileMenu from "./MobileMenu";
import Logo from "../common/Logo";
import { useFetch } from "../../hooks/request";
import { useSocket } from "../sockets/SocketContext"; // Import socket from context
import _ from "lodash";
import Helper from "../../helpers";

  const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [totalUnreadMessages, setTotalUnreadMessages] = useState(0);
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };
  const socket = useSocket();
  const navigate = useNavigate();
   const isAuthenticated = !!localStorage.getItem("session");
   const authUser = Helper.getStorageData("session");
   let dashboardUrl = '';
   let loginName = '';
   let user_group = 0;
   useEffect(() => {
    if (socket && isAuthenticated) {
      socket.on('_read_unread_messages', (unreadMessage: ChatMessage) => {
        if (unreadMessage.data?.total_messages) {
          if (unreadMessage.data?.user_id == authUser?.id) {
              setTotalUnreadMessages(unreadMessage.data?.total_messages)
          }
        }
      });

      socket.on('_read_messages', (myUnreadMessage: ChatMessage) => {
        if (myUnreadMessage.data?.total_messages) {
          console.log('_read_messages.data?.user_id',authUser?.id)
              setTotalUnreadMessages(myUnreadMessage.data?.total_messages)
        }
      });
      // // Cleanup when the component unmounts
      return () => {
        socket.off('_read_unread_messages');
        socket.off('_read_messages');
      };
    }
  }, [socket, isAuthenticated]);
  if(isAuthenticated){
    const { data } = useFetch("get_user_detail");
    const { data:chat_messages } = useFetch("chat_unread_messages");
    dashboardUrl = data?.user_group_id === 2 ? 'admin-dashboard' : 'user-dashboard';
    loginName = data?.info.name
    user_group = data?.user_group_id
    useEffect(() => {
      if (chat_messages?.total_messages !== undefined) {
        setTotalUnreadMessages(chat_messages.total_messages);
      }
    }, [chat_messages]);
 } 
 
  const { data:site_setting } = useFetch("get_application_setting");
  const handleLogout = () => {
    localStorage.removeItem("session");
    navigate("/signin");
  };
  
  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="container-custom py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          
          <Logo className="max-w-[150px]" width={150} height={150} />

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
                href={site_setting?.fb_link} 
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-oneoffautos-blue transition-colors"
                aria-label="Facebook"
              >
                <Facebook size={20} />
              </a>
              <a
                href={site_setting?.insta_link}
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-oneoffautos-blue transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
              <a
                href={site_setting?.youtube_link}
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-oneoffautos-blue transition-colors"
                aria-label="TikTok"
              >
                <Youtube size={20} />
              </a>
              {isAuthenticated && user_group !== 2 && (
                <a
                  href={`/${dashboardUrl}/messages`}
                  rel="noopener noreferrer"
                  className="relative text-gray-600 hover:text-oneoffautos-blue transition-colors"
                  aria-label="Notification"
                >
                  <Bell size={20} />
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-semibold px-[6px] py-[1px] rounded-full">
                    {totalUnreadMessages}
                  </span>
                </a>
              )}
            </div>

            {/* CTA and Auth Buttons */}
            <div className="hidden md:flex items-center space-x-3 ml-4">
              {isAuthenticated ? (
                <>
                   
                  <Link to={`/${dashboardUrl}`} className="btn-secondary">
                  Welcome, {`${loginName}`}
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
