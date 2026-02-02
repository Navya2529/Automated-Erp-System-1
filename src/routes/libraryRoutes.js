const express = require('express');
const router = express.Router();

const {
  issueBook,
  returnBook,
  checkEligibility
} = require('../controllers/libraryController');

const { protect } = require('../middleware/authMiddleware');
const role = require('../middleware/roleMiddleware');

/* Issue book – Librarian/Admin */
router.post(
  '/issue',
  protect,
  role(['ADMIN']),
  issueBook
);

/* Return book */
router.put(
  '/return/:id',
  protect,
  returnBook
);

/* Eligibility check */
router.get(
  '/eligibility/:studentId',
  protect,
  checkEligibility
);

module.exports = router;
