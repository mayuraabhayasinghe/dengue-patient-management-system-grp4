import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";
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
  faEllipsisVertical,
} from "@fortawesome/free-solid-svg-icons";
import api from "../../api/api";

const Inventory = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [showLowStockOnly, setShowLowStockOnly] = useState(false);
  const [inventoryItems, setInventoryItems] = useState([]);
  const [showMobileMenu, setShowMobileMenu] = useState(null);

  useEffect(() => {
    fetchInventory();
  }, []);

  const fetchInventory = async () => {
    try {
      const res = await axios.get(`${api}/api/inventory/`);
      setInventoryItems(res.data);
    } catch (err) {
      console.error("Error fetching inventory:", err);
    }
  };

  const deleteItem = async (id) => {
    try {
      await axios.delete(`${api}/api/inventory/${id}`);
      setInventoryItems(inventoryItems.filter((item) => item._id !== id));
      setShowMobileMenu(null); // Close mobile menu after deletion
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

  return (
    <div className="space-y-6 sm:px-6 lg:px-8 py-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
          Inventory Management
        </h1>
        <div className="flex flex-wrap gap-2">
          <motion.button
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

      {/* Search and Filters */}
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
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-1 focus:border-transparent text-sm sm:text-base"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex justify-between gap-2 sm:gap-3">
            <div className="relative">
              <FontAwesomeIcon
                icon={faFilter}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 sm:block hidden"
              />
              <select
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-1 text-sm sm:text-base"
                value={activeCategory}
                onChange={(e) => setActiveCategory(e.target.value)}>
                {categories.map((cat) => (
                  <option key={cat} value={cat} className="capitalize">
                    {cat === "all" ? "All Categories" : cat}
                  </option>
                ))}
              </select>
            </div>
            <button
              className={`flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm sm:text-base ${
                showLowStockOnly
                  ? "bg-red-100 text-red-800"
                  : "bg-gray-100 text-gray-800"
              }`}
              onClick={() => setShowLowStockOnly(!showLowStockOnly)}>
              <FontAwesomeIcon
                icon={faExclamationTriangle}
                className={showLowStockOnly ? "text-red-600" : "text-gray-600"}
              />
              <span className="hidden sm:inline">Low Stock</span>
            </button>
          </div>
        </div>
      </div>

      {/* Inventory Table */}
      <div className="bg-white rounded-lg shadow overflow-x-auto">
        {/* Desktop Table */}
        <table className="min-w-full divide-y divide-gray-200 text-sm sm:text-base hidden sm:table">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left font-medium text-gray-500 uppercase">
                Item
              </th>
              <th className="px-4 py-3 text-left font-medium text-gray-500 uppercase hidden md:table-cell">
                Category
              </th>
              <th className="px-4 py-3 text-left font-medium text-gray-500 uppercase">
                Stock Level
              </th>
              <th className="px-4 py-3 text-left font-medium text-gray-500 uppercase hidden lg:table-cell">
                Last Restocked
              </th>
              <th className="px-4 py-3 text-left font-medium text-gray-500 uppercase hidden lg:table-cell">
                Supplier
              </th>
              <th className="px-4 py-3 text-right font-medium text-gray-500 uppercase">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredItems.map((item) => (
              <motion.tr
                key={item._id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className={`${
                  item.stock < item.threshold ? "bg-red-50" : "hover:bg-gray-50"
                }`}>
                <td className="px-4 py-3">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-blue-100 flex items-center justify-center">
                      <FontAwesomeIcon
                        icon={faBoxOpen}
                        className="text-blue-600 text-sm sm:text-base"
                      />
                    </div>
                    <div className="ml-3">
                      <div className="font-medium text-gray-900">
                        {item.name}
                      </div>
                      <div className="text-gray-500 text-xs sm:text-sm">
                        {item.stock} {item.unit}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 hidden md:table-cell">
                  {item.category}
                </td>
                <td className="px-4 py-3">
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
                <td className="px-4 py-3 hidden lg:table-cell">
                  {new Date(item.lastRestocked).toLocaleDateString()}
                </td>
                <td className="px-4 py-3 hidden lg:table-cell">
                  {item.supplier}
                </td>
                <td className="px-4 py-3 text-right space-x-2">
                  <button className="text-blue-600 hover:text-blue-900">
                    <FontAwesomeIcon icon={faEdit} />
                  </button>
                  <button
                    className="text-red-600 hover:text-red-900"
                    onClick={() => deleteItem(item._id)}>
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>

        {/* Mobile List */}
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
              <div className="flex justify-between items-start">
                <div className="flex items-center">
                  <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                    <FontAwesomeIcon
                      icon={faBoxOpen}
                      className="text-blue-600"
                    />
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">{item.name}</div>
                    <div className="text-gray-500 text-sm">
                      {item.stock} {item.unit}
                    </div>
                  </div>
                </div>
                <button
                  onClick={() =>
                    setShowMobileMenu(
                      showMobileMenu === item._id ? null : item._id
                    )
                  }
                  className="text-gray-500 hover:text-gray-700">
                  <FontAwesomeIcon icon={faEllipsisVertical} />
                </button>
              </div>

              {/* Stock Level */}
              <div className="mt-2 flex items-center">
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

              {/* Expanded Menu */}
              {showMobileMenu === item._id && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  transition={{ duration: 0.2 }}
                  className="mt-2 pt-2 border-t border-gray-200">
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <div className="text-gray-500">Category</div>
                      <div>{item.category}</div>
                    </div>
                    <div>
                      <div className="text-gray-500">Last Restocked</div>
                      <div>
                        {new Date(item.lastRestocked).toLocaleDateString()}
                      </div>
                    </div>
                    <div className="col-span-2">
                      <div className="text-gray-500">Supplier</div>
                      <div>{item.supplier}</div>
                    </div>
                  </div>
                  <div className="flex justify-end space-x-3 mt-3">
                    <button className="text-blue-600 hover:text-blue-900">
                      <FontAwesomeIcon icon={faEdit} className="mr-1" />
                      Edit
                    </button>
                    <button
                      className="text-red-600 hover:text-red-900"
                      onClick={() => deleteItem(item._id)}>
                      <FontAwesomeIcon icon={faTrash} className="mr-1" />
                      Delete
                    </button>
                  </div>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Inventory;
