import React, { useState } from 'react';
import doctorImage from '../assets/doctorlogin.png';
import logo from '../assets/logo.png';
import logowhite from '../assets/logo_white.png';

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