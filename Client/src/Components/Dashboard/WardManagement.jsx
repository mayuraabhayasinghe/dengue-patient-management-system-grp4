import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBed, faPlus, faSearch } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

const WardManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeWard, setActiveWard] = useState("all");
  const [wards, setWards] = useState([]);
  const [beds, setBeds] = useState([]);

  // Fetch wards and beds
  useEffect(() => {
    const fetchWards = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/wards");
        setWards(response.data);
      } catch (error) {
        console.error("Error fetching wards:", error.message);
      }
    };

    const fetchBeds = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/beds");
        setBeds(response.data);
      } catch (error) {
        console.error("Error fetching beds:", error.message);
      }
    };

    fetchWards();
    fetchBeds();
  }, []);

  // Filter wards by active type
  const filteredWards =
    activeWard === "all"
      ? wards
      : wards.filter(
          (ward) => ward.type.toLowerCase() === activeWard.toLowerCase()
        );

  // Filter beds based on search + ward type
  const filteredBeds = beds.filter((bed) => {
    const matchesSearch =
      bed.number.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (bed.patient &&
        bed.patient.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesWard =
      activeWard === "all" ||
      (bed.ward &&
        bed.ward.type.toLowerCase().includes(activeWard.toLowerCase()));
    return matchesSearch && matchesWard;
  });

  const getStatusColor = (status) => {
    return status === "occupied"
      ? "bg-red-100 text-red-800"
      : "bg-green-100 text-green-800";
  };

  return (
    <div className="space-y-6">
      {/* Ward Overview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white p-4 rounded-lg shadow">
        <h2 className="text-xl text-text-2 font-semibold mb-6 flex items-center">
          <FontAwesomeIcon icon={faBed} className="mr-2" />
          Ward Overview
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
          {filteredWards.map((ward) => {
            // Calculate available/occupied
            const wardBeds = beds.filter((bed) => bed.ward?._id === ward._id);
            const occupied = wardBeds.filter(
              (bed) => bed.status === "occupied"
            ).length;
            const available = ward.capacity - occupied;

            return (
              <div key={ward._id} className="bg-gray-50 p-4 rounded-lg border">
                <h3 className="font-medium">{ward.name}</h3>
                <p className="text-sm text-gray-500">{ward.type}</p>
                <div className="mt-2">
                  <div className="flex justify-between text-sm">
                    <span>Capacity:</span>
                    <span>{ward.capacity}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Occupied:</span>
                    <span
                      className={
                        occupied > ward.capacity * 0.8 ? "text-red-600" : ""
                      }>
                      {occupied}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Available:</span>
                    <span
                      className={
                        available === 0 ? "text-red-600" : "text-green-600"
                      }>
                      {available}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </motion.div>

      {/* Bed Management */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white p-4 rounded-lg shadow">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <h2 className="text-xl text-text-2 font-semibold">Bed Management</h2>
          <button className="btn">
            <FontAwesomeIcon icon={faPlus} className="mr-2" />
            Assign Bed
          </button>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FontAwesomeIcon icon={faSearch} className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search beds by number or patient..."
              className="pl-10 pr-4 py-2 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-1"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setActiveWard("all")}
              className={`px-3 py-1 rounded-lg ${
                activeWard === "all"
                  ? "bg-primary-1 text-white"
                  : "bg-gray-200 text-gray-700"
              }`}>
              All Wards
            </button>
            <button
              onClick={() => setActiveWard("general")}
              className={`px-3 py-1 rounded-lg ${
                activeWard === "general"
                  ? "bg-primary-1 text-white"
                  : "bg-gray-200 text-gray-700"
              }`}>
              General
            </button>
            <button
              onClick={() => setActiveWard("intensive care")}
              className={`px-3 py-1 rounded-lg ${
                activeWard === "intensive care"
                  ? "bg-primary-1 text-white"
                  : "bg-gray-200 text-gray-700"
              }`}>
              ICU
            </button>
            <button
              onClick={() => setActiveWard("pediatric")}
              className={`px-3 py-1 rounded-lg ${
                activeWard === "pediatric"
                  ? "bg-primary-1 text-white"
                  : "bg-gray-200 text-gray-700"
              }`}>
              Pediatric
            </button>
          </div>
        </div>

        {/* Bed Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Bed Number
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Ward
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Patient
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Admission Date
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredBeds.map((bed) => (
                <tr key={bed._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {bed.number}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {bed.ward?.name || "-"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(
                        bed.status
                      )}`}>
                      {bed.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {bed.patient || "-"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {bed.admissionDate
                      ? new Date(bed.admissionDate).toLocaleDateString()
                      : "-"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
};

export default WardManagement;
