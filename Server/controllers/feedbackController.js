const Feedback = require("../models/Feedback");

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

module.exports = { submitFeedback };
