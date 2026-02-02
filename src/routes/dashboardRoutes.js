const express = require('express');
const router = express.Router();

const {
  admissionDashboard,
  feeDashboard,
  hostelDashboard,
  libraryDashboard,
  examDashboard
} = require('../controllers/dashboardController');

const { protect } = require('../middleware/authMiddleware');
const role = require('../middleware/roleMiddleware');

/* Admin dashboard */
router.get('/admissions', protect, role(['ADMIN']), admissionDashboard);
router.get('/fees', protect, role(['ADMIN']), feeDashboard);
router.get('/hostel', protect, role(['ADMIN']), hostelDashboard);
router.get('/library', protect, role(['ADMIN']), libraryDashboard);
router.get('/exams', protect, role(['ADMIN']), examDashboard);

module.exports = router;
