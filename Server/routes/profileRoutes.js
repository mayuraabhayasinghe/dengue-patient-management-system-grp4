// Profile routes for handling user profile endpoints
// Routes for creating, updating, and retrieving user profiles
const express = require('express');
const router = express.Router();
const { protect, authorizeRoles } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');
const {
  getCurrentProfile,
  createOrUpdateProfile,
  getAllProfiles,
  getProfileByUserId,
  deleteProfile,
  addEducation,
  addExperience,
  addCertification,
  uploadAvatar,
  deleteEducation,
  deleteExperience,
  deleteCertification
} = require('../controllers/profileController');
const { check } = require('express-validator');

// @route   GET /api/profile/me
// @desc    Get current user profile
// @access  Private
router.get('/me', protect, getCurrentProfile);

// @route   POST /api/profile
// @desc    Create or update user profile
// @access  Private
router.post(
  '/',
  [
    protect,
    [
      check('phoneNumber', 'Please enter a valid phone number').optional().matches(/^[0-9]+$/),
      check('bio', 'Bio cannot exceed 500 characters').optional().isLength({ max: 500 })
    ]
  ],
  createOrUpdateProfile
);

// @route   GET /api/profile
// @desc    Get all profiles
// @access  Private/Admin
router.get('/', protect, authorizeRoles('admin'), getAllProfiles);

// @route   GET /api/profile/user/:user_id
// @desc    Get profile by user ID
// @access  Private
router.get('/user/:user_id', protect, getProfileByUserId);

// @route   DELETE /api/profile
// @desc    Delete profile, user & related data
// @access  Private
router.delete('/', protect, deleteProfile);

// @route   PUT /api/profile/education
// @desc    Add profile education
// @access  Private
router.put(
  '/education',
  [
    protect,
    [
      check('school', 'School is required').not().isEmpty(),
      check('degree', 'Degree is required').not().isEmpty(),
      check('fieldOfStudy', 'Field of study is required').not().isEmpty(),
      check('from', 'From date is required').not().isEmpty()
    ]
  ],
  addEducation
);

// @route   PUT /api/profile/experience
// @desc    Add profile experience
// @access  Private
router.put(
  '/experience',
  [
    protect,
    [
      check('hospital', 'Hospital is required').not().isEmpty(),
      check('position', 'Position is required').not().isEmpty(),
      check('from', 'From date is required').not().isEmpty()
    ]
  ],
  addExperience
);

// @route   PUT /api/profile/certification
// @desc    Add profile certification
// @access  Private
router.put(
  '/certification',
  [
    protect,
    [
      check('name', 'Certification name is required').not().isEmpty(),
      check('authority', 'Certification authority is required').not().isEmpty(),
      check('year', 'Year is required').not().isEmpty().isNumeric()
    ]
  ],
  addCertification
);

// @route   PUT /api/profile/avatar
// @desc    Upload profile avatar
// @access  Private
router.put('/avatar', protect, upload.single('avatar'), uploadAvatar);

// @route   DELETE /api/profile/education/:edu_id
// @desc    Delete education from profile
// @access  Private
router.delete('/education/:edu_id', protect, deleteEducation);

// @route   DELETE /api/profile/experience/:exp_id
// @desc    Delete experience from profile
// @access  Private
router.delete('/experience/:exp_id', protect, deleteExperience);

// @route   DELETE /api/profile/certification/:cert_id
// @desc    Delete certification from profile
// @access  Private
router.delete('/certification/:cert_id', protect, deleteCertification);

module.exports = router;