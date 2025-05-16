import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPlus, faSearch } from "@fortawesome/free-solid-svg-icons";

// Dummy data
const dummyStaff = [
  { id: 1, username: "nurse01", role: "Nurse", email: "nurse01@hospital.com" },
  { id: 2, username: "docA", role: "Doctor", email: "docA@hospital.com" },
];

const dummyPatients = [
  { id: 1, username: "john_doe", role: "Patient", email: "john@domain.com" },
  { id: 2, username: "mary123", role: "Patient", email: "mary@domain.com" },
];

// UserCard component inside the main component (you can move it to a separate file if needed)
function UserCard({ user }) {
  return (
    <div className="bg-primary p-4 rounded-xl shadow-md hover:shadow-xl transition">
      <h3 className="text-lg font-bold capitalize">{user.username}</h3>
      <p className="text-sm text-gray-300">{user.email}</p>
      <p className="text-sm mt-1 bg-accent text-black px-2 py-1 rounded inline-block">
        {user.role}
      </p>
    </div>
  );
}
const Users = () => {
  const [activeTab, setActiveTab] = useState("staff"); // default tab is staff
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  // Filtered data based on selected tab and search term
  const filteredUsers = (
    activeTab === "staff" ? dummyStaff : dummyPatients
  ).filter((user) =>
    user.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Navigate to the appropriate form
  const handleAdd = () => {
    navigate(
      activeTab === "staff"
        ? "/admin/staffRegistration"
        : "/admin/patientRegistration"
    );
  };

  return (
    <div className="p-4 md:p-8 bg-secondary min-h-screen text-white">
      {/* Top Control Panel */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
        {/* Toggle Tabs */}
        <div className="flex bg-background-1 text-primary-1 gap-4">
          <button
            onClick={() => setActiveTab("staff")}
            className={`px-4 py-2 rounded-xl text-sm font-bold transition ${
              activeTab === "staff" ? "bg-primary-1 text-white" : "bg-primary"
            }`}>
            Staff
          </button>
          <button
            onClick={() => setActiveTab("patient")}
            className={`px-4 py-2 rounded-xl text-sm font-bold transition ${
              activeTab === "patient" ? "bg-primary-1 text-white" : "bg-primary"
            }`}>
            Patients
          </button>
        </div>

        {/* Search */}
        <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder="Search by username..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border rounded-lg px-4 py-2 focus:outline-[#00BFA5] text-text-1"
          />
          <FontAwesomeIcon
            icon={faSearch}
            className="text-text-1 bg-background-1 p-3 rounded-xl hover:scale-[1.1] hover:bg-green-200"
          />
        </div>

        {/* Add Button */}
        <button
          onClick={handleAdd}
          className="bg-accent text-black px-4 py-2 rounded-xl font-semibold flex items-center gap-2 btn">
          <FontAwesomeIcon icon={faUserPlus} />
          Add {activeTab === "staff" ? "Staff" : "Patient"}
        </button>
      </div>

      {/* User Cards Section with Animation */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredUsers.length ? (
          filteredUsers.map((user) => <UserCard key={user.id} user={user} />)
        ) : (
          <p className="text-center col-span-full">No {activeTab}s found.</p>
        )}
      </motion.div>
    </div>
  );
};

export default Users;
