import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import Overview from "../Components/Dashboard/Overview";
import Patients from "../Components/Dashboard/Patients";
import WardManagement from "../Components/Dashboard/WardManagement";
import Inventory from "../Components/Dashboard/Inventory";
import Accounts from "../Components/Dashboard/Accounts";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChartPie,
  faUserInjured,
  faHospitalUser,
  faBoxes,
  faUserShield,
} from "@fortawesome/free-solid-svg-icons";

const Dashboard = () => {
  const { section } = useParams();
  const navigate = useNavigate();
  const [activeComponent, setActiveComponent] = useState("overview");

  useEffect(() => {
    if (section && navItems.some((item) => item.id === section)) {
      setActiveComponent(section);
    } else {
      navigate("/dashboard/overview"); // fallback if invalid section
    }
  }, [section]);

  const renderComponent = () => {
    switch (activeComponent) {
      case "overview":
        return <Overview />;
      case "patients":
        return <Patients />;
      case "ward":
        return <WardManagement />;
      case "inventory":
        return <Inventory />;
      case "account":
        return <Accounts />;
      default:
        return <Overview />;
    }
  };

  const navItems = [
    { id: "overview", label: "Overview", icon: faChartPie },
    { id: "patients", label: "Patients", icon: faUserInjured },
    { id: "ward", label: "Ward Management", icon: faHospitalUser },
    { id: "inventory", label: "Inventory", icon: faBoxes },
    { id: "account", label: "Accounts", icon: faUserShield },
  ];

  return (
    <div className="flex min-h-screen m-2 md:m-3">
      {/* Sidebar */}
      <div className="w-fit px-2 py-5 bg-primary-1 text-white shadow-md rounded">
        <h2 className="text-2xl font-bold mb-6 hidden md:block">Dashboard</h2>
        <div className="flex flex-col gap-3">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => navigate(`/dashboard/${item.id}`)}
              className={`flex items-center gap-3 p-2 md:p-3 rounded-lg text-left transition duration-200 ${
                activeComponent === item.id
                  ? "bg-white text-primary-1 font-semibold shadow"
                  : "hover:bg-white hover:text-primary-1"
              }`}>
              <FontAwesomeIcon
                className="text-2xl md:text-xl"
                icon={item.icon}
              />
              <span className="hidden md:block">{item.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-3 md:p-5 bg-gray-100 rounded">
        {renderComponent()}
      </div>
    </div>
  );
};

export default Dashboard;
