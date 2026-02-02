const express = require('express');
const router = express.Router();

const {
  createStudent,
  getStudent,
  updateStudent,
  getAllStudents
} = require('../controllers/studentController');

const { protect } = require('../middleware/authMiddleware');
const role = require('../middleware/roleMiddleware');

/* ✅ LIST ALL STUDENTS */
router.get(
  '/',
  protect,
  role(['ADMIN']),
  getAllStudents
);

/* CREATE STUDENT */
router.post(
  '/create',
  protect,
  role(['ADMIN']),
  createStudent
);

/* GET STUDENT PROFILE */
router.get(
  '/:id',
  protect,
  getStudent
);

/* UPDATE STUDENT */
router.put(
  '/update/:id',
  protect,
  role(['ADMIN']),
  updateStudent
);

module.exports = router;
