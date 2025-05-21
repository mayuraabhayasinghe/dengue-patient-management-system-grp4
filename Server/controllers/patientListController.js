const Patient = require('../models/Patient');

// Get all patients
exports.getAllPatients = async (req, res) => {
  try {
    const patients = await Patient.find();
    res.status(200).json(patients);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get single patient
exports.getPatientById = async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id);
    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }
    res.status(200).json(patient);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create new patient
exports.createPatient = async (req, res) => {
  const patient = new Patient(req.body);
  try {
    const newPatient = await patient.save();
    res.status(201).json(newPatient);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Update patient
exports.updatePatient = async (req, res) => {
  try {
    const updatedPatient = await Patient.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedPatient) {
      return res.status(404).json({ message: 'Patient not found' });
    }
    res.status(200).json(updatedPatient);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete patient
exports.deletePatient = async (req, res) => {
  try {
    const patient = await Patient.findByIdAndDelete(req.params.id);
    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }
    res.status(200).json({ message: 'Patient deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get patient statistics
exports.getPatientStats = async (req, res) => {
  try {
    const stats = await Patient.aggregate([
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 }
        }
      }
    ]);
    
    // Convert to more usable format
    const formattedStats = {
      total: await Patient.countDocuments(),
      active: stats.find(s => s._id === 'Active')?.count || 0,
      recovered: stats.find(s => s._id === 'Recovered')?.count || 0,
      critical: stats.find(s => s._id === 'Critical')?.count || 0,
      monitoring: stats.find(s => s._id === 'Monitoring')?.count || 0
    };
    
    res.status(200).json(formattedStats);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};