import React, { useState } from "react";
import Overview from "../Components/Dashboard/Overview";
import Patients from "../Components/Dashboard/Patients";
import WardManagement from "../Components/Dashboard/WardManagement";
import Inventory from "../Components/Dashboard/Inventory";
import Accounts from "../Components/Dashboard/Accounts";

const Dashboard = () => {
  const [activeComponent, setActiveComponent] = useState("overview");

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

  return (
    <div>
      <div className="flex gap-2">
        {/* Sidebar links */}
        <div className="flex flex-col gap-2 w-48 bg-gray-100 p-4 min-h-screen">
          <button onClick={() => setActiveComponent("overview")}>
            Overview
          </button>
          <button onClick={() => setActiveComponent("patients")}>
            Patients
          </button>
          <button onClick={() => setActiveComponent("ward")}>
            Ward Management
          </button>
          <button onClick={() => setActiveComponent("inventory")}>
            Inventory
          </button>
          <button onClick={() => setActiveComponent("account")}>
            Accounts
          </button>
        </div>

        {/* Display section */}
        <div className="flex-1 p-4">{renderComponent()}</div>
      </div>
    </div>
  );
};

export default Dashboard;
