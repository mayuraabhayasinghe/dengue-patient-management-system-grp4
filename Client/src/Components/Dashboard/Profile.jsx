import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import { 
    faArrowLeft, 
    faUser, 
    faEnvelope, 
    faIdBadge, 
    faHeartbeat, 
    faBed,
    faTint,
    faCalendarDay,
    faNotesMedical
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Profile = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [patient, setPatient] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    useEffect(() => {
        const fetchPatientProfile = async () => {
            try {
                setLoading(true);
                
                // Get the token from localStorage
                const token = localStorage.getItem('token');
                
                if (!token) {
                    setError("Authorization required");
                    setLoading(false);
                    return;
                }

                // Fetch patient data from API
                const response = await axios.get(`http://localhost:5000/api/patients/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                if (response.data.success) {
                    setPatient(response.data.data);
                } else {
                    setError("Failed to fetch patient data");
                }
                
                setLoading(false);
            } catch (error) {
                console.error("Error fetching patient:", error);
                setError(error.response?.data?.message || "Error fetching patient data");
                setLoading(false);
            }
        };

        if (id) {
            fetchPatientProfile();
        }
    }, [id]);

    if (loading) {
        return (
            <div className="p-6 text-center">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
                <p className="mt-2">Loading patient data...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="p-6 text-center text-red-500">
                Error: {error}
            </div>
        );
    }

    if (!patient) {
        return (
            <div className="p-6 text-center text-red-500">
                Patient not found
            </div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="p-4 md:p-6"
        >            <button 
                onClick={() => navigate(-1)}
                className="flex items-center gap-2 mb-6 text-green-600 hover:text-green-800 transition-colors"
            >
                <FontAwesomeIcon icon={faArrowLeft} />
                <span>Back to Patients</span>
            </button>

            <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="bg-white rounded-xl shadow-md overflow-hidden"
            >
                <div className="md:flex">                <div className="md:w-1/3 bg-primary-1 text-white p-6">
                        <div className="text-center">
                            <div className="w-24 h-24 rounded-full bg-white text-green-600 flex items-center justify-center mx-auto mb-4 text-4xl">
                                <FontAwesomeIcon icon={faUser} />
                            </div>
                            <h2 className="text-2xl font-bold mb-2">{patient.name}</h2>
                            <p className="text-green-200">
                                <FontAwesomeIcon icon={faEnvelope} className="mr-2" />
                                {patient.email}
                            </p>
                            <div className="mt-4 inline-block px-4 py-1 bg-white text-green-600 rounded-full font-semibold">
                                {patient.status}
                            </div>
                        </div>
                          <div className="mt-8">
                            <div className="flex items-center mb-4">
                                <FontAwesomeIcon icon={faIdBadge} className="text-xl mr-4" />
                                <div>
                                    <p className="text-sm text-green-200">Patient ID</p>
                                    <p>{patient._id?.substring(0, 8) || "N/A"}</p>
                                </div>
                            </div>
                            
                            <div className="flex items-center mb-4">
                                <FontAwesomeIcon icon={faBed} className="text-xl mr-4" />
                                <div>
                                    <p className="text-sm text-green-200">Ward</p>
                                    <p>{patient.ward}</p>
                                </div>
                            </div>
                            
                            <div className="flex items-center mb-4">
                                <FontAwesomeIcon icon={faTint} className="text-xl mr-4" />
                                <div>
                                    <p className="text-sm text-green-200">Blood Type</p>
                                    <p>{patient.bloodType}</p>
                                </div>
                            </div>
                            
                            <div className="flex items-center">
                                <FontAwesomeIcon icon={faCalendarDay} className="text-xl mr-4" />
                                <div>
                                    <p className="text-sm text-green-200">Admission Date</p>
                                    <p>{new Date(patient.admissionDate).toLocaleDateString()}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div className="md:w-2/3 p-6">
                        <h3 className="text-xl font-bold mb-4 text-gray-800">Patient Details</h3>
                        
                        <div className="grid grid-cols-2 gap-4 mb-6">
                            <div className="bg-gray-50 p-4 rounded-lg">
                                <p className="text-sm text-gray-500">Age</p>
                                <p className="font-medium text-lg">{patient.age} years</p>
                            </div>
                            
                            <div className="bg-gray-50 p-4 rounded-lg">
                                <p className="text-sm text-gray-500">Status</p>
                                <p className={`font-medium text-lg ${                                    patient.status === "Critical" ? "text-red-600" : 
                                    patient.status === "Recovered" ? "text-green-600" : 
                                    patient.status === "Active" ? "text-green-600" : 
                                    "text-yellow-600"
                                }`}>{patient.status}</p>
                            </div>
                        </div>
                        
                        <div className="mb-6">                            <h4 className="text-lg font-medium text-gray-700 mb-2 flex items-center">
                                <FontAwesomeIcon icon={faNotesMedical} className="mr-2 text-green-600" />
                                Medical Information
                            </h4>
                            
                            <div className="bg-gray-50 p-4 rounded-lg mb-3">
                                <p className="text-sm text-gray-500">Diagnosis</p>
                                <p className="font-medium">{patient.diagnosis || "No diagnosis recorded"}</p>
                            </div>
                            
                            <div className="bg-gray-50 p-4 rounded-lg mb-3">
                                <p className="text-sm text-gray-500">Treatment</p>
                                <p className="font-medium">{patient.treatment || "No treatment recorded"}</p>
                            </div>
                            
                            <div className="bg-gray-50 p-4 rounded-lg">
                                <p className="text-sm text-gray-500">Notes</p>
                                <p className="font-medium">{patient.notes || "No notes recorded"}</p>
                            </div>
                        </div>
                        
                        <div className="flex justify-end gap-3">
                            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                                View Medical Records
                            </button>
                            <button className="px-4 py-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors">
                                Update Information
                            </button>
                        </div>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
};

export default Profile;