import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const isAuthenticated = !!localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/signin");
  };

  return (
    <nav className="flex justify-between items-center px-6 py-4 shadow-md bg-white">
      <Link to="/" className="text-xl font-bold">OneOffAutos</Link>

      <div className="flex items-center space-x-4">
        <Link to="/listings">Listings</Link>
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>

        {isAuthenticated ? (
          <>
            <Link to="/sell-your-ride">Sell Your Ride</Link>
            <button
              onClick={handleLogout}
              className="text-red-500 hover:underline"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/signin">Login</Link>
            <Link to="/signup">Signup</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
