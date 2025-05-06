import React from "react";

const PatientForm = () => {
  return (
    <div className="bg-white shadow-md rounded-xl p-6 max-w-4xl mx-auto mt-6">
      <div className="flex justify-between mb-4">
        <div>
          <p className="font-semibold">Patient Name : <span className="text-gray-700">Thilak Rathnayake</span></p>
          <p className="text-sm text-gray-600">Time : 4.08 PM</p>
        </div>
        <div>
          <p className="font-semibold">Admission Date : <span className="text-gray-700">12/03/2025</span></p>
          <p className="text-sm text-gray-600">Date : 29/03/2025</p>
        </div>
      </div>

      <form className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
        <div>
          <label>Body Temperature</label>
          <input type="text" className="input" />
          <p className="text-xs text-red-400">*should measure 4 hourly</p>
        </div>
        <div>
          <label>HCT/PVC</label>
          <input type="text" className="input" />
          <p className="text-xs text-red-400">*should measure 6 hourly</p>
        </div>
        <div>
          <label>Pulse Rate</label>
          <input type="text" className="input" />
          <p className="text-xs text-red-400">*should measure 3 hourly</p>
        </div>

        <div>
          <label>WBC</label>
          <input type="text" className="input" />
          <p className="text-xs text-red-400">*Measure on admission & daily</p>
        </div>
        <div>
          <label>PLT</label>
          <input type="text" className="input" />
        </div>

        <div className="md:col-span-3 mt-4">
          <h2 className="font-semibold mb-2">Blood Pressure (Supine) <span className="text-red-400 text-xs">*should measure 3 hourly</span></h2>
          <div className="grid grid-cols-3 gap-4">
            <input placeholder="Systolic /mmHg" className="input" />
            <input placeholder="Diastolic /mmHg" className="input" />
            <input placeholder="Pulse Pressure (PP) /mmHg" defaultValue="20" className="input" />
            <input placeholder="MAP /mmHg" defaultValue="60" className="input" />
          </div>
        </div>

        <div className="md:col-span-3 mt-4">
          <h2 className="font-semibold mb-2">Blood Pressure (Sitting) <span className="text-red-400 text-xs">*should measure 3 hourly</span></h2>
          <div className="grid grid-cols-2 gap-4">
            <input placeholder="Systolic /mmHg" className="input" />
            <input placeholder="Diastolic /mmHg" className="input" />
          </div>
        </div>

        <div>
          <label>Respiratory Rate</label>
          <input type="text" className="input" placeholder="/min" />
        </div>
        <div>
          <label>Capillary Refill Time (CRFT)</label>
          <input type="text" className="input" placeholder="s" />
        </div>

        <div className="md:col-span-3">
          <label>Observation / Action</label>
          <textarea className="input h-24 resize-none" />
        </div>

        <div className="md:col-span-3 flex justify-between mt-6">
          <button type="button" className="btn bg-blue-500 text-white px-6 py-2 rounded-full">Back</button>
          <button type="submit" className="btn bg-blue-500 text-white px-6 py-2 rounded-full">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default PatientForm;
