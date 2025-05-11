import React, { useEffect, useRef, useState } from "react";
import logo from "../../../Client/src/assets/images/logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faTachometerAlt,
  faUsers,
  faChartLine,
  faSignOutAlt,
  faUser,
  faHome,
  faBook,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className="flex items-center justify-center bg-teal-700 p-2 md:p-5 text-white">
      <div className="w-full md:w-[90%] lg:w-4/5 flex items-center justify-between relative">
        {/* Logo */}
        <img src={logo} alt="DengueGuard Logo" className="w-[20%] md:w-[12%]" />

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center justify-between gap-8">
          <LinkItem icon={faHome} label="Home" to="/admin" />
          <LinkItem
            icon={faTachometerAlt}
            label="Dashboard"
            to="/admin/dashboard"
          />
          <LinkItem icon={faUsers} label="Users" to="/admin/users" />
          <LinkItem icon={faChartLine} label="Reports" to="/admin/reports" />
          <LinkItem icon={faBook} label="Feedbacks" to="/feedback" />
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden" ref={dropdownRef}>
          <FontAwesomeIcon
            onClick={() => setIsOpen(!isOpen)}
            className="text-3xl pr-3 cursor-pointer text-white"
            icon={faBars}
          />
          {isOpen && (
            <div className="absolute right-0 mt-3 bg-white text-teal-800 rounded shadow-lg w-[180px] flex flex-col items-start p-4 space-y-4 z-50">
              <MobileLinkItem
                icon={faTachometerAlt}
                label="Dashboard"
                to="/admin/dashboard"
              />
              <MobileLinkItem icon={faUsers} label="Users" to="/admin/users" />
              <MobileLinkItem
                icon={faChartLine}
                label="Reports"
                to="/admin/reports"
              />
              <MobileLinkItem icon={faSignOutAlt} label="Logout" to="/logout" />
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

// Desktop Link Item
const LinkItem = ({ icon, label, to }) => (
  <Link
    to={to}
    className="flex items-center gap-2 hover:text-yellow-300 transition">
    <FontAwesomeIcon icon={icon} />
    <span>{label}</span>
  </Link>
);

// Mobile Link Item
const MobileLinkItem = ({ icon, label, to }) => (
  <Link
    to={to}
    className="flex items-center gap-2 hover:text-teal-600 transition w-full"
    onClick={() => window.scrollTo(0, 0)}>
    <FontAwesomeIcon icon={icon} />
    <span>{label}</span>
  </Link>
);

export default Navbar;
