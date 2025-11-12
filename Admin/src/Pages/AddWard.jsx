import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const AddWard = () => {
  const [wardData, setWardData] = useState({
    name: "",
    type: "",
    capacity: "",
    description: "",
    status: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setWardData({ ...wardData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${api}/api/wards`, wardData);
      toast.success("Ward added successfully!");
      setWardData({
        name: "",
        type: "",
        capacity: "",
        description: "",
        status: "",
      });
    } catch (error) {
      toast.error("Failed to add ward. Please check the console for errors.");
      console.error("Error adding ward:", error);
    }
    // TODO: Add API POST request here
    // Reset form after submit
    setWardData({
      name: "",
      type: "",
      capacity: "",
      description: "",
      status: "",
    });
  };

  return (
    <div className="min-h-screen bg-green-100 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-white shadow-lg rounded-lg p-8">
        <h2 className="text-3xl font-bold text-center text-green-700 mb-6">
          Add New Ward
        </h2>
        <form onSubmit={handleSubmit} className="grid gap-6">
          {/* Ward Name */}
          <div>
            <label className="block font-semibold text-gray-700 mb-1">
              Ward Name
            </label>
            <input
              type="text"
              name="name"
              placeholder="Enter ward name"
              value={wardData.name}
              onChange={handleChange}
              className="w-full border border-gray-300 p-3 rounded focus:ring-2 focus:ring-green-400"
              required
            />
          </div>

          {/* Type Dropdown */}
          <div>
            <label className="block font-semibold text-gray-700 mb-1">
              Type
            </label>
            <select
              name="type"
              value={wardData.type}
              onChange={handleChange}
              className="w-full border border-gray-300 p-3 rounded focus:ring-2 focus:ring-green-400"
              required>
              <option value="">Enter type</option>
              <option value="" disabled hidden>
                Enter type
              </option>
              <option value="General">General</option>
              <option value="Pediatric">Pediatric</option>
              <option value="Intensive Care">Intensive Care</option>
            </select>
          </div>

          {/* Capacity */}
          <div>
            <label className="block font-semibold text-gray-700 mb-1">
              Capacity
            </label>
            <input
              type="number"
              name="capacity"
              placeholder="Enter number of beds"
              value={wardData.capacity}
              onChange={handleChange}
              className="w-full border border-gray-300 p-3 rounded focus:ring-2 focus:ring-green-400"
              required
              min={1}
            />
          </div>

          {/* Description */}
          <div>
            <label className="block font-semibold text-gray-700 mb-1">
              Description
            </label>
            <textarea
              name="description"
              placeholder="Enter description"
              value={wardData.description}
              onChange={handleChange}
              className="w-full border border-gray-300 p-3 rounded focus:ring-2 focus:ring-green-400"
              rows={3}></textarea>
          </div>

          {/* Status Dropdown */}
          <div>
            <label className="block font-semibold text-gray-700 mb-1">
              Status
            </label>
            <select
              name="status"
              value={wardData.status}
              onChange={handleChange}
              className="w-full border border-gray-300 p-3 rounded focus:ring-2 focus:ring-green-400"
              required>
              <option value="">Enter status</option>
              <option className="" value="" disabled hidden>
                Enter status
              </option>
              <option value="Active">Active</option>
              <option value="Under Maintenance">Under Maintenance</option>
            </select>
          </div>

          {/* Submit Button */}
          <div className="flex gap-10">
            <button
              onClick={() => navigate(-1)}
              className="w-full cursor-pointer bg-green-600 text-white font-semibold py-3 px-4 rounded hover:bg-green-700 transition duration-200">
              Back
            </button>
            <button
              type="submit"
              className="w-full cursor-pointer bg-green-600 text-white font-semibold py-3 px-4 rounded hover:bg-green-700 transition duration-200">
              Add Ward
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddWard;
