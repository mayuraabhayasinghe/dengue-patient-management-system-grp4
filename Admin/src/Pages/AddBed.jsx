import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";

const AddBed = () => {
  const [formData, setFormData] = useState({
    number: "",
    ward: "",
    status: "available",
  });

  const [wards, setWards] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchWards = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/wards");
        setWards(res.data);
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch wards", err);
        setLoading(false);
      }
    };
    fetchWards();
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/beds", formData);
      toast.success("Bed created successfully!");
      navigate(-1);
    } catch (error) {
      console.error("Error creating bed:", error);
      toast.error(error.response?.data?.message || "Failed to create bed.");
    }
  };
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-1"></div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto my-12 bg-white p-8 rounded-3xl shadow-xl border border-green-200">
      <h1 className="text-3xl font-semibold text-center text-green-700 mb-8">
        🛏️ Add New Bed
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Bed Number */}
        <div>
          <label className="block text-sm font-medium text-green-800 mb-1">
            Bed Number
          </label>
          <input
            type="text"
            name="number"
            value={formData.number}
            onChange={handleChange}
            required
            placeholder="Enter bed number"
            className="w-full border border-green-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 rounded-md px-4 py-2 transition"
          />
        </div>

        {/* Ward Selection */}
        <div>
          <label className="block text-sm font-medium text-green-800 mb-1">
            Ward
          </label>
          {loading ? (
            <p className="text-gray-500 text-sm">Loading wards...</p>
          ) : (
            <select
              name="ward"
              value={formData.ward}
              onChange={handleChange}
              required
              className="w-full border border-green-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 rounded-md px-4 py-2 transition">
              <option value="">Select Ward</option>
              {wards.map((ward) => (
                <option key={ward._id} value={ward._id}>
                  {ward.name}
                </option>
              ))}
            </select>
          )}
        </div>

        {/* Bed Status */}
        <div>
          <label className="block text-sm font-medium text-green-800 mb-1">
            Status
          </label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full border border-green-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 rounded-md px-4 py-2 transition">
            <option value="available">Available</option>
            <option value="occupied">Occupied</option>
            <option value="maintenance">Maintenance</option>
          </select>
        </div>

        {/* Submit Button */}
        <div className="flex justify-between gap-10">
          <button
            onClick={() => navigate(-1)}
            className="w-full text-green-600 bg-white py-2 rounded-md border-2 border-green-600 hover:bg-green-600 hover:text-white transition font-medium text-lg flex items-center justify-center gap-2 cursor-pointer">
            <FontAwesomeIcon icon={faArrowLeft} />
            Back
          </button>
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition font-medium text-lg flex items-center justify-center gap-2 cursor-pointer">
            <FontAwesomeIcon icon={faAdd} />
            Add Bed
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddBed;
