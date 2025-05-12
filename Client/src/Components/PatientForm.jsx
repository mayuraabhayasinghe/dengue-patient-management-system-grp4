import React from 'react';

const PatientForm = () => {
  return (
    <div className="min-h-screen bg-teal-200 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-md p-6 w-full max-w-4xl">
        {/* Header Box */}
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

        <form className="grid grid-cols-3 gap-4 text-sm">
          {/* Row 1 */}
          <div className="flex flex-col relative">
            <input type="text" placeholder="Body Temperature" className="border p-2 rounded pr-12" />
            <span className="text-xs text-pink-500">*should measure 4 hourly</span>
          </div>
          <div className="flex flex-col relative">
            <input type="text" placeholder="HCT/PVC" className="border p-2 rounded pr-12" />
            <span className="text-xs text-pink-500">*should measure 6 hourly</span>
          </div>
          <div className="flex flex-col relative">
            <input type="text" placeholder="Pulse Rate" className="border p-2 rounded pr-12" />
            <span className="text-xs text-pink-500">*should measure 3 hourly</span>
          </div>

          {/* FBC Section */}
          <p className="col-span-3 font-bold mt-2">FBC</p>
          <div className="flex flex-col relative">
            <input type="text" placeholder="WBC" className="border p-2 rounded pr-12" />
            <span className="absolute right-2 top-2 text-gray-500 text-sm">/mm3</span>
            <span className="text-xs text-pink-500">*measure on admission & daily</span>
          </div>
          <div className="flex flex-col relative">
            <input type="text" placeholder="PLT" className="border p-2 rounded pr-12" />
            <span className="absolute right-2 top-2 text-gray-500 text-sm">/mm3</span>
          </div>
          <div></div>

          {/* Blood Pressure Supine */}
          <p className="col-span-3 font-bold mt-2">Blood Pressure(Supine) <span className="text-xs text-pink-500">*should measure 3 hourly</span></p>
          <div className="relative">
            <input type="text" placeholder="Systolic" className="border p-2 rounded pr-12 w-full" />
            <span className="absolute right-2 top-2 text-gray-500 text-sm">/mmHg</span>
          </div>
          <div className="relative">
            <input type="text" placeholder="Diastolic" className="border p-2 rounded pr-12 w-full" />
            <span className="absolute right-2 top-2 text-gray-500 text-sm">/mmHg</span>
          </div>
          <div></div>

          <div className="relative">
            <input type="text" defaultValue="20" placeholder="Pulse Pressure(PP)" className="border p-2 rounded pr-12 w-full" />
            <span className="absolute right-2 top-2 text-gray-500 text-sm">/mmHg</span>
          </div>
          <div className="relative">
            <input type="text" defaultValue="60" placeholder="Mean Arterial Pressure(MAP)" className="border p-2 rounded pr-12 w-full" />
            <span className="absolute right-2 top-2 text-gray-500 text-sm">/mmHg</span>
          </div>
          <div></div>

          {/* Blood Pressure Sitting */}
          <p className="col-span-3 font-bold mt-2">Blood Pressure(Sitting) <span className="text-xs text-pink-500">*should measure 3 hourly</span></p>
          <div className="relative">
            <input type="text" placeholder="Systolic" className="border p-2 rounded pr-12 w-full" />
            <span className="absolute right-2 top-2 text-gray-500 text-sm">/mmHg</span>
          </div>
          <div className="relative">
            <input type="text" placeholder="Diastolic" className="border p-2 rounded pr-12 w-full" />
            <span className="absolute right-2 top-2 text-gray-500 text-sm">/mmHg</span>
          </div>
          <div></div>

          {/* Respiratory and CRFT */}
          <div className="relative">
            <input type="text" placeholder="Respiratory Rate" className="border p-2 rounded pr-12 w-full" />
            <span className="absolute right-2 top-2 text-gray-500 text-sm">/min</span>
          </div>
          <div className="relative">
            <input type="text" placeholder="Capillary Refill Time (CRFT)" className="border p-2 rounded pr-12 w-full" />
            <span className="absolute right-2 top-2 text-gray-500 text-sm">s</span>
          </div>
          <div></div>

          {/* Observation */}
          <div className="col-span-3">
            <label className="block font-bold mb-1">Observation / Action</label>
            <textarea className="w-full border p-2 rounded h-24"></textarea>
          </div>

          {/* Buttons */}
          <div className="col-span-3 flex justify-between mt-4">
            <button type="button" className="bg-blue-600 text-white px-6 py-2 rounded">Back</button>
            <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PatientForm;



