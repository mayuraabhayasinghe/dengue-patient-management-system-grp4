import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserInjured,
  faBed,
  faUserNurse,
  faUserDoctor,
  faSyringe,
  faMoneyBillWave,
} from "@fortawesome/free-solid-svg-icons";
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import axios from "axios";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const Overview = () => {
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userCount, setUserCount] = useState({
    patient: 0,
    doctor: 0,
    nurse: 0,
  });

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/auth/getuser");
        if (res.data) {
          setUserData(res.data);

          // Count roles
          let counts = {
            patient: 0,
            doctor: 0,
            nurse: 0,
          };

          res.data.forEach((user) => {
            const role = user?.user?.role || user?.role;
            if (role && counts[role] !== undefined) {
              counts[role]++;
            }
          });

          setUserCount(counts);
          console.log("Role Counts:", counts);
        }
        setLoading(false);
      } catch (error) {
        console.error("Fetch error:", error);
        setUserData([]);
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Filter only patient users
  const filteredUsers = userData.filter((user) => {
    const role = user?.user?.role || user?.role;
    return role === "patient";
  });

  console.log("Filtered Patients:", filteredUsers);

  // Data for charts
  const wardData = {
    labels: ["Ward A", "Ward B", "Ward C", "Ward D", "ICU"],
    datasets: [
      {
        label: "Bed Occupancy",
        data: [65, 59, 80, 81, 56],
        backgroundColor: [
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 99, 132, 0.6)",
          "rgba(75, 192, 192, 0.6)",
          "rgba(153, 102, 255, 0.6)",
          "rgba(255, 159, 64, 0.6)",
        ],
        borderColor: [
          "rgba(54, 162, 235, 1)",
          "rgba(255, 99, 132, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const patientData = {
    labels: ["New Addmissions", "Severe Dengue", "Normal", "Other"],
    datasets: [
      {
        data: [300, 50, 100, 50],
        backgroundColor: [
          "rgba(255, 99, 132, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 206, 86, 0.6)",
          "rgba(75, 192, 192, 0.6)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const stats = [
    {
      title: "Total Patients",
      value: userCount.patient,
      change: "+12%",
      icon: faUserInjured,
      color: "bg-blue-100 text-blue-600",
    },
    {
      title: "Available Beds",
      value: "26",
      change: "-5%",
      icon: faBed,
      color: "bg-green-100 text-green-600",
    },
    {
      title: "Total Nurses",
      value: userCount.nurse,
      change: "+24%",
      icon: faUserNurse,
      color: "bg-purple-100 text-purple-600",
    },
    {
      title: "Total Doctors",
      value: userCount.doctor,
      change: "+18%",
      icon: faUserDoctor,
      color: "bg-yellow-100 text-yellow-600",
    },
  ];
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-1"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Dashboard Overview</h1>
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            whileHover={{ y: -5 }}
            className={`p-4 rounded-lg shadow ${stat.color}`}>
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-medium">{stat.title}</p>
                <p className="text-2xl font-bold">{stat.value}</p>
                <p className="text-xs">{stat.change} from yesterday</p>
              </div>
              <div className="p-3 rounded-full bg-white bg-opacity-30">
                <FontAwesomeIcon icon={stat.icon} size="lg" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Ward Occupancy</h2>
          <Bar
            data={wardData}
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

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Patient Distribution</h2>
          <Pie
            data={patientData}
            options={{
              responsive: true,
              plugins: {
                legend: {
                  position: "right",
                },
              },
            }}
          />
        </motion.div>
      </div>

      {/* Recent Activity */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="bg-white p-4 rounded-lg shadow">
        <h2 className="text-lg font-semibold mb-4">Recent Alerts</h2>
        <div className="space-y-3">
          {[
            "Low stock alert for Paracetamol",
            "New admission in Ward B",
            "Dr. Smith has a canceled appointment",
            "System maintenance scheduled for tonight",
          ].map((alert, index) => (
            <div
              key={index}
              className="flex items-center p-3 border-b border-gray-100 last:border-0">
              <div className="h-2 w-2 rounded-full bg-red-500 mr-3"></div>
              <p className="text-sm">{alert}</p>
              <span className="ml-auto text-xs text-gray-500">2h ago</span>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Overview;
