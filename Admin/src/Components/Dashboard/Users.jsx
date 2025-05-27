import React, { useState } from "react";
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
import { useNavigate } from "react-router-dom";

const Users = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  const navigate = useNavigate();

  const users = [
    {
      id: 1,
      name: "Dr. Sarah Johnson",
      email: "sarah@denguguard.com",
      role: "Doctor",
      lastActive: "2 hours ago",
      status: "active",
    },
    {
      id: 2,
      name: "Nurse Mark Williams",
      email: "mark@denguguard.com",
      role: "Nurse",
      lastActive: "30 minutes ago",
      status: "active",
    },
    {
      id: 3,
      name: "Admin User",
      email: "admin@denguguard.com",
      role: "Admin",
      lastActive: "5 minutes ago",
      status: "active",
    },
    {
      id: 4,
      name: "Dr. Lisa Chen",
      email: "lisa@denguguard.com",
      role: "Doctor",
      lastActive: "1 day ago",
      status: "inactive",
    },
    {
      id: 5,
      name: "Nurse Emma Davis",
      email: "emma@denguguard.com",
      role: "Nurse",
      lastActive: "3 hours ago",
      status: "active",
    },
  ];

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTab =
      activeTab === "all" || user.role.toLowerCase() === activeTab;
    return matchesSearch && matchesTab;
  });

  const getRoleIcon = (role) => {
    switch (role.toLowerCase()) {
      case "doctor":
        return faUserMd;
      case "nurse":
        return faUserNurse;
      default:
        return faUser;
    }
  };

  const handleAddUser = () => {
    activeTab === "doctor" || "nurse"
      ? navigate("/admin/staffRegistration")
      : navigate("/admin/add-admin");
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h1 className="text-2xl font-bold text-gray-800">User Management</h1>
        {activeTab !== "all" && (
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
            {["all", "doctor", "nurse", "admin"].map((tab) => (
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
                  Last Active
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
              {filteredUsers.map((user) => (
                <motion.tr
                  key={user.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 rounded-full bg-primary-1 flex items-center justify-center text-white">
                        <FontAwesomeIcon icon={getRoleIcon(user.role)} />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {user.name}
                        </div>
                        <div className="text-sm text-gray-500">
                          {user.email}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{user.role}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">
                      {user.lastActive}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        user.status === "active"
                          ? "bg-green-100 text-green-800"
                          : "bg-gray-100 text-gray-800"
                      }`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button className="text-blue-600 hover:text-blue-900 mr-3">
                      <FontAwesomeIcon icon={faEdit} />
                    </button>
                    <button className="text-red-600 hover:text-red-900">
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Users;