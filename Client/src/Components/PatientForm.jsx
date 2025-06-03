import { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const PatientForm = () => {
  // Get patientUserId from the URL using useParams
  const { patientUserId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const patientData = location.state?.patientData || null;

  const [currentDate, setCurrentDate] = useState("");
  const [currentTime, setCurrentTime] = useState("");
  // State to hold the staff's user ID from localStorage
  const [staffUserId, setStaffUserId] = useState("");
  // State to manage form data
  const [formData, setFormData] = useState({
    bodyTemperature: "",
    hctPvc: "",
    pulseRate: "",
    wbc: "",
    plt: "",
    bloodPressureSupine: {
      systolic: "",
      diastolic: "",
      pulsePressure: "",
      meanArterialPressure: "",
    },
    bloodPressureSitting: {
      systolic: "",
      diastolic: "",
    },
    respiratoryRate: "",
    capillaryRefillTime: "",
    observation: "",
  });

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      const date = now.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
      const time = now.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      });

      setCurrentDate(date);
      setCurrentTime(time);
    };
    updateDateTime(); // Run initially
    const interval = setInterval(updateDateTime, 1000); // Update every second

    // On component mount, extract staff user ID from localStorage
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user._id) setStaffUserId(user._id);

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  // Handle input change for both top-level and nested fields
  const handleChange = (e, section, field) => {
    const value = e.target.value;

    // Automatically calculate pulse pressure and MAP if supine BP is updated
    if (
      section === "bloodPressureSupine" &&
      (field === "systolic" || field === "diastolic")
    ) {
      const updated = {
        ...formData.bloodPressureSupine,
        [field]: value,
      };

      const systolic = parseFloat(updated.systolic);
      const diastolic = parseFloat(updated.diastolic);

      if (!isNaN(systolic) && !isNaN(diastolic)) {
        // Calculate and update derived values
        updated.pulsePressure = (systolic - diastolic).toFixed(1);
        updated.meanArterialPressure = (
          diastolic +
          (systolic - diastolic) / 3
        ).toFixed(1);
      }

      setFormData((prev) => ({
        ...prev,
        bloodPressureSupine: updated,
      }));
    } else {
      // Update nested or top-level field
      if (section) {
        setFormData((prev) => ({
          ...prev,
          [section]: {
            ...prev[section],
            [field]: value,
          },
        }));
      } else {
        setFormData((prev) => ({ ...prev, [field]: value }));
      }
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Safety check
    if (!staffUserId) {
      alert("Staff user ID not found. Please log in again.");
      return;
    }

    try {
      // Create request payload
      const payload = {
        user: patientUserId,
        enteredBy: staffUserId,
        vitals: formData,
      };

      // POST request to backend
      const res = await axios.post(
        "http://localhost:5000/api/vitals/add",
        payload
      );

      // Success message
      alert("Vitals submitted successfully");
    } catch (error) {
      console.error("Error submitting vitals:", error);
      alert("Submission failed.");
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-4xl">
        {/* Header */}
        <div className="bg-blue-100 shadow-md p-5 rounded-lg mb-6">
          <div className="flex justify-between">
            <div>
              <p className="font-semibold mb-1">
                Patient Name : {patientData?.name || "Unknown"}
              </p>
              <p className="text-sm">Time : {currentTime}</p>
            </div>
            <div className="text-right">
              <p className="font-semibold mb-1">
                Admission Date :{" "}
                {new Date(
                  patientData?.admissionDate || "Unknown"
                ).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
              <p className="text-sm">Date : {currentDate}</p>
            </div>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Temperature Section */}
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="text-sm">Body Temperature</label>
              <input
                value={formData.bodyTemperature}
                onChange={(e) => handleChange(e, null, "bodyTemperature")}
                className="input-field"
                type="number"
              />
              <p className="text-xs text-red-400">*should measure 4 hourly</p>
            </div>
            <div>
              <label className="text-sm">HCT/PVC</label>
              <input
                value={formData.hctPvc}
                onChange={(e) => handleChange(e, null, "hctPvc")}
                className="input-field"
                type="number"
              />
              <p className="text-xs text-red-400">*should measure 6 hourly</p>
            </div>
            <div>
              <label className="text-sm">Pulse Rate</label>
              <input
                value={formData.pulseRate}
                onChange={(e) => handleChange(e, null, "pulseRate")}
                className="input-field"
                type="number"
              />
              <p className="text-xs text-red-400">*should measure 3 hourly</p>
            </div>
          </div>

          {/* FBC Section */}
          <div>
            <p className="font-bold text-sm">FBC</p>
            <p className="text-xs text-red-400 mb-1">
              *Measure on admission & daily
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm">WBC</label>
                <input
                  value={formData.wbc}
                  onChange={(e) => handleChange(e, null, "wbc")}
                  className="input-field"
                  type="number"
                  placeholder="/mm3"
                />
              </div>
              <div>
                <label className="text-sm">PLT</label>
                <input
                  className="input-field"
                  value={formData.plt}
                  onChange={(e) => handleChange(e, null, "plt")}
                  type="number"
                  placeholder="/mm3"
                />
              </div>
            </div>
          </div>

          {/* Blood Pressure (Supine) */}
          <div>
            <p className="font-bold text-sm">Blood Pressure (Supine)</p>
            <p className="text-xs text-red-400 mb-1">
              *should measure 3 hourly
            </p>

            {/* Row 1: Systolic & Diastolic */}
            <div className="grid grid-cols-2 gap-4 mb-2">
              <div>
                <label className="text-sm">Systolic</label>
                <input
                  className="input-field"
                  type="number"
                  value={formData.bloodPressureSupine.systolic}
                  onChange={(e) =>
                    handleChange(e, "bloodPressureSupine", "systolic")
                  }
                  placeholder="/mmHg"
                />
              </div>
              <div>
                <label className="text-sm">Diastolic</label>
                <input
                  className="input-field"
                  type="number"
                  value={formData.bloodPressureSupine.diastolic}
                  onChange={(e) =>
                    handleChange(e, "bloodPressureSupine", "diastolic")
                  }
                  placeholder="/mmHg"
                />
              </div>
            </div>

            {/* Row 2: PP & MAP */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm">Pulse Pressure (PP)</label>
                <input
                  className="input-field"
                  type="number"
                  value={formData.bloodPressureSupine.pulsePressure}
                  readOnly
                  placeholder="/mmHg"
                />
              </div>
              <div>
                <label className="text-sm">Mean Arterial Pressure (MAP)</label>
                <input
                  className="input-field"
                  type="number"
                  value={formData.bloodPressureSupine.meanArterialPressure}
                  readOnly
                  placeholder="/mmHg"
                />
              </div>
            </div>
          </div>

          {/* Blood Pressure (Sitting) */}
          <div>
            <p className="font-bold text-sm">Blood Pressure (Sitting)</p>
            <p className="text-xs text-red-400 mb-1">
              *should measure 3 hourly
            </p>

            {/* Row 1: Systolic & Diastolic */}
            <div className="grid grid-cols-2 gap-4 mb-2">
              <div>
                <label className="text-sm">Systolic</label>
                <input
                  className="input-field"
                  type="number"
                  value={formData.bloodPressureSitting.systolic}
                  onChange={(e) =>
                    handleChange(e, "bloodPressureSitting", "systolic")
                  }
                  placeholder="/mmHg"
                />
              </div>
              <div>
                <label className="text-sm">Diastolic</label>
                <input
                  className="input-field"
                  value={formData.bloodPressureSitting.diastolic}
                  onChange={(e) =>
                    handleChange(e, "bloodPressureSitting", "diastolic")
                  }
                  type="text"
                  placeholder="/mmHg"
                />
              </div>
            </div>

            {/* Row 2: Respiratory & CRT */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm">Respiratory Rate</label>
                <input
                  className="input-field"
                  type="number"
                  value={formData.respiratoryRate}
                  onChange={(e) => handleChange(e, null, "respiratoryRate")}
                  placeholder="/min"
                />
              </div>
              <div>
                <label className="text-sm">Capillary Refill Time (CRFT)</label>
                <input
                  className="input-field"
                  value={formData.capillaryRefillTime}
                  onChange={(e) => handleChange(e, null, "capillaryRefillTime")}
                  type="number"
                  placeholder="s"
                />
              </div>
            </div>
          </div>

          {/* Observation */}
          <div>
            <label className="text-sm font-bold">Observation / Action</label>
            <textarea
              value={formData.observation}
              onChange={(e) => handleChange(e, null, "observation")}
              className="w-full border border-gray-300 rounded-md p-2 min-h-[100px]"
            ></textarea>
          </div>

          {/* Buttons */}
          <div className="flex justify-between mt-6">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-2 rounded-full"
            >
              Back
            </button>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-2 rounded-full"
            >
              Submit
            </button>
          </div>
        </form>
      </div>

      {/* Custom styles for input fields */}
      <style>{`
        .input-field {
          width: 100%;
          padding: 0.5rem;
          border: 1px solid #d1d5db;
          border-radius: 0.375rem;
          outline: none;
        }
        .input-field:focus {
          border-color: #3b82f6;
        }
      `}</style>
    </div>
  );
};

export default PatientForm;
