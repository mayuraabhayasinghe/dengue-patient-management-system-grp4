import {
  faCheck,
  faSearch,
  faXmark,
  faBed,
  faUserNurse,
  faBell,
  faExclamationTriangle,
  faChartLine,
  faChartPie,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import socket from "../../socket";
import axios from "axios"; // Add axios
import { Pie, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
} from "chart.js";

// Register Chart.js components
ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title
);

const Overview = () => {
  const [notifications, setNotifications] = useState([]);
  const [specialAttentionPatients, setSpecialAttentionPatients] = useState([]);
  const [reminderAlerts, setReminderAlerts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Fetch initial data
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const [notificationsRes, specialAttentionRes] = await Promise.all([
          axios.get("/api/notifications"),
          axios.get("/api/special-attention-patients"),
        ]);

        setNotifications(notificationsRes.data);
        setSpecialAttentionPatients(specialAttentionRes.data);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();

    if (socket.connected) {
      // Socket event listeners for real-time updates
      socket.on("notification", (newNotification) => {
        setNotifications((prev) => [newNotification, ...prev.slice(0, 9)]);
      });

      socket.on("specialAttentionUpdate", (updatedList) => {
        setSpecialAttentionPatients(updatedList);
      });

      // socket.on("reminder", (reminder) => {
      //   setReminderAlerts((prev) => [reminder, ...prev.slice(0, 4)]);
      // });
    }
    return () => {
      if (socket.connected) {
        socket.off("notification");
        socket.off("specialAttentionUpdate");
        // socket.off("reminder");
      }
    };
  }, []);

  // Chart data for bed status
  const bedData = {
    labels: ["Occupied", "Available", "Maintenance"],
    datasets: [
      {
        data: [18, 3, 2],
        backgroundColor: ["#3b82f6", "#10b981", "#f59e0b"],
        borderColor: ["#2563eb", "#059669", "#d97706"],
        borderWidth: 1,
      },
    ],
  };

  // Chart data for patient status
  const patientStatusData = {
    labels: ["Recovering", "Critical", "Stable", "New Admissions"],
    datasets: [
      {
        label: "Patients",
        data: [12, 3, 7, 5],
        backgroundColor: "#3b82f6",
        borderColor: "#2563eb",
        borderWidth: 1,
      },
    ],
  };

  const patientStatusOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Patient Status Distribution",
      },
    },
  };

  const bedOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Bed Occupancy Status",
      },
    },
  };

  // Modified JSX for Notifications section
  const renderNotificationsSection = () => (
    <motion.div
      className="p-5 bg-white rounded-xl shadow-md"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
    >
      <div className="flex items-center justify-between flex-wrap gap-4 mb-4">
        <h2 className="text-lg font-semibold flex items-center gap-2">
          <FontAwesomeIcon icon={faBell} className="text-blue-500" />
          Recent Notifications
        </h2>
        <div className="relative flex-1 max-w-xs">
          <input
            type="text"
            placeholder="Search notifications..."
            className="w-full pl-4 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <FontAwesomeIcon
            icon={faSearch}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-blue-50 text-blue-800">
            <tr>
              <th className="p-3 text-left rounded-tl-lg">Time</th>
              <th className="p-3 text-left">Bed</th>
              <th className="p-3 text-left">Patient</th>
              <th className="p-3 text-left rounded-tr-lg">Message</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {isLoading ? (
              <tr>
                <td colSpan="4" className="p-3 text-center">
                  Loading notifications...
                </td>
              </tr>
            ) : notifications.length > 0 ? (
              notifications.map((notification, idx) => (
                <motion.tr
                  key={notification._id || idx}
                  whileHover={{ backgroundColor: "rgba(59, 130, 246, 0.05)" }}
                  className={`${idx % 2 === 0 ? "bg-white" : "bg-gray-50"}`}
                >
                  <td className="p-3 font-medium">
                    {new Date(notification.timestamp).toLocaleTimeString()}
                  </td>
                  <td className="p-3">{notification.bedNumber}</td>
                  <td className="p-3">{notification.name}</td>
                  <td className="p-3">
                    <span className="font-semibold text-red-600">
                      {notification.vital}: {notification.value}
                    </span>
                  </td>
                </motion.tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="p-3 text-center text-gray-500">
                  No notifications yet
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </motion.div>
  );

  // Modified JSX for Special Attention section
  const renderSpecialAttentionSection = () => (
    <motion.div
      className="p-5 bg-white rounded-xl shadow-md lg:col-span-2"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 }}
    >
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold flex items-center gap-2">
          <FontAwesomeIcon
            icon={faExclamationTriangle}
            className="text-red-500"
          />
          Patients Needing Special Attention
        </h2>
        <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm">
          {specialAttentionPatients.length} Cases
        </span>
      </div>

      {isLoading ? (
        <div className="text-center py-8">Loading patient data...</div>
      ) : specialAttentionPatients.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {specialAttentionPatients.map((patient) => (
            <motion.div
              key={patient._id}
              whileHover={{ y: -5 }}
              className="bg-white border border-red-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-3">
                  <span className="text-red-600 font-bold">
                    {patient.bedNumber}
                  </span>
                </div>
                <h3 className="font-medium">{patient.name}</h3>
                <div className="mt-2">
                  <span className="px-2 py-1 bg-gray-800 text-white text-xs rounded">
                    Bed {patient.bedNumber}
                  </span>
                </div>
                <div className="mt-2">
                  <span className="px-2 py-1 bg-red-100 text-red-800 text-xs rounded">
                    {new Date(patient.lastCritical).toLocaleTimeString()}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8 text-gray-500">
          No patients currently require special attention
        </div>
      )}
    </motion.div>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="space-y-6"
    >
      {/* Stats Cards Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {[
          {
            title: "Total Beds",
            value: 23,
            icon: faBed,
            color: "bg-blue-100 text-blue-600",
            delay: 0.1,
          },
          {
            title: "Available Beds",
            value: 3,
            icon: faBed,
            color: "bg-green-100 text-green-600",
            delay: 0.2,
          },
          {
            title: "Nurses On Duty",
            value: 8,
            icon: faUserNurse,
            color: "bg-purple-100 text-purple-600",
            delay: 0.3,
          },
          {
            title: "Pending Alerts",
            value: 5,
            icon: faBell,
            color: "bg-yellow-100 text-yellow-600",
            delay: 0.4,
          },
        ].map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: stat.delay }}
            className={`p-5 rounded-xl shadow-md flex items-center justify-between ${stat.color}`}
          >
            <div>
              <p className="text-sm font-medium">{stat.title}</p>
              <p className="text-2xl font-bold">{stat.value}</p>
            </div>
            <div className="p-3 rounded-full bg-white bg-opacity-30">
              <FontAwesomeIcon icon={stat.icon} size="lg" />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Ward staff */}
        <motion.div
          className="p-5 bg-white rounded-xl shadow-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <FontAwesomeIcon icon={faUserNurse} className="text-blue-500" />
              Ward Staff Assignments
            </h2>
            <div className="flex gap-2">
              <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                Assigned: 3
              </span>
              <span className="px-2 py-1 bg-red-100 text-red-800 text-xs rounded-full">
                Pending: 2
              </span>
            </div>
          </div>

          <div className="space-y-3">
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.02 }}
                className="flex gap-3 w-full items-center"
              >
                <div className="bg-blue-500 text-white p-2 rounded-lg w-12 text-center font-medium">
                  10{i + 1}
                </div>
                <div className="bg-gray-100 flex-1 p-2 rounded-lg">
                  Nurse {String.fromCharCode(65 + i)}. Perera
                </div>
                <div className="bg-green-500 rounded-lg text-white p-2 w-10 h-10 flex items-center justify-center">
                  <FontAwesomeIcon icon={faCheck} />
                </div>
              </motion.div>
            ))}

            {[...Array(2)].map((_, i) => (
              <motion.div
                key={i + 3}
                whileHover={{ scale: 1.02 }}
                className="flex gap-3 w-full items-center"
              >
                <div className="bg-blue-500 text-white p-2 rounded-lg w-12 text-center font-medium">
                  20{i + 1}
                </div>
                <div className="bg-gray-100 flex-1 p-2 rounded-lg">
                  Nurse {String.fromCharCode(68 + i)}. Silva
                </div>
                <div className="bg-red-500 rounded-lg text-white p-2 w-10 h-10 flex items-center justify-center">
                  <FontAwesomeIcon icon={faXmark} />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Bed Status Chart */}
        <motion.div
          className="p-5 bg-white rounded-xl shadow-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <FontAwesomeIcon icon={faChartPie} className="text-blue-500" />
              Bed Occupancy Status
            </h2>
          </div>
          <div className="h-64">
            <Pie data={bedData} options={bedOptions} />
          </div>
        </motion.div>

        {/* Notifications */}
        {renderNotificationsSection()}
        {/* <motion.div
          className="p-5 bg-white rounded-xl shadow-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="flex items-center justify-between flex-wrap gap-4 mb-4">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <FontAwesomeIcon icon={faBell} className="text-blue-500" />
              Recent Notifications
            </h2>
            <div className="relative flex-1 max-w-xs">
              <input
                type="text"
                placeholder="Search notifications..."
                className="w-full pl-4 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <FontAwesomeIcon
                icon={faSearch}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-blue-50 text-blue-800">
                <tr>
                  <th className="p-3 text-left rounded-tl-lg">Reference No.</th>
                  <th className="p-3 text-left">Message</th>
                  <th className="p-3 text-left rounded-tr-lg">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {[
                  {
                    ref: "REF001",
                    msg: "Patient admitted to ward 5",
                    status: "Resolved",
                    color: "text-green-600 bg-green-50",
                  },
                  {
                    ref: "REF002",
                    msg: "Bed unavailable in ward 3",
                    status: "Pending",
                    color: "text-red-600 bg-red-50",
                  },
                  {
                    ref: "REF003",
                    msg: "New nurse assigned to ward 1",
                    status: "Resolved",
                    color: "text-green-600 bg-green-50",
                  },
                  {
                    ref: "REF004",
                    msg: "Request for medical supplies",
                    status: "In Progress",
                    color: "text-yellow-600 bg-yellow-50",
                  },
                ].map((n, idx) => (
                  <motion.tr
                    key={idx}
                    whileHover={{ backgroundColor: "rgba(59, 130, 246, 0.05)" }}
                    className={`${idx % 2 === 0 ? "bg-white" : "bg-gray-50"}`}
                  >
                    <td className="p-3 font-medium">{n.ref}</td>
                    <td className="p-3">{n.msg}</td>
                    <td className={`p-3 font-semibold ${n.color} rounded`}>
                      {n.status}
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div> */}

        {/* Patient Status Chart */}
        <motion.div
          className="p-5 bg-white rounded-xl shadow-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <FontAwesomeIcon icon={faChartLine} className="text-blue-500" />
              Patient Status Overview
            </h2>
          </div>
          <div className="h-64">
            <Bar data={patientStatusData} options={patientStatusOptions} />
          </div>
        </motion.div>

        {/* Special Attention */}
        {renderSpecialAttentionSection()}
        {/* <motion.div
          className="p-5 bg-white rounded-xl shadow-md lg:col-span-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <FontAwesomeIcon
                icon={faExclamationTriangle}
                className="text-red-500"
              />
              Patients Needing Special Attention
            </h2>
            <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm">
              5 Cases
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -5 }}
                className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex flex-col items-center text-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-3">
                    <span className="text-blue-600 font-bold">{i + 1}</span>
                  </div>
                  <h3 className="font-medium">D.S. Senanayake</h3>
                  <div className="mt-2">
                    <span className="px-2 py-1 bg-gray-800 text-white text-xs rounded">
                      Ward 0{i + 1}
                    </span>
                  </div>
                  <div className="mt-2">
                    <span className="px-2 py-1 bg-red-100 text-red-800 text-xs rounded">
                      Priority {i + 1}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div> */}
      </div>
    </motion.div>
  );
};

export default Overview;
