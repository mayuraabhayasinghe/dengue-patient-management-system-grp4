import React, { use, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import api from "../../../Client/src/api/api";

const UserProfile = () => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    role: "user",
    phone: "",
    address: "",
    isActive: "",
  });

  const [loading, setLoading] = useState(true);
  //   const [message, setMessage] = useState({ text: "", type: "" });
  const [isEditing, setIsEditing] = useState(false);
  const { userId } = useParams();
  const navigate = useNavigate();

  // Fetch user data
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await axios.get(`${api}/api/auth/${userId}`);
        setUserData(res.data);
        setLoading(false);
        console.log("User Data:", res.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
        toast.error("Failed to fetch user data");
        setLoading(false);
      }
    };

    fetchUserData();
  }, [userId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleToggleStaff = () => {
    if (!isEditing) return;
    setUserData((prev) => ({ ...prev, isActive: !prev.isActive }));
  };

  const handleSave = async () => {
    try {
      const payload = {
        // staff fields
        phone: userData.phone,
        staffStatus: userData.isActive ? "active" : "inactive",

        // nested user updates
        userUpdates: {
          name: userData.user.name,
          email: userData.user.email,
          role: userData.user.role,
        },
      };

      const res = await axios.put(`${api}/api/staff/${userData._id}`, payload);

      toast.success("User updated successfully");
      setIsEditing(false);
      console.log("Updated:", res.data);
    } catch (err) {
      console.error("Update error:", err);
      toast.error("Failed to update user");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-1"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white shadow-xl rounded-3xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-primary-1 to-secondary-1 px-6 py-8 text-white">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-2xl font-bold">User Profile</h1>
                <p className="opacity-90 mt-1">Name: {userData.user.name}</p>
              </div>
              <div className="flex space-x-3">
                {!isEditing ? (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="cursor-pointer px-4 py-2 bg-white text-text-2 rounded-lg font-medium hover:bg-opacity-90 transition">
                    Edit Profile
                  </button>
                ) : (
                  <>
                    <button
                      onClick={() => setIsEditing(false)}
                      className="px-4 py-2 bg-white text-text-1 bg-opacity-20 rounded-lg font-medium hover:bg-opacity-30 transition cursor-pointer">
                      Cancel
                    </button>
                    <button
                      onClick={handleSave}
                      className="cursor-pointer px-4 py-2 bg-white text-text-2 rounded-lg font-medium hover:bg-opacity-90 transition">
                      Save Changes
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Profile Content */}
          <div className="p-6 sm:p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left Section - Personal Info */}
              <div className="space-y-6">
                <div>
                  <h2 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-200">
                    Personal Information
                  </h2>
                  <div className="space-y-4">
                    {/* Name */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Full Name
                      </label>
                      <input
                        name="name"
                        value={userData.name}
                        onChange={handleChange}
                        disabled={!isEditing}
                        placeholder={userData.user.name || "Enter your name"}
                        type="text"
                        className={`w-full px-4 py-2 rounded-lg border ${
                          isEditing
                            ? "border-gray-300 focus:ring-2 focus:ring-blue-500"
                            : "border-transparent bg-gray-100"
                        }`}
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email Address
                      </label>
                      <input
                        name="email"
                        value={userData.email}
                        onChange={handleChange}
                        disabled={!isEditing}
                        type="email"
                        placeholder={userData.user.email || "Enter your email"}
                        className={`w-full px-4 py-2 rounded-lg border ${
                          isEditing
                            ? "border-gray-300 focus:ring-2 focus:ring-blue-500"
                            : "border-transparent bg-gray-100"
                        }`}
                      />
                    </div>

                    {/* Phone */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Phone Number
                      </label>
                      <input
                        name="phone"
                        value={userData.phone}
                        onChange={handleChange}
                        disabled={!isEditing}
                        type="tel"
                        placeholder={userData.phoneNumber || "Enter your phone"}
                        className={`w-full px-4 py-2 rounded-lg border ${
                          isEditing
                            ? "border-gray-300 focus:ring-2 focus:ring-blue-500"
                            : "border-transparent bg-gray-100"
                        }`}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Section - Account Info */}
              <div className="space-y-6 relative">
                {/* Role & Staff Toggle */}
                {userData.user.role !== "patient" ? (
                  <div>
                    <h2 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-200">
                      Account Settings
                    </h2>
                    <div className="space-y-4">
                      {/* Role */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          User Role
                        </label>
                        <select
                          name="role"
                          value={userData.role}
                          onChange={handleChange}
                          disabled={!isEditing}
                          className={`w-full px-4 py-2 rounded-lg border ${
                            isEditing
                              ? "border-gray-300 focus:ring-2 focus:ring-blue-500"
                              : "border-transparent bg-gray-100"
                          }`}>
                          <option value="" disabled>
                            {userData.user.role || "Select role"}
                          </option>
                          <option value="doctor">Doctor</option>
                          <option value="nurse">Nurse</option>
                        </select>
                      </div>

                      {/* Staff Toggle */}

                      <div className="flex items-center justify-between pt-2">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Staff Status
                          </label>
                          <p className="text-sm text-gray-500">
                            {userData.isActive ? "On-Duty" : "Off-Duty"}
                          </p>
                        </div>
                        <button
                          onClick={handleToggleStaff}
                          disabled={!isEditing}
                          aria-pressed={userData.isActive}
                          title="Toggle staff access"
                          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300 ${
                            userData.isActive ? "bg-green-300" : "bg-gray-300"
                          } ${
                            !isEditing ? "opacity-50 cursor-not-allowed" : ""
                          }`}>
                          <span
                            className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform duration-300 ${
                              userData.isActive
                                ? "translate-x-6"
                                : "translate-x-1"
                            }`}
                          />
                        </button>
                      </div>
                    </div>
                  </div>
                ) : null}
                <button
                  onClick={() => navigate(-1)}
                  className="absolute bottom-0 right-0 px-4 py-2 rounded-lg font-medium hover:bg-opacity-90 bg-primary-1 text-white cursor-pointer">
                  Back
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
