import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Line, Bar } from "react-chartjs-2";
import { useNavigate } from "react-router-dom";
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
  Filler,
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
import api from "../../api/api";

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const Overview = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [vitals, setVitals] = useState([]);
  const [vitalsLoading, setVitalsLoading] = useState(true);
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

        const res = await axios.get(`${api}/api/auth/${currentUserId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.data) {
          setPatientData((prev) => ({
            ...prev,
            name: res.data.user.name || "N/A",
            age: res.data.age || "N/A",
            gender: res.data.gender || "N/A",
            admissionDate: res.data.admissionDate
              ? new Date(res.data.admissionDate).toLocaleDateString()
              : "N/A",
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

    const fetchPatientVitals = async () => {
      try {
        const token = localStorage.getItem("token");
        const currentUserId = localStorage.getItem("userId");

        if (!token || !currentUserId) {
          throw new Error("Authentication required");
        }

        setVitalsLoading(true);
        const response = await axios.get(
          `${api}/api/vitals/patient/${currentUserId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        setVitals(response.data.data);

        // If vitals data exists, update the vital signs state
        // if (response.data.data && response.data.data.length > 0) {
        //   const latestVitals = response.data.data[0]; // Get the most recent record

        //   setVitalSigns({
        //     temperature: latestVitals.vitals.bodyTemperature || 37.5,
        //     heartRate: latestVitals.vitals.pulseRate || 88,
        //     bloodPressure: `${
        //       latestVitals.vitals.bloodPressureSupine?.systolic || 120
        //     }/${latestVitals.vitals.bloodPressureSupine?.diastolic || 80}`,
        //     platelets: latestVitals.vitals.plt || 85000,
        //     weight: patientData.weight || 72,
        //     hydration: "Adequate",
        //   });
        // }
      } catch (error) {
        console.error("Error fetching patient vitals:", error);
      } finally {
        setVitalsLoading(false);
      }
    };

    // Only fetch vitals if user is logged in
    if (localStorage.getItem("userId")) {
      fetchPatientVitals();
      fetchPatientData();
    }
  }, []);

  const handleAddFluidIntakeOutput = () => {
    const userId = localStorage.getItem("userId");
    if (userId) {
      navigate(`/caretaker-input-form/${userId}`);
    } else {
      console.error("User ID not found");
      // Optionally show an error message to the user
    }
  };

  const formatChartDate = (dateString) => {
    const date = new Date(dateString);
    return (
      date.toLocaleDateString() +
      " " +
      date.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true, // This ensures AM/PM is included
      })
    );
  };

  const formatDateOnly = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };
  // Chart data and options remain the same
  // const tempChartData = {
  //   labels: ["Day 1", "Day 2", "Day 3", "Day 4", "Day 5", "Day 6", "Today"],
  //   datasets: [
  //     {
  //       label: "Temperature (°C)",
  //       data: [38.2, 39.1, 38.5, 37.8, 37.6, 37.3, 37.5],
  //       borderColor: "rgb(239, 68, 68)",
  //       backgroundColor: "rgba(239, 68, 68, 0.1)",
  //       tension: 0.3,
  //       fill: true,
  //     },
  //   ],
  // };

  // const plateletChartData = {
  //   labels: ["Day 1", "Day 3", "Day 5", "Today"],
  //   datasets: [
  //     {
  //       label: "Platelet Count (per μL)",
  //       data: [45000, 60000, 75000, 85000],
  //       backgroundColor: "rgba(59, 130, 246, 0.7)",
  //       borderColor: "rgb(59, 130, 246)",
  //       borderWidth: 1,
  //     },
  //   ],
  // };

  // const chartOptions = {
  //   responsive: true,
  //   plugins: {
  //     legend: {
  //       position: "top",
  //     },
  //     tooltip: {
  //       mode: "index",
  //       intersect: false,
  //     },
  //   },
  //   scales: {
  //     y: {
  //       beginAtZero: false,
  //     },
  //   },
  // };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
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
    <div className="w-full gap-6 mb-6">
      {/* Patient Info Card */}
      <motion.div
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.3 }}
        className="bg-blue-100 rounded-lg shadow-md p-6">
        <div className="flex items-center mb-3">
          <div className="pr-3">
            <FontAwesomeIcon icon={faUser} size="sm" />
          </div>
          <h2 className="text-xl font-bold text-gray-800">
            Patient Information
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="flex gap-3">
            <span className="text-gray-600">Name:</span>
            <span className="font-medium">{patientData.name}</span>
          </div>
          <div className="flex gap-3">
            <span className="text-gray-600">Age/Gender:</span>
            <span className="font-medium">
              {patientData.age} / {patientData.gender}
            </span>
          </div>
          <div className="flex gap-3">
            <span className="text-gray-600">Admission Date:</span>
            <span className="font-medium">{patientData.admissionDate}</span>
          </div>
        </div>
      </motion.div>

      <div className="w-full flex justify-end mt-9">
        <button
          onClick={handleAddFluidIntakeOutput}
          className="font-semibold shadow-sm text-white bg-gray-700 hover:bg-gray-900 transition-colors py-2 px-4 rounded-lg">
          + Add Fluid Intake and Output
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-9">
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
          <div className="h-72">
            {" "}
            {/* Increased height for better visualization */}
            {vitalsLoading ? (
              <div className="h-full flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
              </div>
            ) : vitals.length > 0 ? (
              <Line
                data={{
                  labels: vitals
                    .slice(0, 7)
                    .map((v) => formatChartDate(v.timestamp)),
                  datasets: [
                    {
                      label: "Temperature (°C)",
                      data: vitals
                        .slice(0, 7)
                        .map((v) => v.vitals.bodyTemperature),
                      borderColor: "rgb(239, 68, 68)",
                      backgroundColor: "rgba(239, 68, 68, 0.1)",
                      fill: true,
                      tension: 0.3,
                      pointRadius: 3,
                      pointBackgroundColor: "rgb(239, 68, 68)",
                    },
                  ],
                }}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  scales: {
                    x: {
                      title: {
                        display: true,
                        text: "Date & Time",
                      },
                      ticks: {
                        maxRotation: 45,
                        minRotation: 45,
                        callback: function (value, index) {
                          const label = this.getLabelForValue(value);
                          if (!label) return "";

                          // Parse the datetime string to get time with AM/PM
                          const parts = label.split(" ");
                          if (parts.length < 3) return label;

                          // Get the time part and AM/PM indicator
                          const time = parts[1];
                          const ampm = parts[2] || "";
                          return `${time} ${ampm}`;
                        },
                      },
                    },
                    y: {
                      beginAtZero: false,
                      min: 35,
                      max: 40,
                      title: {
                        display: true,
                        text: "°C",
                      },
                      ticks: {
                        callback: function (value) {
                          return value + "°C";
                        },
                      },
                    },
                  },
                  plugins: {
                    legend: {
                      display: false,
                    },
                    tooltip: {
                      callbacks: {
                        title: function (tooltipItems) {
                          return vitals[tooltipItems[0].dataIndex].timestamp
                            ? formatChartDate(
                                vitals[tooltipItems[0].dataIndex].timestamp
                              )
                            : "";
                        },
                        label: function (context) {
                          return `Temperature: ${context.parsed.y}°C`;
                        },
                      },
                    },
                  },
                }}
              />
            ) : (
              <div className="h-full flex items-center justify-center text-gray-500">
                No temperature data available
              </div>
            )}
          </div>
          {/* Removed current value and status indicator */}
        </motion.div>

        {/* Platelet Count Chart Card */}
        <motion.div
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.3 }}
          className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center mb-4">
            <div className="p-3 rounded-full bg-purple-100 text-purple-600 mr-4">
              <FontAwesomeIcon icon={faTint} size="lg" />
            </div>
            <h2 className="text-xl font-semibold text-gray-800">
              Platelet Count
            </h2>
          </div>
          <div className="h-72">
            {" "}
            {/* Increased height for better visualization */}
            {vitalsLoading ? (
              <div className="h-full flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
              </div>
            ) : vitals.length > 0 ? (
              <Bar
                data={{
                  labels: vitals
                    .slice(0, 7)
                    .map((v) => formatDateOnly(v.timestamp)),
                  datasets: [
                    {
                      label: "Platelet Count (/μL)",
                      data: vitals.slice(0, 7).map((v) => v.vitals.plt),
                      backgroundColor: "rgba(59, 130, 246, 0.7)",
                      borderColor: "rgb(59, 130, 246)",
                      borderWidth: 1,
                      borderRadius: 5,
                      hoverBackgroundColor: "rgba(59, 130, 246, 0.9)",
                    },
                  ],
                }}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  scales: {
                    x: {
                      title: {
                        display: true,
                        text: "Date",
                      },
                      ticks: {
                        maxRotation: 45,
                        minRotation: 45,
                      },
                    },
                    y: {
                      beginAtZero: false,
                      title: {
                        display: true,
                        text: "Platelets (/μL)",
                      },
                      ticks: {
                        callback: function (value) {
                          return value.toLocaleString();
                        },
                      },
                    },
                  },
                  plugins: {
                    legend: {
                      display: false,
                    },
                    tooltip: {
                      callbacks: {
                        title: function (tooltipItems) {
                          return vitals[tooltipItems[0].dataIndex].timestamp
                            ? formatChartDate(
                                vitals[tooltipItems[0].dataIndex].timestamp
                              )
                            : "";
                        },
                        label: function (context) {
                          const value = parseInt(context.parsed.y);
                          return `Platelets: ${value.toLocaleString()}/μL${
                            value < 130000 ? " (Low)" : ""
                          }`;
                        },
                      },
                    },
                  },
                }}
              />
            ) : (
              <div className="h-full flex items-center justify-center text-gray-500">
                No platelet data available
              </div>
            )}
          </div>
          {/* Removed current value and status indicator */}
        </motion.div>
      </div>

      {/* Quick Stats
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
      </motion.div> */}
    </div>
  );
};

export default Overview;
