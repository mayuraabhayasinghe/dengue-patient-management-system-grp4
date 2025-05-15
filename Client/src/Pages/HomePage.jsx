import React from "react";

import Feedback from "../Components/Homepage/Feedback";
import Hero from "../Components/Homepage/Hero";
import AboutUs from "../Components/Homepage/AboutUs";
import Services from "../Components/Homepage/Services";
import Faq from "../Components/Homepage/Faq";

const HomePage = () => {
  return (
    <div>
      {/* Hero section */}
      <Hero />
      {/* About Us Section */}
      <AboutUs />
      {/* Services */}
      <Services />
      {/* Feedback section */}
      <Feedback />
      {/* FAQ section */}
      <Faq />
    </div>
  );
};

export default HomePage;
