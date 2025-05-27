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
  faNotesMedical,
  faBell,
  faChartLine,
  faTablets,
} from "@fortawesome/free-solid-svg-icons";

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

const LabResults = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [notificationCount, setNotificationCount] = useState(3);

  // Mock patient data
  const [patientData, setPatientData] = useState({
    name: "John Doe",
    age: 32,
    gender: "Male",
    dengueType: "DENV-2",
    severity: "Moderate",
    admissionDate: "2023-05-15",
    doctor: "Dr. Sarah Smith",
    lastCheckup: "2023-06-10",
    nextAppointment: "2023-06-17",
    status: "Recovering",
  });

  // Mock vital signs data
  const [vitalSigns, setVitalSigns] = useState({
    temperature: 37.5,
    heartRate: 88,
    bloodPressure: "120/80",
    platelets: 85000,
    weight: 72,
    hydration: "Adequate",
  });

  // Mock treatment data
  const [treatmentPlan, setTreatmentPlan] = useState([
    {
      id: 1,
      medication: "Paracetamol",
      dosage: "500mg",
      frequency: "Every 6 hours",
      status: "Active",
    },
    {
      id: 2,
      medication: "IV Fluids",
      dosage: "1L",
      frequency: "Daily",
      status: "Active",
    },
    {
      id: 3,
      medication: "Vitamin C",
      dosage: "1000mg",
      frequency: "Daily",
      status: "Active",
    },
  ]);

  // Mock lab results
  const [labResults, setLabResults] = useState([
    {
      id: 1,
      test: "Complete Blood Count",
      date: "2023-06-05",
      result: "Low Platelets",
    },
    { id: 2, test: "NS1 Antigen", date: "2023-05-16", result: "Positive" },
    {
      id: 3,
      test: "Liver Function Test",
      date: "2023-06-01",
      result: "Normal",
    },
  ]);

  // Chart data for temperature
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

  // Chart data for platelets
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

  // Chart options
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

  // Animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  // Status color mapping
  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
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
  return (
    <div>
      {" "}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-6">
          Laboratory Results
        </h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Test
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Result
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {labResults.map((item) => (
                <tr key={item.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {item.test}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {item.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <span
                      className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        item.result === "Positive"
                          ? "bg-red-100 text-red-800"
                          : item.result === "Normal"
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}>
                      {item.result}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-medium text-gray-800 mb-2">
              Platelet Count Interpretation
            </h3>
            <p className="text-sm text-gray-600">
              Your current platelet count is{" "}
              {vitalSigns.platelets.toLocaleString()}/μL. Dengue typically
              causes platelet counts to drop between days 3-7 of illness, with
              recovery usually by day 10. Counts below 100,000/μL require close
              monitoring.
            </p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-medium text-gray-800 mb-2">
              Next Recommended Tests
            </h3>
            <ul className="list-disc pl-5 text-sm text-gray-600 space-y-1">
              <li>Repeat Complete Blood Count in 48 hours</li>
              <li>Serum Electrolytes if dehydration symptoms appear</li>
              <li>Liver Function Test at next follow-up</li>
            </ul>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default LabResults;
