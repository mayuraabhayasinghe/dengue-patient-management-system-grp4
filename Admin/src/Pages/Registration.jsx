// Admin/src/Pages/Registration.jsx
import React from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Registration = () => {
  const handleRegister = async () => {
    try {
      // Example request to backend
      await axios.post("http://localhost:5000/api/register", {
        username: "admin",
        password: "admin123",
      });
      toast.success("Registered successfully!");
    } catch (error) {
      toast.error("Registration failed.");
    }
  };

  return (
    <div>
      <h2>Admin Registration</h2>
      <button onClick={handleRegister}>Register</button>
      <ToastContainer />
    </div>
  );
};

export default Registration;
