const express = require('express');
const router = express.Router();

const {
  allocateHostel,
  hostelOccupancy
} = require('../controllers/hostelController');

const { protect } = require('../middleware/authMiddleware');
const role = require('../middleware/roleMiddleware');

/* Allocate hostel – Admin/Warden */
router.post(
  '/allocate',
  protect,
  role(['ADMIN', 'WARDEN']),
  allocateHostel
);

/* Occupancy stats */
router.get(
  '/occupancy',
  protect,
  hostelOccupancy
);

module.exports = router;
