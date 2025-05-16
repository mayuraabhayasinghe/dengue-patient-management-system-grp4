import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { faUser, faEnvelope, faIdBadge, faHeartbeat } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Patients = () => {
    const [patients, setPatients] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPatients = async () => {
            try {
                // Mock data
                const mockPatients = [
                    { id: 1, name: "Anura Kumara", email: "anura@example.com", age: 32, status: "Active", ward: "Ward 1" },
                    { id: 2, name: "Sanath Nishantha", email: "sanath@example.com", age: 28, status: "Recovered", ward: "Ward 2" },
                    { id: 3, name: "Nilu Perera", email: "nilu@example.com", age: 45, status: "Critical", ward: "Ward 3" },
                    { id: 4, name: "Emily Davis", email: "emily@example.com", age: 22, status: "Monitoring", ward: "Ward 1" },
                    { id: 5, name: "Michael Brown", email: "michael@example.com", age: 60, status: "Recovered", ward: "Ward 4" },
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
        navigate(`/patient/${patientId}`);
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
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Registered Patients</h2>
                
                <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                    <table className="w-full">
                        <thead className="bg-blue-600 text-white">
                            <tr>
                                <th className="p-3 md:p-4 text-left">
                                    <div className="flex items-center gap-2">
                                        <FontAwesomeIcon icon={faIdBadge} />
                                        <span>ID</span>
                                    </div>
                                </th>
                                <th className="p-3 md:p-4 text-left">
                                    <div className="flex items-center gap-2">
                                        <FontAwesomeIcon icon={faUser} />
                                        <span>Name</span>
                                    </div>
                                </th>
                                <th className="p-3 md:p-4 text-left">
                                    <div className="flex items-center gap-2">
                                        <FontAwesomeIcon icon={faEnvelope} />
                                        <span>Email</span>
                                    </div>
                                </th>
                                <th className="p-3 md:p-4 text-left">Age</th>
                                <th className="p-3 md:p-4 text-left">Ward</th>
                                <th className="p-3 md:p-4 text-left">
                                    <div className="flex items-center gap-2">
                                        <FontAwesomeIcon icon={faHeartbeat} />
                                        <span>Status</span>
                                    </div>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {patients.map((patient, index) => (
                                <motion.tr
                                    key={patient.id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.05 }}
                                    onClick={() => handlePatientClick(patient.id)}
                                    className={`${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-gray-100 cursor-pointer transition-colors`}
                                >
                                    <td className="p-3 md:p-4 border-b border-gray-200">{patient.id}</td>
                                    <td className="p-3 md:p-4 border-b border-gray-200 font-medium">{patient.name}</td>
                                    <td className="p-3 md:p-4 border-b border-gray-200 text-blue-600">{patient.email}</td>
                                    <td className="p-3 md:p-4 border-b border-gray-200">{patient.age}</td>
                                    <td className="p-3 md:p-4 border-b border-gray-200">
                                        <span className="bg-gray-200 text-gray-800 py-1 px-2 rounded-full text-xs">
                                            {patient.ward}
                                        </span>
                                    </td>
                                    <td className="p-3 md:p-4 border-b border-gray-200">
                                        <span className={`inline-block py-1 px-3 rounded-full text-xs font-semibold ${
                                            patient.status === "Active" ? "bg-green-100 text-green-800" :
                                            patient.status === "Recovered" ? "bg-blue-100 text-blue-800" :
                                            patient.status === "Critical" ? "bg-red-100 text-red-800" :
                                            "bg-yellow-100 text-yellow-800"
                                        }`}>
                                            {patient.status}
                                        </span>
                                    </td>
                                </motion.tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </motion.div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="bg-white shadow-lg rounded-lg p-4 md:p-6 mt-6"
            >
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Patient Statistics</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-blue-600 text-white rounded-lg p-4 text-center">
                        <div className="text-2xl font-bold">{patients.length}</div>
                        <div className="text-sm">Total Patients</div>
                    </div>
                    <div className="bg-green-600 text-white rounded-lg p-4 text-center">
                        <div className="text-2xl font-bold">
                            {patients.filter(p => p.status === "Active").length}
                        </div>
                        <div className="text-sm">Active Cases</div>
                    </div>
                    <div className="bg-red-600 text-white rounded-lg p-4 text-center">
                        <div className="text-2xl font-bold">
                            {patients.filter(p => p.status === "Critical").length}
                        </div>
                        <div className="text-sm">Critical Cases</div>
                    </div>
                    <div className="bg-purple-600 text-white rounded-lg p-4 text-center">
                        <div className="text-2xl font-bold">
                            {patients.filter(p => p.status === "Recovered").length}
                        </div>
                        <div className="text-sm">Recovered</div>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
};

export default Patients;