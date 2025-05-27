import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
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
    
    // Mock data - in a real app, you would fetch this from an API
    const patientData = {
        1: { 
            id: 1, 
            name: "Anura Kumara", 
            email: "anura@example.com", 
            age: 32, 
            status: "Active", 
            ward: "Ward 1", 
            bloodType: "A+", 
            admissionDate: "2025-05-15",
            diagnosis: "Dengue Fever",
            treatment: "Supportive care with hydration",
            notes: "Patient responding well to treatment"
        },
        2: { 
            id: 2, 
            name: "Sanath Nishantha", 
            email: "sanath@example.com", 
            age: 28, 
            status: "Recovered", 
            ward: "Ward 2", 
            bloodType: "B-", 
            admissionDate: "2024-12-20",
            diagnosis: "Dengue Hemorrhagic Fever",
            treatment: "IV fluids and platelet transfusion",
            notes: "Discharged on 2025-01-05"
        },
        3: { 
            id: 3, 
            name: "Chamara Sampath", 
            email: "chamara@example.com", 
            age: 45, 
            status: "Critical", 
            ward: "Ward 3", 
            bloodType: "O+", 
            admissionDate: "2025-05-10",
            diagnosis: "Severe Dengue",
            treatment: "ICU monitoring and aggressive fluid management",
            notes: "Critical condition, requires close monitoring"
        },
        4: { 
            id: 4, 
            name: "Namal Perera", 
            email: "namal@example.com", 
            age: 22, 
            status: "Monitoring", 
            ward: "Ward 1", 
            bloodType: "AB+", 
            admissionDate: "2025-03-15",
            diagnosis: "Dengue Fever",
            treatment: "Oral hydration and symptom management",
            notes: "Fever subsiding, platelet count stable"
        },
        5: { 
            id: 5, 
            name: "Sunil Perera", 
            email: "sunil@example.com", 
            age: 60, 
            status: "Recovered", 
            ward: "Ward 4", 
            bloodType: "A-", 
            admissionDate: "2025-05-12",
            diagnosis: "Dengue Fever with warning signs",
            treatment: "IV fluids and close monitoring",
            notes: "Discharged on 2023-09-25"
        }
    };

    const patient = patientData[id];

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
        >
            <button 
                onClick={() => navigate(-1)}
                className="flex items-center gap-2 mb-6 text-blue-600 hover:text-blue-800 transition-colors"
            >
                <FontAwesomeIcon icon={faArrowLeft} />
                <span>Back to Patients</span>
            </button>

            <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="bg-white shadow-lg rounded-lg overflow-hidden"
            >
                <div className="bg-blue-600 text-white p-4 md:p-6">
                    <h1 className="text-2xl md:text-3xl font-bold">{patient.name}</h1>
                    <p className="text-blue-100">Patient ID: {patient.id}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 md:p-6">
                    <div className="space-y-6">
                        <div>
                            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                                <FontAwesomeIcon icon={faUser} />
                                <span>Personal Information</span>
                            </h2>
                            <div className="space-y-3">
                                <div className="flex items-center gap-4">
                                    <span className="text-gray-600 w-32">Age:</span>
                                    <span className="font-medium">{patient.age} years</span>
                                </div>
                                <div className="flex items-center gap-4">
                                    <span className="text-gray-600 w-32">Email:</span>
                                    <span className="font-medium text-blue-600">{patient.email}</span>
                                </div>
                                <div className="flex items-center gap-4">
                                    <span className="text-gray-600 w-32">Blood Type:</span>
                                    <span className="font-medium flex items-center gap-2">
                                        <FontAwesomeIcon icon={faTint} className="text-red-500" />
                                        {patient.bloodType}
                                    </span>
                                </div>
                                <div className="flex items-center gap-4">
                                    <span className="text-gray-600 w-32">Admission Date:</span>
                                    <span className="font-medium flex items-center gap-2">
                                        <FontAwesomeIcon icon={faCalendarDay} className="text-green-500" />
                                        {patient.admissionDate}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div>
                            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                                <FontAwesomeIcon icon={faBed} />
                                <span>Ward Information</span>
                            </h2>
                            <div className="flex items-center gap-4">
                                <span className="text-gray-600 w-32">Ward:</span>
                                <span className="bg-blue-100 text-blue-800 py-1 px-3 rounded-full font-medium">
                                    {patient.ward}
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div>
                            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                                <FontAwesomeIcon icon={faHeartbeat} />
                                <span>Medical Information</span>
                            </h2>
                            <div className="space-y-3">
                                <div className="flex items-start gap-4">
                                    <span className="text-gray-600 w-32">Diagnosis:</span>
                                    <span className="font-medium">{patient.diagnosis}</span>
                                </div>
                                <div className="flex items-start gap-4">
                                    <span className="text-gray-600 w-32">Treatment:</span>
                                    <span className="font-medium">{patient.treatment}</span>
                                </div>
                                <div className="flex items-center gap-4">
                                    <span className="text-gray-600 w-32">Status:</span>
                                    <span className={`inline-block py-1 px-3 rounded-full text-sm font-semibold ${
                                        patient.status === "Active" ? "bg-green-100 text-green-800" :
                                        patient.status === "Recovered" ? "bg-blue-100 text-blue-800" :
                                        patient.status === "Critical" ? "bg-red-100 text-red-800" :
                                        "bg-yellow-100 text-yellow-800"
                                    }`}>
                                        {patient.status}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div>
                            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                                <FontAwesomeIcon icon={faNotesMedical} />
                                <span>Medical Notes</span>
                            </h2>
                            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                                <p className="text-gray-700">{patient.notes}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
};

export default Profile;