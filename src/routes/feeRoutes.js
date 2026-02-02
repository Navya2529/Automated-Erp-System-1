const express = require('express');
const router = express.Router();

const { payFees, getFeeStatus } = require('../controllers/feeController');
const { protect } = require('../middleware/authMiddleware');
const role = require('../middleware/roleMiddleware');

/* Pay fees – Accountant/Admin */
router.post(
  '/pay',
  protect,
  role(['ADMIN', 'ACCOUNTANT']),
  payFees
);

/* Fee status */
router.get(
  '/status/:studentId',
  protect,
  getFeeStatus
);

module.exports = router;
