import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { Line, Bar } from "react-chartjs-2";
import {
  faArrowLeft,
  faUser,
  faSignOutAlt,
  faTint,
  faWater,
  faFlask,
  faBed,
  faChartLine,
  faCalendarDay,
  faNotesMedical,
  faMapMarkerAlt,
  faWaveSquare,
  faTemperatureHigh,
  faLungs,
  faHeartPulse,
  faClock,
  faDroplet,
  faTachometerAlt,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import api from "../../api/api";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const Profile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [patient, setPatient] = useState(null);
  const [vitals, setVitals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [vitalsLoading, setVitalsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [fluidData, setFluidData] = useState([]);
  const [fluidLoading, setFluidLoading] = useState(true);

  //For fetch patient data
  useEffect(() => {
    const fetchPatientDetails = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${api}/api/patients/${id}`);
        setPatient(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching patient details:", error);
        setError("Failed to load patient details. Please try again.");
        setLoading(false);
      }
    };

    fetchPatientDetails();
  }, [id]);

  // Fetch patient vitals
  useEffect(() => {
    const fetchPatientVitals = async () => {
      if (!patient || !patient.userId) return;

      try {
        setVitalsLoading(true);
        const response = await axios.get(
          `${api}/api/vitals/patient/${patient.userId}`
        );
        setVitals(response.data.data);
      } catch (error) {
        console.error("Error fetching patient vitals:", error);
      } finally {
        setVitalsLoading(false);
      }
    };

    fetchPatientVitals();
  }, [patient]);

  // Fetch fluid data for the patient
  useEffect(() => {
    const fetchFluidData = async () => {
      if (!patient || !patient.id) return;

      try {
        setFluidLoading(true);
        const response = await axios.get(
          `${api}/api/fluid/patient/${patient.id}`
        );

        if (response.data.success) {
          setFluidData(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching fluid data:", error);
      } finally {
        setFluidLoading(false);
      }
    };

    fetchFluidData();
  }, [patient]);

  // Filter data for input and output tables
  const inputData = fluidData.filter(
    (item) =>
      item.fluidKind !== "Not mentioned" ||
      item.intakeType !== "Not mentioned" ||
      item.intakeVolume !== 0
  );

  const outputData = fluidData.filter(
    (item) => item.urineOutput !== 0 || item.outputTypes.length > 0
  );

  // Handler for navigating to the PatientForm component with the patient userID
  const handleAddVitals = () => {
    navigate(`/patient-form/${patient.userId}`, {
      state: { patientData: patient },
    });
  };

  // Format date function
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Handler for generating reports
  const handleGenerateReports = (patientId) => {
    navigate(`/reports/${patientId}`);
  };

  // Handler for discharging the patient
  const handleDischarge = () => {
    navigate(`/discharge/${id}`);
  };

  // Add this function to handle adding fluid data
  const handleAddFluidData = () => {
    if (patient && patient.userId) {
      navigate(`/caretaker-input-form/${patient.userId}`);
    }
  };

  if (loading) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="p-6 flex justify-center items-center h-full">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading patient details...</p>
        </div>
      </motion.div>
    );
  }

  if (error || !patient) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="p-6 text-center text-red-500">
        {error || "Patient not found"}
        <div className="mt-4">
          <button
            onClick={() => navigate(-1)}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
            Back to Patients List
          </button>
        </div>
      </motion.div>
    );
  }

  //function to format chart date
  const formatChartDate = (dateString) => {
    if (!dateString) return "";

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

  // function to format just the date without time
  const formatDateOnly = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="p-4 md:p-6">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 mb-6 text-blue-600 hover:text-blue-800 transition-colors">
        <FontAwesomeIcon icon={faArrowLeft} />
        <span>Back to Patients</span>
      </button>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="bg-[#00BFA5] text-white p-4 md:p-6 mb-3">
          <h1 className="text-2xl md:text-3xl font-bold">{patient.name}</h1>
          <p className="">Bed Number : {patient.bedNumber}</p>
        </div>

        <div className="p-5 flex flex-col md:flex-row gap-6 justify-center md:justify-end items-end md:items-center">
          <button
            onClick={handleAddVitals}
            className="font-semibold shadow-sm text-white bg-gray-700 hover:bg-gray-900 transition-colors py-2 px-4 rounded-lg">
            + Add vitals Records
          </button>
          <button
            onClick={() => handleGenerateReports(patient.id)}
            className="font-semibold shadow-sm text-white bg-gray-700 hover:bg-gray-900 transition-colors py-2 px-4 rounded-lg">
            Generate Reports
          </button>
          <button
            onClick={handleDischarge}
            className="font-semibold shadow-sm text-white bg-red-500 hover:bg-red-600 transition-colors py-2 px-4 rounded-lg">
            <FontAwesomeIcon icon={faSignOutAlt} className="mr-1" />
            Discharge
          </button>
        </div>

        <div className="grid bg-[#E5F8F6] shadow-lg grid-cols-1 md:grid-cols-2 gap-6 rounded-lg m-5 p-4 md:p-6">
          {/* Personal Information */}
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <FontAwesomeIcon icon={faUser} />
              <span>Personal Information</span>
            </h2>
            <div className="space-y-3">
              <div className="flex items-center gap-4">
                <span className="text-gray-600">Admission Date:</span>
                <span className="font-medium flex items-center gap-2">
                  <FontAwesomeIcon
                    icon={faCalendarDay}
                    className="text-green-500"
                  />
                  {new Date(patient.admissionDate).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                  })}
                </span>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-gray-600 w-32">Age:</span>
                <span className="font-medium">{patient.age} years</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-gray-600 w-32">Weight:</span>
                <span className="font-medium">{patient.weight} Kg</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-gray-600 w-32">Gender:</span>
                <span className="font-medium flex items-center gap-2">
                  {patient.gender}
                </span>
              </div>
            </div>
          </div>

          {/* Bystander Information */}
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <FontAwesomeIcon icon={faUser} />
              <span>Bystander Information</span>
            </h2>
            <div className="space-y-3">
              <div className="flex items-center gap-4">
                <span className="text-gray-600 w-32">Name:</span>
                <span className="font-medium">{patient.bystanderName}</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-gray-600 w-32">Email:</span>
                <span className="font-medium text-blue-500">
                  {patient.email}
                </span>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-gray-600 w-32">Address:</span>
                <span className="font-medium">
                  <FontAwesomeIcon
                    icon={faMapMarkerAlt}
                    className="text-gray-500 mr-2"
                  />
                  {patient.bystanderAddress}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Vital Signs Charts */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4 m-3">
          {/* Temperature Chart */}
          <div className="bg-white rounded-lg shadow p-4">
            <h3 className="text-md font-semibold mb-3 flex items-center gap-2">
              <FontAwesomeIcon
                icon={faTemperatureHigh}
                className="text-red-500"
              />
              Temperature History
            </h3>
            {vitalsLoading ? (
              <div className="h-52 flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
              </div>
            ) : vitals.length > 0 ? (
              <div className="h-52">
                <Line
                  data={{
                    labels: vitals
                      .slice(0, 10)
                      .map((v) => formatChartDate(v.timestamp)),
                    datasets: [
                      {
                        label: "Temperature (°C)",
                        data: vitals
                          .slice(0, 10)
                          .map((v) => v.vitals.bodyTemperature),
                        borderColor: "rgb(255, 99, 132)",
                        backgroundColor: "rgba(255, 99, 132, 0.1)",
                        fill: true,
                        tension: 0.4,
                        pointRadius: 3,
                        pointBackgroundColor: "rgb(255, 99, 132)",
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
                          autoSkip: true,
                          maxTicksLimit: 10,
                          callback: function (value, index) {
                            // Display shorter labels on the chart with AM/PM
                            const label = this.getLabelForValue(value);
                            const parts = label.split(" ");
                            // Get the time part and the AM/PM indicator
                            const timeParts = parts[1].split(":");
                            const amPm = parts[2] || ""; // Extract AM/PM if available
                            return `${timeParts[0]}:${timeParts[1]} ${amPm}`;
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
                            // Show full date and time in tooltip
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
              </div>
            ) : (
              <div className="h-52 flex items-center justify-center text-gray-500">
                No temperature data available
              </div>
            )}
          </div>

          {/* Platelet Count Chart */}
          <div className="bg-white rounded-lg shadow p-4">
            <h3 className="text-md font-semibold mb-3 flex items-center gap-2">
              <FontAwesomeIcon icon={faDroplet} className="text-purple-500" />
              Platelet Count History
            </h3>
            {vitalsLoading ? (
              <div className="h-52 flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
              </div>
            ) : vitals.length > 0 ? (
              <div className="h-52">
                <Bar
                  data={{
                    labels: vitals
                      .slice(0, 10)
                      .map((v) => formatDateOnly(v.timestamp)),
                    datasets: [
                      {
                        label: "Platelet Count (/mm³)",
                        data: vitals.slice(0, 10).map((v) => v.vitals.plt),
                        backgroundColor: "rgba(153, 102, 255, 0.7)",
                        borderColor: "rgb(153, 102, 255)",
                        borderWidth: 1,
                        borderRadius: 5,
                        hoverBackgroundColor: "rgba(153, 102, 255, 0.9)",
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
                          text: "Platelets (/mm³)",
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
                            return `Platelets: ${value.toLocaleString()}/mm³${
                              value < 130000 ? " (Low)" : ""
                            }`;
                          },
                        },
                      },
                    },
                  }}
                />
              </div>
            ) : (
              <div className="h-52 flex items-center justify-center text-gray-500">
                No platelet count data available
              </div>
            )}
          </div>

          {/* MAP Chart */}
          <div className="bg-white rounded-lg shadow p-4">
            <h3 className="text-md font-semibold mb-3 flex items-center gap-2">
              <FontAwesomeIcon icon={faChartLine} className="text-blue-500" />
              Mean Arterial Pressure History
            </h3>
            {vitalsLoading ? (
              <div className="h-52 flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
              </div>
            ) : vitals.length > 0 ? (
              <div className="h-52">
                <Line
                  data={{
                    labels: vitals
                      .slice(0, 10)
                      .map((v) => formatChartDate(v.timestamp)),
                    datasets: [
                      {
                        label: "MAP (mmHg)",
                        data: vitals
                          .slice(0, 10)
                          .map(
                            (v) =>
                              v.vitals.bloodPressureSupine?.meanArterialPressure
                          ),
                        borderColor: "rgb(54, 162, 235)",
                        backgroundColor: "rgba(54, 162, 235, 0.1)",
                        fill: true,
                        tension: 0.4,
                        pointRadius: 3,
                        pointBackgroundColor: "rgb(54, 162, 235)",
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
                          autoSkip: true,
                          maxTicksLimit: 10,
                          callback: function (value, index) {
                            // Display shorter labels on the chart with AM/PM
                            const label = this.getLabelForValue(value);
                            const parts = label.split(" ");
                            // Get the time part and the AM/PM indicator
                            const timeParts = parts[1].split(":");
                            const amPm = parts[2] || ""; // Extract AM/PM if available
                            return `${timeParts[0]}:${timeParts[1]} ${amPm}`;
                          },
                        },
                      },
                      y: {
                        beginAtZero: false,
                        min: 40,
                        max: 120,
                        title: {
                          display: true,
                          text: "mmHg",
                        },
                        ticks: {
                          callback: function (value) {
                            return value + " mmHg";
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
                            return `MAP: ${context.parsed.y} mmHg`;
                          },
                        },
                      },
                    },
                  }}
                />
              </div>
            ) : (
              <div className="h-52 flex items-center justify-center text-gray-500">
                No MAP data available
              </div>
            )}
          </div>
        </motion.div>
        {/* End of vital signs charts Section */}

        {/* Fluid Data Tables */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4 m-3">
          {/* Fluid Input Table */}
          <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            <div className="bg-blue-100 p-3 md:p-4 flex justify-between items-center">
              <h2 className="text-lg font-bold flex items-center">
                <FontAwesomeIcon
                  icon={faDroplet}
                  className="mr-2 text-blue-600"
                />
                Fluid Input Records
              </h2>
              <button
                onClick={handleAddFluidData}
                className="text-white bg-gray-700 hover:bg-gray-900 transition-colors py-2 px-3 rounded-lg text-sm">
                + Add New
              </button>
            </div>

            <div className="p-2">
              {fluidLoading ? (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
                  <p className="mt-2 text-sm text-gray-600">
                    Loading fluid data...
                  </p>
                </div>
              ) : inputData.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-500">No fluid input records found.</p>
                </div>
              ) : (
                <div className="overflow-y-auto" style={{ maxHeight: "300px" }}>
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50 sticky top-0">
                      <tr>
                        <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Date
                        </th>
                        <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Time
                        </th>
                        <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Fluid Kind
                        </th>
                        <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Intake Type
                        </th>
                        <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Volume (ml)
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {inputData.map((item, index) => (
                        <tr
                          key={item._id}
                          className={
                            index % 2 === 0 ? "bg-gray-50" : "bg-white"
                          }>
                          <td className="px-3 py-2 whitespace-nowrap text-xs font-medium text-gray-900">
                            {item.formattedDate}
                          </td>
                          <td className="px-3 py-2 whitespace-nowrap text-xs text-gray-900">
                            {item.formattedTime}
                          </td>
                          <td className="px-3 py-2 whitespace-nowrap text-xs text-gray-900">
                            {item.fluidKind}
                          </td>
                          <td className="px-3 py-2 whitespace-nowrap text-xs text-gray-900">
                            {item.intakeType}
                          </td>
                          <td className="px-3 py-2 whitespace-nowrap text-xs text-gray-900">
                            {item.intakeVolume} ml
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>

          {/* Fluid Output Table */}
          <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            <div className="bg-purple-100 p-3 md:p-4 flex justify-between items-center">
              <h2 className="text-lg font-bold flex items-center">
                <FontAwesomeIcon
                  icon={faDroplet}
                  className="mr-2 text-yellow-400"
                />
                Fluid Output Records
              </h2>
              <button
                onClick={handleAddFluidData}
                className="text-white bg-gray-700 hover:bg-gray-900 transition-colors py-2 px-3 rounded-lg text-sm">
                + Add New
              </button>
            </div>

            <div className="p-2">
              {fluidLoading ? (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-purple-500 mx-auto"></div>
                  <p className="mt-2 text-sm text-gray-600">
                    Loading fluid data...
                  </p>
                </div>
              ) : outputData.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-500">
                    No fluid output records found.
                  </p>
                </div>
              ) : (
                <div className="overflow-y-auto" style={{ maxHeight: "300px" }}>
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50 sticky top-0">
                      <tr>
                        <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Date
                        </th>
                        <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Time
                        </th>
                        <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Urine Output (ml)
                        </th>
                        <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Other Output Signs
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {outputData.map((item, index) => (
                        <tr
                          key={item._id}
                          className={
                            index % 2 === 0 ? "bg-gray-50" : "bg-white"
                          }>
                          <td className="px-3 py-2 whitespace-nowrap text-xs font-medium text-gray-900">
                            {item.formattedDate}
                          </td>
                          <td className="px-3 py-2 whitespace-nowrap text-xs text-gray-900">
                            {item.formattedTime}
                          </td>
                          <td className="px-3 py-2 whitespace-nowrap text-xs text-gray-900">
                            {item.urineOutput} ml
                          </td>
                          <td className="px-3 py-2 whitespace-nowrap text-xs text-gray-900">
                            {item.outputTypes && item.outputTypes.length > 0 ? (
                              <span className="inline-flex flex-wrap gap-1">
                                {item.outputTypes.map((type, i) => (
                                  <span
                                    key={i}
                                    className="px-1.5 py-0.5 bg-purple-100 text-purple-800 rounded-full text-xs">
                                    {type}
                                  </span>
                                ))}
                              </span>
                            ) : (
                              "None"
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </motion.div>
        {/* End of Fluid Data Tables */}

        {/* Patient Vitals Table */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-6 bg-white shadow-lg rounded-lg overflow-hidden m-3">
          <div className="bg-blue-100 text-black p-3 md:p-4 flex justify-between items-center">
            <h2 className="text-lg font-bold">Recent Vitals Records</h2>
            <button
              onClick={handleAddVitals}
              className="text-white  bg-gray-700 hover:bg-gray-900 transition-colors py-2 px-3 rounded-lg">
              + Add New
            </button>
          </div>

          <div className="p-4 md:p-6">
            {vitalsLoading ? (
              <div className="text-center py-10">
                <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
                <p className="mt-3 text-gray-600">Loading vitals...</p>
              </div>
            ) : vitals.length === 0 ? (
              <div className="text-center py-10">
                <p className="text-gray-500">
                  No vitals records found for this patient.
                </p>
                <button
                  onClick={handleAddVitals}
                  className="mt-4 font-semibold shadow-sm text-white bg-[#00BFA5] hover:bg-[#009B8A] transition-colors py-2 px-4 rounded-lg">
                  Add First Vitals Record
                </button>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date & Time
                      </th>
                      <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        <FontAwesomeIcon
                          icon={faTemperatureHigh}
                          className="mr-1"
                        />
                        Temp
                      </th>
                      <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        <FontAwesomeIcon icon={faHeartPulse} className="mr-1" />
                        Pulse
                      </th>
                      <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        <FontAwesomeIcon
                          icon={faTachometerAlt}
                          className="mr-1"
                        />
                        BP (Supine)
                      </th>
                      <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        <FontAwesomeIcon
                          icon={faTachometerAlt}
                          className="mr-1"
                        />
                        BP (Sitting)
                      </th>
                      <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        <FontAwesomeIcon icon={faWaveSquare} className="mr-1" />
                        PP
                      </th>
                      <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        <FontAwesomeIcon icon={faChartLine} className="mr-1" />
                        MAP
                      </th>
                      <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        <FontAwesomeIcon icon={faDroplet} className="mr-1" />
                        PLT
                      </th>
                      <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        <FontAwesomeIcon icon={faTint} className="mr-1" />
                        WBC
                      </th>
                      <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        <FontAwesomeIcon icon={faDroplet} className="mr-1" />
                        HCT/PVC
                      </th>
                      <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        <FontAwesomeIcon icon={faLungs} className="mr-1" />
                        Resp
                      </th>
                      <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        <FontAwesomeIcon icon={faClock} className="mr-1" />
                        CRFT
                      </th>
                      <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        <FontAwesomeIcon
                          icon={faNotesMedical}
                          className="mr-1"
                        />
                        Notes
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {vitals.map((vital, index) => (
                      <tr
                        key={vital._id}
                        className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                        <td className="px-3 py-3 whitespace-nowrap text-xs font-medium text-gray-900">
                          {formatDate(vital.timestamp)}
                        </td>
                        <td
                          className={`px-3 py-3 whitespace-nowrap text-xs ${
                            parseFloat(vital.vitals.bodyTemperature) > 37.5
                              ? "text-red-600 font-bold"
                              : "text-black"
                          }`}>
                          {vital.vitals.bodyTemperature || "-"} °C
                        </td>
                        <td
                          className={`px-3 py-3 whitespace-nowrap text-xs ${
                            parseFloat(vital.vitals.pulseRate) > 100
                              ? "text-red-600 font-bold"
                              : "text-black"
                          }`}>
                          {vital.vitals.pulseRate || "-"} /min
                        </td>
                        <td className="px-3 py-3 whitespace-nowrap text-xs text-black">
                          {vital.vitals.bloodPressureSupine?.systolic || "-"}/
                          {vital.vitals.bloodPressureSupine?.diastolic || "-"}
                        </td>
                        <td className="px-3 py-3 whitespace-nowrap text-xs text-black">
                          {vital.vitals.bloodPressureSitting?.systolic || "-"}/
                          {vital.vitals.bloodPressureSitting?.diastolic || "-"}
                        </td>
                        <td
                          className={`px-3 py-3 whitespace-nowrap text-xs ${
                            parseFloat(
                              vital.vitals.bloodPressureSupine?.pulsePressure
                            ) <= 20
                              ? "text-red-600 font-bold"
                              : "text-black"
                          }`}>
                          {vital.vitals.bloodPressureSupine?.pulsePressure ||
                            "-"}
                        </td>
                        <td
                          className={`px-3 py-3 whitespace-nowrap text-xs ${
                            parseFloat(
                              vital.vitals.bloodPressureSupine
                                ?.meanArterialPressure
                            ) < 60
                              ? "text-red-600 font-bold"
                              : "text-black"
                          }`}>
                          {vital.vitals.bloodPressureSupine
                            ?.meanArterialPressure || "-"}
                        </td>
                        <td
                          className={`px-3 py-3 whitespace-nowrap text-xs ${
                            parseFloat(vital.vitals.plt) < 130000
                              ? "text-red-600 font-bold"
                              : "text-black"
                          }`}>
                          {vital.vitals.plt || "-"} /mm³
                        </td>
                        <td
                          className={`px-3 py-3 whitespace-nowrap text-xs ${
                            parseFloat(vital.vitals.wbc) < 5000
                              ? "text-red-600 font-bold"
                              : "text-black"
                          }`}>
                          {vital.vitals.wbc || "-"} /mm³
                        </td>
                        <td
                          className={`px-3 py-3 whitespace-nowrap text-xs ${
                            parseFloat(vital.vitals.hctPvc) > 20
                              ? "text-red-600 font-bold"
                              : "text-black"
                          }`}>
                          {vital.vitals.hctPvc || "-"}%
                        </td>
                        <td
                          className={`px-3 py-3 whitespace-nowrap text-xs ${
                            parseFloat(vital.vitals.respiratoryRate) > 15
                              ? "text-red-600 font-bold"
                              : "text-black"
                          }`}>
                          {vital.vitals.respiratoryRate || "-"}/min
                        </td>
                        <td
                          className={`px-3 py-3 whitespace-nowrap text-xs ${
                            parseFloat(vital.vitals.capillaryRefillTime) > 2.5
                              ? "text-red-600 font-bold"
                              : "text-black"
                          }`}>
                          {vital.vitals.capillaryRefillTime || "-"}s
                        </td>
                        <td className="px-3 py-3 text-xs text-black max-w-xs truncate">
                          {vital.vitals.observation || "-"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </motion.div>
        {/* End of Patient Vitals Table */}
      </motion.div>
    </motion.div>
  );
};

export default Profile;
