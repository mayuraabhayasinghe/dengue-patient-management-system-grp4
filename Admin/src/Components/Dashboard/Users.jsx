import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserPlus,
  faSearch,
  faEdit,
  faTrash,
  faUserMd,
  faUserNurse,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const Users = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const { userId } = useParams();

  useEffect(() => {
    // get all users
    const fetchUsers = async () => {
      try {
        const res = await axios.get(`${api}/api/auth/getuser`);
        setUsers(res.data || []);
      } catch (err) {
        console.error("Failed to fetch users:", err);
        setError("Failed to load users. Please try again later.");
        setUsers([]);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  // fetch users by Id
  const handleUserClick = (userId) => {
    navigate(`/auth/${userId}`);
  };

  const getRoleIcon = (role) => {
    switch (role?.toLowerCase()) {
      case "doctor":
        return faUserMd;
      case "nurse":
        return faUserNurse;
      case "admin":
        return faUser;
      case "patient":
        return faUser;
      default:
        return faUser;
    }
  };

  const filteredUsers = users
    .filter((user) => {
      const role = user?.user?.role || user?.role;
      if (activeTab === "all") return true;
      if (activeTab === "staff") return role === "nurse" || role === "doctor";
      return role === activeTab;
    })
    .filter((user) => {
      const name = user?.fullName || user?.user?.name || user?.name || "";
      const email = user?.email || user?.user?.email || "";
      return (
        name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });

  const handleAddUser = () => {
    if (activeTab === "doctor" || activeTab === "nurse") {
      navigate("/admin/staffRegistration");
    } else if (activeTab === "admin") {
      navigate("/admin/add-admin");
    } else {
      // Default action if needed
      navigate("/admin/add-user");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-1"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h1 className="text-2xl font-bold text-gray-800">User Management</h1>
        {activeTab !== "all" && activeTab !== "patient" && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleAddUser}
            className="flex items-center gap-2 bg-primary-1 text-white px-4 py-2 rounded-lg shadow hover:bg-primary-2 transition">
            <FontAwesomeIcon icon={faUserPlus} />
            <span>
              {activeTab === "doctor"
                ? "Add New Doctor"
                : activeTab === "nurse"
                ? "Add New Nurse"
                : "Add New Admin"}
            </span>
          </motion.button>
        )}
      </div>

      {/* Search and Filter */}
      <div className="bg-white p-4 rounded-lg shadow">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <FontAwesomeIcon
              icon={faSearch}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              placeholder="Search users..."
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-1 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
            {["all", "doctor", "nurse", "admin", "patient"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-3 py-1 text-sm rounded-md capitalize ${
                  activeTab === tab
                    ? "bg-white shadow text-primary-1 font-medium"
                    : "text-gray-600 hover:text-gray-800"
                }`}>
                {tab}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  User
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Role
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => {
                  const userData = user.user || user;
                  return (
                    <motion.tr
                      key={user._id || user.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                      onClick={() =>
                        handleUserClick(userData._id || userData.id)
                      }
                      className="hover:bg-gray-50 cursor-pointer">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 rounded-full bg-primary-1 flex items-center justify-center text-white">
                            <FontAwesomeIcon
                              icon={getRoleIcon(userData.role)}
                            />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {userData.name}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800 capitalize">
                          {userData.role}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">
                          {userData.email}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            userData.status === "active"
                              ? "bg-green-100 text-green-800"
                              : "bg-gray-100 text-gray-800"
                          }`}>
                          {userData.status || "inactive"}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          onClick={() =>
                            navigate(`/admin/edit-user/${user._id || user.id}`)
                          }
                          className="text-blue-600 hover:text-blue-900 mr-3">
                          <FontAwesomeIcon icon={faEdit} />
                        </button>
                        <button className="text-red-600 hover:text-red-900">
                          <FontAwesomeIcon icon={faTrash} />
                        </button>
                      </td>
                    </motion.tr>
                  );
                })
              ) : (
                <tr>
                  <td
                    colSpan="5"
                    className="px-6 py-10 text-center font-medium text-gray-500">
                    No users found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Users;
