import React, { useState } from "react";
import doctorImage from "../assets/images/doctorlogin.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify"; // for popup messages
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // sumbit handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:5000/api/users/login", {
        email,
        password,
      });

      const { token, user, message } = res.data;
      const { id, name, role } = user;

      // Save token and user info to localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("userId", id);
      localStorage.setItem("name", name);
      localStorage.setItem("role", role);

      toast.success(message || "Login successful");
      //Reset input field after login
      setEmail("");
      setPassword("");

      // Redirect to landing page(home)
      navigate("/");
    } catch (err) {
      const errorMsg =
        err.response?.data?.message || "Login failed. Try again.";
      toast.error(errorMsg);
    }
  };
  return (
    <div className="min-h-screen bg-white flex flex-col justify-center items-center p-4">
      {/* Main Content */}
      <div className="container mx-auto px-4 mt-12 flex justify-center items-center md:justify-center ">
        {/* Login Form */}
        <div className="">
          <h1 className="text-4xl font-bold mb-4">Log In to Your Account</h1>
          <p className="text-gray-600 mb-8">
            Join to manage your health and stay connected.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:outline-none focus:border-primary"
                placeholder="ABC Perera"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-gray-700 mb-2">
                Password
              </label>
              <input
                type="text"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:outline-none focus:border-primary"
                placeholder="password"
              />
            </div>

            <button type="submit" className=" btn w-full">
              Log In
            </button>

            {/* <p className="text-center text-gray-600">
              Don't have an account?{" "}
              <a href="/signup" className=" text-primary-2 hover:underline">
                Sign Up
              </a>
            </p> */}
          </form>
        </div>

        {/* Image */}
        <div className="hidden md:flex md:justify-center">
          <img src={doctorImage} alt="Doctor illustration" className="w-20vw" />
        </div>
      </div>
    </div>
  );
};

export default Login;
