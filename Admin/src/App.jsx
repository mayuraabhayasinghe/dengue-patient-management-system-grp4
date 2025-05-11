import React from "react";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./Pages/Dashboard";
import AdminNavbar from "./Components/Navbar";

const App = () => {
  return (
    <>
      <AdminNavbar />
      <Routes>
        <Route path="/admin/dashboard" element={<Dashboard />}></Route>
      </Routes>
    </>
  );
};

export default App;
