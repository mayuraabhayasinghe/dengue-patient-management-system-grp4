import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
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
import axios from "axios";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const WardManagement = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [wards, setWards] = useState([]);
  const [beds, setBeds] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch wards and beds
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [wardsResponse, bedsResponse] = await Promise.all([
          axios.get("http://localhost:5000/api/wards"),
          axios.get("http://localhost:5000/api/beds"),
        ]);
        setWards(wardsResponse.data);
        setBeds(bedsResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Filter wards based on search and active tab
  const filteredWards = wards.filter((ward) => {
    const matchesSearch = ward.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesTab =
      activeTab === "all" || ward.type.toLowerCase() === activeTab;
    return matchesSearch && matchesTab;
  });

  // Prepare data for occupancy chart
  const occupancyData = {
    labels: wards.map((ward) => ward.name),
    datasets: [
      {
        label: "Occupied Beds",
        data: wards.map((ward) => {
          const wardBeds = beds.filter((bed) => bed.ward?._id === ward._id);
          return wardBeds.filter((bed) => bed.status === "occupied").length;
        }),
        backgroundColor: "rgba(54, 162, 235, 0.6)",
      },
      {
        label: "Available Beds",
        data: wards.map((ward) => {
          const wardBeds = beds.filter((bed) => bed.ward?._id === ward._id);
          const occupied = wardBeds.filter(
            (bed) => bed.status === "occupied"
          ).length;
          return ward.capacity - occupied;
        }),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
    ],
  };

  // Filter beds based on search and active tab
  const filteredBeds = beds.filter((bed) => {
    const matchesSearch =
      bed.number.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (bed.patient &&
        bed.patient.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesTab =
      activeTab === "all" ||
      (bed.ward &&
        bed.ward.type.toLowerCase().includes(activeTab.toLowerCase()));
    return matchesSearch && matchesTab;
  });

  const getStatusColor = (status) => {
    return status === "occupied"
      ? "bg-red-100 text-red-800"
      : "bg-green-100 text-green-800";
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-1"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h1 className="text-2xl font-bold text-gray-800">Ward Management</h1>
        <div className="flex gap-3">
          <motion.button
            onClick={() => navigate("/admin/addbed")}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 bg-primary-1 text-white px-4 py-2 rounded-lg shadow hover:bg-primary-2 transition">
            <FontAwesomeIcon icon={faBed} />
            <span>Add Bed</span>
          </motion.button>
          <motion.button
            onClick={() => navigate("/admin/addward")}
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
        {filteredWards.map((ward) => {
          const wardBeds = beds.filter((bed) => bed.ward?._id === ward._id);
          const occupied = wardBeds.filter(
            (bed) => bed.status === "occupied"
          ).length;
          const available = ward.capacity - occupied;
          const wardPatients = wardBeds.filter(
            (bed) => bed.status === "occupied"
          );

          return (
            <motion.div
              key={ward._id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-lg shadow overflow-hidden">
              <div className="p-4 border-b border-gray-200 flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-semibold">{ward.name}</h3>
                  <p className="text-sm text-gray-600 capitalize">
                    {ward.type}
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-center">
                    <span className="block text-2xl font-bold text-primary-1">
                      {occupied}/{ward.capacity}
                    </span>
                    <span className="text-xs text-gray-500">Beds Occupied</span>
                  </div>
                  <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                    <FontAwesomeIcon icon={faBed} className="text-blue-600" />
                  </div>
                </div>
              </div>

              {/* Patients in Ward */}
              {wardPatients.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Bed Number
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Patient
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Admission Date
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
                      {wardPatients.map((bed) => (
                        <tr key={bed._id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {bed.number}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {bed.patient.user.name || "-"}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {bed.patient.admissionDate
                              ? new Date(
                                  bed.patient.admissionDate
                                ).toLocaleDateString()
                              : "-"}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span
                              className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(
                                bed.status
                              )}`}>
                              {bed.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                            <button
                              className="text-blue-600 hover:text-blue-900"
                              onClick={() => console.log("Transfer", bed._id)}>
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
          );
        })}
      </div>
    </div>
  );
};

export default WardManagement;
