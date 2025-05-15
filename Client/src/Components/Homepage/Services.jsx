import React from "react";
import Title from "../Title";
import service_img from "../../assets/images/Service_img.png";
import patient_management_img from "../../assets/images/patient_management.png";
import patient_monitoring_img from "../../assets/images/patient_monitoring.png";
import ward_management_img from "../../assets/images/ward_management.png";
import medical_report_img from "../../assets/images/medical_report.png";
import ai_chatbot_img from "../../assets/images/ai_chatbot.png";
import dashboard_img from "../../assets/images/dashboard.png";
import { Link } from "react-router-dom";

const Services = () => {
  return (
    <div>
      <div id="service" name="services" className="bg-white-2">
        <Title title={"Services"} />
        <div className="flex items-center justify-center">
          <div className="w-full md:w-[90%] lg:w-4/5">
            <div className="flex flex-col py-3">
              {/* top part */}
              <div className="flex items-center gap-5">
                <div className="flex flex-col items-center md:items-start md:justify-center gap-4 p-5">
                  <h1 className="text-text-2 text-xl md:text-2xl lg:text-4xl font-bold">
                    Comprehensive Dengue Care at Your Fingertips
                  </h1>
                  <p className="text-text-1 text-center md:text-start">
                    Empowering Healthcare with Smart Dengue Management –
                    Real-time Monitoring, Automated Alerts, and AI-Powered
                    Insights for Better Patient Care.
                  </p>
                  <button className="btn">Explore Now</button>
                </div>
                <img
                  src={service_img}
                  alt=""
                  className="hidden md:block w-[40%]"
                />
              </div>

              {/* Services section */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 mt-[5%] gap-5 p-4">
                {/* 1st item */}
                <div className="bg-white-1 shadow-xl p-4 flex gap-3 flex-col justify-center items-start rounded-2xl">
                  <img
                    src={patient_management_img}
                    className="w-[60%] block mx-auto"
                    alt=""
                  />
                  <h2 className="text-xl text-text-2 font-semibold">
                    Patient Management
                  </h2>
                  <p className="text-text-1">
                    Handles patient registration, secure login, and profile
                    management.
                  </p>
                  <button className="btn w-full">Manage Patients</button>
                </div>

                {/* 2nd item */}
                <div className="bg-white-1 shadow-xl p-4 flex gap-3 flex-col justify-center items-start rounded-2xl">
                  <img
                    src={patient_monitoring_img}
                    className="w-[60%] block mx-auto"
                    alt=""
                  />
                  <h2 className="text-xl text-text-2 font-semibold">
                    Real-Time Patient Monitoring
                  </h2>
                  <p className="text-text-1">
                    Logs patient vitals, fluid intake/output, and timestamps
                    data for accuracy.
                  </p>
                  <button className="btn w-full">Monitor Patients</button>
                </div>

                {/* 3rd item */}
                <div className="bg-white-1 shadow-xl p-4 flex gap-3 flex-col justify-center items-start rounded-2xl">
                  <img
                    src={ward_management_img}
                    className="w-[60%] block mx-auto"
                    alt=""
                  />
                  <h2 className="text-xl text-text-2 font-semibold">
                    Hospital Resource and Ward Management
                  </h2>
                  <p className="text-text-1">
                    Manages bed allocation, medical equipment, and pharmacy
                    inventory.
                  </p>
                  <button className="btn w-full">Manage Wards</button>
                </div>

                {/* 4th item */}
                <div className="bg-white-1 shadow-xl p-4 flex gap-3 flex-col justify-center items-start rounded-2xl">
                  <img
                    src={medical_report_img}
                    className="w-[60%] block mx-auto"
                    alt=""
                  />
                  <h2 className="text-xl text-text-2 font-semibold">
                    Medical Reporting and Analytics
                  </h2>
                  <p className="text-text-1">
                    Generates reports on patient conditions, treatment progress,
                    and recovery.
                  </p>
                  <button className="btn w-full">Generate Report</button>
                </div>

                {/* 5th item */}
                <div className="bg-white-1 shadow-xl p-4 flex gap-3 flex-col justify-center items-start rounded-2xl">
                  <img
                    src={ai_chatbot_img}
                    className="w-[60%] block mx-auto"
                    alt=""
                  />
                  <h2 className="text-xl text-text-2 font-semibold">
                    AI-Powered Chatbot
                  </h2>
                  <p className="text-text-1">
                    Provides medical information and treatment guidance through
                    an interactive chatbot.
                  </p>
                  <button className="btn w-full">
                    <Link to={"/chatbot"}>Ask the Chatbot</Link>
                  </button>
                </div>

                {/* 6th item */}
                <div className="bg-white-1 shadow-xl p-4 flex gap-3 flex-col justify-center items-start rounded-2xl">
                  <img
                    src={dashboard_img}
                    className="w-[60%] block mx-auto"
                    alt=""
                  />
                  <h2 className="text-xl text-text-2 font-semibold">
                    Dashboard
                  </h2>
                  <p className="text-text-1">
                    Get a comprehensive overview of patient count, bed
                    availability, critical cases to healthcare management.
                  </p>
                  <button className="btn w-full">Dashboard</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;
