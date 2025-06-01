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

        // Fallback to mock data for development/demo
        const mockPatientData = {
          1: {
            id: 1,
            name: "Anura Kumara",
            email: "anura@example.com",
            age: 32,
            address: "123 Galle Road, Colombo",
            phone: "+94 71 234 5678",
            status: "Active",
            ward: "Ward 1",
            bloodType: "A+",
            admissionDate: "2025-05-15",
            diagnosis: "Dengue Fever",
            treatment: "Supportive care with hydration",
            notes: "Patient responding well to treatment",
            bystanderName: "Mahesh Kumara",
            bystanderAddress: "123 Galle Road, Colombo",
          },
          2: {
            id: 2,
            name: "Sanath Nishantha",
            email: "sanath@example.com",
            age: 28,
            address: "45 Temple Road, Kandy",
            phone: "+94 76 345 6789",
            status: "Recovered",
            ward: "Ward 2",
            bloodType: "B-",
            admissionDate: "2024-12-20",
            diagnosis: "Dengue Hemorrhagic Fever",
            treatment: "IV fluids and platelet transfusion",
            notes: "Discharged on 2025-01-05",
            bystanderName: "Priyantha Nishantha",
            bystanderAddress: "47 Temple Road, Kandy",
          },
          3: {
            id: 3,
            name: "Chamara Sampath",
            email: "chamara@example.com",
            age: 45,
            address: "78 Beach Road, Negombo",
            phone: "+94 77 456 7890",
            status: "Critical",
            ward: "Ward 3",
            bloodType: "O+",
            admissionDate: "2025-05-10",
            diagnosis: "Severe Dengue",
            treatment: "ICU monitoring and aggressive fluid management",
            notes: "Critical condition, requires close monitoring",
            bystanderName: "Nimal Sampath",
            bystanderAddress: "80 Beach Road, Negombo",
          },
          4: {
            id: 4,
            name: "Namal Perera",
            email: "namal@example.com",
            age: 22,
            address: "56 Hill Street, Nuwara Eliya",
            phone: "+94 75 567 8901",
            status: "Monitoring",
            ward: "Ward 1",
            bloodType: "AB+",
            admissionDate: "2025-03-15",
            diagnosis: "Dengue Fever",
            treatment: "Oral hydration and symptom management",
            notes: "Fever subsiding, platelet count stable",
            bystanderName: "Sunil Perera",
            bystanderAddress: "56 Hill Street, Nuwara Eliya",
          },
          5: {
            id: 5,
            name: "Sunil Perera",
            email: "sunil@example.com",
            age: 60,
            address: "90 Main Street, Matara",
            phone: "+94 78 678 9012",
            status: "Recovered",
            ward: "Ward 4",
            bloodType: "A-",
            admissionDate: "2025-05-12",
            diagnosis: "Dengue Fever with warning signs",
            treatment: "IV fluids and close monitoring",
            notes: "Discharged on 2023-09-25",
            bystanderName: "Kamal Perera",
            bystanderAddress: "92 Main Street, Matara",
          },
        };

        setPatient(mockPatientData[id]);
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
                  <span className="font-medium text-blue-600">
                    {patient.email}
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-gray-600 w-32">Bystander Address:</span>
                  <span className="font-medium flex items-center gap-2">
                    <FontAwesomeIcon icon={faTint} className="text-red-500" />
                    {patient.bystanderAddress}
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-gray-600 w-32">Admission Date:</span>
                  <span className="font-medium flex items-center gap-2">
                    <FontAwesomeIcon
                      icon={faCalendarDay}
                      className="text-green-500"
                    />
                    {patient.admissionDate}
                  </span>
                </div>
              </div>
            </div>

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

          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <FontAwesomeIcon icon={faHeartbeat} />
                <span>Medical Information</span>
              </h2>
              <div className="space-y-3">
                <div className="flex items-start gap-4">
                  <span className="text-gray-600 w-32">Diagnosis:</span>
                  <span className="font-medium">Not available</span>
                </div>
                <div className="flex items-start gap-4">
                  <span className="text-gray-600 w-32">Treatment:</span>
                  <span className="font-medium">Not available</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-gray-600 w-32">Status:</span>
                  <span className="inline-block py-1 px-3 rounded-full text-sm font-semibold">
                    Normal
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
                <p className="text-gray-700">No notes available</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Profile;
