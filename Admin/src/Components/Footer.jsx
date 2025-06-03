import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import logo from "../../../Client/src/assets/images/logo_white.png";
import {
  faCopyright,
  faHeart,
  faShieldAlt,
  faCode,
  faGlobe,
  faEnvelope,
  faPhone,
  faMapMarkerAlt,
} from "@fortawesome/free-solid-svg-icons";
import {
  faTwitter,
  faGithub,
  faLinkedin,
  faFacebook,
} from "@fortawesome/free-brands-svg-icons";

const AdminFooter = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary-1 text-white py-6 px-4">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Left section - Brand and copyright */}
          <div className="mb-4 md:mb-0 flex items-center">
            <img src={logo} alt="" />
            <span className="font-bold text-white">DenguGuard</span>
            <span className="mx-2">|</span>
            <FontAwesomeIcon icon={faCopyright} className="mr-1" />
            <span>{currentYear} All rights reserved</span>
          </div>

          {/* Middle section - Links */}
          <div className="mb-4 md:mb-0">
            <ul className="flex flex-wrap justify-center space-x-4">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  <FontAwesomeIcon icon={faGlobe} className="mr-1" />
                  Website
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  <FontAwesomeIcon icon={faCode} className="mr-1" />
                  Developers
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  <FontAwesomeIcon icon={faMapMarkerAlt} className="mr-1" />
                  Contact
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Support
                </a>
              </li>
            </ul>
          </div>

          {/* Right section - Social media */}
          <div className="flex space-x-4">
            <a
              href="#"
              className="text-white hover:text-text-1 transition-colors"
              aria-label="Twitter">
              <FontAwesomeIcon icon={faTwitter} className="text-xl" />
            </a>
            <a
              href="#"
              className="text-white hover:text-text-1 transition-colors"
              aria-label="LinkedIn">
              <FontAwesomeIcon icon={faLinkedin} className="text-xl" />
            </a>
            <a
              href="#"
              className="text-white hover:text-text-1 transition-colors"
              aria-label="GitHub">
              <FontAwesomeIcon icon={faGithub} className="text-xl" />
            </a>
            <a
              href="#"
              className="text-white hover:text-text-1 transition-colors"
              aria-label="Facebook">
              <FontAwesomeIcon icon={faFacebook} className="text-xl" />
            </a>
          </div>
        </div>

        {/* Bottom section - Additional info */}
        <div className="mt-4 pt-4 border-t border-white text-sm text-center md:text-left">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-2 md:mb-0">
              <FontAwesomeIcon icon={faEnvelope} className="mr-1" />
              <a
                href="mailto:support@denguguard.com"
                className="hover:text-white">
                support@denguguard.com
              </a>
              <span className="mx-2">|</span>
              <FontAwesomeIcon icon={faPhone} className="mr-1" />
              <span>+1 (555) 123-4567</span>
            </div>
            <div>
              <span>Made with </span>
              <FontAwesomeIcon icon={faHeart} className="text-red-400 mx-1" />
              <span>by the DenguGuard Team</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default AdminFooter;
