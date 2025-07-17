import { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDroplet, faTint } from "@fortawesome/free-solid-svg-icons";
import { Line, Bar } from "react-chartjs-2";

const VitalSigns = () => {
  const [fluidData, setFluidData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [patient, setPatient] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const userId = localStorage.getItem("userId");

        console.log("Fetching data for user:", userId);

        if (!token || !userId) {
          throw new Error("Authentication required");
        }

        setLoading(true);

        // Get patient details first
        const patientResponse = await axios.get(
          `http://localhost:5000/api/patients/user/${userId}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        if (!patientResponse.data.success) {
          throw new Error("Failed to fetch patient data");
        }

        const patientData = patientResponse.data.data;
        setPatient(patientData);

        const patientId = patientData.id || patientData._id;

        // Get fluid data
        const fluidResponse = await axios.get(
          `http://localhost:5000/api/fluid/patient/${patientId}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        if (fluidResponse.data.success) {
          setFluidData(fluidResponse.data.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error.message || "Failed to load data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Filter data for input and output tables
  const inputData = fluidData.filter((item) => item.hasInputData);
  const outputData = fluidData.filter((item) => item.hasOutputData);

  // Animation variants for smooth rendering
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-1"></div>
      </div>
    );
  }

  if (error) {
    return <div className="p-4 text-red-500">{error}</div>;
  }

  return (
    <div className="w-full gap-6 mb-6">
      <h1 className="text-2xl font-bold mb-6">Fluid Balance Record</h1>

      {patient && (
        <div className="bg-blue-100 flex flex-col gap-3 p-4 rounded-lg mb-6">
          <div className="font-semibold">
            Patient: <span className="font-normal">{patient.name}</span>
          </div>
          <div className="font-semibold">
            Admission Date:
            <span className="font-normal">
              {" "}
              {new Date(patient.admissionDate).toLocaleDateString()}
            </span>
          </div>
        </div>
      )}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
        {/* Fluid Input Table */}
        <motion.div
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.3 }}
          className="bg-white rounded-lg shadow-md p-6 mb-5"
        >
          <div className="flex items-center mb-4">
            <div className="p-2 rounded-full bg-blue-100 text-blue-600 mr-4">
              <FontAwesomeIcon icon={faDroplet} size="sm" />
            </div>
            <h2 className="text-lg font-semibold text-gray-800">
              Fluid Input Records
            </h2>
          </div>

          {inputData.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full text-xs lg:text-sm bg-white">
                <thead className="bg-gray-100 ">
                  <tr>
                    <th className="py-2 px-4 border-b text-left">Date</th>
                    <th className="py-2 px-4 border-b text-left">Time</th>
                    <th className="py-2 px-4 border-b text-left">Fluid Kind</th>
                    <th className="py-2 px-4 border-b text-left">
                      Intake Type
                    </th>
                    <th className="py-2 px-4 border-b text-left">
                      Volume (ml)
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {inputData.map((item) => (
                    <tr key={item._id} className="hover:bg-gray-50">
                      <td className="py-2 px-4 border-b">
                        {item.formattedDate}
                      </td>
                      <td className="py-2 px-4 border-b">
                        {item.formattedTime}
                      </td>
                      <td className="py-2 px-4 border-b">{item.fluidKind}</td>
                      <td className="py-2 px-4 border-b">{item.intakeType}</td>
                      <td className="py-2 px-4 border-b">
                        {item.intakeVolume}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-4 text-gray-500">
              No fluid input records available
            </div>
          )}
        </motion.div>

        {/* Fluid Output Table */}
        <motion.div
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.3, delay: 0.2 }}
          className="bg-white rounded-lg shadow-md mb-5 p-6"
        >
          <div className="flex items-center mb-4">
            <div className="p-2 rounded-full bg-purple-100 text-yellow-300 mr-4">
              <FontAwesomeIcon icon={faTint} size="sm" />
            </div>
            <h2 className="text-lg font-semibold text-gray-800">
              Fluid Output Records
            </h2>
          </div>

          {outputData.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full text-xs lg:text-sm bg-white">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="py-2 px-4 border-b text-left">Date</th>
                    <th className="py-2 px-4 border-b text-left">Time</th>
                    <th className="py-2 px-4 border-b text-left">
                      Urine Output (ml)
                    </th>
                    <th className="py-2 px-4 border-b text-left">
                      Other Output Signs
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {outputData.map((item) => (
                    <tr key={item._id} className="hover:bg-gray-50">
                      <td className="py-2 px-4 border-b">
                        {item.formattedDate}
                      </td>
                      <td className="py-2 px-4 border-b">
                        {item.formattedTime}
                      </td>
                      <td className="py-2 px-4 border-b">{item.urineOutput}</td>
                      <td className="py-2 px-4 border-b">
                        {item.outputTypes.length > 0 ? (
                          <ul className="list-disc list-inside">
                            {item.outputTypes.map((type, index) => (
                              <li key={index}>{type}</li>
                            ))}
                          </ul>
                        ) : (
                          "None"
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-4 text-gray-500">
              No fluid output records available
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default VitalSigns;
