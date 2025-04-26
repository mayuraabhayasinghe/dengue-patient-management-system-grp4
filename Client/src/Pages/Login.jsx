import React, { useState } from 'react';
import doctorImage from '../assets/doctorlogin.png';
import logo from '../assets/logo.png';
import logowhite from '../assets/logo_white.png';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faTwitter,
  faInstagram,
  faLinkedinIn,
} from "@fortawesome/free-brands-svg-icons";
import Footer from "../components/Footer"; 


const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
  
    const handleSubmit = (e) => {
      e.preventDefault();
      // Handle login logic here
    };
    return (
        <div className="min-h-screen bg-white">
          {/* Navigation */}
          <nav className="flex justify-between items-center px-8 py-4">
            <div className="flex items-center">
              <img src={logo} alt="Dengue Guard" className="h-10" />
            </div>
            <div className="flex space-x-8">
              <a href="/" className="text-gray-600 hover:text-primary">Home</a>
              <a href="/about" className="text-gray-600 hover:text-primary">About</a>
              <a href="/services" className="text-gray-600 hover:text-primary">Services</a>
              <a href="/contact" className="text-gray-600 hover:text-primary">Contact</a>
            </div>
            <button className="bg-primary text-white px-6 py-2 rounded-full hover:bg-primary-dark">
              Account
            </button>
          </nav>

          {/* Main Content */}
      <div className="container mx-auto px-4 mt-12 flex justify-between items-center">

        {/* Login Form */}
        <div className="w-1/2">
          <h1 className="text-4xl font-bold mb-4">Log In to Your Account</h1>
          <p className="text-gray-600 mb-8">Join to manage your health and stay connected.</p>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="username" className="block text-gray-700 mb-2">Username</label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:outline-none focus:border-primary"
                placeholder="ABC Perera"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-gray-700 mb-2">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:outline-none focus:border-primary"
                placeholder="password"
              />
            </div>

            <div className="text-right">
              <a href="/forgot-password" className="text-gray-600 hover:text-primary">
                Forgot Password?
              </a>
            </div>

            <button
              type="submit"
              className="w-full bg-primary text-white py-3 rounded-lg hover:bg-primary-dark transition-colors"
            >
              Log In
            </button>

            <p className="text-center text-gray-600">
              Don't have an account?{' '}
              <a href="/signup" className="text-primary hover:underline">Sign Up</a>
            </p>
          </form>
        </div>

        {/* Image */}
        <div className="w-1/2 md:flex md:justify-center hidden">
          <img src={doctorImage} alt="Doctor illustration" className="w-96" />
        </div>
      </div>
      {/* Footer */}

      <Footer />
      </div>
  );
};

export default Login; 

