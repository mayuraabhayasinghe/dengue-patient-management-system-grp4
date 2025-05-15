import React, { useEffect, useRef, useState } from "react";
import logo from "../assets/images/logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleDown,
  faBars,
  faHamburger,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false); // Close dropdown if click is outside
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className="flex items-center justify-center bg-background-1 p-2 md:p-5">
      <div className="w-full md:w-[90%] lg:w-4/5 flex items-center justify-between relative">
        {/* logo */}
        <img src={logo} alt="" className="w-[20%] md:w-[12%]" />

        {/* nav-items */}
        <div className="hidden sm:hidden md:flex items-center justify-between gap-8">
          <p className="text-text-1 hover:text-primary-2">
            <Link to={"/"}>Home</Link>
          </p>
          <p className="text-text-1 hover:text-primary-2">
            <Link to={"/dashboard"}>Dashboard</Link>
          </p>
          <p className="text-text-1 hover:text-primary-2">
            <Link to={"/registration"}>Registration</Link>
          </p>
          <a
            href="#contact"
            className="text-text-1 hover:text-primary-2 cursor-pointer"
          >
            Contact
          </a>
        </div>

        {/* button */}
        <div className="flex flex-col md:flex-row relative">
          <button className="flex items-center justify-between gap-3 btn">
            <FontAwesomeIcon icon={faUser}></FontAwesomeIcon>
            <Link to={"/login"}> login</Link>
          </button>
        </div>

        {/* mobile menu */}
        <div className="md:hidden" ref={dropdownRef}>
          <FontAwesomeIcon
            onClick={() => setIsOpen((prev) => !prev)}
            className="text-4xl pr-5 cursor-pointer text-secondary-1"
            icon={faBars}
          ></FontAwesomeIcon>
          {isOpen ? (
            <div className="absolute bg-white right-5 my-3 flex flex-col items-center p-5 w-[150px] text-text-1 hover:text-primary-2 gap-5">
              <p className="text-text-1 hover:text-primary-2">
                <Link to={"/"}>Home</Link>
              </p>
              <p className="text-text-1 hover:text-primary-2">
                <Link to={"/dashboard"}>Dashboard</Link>
              </p>
              <p className="text-text-1 hover:text-primary-2">
                <Link to={"/registration"}>Registration</Link>
              </p>
              <a
                href="#contact"
                className="text-text-1 hover:text-primary-2 cursor-pointer"
              >
                Contact
              </a>
            </div>
          ) : null}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
