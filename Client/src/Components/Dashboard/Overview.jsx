import { faCheck, faSearch, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion } from "framer-motion";
import React from "react";

const Overview = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 items-center">
        {/* Ward staff */}
        <motion.div
          className="p-4 md:p-5 bg-white shadow-2xl rounded flex flex-col justify-center items-center gap-3 order-2 md:order-1"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}>
          <h1 className="text-text-2 text-xl font-semibold"> Ward Staff</h1>

          {[...Array(3)].map((_, i) => (
            <div key={i} className="flex gap-2 w-full">
              <p className="bg-text-2 text-white-1 p-2">101</p>
              <p className="bg-gray-300 flex-1 p-2 text-text-2">ABC Perera</p>
              <p className="bg-green-300 rounded text-white-1 flex items-center justify-center">
                <FontAwesomeIcon icon={faCheck} className="text-xl p-2" />
              </p>
            </div>
          ))}

          {[...Array(2)].map((_, i) => (
            <div key={i + 3} className="flex gap-2 w-full">
              <p className="bg-text-2 text-white-1 p-2">101</p>
              <p className="bg-gray-300 flex-1 p-2 text-text-2">ABC Perera</p>
              <p className="bg-red-300 rounded text-white-1 flex items-center justify-center">
                <FontAwesomeIcon icon={faXmark} className="text-xl p-2" />
              </p>
            </div>
          ))}
        </motion.div>

        {/* Bed count */}
        <motion.div
          className="flex flex-col gap-3 order-1 md:order-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}>
          {[
            { label: "Total Bed Count", value: 23 },
            { label: "Available Bed Count", value: 3 },
          ].map((item, idx) => (
            <div
              key={idx}
              className="bg-primary-2 rounded-2xl flex items-center justify-between gap-3 p-3 md:p-5 hover:scale-[1.02] transition-transform">
              <p className="text-white-1 font-semibold text-[1.1rem] md:text-2xl">
                {item.label}
              </p>
              <p className="bg-white-1 rounded p-2 text-[1.2rem] md:text-2xl font-semibold">
                {item.value}
              </p>
            </div>
          ))}
        </motion.div>

        {/* Notifications */}
        <motion.div
          className="p-4 md:p-5 bg-white shadow-2xl rounded flex flex-col justify-center gap-3 order-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}>
          <div className="flex items-center justify-between flex-wrap gap-2">
            <h2 className="font-semibold text-text-2">Notifications</h2>
            <div className="py-1 px-2 flex-1 flex items-center justify-between bg-background-1 rounded text-text-1 border-1 border-primary-1">
              <input
                type="text"
                placeholder="Search patients"
                className="border-none outline-none bg-transparent text-text-1 placeholder-text-1"
              />
              <FontAwesomeIcon icon={faSearch} />
            </div>
          </div>

          <table className="w-full text-xs sm:text-sm md:text-base text-left border border-gray-300 rounded overflow-hidden">
            <thead className="bg-primary-2 text-white-1">
              <tr>
                <th className="p-2 sm:p-3 md:p-4 border-b">Reference No.</th>
                <th className="p-2 sm:p-3 md:p-4 border-b">Message</th>
                <th className="p-2 sm:p-3 md:p-4 border-b">Status</th>
              </tr>
            </thead>
            <tbody>
              {[
                {
                  ref: "REF001",
                  msg: "Patient admitted to ward 5",
                  status: "Resolved",
                  color: "text-green-600",
                },
                {
                  ref: "REF002",
                  msg: "Bed unavailable in ward 3",
                  status: "Pending",
                  color: "text-red-500",
                },
                {
                  ref: "REF003",
                  msg: "New nurse assigned to ward 1",
                  status: "Resolved",
                  color: "text-green-600",
                },
                {
                  ref: "REF004",
                  msg: "Request for medical supplies",
                  status: "In Progress",
                  color: "text-yellow-500",
                },
              ].map((n, idx) => (
                <tr
                  key={idx}
                  className={`${
                    idx % 2 === 0 ? "bg-gray-100" : "bg-white"
                  } hover:bg-gray-200 transition`}>
                  <td className="p-2 sm:p-3 md:p-4 border-b">{n.ref}</td>
                  <td className="p-2 sm:p-3 md:p-4 border-b">{n.msg}</td>
                  <td
                    className={`p-2 sm:p-3 md:p-4 border-b font-semibold ${n.color}`}>
                    {n.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>

        {/* Special Attention */}
        <motion.div
          className="p-4 md:p-5 bg-white shadow-2xl rounded flex flex-col justify-center gap-5 order-4 text-xs sm:text-sm"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}>
          <h1 className="text-text-2 font-semibold">
            Special Attention Needed
          </h1>
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="flex items-center justify-between gap-2 md:gap-4 h-14 hover:scale-[1.01] transition-transform">
              <p className="bg-gray-300 p-4 flex-1 h-[inherit]">
                D.S. Senanayake
              </p>
              <div className="flex flex-col justify-center h-[inherit]">
                <p className="bg-gray-900 text-white-1 p-1 px-3">Ward 02</p>
                <p className="bg-gray-300 p-1 px-3">Ward 02</p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Overview;
