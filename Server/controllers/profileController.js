const Profile = require('../models/Profile');
const User = require('../models/userModel');
const { validationResult } = require('express-validator');
const { formatProfileResponse, validateProfileData } = require('../utils/profileUtils');

// @desc    Get current user profile
// @route   GET /api/profile/me
// @access  Private
exports.getCurrentProfile = async (req, res) => {  try {
    const profile = await Profile.findOne({ user: req.user.id }).populate('user', ['name', 'email', 'role']);

    if (!profile) {
      return res.status(404).json({ message: 'Profile not found for this user' });
    }

    res.status(200).json({
      success: true,
      data: formatProfileResponse(profile)
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};

// @desc    Create or update user profile
// @route   POST /api/profile
// @access  Private
exports.createOrUpdateProfile = async (req, res) => {
  // Validate with express-validator
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const {
    avatar,
    phoneNumber,
    address,
    bio,
    specialization,
    position,
    department,
    education,
    experience,
    certifications,
    socialMedia,
    staffDetails,
    caretakerDetails
  } = req.body;

  // Validate with custom validator
  const { isValid, errors: customErrors } = validateProfileData(req.body);
  if (!isValid) {
    return res.status(400).json({ errors: customErrors });
  }

  // Build profile object
  const profileFields = {
    user: req.user.id
  };

  if (avatar) profileFields.avatar = avatar;
  if (phoneNumber) profileFields.phoneNumber = phoneNumber;
  if (address) profileFields.address = address;
  if (bio) profileFields.bio = bio;
  if (specialization) profileFields.specialization = specialization;
  if (position) profileFields.position = position;
  if (department) profileFields.department = department;
  if (staffDetails) profileFields.staffDetails = staffDetails;
  if (caretakerDetails) profileFields.caretakerDetails = caretakerDetails;

  // Build education array
  if (education) {
    profileFields.education = education;
  }

  // Build experience array
  if (experience) {
    profileFields.experience = experience;
  }

  // Build certifications array
  if (certifications) {
    profileFields.certifications = certifications;
  }

  // Build social media object
  if (socialMedia) profileFields.socialMedia = socialMedia;

  try {
    let profile = await Profile.findOne({ user: req.user.id });

    if (profile) {
      // Update
      profile = await Profile.findOneAndUpdate(
        { user: req.user.id },
        { $set: profileFields },
        { new: true }
      );      return res.status(200).json({
        success: true,
        data: formatProfileResponse(profile),
        message: 'Profile updated successfully'
      });
    }

    // Create
    profile = new Profile(profileFields);
    await profile.save();

    res.status(201).json({
      success: true,
      data: formatProfileResponse(profile),
      message: 'Profile created successfully'
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};

// @desc    Get all profiles
// @route   GET /api/profile
// @access  Private/Admin
exports.getAllProfiles = async (req, res) => {
  try {
    const profiles = await Profile.find().populate('user', ['name', 'email', 'role']);

    res.status(200).json({
      success: true,
      count: profiles.length,
      data: profiles
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};

// @desc    Get profile by user ID
// @route   GET /api/profile/user/:user_id
// @access  Private
exports.getProfileByUserId = async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.params.user_id }).populate('user', ['name', 'email', 'role']);

    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }

    res.status(200).json({
      success: true,
      data: profile
    });
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Profile not found' });
    }
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};

// @desc    Delete profile, user & related data
// @route   DELETE /api/profile
// @access  Private
exports.deleteProfile = async (req, res) => {
  try {
    // Remove profile
    await Profile.findOneAndRemove({ user: req.user.id });

    // Remove user
    await User.findOneAndRemove({ _id: req.user.id });

    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};

// @desc    Add profile education
// @route   PUT /api/profile/education
// @access  Private
exports.addEducation = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const {
    school,
    degree,
    fieldOfStudy,
    from,
    to
  } = req.body;

  const newEdu = {
    school,
    degree,
    fieldOfStudy,
    from,
    to
  };

  try {
    const profile = await Profile.findOne({ user: req.user.id });

    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }

    profile.education.unshift(newEdu);
    await profile.save();

    res.status(200).json({
      success: true,
      data: profile
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};

// @desc    Add profile experience
// @route   PUT /api/profile/experience
// @access  Private
exports.addExperience = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const {
    hospital,
    position,
    from,
    to,
    description
  } = req.body;

  const newExp = {
    hospital,
    position,
    from,
    to,
    description
  };

  try {
    const profile = await Profile.findOne({ user: req.user.id });

    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }

    profile.experience.unshift(newExp);
    await profile.save();

    res.status(200).json({
      success: true,
      data: profile
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};

// @desc    Add profile certification
// @route   PUT /api/profile/certification
// @access  Private
exports.addCertification = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const {
    name,
    authority,
    year
  } = req.body;

  const newCert = {
    name,
    authority,
    year
  };

  try {
    const profile = await Profile.findOne({ user: req.user.id });
    
    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }

    profile.certifications.unshift(newCert);
    await profile.save();

    res.status(200).json({
      success: true,
      data: profile
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};

// @desc    Upload profile avatar
// @route   PUT /api/profile/avatar
// @access  Private
exports.uploadAvatar = async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });

    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }

    // Check if file was uploaded
    if (!req.file) {
      return res.status(400).json({ message: 'Please upload an image file' });
    }

    // Set avatar URL
    profile.avatar = `/uploads/${req.file.filename}`;
    await profile.save();

    res.status(200).json({
      success: true,
      data: profile,
      message: 'Profile avatar uploaded successfully'
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};

// @desc    Delete education from profile
// @route   DELETE /api/profile/education/:edu_id
// @access  Private
exports.deleteEducation = async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });

    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }

    // Get remove index
    const removeIndex = profile.education
      .map(item => item.id)
      .indexOf(req.params.edu_id);

    if (removeIndex === -1) {
      return res.status(404).json({ message: 'Education not found' });
    }

    // Remove education
    profile.education.splice(removeIndex, 1);
    await profile.save();

    res.status(200).json({
      success: true,
      data: profile,
      message: 'Education removed'
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};

// @desc    Delete experience from profile
// @route   DELETE /api/profile/experience/:exp_id
// @access  Private
exports.deleteExperience = async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });

    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }

    // Get remove index
    const removeIndex = profile.experience
      .map(item => item.id)
      .indexOf(req.params.exp_id);

    if (removeIndex === -1) {
      return res.status(404).json({ message: 'Experience not found' });
    }

    // Remove experience
    profile.experience.splice(removeIndex, 1);
    await profile.save();

    res.status(200).json({
      success: true,
      data: profile,
      message: 'Experience removed'
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};

// @desc    Delete certification from profile
// @route   DELETE /api/profile/certification/:cert_id
// @access  Private
exports.deleteCertification = async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });

    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }

    // Get remove index
    const removeIndex = profile.certifications
      .map(item => item.id)
      .indexOf(req.params.cert_id);

    if (removeIndex === -1) {
      return res.status(404).json({ message: 'Certification not found' });
    }

    // Remove certification
    profile.certifications.splice(removeIndex, 1);
    await profile.save();

    res.status(200).json({
      success: true,
      data: profile,
      message: 'Certification removed'
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};