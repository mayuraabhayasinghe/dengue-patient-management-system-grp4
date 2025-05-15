import React, { useState } from "react";
import Title from "../Title";

const Faq = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const toggleFAQ = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  const faqs = [
    {
      question: "What is DengueGuard?",
      answer:
        "DengueGuard is a hospital management system designed to track patient registration, monitor vital health stats, manage wards and resources, generate alerts, and support healthcare staff with intelligent reporting and an interactive chatbot.",
    },
    {
      question: "Who can use DengueGuard?",
      answer:
        "The system is designed for patients, nurses, and doctors. Each user type has specific access and functionality tailored to their role in patient care.",
    },
    {
      question: "Is my data secure in DengueGuard?",
      answer:
        "Yes. DengueGuard uses secure login with NIC and password, and stores patient data in a MongoDB database with proper validation and access control mechanisms.",
    },
    {
      question: "What health data can be tracked?",
      answer:
        "You can monitor fluid intake/output, vital signs (like blood pressure, heart rate), and receive real-time alerts for any abnormal values or emergencies.",
    },
    {
      question: "Can I view my past feedback or reports?",
      answer:
        "Currently, feedback submission is one-way, but the system allows doctors to generate and view patient reports and view past report history through the dashboard.",
    },
    {
      question: "What happens after I submit feedback?",
      answer:
        "Once submitted, your feedback is securely stored in our database (dengue-guard) and used by the development or medical team to improve system performance and patient care.",
    },
  ];
  return (
    <div>
      <div className="bg-background-1 py-10 px-4 md:px-20">
        <Title title={"FAQ"} />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-w-4xl mx-auto space-y-4 py-4 md:py-8">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="rounded-xl overflow-hidden bg-white shadow">
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-4 focus:outline-none flex justify-start items-center gap-5">
                <span className="text-xl text-primary-2">
                  {activeIndex === index ? "-" : "+"}
                </span>
                <span className="text-lg font-medium text-secondary-1">
                  {faq.question}
                </span>
              </button>
              {activeIndex === index && (
                <div className="px-6 pb-4 text-text-2 text-base">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Faq;
