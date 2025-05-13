import React from "react";

const PatientForm = () => {
  return (
    <div className="min-h-screen bg-teal-400 flex items-center justify-center p-6">
      <div className="bg-white rounded-2xl shadow-md p-8 w-full max-w-4xl">
        {/* Header */}
        <div className="bg-teal-200 border border-gray-300 p-4 rounded-lg mb-6">
          <div className="flex justify-between">
            <div>
              <p className="font-bold">Patient Name : Thilak Rathnayake</p>
              <p className="text-sm">Time : 4.08 PM</p>
            </div>
            <div className="text-right">
              <p className="font-bold">Admission Date : 12/03/2025</p>
              <p className="text-sm">Date : 29/03/2025</p>
            </div>
          </div>
        </div>

        {/* Form */}
        <form className="space-y-6">
          {/* Temperature Section */}
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="text-sm">Body Temperature</label>
              <input className="input-field" type="text" />
              <p className="text-xs text-red-400">*should measure 4 hourly</p>
            </div>
            <div>
              <label className="text-sm">HCT/PVC</label>
              <input className="input-field" type="text" />
              <p className="text-xs text-red-400">*should measure 6 hourly</p>
            </div>
            <div>
              <label className="text-sm">Pulse Rate</label>
              <input className="input-field" type="text" />
              <p className="text-xs text-red-400">*should measure 3 hourly</p>
            </div>
          </div>

          {/* FBC Section */}
          <div>
            <p className="font-bold text-sm">FBC</p>
            <p className="text-xs text-red-400 mb-1">*Measure on admission & daily</p>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm">WBC</label>
                <input className="input-field" type="text" placeholder="/mm3" />
              </div>
              <div>
                <label className="text-sm">PLT</label>
                <input className="input-field" type="text" placeholder="/mm3" />
              </div>
            </div>
          </div>

          {/* Blood Pressure (Supine) */}
          <div>
            <p className="font-bold text-sm">Blood Pressure (Supine)</p>
            <p className="text-xs text-red-400 mb-1">*should measure 3 hourly</p>

            {/* Row 1: Systolic & Diastolic */}
            <div className="grid grid-cols-2 gap-4 mb-2">
              <div>
                <label className="text-sm">Systolic</label>
                <input className="input-field" type="text" placeholder="/mmHg" />
              </div>
              <div>
                <label className="text-sm">Diastolic</label>
                <input className="input-field" type="text" placeholder="/mmHg" />
              </div>
            </div>

            {/* Row 2: PP & MAP */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm">Pulse Pressure (PP)</label>
                <input className="input-field" type="text" value="20" placeholder="/mmHg" />
              </div>
              <div>
                <label className="text-sm">Mean Arterial Pressure (MAP)</label>
                <input className="input-field" type="text" value="60" placeholder="/mmHg" />
              </div>
            </div>
          </div>

          {/* Blood Pressure (Sitting) */}
          <div>
            <p className="font-bold text-sm">Blood Pressure (Sitting)</p>
            <p className="text-xs text-red-400 mb-1">*should measure 3 hourly</p>

            {/* Row 1: Systolic & Diastolic */}
            <div className="grid grid-cols-2 gap-4 mb-2">
              <div>
                <label className="text-sm">Systolic</label>
                <input className="input-field" type="text" placeholder="/mmHg" />
              </div>
              <div>
                <label className="text-sm">Diastolic</label>
                <input className="input-field" type="text" placeholder="/mmHg" />
              </div>
            </div>

            {/* Row 2: Respiratory & CRT */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm">Respiratory Rate</label>
                <input className="input-field" type="text" placeholder="/min" />
              </div>
              <div>
                <label className="text-sm">Capillary Refill Time (CRFT)</label>
                <input className="input-field" type="text" placeholder="s" />
              </div>
            </div>
          </div>

          {/* Observation */}
          <div>
            <label className="text-sm font-bold">Observation / Action</label>
            <textarea className="w-full border border-gray-300 rounded-md p-2 min-h-[100px]"></textarea>
          </div>

          {/* Buttons */}
          <div className="flex justify-between mt-6">
            <button
              type="button"
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-2 rounded-full"
            >
              Back
            </button>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-2 rounded-full"
            >
              Submit
            </button>
          </div>
        </form>
      </div>

      {/* Custom styles for input fields */}
      <style>{`
        .input-field {
          width: 100%;
          padding: 0.5rem;
          border: 1px solid #d1d5db;
          border-radius: 0.375rem;
          outline: none;
        }
        .input-field:focus {
          border-color: #3b82f6;
        }
      `}</style>
    </div>
  );
};

export default PatientForm;





