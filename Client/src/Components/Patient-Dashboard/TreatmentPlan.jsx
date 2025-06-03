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

const TreatmentPlan = () => {
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

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-6">
        Treatment Plan
      </h2>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Medication
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Dosage
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Frequency
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {treatmentPlan.map((item) => (
              <tr key={item.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {item.medication}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {item.dosage}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {item.frequency}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      item.status === "Active"
                        ? "bg-green-100 text-green-800"
                        : "bg-gray-100 text-gray-800"
                    }`}>
                    {item.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-6 bg-blue-50 p-4 rounded-lg border-l-4 border-blue-400">
        <h3 className="font-medium text-blue-800">Treatment Instructions</h3>
        <ul className="list-disc pl-5 mt-2 text-sm text-blue-700 space-y-1">
          <li>Take Paracetamol for fever, avoid NSAIDs like Ibuprofen</li>
          <li>Maintain strict fluid intake schedule</li>
          <li>Report any bleeding symptoms immediately</li>
          <li>Complete the full course of medications</li>
        </ul>
      </div>
    </motion.div>
  );
};

export default TreatmentPlan;
