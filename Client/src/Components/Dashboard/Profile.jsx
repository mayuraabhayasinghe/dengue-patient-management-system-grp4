import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import {
  faArrowLeft,
  faUser,
  faSignOutAlt,
  faEnvelope,
  faIdBadge,
  faHeartbeat,
  faBed,
  faChartLine,
  faCalendarDay,
  faNotesMedical,
  faMapMarkerAlt,
  faWaveSquare,
  faTemperatureHigh,
  faLungs,
  faHeartPulse,
  faClock,
  faDroplet,
  faTachometerAlt,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Profile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [patient, setPatient] = useState(null);
  const [vitals, setVitals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [vitalsLoading, setVitalsLoading] = useState(true);
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

  // Fetch patient vitals
  useEffect(() => {
    const fetchPatientVitals = async () => {
      if (!patient || !patient.userId) return;

      try {
        setVitalsLoading(true);
        const response = await axios.get(
          `http://localhost:5000/api/vitals/patient/${patient.userId}`
        );
        setVitals(response.data.data);
      } catch (error) {
        console.error("Error fetching patient vitals:", error);
      } finally {
        setVitalsLoading(false);
      }
    };

    fetchPatientVitals();
  }, [patient]);

  // Handler for navigating to the PatientForm component with the patient userID
  const handleAddVitals = () => {
    navigate(`/patient-form/${patient.userId}`, {
      state: { patientData: patient },
    });
  };

  // Format date function
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Handler for generating reports
  const handleGenerateReports = () => {
    navigate(`/reports/${id}`);
  };

  // Handler for discharging the patient
  const handleDischarge = () => {
    navigate(`/discharge/${id}`);
  };

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
        <div className="bg-[#00BFA5] text-white p-4 md:p-6 mb-3">
          <h1 className="text-2xl md:text-3xl font-bold">{patient.name}</h1>
          <p className="">Bed Number : {patient.bedNumber}</p>
        </div>

        <div className="p-5 flex gap-6 justify-end items-center">
          <button
            onClick={handleAddVitals}
            className="font-semibold shadow-sm text-white bg-gray-700 hover:bg-gray-900 transition-colors py-2 px-4 rounded-lg"
          >
            + Add vitals Records
          </button>
          <button
            onClick={handleGenerateReports}
            className="font-semibold shadow-sm text-white bg-gray-700 hover:bg-gray-900 transition-colors py-2 px-4 rounded-lg"
          >
            Generate Reports
          </button>
          <button
            onClick={handleDischarge}
            className="font-semibold shadow-sm text-white bg-red-500 hover:bg-red-600 transition-colors py-2 px-4 rounded-lg"
          >
            <FontAwesomeIcon icon={faSignOutAlt} className="mr-1" />
            Discharge
          </button>
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

        {/* Add Patient Vitals Table */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-6 bg-white shadow-lg rounded-lg overflow-hidden m-3"
        >
          <div className="bg-blue-100 text-black p-3 md:p-4 flex justify-between items-center">
            <h2 className="text-lg font-bold">Recent Vitals Records</h2>
            <button
              onClick={handleAddVitals}
              className="text-white  bg-gray-700 hover:bg-gray-900 transition-colors py-2 px-3 rounded-lg"
            >
              + Add New
            </button>
          </div>

          <div className="p-4 md:p-6">
            {vitalsLoading ? (
              <div className="text-center py-10">
                <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
                <p className="mt-3 text-gray-600">Loading vitals...</p>
              </div>
            ) : vitals.length === 0 ? (
              <div className="text-center py-10">
                <p className="text-gray-500">
                  No vitals records found for this patient.
                </p>
                <button
                  onClick={handleAddVitals}
                  className="mt-4 font-semibold shadow-sm text-white bg-[#00BFA5] hover:bg-[#009B8A] transition-colors py-2 px-4 rounded-lg"
                >
                  Add First Vitals Record
                </button>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date & Time
                      </th>
                      <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        <FontAwesomeIcon
                          icon={faTemperatureHigh}
                          className="mr-1"
                        />
                        Temp
                      </th>
                      <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        <FontAwesomeIcon icon={faHeartPulse} className="mr-1" />
                        Pulse
                      </th>
                      <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        <FontAwesomeIcon
                          icon={faTachometerAlt}
                          className="mr-1"
                        />
                        BP (Supine)
                      </th>
                      <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        <FontAwesomeIcon
                          icon={faTachometerAlt}
                          className="mr-1"
                        />
                        BP (Sitting)
                      </th>
                      <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        <FontAwesomeIcon icon={faWaveSquare} className="mr-1" />
                        PP
                      </th>
                      <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        <FontAwesomeIcon icon={faChartLine} className="mr-1" />
                        MAP
                      </th>
                      <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        <FontAwesomeIcon icon={faDroplet} className="mr-1" />
                        HCT/PVC
                      </th>
                      <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        <FontAwesomeIcon icon={faLungs} className="mr-1" />
                        Resp
                      </th>
                      <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        <FontAwesomeIcon icon={faClock} className="mr-1" />
                        CRFT
                      </th>
                      <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        <FontAwesomeIcon
                          icon={faNotesMedical}
                          className="mr-1"
                        />
                        Notes
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {vitals.map((vital, index) => (
                      <tr
                        key={vital._id}
                        className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
                      >
                        <td className="px-3 py-3 whitespace-nowrap text-xs font-medium text-gray-900">
                          {formatDate(vital.timestamp)}
                        </td>
                        <td
                          className={`px-3 py-3 whitespace-nowrap text-xs ${
                            parseFloat(vital.vitals.bodyTemperature) > 37.5
                              ? "text-red-600 font-bold"
                              : "text-black"
                          }`}
                        >
                          {vital.vitals.bodyTemperature || "-"} °C
                        </td>
                        <td
                          className={`px-3 py-3 whitespace-nowrap text-xs ${
                            parseFloat(vital.vitals.pulseRate) > 100
                              ? "text-red-600 font-bold"
                              : "text-black"
                          }`}
                        >
                          {vital.vitals.pulseRate || "-"} /min
                        </td>
                        <td className="px-3 py-3 whitespace-nowrap text-xs text-black">
                          {vital.vitals.bloodPressureSupine?.systolic || "-"}/
                          {vital.vitals.bloodPressureSupine?.diastolic || "-"}
                        </td>
                        <td className="px-3 py-3 whitespace-nowrap text-xs text-black">
                          {vital.vitals.bloodPressureSitting?.systolic || "-"}/
                          {vital.vitals.bloodPressureSitting?.diastolic || "-"}
                        </td>
                        <td
                          className={`px-3 py-3 whitespace-nowrap text-xs ${
                            parseFloat(
                              vital.vitals.bloodPressureSupine?.pulsePressure
                            ) <= 20
                              ? "text-red-600 font-bold"
                              : "text-black"
                          }`}
                        >
                          {vital.vitals.bloodPressureSupine?.pulsePressure ||
                            "-"}
                        </td>
                        <td
                          className={`px-3 py-3 whitespace-nowrap text-xs ${
                            parseFloat(
                              vital.vitals.bloodPressureSupine
                                ?.meanArterialPressure
                            ) < 60
                              ? "text-red-600 font-bold"
                              : "text-black"
                          }`}
                        >
                          {vital.vitals.bloodPressureSupine
                            ?.meanArterialPressure || "-"}
                        </td>
                        <td
                          className={`px-3 py-3 whitespace-nowrap text-xs ${
                            parseFloat(vital.vitals.hctPvc) > 20
                              ? "text-red-600 font-bold"
                              : "text-black"
                          }`}
                        >
                          {vital.vitals.hctPvc || "-"}%
                        </td>
                        <td
                          className={`px-3 py-3 whitespace-nowrap text-xs ${
                            parseFloat(vital.vitals.respiratoryRate) > 15
                              ? "text-red-600 font-bold"
                              : "text-black"
                          }`}
                        >
                          {vital.vitals.respiratoryRate || "-"}/min
                        </td>
                        <td
                          className={`px-3 py-3 whitespace-nowrap text-xs ${
                            parseFloat(vital.vitals.capillaryRefillTime) > 2.5
                              ? "text-red-600 font-bold"
                              : "text-black"
                          }`}
                        >
                          {vital.vitals.capillaryRefillTime || "-"}s
                        </td>
                        <td className="px-3 py-3 text-xs text-black max-w-xs truncate">
                          {vital.vitals.observation || "-"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default Profile;
