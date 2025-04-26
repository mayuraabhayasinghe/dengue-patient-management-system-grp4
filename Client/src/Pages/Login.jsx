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
  