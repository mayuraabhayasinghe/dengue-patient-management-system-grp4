import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

const AdminFeedbacks = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/feedback");
        setFeedbacks(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch feedbacks:", error);
        setLoading(false);
      }
    };

    fetchFeedbacks();
  }, []);

  return (
    <div className="p-6 md:p-10 bg-gray-50 min-h-screen">
      <h2 className="text-3xl font-bold text-primary-1 mb-8 text-center">
        📋 User Feedbacks
      </h2>

      {loading ? (
        <div className="flex justify-center items-center h-40">
          <span className="text-gray-500 text-lg">Loading feedbacks...</span>
        </div>
      ) : feedbacks.length === 0 ? (
        <div className="text-center text-gray-500">No feedbacks found.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {feedbacks.map((fb, index) => (
            <motion.div
              key={fb._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white border rounded-2xl shadow-md hover:shadow-lg transition duration-300 p-6">
              <h3 className="text-xl font-semibold text-gray-800">{fb.name}</h3>
              <p className="text-sm text-gray-500 mb-2">{fb.email}</p>
              <p className="text-sm text-gray-600 mb-1">
                📱 <span className="font-medium">{fb.phone}</span>
              </p>
              <p className="text-sm text-gray-600 mb-1">
                👤 <span className="font-medium">{fb.userType}</span>
              </p>
              <p className="text-yellow-500 mt-2">
                {"⭐".repeat(fb.rating)}{" "}
                <span className="text-gray-600 text-sm">({fb.rating}/5)</span>
              </p>
              <p className="mt-3 text-gray-700 italic">"{fb.feedback}"</p>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminFeedbacks;
