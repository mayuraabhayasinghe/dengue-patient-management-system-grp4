import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Title from "../Title";
import service_img from "../../assets/images/Service_img.png";
import patient_management_img from "../../assets/images/patient_management.png";
import patient_monitoring_img from "../../assets/images/patient_monitoring.png";
import ward_management_img from "../../assets/images/ward_management.png";
import medical_report_img from "../../assets/images/medical_report.png";
import ai_chatbot_img from "../../assets/images/ai_chatbot.png";
import dashboard_img from "../../assets/images/dashboard.png";
import { getUser, isLoggedIn } from "../../../../Server/utils/auth";

const Services = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const loggedIn = isLoggedIn();

  useEffect(() => {
    const u = getUser();
    setUser(u);
  }, []);

  const handleClick = (path) => {
    if (!loggedIn) {
      alert("Please login to access this service.");
      navigate("/login");
    } else {
      navigate(path);
    }
  };

  const services = [
    {
      title: "Patient Management",
      description:
        "Handles patient registration, secure login, and profile management.",
      image: patient_management_img,
      buttonText: "Manage Patients",
      onClickPath: "/patients",
    },
    {
      title: "Real-Time Patient Monitoring",
      description:
        "Logs patient vitals, fluid intake/output, and timestamps data for accuracy.",
      image: patient_monitoring_img,
      buttonText: "Monitor Patients",
      onClickPath: "/monitoring",
    },
    {
      title: "Hospital Resource and Ward Management",
      description:
        "Manages bed allocation, medical equipment, and pharmacy inventory.",
      image: ward_management_img,
      buttonText: "Manage Wards",
      onClickPath: "/wards",
    },
    {
      title: "Medical Reporting and Analytics",
      description:
        "Generates reports on patient conditions, treatment progress, and recovery.",
      image: medical_report_img,
      buttonText: "Generate Report",
      onClickPath: "/report",
    },
    {
      title: "AI-Powered Chatbot",
      description:
        "Provides medical information and treatment guidance through an interactive chatbot.",
      image: ai_chatbot_img,
      buttonText: "Ask the Chatbot",
      onClickPath: "/chatbot",
    },
    {
      title: "Dashboard",
      description:
        "Get a comprehensive overview of patient count, bed availability, and critical cases.",
      image: dashboard_img,
      buttonText: "Dashboard",
      onClickPath: "/dashboard",
    },
  ];

  // Decide what services to show
  let visibleServices = services;

  if (loggedIn) {
    if (user?.role === "patient") {
      visibleServices = services.slice(3); // last 3
    } else if (user?.role === "nurse") {
      visibleServices = services.slice(0, 3); // first 3
    }
  }

  return (
    <div className="bg-white-2">
      <Title title={"Services"} />
      <div className="flex items-center justify-center">
        <div className="w-full md:w-[90%] lg:w-4/5">
          <div className="flex flex-col py-3">
            {/* Top part */}
            <div className="flex items-center gap-5">
              <div className="flex flex-col items-center md:items-start md:justify-center gap-4 p-5">
                <h1 className="text-text-2 text-xl md:text-2xl lg:text-4xl font-bold">
                  Comprehensive Dengue Care at Your Fingertips
                </h1>
                <p className="text-text-1 text-center md:text-start">
                  Empowering Healthcare with Smart Dengue Management – Real-time
                  Monitoring, Automated Alerts, and AI-Powered Insights for
                  Better Patient Care.
                </p>
                <button className="btn">Explore Now</button>
              </div>
              <img
                src={service_img}
                alt="service"
                className="hidden md:block w-[40%]"
              />
            </div>

            {/* Services Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 mt-[5%] gap-5 p-4">
              {visibleServices.map((service, index) => (
                <div
                  key={index}
                  className="bg-white-1 shadow-xl p-4 flex gap-3 flex-col justify-center items-start rounded-2xl">
                  <img
                    src={service.image}
                    className="w-[60%] block mx-auto"
                    alt=""
                  />
                  <h2 className="text-xl text-text-2 font-semibold">
                    {service.title}
                  </h2>
                  <p className="text-text-1">{service.description}</p>
                  <button
                    className="btn w-full"
                    onClick={() => handleClick(service.onClickPath)}>
                    {service.buttonText}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;
