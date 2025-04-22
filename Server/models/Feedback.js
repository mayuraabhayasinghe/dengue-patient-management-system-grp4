const mongoose = require("mongoose");

const feedbackSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
    },
    email: {
        type: String,
        required: [true, "Email is required"],
    },
    phone: {
        type: String,
        required: [true, "Phone number is required"],
    },
    userType: {
        type: String,
        required: [true, "User type is required"],
    },
    rating: {
        type: Number,
        required: [true, "Rating is required"],
        min: 1,
        max: 5,
    },
    feedback: {
        type: String,
        required: [true, "Feedback message is required"],
    },
});

module.exports = mongoose.model("Feedback", feedbackSchema);
