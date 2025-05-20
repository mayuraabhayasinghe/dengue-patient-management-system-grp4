// src/Components/Dashboard/Inventory.jsx
import React, { useState } from "react";
import { motion } from "framer-motion";
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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBoxes,
  faSearch,
  faPlus,
  faExclamationTriangle,
} from "@fortawesome/free-solid-svg-icons";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Inventory = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");

  // Mock inventory data
  const inventory = [
    {
      id: 1,
      name: "Paracetamol 500mg",
      category: "Medication",
      quantity: 245,
      threshold: 50,
      unit: "tablets",
    },
    {
      id: 2,
      name: "IV Fluids 500ml",
      category: "Fluids",
      quantity: 120,
      threshold: 30,
      unit: "bags",
    },
    {
      id: 3,
      name: "Syringes 5ml",
      category: "Disposables",
      quantity: 320,
      threshold: 100,
      unit: "pieces",
    },
    {
      id: 4,
      name: "Oxygen Mask",
      category: "Equipment",
      quantity: 45,
      threshold: 15,
      unit: "units",
    },
    {
      id: 5,
      name: "PPE Kit",
      category: "Protective",
      quantity: 85,
      threshold: 40,
      unit: "kits",
    },
    {
      id: 6,
      name: "Bandages",
      category: "Dressings",
      quantity: 62,
      threshold: 30,
      unit: "packs",
    },
    {
      id: 7,
      name: "Antibiotics",
      category: "Medication",
      quantity: 28,
      threshold: 20,
      unit: "vials",
    },
  ];

  // Inventory chart data
  const inventoryData = {
    labels: inventory.map((item) => item.name),
    datasets: [
      {
        label: "Current Stock",
        data: inventory.map((item) => item.quantity),
        backgroundColor: "rgba(54, 162, 235, 0.6)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
      {
        label: "Threshold",
        data: inventory.map((item) => item.threshold),
        backgroundColor: "rgba(255, 99, 132, 0.6)",
        borderColor: "rgba(255, 99, 132, 1)",
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
    },
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
      },
    },
  };

  const filteredInventory = inventory.filter((item) => {
    const matchesSearch = item.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      activeCategory === "all" ||
      item.category.toLowerCase() === activeCategory.toLowerCase();
    return matchesSearch && matchesCategory;
  });

  const lowStockItems = inventory.filter(
    (item) => item.quantity <= item.threshold
  );

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white p-4 rounded-lg shadow">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <h2 className="text-xl font-semibold flex items-center">
            <FontAwesomeIcon icon={faBoxes} className="mr-2" />
            Inventory Management
          </h2>
          <button className="btn">
            <FontAwesomeIcon icon={faPlus} className="mr-2" />
            New Item
          </button>
        </div>

        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FontAwesomeIcon icon={faSearch} className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search inventory items..."
              className="pl-10 pr-4 py-2 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setActiveCategory("all")}
              className={`px-3 py-1 rounded-lg ${
                activeCategory === "all"
                  ? "bg-primary-1 text-white"
                  : "bg-gray-200 text-gray-700"
              }`}>
              All
            </button>
            <button
              onClick={() => setActiveCategory("medication")}
              className={`px-3 py-1 rounded-lg ${
                activeCategory === "medication"
                  ? "bg-primary-1 text-white"
                  : "bg-gray-200 text-gray-700"
              }`}>
              Medication
            </button>
            <button
              onClick={() => setActiveCategory("equipment")}
              className={`px-3 py-1 rounded-lg ${
                activeCategory === "equipment"
                  ? "bg-primary-1 text-white"
                  : "bg-gray-200 text-gray-700"
              }`}>
              Equipment
            </button>
          </div>
        </div>

        {lowStockItems.length > 0 && (
          <div className="mb-6 bg-red-50 p-4 rounded-lg border-l-4 border-red-500">
            <h3 className="font-medium text-red-800 flex items-center">
              <FontAwesomeIcon icon={faExclamationTriangle} className="mr-2" />
              Low Stock Alert ({lowStockItems.length} items)
            </h3>
            <div className="flex flex-wrap gap-2 mt-2">
              {lowStockItems.map((item) => (
                <span
                  key={item.id}
                  className="px-3 py-1 bg-red-100 text-red-800 text-sm rounded-full">
                  {item.name} ({item.quantity} {item.unit})
                </span>
              ))}
            </div>
          </div>
        )}

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Item Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Quantity
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Threshold
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredInventory.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {item.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {item.category}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {item.quantity} {item.unit}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {item.threshold} {item.unit}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        item.quantity <= item.threshold
                          ? "bg-red-100 text-red-800"
                          : "bg-green-100 text-green-800"
                      }`}>
                      {item.quantity <= item.threshold
                        ? "Low Stock"
                        : "In Stock"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white p-4 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4">Inventory Levels</h3>
        <div className="h-96">
          <Bar data={inventoryData} options={chartOptions} />
        </div>
      </motion.div>
    </div>
  );
};

export default Inventory;
