import { faCheck, faSearch, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const Overview = () => {
  return (
    <div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 items-center">
        {/* Ward staff */}
        <div className="p-4 md:p-5 bg-white shadow-2xl rounded flex flex-col justify-center items-center gap-3 order-2 md:order-1">
          <h1 className="text-text-2 text-xl font-semibold"> Ward Staff</h1>
          <div className="flex gap-2 w-full">
            <p className="bg-text-2 text-white-1 p-2">101</p>
            <p className="bg-gray-300 flex-1 p-2 text-text-2">ABC Perera</p>
            <p className="bg-green-300 rounded text-white-1 flex items-center justify-center">
              <FontAwesomeIcon
                icon={faCheck}
                className="text-xl p-2"></FontAwesomeIcon>
            </p>
          </div>
          <div className="flex gap-2 w-full">
            <p className="bg-text-2 text-white-1 p-2">101</p>
            <p className="bg-gray-300 flex-1 p-2 text-text-2">ABC Perera</p>
            <p className="bg-green-300 rounded text-white-1 flex items-center justify-center">
              <FontAwesomeIcon
                icon={faCheck}
                className="text-xl p-2"></FontAwesomeIcon>
            </p>
          </div>
          <div className="flex gap-2 w-full">
            <p className="bg-text-2 text-white-1 p-2">101</p>
            <p className="bg-gray-300 flex-1 p-2 text-text-2">ABC Perera</p>
            <p className="bg-green-300 rounded text-white-1 flex items-center justify-center">
              <FontAwesomeIcon
                icon={faCheck}
                className="text-xl p-2"></FontAwesomeIcon>
            </p>
          </div>
          <div className="flex gap-2 w-full">
            <p className="bg-text-2 text-white-1 p-2">101</p>
            <p className="bg-gray-300 flex-1 p-2 text-text-2">ABC Perera</p>
            <p className="bg-red-300 rounded text-white-1 flex items-center justify-center">
              <FontAwesomeIcon
                icon={faXmark}
                className="text-xl p-2"></FontAwesomeIcon>
            </p>
          </div>
          <div className="flex gap-2 w-full">
            <p className="bg-text-2 text-white-1 p-2">101</p>
            <p className="bg-gray-300 flex-1 p-2 text-text-2">ABC Perera</p>
            <p className="bg-red-300 rounded text-white-1 flex items-center justify-center">
              <FontAwesomeIcon
                icon={faXmark}
                className="text-xl p-2"></FontAwesomeIcon>
            </p>
          </div>
        </div>

        {/* Bed count */}
        <div className="flex flex-col gap-3 order-1 md:order-2">
          <div className="bg-primary-2 rounded-2xl flex items-center justify-between gap-3 p-3 md:p-5">
            <p className="text-white-1 font-semibold text-[1.1rem] md:text-2xl">
              Total Bed Count
            </p>
            <p className="bg-white-1 rounded p-2 text-[1.2rem] md:text-2xl font-semibold">
              23
            </p>
          </div>
          <div className="bg-primary-2 rounded-2xl flex items-center justify-between gap-3 p-3 md:p-5">
            <p className="text-white-1 font-semibold text-[1.1rem] md:text-2xl">
              Available Bed Count
            </p>
            <p className="bg-white-1 rounded p-2 text-[1.2rem] md:text-2xl font-semibold">
              03
            </p>
          </div>
        </div>

        {/* Notifications */}
        <div className="p-4 md:p-5 bg-white shadow-2xl rounded flex flex-col justify-center gap-3 order-3">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <h2 className="font-semibold text-text-2">Notifications</h2>
            <div className="py-1 px-2 flex-1 flex items-center justify-between bg-background-1 rounded text-text-1 border-1 border-primary-1">
              <input
                type="text"
                placeholder="Search patients"
                className="border-none outline-none bg-transparent text-text-1 placeholder-text-1"
              />
              <FontAwesomeIcon icon={faSearch}></FontAwesomeIcon>
            </div>
          </div>
          <div>
            <table className="w-full text-xs sm:text-sm md:text-base text-left border border-gray-300 rounded overflow-hidden">
              <thead className="bg-primary-2 text-white-1">
                <tr>
                  <th className="p-2 sm:p-3 md:p-4 border-b">Reference No.</th>
                  <th className="p-2 sm:p-3 md:p-4 border-b">Message</th>
                  <th className="p-2 sm:p-3 md:p-4 border-b">Status</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-gray-100 hover:bg-gray-200 transition">
                  <td className="p-2 sm:p-3 md:p-4 border-b">REF001</td>
                  <td className="p-2 sm:p-3 md:p-4 border-b">
                    Patient admitted to ward 5
                  </td>
                  <td className="p-2 sm:p-3 md:p-4 border-b text-green-600 font-semibold">
                    Resolved
                  </td>
                </tr>
                <tr className="bg-white hover:bg-gray-100 transition">
                  <td className="p-2 sm:p-3 md:p-4 border-b">REF002</td>
                  <td className="p-2 sm:p-3 md:p-4 border-b">
                    Bed unavailable in ward 3
                  </td>
                  <td className="p-2 sm:p-3 md:p-4 border-b text-red-500 font-semibold">
                    Pending
                  </td>
                </tr>
                <tr className="bg-gray-100 hover:bg-gray-200 transition">
                  <td className="p-2 sm:p-3 md:p-4 border-b">REF003</td>
                  <td className="p-2 sm:p-3 md:p-4 border-b">
                    New nurse assigned to ward 1
                  </td>
                  <td className="p-2 sm:p-3 md:p-4 border-b text-green-600 font-semibold">
                    Resolved
                  </td>
                </tr>
                <tr className="bg-white hover:bg-gray-100 transition">
                  <td className="p-2 sm:p-3 md:p-4">REF004</td>
                  <td className="p-2 sm:p-3 md:p-4">
                    Request for medical supplies
                  </td>
                  <td className="p-2 sm:p-3 md:p-4 text-yellow-500 font-semibold">
                    In Progress
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Special attention needed patients */}
        <div className="p-4 md:p-5  bg-white shadow-2xl rounded flex flex-col justify-center gap-5 order-4 text-xs sm:text-sm">
          <h1 className="text-text-2 font-semibold">
            Special Attention Needed
          </h1>
          <div className="flex items-center justify-between gap-2 md:gap-4 h-14">
            <p className="bg-gray-300 p-4 flex-1 h-[inherit]">
              D.S. Senanayake
            </p>
            <div className="flex flex-col justify-center h-[inherit]">
              <p className="bg-gray-900 text-white-1 p-1 px-3">Ward 02</p>
              <p className="bg-gray-300 p-1 px-3">Ward 02</p>
            </div>
          </div>
          <div className="flex items-center justify-between gap-2 md:gap-4 h-14">
            <p className="bg-gray-300 p-4 flex-1 h-[inherit]">
              D.S. Senanayake
            </p>
            <div className="flex flex-col justify-center h-[inherit]">
              <p className="bg-gray-900 text-white-1 p-1 px-3">Ward 02</p>
              <p className="bg-gray-300 p-1 px-3">Ward 02</p>
            </div>
          </div>
          <div className="flex items-center justify-between gap-2 md:gap-4 h-14">
            <p className="bg-gray-300 p-4 flex-1 h-[inherit]">
              D.S. Senanayake
            </p>
            <div className="flex flex-col justify-center h-[inherit]">
              <p className="bg-gray-900 text-white-1 p-1 px-3">Ward 02</p>
              <p className="bg-gray-300 p-1 px-3">Ward 02</p>
            </div>
          </div>
          <div className="flex items-center justify-between gap-2 md:gap-4 h-14">
            <p className="bg-gray-300 p-4 flex-1 h-[inherit]">
              D.S. Senanayake
            </p>
            <div className="flex flex-col justify-center h-[inherit]">
              <p className="bg-gray-900 text-white-1 p-1 px-3">Ward 02</p>
              <p className="bg-gray-300 p-1 px-3">Ward 02</p>
            </div>
          </div>
          <div className="flex items-center justify-between gap-2 md:gap-4 h-14">
            <p className="bg-gray-300 p-4 flex-1 h-[inherit]">
              D.S. Senanayake
            </p>
            <div className="flex flex-col justify-center h-[inherit]">
              <p className="bg-gray-900 text-white-1 p-1 px-3">Ward 02</p>
              <p className="bg-gray-300 p-1 px-3">Ward 02</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;
