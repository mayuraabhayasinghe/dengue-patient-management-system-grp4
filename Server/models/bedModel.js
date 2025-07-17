const mongoose = require("mongoose");

const bedSchema = new mongoose.Schema({
    number: {
        type: String,
        required: true,
        unique: true,
    },
    status: {
        type: String,
        enum: ["occupied", "available", "maintenance"],
        default: "available",
    },
    patient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "PatientDetails",
        default: null,
    },
    ward: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Ward",
        required: true,
    },
});

module.exports = mongoose.model("Bed", bedSchema);
