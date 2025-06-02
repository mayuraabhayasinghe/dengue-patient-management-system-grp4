import { useState, useEffect } from "react";
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
  faNotesMedical,
  faMapMarkerAlt,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Profile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [patient, setPatient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPatientDetails = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `http://localhost:5000/api/patients/${id}`
        );
        setPatient(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching patient details:", error);
        setError("Failed to load patient details. Please try again.");
        setLoading(false);
      }
    };

    fetchPatientDetails();
  }, [id]);

  if (loading) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="p-6 flex justify-center items-center h-full"
      >
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading patient details...</p>
        </div>
      </motion.div>
    );
  }

  if (error || !patient) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="p-6 text-center text-red-500"
      >
        {error || "Patient not found"}
        <div className="mt-4">
          <button
            onClick={() => navigate(-1)}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
          >
            Back to Patients List
          </button>
        </div>
      </motion.div>
    );
  }

  //   // Mock data - in a real app, you would fetch this from an API
  //   const patientData = {
  //     1: {
  //       id: 1,
  //       name: "Anura Kumara",
  //       email: "anura@example.com",
  //       age: 32,
  //       status: "Active",
  //       ward: "Ward 1",
  //       bloodType: "A+",
  //       admissionDate: "2025-05-15",
  //       diagnosis: "Dengue Fever",
  //       treatment: "Supportive care with hydration",
  //       notes: "Patient responding well to treatment",
  //     },
  //     2: {
  //       id: 2,
  //       name: "Sanath Nishantha",
  //       email: "sanath@example.com",
  //       age: 28,
  //       status: "Recovered",
  //       ward: "Ward 2",
  //       bloodType: "B-",
  //       admissionDate: "2024-12-20",
  //       diagnosis: "Dengue Hemorrhagic Fever",
  //       treatment: "IV fluids and platelet transfusion",
  //       notes: "Discharged on 2025-01-05",
  //     },
  //     3: {
  //       id: 3,
  //       name: "Chamara Sampath",
  //       email: "chamara@example.com",
  //       age: 45,
  //       status: "Critical",
  //       ward: "Ward 3",
  //       bloodType: "O+",
  //       admissionDate: "2025-05-10",
  //       diagnosis: "Severe Dengue",
  //       treatment: "ICU monitoring and aggressive fluid management",
  //       notes: "Critical condition, requires close monitoring",
  //     },
  //     4: {
  //       id: 4,
  //       name: "Namal Perera",
  //       email: "namal@example.com",
  //       age: 22,
  //       status: "Monitoring",
  //       ward: "Ward 1",
  //       bloodType: "AB+",
  //       admissionDate: "2025-03-15",
  //       diagnosis: "Dengue Fever",
  //       treatment: "Oral hydration and symptom management",
  //       notes: "Fever subsiding, platelet count stable",
  //     },
  //     5: {
  //       id: 5,
  //       name: "Sunil Perera",
  //       email: "sunil@example.com",
  //       age: 60,
  //       status: "Recovered",
  //       ward: "Ward 4",
  //       bloodType: "A-",
  //       admissionDate: "2025-05-12",
  //       diagnosis: "Dengue Fever with warning signs",
  //       treatment: "IV fluids and close monitoring",
  //       notes: "Discharged on 2023-09-25",
  //     },
  //   };

  //   const patient = patientData[id];

  //   if (!patient) {
  //     return (
  //       <div className="p-6 text-center text-red-500">Patient not found</div>
  //     );
  //   }

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
        <div className="bg-[#00BFA5] text-white p-4 md:p-6">
          <h1 className="text-2xl md:text-3xl font-bold">{patient.name}</h1>
          <p className="">Bed Number : {patient.bedNumber}</p>
        </div>

        <div className="grid bg-[#E5F8F6] shadow-lg grid-cols-1 md:grid-cols-2 gap-6 rounded-lg m-5 p-4 md:p-6">
          {/* Personal Information */}
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <FontAwesomeIcon icon={faUser} />
              <span>Personal Information</span>
            </h2>
            <div className="space-y-3">
              <div className="flex items-center gap-4">
                <span className="text-gray-600">Admission Date:</span>
                <span className="font-medium flex items-center gap-2">
                  <FontAwesomeIcon
                    icon={faCalendarDay}
                    className="text-green-500"
                  />
                  {new Date(patient.admissionDate).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                  })}
                </span>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-gray-600 w-32">Age:</span>
                <span className="font-medium">{patient.age} years</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-gray-600 w-32">Weight:</span>
                <span className="font-medium">{patient.weight} Kg</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-gray-600 w-32">Gender:</span>
                <span className="font-medium flex items-center gap-2">
                  {patient.gender}
                </span>
              </div>
            </div>
          </div>

          {/* Bystander Information */}
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <FontAwesomeIcon icon={faUser} />
              <span>Bystander Information</span>
            </h2>
            <div className="space-y-3">
              <div className="flex items-center gap-4">
                <span className="text-gray-600 w-32">Name:</span>
                <span className="font-medium">{patient.bystanderName}</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-gray-600 w-32">Email:</span>
                <span className="font-medium text-blue-500">
                  {patient.email}
                </span>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-gray-600 w-32">Address:</span>
                <span className="font-medium">
                  <FontAwesomeIcon
                    icon={faMapMarkerAlt}
                    className="text-gray-500 mr-2"
                  />
                  {patient.bystanderAddress}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="p-5 flex gap-6 justify-end items-center">
          <button className="font-semibold shadow-sm text-white bg-[#00BFA5] hover:bg-[#009B8A] transition-colors py-2 px-4 rounded-lg">
            + Add vitals Records
          </button>
          <button className="font-semibold shadow-sm text-white bg-[#00BFA5] hover:bg-[#009B8A] transition-colors py-2 px-4 rounded-lg">
            Generate Reports
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Profile;
