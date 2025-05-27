import React, { useState } from "react";
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

const VitalSigns = () => {
  // Mock vital signs data
  const [vitalSigns, setVitalSigns] = useState({
    temperature: 37.5,
    heartRate: 88,
    bloodPressure: "120/80",
    platelets: 85000,
    weight: 72,
    hydration: "Adequate",
  });

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

  return (
    <div>
      {" "}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-6">
          Vital Signs Monitoring
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-medium text-gray-700 mb-4">
              Current Readings
            </h3>
            <div className="space-y-4">
              {Object.entries(vitalSigns).map(([key, value]) => (
                <div
                  key={key}
                  className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="capitalize text-gray-700">
                    {key.replace(/([A-Z])/g, " $1")}:
                  </span>
                  <span className="font-medium">
                    {typeof value === "number" && key !== "weight"
                      ? value.toLocaleString()
                      : value}
                    {key === "temperature" && "°C"}
                    {key === "weight" && " kg"}
                    {key === "platelets" && "/μL"}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-lg font-medium text-gray-700 mb-4">
              Trend Charts
            </h3>
            <div className="space-y-6">
              <div>
                <h4 className="text-md font-medium text-gray-600 mb-2">
                  Temperature History
                </h4>
                <div className="h-48">
                  <Line data={tempChartData} options={chartOptions} />
                </div>
              </div>
              <div>
                <h4 className="text-md font-medium text-gray-600 mb-2">
                  Platelet Count History
                </h4>
                <div className="h-48">
                  <Bar data={plateletChartData} options={chartOptions} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default VitalSigns;
