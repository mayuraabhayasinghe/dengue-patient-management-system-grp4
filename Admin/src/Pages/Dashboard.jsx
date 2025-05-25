import React, { useState, useEffect } from "react";
import Overview from "../Components/Dashboard/Overview";
import Users from "../Components/Dashboard/Users";
import WardManagement from "../Components/Dashboard/WardManagement";
import Inventory from "../Components/Dashboard/Inventory";
import { useParams, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChartPie,
  faHospitalUser,
  faBoxes,
  faUserShield,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

const Dashboard = () => {
  const { section } = useParams();
  const navigate = useNavigate();
  const [activeComponent, setActiveComponent] = useState("overview");

  const navItems = [
    { id: "overview", label: "Overview", icon: faChartPie },
    { id: "users", label: "Users", icon: faUser },
    { id: "ward", label: "Ward Management", icon: faHospitalUser },
    { id: "inventory", label: "Inventory", icon: faBoxes },
  ];

  useEffect(() => {
    if (section && navItems.some((item) => item.id === section)) {
      setActiveComponent(section);
    } else {
      navigate("/dashboard/overview");
    }
  }, [section, navigate]);

  const renderComponent = () => {
    switch (activeComponent) {
      case "overview":
        return <Overview />;
      case "users":
        return <Users />;
      case "ward":
        return <WardManagement />;
      case "inventory":
        return <Inventory />;
      default:
        return <Overview />;
    }
  };

  return (
    <div className="flex min-h-screen m-2 md:m-3">
      {/* Sidebar */}
      <div className="w-fit px-2 py-5 bg-primary-1 text-white shadow-md rounded">
        <h2 className="text-2xl font-bold mb-6 hidden md:block">Dashboard</h2>
        <div className="flex flex-col gap-3">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveComponent(item.id);
                navigate(`/dashboard/${item.id}`);
              }}
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
