import { useState } from "react";

function App() {
  const [form, setForm] = useState({
    fluidKind: "",
    intakeType: "",
    intakeVolume: "",
    urineOutput: "",
    outputType: "",
  });

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    const val = type === "radio" ? e.target.id : value;
    setForm({ ...form, [name]: val });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Basic validation
    if (!form.fluidKind || !form.intakeType || !form.intakeVolume || !form.urineOutput) {
      alert("Please fill in all required fields.");
      return;
    }
    if (isNaN(form.intakeVolume) || isNaN(form.urineOutput)) {
      alert("Volume fields must be numbers.");
      return;
    }

    console.log("Submitted data:", form);
  };

  return (
    <div className="min-h-screen bg-teal-400 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-xl">
        <div className="bg-teal-100 p-4 rounded-lg flex justify-between text-sm mb-6">
          <div>
            <strong>Patient Name:</strong> <strong>Thilak Rathnayake</strong><br />
            Time: 4:08 PM
          </div>
          <div>
            <strong>Admission Date:</strong> <strong>12/03/2025</strong><br />
            Date: 29/03/2025
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <h3 className="text-lg font-semibold">Fluid Input</h3>

          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-1">
              <label className="block mb-1 font-medium">Kind of Fluid</label>
              <input
                type="text"
                name="fluidKind"
                className="w-full border border-gray-300 rounded-md p-2"
                value={form.fluidKind}
                onChange={handleChange}
                required
              />
            </div>

            <div className="flex-1">
              <label className="block mb-1 font-medium">Intake Type</label>
              <select
                name="intakeType"
                className="w-full border border-gray-300 rounded-md p-2"
                value={form.intakeType}
                onChange={handleChange}
                required
              >
                <option value="">Select</option>
                <option value="IV">IV</option>
                <option value="Oral">Oral</option>
                <option value="NG">NG</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block mb-1 font-medium">Intake Volume (ml)</label>
            <input
              type="text"
              name="intakeVolume"
              placeholder="ml"
              className="w-full border border-gray-300 rounded-md p-2"
              value={form.intakeVolume}
              onChange={handleChange}
              required
            />
            <p className="text-xs text-red-600 mt-1">*Maximum 1.5ml should be 100ml per hour</p>
          </div>

          <h3 className="text-lg font-semibold">Fluid Output</h3>

          <div>
            <label className="block mb-1 font-medium">Urine Output (ml)</label>
            <input
              type="text"
              name="urineOutput"
              placeholder="ml"
              className="w-full border border-gray-300 rounded-md p-2"
              value={form.urineOutput}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">Vital Signs of Fluid Output (Optional)</label>
            <div className="flex gap-8">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="Vomitus"
                  name="outputType1"
                  onChange={handleChange}
                />
                Vomitus
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="Diarrhoea"
                  name="outputType2"
                  onChange={handleChange}
                />
                Diarrhoea
              </label>
            </div>
          </div>

          <div className="flex justify-between mt-6">
            <button
              type="button"
              className="bg-blue-500 text-white py-2 px-7 rounded-2xl hover:bg-blue-600"
              onClick={() => alert("Going back...")}
            >
              Back
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded-2xl hover:bg-green-700"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default App;
