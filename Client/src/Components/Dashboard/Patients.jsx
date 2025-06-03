import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import {
  faUser,
  faEnvelope,
  faIdBadge,
  faHeartbeat,
  faSignOutAlt,
  faSearch,
  faBed,
  faUserInjured,
  faUserShield,
  faUserCheck,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Patients = () => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        setLoading(true);
        // In production, use this to fetch from your real API
        const response = await axios.get("http://localhost:5000/api/patients/");
        setPatients(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching patients:", error);
        setError("Failed to load patients. Please try again later.");
        setLoading(false);

        const mockPatients = [
          {
            id: 1,
            name: "Anura Kumara",
            email: "anura@example.com",
            age: 32,
            status: "Active",
            ward: "Ward 1",
            bloodType: "A+",
            admissionDate: "2023-05-15",
          },
          {
            id: 2,
            name: "Sanath Nishantha",
            email: "sanath@example.com",
            age: 28,
            status: "Recovered",
            ward: "Ward 2",
            bloodType: "B-",
            admissionDate: "2023-06-20",
          },
          {
            id: 3,
            name: "Chamara Sampath",
            email: "chamara@example.com",
            age: 45,
            status: "Critical",
            ward: "Ward 3",
            bloodType: "O+",
            admissionDate: "2023-07-10",
          },
          {
            id: 4,
            name: "Namal Perera",
            email: "namal@example.com",
            age: 22,
            status: "Monitoring",
            ward: "Ward 1",
            bloodType: "AB+",
            admissionDate: "2023-08-05",
          },
          {
            id: 5,
            name: "Sunil Perera",
            email: "sunil@example.com",
            age: 60,
            status: "Recovered",
            ward: "Ward 4",
            bloodType: "A-",
            admissionDate: "2023-09-12",
          },
        ];

        setPatients(mockPatients);
        setLoading(false);
      }
    };

    fetchPatients();
  }, []);

  const handlePatientClick = (patientId) => {
    navigate(`/patients/${patientId}`);
  };

  const filteredPatients = patients.filter(
    (patient) =>
      patient.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.bystanderAddress
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      patient.bedNumber?.toLowerCase().includes(searchTerm.toLowerCase())
  );
  // Calculate patient counts by status
  const patientCounts = {
    total: patients.length,
    // active: patients.filter((p) => p.status === "Active").length,
    // recovered: patients.filter((p) => p.status === "Recovered").length,
    // critical: patients.filter((p) => p.status === "Critical").length,
    // monitoring: patients.filter((p) => p.status === "Monitoring").length,
  };

  if (loading) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="p-5 text-center text-gray-600"
      >
        Loading patients...
      </motion.div>
    );
  }

  if (error) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="p-5 text-center text-red-600"
      >
        <p className="text-lg">{error}</p>
        <button
          className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
          onClick={() => window.location.reload()}
        >
          Retry
        </button>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-4 md:p-6"
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="mb-6"
      >
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">
            Registered Patients
          </h2>
          {/* <div className="relative">
            <input
              type="text"
              placeholder="Search patients..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <FontAwesomeIcon
              icon={faSearch}
              className="absolute left-3 top-3 text-gray-400"
            />
          </div> */}
        </div>

        {/* Patient Summary Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-1 sm:grid-cols-4 items-end gap-4 mb-6"
        >
          {/* Total Patients */}
          <div className="bg-white shadow-md rounded-lg p-4 border-l-4 border-blue-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Total Patients</p>
                <p className="text-2xl font-bold">{patientCounts.total}</p>
              </div>
              <FontAwesomeIcon
                icon={faUser}
                className="text-blue-500 text-xl"
              />
            </div>
          </div>

          {/* Search Bar */}
          <div className="relative sm:col-span-2 sm:col-start-3 sm:col-end-5">
            <input
              type="text"
              placeholder="Search patients..."
              className="w-full bg-white shadow-sm pl-10 pr-4 py-2  rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <FontAwesomeIcon
              icon={faSearch}
              className="absolute left-3 top-3 text-gray-400"
            />
          </div>

          {/* Active Patients */}
          {/* <div className="bg-white shadow-md rounded-lg p-4 border-l-4 border-green-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Active</p>
                <p className="text-2xl font-bold">{patientCounts.active}</p>
              </div>
              <FontAwesomeIcon
                icon={faUserInjured}
                className="text-green-500 text-xl"
              />
            </div>
          </div> */}

          {/* Recovered Patients */}
          {/* <div className="bg-white shadow-md rounded-lg p-4 border-l-4 border-blue-400">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Recovered</p>
                <p className="text-2xl font-bold">{patientCounts.recovered}</p>
              </div>
              <FontAwesomeIcon
                icon={faUserCheck}
                className="text-blue-400 text-xl"
              />
            </div>
          </div> */}

          {/* Critical Patients */}
          {/* <div className="bg-white shadow-md rounded-lg p-4 border-l-4 border-red-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Critical</p>
                <p className="text-2xl font-bold">{patientCounts.critical}</p>
              </div>
              <FontAwesomeIcon
                icon={faUserShield}
                className="text-red-500 text-xl"
              />
            </div>
          </div> */}
        </motion.div>

        {/* Patients Table */}
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-[#00BFA5] text-white">
              <tr>
                <th className="p-3 md:p-4 text-left">Name</th>
                <th className="p-3 md:p-4 text-left">Age</th>
                <th className="p-3 md:p-4 text-left">Gender</th>
                <th className="p-3 md:p-4 text-left">Weight</th>
                <th className="p-3 md:p-4 text-left">Bed Number</th>
                <th className="p-3 md:p-4 text-left">Admission Date</th>
                <th className="p-3 md:p-4 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredPatients.length > 0 ? (
                filteredPatients.map((patient, index) => (
                  <motion.tr
                    key={patient.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    onClick={() => handlePatientClick(patient.id)}
                    className={`${
                      index % 2 === 0 ? "bg-gray-50" : "bg-white"
                    } hover:bg-gray-100 cursor-pointer transition-colors`}
                  >
                    <td className="p-3 md:p-4 border-b border-gray-200">
                      {patient.name}
                    </td>
                    <td className="p-3 md:p-4 border-b border-gray-200 font-medium">
                      {patient.age}
                    </td>
                    <td className="p-3 md:p-4 border-b border-gray-200 font-medium">
                      {patient.gender}
                    </td>
                    <td className="p-3 md:p-4 border-b border-gray-200 font-medium">
                      {patient.weight}
                    </td>
                    <td className="p-3 md:p-4 border-b border-gray-200">
                      {patient.bedNumber}
                    </td>
                    <td className="p-3 md:p-4 border-b border-gray-200 text-blue-600">
                      {new Date(patient.admissionDate).toLocaleDateString(
                        "en-US",
                        {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        }
                      )}
                    </td>

                    {/* <td className="p-3 md:p-4 border-b border-gray-200">
                    <span className="bg-gray-200 text-gray-800 py-1 px-2 rounded-full text-xs">
                      {patient.ward}
                    </span>
                  </td> */}
                    <td className="p-3 md:p-4 border-b border-gray-200">
                      <button
                        // onClick={(e) => handleDischargePatient(e, patient.userId)}
                        className="text-white py-2 px-3 rounded text-sm bg-red-500 hover:bg-red-600"
                      >
                        <FontAwesomeIcon icon={faSignOutAlt} className="mr-1" />
                        Discharge
                      </button>
                    </td>
                  </motion.tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="p-4 text-center text-gray-500">
                    No patients found matching your search criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Patients;
