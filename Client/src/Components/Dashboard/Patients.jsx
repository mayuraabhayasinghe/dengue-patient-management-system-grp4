import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  faUser,
  faEnvelope,
  faIdBadge,
  faHeartbeat,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Patients = () => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPatients = async () => {
      try {
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
      } catch (error) {
        console.error("Error fetching patients:", error);
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
      patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.ward.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
          <div className="relative">
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
          </div>
        </div>

        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="p-3 md:p-4 text-left">ID</th>
                <th className="p-3 md:p-4 text-left">Name</th>
                <th className="p-3 md:p-4 text-left">Email</th>
                <th className="p-3 md:p-4 text-left">Age</th>
                <th className="p-3 md:p-4 text-left">BedNumber</th>
                <th className="p-3 md:p-4 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredPatients.map((patient, index) => (
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
                    {patient.id}
                  </td>
                  <td className="p-3 md:p-4 border-b border-gray-200 font-medium">
                    {patient.name}
                  </td>
                  <td className="p-3 md:p-4 border-b border-gray-200 text-blue-600">
                    {patient.email}
                  </td>
                  <td className="p-3 md:p-4 border-b border-gray-200">
                    {patient.age}
                  </td>
                  <td className="p-3 md:p-4 border-b border-gray-200">
                    <span className="bg-gray-200 text-gray-800 py-1 px-2 rounded-full text-xs">
                      {patient.ward}
                    </span>
                  </td>
                  <td className="p-3 md:p-4 border-b border-gray-200">
                    <span
                      className={`inline-block py-1 px-3 rounded-full text-xs font-semibold ${
                        patient.status === "Active"
                          ? "bg-green-100 text-green-800"
                          : patient.status === "Recovered"
                          ? "bg-blue-100 text-blue-800"
                          : patient.status === "Critical"
                          ? "bg-red-100 text-red-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {patient.status}
                    </span>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Patients;
