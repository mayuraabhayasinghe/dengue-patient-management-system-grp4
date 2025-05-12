import React, { useState } from "react";

const StaffRegistration = () => {
  const [role, setRole] = useState("DOCTOR");

  return (
    <div className="min-h-screen flex items-center justify-center bg-teal-400 px-4">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-3xl">
        <h2 className="text-2xl font-semibold text-center mb-8">Staff Registration</h2>
        
        <form className="space-y-6">
          <div className="flex flex-col md:flex-row items-center">
            <label className="w-full md:w-1/3 text-gray-700 mb-2 md:mb-0 font-medium">Name</label>
            <input type="text" placeholder="Enter name" className="w-full md:w-2/3 px-4 py-2 border rounded-md" />
          </div>

          <div className="flex flex-col md:flex-row items-center">
            <label className="w-full md:w-1/3 text-gray-700 mb-2 md:mb-0 font-medium">Contact No</label>
            <input type="text" placeholder="Enter contact number" className="w-full md:w-2/3 px-4 py-2 border rounded-md" />
          </div>

          <div className="flex flex-col md:flex-row items-center">
            <label className="w-full md:w-1/3 text-gray-700 mb-2 md:mb-0 font-medium">E-mail</label>
            <input type="email" placeholder="Enter email" className="w-full md:w-2/3 px-4 py-2 border rounded-md" />
          </div>

          <div className="flex flex-col md:flex-row items-center justify-center gap-8 mt-4">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="role"
                value="DOCTOR"
                checked={role === "DOCTOR"}
                onChange={() => setRole("DOCTOR")}
              />
              <span className="font-medium">DOCTOR</span>
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="role"
                value="NURSE"
                checked={role === "NURSE"}
                onChange={() => setRole("NURSE")}
              />
              <span className="font-medium">NURSE</span>
            </label>
          </div>

          <div className="text-center mt-6">
            <button
              type="submit"
              className="bg-black text-white px-6 py-2 rounded-full hover:bg-gray-800 transition"
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
