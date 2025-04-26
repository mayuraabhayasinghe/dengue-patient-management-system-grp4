import React, { useState, useEffect } from "react";
import logo from "../assets/images/logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faBars, faUser } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-scroll";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [userType, setUserType] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Detect scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Cleanup
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav
      className={`fixed top-0 w-full z-50 flex items-center justify-center p-2 md:p-5 transition-all duration-300 ${
        isScrolled ? "bg-white shadow-md" : "bg-background-1"
      }`}>
      <div className="w-full md:w-[90%] lg:w-4/5 flex items-center justify-between relative">
        {/* logo */}
        <img src={logo} alt="" className="w-[20%] md:w-[12%]" />

        {/* nav-items */}
        <div className="hidden sm:hidden md:flex items-center justify-between gap-8">
          <p className="text-text-1 hover:text-primary-2">
            <Link
              to="home"
              smooth={true}
              duration={500}
              offset={-100}
              className="cursor-pointer">
              Home
            </Link>
          </p>
          <p className="text-text-1 hover:text-primary-2">
            <Link
              to="about"
              smooth={true}
              duration={500}
              offset={-100}
              className="cursor-pointer">
              About Us
            </Link>
          </p>
          <p className="text-text-1 hover:text-primary-2">
            <Link
              to="services"
              smooth={true}
              duration={500}
              offset={-100}
              className="cursor-pointer">
              Services
            </Link>
          </p>
          <p className="text-text-1 hover:text-primary-2">
            <Link
              to="contact"
              smooth={true}
              duration={500}
              offset={-100}
              className="cursor-pointer">
              Contact
            </Link>
          </p>
        </div>

        {/* button */}
        <div className="flex flex-col md:flex-row relative">
          <button className="flex items-center justify-between gap-3 btn">
            <FontAwesomeIcon icon={faUser} />
            login
            <FontAwesomeIcon
              className="cursor-pointer"
              icon={faAngleDown}
              onClick={() => setUserType((prev) => !prev)}
            />
          </button>

          {/* select user type */}
          {userType && (
            <div className="absolute w-full">
              <p className="bg-white px-5 py-1 text-secondary-1 font-semibold hover:bg-[linear-gradient(120deg,_rgba(0,194,203,1)_0%,_rgba(2,88,82,1)_100%)] hover:text-white">
                As Patient
              </p>
              <p className="bg-white px-5 py-1 text-secondary-1 font-semibold hover:bg-[linear-gradient(120deg,_rgba(0,194,203,1)_0%,_rgba(2,88,82,1)_100%)] hover:text-white">
                As Nurse
              </p>
            </div>
          )}
        </div>

        {/* mobile menu */}
        <div className="md:hidden">
          <FontAwesomeIcon
            onClick={() => setIsOpen((prev) => !prev)}
            className="text-4xl pr-5 cursor-pointer text-secondary-1"
            icon={faBars}
          />
          {isOpen && (
            <div className="absolute bg-white right-5 my-3 flex flex-col items-center px-3 py-3 w-[100px] text-text-1 hover:text-primary-2 gap-5">
              <p className="text-text-1 hover:text-primary-2">
                <Link
                  to="home"
                  smooth={true}
                  duration={500}
                  offset={-100}
                  className="cursor-pointer">
                  Home
                </Link>
              </p>
              <p className="text-text-1 hover:text-primary-2">
                <Link
                  to="about"
                  smooth={true}
                  duration={500}
                  offset={-100}
                  className="cursor-pointer">
                  About Us
                </Link>
              </p>
              <p className="text-text-1 hover:text-primary-2">
                <Link
                  to="services"
                  smooth={true}
                  duration={500}
                  offset={-100}
                  className="cursor-pointer">
                  Services
                </Link>
              </p>
              <p className="text-text-1 hover:text-primary-2">
                <Link
                  to="contact"
                  smooth={true}
                  duration={500}
                  offset={-100}
                  className="cursor-pointer">
                  Contact
                </Link>
              </p>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
