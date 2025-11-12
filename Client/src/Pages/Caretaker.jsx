import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/api";

function Caretaker() {
  const { userId } = useParams();
  const navigate = useNavigate();

  const [patient, setPatient] = useState({
    id: "",
    name: "",
    admissionDate: "",
  });
  const [currentTime, setCurrentTime] = useState("");
  const [currentDate, setCurrentDate] = useState("");
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    fluidKind: "",
    intakeType: "",
    intakeVolume: "",
    urineOutput: "",
    outputTypes: [],
  });

  // Fetch patient data on component mount
  useEffect(() => {
    const fetchPatientData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token || !userId) {
          throw new Error("Authentication required");
        }

        setLoading(true);
        // getPatientByUserId endpoint
        const response = await axios.get(`${api}/api/patients/user/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.data && response.data.success) {
          const patientData = response.data.data;
          console.log("Patient data received:", patientData);
          setPatient({
            id: patientData.id || patientData._id,
            name: patientData.name || "Unknown",
            admissionDate: patientData.admissionDate
              ? new Date(patientData.admissionDate).toLocaleDateString("en-GB")
              : "N/A",
          });
        }
      } catch (error) {
        console.error("Error fetching patient data:", error);
      } finally {
        setLoading(false);
      }
    };

    // Set current date and time
    const updateDateTime = () => {
      const now = new Date();

      // Format date as DD/MM/YYYY
      setCurrentDate(now.toLocaleDateString("en-GB"));

      // Format time as HH:MM AM/PM
      setCurrentTime(
        now.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        })
      );
    };

    fetchPatientData();
    updateDateTime();

    // Update time every minute
    const timeInterval = setInterval(updateDateTime, 60000);

    return () => clearInterval(timeInterval);
  }, [userId]);

  const handleChange = (e) => {
    const { name, value, type, id, checked } = e.target;

    if (type === "checkbox") {
      let updatedOutputTypes = [...form.outputTypes];
      if (checked) {
        updatedOutputTypes.push(id);
      } else {
        updatedOutputTypes = updatedOutputTypes.filter((item) => item !== id);
      }
      setForm({ ...form, outputTypes: updatedOutputTypes });
    } else {
      const val = type === "radio" ? id : value;
      setForm({ ...form, [name]: val });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate numeric fields only if they're filled
    if (form.intakeVolume && isNaN(form.intakeVolume)) {
      alert("Intake volume must be a number.");
      return;
    }

    if (form.urineOutput && isNaN(form.urineOutput)) {
      alert("Urine output must be a number.");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Authentication required");
      }
      // Create submission data with patientId
      const submissionData = {
        fluidKind: form.fluidKind || "",
        intakeType: form.intakeType || "",
        intakeVolume: form.intakeVolume ? parseFloat(form.intakeVolume) : 0,
        urineOutput: form.urineOutput ? parseFloat(form.urineOutput) : 0,
        outputTypes: form.outputTypes,
        patientId: patient.id, // Use the patient ID from state
      };

      const response = await axios.post(
        ` ${api}/api/fluid/submit`,
        submissionData,
        {
          headers: { Authorization: `Bearer ${token}` }, // Add token for authentication
        }
      );

      console.log("Server response:", response.data);
      setForm({
        fluidKind: "",
        intakeType: "",
        intakeVolume: "",
        urineOutput: "",
        outputTypes: [],
      });
      alert("Data submitted successfully");
    } catch (error) {
      console.error("Submission error:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen w-full bg-teal-400 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-teal-400 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-2xl w-[50%] shadow-lg ">
        <div className="bg-teal-100 p-4 rounded-lg flex justify-between gap-3 text-md font-semibold mb-6">
          <div>
            <div>
              Patient Name: <span className="font-normal">{patient.name}</span>
            </div>
            <div>
              Time: <span className="font-normal">{currentTime}</span>
            </div>
          </div>
          <div>
            <div>
              Admission Date:{" "}
              <span className="font-normal">{patient.admissionDate}</span>
            </div>
            <div>
              Date: <span className="font-normal">{currentDate}</span>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <h3 className="text-lg font-semibold">Fluid Input</h3>

          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-1">
              <label className="block mb-1 font-medium">Kind of Fluid</label>
              <input
                type="text"
                name="fluidKind"
                className="w-full border border-gray-300 rounded-md p-2"
                value={form.fluidKind}
                onChange={handleChange}
              />
            </div>

            <div className="flex-1">
              <label className="block mb-1 font-medium">Intake Type</label>
              <select
                name="intakeType"
                className="w-full border border-gray-300 rounded-md p-2"
                value={form.intakeType}
                onChange={handleChange}>
                <option value="">Select</option>
                <option value="IV">IV</option>
                <option value="Oral">Oral</option>
                <option value="NG">NG</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block mb-1 font-medium">Intake Volume (ml)</label>
            <input
              type="number"
              name="intakeVolume"
              placeholder="ml"
              className="w-full border border-gray-300 rounded-md p-2"
              value={form.intakeVolume}
              onChange={handleChange}
            />
            <p className="text-xs text-red-600 mt-1">
              *Maximum 1.5ml should be 100ml per hour
            </p>
          </div>

          <h3 className="text-lg font-semibold">Fluid Output</h3>

          <div>
            <label className="block mb-1 font-medium">Urine Output (ml)</label>
            <input
              type="number"
              name="urineOutput"
              placeholder="ml"
              className="w-full border border-gray-300 rounded-md p-2"
              value={form.urineOutput}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">
              Vital Signs of Fluid Output (Optional)
            </label>
            <div className="flex gap-8">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="Vomitus"
                  name="outputTypes"
                  onChange={handleChange}
                  checked={form.outputTypes.includes("Vomitus")}
                />
                Vomitus
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="Diarrhoea"
                  name="outputTypes"
                  onChange={handleChange}
                  checked={form.outputTypes.includes("Diarrhoea")}
                />
                Diarrhoea
              </label>
            </div>
          </div>

          <div className="flex justify-between mt-6">
            <button
              type="button"
              className="bg-blue-500 text-white py-2 px-7 rounded-2xl hover:bg-blue-600"
              onClick={() => navigate(-1)}>
              Back
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded-2xl hover:bg-blue-700">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Caretaker;
