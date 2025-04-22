import React from "react";
import logo_white from "../assets/images/logo_white.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faTwitter,
  faInstagram,
  faLinkedinIn,
} from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
  return (
    <footer className="bg-primary-1 text-white-1 pt-10 pb-6 px-5 md:px-20 mt-10">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-8">
        {/* About Section */}
        <div className="flex flex-col gap-2">
          {/* <h3 className="text-xl font-bold mb-4">DengueGuard</h3> */}
          <img src={logo_white} alt="" className="w-[40%]" />
          <p className="text-sm">
            DengueGuard is a hospital patient management system designed to
            enhance monitoring, ward management, and communication in dengue
            treatment facilities.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-bold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="/" className="hover:underline">
                Home
              </a>
            </li>
            <li>
              <a href="/feedback" className="hover:underline">
                Feedback
              </a>
            </li>
            <li>
              <a href="/dashboard" className="hover:underline">
                Dashboard
              </a>
            </li>
            <li>
              <a href="/register" className="hover:underline">
                Register
              </a>
            </li>
          </ul>
        </div>

        {/* Contact & Social */}
        <div>
          <h3 className="text-xl font-bold mb-4">Contact Us</h3>
          <p className="text-sm">Email: support@dengueguard.lk</p>
          <p className="text-sm">Phone: +94 76 123 4567</p>

          <div className="flex space-x-4 mt-4 text-lg">
            <a href="#" className="hover:text-gray-300">
              <FontAwesomeIcon icon={faFacebookF} />
            </a>
            <a href="#" className="hover:text-gray-300">
              <FontAwesomeIcon icon={faTwitter} />
            </a>
            <a href="#" className="hover:text-gray-300">
              <FontAwesomeIcon icon={faInstagram} />
            </a>
            <a href="#" className="hover:text-gray-300">
              <FontAwesomeIcon icon={faLinkedinIn} />
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-white-1 pt-4 text-center text-sm">
        &copy; {new Date().getFullYear()} DengueGuard. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
