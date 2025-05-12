import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUsers,
  faComments,
  faUserShield,
  faListCheck,
  faPlusCircle,
  faChartPie,
  faBug,
} from "@fortawesome/free-solid-svg-icons";

const AdminHome = () => {
  return (
    <div className="p-6 md:p-10 bg-gray-100 min-h-screen font-sans">
      {/* Header */}
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-primary-1 mb-2">
          Admin Dashboard - DengueGuard 🛡️
        </h1>
        <p className="text-gray-600">
          Manage users, feedback, and monitor system activity.
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {[
          {
            icon: faUsers,
            title: "Registered Users",
            value: "2,345",
            color: "text-blue-500",
          },
          {
            icon: faComments,
            title: "Feedbacks",
            value: "127",
            color: "text-green-500",
          },
          {
            icon: faUserShield,
            title: "Admin Staff",
            value: "8",
            color: "text-purple-500",
          },
          {
            icon: faListCheck,
            title: "Pending Requests",
            value: "19",
            color: "text-yellow-500",
          },
        ].map((card, i) => (
          <div
            key={i}
            className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition duration-300">
            <FontAwesomeIcon
              icon={card.icon}
              className={`${card.color} text-3xl mb-3`}
            />
            <h2 className="text-lg font-semibold">{card.title}</h2>
            <p className="text-xl font-bold mt-2">{card.value}</p>
          </div>
        ))}
      </div>

      {/* Charts and Insights (Placeholder) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        <div className="bg-white p-6 rounded-xl shadow-md">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-700">
              Dengue Case Trends
            </h3>
            <FontAwesomeIcon
              icon={faChartPie}
              className="text-primary-1 text-xl"
            />
          </div>
          <div className="h-[200px] flex items-center justify-center text-gray-400 italic">
            {/* Chart Placeholder */}
            [Insert Line or Pie Chart Here]
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-700">
              System Errors / Reports
            </h3>
            <FontAwesomeIcon icon={faBug} className="text-red-500 text-xl" />
          </div>
          <ul className="list-disc pl-5 text-gray-600 space-y-2">
            <li>3 failed login attempts (last 24h)</li>
            <li>API rate limit reached at 3:45 PM</li>
            <li>No new critical errors today</li>
          </ul>
        </div>
      </div>

      {/* Recent Activity Log */}
      <div className="bg-white p-6 rounded-xl shadow-md mb-10">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          Recent Activity
        </h3>
        <ul className="space-y-3 text-gray-600 text-sm">
          <li>✅ New user registered: John Doe (5 mins ago)</li>
          <li>✅ Feedback submitted by user: jane@xyz.com (30 mins ago)</li>
          <li>⚠️ Admin approved 2 pending registrations (1 hr ago)</li>
          <li>📢 System maintenance completed (yesterday)</li>
        </ul>
      </div>
    </div>
  );
};

export default AdminHome;
