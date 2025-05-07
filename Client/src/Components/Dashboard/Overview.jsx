import React from "react";

const Overview = () => {
  return (
    <div className="p-2 md:p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="p-10 bg-red-900"></div>
        <div className="p-10 bg-blue-900"></div>
        <div className="p-10 bg-gray-900"></div>
        <div className="p-10 bg-yellow-900"></div>
      </div>
    </div>
  );
};

export default Overview;
