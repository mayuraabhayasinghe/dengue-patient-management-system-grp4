import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const Registration = () => {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    weight: "",
    gender: "Male",
    bystanderName: "",
    bystanderAddress: "",
    bystanderEmail: "",
    admissionDate: "",
    admissionTime: "",
    ward: "",
    bedNumber: "",
    dischargeDate: "",
  });

  const [wards, setWards] = useState([]);
  const [beds, setBeds] = useState([]);
  const [currentWard, setCurrentWard] = useState([]);
  const [availableBeds, setAvailableBeds] = useState([]);

  const navigate = useNavigate();

  // Fetch all wards and beds
  useEffect(() => {
    const fetchData = async () => {
      try {
        const wardRes = await axios.get("http://localhost:5000/api/wards");
        const bedRes = await axios.get("http://localhost:5000/api/beds");

        setWards(wardRes.data);
        setBeds(bedRes.data);
      } catch (error) {
        console.error("Error fetching wards or beds:", error);
      }
    };

    fetchData();
  }, []);

  // Filter beds by selected ward
  useEffect(() => {
    if (formData.ward) {
      const filteredBeds = beds.filter(
        (bed) => bed.ward.name === formData.ward && bed.status === "available"
      );
      setAvailableBeds(filteredBeds);
    } else {
      setAvailableBeds([]);
    }
  }, [formData.ward, beds]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
      ...(name === "ward" ? { bedNumber: "" } : {}), // reset bedNumber if ward changes
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "http://localhost:5000/api/patients/register-patient",
        formData
      );
      toast.success("Patient registered successfully!");
      setFormData({
        name: "",
        age: "",
        weight: "",
        gender: "Male",
        bystanderName: "",
        bystanderAddress: "",
        bystanderEmail: "",
        admissionDate: "",
        admissionTime: "",
        ward: "",
        bedNumber: "",
        dischargeDate: "",
      });
    } catch (error) {
      toast.error("Error registering patient");
      console.error("Error: ", error);
    }
  };

  return (
    <div className="bg-[#00BFA5] w-full min-h-screen flex items-center justify-center px-4 md:px-8 lg:px-20">
      <div className="w-full bg-white rounded-lg shadow-xl py-8 px-6 md:px-10 lg:px-16">
        <h1 className="text-center font-sans font-bold text-2xl md:text-3xl mb-6">
          Patient Registration
        </h1>

        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-6">
          {/* Patient's Name */}
          <div className="flex flex-col md:flex-row gap-6">
            <label className="flex-1 text-center font-medium bg-[#BDEFE8] rounded-lg px-4 py-2">
              Patient's Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter patient's name"
              className="flex-3 w-full border rounded-lg px-4 py-2 focus:outline-[#00BFA5]"
            />
          </div>

          {/* Age, Weight, Gender */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Age */}
            <div className="flex flex-col">
              <label className="text-center font-medium bg-[#BDEFE8] rounded-lg px-4 py-2">
                Age
              </label>
              <input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleChange}
                placeholder="Enter age"
                className="border rounded-lg px-4 py-2 focus:outline-[#00BFA5]"
              />
            </div>

            {/* Weight */}
            <div className="flex flex-col">
              <label className="text-center font-medium bg-[#BDEFE8] rounded-lg px-4 py-2">
                Weight
              </label>
              <input
                type="number"
                name="weight"
                value={formData.weight}
                onChange={handleChange}
                placeholder="Enter weight(Kg)"
                className="border rounded-lg px-4 py-2 focus:outline-[#00BFA5]"
              />
            </div>

            {/* Gender */}
            <div className="flex flex-col">
              <label className="text-center font-medium bg-[#BDEFE8] rounded-lg px-4 py-2">
                Gender
              </label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="border rounded-lg px-4 py-2 focus:outline-[#00BFA5]">
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>
            </div>
          </div>

          {/* Bystander details */}
          <div className="flex flex-col gap-6">
            <div className="flex flex-col md:flex-row gap-6">
              <label className="flex-1 text-center font-medium bg-[#BDEFE8] rounded-lg px-4 py-2">
                Bystander's Name
              </label>
              <input
                type="text"
                name="bystanderName"
                value={formData.bystanderName}
                onChange={handleChange}
                placeholder="Enter bystander's name"
                className="flex-3 w-full border rounded-lg px-4 py-2 focus:outline-[#00BFA5]"
              />
            </div>

            <div className="flex flex-col md:flex-row gap-6">
              <label className="flex-1 text-center font-medium bg-[#BDEFE8] rounded-lg px-4 py-2">
                Bystander's Email Address
              </label>
              <input
                type="email"
                name="bystanderEmail"
                value={formData.bystanderEmail}
                onChange={handleChange}
                placeholder="Enter bystander's email address"
                className="flex-3 w-full border rounded-lg px-4 py-2 focus:outline-[#00BFA5]"
              />
            </div>

            <div className="flex flex-col md:flex-row gap-6">
              <label className="flex-1 text-center font-medium bg-[#BDEFE8] rounded-lg px-4 py-2">
                Bystander's Address
              </label>
              <input
                type="text"
                name="bystanderAddress"
                value={formData.bystanderAddress}
                onChange={handleChange}
                placeholder="Enter bystander's address"
                className="flex-3 w-full border rounded-lg px-4 py-2 focus:outline-[#00BFA5]"
              />
            </div>
          </div>

          {/* Admission details */}
          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col">
              <label className="text-center font-medium bg-[#BDEFE8] rounded-lg px-4 py-2">
                Date of Admission
              </label>
              <input
                type="date"
                name="admissionDate"
                value={formData.admissionDate}
                onChange={handleChange}
                className="border rounded-lg px-4 py-2 focus:outline-[#00BFA5]"
              />
            </div>

            <div className="flex flex-col">
              <label className="text-center font-medium bg-[#BDEFE8] rounded-lg px-4 py-2">
                Time of Admission
              </label>
              <input
                type="time"
                name="admissionTime"
                value={formData.admissionTime}
                onChange={handleChange}
                className="border rounded-lg px-4 py-2 focus:outline-[#00BFA5]"
              />
            </div>
          </div>

          {/* bed and ward */}
          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col">
              <label className="text-center font-medium bg-[#BDEFE8] rounded-lg px-4 py-2">
                Ward
              </label>
              <select
                name="ward"
                value={formData.ward}
                onChange={handleChange}
                className="border rounded-lg px-4 py-2 focus:outline-[#00BFA5]">
                <option value="">Select a ward</option>
                {wards
                  .filter((ward) => ward.status === "Active")
                  .map((ward) => (
                    <option key={ward._id} value={ward.name}>
                      {ward.name}
                    </option>
                  ))}
              </select>
            </div>

            {/* Bed Number */}
            <div className="flex flex-col">
              <label className="text-center font-medium bg-[#BDEFE8] rounded-lg px-4 py-2">
                Bed Number
              </label>
              <select
                name="bedNumber"
                value={formData.bedNumber}
                onChange={handleChange}
                disabled={!formData.ward}
                className="border rounded-lg px-4 py-2 focus:outline-[#00BFA5]">
                <option value="">Select a bed</option>
                {availableBeds.length > 0 ? (
                  availableBeds.map((bed) => (
                    <option key={bed._id} value={bed.number}>
                      Bed {bed.number}
                    </option>
                  ))
                ) : (
                  <option disabled>No available beds in the ward</option>
                )}
              </select>
            </div>
          </div>

          {/* Discharge Date */}
          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col">
              <label className="text-center font-medium bg-[#BDEFE8] rounded-lg px-4 py-2">
                Date of Discharge
              </label>
              <input
                type="date"
                name="dischargeDate"
                value={formData.dischargeDate}
                onChange={handleChange}
                className="border rounded-lg px-4 py-2 focus:outline-[#00BFA5]"
              />
            </div>
          </div>

          <div className="flex justify-between items-center mt-8">
            <button
              onClick={() => navigate(-1)}
              type="button"
              className="w-full md:w-[200px] bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-full">
              Back
            </button>
            <button
              type="submit"
              className="w-full md:w-[200px] bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-full">
              Submit
            </button>
          </div>
        </form>

        <ToastContainer
          position="top-center"
          autoClose={2000}
          hideProgressBar
        />
      </div>
    </div>
  );
};

export default Registration;
