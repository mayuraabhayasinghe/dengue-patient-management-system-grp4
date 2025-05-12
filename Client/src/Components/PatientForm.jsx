import React from "react";

const PatientForm = () => {
  return (
    <div className="bg-white shadow-md rounded-xl p-6 max-w-6xl mx-auto mt-10">
      <div className="flex justify-between mb-6 border border-gray-300 rounded-md p-4" style={{ backgroundColor: "#91F2EB" }}>
        <div>
          <p className="font-semibold text-lg">
            Patient Name : <span className="text-gray-800">Thilak Rathnayake</span>
          </p>
          <p className="text-sm text-gray-600">Time : 4.08 PM</p>
        </div>
        <div className="text-right">
          <p className="font-semibold text-lg">
            Admission Date : <span className="text-gray-800">12/03/2025</span>
          </p>
          <p className="text-sm text-gray-600">Date : 29/03/2025</p>
        </div>
      </div>

      <form className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
        {/* Row 1 */}
        <div>
          <label className="font-medium">Body Temperature</label>
          <input type="text" className="border border-gray-300 rounded-md px-3 py-2 w-full" />
          <p className="text-xs text-red-500 mt-1">*should measure 4 hourly</p>
        </div>
        <div>
          <label className="font-medium">HCT/PVC</label>
          <input type="text" className="border border-gray-300 rounded-md px-3 py-2 w-full" />
          <p className="text-xs text-red-500 mt-1">*should measure 6 hourly</p>
        </div>
        <div>
          <label className="font-medium">Pulse Rate</label>
          <input type="text" className="border border-gray-300 rounded-md px-3 py-2 w-full" />
          <p className="text-xs text-red-500 mt-1">*should measure 3 hourly</p>
        </div>

        {/* FBC */}
        <div>
          <label className="font-medium">WBC</label>
          <input type="text" className="border border-gray-300 rounded-md px-3 py-2 w-full" />
          <p className="text-xs text-red-500 mt-1">*Measure on admission & daily</p>
        </div>
        <div>
          <label className="font-medium">PLT</label>
          <input type="text" className="border border-gray-300 rounded-md px-3 py-2 w-full" />
        </div>

        {/* Blood Pressure Supine */}
        <div className="md:col-span-3">
          <h2 className="font-semibold mb-2">
            Blood Pressure (Supine) <span className="text-red-500 text-xs">*should measure 3 hourly</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="relative">
              <input className="border border-gray-300 rounded-md pr-16 pl-3 py-2 w-full" placeholder="Systolic" />
              <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm">/mmHg</span>
            </div>
            <div className="relative">
              <input className="border border-gray-300 rounded-md pr-16 pl-3 py-2 w-full" placeholder="Diastolic" />
              <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm">/mmHg</span>
            </div>
            <div className="relative">
              <input className="border border-gray-300 rounded-md pr-16 pl-3 py-2 w-full" defaultValue="20" placeholder="PP" />
              <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm">/mmHg</span>
            </div>
            <div className="relative">
              <input className="border border-gray-300 rounded-md pr-16 pl-3 py-2 w-full" defaultValue="60" placeholder="MAP" />
              <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm">/mmHg</span>
            </div>
          </div>
        </div>

        {/* Blood Pressure Sitting */}
        <div className="md:col-span-3">
          <h2 className="font-semibold mb-2">
            Blood Pressure (Sitting) <span className="text-red-500 text-xs">*should measure 3 hourly</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input placeholder="Systolic /mmHg" className="border border-gray-300 rounded-md px-3 py-2 w-full" />
            <input placeholder="Diastolic /mmHg" className="border border-gray-300 rounded-md px-3 py-2 w-full" />
          </div>
        </div>

        {/* Respiratory Rate & CRFT */}
        <div>
          <label className="font-medium">Respiratory Rate</label>
          <input
            type="text"
            placeholder="/min"
            className="border border-gray-300 rounded-md px-3 py-2 w-full"
          />
        </div>
        <div>
          <label className="font-medium">Capillary Refill Time (CRFT)</label>
          <input
            type="text"
            placeholder="s"
            className="border border-gray-300 rounded-md px-3 py-2 w-full"
          />
        </div>

        {/* Observation */}
        <div className="md:col-span-3">
          <label className="font-medium">Observation / Action</label>
          <textarea className="border border-gray-300 rounded-md px-3 py-2 w-full h-24 resize-none" />
        </div>

        {/* Buttons */}
        <div className="md:col-span-3 flex justify-between mt-6">
          <button
            type="button"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full shadow-md transition"
          >
            Back
          </button>
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full shadow-md transition"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default PatientForm;