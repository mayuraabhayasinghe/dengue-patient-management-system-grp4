// src/Components/Dashboard/WardManagement.jsx
import React, { useState } from "react";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBed,
  faPlus,
  faSearch,
  faFilter,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useEffect } from "react";

const WardManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeWard, setActiveWard] = useState("all");

  // Mock ward data
  const [wards, setWards] = useState([]);

  useEffect(() => {
    const fetchWards = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/wards");
        setWards(response.data); // response.data is already an array
        console.log("Wards loaded:", response.data);
      } catch (error) {
        console.error("Error fetching wards:", error.message);
      }
    };

    fetchWards();
  }, []);

  // delete a ward

  // Mock bed data
  const beds = [
    {
      id: 1,
      number: "A101",
      ward: "Ward A",
      status: "occupied",
      patient: "John Doe",
      admissionDate: "2023-05-15",
    },
    {
      id: 2,
      number: "A102",
      ward: "Ward A",
      status: "occupied",
      patient: "Sarah Smith",
      admissionDate: "2023-06-02",
    },
    {
      id: 3,
      number: "A103",
      ward: "Ward A",
      status: "available",
      patient: null,
      admissionDate: null,
    },
    {
      id: 4,
      number: "B101",
      ward: "Ward B",
      status: "occupied",
      patient: "Michael Johnson",
      admissionDate: "2023-05-28",
    },
    {
      id: 5,
      number: "B102",
      ward: "Ward B",
      status: "occupied",
      patient: "Emily Wilson",
      admissionDate: "2023-06-05",
    },
    {
      id: 6,
      number: "C101",
      ward: "Ward C",
      status: "available",
      patient: null,
      admissionDate: null,
    },
    {
      id: 7,
      number: "D101",
      ward: "Ward D",
      status: "occupied",
      patient: "Robert Brown",
      admissionDate: "2023-06-08",
    },
  ];

  const filteredWards =
    activeWard === "all"
      ? wards
      : wards.filter(
          (ward) => ward.type.toLowerCase() === activeWard.toLowerCase()
        );

  const filteredBeds = beds.filter((bed) => {
    const matchesSearch =
      bed.number.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (bed.patient &&
        bed.patient.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesWard =
      activeWard === "all" ||
      bed.ward.toLowerCase().includes(activeWard.toLowerCase());
    return matchesSearch && matchesWard;
  });

  const getStatusColor = (status) => {
    return status === "occupied"
      ? "bg-red-100 text-red-800"
      : "bg-green-100 text-green-800";
  };

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white p-4 rounded-lg shadow">
        <h2 className="text-xl text-text-2 font-semibold mb-6 flex items-center">
          <FontAwesomeIcon icon={faBed} className="mr-2" />
          Ward Overview
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
          {wards.map((ward) => (
            <div key={ward.id} className="bg-gray-50 p-4 rounded-lg border">
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
                      ward.occupied > ward.capacity * 0.8 ? "text-red-600" : ""
                    }>
                    {ward.occupied}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Available:</span>
                  <span
                    className={
                      ward.available === 0 ? "text-red-600" : "text-green-600"
                    }>
                    {ward.available}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

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

        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FontAwesomeIcon icon={faSearch} className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search beds by number or patient..."
              className="pl-10 pr-4 py-2 w-full border rounded-lg focus:outline-none focus:border-none focus:ring-2 focus:ring-primary-1"
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
              onClick={() => setActiveWard("icu")}
              className={`px-3 py-1 rounded-lg ${
                activeWard === "icu"
                  ? "bg-primary-1 text-white"
                  : "bg-gray-200 text-gray-700"
              }`}>
              ICU
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Bed Number
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ward
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Patient
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Admission Date
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredBeds.map((bed) => (
                <tr key={bed.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {bed.number}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {bed.ward}
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
                    {bed.admissionDate || "-"}
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
