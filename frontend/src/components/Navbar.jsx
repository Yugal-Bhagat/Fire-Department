import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./Navbar.css";
import viteLogo from "/vite.svg";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate()

  // Toggle menu for mobile view
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Check if the user is on the Admin/User dashboard
  const isDashboard =
    location.pathname === "/admin-dashboard" || location.pathname === "/user-dashboard";

  // Logout function (for future authentication integration)
  const handleLogout = () => {
    console.log("User logged out");
    navigate("/login")
    // Add logout logic here (e.g., clear token, redirect, etc.)
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo */}
        <div className="navbar-logo">
          <Link to="/">
            <img src={viteLogo} alt="Fire Department Logo" />
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="navbar-mobile-menu" onClick={toggleMenu}>
          <div className={`menu-icon ${isMenuOpen ? "open" : ""}`}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>

        {/* Navigation Links */}
        <div className={`navbar-links ${isMenuOpen ? "active" : ""}`}>
          <Link to="/" className="navbar-link">
            Home
          </Link>
          <Link to="/apply-noc" className="navbar-link">
            Apply for NOC
          </Link>
          <Link to="/track-application" className="navbar-link">
            Track Application
          </Link>
          <Link to="/contact" className="navbar-link">
            Contact Us
          </Link>

          {/* Conditionally Render Login/Logout Button */}
          {isDashboard ? (
            <button onClick={handleLogout} className="navbar-link logout-button">
              Logout
            </button>
          ) : (
            <Link to="/login" className="navbar-link">
              Login
            </Link>
          )}
        </div>

        {/* Emergency Contact Button */}
        <div className="navbar-emergency">
          <Link to="/emergency-contact" className="emergency-button">
            Emergency Contact
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
