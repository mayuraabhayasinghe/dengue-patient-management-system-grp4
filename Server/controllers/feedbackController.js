const Feedback = require("../models/Feedback");

// Submit feedback 
const submitFeedback = async (req, res) => {
    try {
        const { name, email, phone, userType, rating, feedback } = req.body;

        if (!name || !email || !phone || !userType || !rating || !feedback) {
            return res.status(400).json({ error: "All fields are required." });
        }

        const newFeedback = new Feedback({ name, email, phone, userType, rating, feedback });
        await newFeedback.save();

        res.status(201).json({ message: "Feedback submitted successfully." });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Fetch all feedbacks
const getAllFeedbacks = async (req, res) => {
    try {
        const feedbacks = await Feedback.find().sort({ createdAt: -1 });
        res.status(200).json(feedbacks);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch feedbacks" });
    }
};


module.exports = { submitFeedback, getAllFeedbacks };
