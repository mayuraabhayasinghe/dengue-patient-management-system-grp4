const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");
const User = require("../models/userModel");
const PatientDetails = require("../models/patientModel");

const addPatient = async (req, res) => {
  try {
    const {
      name,
      age,
      weight,
      gender,
      bystanderName,
      bystanderAddress,
      bystanderEmail,
      admissionDate,
      admissionTime,
      bedNumber,
    } = req.body;

    //Generating the password
    const namePart = name.slice(0, 3).toLowerCase();
    const agePart = String(age).slice(-2);
    const emailPart = bystanderEmail.slice(0, 3).toLowerCase();
    const randomPart = Math.floor(10 + Math.random() * 90); // 2-digit number
    const rawPassword = `${namePart}${agePart}${emailPart}#${randomPart}`;

    //Hash the password to store in user collection
    const hashedPassword = await bcrypt.hash(rawPassword, 10);

    //Create user entry
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      role: "patient",
    });

    //Create PatientDetails entry
    await PatientDetails.create({
      user: newUser._id,
      age,
      weight,
      gender,
      bystanderName,
      bystanderAddress,
      admissionDate,
      admissionTime,
      bedNumber,
    });

    //Send email to bystander with the raw password
    const transporter = nodemailer.createTransport({
      service: "gmail",
      author: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailFormat = {
      from: process.env.EMAIL_USER,
      to: bystanderEmail,
      subject: "DengueGuard Patient Login",
      text: `Hello ${bystanderName},\n\nHere is the login password for patient ${name}:\n\nPassword: ${rawPassword}\n\nPlease keep it safe.\n\nThank you.`,
    };

    await transporter.sendMail(mailFormat);
    res.status(201).json({ message: "Patient registered successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Registration failed" });
  }
};

module.exports = { addPatient };
