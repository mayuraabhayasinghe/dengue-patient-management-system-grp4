import React from "react";
import hero_img from "../../assets/images/Hero_img.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBell,
  faCircleCheck,
  faClock,
} from "@fortawesome/free-solid-svg-icons";

const Hero = () => {
  return (
    <div>
      <div
        id="home"
        className="flex items-center justify-center bg-background-1">
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
    </div>
  );
};

export default Hero;
