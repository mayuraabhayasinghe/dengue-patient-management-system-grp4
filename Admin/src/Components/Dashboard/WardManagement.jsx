import React, { useState } from "react";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBed,
  faPlus,
  faSearch,
  faTrash,
  faExchangeAlt,
  faNotesMedical,
} from "@fortawesome/free-solid-svg-icons";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const WardManagement = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  // Sample ward data
  const wards = [
    {
      id: 1,
      name: "Ward A",
      type: "General",
      capacity: 30,
      occupied: 24,
      patients: [
        {
          id: 101,
          name: "John Doe",
          admissionDate: "2023-05-15",
          condition: "Stable",
        },
        {
          id: 102,
          name: "Jane Smith",
          admissionDate: "2023-05-18",
          condition: "Critical",
        },
      ],
    },
    {
      id: 2,
      name: "Ward B",
      type: "Pediatric",
      capacity: 20,
      occupied: 18,
      patients: [
        {
          id: 201,
          name: "Michael Johnson",
          admissionDate: "2023-05-10",
          condition: "Improving",
        },
      ],
    },
    {
      id: 3,
      name: "ICU",
      type: "Intensive Care",
      capacity: 10,
      occupied: 8,
      patients: [
        {
          id: 301,
          name: "Sarah Williams",
          admissionDate: "2023-05-05",
          condition: "Critical",
        },
        {
          id: 302,
          name: "Robert Brown",
          admissionDate: "2023-05-20",
          condition: "Stable",
        },
      ],
    },
  ];

  // Filter wards based on search and active tab
  const filteredWards = wards.filter((ward) => {
    const matchesSearch = ward.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesTab =
      activeTab === "all" || ward.type.toLowerCase() === activeTab;
    return matchesSearch && matchesTab;
  });

  // Data for occupancy chart
  const occupancyData = {
    labels: wards.map((ward) => ward.name),
    datasets: [
      {
        label: "Occupied Beds",
        data: wards.map((ward) => ward.occupied),
        backgroundColor: "rgba(54, 162, 235, 0.6)",
      },
      {
        label: "Available Beds",
        data: wards.map((ward) => ward.capacity - ward.occupied),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
    ],
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h1 className="text-2xl font-bold text-gray-800">Ward Management</h1>
        <div className="flex gap-3">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 bg-primary-1 text-white px-4 py-2 rounded-lg shadow hover:bg-primary-2 transition">
            <FontAwesomeIcon icon={faBed} />
            <span>Add Bed</span>
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg shadow hover:bg-green-700 transition">
            <FontAwesomeIcon icon={faPlus} />
            <span>New Ward</span>
          </motion.button>
        </div>
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
              placeholder="Search wards..."
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-1 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
            {["all", "general", "pediatric", "intensive care"].map((tab) => (
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

      {/* Occupancy Chart */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white p-4 rounded-lg shadow">
        <h2 className="text-lg font-semibold mb-4">Ward Occupancy Overview</h2>
        <Bar
          data={occupancyData}
          options={{
            responsive: true,
            scales: {
              x: {
                stacked: true,
              },
              y: {
                stacked: true,
                max: Math.max(...wards.map((w) => w.capacity)) + 2,
              },
            },
          }}
        />
      </motion.div>

      {/* Wards List */}
      <div className="space-y-4">
        {filteredWards.map((ward) => (
          <motion.div
            key={ward.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-lg shadow overflow-hidden">
            <div className="p-4 border-b border-gray-200 flex justify-between items-center">
              <div>
                <h3 className="text-lg font-semibold">{ward.name}</h3>
                <p className="text-sm text-gray-600 capitalize">{ward.type}</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-center">
                  <span className="block text-2xl font-bold text-primary-1">
                    {ward.occupied}/{ward.capacity}
                  </span>
                  <span className="text-xs text-gray-500">Beds Occupied</span>
                </div>
                <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                  <FontAwesomeIcon icon={faBed} className="text-blue-600" />
                </div>
              </div>
            </div>

            {/* Patients in Ward */}
            {ward.patients.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Patient ID
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Name
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Admission Date
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Condition
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {ward.patients.map((patient) => (
                      <tr key={patient.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {patient.id}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {patient.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {patient.admissionDate}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              patient.condition === "Critical"
                                ? "bg-red-100 text-red-800"
                                : patient.condition === "Stable"
                                ? "bg-green-100 text-green-800"
                                : "bg-yellow-100 text-yellow-800"
                            }`}>
                            {patient.condition}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                          <button
                            className="text-blue-600 hover:text-blue-900"
                            onClick={() => handleTransferClick(patient)}>
                            <FontAwesomeIcon icon={faExchangeAlt} />
                          </button>
                          <button className="text-yellow-600 hover:text-yellow-900">
                            <FontAwesomeIcon icon={faNotesMedical} />
                          </button>
                          <button className="text-red-600 hover:text-red-900">
                            <FontAwesomeIcon icon={faTrash} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="p-4 text-center text-gray-500">
                No patients currently in this ward
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default WardManagement;
