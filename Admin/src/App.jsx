import React from "react";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./Pages/Dashboard";
import AdminNavbar from "./Components/Navbar";
import AdminFeedbacks from "./Pages/AdminFeedbacks";
import StaffRegistration from "./Pages/StaffRegistration";
import PatientRegistration from "../../Client/src/Pages/Registration";
import AdminHome from "./Pages/AdminHome";

const App = () => {
  return (
    <>
      <AdminNavbar />
      <Routes>
        <Route path="/" element={<AdminHome />}></Route>
        <Route path="/admin" element={<AdminHome />}></Route>
        <Route path="/admin/dashboard" element={<Dashboard />}></Route>
        <Route path="/admin/feedback" element={<AdminFeedbacks />}></Route>
        <Route
          path="/admin/staffRegistration"
          element={<StaffRegistration />}
        />
        <Route
          path="/admin/patientRegistration"
          element={<PatientRegistration />}
        />
      </Routes>
    </>
  );
};

export default App;
