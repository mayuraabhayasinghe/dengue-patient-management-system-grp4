const mongoose = require("mongoose");

const bedSchema = new mongoose.Schema({
    number: {
        type: String,
        required: true,
        unique: true,
    },
    status: {
        type: String,
        enum: ["occupied", "available"],
        default: "available",
    },
    patient: {
        type: String,
        default: null,
    },
    admissionDate: {
        type: Date,
        default: null,
    },
    ward: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Ward",
        required: true,
    },
});

module.exports = mongoose.model("Bed", bedSchema);
