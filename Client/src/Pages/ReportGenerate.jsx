import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import { Chart, registerables } from "chart.js";
import logo from "../assets/images/logo.png";
import dayjs from "dayjs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTemperatureHigh,
  faHeartPulse,
  faTachometerAlt,
  faWaveSquare,
  faChartLine,
  faDroplet,
  faTint,
  faLungs,
  faClock,
  faNotesMedical,
} from "@fortawesome/free-solid-svg-icons";

Chart.register(...registerables);

const ReportGenerate = () => {
  const [patientData, setPatientData] = useState({});
  const [vitalsData, setVitalsData] = useState([]);
  const [inputData, setInputData] = useState([]);
  const [outputData, setOutputData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [vitalsLoading, setVitalsLoading] = useState(true);
  const [fluidLoading, setFluidLoading] = useState(true);
  const { patientId } = useParams();
  const navigate = useNavigate();
  const reportRef = useRef();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const patientRes = await axios.get(
          `http://localhost:5000/api/patients/${patientId}`
        );
        const patient = patientRes.data.data;
        setPatientData(patient);

        const vitalsRes = await axios.get(
          `http://localhost:5000/api/vitals/patient/${patient.userId}`
        );
        setVitalsData(vitalsRes.data.data);
        setVitalsLoading(false);

        const fluidsRes = await axios.get(
          `http://localhost:5000/api/fluid/patient/${patientId}`
        );
        const fluids = fluidsRes.data.data;
        setInputData(fluids.filter((f) => f.intakeType));
        setOutputData(fluids.filter((f) => f.urineOutput || f.outputTypes));
        setFluidLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (patientId) {
      fetchData();
    }
  }, [patientId]);

  const formatDate = (dateString) => {
    return dayjs(dateString).format("MMM D, YYYY");
  };

  const prepareChartData = () => {
    const labels = vitalsData
      .map((vital) => dayjs(vital.timestamp).format("MMM D, h:mm A"))
      .reverse();

    const temperatureData = vitalsData
      .map((vital) => vital.vitals?.bodyTemperature)
      .reverse();

    const plateletData = vitalsData.map((vital) => vital.vitals?.plt).reverse();

    return {
      temperatureChart: {
        labels,
        datasets: [
          {
            label: "Temperature (°C)",
            data: temperatureData,
            borderColor: "#ef4444",
            backgroundColor: "rgba(239, 68, 68, 0.1)",
            tension: 0.3,
            fill: true,
          },
        ],
      },
      plateletChart: {
        labels,
        datasets: [
          {
            label: "Platelets (mm3)",
            data: plateletData,
            borderColor: "#3b82f6",
            backgroundColor: "rgba(59, 130, 246, 0.1)",
            tension: 0.3,
            fill: true,
          },
        ],
      },
    };
  };

  const generatePDF = async () => {
    if (!reportRef.current) return;

    try {
      const buttons = document.querySelectorAll(".print-hide");
      buttons.forEach((btn) => (btn.style.visibility = "hidden"));

      const fallbackStyle = document.createElement("style");
      fallbackStyle.innerHTML = `
  :root {
    --color-red-50: #ffe5e5;
    --color-red-100: #ffcccc;
    --color-red-200: #ff9999;
    --color-red-400: #e06666;
    --color-red-500: #cc3333;
    --color-red-600: #b30000;
    --color-red-800: #800000;
    --color-red-900: #660000;

    --color-amber-50: #fff8e1;

    --color-yellow-50: #fffce0;
    --color-yellow-100: #fff8b3;
    --color-yellow-300: #fff066;
    --color-yellow-400: #ffe033;
    --color-yellow-600: #e6b800;
    --color-yellow-800: #b38f00;

    --color-green-50: #e6f9e6;
    --color-green-100: #ccf2cc;
    --color-green-200: #99e699;
    --color-green-500: #33cc33;
    --color-green-600: #2eb82e;
    --color-green-700: #248f24;
    --color-green-800: #1a661a;

    --color-teal-100: #ccf5f5;
    --color-teal-400: #66cccc;
    --color-teal-800: #1a6666;

    --color-cyan-400: #66d9e8;

    --color-blue-50: #e6f0ff;
    --color-blue-100: #cce0ff;
    --color-blue-400: #6699ff;
    --color-blue-500: #3366ff;
    --color-blue-600: #0040ff;
    --color-blue-700: #0033cc;
    --color-blue-800: #002699;
    --color-blue-900: #001a66;

    --color-purple-50: #f0e6ff;
    --color-purple-100: #e0ccff;
    --color-purple-500: #9966cc;
    --color-purple-600: #7f4cb3;
    --color-purple-800: #5e3399;

    --color-gray-50: #f9f9f9;
    --color-gray-100: #f0f0f0;
    --color-gray-200: #e0e0e0;
    --color-gray-300: #cccccc;
    --color-gray-400: #aaaaaa;
    --color-gray-500: #888888;
    --color-gray-600: #666666;
    --color-gray-700: #444444;
    --color-gray-800: #2a2a2a;
    --color-gray-900: #1a1a1a;
  }
`;
      document.head.appendChild(fallbackStyle);
      const canvas = await html2canvas(reportRef.current, {
        scale: 2,
        useCORS: true,
        scrollY: -window.scrollY,
        windowWidth: reportRef.current.scrollWidth,
        windowHeight: reportRef.current.scrollHeight,
      });

      fallbackStyle.remove();
      buttons.forEach((btn) => (btn.style.visibility = "visible"));

      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");

      const imgWidth = 190;
      const pageHeight = 277;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      let heightLeft = imgHeight;
      let position = 10;

      pdf.addImage(imgData, "PNG", 10, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft > 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, "PNG", 10, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save(
        `Patient_Report_${patientData.name || patientId}_${dayjs().format(
          "YYYYMMDD"
        )}.pdf`
      );
    } catch (err) {
      console.error("PDF generation failed:", err);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="container px-4 py-8 bg-background-1/5">
      <div className="flex justify-between items-center mb-6 print-hide">
        <button
          onClick={() => navigate(-1)}
          className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded transition-colors">
          ← Back to Patient
        </button>
        <button
          onClick={generatePDF}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg transition-colors flex items-center">
          <svg
            className="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
            />
          </svg>
          Download Report
        </button>
      </div>

      {/* Report Preview - This will be captured for PDF */}
      <div
        ref={reportRef}
        className="bg-white shadow-2xl rounded-xl mx-auto overflow-hidden border border-gray-200"
        style={{
          width: "210mm",
          minHeight: "297mm",
          boxSizing: "border-box",
          margin: "0 auto",
        }}>
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-50 to-gray-50 p-6 border-b border-gray-200">
          <div className="flex justify-between items-start">
            <img src={logo} alt="Logo" className="h-16" />
            <div className="text-center">
              <h1 className="text-3xl font-bold text-gray-800">
                PATIENT MEDICAL REPORT
              </h1>
              <p className="text-sm text-gray-500 mt-2">
                Report Generated:{" "}
                {new Date().toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>
            <div className="w-16"></div>
          </div>
        </div>

        {/* Patient Information */}
        <div className="p-6">
          <div className="bg-gray-50 p-4 rounded-lg mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <svg
                className="w-5 h-5 mr-2 text-blue-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
              Patient Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <div className="flex">
                  <span className="font-medium text-gray-700 w-32">Name:</span>
                  <span className="text-gray-900">
                    {patientData.name || "N/A"}
                  </span>
                </div>
                <div className="flex">
                  <span className="font-medium text-gray-700 w-32">Age:</span>
                  <span className="text-gray-900">
                    {patientData.age || "N/A"}
                  </span>
                </div>
                <div className="flex">
                  <span className="font-medium text-gray-700 w-32">
                    Gender:
                  </span>
                  <span className="text-gray-900">
                    {patientData.gender || "N/A"}
                  </span>
                </div>
                <div className="flex">
                  <span className="font-medium text-gray-700 w-32">
                    Weight:
                  </span>
                  <span className="text-gray-900">
                    {patientData.weight || "N/A"} kg
                  </span>
                </div>
                <div className="flex">
                  <span className="font-medium text-gray-700 w-32">Email:</span>
                  <span className="text-gray-900">
                    {patientData.email || "N/A"}
                  </span>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex">
                  <span className="font-medium text-gray-700 w-32">
                    Bed Number:
                  </span>
                  <span className="text-gray-900">
                    {patientData.bedNumber || "N/A"}
                  </span>
                </div>
                <div className="flex">
                  <span className="font-medium text-gray-700 w-32">
                    Admission Date:
                  </span>
                  <span className="text-gray-900">
                    {patientData.admissionDate
                      ? `${dayjs(patientData.admissionDate).format(
                          "MMMM D, YYYY"
                        )} at ${patientData.admissionTime || ""}`
                      : "N/A"}
                  </span>
                </div>
                <div className="flex">
                  <span className="font-medium text-gray-700 w-32">
                    Bystander:
                  </span>
                  <span className="text-gray-900">
                    {patientData.bystanderName
                      ? `${patientData.bystanderName} (${
                          patientData.bystanderAddress || ""
                        })`
                      : "N/A"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Vitals Information */}
          <div className="bg-white shadow-lg rounded-lg overflow-hidden mb-6">
            <div className="bg-blue-100 text-black p-4 flex justify-between items-center">
              <h2 className="text-lg font-bold">Recent Vitals Records</h2>
            </div>

            <div className="p-4">
              {vitalsLoading ? (
                <div className="text-center py-10">
                  <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
                  <p className="mt-3 text-gray-600">Loading vitals...</p>
                </div>
              ) : vitalsData.length === 0 ? (
                <div className="text-center py-10">
                  <p className="text-gray-500">
                    No vitals records found for this patient.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {vitalsData.map((vital) => (
                    <div
                      key={vital._id}
                      className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                      <div className="text-sm font-semibold text-gray-700 mb-2">
                        {dayjs(vital.timestamp).format("MMM D, h:mm A")}
                      </div>
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-x-4 gap-y-2 text-xs">
                        <div>
                          <strong>Temp:</strong>{" "}
                          <span
                            className={
                              parseFloat(vital.vitals.bodyTemperature) > 37.5
                                ? "text-red-600 font-bold"
                                : ""
                            }>
                            {vital.vitals.bodyTemperature || "-"} °C
                          </span>
                        </div>
                        <div>
                          <strong>Pulse:</strong>{" "}
                          <span
                            className={
                              parseFloat(vital.vitals.pulseRate) > 100
                                ? "text-red-600 font-bold"
                                : ""
                            }>
                            {vital.vitals.pulseRate || "-"} /min
                          </span>
                        </div>
                        <div>
                          <strong>BP (Supine):</strong>{" "}
                          {vital.vitals.bloodPressureSupine?.systolic || "-"}/
                          {vital.vitals.bloodPressureSupine?.diastolic || "-"}
                        </div>
                        <div>
                          <strong>BP (Sitting):</strong>{" "}
                          {vital.vitals.bloodPressureSitting?.systolic || "-"}/
                          {vital.vitals.bloodPressureSitting?.diastolic || "-"}
                        </div>
                        <div>
                          <strong>PP:</strong>{" "}
                          <span
                            className={
                              parseFloat(
                                vital.vitals.bloodPressureSupine?.pulsePressure
                              ) <= 20
                                ? "text-red-600 font-bold"
                                : ""
                            }>
                            {vital.vitals.bloodPressureSupine?.pulsePressure ||
                              "-"}
                          </span>
                        </div>
                        <div>
                          <strong>MAP:</strong>{" "}
                          <span
                            className={
                              parseFloat(
                                vital.vitals.bloodPressureSupine
                                  ?.meanArterialPressure
                              ) < 60
                                ? "text-red-600 font-bold"
                                : ""
                            }>
                            {vital.vitals.bloodPressureSupine
                              ?.meanArterialPressure || "-"}
                          </span>
                        </div>
                        <div>
                          <strong>PLT:</strong>{" "}
                          <span
                            className={
                              parseFloat(vital.vitals.plt) < 130000
                                ? "text-red-600 font-bold"
                                : ""
                            }>
                            {vital.vitals.plt || "-"} /mm³
                          </span>
                        </div>
                        <div>
                          <strong>WBC:</strong>{" "}
                          <span
                            className={
                              parseFloat(vital.vitals.wbc) < 5000
                                ? "text-red-600 font-bold"
                                : ""
                            }>
                            {vital.vitals.wbc || "-"} /mm³
                          </span>
                        </div>
                        <div>
                          <strong>HCT/PVC:</strong>{" "}
                          <span
                            className={
                              parseFloat(vital.vitals.hctPvc) > 20
                                ? "text-red-600 font-bold"
                                : ""
                            }>
                            {vital.vitals.hctPvc || "-"}%
                          </span>
                        </div>
                        <div>
                          <strong>Resp:</strong>{" "}
                          <span
                            className={
                              parseFloat(vital.vitals.respiratoryRate) > 15
                                ? "text-red-600 font-bold"
                                : ""
                            }>
                            {vital.vitals.respiratoryRate || "-"} /min
                          </span>
                        </div>
                        <div>
                          <strong>CRFT:</strong>{" "}
                          <span
                            className={
                              parseFloat(vital.vitals.capillaryRefillTime) > 2.5
                                ? "text-red-600 font-bold"
                                : ""
                            }>
                            {vital.vitals.capillaryRefillTime || "-"}s
                          </span>
                        </div>
                        <div className="col-span-2 md:col-span-4">
                          <strong>Notes:</strong>{" "}
                          {vital.vitals.observation || "-"}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Fluid Input Table */}
          <div className="bg-white shadow-lg rounded-lg overflow-hidden mb-6">
            <div className="bg-blue-100 p-4 flex justify-between items-center">
              <h2 className="text-lg font-bold flex items-center">
                <FontAwesomeIcon
                  icon={faDroplet}
                  className="mr-2 text-blue-600"
                />
                Fluid Input Records
              </h2>
            </div>

            <div className="p-4">
              {fluidLoading ? (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
                  <p className="mt-2 text-sm text-gray-600">
                    Loading fluid data...
                  </p>
                </div>
              ) : inputData.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-500">No fluid input records found.</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Date
                        </th>
                        <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Time
                        </th>
                        <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Fluid Kind
                        </th>
                        <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Intake Type
                        </th>
                        <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Volume (ml)
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {inputData.map((item, index) => (
                        <tr
                          key={item._id}
                          className={
                            index % 2 === 0 ? "bg-gray-50" : "bg-white"
                          }>
                          <td className="px-3 py-2 whitespace-nowrap text-xs font-medium text-gray-900">
                            {formatDate(item.timestamp)}
                          </td>
                          <td className="px-3 py-2 whitespace-nowrap text-xs text-gray-900">
                            {dayjs(item.timestamp).format("h:mm A")}
                          </td>
                          <td className="px-3 py-2 whitespace-nowrap text-xs text-gray-900">
                            {item.fluidKind}
                          </td>
                          <td className="px-3 py-2 whitespace-nowrap text-xs text-gray-900">
                            {item.intakeType}
                          </td>
                          <td className="px-3 py-2 whitespace-nowrap text-xs text-gray-900">
                            {item.intakeVolume} ml
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>

          {/* Fluid Output Table */}
          <div className="bg-white shadow-lg rounded-lg overflow-hidden mb-6">
            <div className="bg-purple-100 p-4 flex justify-between items-center">
              <h2 className="text-lg font-bold flex items-center">
                <FontAwesomeIcon
                  icon={faDroplet}
                  className="mr-2 text-yellow-400"
                />
                Fluid Output Records
              </h2>
            </div>

            <div className="p-4">
              {fluidLoading ? (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-purple-500 mx-auto"></div>
                  <p className="mt-2 text-sm text-gray-600">
                    Loading fluid data...
                  </p>
                </div>
              ) : outputData.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-500">
                    No fluid output records found.
                  </p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Date
                        </th>
                        <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Time
                        </th>
                        <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Urine Output (ml)
                        </th>
                        <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Other Output Signs
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {outputData.map((item, index) => (
                        <tr
                          key={item._id}
                          className={
                            index % 2 === 0 ? "bg-gray-50" : "bg-white"
                          }>
                          <td className="px-3 py-2 whitespace-nowrap text-xs font-medium text-gray-900">
                            {formatDate(item.timestamp)}
                          </td>
                          <td className="px-3 py-2 whitespace-nowrap text-xs text-gray-900">
                            {dayjs(item.timestamp).format("h:mm A")}
                          </td>
                          <td className="px-3 py-2 whitespace-nowrap text-xs text-gray-900">
                            {item.urineOutput} ml
                          </td>
                          <td className="px-3 py-2 whitespace-nowrap text-xs text-gray-900">
                            {item.outputTypes && item.outputTypes.length > 0 ? (
                              <span className="inline-flex flex-wrap gap-1">
                                {item.outputTypes.map((type, i) => (
                                  <span
                                    key={i}
                                    className="px-1.5 py-0.5 bg-purple-100 text-purple-800 rounded-full text-xs">
                                    {type}
                                  </span>
                                ))}
                              </span>
                            ) : (
                              "None"
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-50 p-4 text-center text-sm text-gray-500 border-t border-gray-200">
          Confidential Patient Report - For Medical Use Only
        </div>
      </div>
    </div>
  );
};

export default ReportGenerate;
