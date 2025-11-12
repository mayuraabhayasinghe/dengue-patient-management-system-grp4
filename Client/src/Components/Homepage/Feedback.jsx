import React, { useState } from "react";
import Title from "../Title";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faEnvelope,
  faPhone,
  faStar,
  faAngleDown,
} from "@fortawesome/free-solid-svg-icons";
import { isLoggedIn } from "../../../../Server/utils/auth";
import { useNavigate } from "react-router-dom";
import api from "../../api/api";

const Feedback = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [userType, setUserType] = useState("");
  const [dropdown, setDropdown] = useState(false);
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const loggedIn = isLoggedIn();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check login status (adjust logic as per your auth system)
    if (!loggedIn) {
      navigate("/login", { state: { message: "Please login first." } });
      return;
    }

    // Basic field check
    if (!name || !email || !phone || !userType || !rating || !feedback) {
      setError("Please fill in all fields.");
      setMessage("");
      return;
    }

    // Email format check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address.");
      setMessage("");
      return;
    }

    // Phone number check: only digits, 10 characters (you can adjust this)
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(phone)) {
      setError("Please enter a valid 10-digit phone number.");
      setMessage("");
      return;
    }

    // Submit to backend
    try {
      const response = await fetch(`${api}/api/feedback`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          phone,
          userType,
          rating,
          feedback,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("Feedback submitted successfully!");
        setError("");
        setName("");
        setEmail("");
        setPhone("");
        setUserType("");
        setRating(0);
        setFeedback("");
        setTimeout(() => {
          setMessage("");
        }, 2000);
      } else {
        setError(data.error || "Something went wrong.");
        setMessage("");
      }
    } catch (err) {
      console.error("Error submitting feedback:", err);
      setError("Server error. Please try again later.");
      setMessage("");
    }
  };

  return (
    <div id="feedback-section" className="bg-background-1">
      <Title title={"Feedback"} />
      <div className="flex items-center justify-center">
        <div className="w-full md:w-[90%] lg:w-4/5">
          <div className="bg-white-1 px-8 py-5 md:px-15 md:py-15 my-5">
            <form
              onSubmit={handleSubmit}
              className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-10">
              {/* Name */}
              <div className="flex flex-col gap-2">
                <label htmlFor="name" className="text-text-2 font-semibold">
                  Name
                </label>
                <div className="relative w-full">
                  <input
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    type="text"
                    placeholder="Your Name"
                    className="peer w-full shadow outline-none focus:border-2 focus:border-primary-2 placeholder:text-text-1 text-primary-1 p-3 rounded-3xl"
                  />
                  <FontAwesomeIcon
                    icon={faUser}
                    className="absolute right-5 top-1/2 transform -translate-y-1/2 text-text-1 peer-focus:text-primary-1"
                  />
                </div>
              </div>

              {/* Email */}
              <div className="flex flex-col gap-2">
                <label htmlFor="email" className="text-text-2 font-semibold">
                  Email
                </label>
                <div className="relative w-full">
                  <input
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    placeholder="Email"
                    className="peer w-full shadow outline-none focus:border-2 focus:border-primary-2 placeholder:text-text-1 text-primary-1 p-3 rounded-3xl"
                  />
                  <FontAwesomeIcon
                    icon={faEnvelope}
                    className="absolute right-5 top-1/2 transform -translate-y-1/2 text-text-1 peer-focus:text-primary-1"
                  />
                </div>
              </div>

              {/* Phone */}
              <div className="flex flex-col gap-2">
                <label htmlFor="phone" className="text-text-2 font-semibold">
                  Phone Number
                </label>
                <div className="relative w-full">
                  <input
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    type="tel"
                    placeholder="Phone Number"
                    className="peer w-full shadow outline-none focus:border-2 focus:border-primary-2 placeholder:text-text-1 text-primary-1 p-3 rounded-3xl"
                  />
                  <FontAwesomeIcon
                    icon={faPhone}
                    className="absolute right-5 top-1/2 transform -translate-y-1/2 text-text-1 peer-focus:text-primary-1"
                  />
                </div>
              </div>

              {/* User Type */}
              <div className="flex flex-col gap-2">
                <label className="text-text-2 font-semibold">User Type</label>
                <div className="relative w-full">
                  <input
                    onClick={() => setDropdown((prev) => !prev)}
                    readOnly
                    value={userType}
                    placeholder="Select user type"
                    className="peer w-full shadow outline-none focus:border-2 focus:border-primary-2 cursor-pointer placeholder:text-text-1 text-primary-1 p-3 rounded-3xl"
                  />
                  <FontAwesomeIcon
                    icon={faAngleDown}
                    onClick={() => setDropdown((prev) => !prev)}
                    className="absolute right-5 top-1/2 transform -translate-y-1/2 text-text-1 peer-focus:text-primary-1 cursor-pointer"
                  />
                </div>
                {dropdown && (
                  <div className="absolute right-[15%] w-fit z-10">
                    {["Patient", "Nurse"].map((type) => (
                      <p
                        key={type}
                        onClick={() => {
                          setUserType(type);
                          setDropdown(false);
                        }}
                        className="bg-white-2 px-5 py-1 text-secondary-1 font-semibold hover:bg-gradient-to-r from-cyan-400 to-teal-800 hover:text-white cursor-pointer">
                        {type}
                      </p>
                    ))}
                  </div>
                )}
              </div>

              {/* Rating */}
              <div className="flex flex-col gap-2 md:col-span-2">
                <label className="text-text-2 font-semibold">Rating</label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((num) => (
                    <FontAwesomeIcon
                      key={num}
                      icon={faStar}
                      onClick={() => setRating(num)}
                      className={`cursor-pointer text-xl ${
                        num <= rating ? "text-yellow-400" : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Feedback Message */}
              <div className="flex flex-col gap-2 md:col-span-2">
                <label htmlFor="feedback" className="text-text-2 font-semibold">
                  Additional Feedback
                </label>
                <textarea
                  required
                  id="feedback"
                  rows="4"
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  placeholder="Write your feedback here..."
                  className="w-full shadow outline-none focus:border-2 focus:border-primary-2 placeholder:text-text-1 text-primary-1 p-3 rounded-3xl resize-none"></textarea>
              </div>

              {/* Messages */}
              <div className="md:col-span-2 text-center">
                {message && (
                  <p className="text-green-600 font-semibold">{message}</p>
                )}
                {error && <p className="text-red-600 font-semibold">{error}</p>}
              </div>

              {/* Submit Button */}
              <div className="md:col-span-2">
                <button className="btn" type="submit">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Feedback;
