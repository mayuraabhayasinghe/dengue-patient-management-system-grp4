import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faSearch,
  faEdit,
  faTrash,
  faExclamationTriangle,
  faFilter,
  faFileExport,
  faEllipsisVertical,
  faSadTear,
} from "@fortawesome/free-solid-svg-icons";
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
import { Line } from "react-chartjs-2";
import axios from "axios";
import api from "../../../../Client/src/api/api";

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
  const [inventoryItems, setInventoryItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [showLowStockOnly, setShowLowStockOnly] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchInventory = async () => {
      try {
        const res = await axios.get(`${api}/api/inventory/`);
        setInventoryItems(res.data);
      } catch (err) {
        console.error("Error fetching inventory:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchInventory();
  }, []);

  const deleteItem = async (id) => {
    try {
      await axios.delete(`${api}/api/inventory/${id}`);
      setInventoryItems((prev) => prev.filter((item) => item._id !== id));
      setShowMobileMenu(null);
    } catch (err) {
      console.error("Error deleting item:", err);
    }
  };

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

  const chartData = {
    labels: inventoryItems.map((item) => item.name),
    datasets: [
      {
        label: "Stock",
        data: inventoryItems.map((item) => item.stock),
        borderColor: "rgb(75, 192, 192)",
        backgroundColor: "rgba(75, 192, 192, 0.4)",
        tension: 0.3,
      },
      {
        label: "Threshold",
        data: inventoryItems.map((item) => item.threshold),
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.4)",
        tension: 0.3,
      },
    ],
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
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
          Inventory Management
        </h1>
        <div className="flex flex-wrap gap-2">
          <motion.button
            onClick={() => navigate("/admin/addInventory")}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 bg-primary-1 text-white px-4 py-2 rounded-lg shadow hover:bg-primary-2 transition text-sm sm:text-base">
            <FontAwesomeIcon icon={faPlus} />
            <span className="hidden sm:inline">Add Item</span>
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg shadow hover:bg-green-700 transition text-sm sm:text-base">
            <FontAwesomeIcon icon={faFileExport} />
            <span className="hidden sm:inline">Export</span>
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
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-1"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-3">
            <div className="relative">
              <FontAwesomeIcon
                icon={faFilter}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 hidden sm:block"
              />
              <select
                value={activeCategory}
                onChange={(e) => setActiveCategory(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-1">
                {categories.map((cat) => (
                  <option key={cat} value={cat} className="capitalize">
                    {cat === "all" ? "All Categories" : cat}
                  </option>
                ))}
              </select>
            </div>
            <button
              onClick={() => setShowLowStockOnly(!showLowStockOnly)}
              className={`flex items-center px-4 py-2 rounded-lg text-sm ${
                showLowStockOnly
                  ? "bg-red-100 text-red-800"
                  : "bg-gray-100 text-gray-800"
              }`}>
              <FontAwesomeIcon
                icon={faExclamationTriangle}
                className={`mr-2 ${
                  showLowStockOnly ? "text-red-600" : "text-gray-600"
                }`}
              />
              Low Stock
            </button>
          </div>
        </div>
      </div>

      {/* Table View */}
      <div className="bg-white rounded-lg shadow overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 hidden sm:table text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-gray-500 uppercase font-medium">
                Item
              </th>
              <th className="px-4 py-3 text-left text-gray-500 uppercase font-medium">
                Category
              </th>
              <th className="px-4 py-3 text-left text-gray-500 uppercase font-medium">
                Stock
              </th>
              <th className="px-4 py-3 text-left text-gray-500 uppercase font-medium">
                Restocked
              </th>
              <th className="px-4 py-3 text-left text-gray-500 uppercase font-medium">
                Supplier
              </th>
              <th className="px-4 py-3 text-right text-gray-500 uppercase font-medium">
                Actions
              </th>
            </tr>
          </thead>
          {inventoryItems.length > 0 ? (
            <tbody className="divide-y divide-gray-200">
              {filteredItems.map((item) => (
                <tr
                  key={item._id}
                  className={item.stock < item.threshold ? "bg-red-50" : ""}>
                  <td className="px-4 py-3">{item.name}</td>
                  <td className="px-4 py-3">{item.category}</td>
                  <td className="px-4 py-3">
                    {item.stock} {item.unit}
                  </td>
                  <td className="px-4 py-3">
                    {new Date(item.lastRestocked).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3">{item.supplier}</td>
                  <td className="px-4 py-3 text-right space-x-2">
                    <button className="text-blue-600 hover:text-blue-900">
                      <FontAwesomeIcon icon={faEdit} />
                    </button>
                    <button
                      onClick={() => deleteItem(item._id)}
                      className="text-red-600 hover:text-red-900">
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          ) : (
            <thead>
              <tr>
                <td
                  colSpan="5"
                  className="px-6 py-10 text-center text-lg font-medium text-gray-500">
                  No Inventories found
                </td>
              </tr>
            </thead>
          )}
        </table>

        {/* Mobile View */}
        <div className="sm:hidden space-y-2 p-2">
          {filteredItems.map((item) => (
            <motion.div
              key={item._id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className={`bg-white p-3 rounded-lg shadow ${
                item.stock < item.threshold ? "border-l-4 border-red-500" : ""
              }`}>
              <div className="flex justify-between items-center">
                <div>
                  <div className="font-medium">{item.name}</div>
                  <div className="text-sm text-gray-500">
                    {item.stock} {item.unit}
                  </div>
                </div>
                <button
                  onClick={() =>
                    setShowMobileMenu(
                      showMobileMenu === item._id ? null : item._id
                    )
                  }
                  className="text-gray-500">
                  <FontAwesomeIcon icon={faEllipsisVertical} />
                </button>
              </div>
              {showMobileMenu === item._id && (
                <div className="mt-2 border-t pt-2 text-sm space-y-1">
                  <div>
                    <strong>Category:</strong> {item.category}
                  </div>
                  <div>
                    <strong>Restocked:</strong>{" "}
                    {new Date(item.lastRestocked).toLocaleDateString()}
                  </div>
                  <div>
                    <strong>Supplier:</strong> {item.supplier}
                  </div>
                  <div className="flex space-x-3 mt-2">
                    <button className="text-blue-600 hover:text-blue-900">
                      <FontAwesomeIcon icon={faEdit} /> Edit
                    </button>
                    <button
                      onClick={() => deleteItem(item._id)}
                      className="text-red-600 hover:text-red-900">
                      <FontAwesomeIcon icon={faTrash} /> Delete
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
      {inventoryItems.length > 0 ? (
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Stock vs Threshold</h2>
          <Line
            data={chartData}
            options={{
              responsive: true,
              plugins: {
                legend: { position: "top" },
                title: { display: false },
              },
              scales: {
                y: {
                  beginAtZero: true,
                  ticks: {
                    precision: 0,
                  },
                },
              },
            }}
          />
        </div>
      ) : null}
      {/* Dynamic Chart */}
    </div>
  );
};

export default Inventory;
