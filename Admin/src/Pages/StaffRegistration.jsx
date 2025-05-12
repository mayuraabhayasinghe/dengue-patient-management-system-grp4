import React, { useState } from "react";

const StaffRegistration = () => {
  const [role, setRole] = useState("DOCTOR");

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-cyan-200 to-blue-300 px-4">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-3xl">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">Staff Registration</h2>

        <form className="space-y-6">
          <div className="flex flex-col md:flex-row md:items-center">
            <label className="md:w-1/3 text-gray-700 font-medium">Name</label>
            <input type="text" placeholder="Enter name" className="w-full md:w-2/3 px-4 py-2 border rounded-md" />
          </div>

          <div className="flex flex-col md:flex-row md:items-center">
            <label className="md:w-1/3 text-gray-700 font-medium">Contact No</label>
            <input type="text" placeholder="Enter contact number" className="w-full md:w-2/3 px-4 py-2 border rounded-md" />
          </div>

          <div className="flex flex-col md:flex-row md:items-center">
            <label className="md:w-1/3 text-gray-700 font-medium">E-mail</label>
            <input type="email" placeholder="Enter email" className="w-full md:w-2/3 px-4 py-2 border rounded-md" />
          </div>

          <div className="flex flex-col md:flex-row md:items-center mt-2">
            <label className="md:w-1/3 text-gray-700 font-medium">Role</label>
            <div className="flex space-x-6 md:w-2/3 mt-2 md:mt-0">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="role"
                  value="DOCTOR"
                  checked={role === "DOCTOR"}
                  onChange={() => setRole("DOCTOR")}
                />
                Doctor
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="role"
                  value="NURSE"
                  checked={role === "NURSE"}
                  onChange={() => setRole("NURSE")}
                />
                Nurse
              </label>
            </div>
          </div>

          <div className="text-center mt-6">
            <button type="submit" className="bg-black text-white px-6 py-2 rounded-full hover:bg-gray-800 transition">
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StaffRegistration;

