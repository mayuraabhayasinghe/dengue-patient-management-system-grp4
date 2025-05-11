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

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
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
