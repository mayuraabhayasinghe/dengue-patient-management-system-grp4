import React from "react";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./Pages/Dashboard";
import AdminNavbar from "./Components/Navbar";
import AdminFeedbacks from "./Pages/AdminFeedbacks";

const App = () => {
  return (
    <>
      <AdminNavbar />
      <Routes>
        <Route path="/admin/dashboard" element={<Dashboard />}></Route>
        <Route path="/admin/feedback" element={<AdminFeedbacks />}></Route>
      </Routes>
    </>
  );
};

export default App;
