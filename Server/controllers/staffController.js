const Staff = require('../models/Staff');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


exports.registerStaff = async (req, res) => {
  try {
    const { firstName, lastName, email, password, role, phoneNumber } = req.body;

    
    const existingStaff = await Staff.findOne({ email });
    if (existingStaff) {
      return res.status(400).json({ message: 'Staff already exists' });
    }

    
    const hashedPassword = await bcrypt.hash(password, 12);

    
    const staff = new Staff({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      role,
      phoneNumber
    });

    await staff.save();

   
    const token = jwt.sign(
      { id: staff._id, email: staff.email, role: staff.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.status(201).json({ result: staff, token });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
    console.error(error);
  }
};


exports.getAllStaff = async (req, res) => {
  try {
    const staff = await Staff.find().select('-password');
    res.status(200).json(staff);
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
};
