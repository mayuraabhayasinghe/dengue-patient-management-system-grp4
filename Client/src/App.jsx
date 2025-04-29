import React from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "./Components/Navbar";
import HomePage from "./Pages/HomePage";
import Login from "./Pages/Login";
import Footer from "./components/Footer";
import Dashboard from "./Pages/Dashboard";
import Registration from "./Pages/Registration";

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/registration" element={<Registration />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
