import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPlus, faSearch } from "@fortawesome/free-solid-svg-icons";

// Animation variants
const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1],
    },
  },
  hover: {
    y: -4,
    boxShadow:
      "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -8 },
  visible: (i) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: i * 0.05,
      duration: 0.4,
      ease: "backOut",
    },
  }),
};

function UserCard({ user }) {
  const {
    user: userInfo,
    fullName,
    gender,
    age,
    phoneNumber,
    weight,
    bedNumber,
    admissionDate,
  } = user;

  return (
    <motion.div
      className="relative bg-gradient-to-br from-white to-gray-50 p-6 rounded-2xl border border-gray-100 shadow-sm hover:border-primary-100/50 w-full overflow-hidden"
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover">
      {/* Decorative accent */}
      <motion.div
        className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-primary-500 to-teal-400"
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 0.8, ease: "circOut" }}
      />

      <div className="ml-3 space-y-3">
        {/* Name with animated underline */}
        <motion.h2
          className="text-2xl font-bold text-gray-900 inline-block relative"
          variants={itemVariants}
          custom={0}>
          {fullName || userInfo.name}
          <motion.span
            className="absolute bottom-0 left-0 w-full h-0.5 bg-primary-400"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.3, duration: 0.6, ease: "circOut" }}
          />
        </motion.h2>

        <div className="grid grid-cols-1 gap-2.5">
          {/* Role with fancy badge */}
          <motion.div
            className="flex items-center"
            variants={itemVariants}
            custom={1}>
            <span className="w-24 text-gray-500 font-medium">Role</span>
            <motion.span
              className={`px-3 py-1 rounded-full text-sm font-semibold ${
                userInfo.role === "nurse"
                  ? "bg-blue-100 text-blue-800"
                  : "bg-emerald-100 text-emerald-800"
              }`}
              whileHover={{ scale: 1.05 }}>
              {userInfo.role}
            </motion.span>
          </motion.div>

          {/* Email with hover effect */}
          <motion.div
            className="flex items-center"
            variants={itemVariants}
            custom={2}>
            <span className="w-24 text-gray-500">Email</span>
            <motion.span
              className="truncate text-gray-700 hover:text-primary-600 transition-colors"
              whileHover={{ x: 2 }}>
              {userInfo.email}
            </motion.span>
          </motion.div>

          {/* Gender with subtle animation */}
          <motion.div
            className="flex items-center"
            variants={itemVariants}
            custom={3}>
            <span className="w-24 text-gray-500">Gender</span>
            <motion.span
              className="capitalize text-gray-700"
              whileHover={{ scale: 1.05 }}>
              {gender}
            </motion.span>
          </motion.div>

          {/* Age with pulse effect */}
          <motion.div
            className="flex items-center"
            variants={itemVariants}
            custom={4}>
            <span className="w-24 text-gray-500">Age</span>
            <motion.span
              className="text-gray-700 font-medium"
              animate={{
                color: ["#4b5563", "#10b981", "#4b5563"],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}>
              {age}
            </motion.span>
          </motion.div>

          {userInfo.role === "nurse" && phoneNumber && (
            <motion.div
              className="flex items-center"
              variants={itemVariants}
              custom={5}>
              <span className="w-24 text-gray-500">Phone</span>
              <motion.span
                className="text-gray-700 font-mono"
                whileHover={{ scale: 1.03 }}>
                {phoneNumber}
              </motion.span>
            </motion.div>
          )}

          {userInfo.role === "patient" && (
            <>
              {/* Weight with animated unit */}
              <motion.div
                className="flex items-center"
                variants={itemVariants}
                custom={5}>
                <span className="w-24 text-gray-500">Weight</span>
                <div className="flex items-baseline">
                  <span className="text-gray-700 font-medium">{weight}</span>
                  <motion.span
                    className="text-xs text-gray-400 ml-0.5"
                    animate={{ y: [0, -2, 0] }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}>
                    kg
                  </motion.span>
                </div>
              </motion.div>

              {/* Bed number with floating animation */}
              <motion.div
                className="flex items-center"
                variants={itemVariants}
                custom={6}>
                <span className="w-24 text-gray-500">Bed</span>
                <motion.span
                  className="px-2.5 py-1 bg-indigo-500/10 text-indigo-700 rounded-full text-sm font-medium"
                  animate={{
                    y: [0, -3, 0],
                    boxShadow: [
                      "0 1px 2px rgba(0,0,0,0.05)",
                      "0 4px 6px rgba(79, 70, 229, 0.1)",
                      "0 1px 2px rgba(0,0,0,0.05)",
                    ],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}>
                  #{bedNumber}
                </motion.span>
              </motion.div>

              {/* Admission date with calendar icon effect */}
              <motion.div
                className="flex items-center"
                variants={itemVariants}
                custom={7}>
                <span className="w-24 text-gray-500">Admitted</span>
                <motion.div
                  className="flex items-center"
                  whileHover={{ scale: 1.02 }}>
                  <svg
                    className="w-4 h-4 text-gray-400 mr-1.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  <span className="text-gray-700 text-sm">
                    {new Date(admissionDate).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </span>
                </motion.div>
              </motion.div>
            </>
          )}
        </div>
      </div>
    </motion.div>
  );
}

const Users = () => {
  const [activeTab, setActiveTab] = useState("staff");
  const [searchTerm, setSearchTerm] = useState("");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/auth/getuser");
        setUsers(res.data);
      } catch (err) {
        console.error("Failed to fetch users:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const filteredUsers = users
    .filter((user) => {
      const role = user?.user?.role;
      return activeTab === "staff"
        ? role === "nurse" || role === "doctor"
        : role === "patient";
    })
    .filter((user) =>
      (user.fullName || user.user?.name || "")
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    );

  const handleAdd = () => {
    navigate(
      activeTab === "staff"
        ? "/admin/staffRegistration"
        : "/admin/patientRegistration"
    );
  };

  return (
    <div className="p-4 md:p-8 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
      {/* Header Controls */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
        {/* Tab Buttons */}
        <div className="flex bg-white p-1 rounded-xl shadow-sm border border-gray-200">
          <motion.button
            onClick={() => setActiveTab("staff")}
            className={`px-4 py-2 rounded-lg text-sm font-semibold relative ${
              activeTab === "staff"
                ? "text-white"
                : "text-gray-600 hover:text-gray-900"
            }`}
            whileHover={{ scale: 1.03 }}>
            {activeTab === "staff" && (
              <motion.span
                className="absolute inset-0 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg z-0"
                layoutId="activeTab"
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              />
            )}
            <span className="relative z-10">Staff</span>
          </motion.button>

          <motion.button
            onClick={() => setActiveTab("patient")}
            className={`px-4 py-2 rounded-lg text-sm font-semibold relative ${
              activeTab === "patient"
                ? "text-white"
                : "text-gray-600 hover:text-gray-900"
            }`}
            whileHover={{ scale: 1.03 }}>
            {activeTab === "patient" && (
              <motion.span
                className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-lg z-0"
                layoutId="activeTab"
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              />
            )}
            <span className="relative z-10">Patients</span>
          </motion.button>
        </div>

        {/* Search */}
        <motion.div
          className="flex items-center gap-2 bg-white p-1 rounded-lg shadow-sm border border-gray-200"
          whileHover={{ scale: 1.02 }}>
          <input
            type="text"
            placeholder="Search by name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-4 py-2 focus:outline-none w-40 sm:w-56 text-gray-700 rounded-lg"
          />
          <motion.button
            className="p-2 text-gray-500 hover:text-blue-600"
            whileHover={{ scale: 1.1 }}>
            <FontAwesomeIcon icon={faSearch} />
          </motion.button>
        </motion.div>

        {/* Add Button */}
        <motion.button
          onClick={handleAdd}
          className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-2 rounded-lg font-semibold flex items-center gap-2 shadow-md hover:shadow-lg"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}>
          <FontAwesomeIcon icon={faUserPlus} />
          Add {activeTab === "staff" ? "Staff" : "Patient"}
        </motion.button>
      </div>

      {/* User Cards */}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <motion.div
            className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full"
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
          />
        </div>
      ) : (
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredUsers.length ? (
            filteredUsers.map((user) => <UserCard key={user._id} user={user} />)
          ) : (
            <motion.div
              className="col-span-full text-center py-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}>
              <div className="text-gray-500 text-lg font-medium">
                No {activeTab}s found
              </div>
              <motion.button
                onClick={handleAdd}
                className="mt-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-2 rounded-lg font-medium flex items-center gap-2 mx-auto shadow-sm"
                whileHover={{ scale: 1.05 }}>
                <FontAwesomeIcon icon={faUserPlus} />
                Add New {activeTab === "staff" ? "Staff" : "Patient"}
              </motion.button>
            </motion.div>
          )}
        </motion.div>
      )}
    </div>
  );
};

export default Users;
