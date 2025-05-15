import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/images/logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faUser,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";
import { getUser, isLoggedIn, logout } from "../../../Server/utils/auth";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const user = getUser();

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
        setShowDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleProtectedClick = (route) => {
    if (!isLoggedIn()) {
      setShowDropdown(true);
      setTimeout(() => setShowDropdown(false), 2000);
    } else {
      navigate(route);
    }
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <nav className="flex items-center justify-center bg-background-1 py-5 p-2 md:p-5">
      <div className="w-full md:w-[90%] lg:w-4/5 flex items-center justify-between relative">
        {/* Logo */}
        <img src={logo} alt="Logo" className="w-[20%] md:w-[12%]" />

        {/* Desktop Navigation */}
        <div className="hidden sm:hidden md:flex items-center justify-between gap-8">
          <Link className="text-text-1 hover:text-primary-2" to="/">
            Home
          </Link>

          {user?.role !== "patient" ? (
            <p
              className="text-text-1 hover:text-primary-2 cursor-pointer"
              onClick={() => handleProtectedClick("/dashboard")}>
              Dashboard
            </p>
          ) : (
            <p
              className="text-text-1 hover:text-primary-2 cursor-pointer"
              onClick={() => handleProtectedClick("/patient-dashboard")}>
              Dashboard
            </p>
          )}

          {user?.role === "patient" ? (
            <Link className="text-text-1 hover:text-primary-2" to="/reports">
              Reports
            </Link>
          ) : (
            <p
              className="text-text-1 hover:text-primary-2 cursor-pointer"
              onClick={() => handleProtectedClick("/registration")}>
              Registration
            </p>
          )}

          <a
            href="#contact"
            className="text-text-1 hover:text-primary-2 cursor-pointer">
            Contact
          </a>
        </div>

        {/* Auth Button */}
        <div className="flex flex-col md:flex-row relative text-sm md:text-sm">
          {isLoggedIn() ? (
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 btn">
              <FontAwesomeIcon icon={faSignOutAlt} />
              Logout
            </button>
          ) : (
            <Link to="/login">
              <button className="flex items-center gap-2 btn">
                <p>Log In</p>
                <FontAwesomeIcon icon={faUser} />
              </button>
            </Link>
          )}

          {/* Show dropdown message if not logged in */}
          {showDropdown && (
            <div className="absolute top-full mt-2 w-fit left-[-100%] bg-white border border-gray-300 text-red-600 px-4 py-2 rounded shadow-md text-sm">
              Please log in first.
            </div>
          )}
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden" ref={dropdownRef}>
          <FontAwesomeIcon
            onClick={() => setIsOpen((prev) => !prev)}
            className="text-2xl md:text-4xl pr-5 cursor-pointer text-secondary-1"
            icon={faBars}
          />
          {isOpen && (
            <div className="absolute bg-white right-5 my-3 flex flex-col items-center p-5 w-[150px] text-text-1 gap-4 shadow-md rounded-md z-50">
              <Link className="text-text-1 hover:text-primary-2" to="/">
                Home
              </Link>

              {user?.role !== "patient" ? (
                <p
                  className="text-text-1 hover:text-primary-2 cursor-pointer"
                  onClick={() => handleProtectedClick("/dashboard")}>
                  Dashboard
                </p>
              ) : (
                <p
                  className="text-text-1 hover:text-primary-2 cursor-pointer"
                  onClick={() => handleProtectedClick("/patient-dashboard")}>
                  Dashboard
                </p>
              )}

              {user?.role === "patient" ? (
                <Link
                  className="text-text-1 hover:text-primary-2"
                  to="/reports">
                  Reports
                </Link>
              ) : (
                <p
                  className="text-text-1 hover:text-primary-2 cursor-pointer"
                  onClick={() => handleProtectedClick("/registration")}>
                  Registration
                </p>
              )}

              <a
                href="#contact"
                className="text-text-1 hover:text-primary-2 cursor-pointer">
                Contact
              </a>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
