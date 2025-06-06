import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Line, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeartbeat,
  faThermometerHalf,
  faTint,
  faWeight,
  faCalendarAlt,
  faUser,
  faBell,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Overview = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [patientData, setPatientData] = useState({
    name: "",
    age: "",
    gender: "",
    dengueType: "",
    severity: "Moderate",
    admissionDate: "",
    doctor: "",
    lastCheckup: "",
    nextAppointment: "",
    status: "Recovering",
  });

  const [vitalSigns, setVitalSigns] = useState({
    temperature: 37.5,
    heartRate: 88,
    bloodPressure: "120/80",
    platelets: 85000,
    weight: 72,
    hydration: "Adequate",
  });

  useEffect(() => {
    const fetchPatientData = async () => {
      try {
        const token = localStorage.getItem("token");
        const currentUserId = localStorage.getItem("userId");

        if (!token || !currentUserId) {
          throw new Error("Authentication required");
        }
        console.log("Fetching patient data for user ID:", currentUserId);

        const res = await axios.get(
          `http://localhost:5000/api/auth/${currentUserId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (res.data) {
          setPatientData((prev) => ({
            ...prev,
            name: res.data.user.name || "N/A",
            age: res.data.age || "N/A",
            gender: res.data.gender || "N/A",
            dengueType: res.data.dengueType || "N/A",
            severity: res.data.severity || "Moderate",
            admissionDate: res.data.admissionDate
              ? new Date(res.data.admissionDate).toLocaleDateString()
              : "N/A",
            doctor: res.data.doctor || "N/A",
          }));
        }
      } catch (err) {
        console.error("Fetch error:", err);
        setError(err.response?.data?.message || "Failed to load patient data");
        if (err.response?.status === 401) {
          window.location.href = "/login";
        }
      } finally {
        setLoading(false);
      }
    };

    fetchPatientData();
  }, []);

  // Chart data and options remain the same
  const tempChartData = {
    labels: ["Day 1", "Day 2", "Day 3", "Day 4", "Day 5", "Day 6", "Today"],
    datasets: [
      {
        label: "Temperature (°C)",
        data: [38.2, 39.1, 38.5, 37.8, 37.6, 37.3, 37.5],
        borderColor: "rgb(239, 68, 68)",
        backgroundColor: "rgba(239, 68, 68, 0.1)",
        tension: 0.3,
        fill: true,
      },
    ],
  };

  const plateletChartData = {
    labels: ["Day 1", "Day 3", "Day 5", "Today"],
    datasets: [
      {
        label: "Platelet Count (per μL)",
        data: [45000, 60000, 75000, 85000],
        backgroundColor: "rgba(59, 130, 246, 0.7)",
        borderColor: "rgb(59, 130, 246)",
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      tooltip: {
        mode: "index",
        intersect: false,
      },
    },
    scales: {
      y: {
        beginAtZero: false,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "recovering":
        return "bg-green-100 text-green-800";
      case "moderate":
        return "bg-yellow-100 text-yellow-800";
      case "severe":
        return "bg-red-100 text-red-800";
      default:
        return "bg-blue-100 text-blue-800";
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-1"></div>
      </div>
    );
  }

  if (error) return <div className="p-4 text-red-500">{error}</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
      {/* Patient Info Card */}
      <motion.div
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.3 }}
        className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center mb-4">
          <div className="p-3 rounded-full bg-blue-100 text-blue-600 mr-4">
            <FontAwesomeIcon icon={faUser} size="lg" />
          </div>
          <h2 className="text-xl font-semibold text-gray-800">
            Patient Information
          </h2>
        </div>
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-gray-600">Name:</span>
            <span className="font-medium">{patientData.name}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Age/Gender:</span>
            <span className="font-medium">
              {patientData.age} / {patientData.gender}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Dengue Type:</span>
            <span className="font-medium">{patientData.dengueType}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Severity:</span>
            <span
              className={`font-medium px-2 py-1 rounded-full text-xs ${getStatusColor(
                patientData.severity
              )}`}>
              {patientData.severity}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Admission Date:</span>
            <span className="font-medium">{patientData.admissionDate}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Attending Doctor:</span>
            <span className="font-medium">{patientData.doctor}</span>
          </div>
        </div>
      </motion.div>

      {/* Status Card */}
      <motion.div
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.3, delay: 0.1 }}
        className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center mb-4">
          <div className="p-3 rounded-full bg-green-100 text-green-600 mr-4">
            <FontAwesomeIcon icon={faCalendarAlt} size="lg" />
          </div>
          <h2 className="text-xl font-semibold text-gray-800">
            Current Status
          </h2>
        </div>
        <div className="space-y-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <div className="flex justify-between items-center">
              <span className="text-gray-700">Recovery Status</span>
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                  patientData.status
                )}`}>
                {patientData.status}
              </span>
            </div>
            <div className="mt-2 h-2 w-full bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-blue-500 rounded-full"
                style={{
                  width:
                    patientData.status === "Recovering"
                      ? "75%"
                      : patientData.status === "Moderate"
                      ? "50%"
                      : "25%",
                }}></div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-50 p-3 rounded-lg">
              <p className="text-sm text-gray-500">Last Checkup</p>
              <p className="font-medium">{patientData.lastCheckup}</p>
            </div>
            <div className="bg-gray-50 p-3 rounded-lg">
              <p className="text-sm text-gray-500">Next Appointment</p>
              <p className="font-medium text-blue-600">
                {patientData.nextAppointment}
              </p>
            </div>
          </div>

          <div className="bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-400">
            <h3 className="font-medium text-yellow-800 flex items-center">
              <FontAwesomeIcon icon={faBell} className="mr-2" />
              Important Notice
            </h3>
            <p className="text-sm text-yellow-700 mt-1">
              Drink at least 3L of fluids daily and monitor for any bleeding
              symptoms.
            </p>
          </div>
        </div>
      </motion.div>

      {/* Temperature Chart Card */}
      <motion.div
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.3, delay: 0.2 }}
        className="bg-white rounded-lg shadow-md p-6 md:col-span-2 lg:col-span-1">
        <div className="flex items-center mb-4">
          <div className="p-3 rounded-full bg-red-100 text-red-600 mr-4">
            <FontAwesomeIcon icon={faThermometerHalf} size="lg" />
          </div>
          <h2 className="text-xl font-semibold text-gray-800">
            Temperature Trend
          </h2>
        </div>
        <div className="h-64">
          <Line data={tempChartData} options={chartOptions} />
        </div>
        <div className="mt-4 flex justify-between items-center">
          <div className="flex items-center">
            <span className="text-gray-600 mr-2">Current:</span>
            <span className="text-xl font-bold">
              {vitalSigns.temperature}°C
            </span>
          </div>
          <span
            className={`px-2 py-1 rounded-full text-xs ${
              vitalSigns.temperature > 37.5
                ? "bg-red-100 text-red-800"
                : "bg-green-100 text-green-800"
            }`}>
            {vitalSigns.temperature > 37.5 ? "Mild Fever" : "Normal"}
          </span>
        </div>
      </motion.div>

      {/* Platelet Count Chart Card */}
      <motion.div
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.3 }}
        className="bg-white rounded-lg shadow-md p-6 md:col-span-2">
        <div className="flex items-center mb-4">
          <div className="p-3 rounded-full bg-purple-100 text-purple-600 mr-4">
            <FontAwesomeIcon icon={faTint} size="lg" />
          </div>
          <h2 className="text-xl font-semibold text-gray-800">
            Platelet Count
          </h2>
        </div>
        <div className="h-64">
          <Bar data={plateletChartData} options={chartOptions} />
        </div>
        <div className="mt-4 flex justify-between items-center">
          <div className="flex items-center">
            <span className="text-gray-600 mr-2">Current:</span>
            <span className="text-xl font-bold">
              {vitalSigns.platelets.toLocaleString()}/μL
            </span>
          </div>
          <span
            className={`px-2 py-1 rounded-full text-xs ${
              vitalSigns.platelets < 100000
                ? "bg-yellow-100 text-yellow-800"
                : "bg-green-100 text-green-800"
            }`}>
            {vitalSigns.platelets < 100000 ? "Monitor Closely" : "Normal Range"}
          </span>
        </div>
      </motion.div>

      {/* Quick Stats */}
      <motion.div
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.3, delay: 0.1 }}
        className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Quick Stats
        </h2>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <div className="flex flex-col items-center justify-center">
              <div className="p-2 rounded-full bg-blue-100 text-blue-600 mr-3">
                <FontAwesomeIcon icon={faHeartbeat} />
              </div>
              <div>
                <p className="text-sm text-gray-600">Heart Rate</p>
                <p className="text-lg font-bold">{vitalSigns.heartRate} bpm</p>
              </div>
            </div>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <div className="flex flex-col items-center justify-center">
              <div className="p-2 rounded-full bg-green-100 text-green-600 mr-3">
                <FontAwesomeIcon icon={faWeight} />
              </div>
              <div>
                <p className="text-sm text-gray-600">Weight</p>
                <p className="text-lg font-bold">{vitalSigns.weight} kg</p>
              </div>
            </div>
          </div>
          <div className="bg-red-50 p-4 rounded-lg">
            <div className="flex items-center">
              <div className="p-2 rounded-full bg-red-100 text-red-600 mr-3">
                <FontAwesomeIcon icon={faThermometerHalf} />
              </div>
              <div>
                <p className="text-sm text-gray-600">Blood Pressure</p>
                <p className="text-lg font-bold">{vitalSigns.bloodPressure}</p>
              </div>
            </div>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg">
            <div className="flex flex-col items-center justify-center">
              <div className="p-2 rounded-full bg-purple-100 text-purple-600 mr-3">
                <FontAwesomeIcon icon={faTint} />
              </div>
              <div>
                <p className="text-sm text-gray-600">Hydration</p>
                <p className="text-lg font-bold">{vitalSigns.hydration}</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Overview;
