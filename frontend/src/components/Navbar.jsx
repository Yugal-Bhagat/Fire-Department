// import React from 'react'
// import { Link } from "react-router-dom";

// const Navbar = () => {
//   return (
//     <nav>
//       <ul>
//         <li><Link to="/">Home</Link></li>
//         {/* <li><Link to="/about">About</Link></li>
//         <li><Link to="/contact">Contact</Link></li> */}
//       </ul>
//     </nav>
//   );
// };

// export default Navbar;
import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import viteLogo from '/vite.svg'
const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo */}
        <div className="navbar-logo">
          <Link to="/">
            <img
              src={viteLogo}
              alt="Fire Department Logo"
            />
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

        {/* Desktop Navigation Links */}
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
          <Link to="/login" className="navbar-link">
            Login
          </Link>
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