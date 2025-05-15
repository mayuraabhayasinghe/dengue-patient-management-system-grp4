import React from "react";
import Title from "../Title";
import doctor_img from "../../assets/images/doctor-3.png";

const AboutUs = () => {
  return (
    <div>
      <div id="about" name="about" className="bg-background-1 pb-3">
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
    </div>
  );
};

export default AboutUs;
