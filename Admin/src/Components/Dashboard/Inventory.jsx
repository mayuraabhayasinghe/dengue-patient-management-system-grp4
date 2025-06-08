import React, { useState } from "react";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBoxOpen,
  faPlus,
  faSearch,
  faEdit,
  faTrash,
  faExclamationTriangle,
  faFilter,
  faFileExport,
} from "@fortawesome/free-solid-svg-icons";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Inventory = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [showLowStockOnly, setShowLowStockOnly] = useState(false);

  // Sample inventory data
  const inventoryItems = [
    {
      id: 1,
      name: "Paracetamol 500mg",
      category: "Medication",
      stock: 45,
      threshold: 50,
      unit: "tablets",
      lastRestocked: "2023-05-10",
      supplier: "PharmaCorp",
    },
    {
      id: 2,
      name: "IV Saline Solution",
      category: "Fluids",
      stock: 120,
      threshold: 100,
      unit: "bags",
      lastRestocked: "2023-05-15",
      supplier: "MediSupply",
    },
    {
      id: 3,
      name: "Surgical Masks",
      category: "PPE",
      stock: 350,
      threshold: 500,
      unit: "pieces",
      lastRestocked: "2023-05-01",
      supplier: "SafeGear",
    },
    {
      id: 4,
      name: "Bandages (Medium)",
      category: "Dressings",
      stock: 85,
      threshold: 100,
      unit: "boxes",
      lastRestocked: "2023-05-18",
      supplier: "FirstAid Inc.",
    },
    {
      id: 5,
      name: "Antibiotic Ointment",
      category: "Medication",
      stock: 22,
      threshold: 30,
      unit: "tubes",
      lastRestocked: "2023-04-28",
      supplier: "PharmaCorp",
    },
  ];

  // Data for consumption chart
  const consumptionData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May"],
    datasets: [
      {
        label: "Paracetamol 500mg",
        data: [120, 190, 170, 210, 180],
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "IV Saline Solution",
        data: [80, 90, 110, 95, 105],
        borderColor: "rgb(54, 162, 235)",
        backgroundColor: "rgba(54, 162, 235, 0.5)",
      },
      {
        label: "Surgical Masks",
        data: [450, 400, 480, 420, 380],
        borderColor: "rgb(75, 192, 192)",
        backgroundColor: "rgba(75, 192, 192, 0.5)",
      },
    ],
  };

  // Filter items based on search, category, and low stock
  const filteredItems = inventoryItems.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.supplier.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      activeCategory === "all" ||
      item.category.toLowerCase() === activeCategory;
    const matchesLowStock = !showLowStockOnly || item.stock < item.threshold;
    return matchesSearch && matchesCategory && matchesLowStock;
  });

  const categories = [
    "all",
    ...new Set(inventoryItems.map((item) => item.category.toLowerCase())),
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h1 className="text-2xl font-bold text-gray-800">
          Inventory Management
        </h1>
        <div className="flex gap-3">
          <motion.button
            onClick={() => navigate("/admin/addward")}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 bg-primary-1 text-white px-4 py-2 rounded-lg shadow hover:bg-primary-2 transition">
            <FontAwesomeIcon icon={faPlus} />
            <span>Add Item</span>
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg shadow hover:bg-green-700 transition">
            <FontAwesomeIcon icon={faFileExport} />
            <span>Export</span>
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
              placeholder="Search inventory..."
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-1 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex space-x-3">
            <div className="relative">
              <FontAwesomeIcon
                icon={faFilter}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              />
              <select
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-1 focus:border-transparent appearance-none"
                value={activeCategory}
                onChange={(e) => setActiveCategory(e.target.value)}>
                {categories.map((category) => (
                  <option
                    key={category}
                    value={category}
                    className="capitalize">
                    {category === "all" ? "All Categories" : category}
                  </option>
                ))}
              </select>
            </div>
            <button
              className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
                showLowStockOnly
                  ? "bg-red-100 text-red-800"
                  : "bg-gray-100 text-gray-800"
              }`}
              onClick={() => setShowLowStockOnly(!showLowStockOnly)}>
              <FontAwesomeIcon
                icon={faExclamationTriangle}
                className={showLowStockOnly ? "text-red-600" : "text-gray-600"}
              />
              <span>Low Stock</span>
            </button>
          </div>
        </div>
      </div>

      {/* Consumption Chart */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white p-4 rounded-lg shadow">
        <h2 className="text-lg font-semibold mb-4">Item Consumption Trends</h2>
        <Line
          data={consumptionData}
          options={{
            responsive: true,
            plugins: {
              legend: {
                position: "top",
              },
            },
          }}
        />
      </motion.div>

      {/* Inventory Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Item
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Stock Level
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Last Restocked
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Supplier
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredItems.map((item) => (
                <motion.tr
                  key={item.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className={`${
                    item.stock < item.threshold
                      ? "bg-red-50"
                      : "hover:bg-gray-50"
                  }`}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                        <FontAwesomeIcon
                          icon={faBoxOpen}
                          className="text-blue-600"
                        />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {item.name}
                        </div>
                        <div className="text-sm text-gray-500">
                          {item.stock} {item.unit}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{item.category}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-full mr-2">
                        <div className="h-2 bg-gray-200 rounded-full">
                          <div
                            className={`h-2 rounded-full ${
                              item.stock < item.threshold
                                ? "bg-red-500"
                                : "bg-green-500"
                            }`}
                            style={{
                              width: `${Math.min(
                                100,
                                (item.stock / item.threshold) * 100
                              )}%`,
                            }}></div>
                        </div>
                      </div>
                      <div className="text-xs text-gray-500">
                        {Math.round((item.stock / item.threshold) * 100)}%
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">
                      {item.lastRestocked}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{item.supplier}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                    <button className="text-blue-600 hover:text-blue-900">
                      <FontAwesomeIcon icon={faEdit} />
                    </button>
                    <button className="text-red-600 hover:text-red-900">
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Inventory;
