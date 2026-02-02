const express = require('express');
const router = express.Router();

const { approveAdmission } = require('../controllers/admissionController');
const { protect } = require('../middleware/authMiddleware');
const role = require('../middleware/roleMiddleware');

/**
 * Approve admission (ADMIN only)
 */
router.put(
  '/approve/:id',
  protect,
  role(['ADMIN']),
  approveAdmission
);

module.exports = router;
