import React, { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
    bedNumber: "",
    dischargeDate: "", // it is empty initially
  });

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  //Submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:5000/api/patients/register-patient",
        formData
      );
      toast.success("Patient registered successfully!");
      console.log("Response:", res.data);

      // Reset form after submitting
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
        bedNumber: "",
        dischargeDate: "",
      });
    } catch (error) {
      toast.error("Error registering patient");
      console.error("Error: ", error);
    }
  };
  return (
    <div className="bg-[#00BFA5] w-full min-h-screen flex items-center justify-center px-[10%]">
      <div className="w-full bg-white rounded-lg shadow-xl py-[50px] px-[60px]">
        <h1 className="text-center font-sans font-bold text-[22px]">
          Patient Registration
        </h1>

        {/* form */}
        <form
          onSubmit={handleSubmit}
          className="w-full flex flex-col gap-[20px] mt-[30px]"
        >
          <div className="flex items-center gap-[20px]">
            <lable className="flex-[1] text-center font-sans font-medium bg-[#BDEFE8] rounded-lg px-4 py-2">
              Patient's Name
            </lable>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter patient's name"
              className="flex-[3] w-full border rounded-lg px-4 py-2 focus:outline-[#00BFA5]"
            ></input>
          </div>
          {/* gender, weight and age */}
          <div className="grid grid-cols-3">
            {/* age */}
            <div className="flex items-center gap-[10px]">
              <lable className=" flex-none text-center font-sans font-medium bg-[#BDEFE8] rounded-lg px-4 py-2">
                Age
              </lable>
              <input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleChange}
                placeholder="Enter age"
                className="border rounded-lg px-4 py-2 focus:outline-[#00BFA5]"
              ></input>
            </div>
            {/* weight */}
            <div className="flex items-center gap-[10px]">
              <lable className=" flex-none text-center font-sans font-medium bg-[#BDEFE8] rounded-lg px-4 py-2">
                Weight
              </lable>
              <input
                type="number"
                name="weight"
                value={formData.weight}
                onChange={handleChange}
                placeholder="Enter weight(Kg)"
                className="border rounded-lg px-4 py-2 focus:outline-[#00BFA5]"
              ></input>
            </div>
            {/* gender */}
            <div className="flex items-center gap-[10px]">
              <lable className="flex-none text-center font-sans font-medium bg-[#BDEFE8] rounded-lg px-4 py-2">
                Gender
              </lable>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="border rounded-lg px-4 py-2 focus:outline-[#00BFA5]"
              >
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>
            </div>
          </div>
          {/* Bystander details */}
          <div className="flex items-center gap-[20px]">
            <lable className="flex-[1] text-center font-sans font-medium bg-[#BDEFE8] rounded-lg px-4 py-2">
              Bystander's Name
            </lable>
            <input
              type="text"
              name="bystanderName"
              value={formData.bystanderName}
              onChange={handleChange}
              placeholder="Enter bystander's name"
              className="flex-[3] w-full border rounded-lg px-4 py-2 focus:outline-[#00BFA5]"
            ></input>
          </div>
          <div className="flex items-center gap-[20px]">
            <lable className="flex-[1] text-center font-sans font-medium bg-[#BDEFE8] rounded-lg px-4 py-2">
              Bystander's Email Address
            </lable>
            <input
              type="email"
              name="bystanderEmail"
              value={formData.bystanderEmail}
              onChange={handleChange}
              placeholder="Enter bystander's email adress"
              className="flex-[3] w-full border rounded-lg px-4 py-2 focus:outline-[#00BFA5]"
            ></input>
          </div>
          <div className="flex items-center gap-[20px]">
            <lable className="flex-[1] text-center font-sans font-medium bg-[#BDEFE8] rounded-lg px-4 py-2">
              Bystander's Address
            </lable>
            <input
              type="text"
              name="bystanderAddress"
              value={formData.bystanderAddress}
              onChange={handleChange}
              placeholder="Enter bystander's address"
              className="flex-[3] w-full border rounded-lg px-4 py-2 focus:outline-[#00BFA5]"
            ></input>
          </div>
          {/* Admission details */}
          <div className="w-full grid grid-cols-2">
            <div className="flex items-center gap-[20px]">
              <lable className="flex-none text-center font-sans font-medium bg-[#BDEFE8] rounded-lg px-4 py-2">
                Date of Admission
              </lable>
              <input
                type="date"
                name="admissionDate"
                value={formData.admissionDate}
                onChange={handleChange}
                className="border rounded-lg px-4 py-2 focus:outline-[#00BFA5]"
              ></input>
            </div>
            <div className="flex items-center gap-[20px]">
              <lable className="flex-none text-center font-sans font-medium bg-[#BDEFE8] rounded-lg px-4 py-2">
                Time of Admission
              </lable>
              <input
                type="time"
                name="admissionTime"
                value={formData.admissionTime}
                onChange={handleChange}
                className="border rounded-lg px-4 py-2 focus:outline-[#00BFA5]"
              ></input>
            </div>
          </div>
          {/* bed number and data of discharge */}
          <div className="grid grid-cols-2">
            <div className="flex items-center gap-[10px]">
              <lable className=" flex-none text-center font-sans font-medium bg-[#BDEFE8] rounded-lg px-4 py-2">
                Bed Number
              </lable>
              <input
                type="text"
                name="bedNumber"
                value={formData.bedNumber}
                onChange={handleChange}
                placeholder="Enter bed number"
                className="border rounded-lg px-4 py-2 focus:outline-[#00BFA5]"
              ></input>
            </div>
            {/* date of discharge */}
            <div className="flex items-center gap-[20px]">
              <lable className="flex-none text-center font-sans font-medium bg-[#BDEFE8] rounded-lg px-4 py-2">
                Date of Discharge
              </lable>
              <input
                type="date"
                name="dischargeDate"
                value={formData.dischargeDate}
                onChange={handleChange}
                className="border rounded-lg px-4 py-2 focus:outline-[#00BFA5]"
              ></input>
            </div>
          </div>
          <div className="flex justify-between items-center mt-[40px]">
            <button
              type="button"
              className="w-[200px] bg-blue-600 hover:bg-blue-700 text-white font-sans font-semibold py-4 px-4 rounded-full"
            >
              Back
            </button>
            <button
              type="submit"
              className="w-[200px] bg-blue-600 hover:bg-blue-700 text-white font-sans font-semibold py-4 px-4 rounded-full"
            >
              Submit
            </button>
          </div>
        </form>

        {/* Toast container for feedback */}
        <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
      </div>
    </div>
  );
};

export default Registration;
