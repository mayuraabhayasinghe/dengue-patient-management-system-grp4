import React, { useState } from "react";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faPhone,
  faEnvelope,
  faUserDoctor,
  faUserNurse,
  faClipboard,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const StaffRegistration = () => {
  const [formData, setFormData] = useState({
    fullname: "",
    phoneNumber: "",
    staffEmail: "",
    staffRole: "",
    age: "",
    gender: "",
  });
  const navigate = useNavigate();

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(`${api}/api/staff/add`, formData);
      toast.success("Staff registered successfully!");

      // Reset form after submitting
      setFormData({
        fullname: "",
        phoneNumber: "",
        staffEmail: "",
        staffRole: "",
        age: "",
        gender: "",
      });
    } catch (error) {
      toast.error("Error registering staff");
      console.error("Error: ", error);
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen flex items-center justify-center bg-background-1 p-4">
      <motion.div
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-2xl">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-center mb-8">
          <h2 className="text-3xl font-bold text-teal-800 mb-2">
            Staff Registration
          </h2>
          <p className="text-gray-600">Register new medical staff members</p>
        </motion.div>

        <motion.form
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          onSubmit={handleSubmit}
          className="space-y-6">
          {/* Name Field */}
          <motion.div variants={itemVariants} className="space-y-2">
            <label className="flex items-center text-gray-700 font-medium">
              <FontAwesomeIcon icon={faUser} className="mr-2 text-teal-600" />
              Full Name
            </label>
            <input
              type="text"
              name="fullname"
              value={formData.fullname}
              onChange={handleChange}
              placeholder="Enter full name"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 border-gray-300 focus:ring-teal-200"
            />
          </motion.div>
          {/* Age Field */}
          <motion.div variants={itemVariants} className="space-y-2">
            <label className="flex items-center text-gray-700 font-medium">
              <FontAwesomeIcon
                icon={faClipboard}
                className="mr-2 text-teal-600"
              />
              Age
            </label>
            <input
              type="text"
              name="age"
              value={formData.age}
              onChange={handleChange}
              placeholder="Enter Your age"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 border-gray-300 focus:ring-teal-200"
            />
          </motion.div>
          {/* Gender Field */}
          <motion.div variants={itemVariants} className="space-y-2">
            <label className="flex items-center text-gray-700 font-medium">
              <FontAwesomeIcon icon={faUser} className="mr-2 text-teal-600" />
              Gender
            </label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 border-gray-300 focus:ring-teal-200">
              <option value="" disabled>
                Select gender
              </option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </motion.div>

          {/* Contact Field */}
          <motion.div variants={itemVariants} className="space-y-2">
            <label className="flex items-center text-gray-700 font-medium">
              <FontAwesomeIcon icon={faPhone} className="mr-2 text-teal-600" />
              Contact Number
            </label>
            <input
              type="tel"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              placeholder="Enter contact number"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 border-gray-300 focus:ring-teal-200"
            />
          </motion.div>

          {/* Email Field */}
          <motion.div variants={itemVariants} className="space-y-2">
            <label className="flex items-center text-gray-700 font-medium">
              <FontAwesomeIcon
                icon={faEnvelope}
                className="mr-2 text-teal-600"
              />
              Email Address
            </label>
            <input
              type="email"
              name="staffEmail"
              value={formData.staffEmail}
              onChange={handleChange}
              placeholder="Enter email address"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 border-gray-300 focus:ring-teal-200"
            />
          </motion.div>

          {/* Role Selection */}
          <motion.div variants={itemVariants} className="space-y-2">
            <label className="block text-gray-700 font-medium mb-2">
              Staff Role
            </label>
            <div className="flex flex-wrap gap-4">
              <motion.label
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className={`flex items-center space-x-2 p-3 rounded-lg cursor-pointer transition ${
                  formData.staffRole === "doctor"
                    ? "bg-teal-100 border-2 border-teal-500"
                    : "bg-gray-100 border-2 border-transparent"
                }`}>
                <input
                  type="radio"
                  name="staffRole"
                  value="doctor"
                  checked={formData.staffRole === "doctor"}
                  onChange={handleChange}
                  className="hidden"
                />
                <FontAwesomeIcon
                  icon={faUserDoctor}
                  className="text-teal-600 text-xl"
                />
                <span className="font-medium">Doctor</span>
              </motion.label>

              <motion.label
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className={`flex items-center space-x-2 p-3 rounded-lg cursor-pointer transition ${
                  formData.staffRole === "nurse"
                    ? "bg-teal-100 border-2 border-teal-500"
                    : "bg-gray-100 border-2 border-transparent"
                }`}>
                <input
                  type="radio"
                  name="staffRole"
                  value="nurse"
                  checked={formData.staffRole === "nurse"}
                  onChange={handleChange}
                  className="hidden"
                />
                <FontAwesomeIcon
                  icon={faUserNurse}
                  className="text-teal-600 text-xl"
                />
                <span className="font-medium">Nurse</span>
              </motion.label>
            </div>
          </motion.div>

          {/* Submit Button */}
          <motion.div variants={itemVariants} className="pt-4 flex gap-10">
            <motion.button
              type="button"
              onClick={() => navigate(-1)}
              className="w-full cursor-pointer py-3 px-4 rounded-lg font-bold text-white transition bg-teal-600 hover:bg-teal-700 flex items-center justify-center">
              Back
            </motion.button>
            <motion.button
              type="submit"
              className="w-full cursor-pointer py-3 px-4 rounded-lg font-bold text-white transition bg-teal-600 hover:bg-teal-700 flex items-center justify-center">
              Register Staff
            </motion.button>
          </motion.div>
        </motion.form>
        <ToastContainer
          position="top-center"
          autoClose={2000}
          hideProgressBar
        />
      </motion.div>
    </motion.div>
  );
};

export default StaffRegistration;
