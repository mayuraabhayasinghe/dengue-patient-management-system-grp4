import React, { useState } from "react";

const StaffRegistration = () => {
  const [role, setRole] = useState("DOCTOR");

  return (
    <div className="min-h-screen flex items-center justify-center bg-teal-400 p-4">
      <div className="bg-white p-10 rounded-xl shadow-lg w-full max-w-3xl">
        <h2 className="text-3xl font-bold text-center text-black mb-10">
          Staff Registration
        </h2>

        <form className="space-y-8">

          {/* Name Row */}
          <div className="flex items-center space-x-4">
            {/* Label */}
            <div className="bg-gray-300 text-black px-4 py-2 rounded-full font-medium min-w-[120px] text-center">
              Name
            </div>
            {/* Input */}
            <input
              type="text"
              placeholder=""
              className="flex-1 bg-gray-300 rounded-lg px-4 py-2 focus:outline-none"
            />
          </div>

          {/* Contact Row */}
          <div className="flex items-center space-x-4">
            {/* Label */}
            <div className="bg-gray-300 text-black px-4 py-2 rounded-full font-medium min-w-[120px] text-center">
              Contact No
            </div>
            {/* Input */}
            <input
              type="text"
              placeholder=""
              className="flex-1 bg-gray-300 rounded-lg px-4 py-2 focus:outline-none"
            />
          </div>

          {/* Email Row */}
          <div className="flex items-center space-x-4">
            {/* Label */}
            <div className="bg-gray-300 text-black px-4 py-2 rounded-full font-medium min-w-[120px] text-center">
              E-mail
            </div>
            {/* Input */}
            <input
              type="email"
              placeholder=""
              className="flex-1 bg-gray-300 rounded-lg px-4 py-2 focus:outline-none"
            />
          </div>

          {/* Role Row */}
          <div className="flex items-center justify-center space-x-8 mt-6">
            {/* Doctor */}
            <div className="flex items-center space-x-2">
              <input
                type="radio"
                id="doctor"
                name="role"
                value="DOCTOR"
                checked={role === "DOCTOR"}
                onChange={() => setRole("DOCTOR")}
                className="w-4 h-4"
              />
              <label
                htmlFor="doctor"
                className="bg-gray-300 text-black px-4 py-2 rounded-none font-medium cursor-pointer"
              >
                DOCTOR
              </label>
            </div>

            {/* Nurse */}
            <div className="flex items-center space-x-2">
              <input
                type="radio"
                id="nurse"
                name="role"
                value="NURSE"
                checked={role === "NURSE"}
                onChange={() => setRole("NURSE")}
                className="w-4 h-4"
              />
              <label
                htmlFor="nurse"
                className="bg-gray-300 text-black px-4 py-2 rounded-none font-medium cursor-pointer"
              >
                NURSE
              </label>
            </div>
          </div>

          {/* Register Button */}
          <div className="text-center mt-6">
            <button
              type="submit"
              className="bg-black text-white px-10 py-2 rounded-full hover:bg-gray-800 transition"
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
