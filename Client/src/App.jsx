import React from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "./Components/Navbar";
import HomePage from "./Pages/HomePage";
import Login from "./Pages/Login";
import Footer from "./components/Footer";
import Dashboard from "./Pages/Dashboard";
import Registration from "./Pages/Registration";
import Chatbot from "./Components/Chatbot";
import PatientPage from "./Pages/PatientPage";
import Caretaker from "./Pages/Caretaker";
import { ToastContainer } from "react-toastify";
import Patients from "./Components/Dashboard/Patients";
import Profile from "./Components/Dashboard/Profile";

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        {/* Add these nested routes under dashboard */}
        <Route path="/dashboard/patients" element={<Patients />} />
        <Route path="/patients/:id" element={<Profile />} />
        {/* End of new routes */}
        <Route path="/registration" element={<Registration />} />
        <Route path="/chatbot" element={<Chatbot />} />
        <Route path="/patient-form" element={<PatientPage />} />
        <Route path="/caretaker-input-form" element={<Caretaker />} />
      </Routes>
      <ToastContainer position="top-center" autoClose={3000} />
      <Footer />
    </div>
  );
};

export default App;