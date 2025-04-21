import React from "react";
import Title from "../Components/Title";
import doctor_img from "../assets/images/doctor-3.png";
import hero_img from "../assets/images/Hero_img.png";
import service_img from "../assets/images/Service_img.png";
import patient_management_img from "../assets/images/patient_management.png";
import patient_monitoring_img from "../assets/images/patient_monitoring.png";
import ward_management_img from "../assets/images/ward_management.png";
import medical_report_img from "../assets/images/medical_report.png";
import ai_chatbot_img from "../assets/images/ai_chatbot.png";
import dashboard_img from "../assets/images/dashboard.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBell,
  faCircleCheck,
  faClock,
} from "@fortawesome/free-solid-svg-icons";

const HomePage = () => {
  return (
    <div>
      {/* Hero section */}
      <div className="bg-background-1 flex items-center justify-center">
        <div className="w-full  md:w-[90%] lg:w-4/5 flex flex-col items-center justify-center">
          <div className="flex items-center flex-col-reverse md:flex-row gap-5 w-full pt-2">
            {/* left */}
            <div className="flex flex-col gap-4 items-start w-[90%]">
              <h2 className="text-primary-2 text-2xl font-semibold">
                DengueGuard
              </h2>
              <h1 className="text-text-2 text-2xl md:text-3xl lg:text-5xl font-bold">
                Revolutionizing Dengue <br /> Patient Management
              </h1>
              <p className="text-text-1">
                A web-based solution designed to revolutionize dengue patient
                care in Sri Lanka. Monitor patients in real time, manage
                hospital resources efficiently, and receive AI-driven insights
                for better decision-making.
              </p>
              <button className="btn">Get Started</button>
            </div>

            {/* right image */}
            <div className="">
              <img src={hero_img} alt="" />
            </div>
          </div>

          {/* why us */}
          <div className="flex m-3 flex-col md:flex-row gap-4 text-white font-semibold my-4">
            <div className="flex items-center justify-center px-1 py-1 md:px-3 md:py-2 bg-[linear-gradient(120deg,_rgba(0,194,203,1)_0%,_rgba(2,88,82,1)_100%)] gap-4 rounded-xl h-fit">
              <FontAwesomeIcon
                className="text-2xl sm:text-3xl lg:text-[30px] "
                icon={faClock}></FontAwesomeIcon>
              <div className="flex flex-col ">
                <h2 className="text-[clamp(1rem,1vw,1.2rem)]">
                  24 hour service
                </h2>
                <p className="text-[clamp(.7rem,1vw,1.3rem)] font-thin">
                  Always available for uninterrupted patient care.
                </p>
              </div>
            </div>
            <div className="flex items-center justify-center px-1 py-1 md:px-3 md:py-2 bg-[linear-gradient(120deg,_rgba(0,194,203,1)_0%,_rgba(2,88,82,1)_100%)] gap-4 rounded-xl h-fit">
              <FontAwesomeIcon
                className="text-2xl sm:text-3xl lg:text-[30px] "
                icon={faBell}></FontAwesomeIcon>
              <div className="flex flex-col ">
                <h2 className="text-[clamp(1rem,1vw,1.2rem)]">
                  {" "}
                  Instant Alerts
                </h2>
                <p className="text-[clamp(.7rem,1vw,1.3rem)] font-thin">
                  Real-time warnings for quick action.
                </p>
              </div>
            </div>
            <div className="flex items-center justify-center px-1 py-1 md:px-3 md:py-2 bg-[linear-gradient(120deg,_rgba(0,194,203,1)_0%,_rgba(2,88,82,1)_100%)] gap-4 rounded-xl h-fit">
              <FontAwesomeIcon
                className="text-2xl sm:text-3xl lg:text-[30px] "
                icon={faCircleCheck}></FontAwesomeIcon>
              <div className="flex flex-col ">
                <h2 className="text-[clamp(1rem,1vw,1.2rem)]">
                  Resource Control
                </h2>
                <p className="text-[clamp(.7rem,1vw,1.3rem)] font-thin">
                  Smart tracking of beds and supplies.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* About Us Section */}
      <div className="bg-background-1 pb-3">
        <Title title={"About Us"} />
        <div className="flex items-center justify-center">
          <div className="w-full md:w-[90%] lg:w-4/5">
            <div className="flex items-center">
              <img
                src={doctor_img}
                alt=""
                className="hidden md:block w-[40%]"
              />
              <p className="text-text-1 text-justify lea sm:leading-8 p-[5%] md:p-0">
                DengueGuard is an innovative web-based system designed to
                revolutionize the management and monitoring of dengue patients
                in Sri Lanka. Developed by a team of dedicated students from the
                Faculty of Computing at Sabaragamuwa University of Sri Lanka,
                DengueGuard aims to address the critical challenges faced by
                healthcare providers during dengue outbreaks. By leveraging
                modern web technologies, real-time data analytics, and AI-driven
                insights, DengueGuard provides a comprehensive solution for
                patient monitoring, resource management, and communication among
                medical staff.
                <br></br>
                <br></br>
                Our system is tailored to meet the needs of various
                stakeholders, including caregivers, doctors, nurses, and
                hospital administrators. With features like real-time patient
                monitoring, automated alerts, and an AI-powered chatbot,
                DengueGuard ensures timely interventions, reduces the workload
                on healthcare professionals, and ultimately improves patient
                outcomes. By replacing outdated manual processes with an
                automated, digital approach, DengueGuard represents a
                significant step forward in the fight against dengue fever.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white-2">
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
                  <button className="btn w-full">Ask the Chatbot</button>
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

export default HomePage;
