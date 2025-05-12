import React, { useState } from "react";

const StaffRegistration = () => {
  const [role, setRole] = useState("DOCTOR");

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-300 to-blue-400 p-4">
      <div className="bg-white p-10 rounded-2xl shadow-xl w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Staff Registration
        </h2>

        <form className="space-y-5">
          {/* Name */}
          <div className="bg-gray-100 p-4 rounded-lg">
            <label className="block text-gray-700 mb-2">Name</label>
            <input
              type="text"
              placeholder="Enter name"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Contact No */}
          <div className="bg-gray-100 p-4 rounded-lg">
            <label className="block text-gray-700 mb-2">Contact No</label>
            <input
              type="text"
              placeholder="Enter contact number"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Email */}
          <div className="bg-gray-100 p-4 rounded-lg">
            <label className="block text-gray-700 mb-2">E-mail</label>
            <input
              type="email"
              placeholder="Enter email"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Role */}
          <div className="bg-gray-100 p-4 rounded-lg">
            <label className="block text-gray-700 mb-3">Role</label>
            <div className="flex space-x-4">
              <button
                type="button"
                onClick={() => setRole("DOCTOR")}
                className={`flex-1 px-4 py-2 rounded-md font-medium ${
                  role === "DOCTOR"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-gray-700"
                }`}
              >
                DOCTOR
              </button>
              <button
                type="button"
                onClick={() => setRole("NURSE")}
                className={`flex-1 px-4 py-2 rounded-md font-medium ${
                  role === "NURSE"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-gray-700"
                }`}
              >
                NURSE
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <div className="text-center mt-6">
            <button
              type="submit"
              className="bg-blue-500 text-white px-8 py-2 rounded-md hover:bg-blue-600 transition"
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StaffRegistration;