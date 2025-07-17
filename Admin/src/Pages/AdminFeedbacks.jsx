import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserInjured,
  faUserDoctor,
  faUserNurse,
  faStar,
  faFilter,
  faComments,
} from "@fortawesome/free-solid-svg-icons";

const AdminFeedbacks = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [filteredFeedbacks, setFilteredFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/feedback");
        setFeedbacks(response.data);
        setFilteredFeedbacks(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch feedbacks:", error);
        setLoading(false);
      }
    };

    fetchFeedbacks();
  }, []);

  useEffect(() => {
    let results = feedbacks;

    // Apply user type filter
    if (activeFilter !== "all") {
      results = results.filter(
        (fb) => fb.userType.toLowerCase() === activeFilter
      );
    }

    // Apply search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      results = results.filter(
        (fb) =>
          fb.name.toLowerCase().includes(term) ||
          fb.feedback.toLowerCase().includes(term) ||
          fb.email.toLowerCase().includes(term)
      );
    }

    setFilteredFeedbacks(results);
  }, [activeFilter, searchTerm, feedbacks]);

  const getRatingColor = (rating) => {
    if (rating >= 4) return "text-emerald-500";
    if (rating >= 2) return "text-amber-500";
    return "text-red-500";
  };

  const getUserTypeIcon = (userType) => {
    switch (userType.toLowerCase()) {
      case "patient":
        return faUserInjured;
      case "doctor":
        return faUserDoctor;
      case "nurse":
        return faUserNurse;
      default:
        return faComments;
    }
  };

  const getUserTypeColor = (userType) => {
    switch (userType.toLowerCase()) {
      case "patient":
        return "bg-blue-100 text-blue-600";
      case "doctor":
        return "bg-purple-100 text-purple-600";
      case "nurse":
        return "bg-teal-100 text-teal-600";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  return (
    <div className="p-4 md:p-8 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h2 className="text-3xl font-bold text-emerald-800 flex items-center gap-3">
              <FontAwesomeIcon icon={faComments} className="text-emerald-600" />
              User Feedback Dashboard
            </h2>
            <p className="text-gray-600 mt-1">
              Insights from patients, doctors, and nurses
            </p>
          </div>

          {/* Search and Filter */}
          <div className="w-full md:w-auto flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Search feedbacks..."
                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <FontAwesomeIcon
                icon={faFilter}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              />
            </div>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          <button
            onClick={() => setActiveFilter("all")}
            className={`px-4 py-2 rounded-full flex items-center gap-2 transition-all ${
              activeFilter === "all"
                ? "bg-emerald-600 text-white"
                : "bg-white text-gray-700 hover:bg-emerald-50"
            }`}>
            <span>All</span>
            <span className="text-xs bg-white text-text-1 bg-opacity-20 px-2 py-1 rounded-full">
              {feedbacks.length}
            </span>
          </button>

          <button
            onClick={() => setActiveFilter("patient")}
            className={`px-4 py-2 rounded-full flex items-center gap-2 transition-all ${
              activeFilter === "patient"
                ? "bg-blue-600 text-white"
                : "bg-white text-gray-700 hover:bg-blue-50"
            }`}>
            <FontAwesomeIcon icon={faUserInjured} />
            <span>Patients</span>
            <span className="text-xs bg-white text-text-1 bg-opacity-20 px-2 py-1 rounded-full">
              {
                feedbacks.filter(
                  (fb) => fb.userType.toLowerCase() === "patient"
                ).length
              }
            </span>
          </button>

          <button
            onClick={() => setActiveFilter("doctor")}
            className={`px-4 py-2 rounded-full flex items-center gap-2 transition-all ${
              activeFilter === "doctor"
                ? "bg-purple-600 text-white"
                : "bg-white text-gray-700 hover:bg-purple-50"
            }`}>
            <FontAwesomeIcon icon={faUserDoctor} />
            <span>Doctors</span>
            <span className="text-xs bg-white text-text-1 bg-opacity-20 px-2 py-1 rounded-full">
              {
                feedbacks.filter((fb) => fb.userType.toLowerCase() === "doctor")
                  .length
              }
            </span>
          </button>

          <button
            onClick={() => setActiveFilter("nurse")}
            className={`px-4 py-2 rounded-full flex items-center gap-2 transition-all ${
              activeFilter === "nurse"
                ? "bg-teal-600 text-white"
                : "bg-white text-gray-700 hover:bg-teal-50"
            }`}>
            <FontAwesomeIcon icon={faUserNurse} />
            <span>Nurses</span>
            <span className="text-xs bg-white text-text-1 bg-opacity-20 px-2 py-1 rounded-full">
              {
                feedbacks.filter((fb) => fb.userType.toLowerCase() === "nurse")
                  .length
              }
            </span>
          </button>
        </div>

        {/* Feedback Cards */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
          </div>
        ) : filteredFeedbacks.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-xl shadow-sm">
            <div className="text-gray-400 mb-4">
              <FontAwesomeIcon icon={faComments} size="3x" />
            </div>
            <h3 className="text-xl font-medium text-gray-600 mb-2">
              No feedbacks found
            </h3>
            <p className="text-gray-500">
              {activeFilter !== "all"
                ? `Try changing your filters`
                : `No feedbacks available yet`}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredFeedbacks.map((fb, index) => (
              <motion.div
                key={fb._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-white rounded-xl shadow-md hover:shadow-lg transition duration-300 overflow-hidden border border-gray-100">
                {/* User Type Badge */}
                <div
                  className={`${getUserTypeColor(
                    fb.userType
                  )} px-4 py-2 flex items-center gap-2`}>
                  <FontAwesomeIcon icon={getUserTypeIcon(fb.userType)} />
                  <span className="font-medium capitalize">{fb.userType}</span>
                </div>

                <div className="p-5">
                  {/* User Info */}
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-bold text-gray-800">
                        {fb.name}
                      </h3>
                      <p className="text-sm text-gray-500">{fb.email}</p>
                      {fb.phone && (
                        <p className="text-sm text-gray-600 mt-1">
                          📱 {fb.phone}
                        </p>
                      )}
                    </div>

                    {/* Rating */}
                    <div className={`text-center ${getRatingColor(fb.rating)}`}>
                      <div className="text-2xl font-bold">{fb.rating}</div>
                      <div className="text-xs -mt-1">out of 5</div>
                    </div>
                  </div>

                  {/* Feedback Text */}
                  <div className="bg-emerald-50 rounded-lg p-4 relative">
                    <div className="absolute top-3 left-3 text-emerald-200 text-4xl opacity-50">
                      "
                    </div>
                    <p className="text-gray-700 relative z-10 italic">
                      {fb.feedback}
                    </p>
                    <div className="absolute bottom-3 right-3 text-emerald-200 text-4xl opacity-50">
                      "
                    </div>
                  </div>

                  {/* Stars */}
                  <div className="flex justify-center mt-4">
                    {[...Array(5)].map((_, i) => (
                      <FontAwesomeIcon
                        key={i}
                        icon={faStar}
                        className={`text-xl ${
                          i < fb.rating ? "text-amber-400" : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>

                  {/* Date */}
                  {fb.createdAt && (
                    <div className="text-xs text-gray-400 text-right mt-3">
                      {new Date(fb.createdAt).toLocaleDateString()}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminFeedbacks;
